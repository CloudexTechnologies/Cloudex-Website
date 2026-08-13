"""
Hero image generation.

Two steps, deliberately separate. First an art-direction pass reads the finished
article and commits to a physical metaphor with a real composition; then that
concept is assembled into a photographic brief for Codex.

Splitting them matters. When the image brief was one field among fifteen in the
writer's output, it came back as a list of abstractions ("nodes, gates, audit
trails") and rendered as empty rectangles on black. An art director given one job
produces a picture instead of a word cloud.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Any

from . import common, hermes, settings

# Appended to every brief. Kept short and concrete — the previous version asked
# for "thin luminous lines and generous negative space" and got exactly that,
# which is unreadable at card size.
STYLE_CONTRACT = (
    "Rendered as a high-end editorial photograph or cinematic 3D render for a "
    "technology publication. Shallow depth of field with the subject in sharp focus. "
    "Predominantly dark cool-toned scene, near-black background, with cool blue "
    "(#2563EB) as the dominant light colour, but a full tonal range from deep shadow "
    "to bright specular highlight. Physically accurate materials and light. "
    "Composed so the subject still reads clearly when the image is scaled down to "
    "380 pixels wide. 16:9 landscape, no text, no lettering, no numerals, no logos, "
    "no charts, no user-interface panels, no network diagrams, no human faces."
)

RETRY_NOTE = (
    "The previous attempt failed: {reason}. Make the subject substantially larger in "
    "frame, add a clear bright light source with visible falloff, and give the scene "
    "foreground and background depth. It must not be a mostly empty dark frame."
)


def direct(draft: dict[str, Any], blocks: list[dict]) -> dict[str, Any]:
    """Ask Hermes for a concrete visual concept grounded in the finished article."""
    from .markdown_pt import headings

    prompt = common.load_prompt(
        "art_direction",
        {
            "TITLE": draft["title"],
            "DECK": draft["deck"],
            "TAKEAWAYS": "\n".join(f"- {item}" for item in draft.get("keyTakeaways", [])),
            "HEADINGS": "\n".join(f"- {text}" for _, text in headings(blocks)) or "(none)",
        },
    )
    concept = hermes.run_agent_json(prompt, timeout=900)
    if not isinstance(concept, dict) or not concept.get("subject"):
        raise hermes.AgentError("art direction returned no usable subject")
    return concept


def brief_from(concept: dict[str, Any]) -> str:
    """Assemble the art director's fields into a single photographic brief."""
    parts = [
        concept.get("subject", ""),
        concept.get("composition", ""),
        concept.get("lighting", ""),
        concept.get("materials", ""),
    ]
    return " ".join(part.strip() for part in parts if part and part.strip())


def inspect(path: Path) -> dict[str, Any]:
    """
    Tonal statistics for the rendered file. Runs under the Hermes venv because
    that is the interpreter on this box with Pillow installed.
    """
    script = Path(__file__).with_name("imagecheck.py")
    try:
        completed = subprocess.run(
            [settings.HERMES_PYTHON, str(script), str(path)],
            capture_output=True,
            text=True,
            timeout=120,
        )
        return json.loads(completed.stdout.strip() or "{}")
    except Exception as error:  # noqa: BLE001
        # A broken checker must not block publishing; fall through as "unknown".
        common.log(f"warn: image inspection failed: {error}")
        return {"ok": True, "reason": "inspection unavailable"}


def create_hero(
    draft: dict[str, Any],
    blocks: list[dict],
    run_id: str,
    *,
    attempts: int = 2,
) -> tuple[Path, str, str] | None:
    """
    Returns (image_path, prompt_used, alt_text), or None if every attempt failed.
    The caller publishes without art rather than blocking on it.
    """
    try:
        concept = direct(draft, blocks)
    except hermes.AgentError as error:
        common.log(f"warn: art direction failed: {error}")
        return None

    common.save_artifact(run_id, "art_direction.json", json.dumps(concept, indent=2, ensure_ascii=False))
    common.log(f"art direction — metaphor: {str(concept.get('metaphor'))[:140]}")

    base_brief = brief_from(concept)
    alt = concept.get("alt") or draft["title"]
    directory = settings.WORK_DIR / run_id
    last_reason = "unknown"

    for attempt in range(1, attempts + 1):
        brief = base_brief
        if attempt > 1:
            brief = f"{base_brief} {RETRY_NOTE.format(reason=last_reason)}"
        prompt = f"{brief} {STYLE_CONTRACT}"

        target = directory / f"hero_attempt{attempt}.png"
        try:
            common.log(f"rendering hero image (attempt {attempt}/{attempts})…")
            hermes.generate_image(prompt, target)
        except hermes.AgentError as error:
            last_reason = str(error)
            common.log(f"warn: render attempt {attempt} failed: {error}")
            continue

        measured = inspect(target)
        common.log(f"image stats: {measured}")

        if measured.get("ok", True):
            return target, prompt, alt

        last_reason = measured.get("reason", "failed tonal check")
        common.log(f"image rejected: {last_reason}")

    common.log("warn: no usable hero image produced; publishing without one")
    return None
