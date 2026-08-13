"""Shared helpers: prompt loading, run identity, logging, run records."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from . import sanity, settings

PROMPTS = settings.ROOT / "prompts"
CONFIG = settings.ROOT / "config"


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def new_run_id(kind: str) -> str:
    return f"{kind}-{datetime.now(timezone.utc):%Y%m%dT%H%M%S}-{uuid.uuid4().hex[:6]}"


def log(message: str) -> None:
    """Progress goes to stderr; stdout is reserved for the owner-facing summary."""
    print(f"[{now_iso()}] {message}", file=sys.stderr, flush=True)


def brand_context() -> str:
    return (CONFIG / "brand.md").read_text(encoding="utf-8")


def load_sources_config() -> dict[str, Any]:
    return json.loads((CONFIG / "sources.json").read_text(encoding="utf-8"))


def load_prompt(name: str, replacements: dict[str, str]) -> str:
    """
    Templates use {{TOKEN}} rather than str.format because the prompts contain
    JSON examples full of literal braces.
    """
    template = (PROMPTS / f"{name}.md").read_text(encoding="utf-8")
    filled = template.replace("{{BRAND}}", brand_context())
    for token, value in replacements.items():
        filled = filled.replace(f"{{{{{token}}}}}", value)

    leftover = re.findall(r"\{\{([A-Z_]+)\}\}", filled)
    if leftover:
        raise ValueError(f"Prompt '{name}' has unfilled tokens: {sorted(set(leftover))}")
    return filled


def slugify(value: str, *, max_length: int = 72) -> str:
    normalised = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", normalised.lower()).strip("-")
    if len(slug) <= max_length:
        return slug
    # Cut on a word boundary so the slug stays readable.
    return slug[:max_length].rsplit("-", 1)[0].strip("-")


def dedupe_key(keyword: str) -> str:
    """Normalised form used to stop the same topic being queued twice."""
    stop_words = {"the", "a", "an", "of", "for", "in", "to", "and", "with", "your", "how"}
    tokens = [
        token
        for token in re.findall(r"[a-z0-9]+", keyword.lower())
        if token not in stop_words
    ]
    return "-".join(sorted(tokens))


def reading_time(word_count: int) -> int:
    """225 wpm, rounded up — the conventional figure for technical prose."""
    return max(1, round(word_count / 225 + 0.5))


def record_run(
    *,
    run_id: str,
    kind: str,
    status: str,
    started_at: str,
    summary: str,
    items_scanned: int | None = None,
    ideas_created: int | None = None,
    post_id: str | None = None,
    errors: list[str] | None = None,
) -> None:
    finished = now_iso()
    document: dict[str, Any] = {
        "_type": "runLog",
        "runId": run_id,
        "kind": kind,
        "status": status,
        "startedAt": started_at,
        "finishedAt": finished,
        "durationSeconds": int(
            (
                datetime.fromisoformat(finished.replace("Z", "+00:00"))
                - datetime.fromisoformat(started_at.replace("Z", "+00:00"))
            ).total_seconds()
        ),
        "summary": summary[:4000],
    }
    if items_scanned is not None:
        document["itemsScanned"] = items_scanned
    if ideas_created is not None:
        document["ideasCreated"] = ideas_created
    if post_id:
        document["post"] = {"_type": "reference", "_ref": post_id}
    if errors:
        document["errors"] = [error[:500] for error in errors][:20]

    try:
        sanity.create(document)
    except Exception as error:  # noqa: BLE001 - never let bookkeeping kill a run
        log(f"warn: could not write runLog: {error}")


def ping_revalidate(slug: str | None = None) -> None:
    """
    Nudge the site to rebuild immediately. Pages already carry a 5-minute ISR
    window, so a failure here costs freshness, never correctness.
    """
    if not settings.REVALIDATE_SECRET:
        return
    payload = json.dumps({"_type": "post", "slug": slug}).encode("utf-8")
    request = urllib.request.Request(
        f"{settings.SITE_URL}/api/revalidate",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "sanity-webhook-signature": settings.REVALIDATE_SECRET,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            log(f"revalidate -> {response.status}")
    except Exception as error:  # noqa: BLE001
        log(f"warn: revalidate ping failed: {error}")


def save_artifact(run_id: str, name: str, content: str) -> Path:
    """Keep every draft on disk so a bad publish can be reconstructed after the fact."""
    directory = settings.LOG_DIR / run_id
    directory.mkdir(parents=True, exist_ok=True)
    path = directory / name
    path.write_text(content, encoding="utf-8")
    return path
