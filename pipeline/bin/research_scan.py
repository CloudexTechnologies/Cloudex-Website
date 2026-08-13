#!/usr/bin/env python3
"""
Daily research scan.

Collects fresh material from arXiv, vendor research blogs and Hacker News, hands
the digest to Hermes for judgement, and writes the surviving topics into Sanity
as a scored queue for the twice-weekly writer to draw from.

stdout is the owner-facing message, so it stays empty on an uneventful run —
the cron job delivers stdout verbatim to WhatsApp and a daily "all fine" ping
trains you to ignore it. Detail lives in the runLog and in logs/.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from lib import common, fetching, hermes, sanity  # noqa: E402

VALID_PILLARS = {
    "ai-systems",
    "applied-automation",
    "custom-software",
    "digital-growth",
    "technology-strategy",
}
QUEUE_LOW_WATERMARK = 4
MAX_QUEUE_SIZE = 40


def collect_digest(config: dict) -> list[fetching.SourceItem]:
    items: list[fetching.SourceItem] = []

    arxiv_config = config.get("arxiv", {})
    if arxiv_config:
        common.log("fetching arXiv…")
        items += fetching.arxiv_recent(
            arxiv_config.get("categories", []),
            days=arxiv_config.get("days", 4),
            limit=arxiv_config.get("limit", 30),
        )

    for feed in config.get("feeds", []):
        common.log(f"fetching feed {feed['origin']}…")
        items += fetching.rss_items(feed["url"], feed["origin"])

    for watch in config.get("hackernews", []):
        common.log(f"fetching Hacker News '{watch['query']}'…")
        items += fetching.hn_stories(watch["query"], min_points=watch.get("min_points", 60))

    # Two feeds often carry the same announcement; keep the first sighting.
    seen: set[str] = set()
    unique: list[fetching.SourceItem] = []
    for item in items:
        key = item.url.split("?")[0].rstrip("/")
        if key and key not in seen and item.title:
            seen.add(key)
            unique.append(item)
    return unique


def existing_coverage() -> tuple[list[str], set[str]]:
    """Titles already covered, and the dedupe keys that must not be re-queued."""
    rows = sanity.query(
        """{
          "queued": *[_type == "topicIdea" && status in ["queued", "writing", "published"]]{
            title, dedupeKey, primaryKeyword, status
          },
          "posts": *[_type == "post"]{ title, primaryKeyword }
        }"""
    ) or {}

    labels: list[str] = []
    keys: set[str] = set()

    for row in rows.get("queued", []):
        labels.append(f"- [{row.get('status')}] {row.get('title')} (keyword: {row.get('primaryKeyword')})")
        if row.get("dedupeKey"):
            keys.add(row["dedupeKey"])

    for row in rows.get("posts", []):
        labels.append(f"- [published] {row.get('title')} (keyword: {row.get('primaryKeyword')})")
        if row.get("primaryKeyword"):
            keys.add(common.dedupe_key(row["primaryKeyword"]))

    return labels, keys


def valid_idea(idea: dict) -> str | None:
    """Return a rejection reason, or None if the idea is usable."""
    for field in ("title", "angle", "primaryKeyword", "contentType", "pillar"):
        if not str(idea.get(field, "")).strip():
            return f"missing {field}"
    if idea.get("contentType") not in {"research", "commercial"}:
        return f"bad contentType {idea.get('contentType')!r}"
    if idea.get("pillar") not in VALID_PILLARS:
        return f"unknown pillar {idea.get('pillar')!r}"
    sources = idea.get("sources") or []
    real = [source for source in sources if str(source.get("url", "")).startswith("http")]
    if len(real) < 2:
        return f"only {len(real)} usable sources"
    return None


def main() -> int:
    run_id = common.new_run_id("research")
    started_at = common.now_iso()
    errors: list[str] = []

    config = common.load_sources_config()
    digest = collect_digest(config)
    common.log(f"collected {len(digest)} unique items")

    if len(digest) < 5:
        message = f"Research scan found only {len(digest)} items — sources may be failing."
        common.record_run(
            run_id=run_id,
            kind="research",
            status="failed",
            started_at=started_at,
            summary=message,
            items_scanned=len(digest),
            errors=["digest too small"],
        )
        print(f"⚠️ Cloudex research scan: {message}")
        return 1

    labels, existing_keys = existing_coverage()
    queue_depth = sum(1 for label in labels if label.startswith("- [queued]"))

    digest_text = "\n".join(
        f"- [{item.origin}] {item.title}\n  {item.url}\n  {item.summary[:400]}"
        for item in digest[:120]
    )

    prompt = common.load_prompt(
        "research",
        {
            "DIGEST": digest_text,
            "EXISTING": "\n".join(labels[-120:]) or "(nothing published yet)",
            "COMMERCIAL": "\n".join(f"- {theme}" for theme in config.get("commercial_watch", [])),
        },
    )
    common.save_artifact(run_id, "research_prompt.md", prompt)

    common.log("handing digest to Hermes…")
    try:
        ideas = hermes.run_agent_json(prompt, timeout=2400)
    except hermes.AgentError as error:
        common.record_run(
            run_id=run_id,
            kind="research",
            status="failed",
            started_at=started_at,
            summary=f"Hermes failed: {error}",
            items_scanned=len(digest),
            errors=[str(error)],
        )
        print(f"⚠️ Cloudex research scan failed: {error}")
        return 1

    if not isinstance(ideas, list):
        ideas = [ideas]
    common.save_artifact(run_id, "ideas.json", json.dumps(ideas, indent=2))

    created = 0
    skipped: list[str] = []

    for idea in ideas:
        if not isinstance(idea, dict):
            continue
        reason = valid_idea(idea)
        if reason:
            skipped.append(f"{idea.get('title', '?')[:60]} — {reason}")
            continue

        key = common.dedupe_key(idea["primaryKeyword"])
        if key in existing_keys:
            skipped.append(f"{idea['title'][:60]} — duplicate of existing coverage")
            continue
        existing_keys.add(key)

        document = {
            "_type": "topicIdea",
            "title": idea["title"][:200],
            "angle": idea["angle"],
            "dedupeKey": key,
            "primaryKeyword": idea["primaryKeyword"],
            "secondaryKeywords": [str(k) for k in (idea.get("secondaryKeywords") or [])][:8],
            "contentType": idea["contentType"],
            "searchIntent": idea.get("searchIntent", "informational"),
            "pillar": {"_type": "reference", "_ref": f"pillar-{idea['pillar']}"},
            "score": max(0, min(100, int(idea.get("score", 50)))),
            "rationale": idea.get("rationale", ""),
            "sources": [
                {
                    "_type": "citation",
                    "_key": f"src{index}",
                    "title": str(source.get("title", ""))[:300],
                    "publisher": str(source.get("publisher", ""))[:120],
                    "url": source["url"],
                    "sourceType": source.get("sourceType"),
                    "publishedDate": source.get("publishedDate"),
                    "accessedAt": common.now_iso(),
                }
                for index, source in enumerate(idea.get("sources", []))
                if str(source.get("url", "")).startswith("http")
            ],
            "status": "queued",
            "discoveredAt": common.now_iso(),
            "attempts": 0,
        }

        try:
            sanity.create(document)
            created += 1
        except Exception as error:  # noqa: BLE001
            errors.append(f"{idea['title'][:60]}: {error}")

    summary_lines = [
        f"Scanned {len(digest)} items, proposed {len(ideas)}, queued {created}.",
        f"Queue depth before this run: {queue_depth}.",
    ]
    if skipped:
        summary_lines.append("Skipped:\n" + "\n".join(f"  - {entry}" for entry in skipped))
    if errors:
        summary_lines.append("Errors:\n" + "\n".join(f"  - {entry}" for entry in errors))

    summary = "\n".join(summary_lines)
    common.log(summary)

    common.record_run(
        run_id=run_id,
        kind="research",
        status="success" if created or not errors else "failed",
        started_at=started_at,
        summary=summary,
        items_scanned=len(digest),
        ideas_created=created,
        errors=errors,
    )

    # Speak up only when there is something to act on.
    new_depth = queue_depth + created
    if new_depth < QUEUE_LOW_WATERMARK:
        print(
            f"⚠️ Cloudex topic queue is low: {new_depth} topics left "
            f"(added {created} today). Sources may need widening."
        )
    elif errors:
        print(f"⚠️ Cloudex research scan finished with {len(errors)} errors. Queue depth {new_depth}.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
