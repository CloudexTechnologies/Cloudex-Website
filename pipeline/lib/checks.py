"""
Deterministic pre-gate checks.

These run before the LLM quality gate and are the half of the review that cannot
be talked around: an unreachable citation URL or a 600-word "deep analysis" is a
fact about the draft, not a judgement call. Anything a regex can settle is
settled here so the gate model spends its attention on substance.
"""

from __future__ import annotations

import concurrent.futures
import re
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from typing import Any

from . import settings
from .markdown_pt import collect_links, headings, portable_text_to_plain

# Phrases that mark text as machine-written to a human reader and add nothing.
BANNED_PHRASES = [
    "in today's fast-paced",
    "in today's digital",
    "ever-evolving",
    "ever-changing landscape",
    "delve into",
    "delving into",
    "rich tapestry",
    "it's important to note",
    "it is important to note",
    "in conclusion",
    "unlock the power",
    "unlock the potential",
    "game-changer",
    "game changer",
    "revolutionize",
    "revolutionise",
    "seamlessly integrate",
    "robust solution",
    "cutting-edge technology",
    "navigate the complexities",
    "harness the power",
    "at the end of the day",
    "the world of ai",
    "look no further",
    "buckle up",
    "let's dive in",
    "dive deep into",
    "paradigm shift",
    "synergy",
    "leverage the power",
]

VALID_INTERNAL_PREFIXES = (
    "/about",
    "/work",
    "/contact",
    "/insights",
    "/capabilities/ai-employees",
    "/capabilities/ai-solutions",
    "/capabilities/custom-software",
    "/capabilities/digital-growth",
    "/industries/",
)

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")
USER_AGENT = "CloudexInsightsBot/1.0 (+https://cloudextechnologies.io)"


@dataclass
class Issue:
    severity: str  # "blocker" | "warning"
    code: str
    message: str


@dataclass
class CheckReport:
    issues: list[Issue] = field(default_factory=list)
    stats: dict[str, Any] = field(default_factory=dict)

    @property
    def blockers(self) -> list[Issue]:
        return [issue for issue in self.issues if issue.severity == "blocker"]

    @property
    def warnings(self) -> list[Issue]:
        return [issue for issue in self.issues if issue.severity == "warning"]

    @property
    def passed(self) -> bool:
        return not self.blockers

    def add(self, severity: str, code: str, message: str) -> None:
        self.issues.append(Issue(severity, code, message))

    def summary(self) -> str:
        if not self.issues:
            return "All deterministic checks passed."
        return "\n".join(
            f"[{issue.severity}] {issue.code}: {issue.message}" for issue in self.issues
        )


def _words(text: str) -> list[str]:
    return re.findall(r"[A-Za-z0-9'’\-]+", text)


def _keyword_present(keyword: str, haystack: str) -> bool:
    """
    Substring matching is too strict for natural writing: "AI agent evaluation"
    rarely appears verbatim. Require every significant token instead.
    """
    tokens = [token for token in _words(keyword.lower()) if len(token) > 2]
    if not tokens:
        return False
    lowered = haystack.lower()
    return all(token in lowered for token in tokens)


def _url_reachable(url: str) -> tuple[str, bool, str]:
    """HEAD, falling back to a ranged GET for hosts that reject HEAD."""
    for method in ("HEAD", "GET"):
        request = urllib.request.Request(
            url,
            method=method,
            headers={"User-Agent": USER_AGENT, "Accept": "*/*", "Range": "bytes=0-2047"},
        )
        try:
            with urllib.request.urlopen(request, timeout=25) as response:
                if 200 <= response.status < 400:
                    return url, True, str(response.status)
        except urllib.error.HTTPError as error:
            # 403/405 usually means bot-blocked rather than missing; treat a
            # definitive 404/410 as the only proof the page does not exist.
            if error.code in (403, 405, 429):
                return url, True, f"{error.code} (assumed live)"
            if method == "GET":
                return url, False, str(error.code)
        except Exception as error:  # noqa: BLE001
            if method == "GET":
                return url, False, type(error).__name__
    return url, False, "unreachable"


def check_urls(urls: list[str]) -> dict[str, tuple[bool, str]]:
    results: dict[str, tuple[bool, str]] = {}
    if not urls:
        return results
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for url, ok, detail in pool.map(_url_reachable, urls):
            results[url] = (ok, detail)
    return results


def run_checks(draft: dict[str, Any], blocks: list[dict], *, verify_urls: bool = True) -> CheckReport:
    report = CheckReport()
    content_type = draft.get("contentType", "research")
    plain = portable_text_to_plain(blocks)
    words = _words(plain)
    word_count = len(words)
    report.stats["wordCount"] = word_count

    # ── Length ────────────────────────────────────────────────────────────────
    low, high = settings.WORD_RANGE.get(content_type, settings.WORD_RANGE["research"])
    if word_count < low:
        report.add("blocker", "length", f"Body is {word_count} words; minimum is {low}.")
    elif word_count > high:
        report.add("warning", "length", f"Body is {word_count} words; target ceiling is {high}.")

    # ── Title, slug, meta ─────────────────────────────────────────────────────
    title = draft.get("title", "")
    if not 25 <= len(title) <= 95:
        report.add("blocker", "title_length", f"Title is {len(title)} characters; keep it 25–95.")

    slug = draft.get("slug", "")
    if not SLUG_RE.match(slug) or len(slug) > 72:
        report.add("blocker", "slug", f"Slug '{slug}' must be lowercase hyphenated, max 72 chars.")

    seo_title = draft.get("seoTitle") or title
    if len(seo_title) > 65:
        report.add("blocker", "seo_title", f"SEO title is {len(seo_title)} characters; max 65.")

    seo_description = draft.get("seoDescription", "")
    if not 110 <= len(seo_description) <= 165:
        report.add(
            "blocker",
            "seo_description",
            f"Meta description is {len(seo_description)} characters; target 110–165.",
        )

    deck = draft.get("deck", "")
    if not 90 <= len(deck) <= 320:
        report.add("blocker", "deck", f"Standfirst is {len(deck)} characters; target 90–320.")

    # ── Keyword placement ─────────────────────────────────────────────────────
    keyword = draft.get("primaryKeyword", "")
    if not keyword:
        report.add("blocker", "keyword_missing", "No primary keyword set.")
    else:
        if not _keyword_present(keyword, title):
            report.add("blocker", "keyword_title", f"Primary keyword '{keyword}' is absent from the title.")
        opening = " ".join(words[:150])
        if not (_keyword_present(keyword, deck) or _keyword_present(keyword, opening)):
            report.add(
                "blocker",
                "keyword_opening",
                f"Primary keyword '{keyword}' appears in neither the standfirst nor the first 150 words.",
            )
        heading_text = " ".join(text for _, text in headings(blocks))
        if not _keyword_present(keyword, heading_text):
            report.add("warning", "keyword_headings", f"No section heading covers '{keyword}'.")

        occurrences = len(re.findall(re.escape(keyword.lower()), plain.lower()))
        density = (occurrences * len(_words(keyword)) / word_count * 100) if word_count else 0
        report.stats["keywordDensity"] = round(density, 2)
        if density > 2.5:
            report.add(
                "blocker",
                "keyword_stuffing",
                f"Primary keyword density is {density:.1f}%; keep it under 2.5%.",
            )

    # ── Structure ─────────────────────────────────────────────────────────────
    heading_list = headings(blocks)
    h2_count = sum(1 for style, _ in heading_list if style == "h2")
    report.stats["h2Count"] = h2_count
    if h2_count < 3:
        report.add("blocker", "structure", f"Only {h2_count} H2 sections; use at least 3.")

    seen_h2 = False
    seen_h3 = False
    for style, text in heading_list:
        if style == "h2":
            seen_h2, seen_h3 = True, False
        elif style == "h3":
            if not seen_h2:
                report.add("blocker", "heading_order", f"H3 '{text}' appears before any H2.")
            seen_h3 = True
        elif style == "h4" and not seen_h3:
            report.add("warning", "heading_order", f"H4 '{text}' appears before any H3.")

    # ── Takeaways and FAQ ─────────────────────────────────────────────────────
    takeaways = draft.get("keyTakeaways") or []
    if not 3 <= len(takeaways) <= 5:
        report.add("blocker", "takeaways", f"{len(takeaways)} key takeaways; provide 3–5.")
    for item in takeaways:
        length = len(_words(item))
        if not 8 <= length <= 45:
            report.add("warning", "takeaway_length", f"Takeaway is {length} words: '{item[:60]}…'")
    if len({item.strip().lower() for item in takeaways}) != len(takeaways):
        report.add("blocker", "takeaways_duplicate", "Key takeaways contain duplicates.")

    faq = draft.get("faq") or []
    if not 3 <= len(faq) <= 6:
        report.add("blocker", "faq", f"{len(faq)} FAQ entries; provide 3–6.")
    for entry in faq:
        question = entry.get("question", "")
        answer = entry.get("answer", "")
        if not question.strip().endswith("?"):
            report.add("warning", "faq_question", f"FAQ question is not a question: '{question[:60]}'")
        answer_words = len(_words(answer))
        if not 25 <= answer_words <= 110:
            report.add(
                "warning",
                "faq_answer_length",
                f"FAQ answer is {answer_words} words (target 25–110): '{question[:50]}'",
            )

    # ── Citations ─────────────────────────────────────────────────────────────
    citations = draft.get("citations") or []
    minimum = settings.MIN_CITATIONS.get(content_type, 3)
    report.stats["citationCount"] = len(citations)
    if len(citations) < minimum:
        report.add("blocker", "citations", f"{len(citations)} citations; minimum is {minimum}.")

    urls = [entry.get("url", "") for entry in citations if entry.get("url")]
    if len(set(urls)) != len(urls):
        report.add("blocker", "citations_duplicate", "The same source URL is cited more than once.")

    domains = {urllib.parse.urlparse(url).netloc.lower().removeprefix("www.") for url in urls}
    report.stats["citationDomains"] = len(domains)
    if len(domains) < 3 and len(urls) >= 3:
        report.add(
            "blocker",
            "citation_diversity",
            f"Citations span only {len(domains)} domains; use at least 3 independent sources.",
        )

    if verify_urls and urls:
        reachability = check_urls(urls)
        dead = [url for url, (ok, _) in reachability.items() if not ok]
        report.stats["deadCitations"] = dead
        for url in dead:
            report.add(
                "blocker",
                "citation_dead",
                f"Cited URL does not resolve ({reachability[url][1]}): {url}",
            )

    # ── Internal linking ──────────────────────────────────────────────────────
    links = collect_links(blocks)
    internal = [href for href in links if href.startswith("/")]
    report.stats["internalLinks"] = len(internal)
    invalid = [href for href in internal if not href.startswith(VALID_INTERNAL_PREFIXES)]
    for href in invalid:
        report.add("blocker", "internal_link_invalid", f"Internal link points at a route that does not exist: {href}")
    if len(internal) < settings.MIN_INTERNAL_LINKS:
        report.add(
            "blocker",
            "internal_links",
            f"{len(internal)} internal links; include at least {settings.MIN_INTERNAL_LINKS}.",
        )

    # ── Voice ─────────────────────────────────────────────────────────────────
    lowered = plain.lower()
    found_phrases = [phrase for phrase in BANNED_PHRASES if phrase in lowered]
    if found_phrases:
        report.add(
            "blocker",
            "banned_phrases",
            "Filler phrasing present: " + ", ".join(f"'{phrase}'" for phrase in found_phrases),
        )

    sentences = [s for s in SENTENCE_SPLIT_RE.split(plain) if len(_words(s)) > 2]
    if sentences:
        lengths = [len(_words(sentence)) for sentence in sentences]
        mean_length = sum(lengths) / len(lengths)
        report.stats["meanSentenceWords"] = round(mean_length, 1)
        report.stats["longestSentenceWords"] = max(lengths)
        if mean_length > 26:
            report.add(
                "blocker",
                "readability",
                f"Mean sentence length is {mean_length:.1f} words; keep it under 26.",
            )
        if max(lengths) > 65:
            report.add("warning", "long_sentence", f"Longest sentence runs {max(lengths)} words.")
        short_share = sum(1 for length in lengths if length < 12) / len(lengths)
        if short_share < 0.12:
            report.add(
                "warning",
                "rhythm",
                f"Only {short_share:.0%} of sentences are short; the prose reads uniformly.",
            )

    return report
