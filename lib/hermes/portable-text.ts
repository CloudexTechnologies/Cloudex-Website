/**
 * Markdown → Portable Text for posts Hermes sends to /api/hermes/posts. A TypeScript
 * port of the subset the insights pipeline uses (`pipeline/lib/markdown_pt.py`):
 *
 *   ## / ### / ####      h2 / h3 / h4 (a single # becomes h2; the page owns the h1)
 *   - item  /  1. item   bullet and numbered lists
 *   > quote              blockquote
 *   ```lang filename     codeBlock
 *   **bold** *italic* `code` [text](href)
 *
 * Link hrefs are limited to http(s), mailto and site-relative paths; anything else
 * (javascript:, data:) is kept as plain text. Pure functions — runs under `node --test`.
 */

export interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

export interface LinkDef {
  _type: "link";
  _key: string;
  href: string;
}

export interface TextBlockPT {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  markDefs: LinkDef[];
  children: Span[];
  listItem?: "bullet" | "number";
  level?: number;
}

export interface CodeBlockPT {
  _type: "codeBlock";
  _key: string;
  language: string;
  filename?: string;
  code: string;
}

export type PortableBlock = TextBlockPT | CodeBlockPT;

// Groups: 1 link text, 2 href, 3 bold, 4 italic, 5 code.
const INLINE_RE =
  /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+?)\*\*|(?<![*\w])\*([^*]+?)\*(?!\*)|`([^`]+?)`/g;

function safeHref(href: string): string | undefined {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function makeKeyFactory(): () => string {
  let n = 0;
  const salt = Math.random().toString(36).slice(2, 8);
  return () => `${salt}${(n++).toString(36)}`;
}

function spans(
  text: string,
  key: () => string,
  inherited: string[] = [],
): { children: Span[]; markDefs: LinkDef[] } {
  const children: Span[] = [];
  const markDefs: LinkDef[] = [];
  let cursor = 0;
  const push = (chunk: string, marks: string[]) => {
    if (chunk) children.push({ _type: "span", _key: key(), text: chunk, marks: [...marks] });
  };

  for (const match of text.matchAll(INLINE_RE)) {
    const g = { ltext: match[1], href: match[2], bold: match[3], em: match[4], code: match[5] };
    push(text.slice(cursor, match.index), inherited);
    cursor = match.index! + match[0].length;

    if (g.ltext !== undefined) {
      const href = safeHref(g.href);
      if (href) {
        const defKey = key();
        markDefs.push({ _type: "link", _key: defKey, href });
        const nested = spans(g.ltext, key, [...inherited, defKey]);
        children.push(...nested.children);
        markDefs.push(...nested.markDefs);
      } else {
        const nested = spans(g.ltext, key, inherited);
        children.push(...nested.children);
        markDefs.push(...nested.markDefs);
      }
    } else if (g.bold !== undefined) {
      const nested = spans(g.bold, key, [...inherited, "strong"]);
      children.push(...nested.children);
      markDefs.push(...nested.markDefs);
    } else if (g.em !== undefined) {
      const nested = spans(g.em, key, [...inherited, "em"]);
      children.push(...nested.children);
      markDefs.push(...nested.markDefs);
    } else if (g.code !== undefined) {
      push(g.code, [...inherited, "code"]);
    }
  }
  push(text.slice(cursor), inherited);
  if (!children.length) children.push({ _type: "span", _key: key(), text: "", marks: [] });
  return { children, markDefs };
}

function textBlock(
  text: string,
  key: () => string,
  style: TextBlockPT["style"] = "normal",
  listItem?: TextBlockPT["listItem"],
): TextBlockPT {
  const { children, markDefs } = spans(text.replace(/<[^>]+>/g, "").trim(), key);
  const block: TextBlockPT = { _type: "block", _key: key(), style, markDefs, children };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}

export function markdownToPortableText(
  markdown: string,
  key: () => string = makeKeyFactory(),
): PortableBlock[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks: PortableBlock[] = [];
  let paragraph: string[] = [];
  let quote: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push(textBlock(paragraph.join(" "), key));
    if (quote.length) blocks.push(textBlock(quote.join(" "), key, "blockquote"));
    paragraph = [];
    quote = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (!stripped || /^([-*_])(\s*\1){2,}$/.test(stripped)) {
      flush();
      continue;
    }

    const fence = /^```([\w+-]+)?\s*(.*)$/.exec(stripped);
    if (fence) {
      flush();
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      const code = body.join("\n");
      if (code.trim()) {
        const block: CodeBlockPT = { _type: "codeBlock", _key: key(), language: fence[1] || "text", code };
        if (fence[2]) block.filename = fence[2].slice(0, 200);
        blocks.push(block);
      }
      continue;
    }

    const heading = /^(#{1,6})\s+(.*?)\s*#*$/.exec(stripped);
    if (heading) {
      flush();
      const level = Math.min(Math.max(heading[1].length, 2), 4);
      blocks.push(textBlock(heading[2], key, `h${level}` as "h2" | "h3" | "h4"));
      continue;
    }

    const bullet = /^[-*+]\s+(.*)$/.exec(stripped);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(stripped);
    if (bullet || numbered) {
      flush();
      blocks.push(textBlock((bullet ?? numbered)![1], key, "normal", bullet ? "bullet" : "number"));
      continue;
    }

    const q = /^>\s?(.*)$/.exec(stripped);
    if (q) {
      if (paragraph.length) flush();
      quote.push(q[1]);
      continue;
    }
    if (quote.length) flush();
    paragraph.push(stripped);
  }
  flush();
  return blocks;
}

/** Plain text of the body, for word counts and the default deck. */
export function plainText(blocks: PortableBlock[]): string {
  return blocks
    .map((b) => (b._type === "block" ? b.children.map((c) => c.text).join("") : ""))
    .filter(Boolean)
    .join("\n");
}
