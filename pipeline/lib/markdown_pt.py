"""
Markdown to Portable Text.

The writing agent emits Markdown because that is what language models produce
reliably; asking for raw Portable Text JSON invites malformed `_key` arrays and
silently dropped marks. Conversion happens here, deterministically, so a model
mistake shows up as a parse result we can inspect rather than as corrupt content.

Supported subset:
    ## / ### / ####      headings (h2/h3/h4)
    > quote              blockquote
    - item  /  1. item   bullet and numbered lists
    ```lang path         fenced code (optional filename after the language)
    | a | b |            pipe tables
    :::tone Heading      callout, closed by a line containing only ':::'
    **bold** *italic* `code` [text](href)
"""

from __future__ import annotations

import re
import uuid
from typing import Any

HEADING_RE = re.compile(r"^(#{2,4})\s+(.*)$")
BULLET_RE = re.compile(r"^[-*]\s+(.*)$")
NUMBER_RE = re.compile(r"^\d+[.)]\s+(.*)$")
QUOTE_RE = re.compile(r"^>\s?(.*)$")
FENCE_RE = re.compile(r"^```(\w+)?\s*(.*)$")
CALLOUT_OPEN_RE = re.compile(r"^:::\s*(\w+)\s*(.*)$")
TABLE_ROW_RE = re.compile(r"^\|(.+)\|\s*$")
TABLE_DIVIDER_RE = re.compile(r"^\|[\s:|-]+\|\s*$")

VALID_CALLOUT_TONES = {"definition", "insight", "warning", "application"}

INLINE_RE = re.compile(
    r"\[(?P<ltext>[^\]]+)\]\((?P<href>[^)\s]+)\)"
    r"|\*\*(?P<bold>[^*]+?)\*\*"
    r"|(?<![\*\w])\*(?P<em>[^*]+?)\*(?!\*)"
    r"|`(?P<code>[^`]+?)`"
)


def _key() -> str:
    return uuid.uuid4().hex[:12]


def _spans(text: str, inherited: list[str] | None = None) -> tuple[list[dict], list[dict]]:
    """Return (children, markDefs) for one line of inline Markdown."""
    inherited = inherited or []
    children: list[dict] = []
    mark_defs: list[dict] = []
    cursor = 0

    def push(chunk: str, marks: list[str]) -> None:
        if not chunk:
            return
        children.append(
            {"_type": "span", "_key": _key(), "text": chunk, "marks": list(marks)}
        )

    for match in INLINE_RE.finditer(text):
        push(text[cursor : match.start()], inherited)
        cursor = match.end()

        if match.group("ltext") is not None:
            def_key = _key()
            mark_defs.append(
                {"_key": def_key, "_type": "link", "href": match.group("href")}
            )
            # Link text may itself contain bold/code, so recurse and stack marks.
            nested, nested_defs = _spans(match.group("ltext"), inherited + [def_key])
            children.extend(nested)
            mark_defs.extend(nested_defs)
        elif match.group("bold") is not None:
            nested, nested_defs = _spans(match.group("bold"), inherited + ["strong"])
            children.extend(nested)
            mark_defs.extend(nested_defs)
        elif match.group("em") is not None:
            nested, nested_defs = _spans(match.group("em"), inherited + ["em"])
            children.extend(nested)
            mark_defs.extend(nested_defs)
        elif match.group("code") is not None:
            push(match.group("code"), inherited + ["code"])

    push(text[cursor:], inherited)

    if not children:
        children = [{"_type": "span", "_key": _key(), "text": "", "marks": []}]

    return children, mark_defs


def _text_block(text: str, style: str = "normal", list_item: str | None = None) -> dict:
    children, mark_defs = _spans(text)
    block: dict[str, Any] = {
        "_type": "block",
        "_key": _key(),
        "style": style,
        "markDefs": mark_defs,
        "children": children,
    }
    if list_item:
        block["listItem"] = list_item
        block["level"] = 1
    return block


def _split_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def markdown_to_portable_text(markdown: str) -> list[dict]:
    lines = markdown.replace("\r\n", "\n").split("\n")
    blocks: list[dict] = []
    index = 0
    paragraph: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(_text_block(" ".join(paragraph).strip()))
            paragraph = []

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            index += 1
            continue

        # ── Fenced code ───────────────────────────────────────────────────────
        fence = FENCE_RE.match(stripped)
        if fence:
            flush_paragraph()
            language = fence.group(1) or "text"
            filename = (fence.group(2) or "").strip() or None
            index += 1
            body: list[str] = []
            while index < len(lines) and not lines[index].strip().startswith("```"):
                body.append(lines[index])
                index += 1
            index += 1  # closing fence
            blocks.append(
                {
                    "_type": "codeBlock",
                    "_key": _key(),
                    "language": language,
                    "filename": filename,
                    "code": "\n".join(body),
                }
            )
            continue

        # ── Callout ───────────────────────────────────────────────────────────
        callout = CALLOUT_OPEN_RE.match(stripped)
        if callout:
            flush_paragraph()
            tone = callout.group(1).lower()
            if tone not in VALID_CALLOUT_TONES:
                tone = "insight"
            heading = (callout.group(2) or "").strip() or None
            index += 1
            body: list[str] = []
            while index < len(lines) and lines[index].strip() != ":::":
                body.append(lines[index].strip())
                index += 1
            index += 1  # closing marker
            blocks.append(
                {
                    "_type": "callout",
                    "_key": _key(),
                    "tone": tone,
                    "heading": heading,
                    "body": " ".join(part for part in body if part).strip(),
                }
            )
            continue

        # ── Table ─────────────────────────────────────────────────────────────
        if (
            TABLE_ROW_RE.match(stripped)
            and index + 1 < len(lines)
            and TABLE_DIVIDER_RE.match(lines[index + 1].strip())
        ):
            flush_paragraph()
            columns = _split_row(stripped)
            index += 2
            rows: list[dict] = []
            while index < len(lines) and TABLE_ROW_RE.match(lines[index].strip()):
                rows.append({"_key": _key(), "cells": _split_row(lines[index].strip())})
                index += 1
            blocks.append(
                {
                    "_type": "dataTable",
                    "_key": _key(),
                    "columns": columns,
                    "rows": rows,
                }
            )
            continue

        # ── Heading ───────────────────────────────────────────────────────────
        heading_match = HEADING_RE.match(stripped)
        if heading_match:
            flush_paragraph()
            level = len(heading_match.group(1))
            blocks.append(_text_block(heading_match.group(2).strip(), style=f"h{level}"))
            index += 1
            continue

        # A lone "# Title" is the article title, which lives in its own field.
        if stripped.startswith("# "):
            flush_paragraph()
            index += 1
            continue

        # ── Blockquote ────────────────────────────────────────────────────────
        quote = QUOTE_RE.match(stripped)
        if quote:
            flush_paragraph()
            quoted = [quote.group(1)]
            index += 1
            while index < len(lines) and QUOTE_RE.match(lines[index].strip()):
                quoted.append(QUOTE_RE.match(lines[index].strip()).group(1))
                index += 1
            blocks.append(_text_block(" ".join(quoted).strip(), style="blockquote"))
            continue

        # ── Lists ─────────────────────────────────────────────────────────────
        bullet = BULLET_RE.match(stripped)
        if bullet:
            flush_paragraph()
            blocks.append(_text_block(bullet.group(1).strip(), list_item="bullet"))
            index += 1
            continue

        numbered = NUMBER_RE.match(stripped)
        if numbered:
            flush_paragraph()
            blocks.append(_text_block(numbered.group(1).strip(), list_item="number"))
            index += 1
            continue

        # Horizontal rules carry no meaning in Portable Text.
        if set(stripped) <= {"-", "*", "_"} and len(stripped) >= 3:
            flush_paragraph()
            index += 1
            continue

        paragraph.append(stripped)
        index += 1

    flush_paragraph()
    return blocks


def portable_text_to_plain(blocks: list[dict]) -> str:
    """Plain-text rendering, used for word counts and readability checks."""
    parts: list[str] = []
    for block in blocks:
        block_type = block.get("_type")
        if block_type == "block":
            parts.append("".join(child.get("text", "") for child in block.get("children", [])))
        elif block_type == "callout":
            parts.append(f"{block.get('heading') or ''} {block.get('body') or ''}".strip())
        elif block_type == "dataTable":
            parts.append(" ".join(block.get("columns", [])))
            for row in block.get("rows", []):
                parts.append(" ".join(row.get("cells", [])))
        # Code is excluded deliberately: it inflates word counts without adding prose.
    return "\n".join(part for part in parts if part)


def collect_links(blocks: list[dict]) -> list[str]:
    hrefs: list[str] = []
    for block in blocks:
        for mark_def in block.get("markDefs", []) or []:
            if mark_def.get("_type") == "link" and mark_def.get("href"):
                hrefs.append(mark_def["href"])
    return hrefs


def headings(blocks: list[dict]) -> list[tuple[str, str]]:
    """(style, text) for every heading block, in document order."""
    result: list[tuple[str, str]] = []
    for block in blocks:
        if block.get("_type") != "block":
            continue
        style = block.get("style", "normal")
        if style in {"h2", "h3", "h4"}:
            text = "".join(child.get("text", "") for child in block.get("children", []))
            result.append((style, text))
    return result
