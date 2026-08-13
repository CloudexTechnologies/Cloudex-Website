"""Calls into the Hermes agent and the Codex CLI."""

from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path
from typing import Any

from . import settings

_FENCE = re.compile(r"```(?:json)?\s*(.*?)\s*```", re.DOTALL)


class AgentError(RuntimeError):
    pass


def _env() -> dict[str, str]:
    env = dict(os.environ)
    env["HERMES_HOME"] = settings.HERMES_HOME
    env["PATH"] = f"{settings.NODE_BIN_DIR}:{os.path.dirname(settings.CODEX_BIN)}:{env.get('PATH', '')}"
    return env


def run_agent(prompt: str, *, timeout: int = 1800, skills: list[str] | None = None) -> str:
    """One-shot Hermes turn. Returns the agent's final text."""
    command = [
        settings.HERMES_PYTHON,
        "-m",
        "hermes_cli.main",
        "-z",
        prompt,
        "--cli",
        "--yolo",
    ]
    if settings.HERMES_MODEL:
        command[3:3] = ["-m", settings.HERMES_MODEL]
    if skills:
        command += ["--skills", ",".join(skills)]

    try:
        completed = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=timeout,
            env=_env(),
            cwd=str(settings.WORK_DIR),
        )
    except subprocess.TimeoutExpired as error:
        raise AgentError(f"Hermes timed out after {timeout}s") from error

    if completed.returncode != 0:
        raise AgentError(
            f"Hermes exited {completed.returncode}: {completed.stderr.strip()[:800]}"
        )

    output = completed.stdout.strip()
    if not output:
        raise AgentError("Hermes returned no output")
    return output


def extract_json(text: str) -> Any:
    """Pull a JSON value out of an agent reply that may be fenced or prefixed."""
    candidate = text.strip()

    fenced = _FENCE.search(candidate)
    if fenced:
        candidate = fenced.group(1).strip()

    try:
        return json.loads(candidate)
    except json.JSONDecodeError:
        pass

    # Fall back to the outermost brace/bracket pair — models sometimes narrate
    # a sentence before the payload despite being told not to.
    for opener, closer in (("{", "}"), ("[", "]")):
        start = candidate.find(opener)
        end = candidate.rfind(closer)
        if start != -1 and end > start:
            try:
                return json.loads(candidate[start : end + 1])
            except json.JSONDecodeError:
                continue

    raise AgentError(f"Could not parse JSON from agent output: {text[:500]}")


def run_agent_json(prompt: str, *, timeout: int = 1800, attempts: int = 2) -> Any:
    """Run the agent and insist on JSON, re-asking once if the reply is malformed."""
    last_error: Exception | None = None
    current = prompt

    for attempt in range(attempts):
        raw = run_agent(current, timeout=timeout)
        try:
            return extract_json(raw)
        except AgentError as error:
            last_error = error
            current = (
                f"{prompt}\n\n---\nYour previous reply could not be parsed as JSON. "
                f"Reply with the raw JSON value only — no prose, no code fence. "
                f"Previous reply began: {raw[:300]}"
            )

    raise last_error or AgentError("agent JSON extraction failed")


def generate_image(prompt: str, output_path: Path, *, timeout: int = 900) -> Path:
    """
    Render a hero image with the Codex CLI's $imagegen skill.

    Codex writes the PNG itself; we only verify the file landed, because a
    plausible-sounding "done" with no file is a failure mode worth catching.
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_path.exists():
        output_path.unlink()

    instruction = (
        f"Use the $imagegen skill to generate exactly one image.\n\n"
        f"Image brief: {prompt}\n\n"
        f"Save the generated image to the absolute path {output_path}. "
        f"Do not save it anywhere else and do not generate more than one image. "
        f"When the file exists at that path, reply with the single word DONE."
    )

    completed = subprocess.run(
        [
            settings.CODEX_BIN,
            "exec",
            "--skip-git-repo-check",
            "--dangerously-bypass-approvals-and-sandbox",
            instruction,
        ],
        capture_output=True,
        text=True,
        timeout=timeout,
        env=_env(),
        cwd=str(output_path.parent),
    )

    if not output_path.exists() or output_path.stat().st_size < 10_000:
        raise AgentError(
            "Codex did not produce a usable image. "
            f"exit={completed.returncode} stdout tail={completed.stdout[-400:]!r}"
        )

    return output_path


def notify(message: str, *, subject: str | None = None) -> None:
    """Best-effort owner notification. Never raises — a failed ping must not fail a run."""
    command = [
        settings.HERMES_PYTHON,
        "-m",
        "hermes_cli.main",
        "send",
        "--to",
        settings.NOTIFY_TARGET,
        "--quiet",
    ]
    if subject:
        command += ["--subject", subject]
    command.append(message)

    try:
        subprocess.run(command, capture_output=True, text=True, timeout=120, env=_env())
    except Exception as error:  # noqa: BLE001 - notification is not load-bearing
        print(f"[warn] notification failed: {error}")
