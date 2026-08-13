"""Source collection for the daily research scan. Stdlib only."""

from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta, timezone

USER_AGENT = "CloudexInsightsBot/1.0 (+https://cloudextechnologies.io)"
TAG_RE = re.compile(r"<[^>]+>")
WHITESPACE_RE = re.compile(r"\s+")


@dataclass
class SourceItem:
    title: str
    url: str
    summary: str
    published: str
    origin: str

    def to_dict(self) -> dict:
        return asdict(self)


def _get(url: str, *, timeout: int = 45) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read()


def _clean(text: str, limit: int = 700) -> str:
    text = TAG_RE.sub(" ", text or "")
    text = WHITESPACE_RE.sub(" ", text).strip()
    return text[:limit]


def arxiv_recent(categories: list[str], *, days: int = 3, limit: int = 25) -> list[SourceItem]:
    """
    Recent submissions in the given categories. arXiv's `search_query` sorts by
    submission date, so a short window plus a modest limit is enough to catch
    what moved this week without pulling the whole firehose.
    """
    query = " OR ".join(f"cat:{category}" for category in categories)
    params = urllib.parse.urlencode(
        {
            "search_query": query,
            "start": 0,
            "max_results": limit,
            "sortBy": "submittedDate",
            "sortOrder": "descending",
        }
    )
    try:
        raw = _get(f"https://export.arxiv.org/api/query?{params}")
    except Exception as error:  # noqa: BLE001
        print(f"[warn] arxiv fetch failed: {error}")
        return []

    namespace = {"atom": "http://www.w3.org/2005/Atom"}
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as error:
        print(f"[warn] arxiv parse failed: {error}")
        return []

    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    items: list[SourceItem] = []
    for entry in root.findall("atom:entry", namespace):
        published = (entry.findtext("atom:published", "", namespace) or "").strip()
        try:
            published_at = datetime.fromisoformat(published.replace("Z", "+00:00"))
        except ValueError:
            published_at = datetime.now(timezone.utc)
        if published_at < cutoff:
            continue
        items.append(
            SourceItem(
                title=_clean(entry.findtext("atom:title", "", namespace), 220),
                url=(entry.findtext("atom:id", "", namespace) or "").strip(),
                summary=_clean(entry.findtext("atom:summary", "", namespace)),
                published=published_at.date().isoformat(),
                origin="arxiv",
            )
        )
    return items


def rss_items(url: str, origin: str, *, days: int = 14, limit: int = 12) -> list[SourceItem]:
    """Parse either RSS 2.0 or Atom — vendor blogs are split roughly evenly between them."""
    try:
        raw = _get(url)
        root = ET.fromstring(raw)
    except Exception as error:  # noqa: BLE001
        print(f"[warn] feed {origin} failed: {error}")
        return []

    items: list[SourceItem] = []
    atom_ns = {"atom": "http://www.w3.org/2005/Atom"}

    for node in root.findall(".//item")[:limit]:
        items.append(
            SourceItem(
                title=_clean(node.findtext("title", ""), 220),
                url=(node.findtext("link", "") or "").strip(),
                summary=_clean(node.findtext("description", "")),
                published=(node.findtext("pubDate", "") or "").strip()[:25],
                origin=origin,
            )
        )

    if not items:
        for node in root.findall("atom:entry", atom_ns)[:limit]:
            link_node = node.find("atom:link", atom_ns)
            items.append(
                SourceItem(
                    title=_clean(node.findtext("atom:title", "", atom_ns), 220),
                    url=(link_node.get("href") if link_node is not None else "") or "",
                    summary=_clean(
                        node.findtext("atom:summary", "", atom_ns)
                        or node.findtext("atom:content", "", atom_ns)
                    ),
                    published=(node.findtext("atom:updated", "", atom_ns) or "")[:10],
                    origin=origin,
                )
            )

    return [item for item in items if item.url]


def hn_stories(query: str, *, days: int = 7, limit: int = 20, min_points: int = 60) -> list[SourceItem]:
    """
    Hacker News front-page traction is a usable proxy for what practitioners are
    arguing about this week, which is not the same signal as what arXiv published.
    """
    since = int((datetime.now(timezone.utc) - timedelta(days=days)).timestamp())
    params = urllib.parse.urlencode(
        {
            "query": query,
            "tags": "story",
            "numericFilters": f"created_at_i>{since},points>{min_points}",
            "hitsPerPage": limit,
        }
    )
    try:
        payload = json.loads(_get(f"https://hn.algolia.com/api/v1/search?{params}"))
    except Exception as error:  # noqa: BLE001
        print(f"[warn] hn fetch failed: {error}")
        return []

    items: list[SourceItem] = []
    for hit in payload.get("hits", []):
        url = hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
        items.append(
            SourceItem(
                title=_clean(hit.get("title") or "", 220),
                url=url,
                summary=f"{hit.get('points', 0)} points, {hit.get('num_comments', 0)} comments on Hacker News",
                published=(hit.get("created_at") or "")[:10],
                origin="hackernews",
            )
        )
    return items
