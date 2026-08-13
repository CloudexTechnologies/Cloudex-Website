"""Runtime configuration, loaded from the .env file that sits beside the package."""

from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _load_env() -> None:
    """Minimal .env reader — the VPS runs stdlib-only Python, so no python-dotenv."""
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        # Real environment variables win, so a cron job can override the file.
        os.environ.setdefault(key, value)


_load_env()


def _require(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise SystemExit(
            f"{name} is not set. Add it to {ROOT / '.env'} or export it before running."
        )
    return value


# ── Sanity ────────────────────────────────────────────────────────────────────
SANITY_PROJECT_ID = os.environ.get("SANITY_PROJECT_ID", "so1isjsl")
SANITY_DATASET = os.environ.get("SANITY_DATASET", "production")
SANITY_API_VERSION = os.environ.get("SANITY_API_VERSION", "2026-02-01")


def sanity_token() -> str:
    return _require("SANITY_WRITE_TOKEN")


# ── Site ──────────────────────────────────────────────────────────────────────
SITE_URL = os.environ.get("SITE_URL", "https://cloudextechnologies.io").rstrip("/")
REVALIDATE_SECRET = os.environ.get("SANITY_REVALIDATE_SECRET", "").strip()

# ── Hermes ────────────────────────────────────────────────────────────────────
HERMES_HOME = os.environ.get("HERMES_HOME", "/home/ubuntu/.hermes")
HERMES_PYTHON = os.environ.get(
    "HERMES_PYTHON", "/home/ubuntu/.hermes/hermes-agent/venv/bin/python"
)
HERMES_MODEL = os.environ.get("HERMES_MODEL", "").strip()
NOTIFY_TARGET = os.environ.get("NOTIFY_TARGET", "whatsapp:50264253931680@lid")

# ── Codex ─────────────────────────────────────────────────────────────────────
CODEX_BIN = os.environ.get("CODEX_BIN", "/home/ubuntu/.local/bin/codex")
NODE_BIN_DIR = os.environ.get("NODE_BIN_DIR", "/home/ubuntu/.nvm/versions/node/v24.16.0/bin")

# ── Editorial policy ──────────────────────────────────────────────────────────
# The 70/30 split the owner set. Enforced by looking at what actually published,
# not by alternating blindly, so a skipped run cannot drift the ratio.
RESEARCH_SHARE = float(os.environ.get("RESEARCH_SHARE", "0.7"))
RATIO_WINDOW = int(os.environ.get("RATIO_WINDOW", "10"))

DEFAULT_AUTHOR_ID = os.environ.get("DEFAULT_AUTHOR_ID", "author-cloudex-research-desk")

# Word-count envelopes per content type. Below the floor a piece cannot be
# authoritative; above the ceiling it stops being read.
WORD_RANGE = {
    "research": (1400, 3200),
    "commercial": (1000, 2400),
}

MIN_CITATIONS = {"research": 5, "commercial": 3}
MIN_INTERNAL_LINKS = 2
GATE_PASS_SCORE = float(os.environ.get("GATE_PASS_SCORE", "78"))
MAX_REVISIONS = int(os.environ.get("MAX_REVISIONS", "1"))

STATE_DIR = Path(os.environ.get("STATE_DIR", str(ROOT / "state")))
LOG_DIR = Path(os.environ.get("LOG_DIR", str(ROOT / "logs")))
WORK_DIR = Path(os.environ.get("WORK_DIR", str(ROOT / "work")))

for _directory in (STATE_DIR, LOG_DIR, WORK_DIR):
    _directory.mkdir(parents=True, exist_ok=True)
