#!/usr/bin/env python3
"""
Write, review and publish one article.

Flow: pick a queued topic that keeps the research/commercial ratio on target →
Hermes writes it against the real sources → deterministic checks → Hermes quality
gate → at most one revision → Codex renders the hero image → publish to Sanity →
report to the owner.

Publishing is autonomous, so the gate is the only thing standing between a draft
and the public site. An article that cannot clear it is stored with status
"held" rather than published, and the owner is told why.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from lib import checks, common, hermes, markdown_pt, sanity, settings  # noqa: E402

INTERNAL_LINK_MENU = """- /capabilities/ai-employees — AI employees: autonomous digital workers
- /capabilities/ai-solutions — custom LLM pipelines, automation, data intelligence
- /capabilities/custom-software — web apps, internal tools, dashboards, platforms
- /capabilities/digital-growth — websites, conversion, growth systems
- /industries/healthcare, /industries/finance, /industries/ecommerce,
  /industries/real-estate, /industries/saas-tech, /industries/legal,
  /industries/education, /industries/hospitality
- /work — case studies
- /about — who Cloudex is
- /contact — start a conversation"""


def desired_content_type() -> str:
    """
    Keep the published mix near the target ratio by looking at what actually
    shipped, so a held or skipped run cannot drift the balance over time.
    """
    recent = sanity.query(
        '*[_type == "post" && status == "published"] | order(publishedAt desc)[0...$window]{ contentType }',
        {"window": settings.RATIO_WINDOW},
    ) or []

    if not recent:
        return "research"

    research_count = sum(1 for row in recent if row.get("contentType") == "research")
    share = research_count / len(recent)
    return "research" if share < settings.RESEARCH_SHARE else "commercial"


def pick_topic(preferred: str) -> dict[str, Any] | None:
    """Highest-scoring queued topic of the preferred type, falling back to any type."""
    query = """
      *[_type == "topicIdea" && status == "queued" && attempts < 3
        && ($type == "any" || contentType == $type)]
      | order(score desc, discoveredAt asc)[0]{
        _id, title, angle, primaryKeyword, secondaryKeywords, contentType,
        searchIntent, score, attempts,
        "pillarId": pillar._ref,
        "pillarTitle": pillar->title,
        sources[]{ title, publisher, url, sourceType, publishedDate }
      }
    """
    topic = sanity.query(query, {"type": preferred})
    if not topic:
        topic = sanity.query(query, {"type": "any"})
    return topic


def recent_articles() -> str:
    rows = sanity.query(
        '*[_type == "post" && status == "published"] | order(publishedAt desc)[0...8]'
        '{ title, "slug": slug.current, primaryKeyword }'
    ) or []
    if not rows:
        return "(no articles published yet)"
    return "\n".join(
        f"- {row['title']} — /insights/{row['slug']} (targets: {row.get('primaryKeyword')})"
        for row in rows
    )


def build_write_prompt(topic: dict[str, Any]) -> str:
    content_type = topic.get("contentType", "research")
    low, high = settings.WORD_RANGE[content_type]
    sources = topic.get("sources") or []

    source_text = (
        "\n".join(
            f"- {source.get('title')} — {source.get('publisher')} — {source.get('url')}"
            for source in sources
        )
        or "(no seed sources recorded — find primary sources yourself)"
    )

    return common.load_prompt(
        "write",
        {
            "TITLE": topic["title"],
            "ANGLE": topic["angle"],
            "KEYWORD": topic["primaryKeyword"],
            "SECONDARY": ", ".join(topic.get("secondaryKeywords") or []) or "(none)",
            "CONTENT_TYPE": content_type,
            "INTENT": topic.get("searchIntent", "informational"),
            "PILLAR": topic.get("pillarTitle") or "",
            "WORD_TARGET": f"{low}–{high}",
            "SOURCES": source_text,
            "INTERNAL_LINKS": INTERNAL_LINK_MENU,
            "MIN_INTERNAL": str(settings.MIN_INTERNAL_LINKS),
            "MIN_CITATIONS": str(settings.MIN_CITATIONS[content_type]),
            "RECENT": recent_articles(),
        },
    )


def normalise_draft(draft: dict[str, Any], topic: dict[str, Any]) -> dict[str, Any]:
    draft.setdefault("contentType", topic.get("contentType", "research"))
    draft.setdefault("primaryKeyword", topic["primaryKeyword"])
    draft["slug"] = common.slugify(draft.get("slug") or draft.get("title", ""))
    draft["secondaryKeywords"] = [
        str(keyword) for keyword in (draft.get("secondaryKeywords") or [])
    ][:8]
    draft["keyTakeaways"] = [str(item).strip() for item in (draft.get("keyTakeaways") or [])]
    draft["faq"] = [
        {"question": str(item.get("question", "")).strip(), "answer": str(item.get("answer", "")).strip()}
        for item in (draft.get("faq") or [])
        if isinstance(item, dict)
    ]
    draft["citations"] = [
        item
        for item in (draft.get("citations") or [])
        if isinstance(item, dict) and str(item.get("url", "")).startswith("http")
    ]
    return draft


def article_for_review(draft: dict[str, Any]) -> str:
    """The draft as the gate should see it — content only, no pipeline metadata."""
    return json.dumps(
        {
            key: draft.get(key)
            for key in (
                "title",
                "slug",
                "deck",
                "seoTitle",
                "seoDescription",
                "primaryKeyword",
                "secondaryKeywords",
                "keyTakeaways",
                "bodyMarkdown",
                "faq",
                "citations",
            )
        },
        indent=2,
        ensure_ascii=False,
    )


def build_post_document(
    draft: dict[str, Any],
    topic: dict[str, Any],
    blocks: list[dict],
    *,
    status: str,
    gate: dict[str, Any],
    revisions: int,
    word_count: int,
    hero: dict[str, Any] | None,
) -> dict[str, Any]:
    scores = gate.get("scores", {}) if isinstance(gate, dict) else {}
    now = common.now_iso()

    document: dict[str, Any] = {
        "_type": "post",
        "title": draft["title"],
        "slug": {"_type": "slug", "current": draft["slug"]},
        "deck": draft["deck"],
        "contentType": draft["contentType"],
        "pillar": {"_type": "reference", "_ref": topic["pillarId"]},
        "author": {"_type": "reference", "_ref": settings.DEFAULT_AUTHOR_ID},
        "publishedAt": now,
        "reviewedAt": now,
        "keyTakeaways": draft["keyTakeaways"],
        "body": blocks,
        "faq": [
            {"_type": "faqItem", "_key": f"faq{index}", **item}
            for index, item in enumerate(draft["faq"])
        ],
        "citations": [
            {
                "_type": "citation",
                "_key": f"cit{index}",
                "title": str(item.get("title", ""))[:300],
                "publisher": str(item.get("publisher", ""))[:120],
                "url": item["url"],
                "sourceType": item.get("sourceType"),
                "publishedDate": item.get("publishedDate"),
                "accessedAt": now,
            }
            for index, item in enumerate(draft["citations"])
        ],
        "primaryKeyword": draft["primaryKeyword"],
        "secondaryKeywords": draft["secondaryKeywords"],
        "searchIntent": topic.get("searchIntent", "informational"),
        "seo": {
            "_type": "seo",
            "title": draft.get("seoTitle"),
            "description": draft.get("seoDescription"),
            "noIndex": False,
        },
        "wordCount": word_count,
        "readingTime": common.reading_time(word_count),
        "status": status,
        "generatedBy": "hermes-cloudex-pipeline/1.0 (gpt-5.5)",
        "topicIdea": {"_type": "reference", "_ref": topic["_id"]},
        "qualityGate": {
            "verdict": gate.get("verdict", "unknown"),
            "score": scores.get("overall"),
            "accuracy": scores.get("accuracy"),
            "depth": scores.get("depth"),
            "readability": scores.get("readability"),
            "seo": scores.get("seo"),
            "brandFit": scores.get("brandFit"),
            "revisions": revisions,
            "notes": json.dumps(
                {"notes": gate.get("notes"), "issues": gate.get("issues", [])},
                ensure_ascii=False,
            )[:4000],
            "runId": gate.get("_runId", ""),
            "checkedAt": now,
        },
    }

    if hero:
        document["heroImage"] = hero
    return document


def run_gate(draft: dict[str, Any], report: checks.CheckReport, run_id: str) -> dict[str, Any]:
    prompt = common.load_prompt(
        "gate",
        {
            "CHECK_REPORT": report.summary(),
            "ARTICLE": article_for_review(draft),
            "PASS_SCORE": str(int(settings.GATE_PASS_SCORE)),
        },
    )
    common.save_artifact(run_id, "gate_prompt.md", prompt)
    verdict = hermes.run_agent_json(prompt, timeout=2400)
    if not isinstance(verdict, dict):
        raise hermes.AgentError("gate returned a non-object verdict")
    verdict["_runId"] = run_id
    return verdict


def gate_allows_publish(gate: dict[str, Any], report: checks.CheckReport) -> tuple[bool, str]:
    if not report.passed:
        return False, f"{len(report.blockers)} deterministic blockers remain"

    verdict = gate.get("verdict")
    if verdict != "pass":
        return False, f"gate verdict was '{verdict}'"

    scores = gate.get("scores") or {}
    overall = float(scores.get("overall") or 0)
    accuracy = float(scores.get("accuracy") or 0)

    if accuracy < 85:
        return False, f"accuracy score {accuracy:.0f} is below the 85 floor"
    if overall < settings.GATE_PASS_SCORE:
        return False, f"overall score {overall:.0f} is below the {settings.GATE_PASS_SCORE:.0f} threshold"

    blocking_issues = [
        issue
        for issue in (gate.get("issues") or [])
        if isinstance(issue, dict) and issue.get("severity") in {"blocker", "major"}
    ]
    if blocking_issues:
        return False, f"gate passed but listed {len(blocking_issues)} blocking issues"

    return True, "cleared review"


def owner_summary(
    *,
    published: bool,
    draft: dict[str, Any],
    topic: dict[str, Any],
    gate: dict[str, Any],
    report: checks.CheckReport,
    reason: str,
    revisions: int,
    word_count: int,
) -> str:
    scores = gate.get("scores") or {}
    lines: list[str] = []

    if published:
        lines.append("✅ Cloudex published a new article")
        lines.append("")
        lines.append(draft["title"])
        lines.append(f"{settings.SITE_URL}/insights/{draft['slug']}")
    else:
        lines.append("⏸️ Cloudex article held — not published")
        lines.append("")
        lines.append(draft.get("title", topic["title"]))
        lines.append(f"Reason: {reason}")

    lines.append("")
    lines.append(
        f"{draft.get('contentType', '?')} · {word_count} words · "
        f"{len(draft.get('citations', []))} sources · {revisions} revision(s)"
    )

    if scores:
        lines.append(
            "Scores — overall {overall}, accuracy {accuracy}, depth {depth}, "
            "readability {readability}, SEO {seo}, brand {brandFit}".format(
                overall=scores.get("overall", "?"),
                accuracy=scores.get("accuracy", "?"),
                depth=scores.get("depth", "?"),
                readability=scores.get("readability", "?"),
                seo=scores.get("seo", "?"),
                brandFit=scores.get("brandFit", "?"),
            )
        )

    if gate.get("notes"):
        lines.append("")
        lines.append(str(gate["notes"])[:600])

    open_issues = [
        issue
        for issue in (gate.get("issues") or [])
        if isinstance(issue, dict) and issue.get("severity") in {"blocker", "major"}
    ]
    if open_issues:
        lines.append("")
        lines.append("Outstanding:")
        for issue in open_issues[:4]:
            lines.append(f"• {str(issue.get('problem', ''))[:160]}")

    if report.blockers:
        lines.append("")
        lines.append("Failed checks:")
        for issue in report.blockers[:5]:
            lines.append(f"• {issue.message[:160]}")

    if not published:
        lines.append("")
        lines.append("Held drafts are in the Studio under Articles → Held at quality gate.")

    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Write and publish one article.")
    parser.add_argument("--dry-run", action="store_true", help="Do everything except write to Sanity.")
    parser.add_argument("--topic-id", help="Force a specific topicIdea document id.")
    parser.add_argument("--skip-image", action="store_true", help="Publish without a hero image.")
    args = parser.parse_args()

    run_id = common.new_run_id("publish")
    started_at = common.now_iso()
    common.log(f"run {run_id}")

    preferred = desired_content_type()
    common.log(f"target content type: {preferred}")

    if args.topic_id:
        topic = sanity.query(
            """*[_id == $id][0]{
                 _id, title, angle, primaryKeyword, secondaryKeywords, contentType,
                 searchIntent, score, attempts, "pillarId": pillar._ref,
                 "pillarTitle": pillar->title,
                 sources[]{ title, publisher, url, sourceType, publishedDate }
               }""",
            {"id": args.topic_id},
        )
    else:
        topic = pick_topic(preferred)

    if not topic:
        message = "No queued topics available — the research scan has not produced anything writable."
        common.log(message)
        common.record_run(
            run_id=run_id, kind="publish", status="skipped", started_at=started_at, summary=message
        )
        print(f"⚠️ Cloudex publish skipped: {message}")
        return 0

    common.log(f"writing: {topic['title']}")
    if not args.dry_run:
        sanity.patch(topic["_id"], {"status": "writing"}, inc={"attempts": 1})

    # ── Draft ─────────────────────────────────────────────────────────────────
    try:
        draft = hermes.run_agent_json(build_write_prompt(topic), timeout=3600)
    except hermes.AgentError as error:
        if not args.dry_run:
            sanity.patch(topic["_id"], {"status": "queued"})
        common.record_run(
            run_id=run_id,
            kind="publish",
            status="failed",
            started_at=started_at,
            summary=f"Writer failed: {error}",
            errors=[str(error)],
        )
        print(f"⚠️ Cloudex publish failed while writing '{topic['title']}': {error}")
        return 1

    if not isinstance(draft, dict):
        print("⚠️ Cloudex publish failed: writer returned an unexpected shape.")
        return 1

    if draft.get("abort"):
        reason = str(draft.get("reason", "no reason given"))
        common.log(f"writer aborted: {reason}")
        if not args.dry_run:
            sanity.patch(topic["_id"], {"status": "rejected", "rationale": reason[:1000]})
        common.record_run(
            run_id=run_id,
            kind="publish",
            status="skipped",
            started_at=started_at,
            summary=f"Writer aborted on '{topic['title']}': {reason}",
        )
        print(
            f"🛑 Cloudex dropped a topic after research\n\n{topic['title']}\n\n"
            f"The sources did not support the angle: {reason}\n\n"
            "The topic has been marked rejected; the next run picks a different one."
        )
        return 0

    draft = normalise_draft(draft, topic)
    common.save_artifact(run_id, "draft_v1.json", json.dumps(draft, indent=2, ensure_ascii=False))

    # ── Check, gate, revise ───────────────────────────────────────────────────
    revisions = 0
    blocks = markdown_pt.markdown_to_portable_text(draft.get("bodyMarkdown", ""))
    report = checks.run_checks(draft, blocks)
    common.log(f"checks: {len(report.blockers)} blockers, {len(report.warnings)} warnings")

    gate = run_gate(draft, report, run_id)
    common.log(f"gate verdict: {gate.get('verdict')} scores={gate.get('scores')}")

    allowed, reason = gate_allows_publish(gate, report)

    while not allowed and revisions < settings.MAX_REVISIONS and gate.get("verdict") != "reject":
        revisions += 1
        common.log(f"revision {revisions}: {reason}")

        revise_prompt = common.load_prompt(
            "revise",
            {
                "FINDINGS": json.dumps(
                    {"verdict": gate.get("verdict"), "issues": gate.get("issues", []), "notes": gate.get("notes")},
                    indent=2,
                    ensure_ascii=False,
                ),
                "CHECK_REPORT": report.summary(),
                "ARTICLE": article_for_review(draft),
            },
        )

        try:
            revised = hermes.run_agent_json(revise_prompt, timeout=3600)
        except hermes.AgentError as error:
            common.log(f"revision failed: {error}")
            break

        if not isinstance(revised, dict) or not revised.get("bodyMarkdown"):
            common.log("revision returned an unusable draft; keeping the original")
            break

        draft = normalise_draft(revised, topic)
        common.save_artifact(
            run_id, f"draft_v{revisions + 1}.json", json.dumps(draft, indent=2, ensure_ascii=False)
        )
        blocks = markdown_pt.markdown_to_portable_text(draft.get("bodyMarkdown", ""))
        report = checks.run_checks(draft, blocks)
        gate = run_gate(draft, report, run_id)
        allowed, reason = gate_allows_publish(gate, report)
        common.log(f"post-revision gate: {gate.get('verdict')} — {reason}")

    word_count = report.stats.get("wordCount", 0)

    # A slug collision would silently create a second document on the same URL.
    if not args.dry_run and sanity.slug_exists(draft["slug"]):
        draft["slug"] = f"{draft['slug'][:64]}-{run_id[-6:]}"
        common.log(f"slug collision resolved to {draft['slug']}")

    # ── Hero image ────────────────────────────────────────────────────────────
    hero = None
    if allowed and not args.skip_image and not args.dry_run:
        image_prompt = (
            draft.get("imagePrompt")
            or f"Abstract editorial illustration representing {draft['primaryKeyword']}."
        )
        image_prompt = (
            f"{image_prompt} Editorial tech-magazine illustration, abstract and geometric, "
            f"dark navy background #050509, deep blue accent #2563EB, thin luminous lines, "
            f"generous negative space, no text, no logos, no human faces, 16:9 landscape."
        )
        try:
            common.log("generating hero image with Codex…")
            image_path = hermes.generate_image(
                image_prompt, settings.WORK_DIR / run_id / "hero.png"
            )
            asset = sanity.upload_image(image_path, filename=f"{draft['slug']}.png")
            hero = sanity.image_field(
                asset["_id"],
                draft.get("imageAlt") or draft["title"],
                generation_prompt=image_prompt,
            )
            common.log(f"hero image uploaded: {asset['_id']}")
        except Exception as error:  # noqa: BLE001 - an article without art still publishes
            common.log(f"warn: hero image failed, publishing without one: {error}")

    # ── Publish ───────────────────────────────────────────────────────────────
    status = "published" if allowed else "held"
    document = build_post_document(
        draft, topic, blocks,
        status=status, gate=gate, revisions=revisions, word_count=word_count, hero=hero,
    )
    common.save_artifact(run_id, "post_document.json", json.dumps(document, indent=2, ensure_ascii=False))

    post_id = None
    if args.dry_run:
        common.log("dry run — nothing written to Sanity")
    else:
        post_id = sanity.create(document)
        sanity.patch(
            topic["_id"],
            {"status": "published" if allowed else "queued"},
        )
        if allowed:
            common.ping_revalidate(draft["slug"])

    common.record_run(
        run_id=run_id,
        kind="publish",
        status="success" if allowed else "held",
        started_at=started_at,
        summary=f"{status}: {draft['title']} — {reason}\n\n{report.summary()}",
        post_id=post_id,
    )

    print(
        owner_summary(
            published=allowed,
            draft=draft,
            topic=topic,
            gate=gate,
            report=report,
            reason=reason,
            revisions=revisions,
            word_count=word_count,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
