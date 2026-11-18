/**
 * The request contract for POST /api/hermes/posts — how the Hermes agent publishes a
 * blog post to this site. The Cloudex website accepts the same JSON body.
 *
 *   Authorization: Bearer <HERMES_API_KEY>
 *   Content-Type: application/json
 *   {
 *     "title": "…",                       required, ≤ 200 chars
 *     "markdown": "…",                    required, ≤ 100 000 chars
 *     "slug": "my-post",                  optional, derived from the title
 *     "excerpt": "…",                     optional, ≤ 300 chars (used as meta description)
 *     "category": "Insights",             optional, one of the site's categories
 *     "coverImage": { "url": "https://…", "alt": "…", "width": 1200, "height": 630 },
 *     "publishedAt": "2026-11-18T09:00:00Z",   optional, defaults to now
 *     "status": "published" | "draft",   optional, defaults to "published"
 *     "overwrite": false                  optional, replace an existing Hermes post
 *   }
 *
 * Pure functions only (no Next or Cloudflare imports), so they run under `node --test`.
 */

export const MAX_BODY_BYTES = 256 * 1024;
export const MAX_TITLE = 200;
export const MAX_EXCERPT = 300;
export const MAX_MARKDOWN = 100_000;
export const MAX_SLUG = 120;
export const MAX_BLOCKS = 400;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostStatus = "published" | "draft";

export interface HermesCoverImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HermesPostInput {
  title: string;
  slug: string;
  markdown: string;
  excerpt?: string;
  category: string;
  coverImage?: HermesCoverImage;
  publishedAt: string;
  status: PostStatus;
  overwrite: boolean;
}

export type ValidationResult =
  | { ok: true; value: HermesPostInput }
  | { ok: false; errors: string[] };

/* -------------------------------------------------------------------------- */
/* Auth                                                                        */
/* -------------------------------------------------------------------------- */

async function sha256(text: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));
}

/**
 * True when `authorization` is `Bearer <expected>`. Compares SHA-256 digests in constant
 * time so neither the key's content nor its length leaks through timing. An unset or
 * short key never authorises anything.
 */
export async function isAuthorized(
  authorization: string | null,
  expected: string | undefined,
): Promise<boolean> {
  if (!expected || expected.length < 32) return false;
  const match = /^Bearer\s+(.+)$/i.exec(authorization?.trim() ?? "");
  if (!match) return false;
  const [a, b] = await Promise.all([sha256(match[1].trim()), sha256(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                  */
/* -------------------------------------------------------------------------- */

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG)
    .replace(/-+$/g, "");
}

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function positiveInt(value: unknown): number | undefined {
  return typeof value === "number" && Number.isInteger(value) && value > 0 && value <= 10_000
    ? value
    : undefined;
}

/**
 * Validates a parsed JSON body. `categories` is the site's allowed list; the first entry
 * is used when the body names none. Returns every problem at once so Hermes can fix
 * them in one retry.
 */
export function validatePostInput(
  body: unknown,
  categories: readonly string[],
  now: Date = new Date(),
): ValidationResult {
  const errors: string[] = [];
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, errors: ["Body must be a JSON object."] };
  }
  const b = body as Record<string, unknown>;

  const title = str(b.title) ?? "";
  if (!title) errors.push("title is required.");
  else if (title.length > MAX_TITLE) errors.push(`title must be at most ${MAX_TITLE} characters.`);

  const markdown = typeof b.markdown === "string" ? b.markdown : "";
  if (!markdown.trim()) errors.push("markdown is required.");
  else if (markdown.length > MAX_MARKDOWN)
    errors.push(`markdown must be at most ${MAX_MARKDOWN} characters.`);

  let slug = str(b.slug);
  if (slug === undefined || slug === "") slug = slugify(title);
  if (!slug) errors.push("slug could not be derived from the title; send one explicitly.");
  else if (slug.length > MAX_SLUG || !SLUG_RE.test(slug))
    errors.push("slug must be lowercase letters, digits and single hyphens, at most 120 characters.");

  let excerpt: string | undefined;
  if (b.excerpt !== undefined && b.excerpt !== null) {
    excerpt = str(b.excerpt);
    if (excerpt === undefined) errors.push("excerpt must be a string.");
    else if (excerpt.length > MAX_EXCERPT)
      errors.push(`excerpt must be at most ${MAX_EXCERPT} characters.`);
    else if (!excerpt) excerpt = undefined;
  }

  let category = categories[0];
  if (b.category !== undefined && b.category !== null) {
    const wanted = str(b.category) ?? "";
    const found = categories.find((c) => c.toLowerCase() === wanted.toLowerCase());
    if (found) category = found;
    else errors.push(`category must be one of: ${categories.join(", ")}.`);
  }

  let coverImage: HermesCoverImage | undefined;
  if (b.coverImage !== undefined && b.coverImage !== null) {
    const c = b.coverImage as Record<string, unknown>;
    const url = typeof c === "object" ? str(c.url) : undefined;
    if (!url || !isHttpsUrl(url)) errors.push("coverImage.url must be an https URL.");
    else {
      coverImage = {
        url,
        alt: (str(c.alt) ?? title).slice(0, 300),
        width: positiveInt(c.width),
        height: positiveInt(c.height),
      };
    }
  }

  let publishedAt = now.toISOString();
  if (b.publishedAt !== undefined && b.publishedAt !== null) {
    const raw = str(b.publishedAt) ?? "";
    const date = new Date(raw);
    if (!raw || Number.isNaN(date.getTime())) errors.push("publishedAt must be an ISO 8601 date.");
    else publishedAt = date.toISOString();
  }

  let status: PostStatus = "published";
  if (b.status !== undefined && b.status !== null) {
    if (b.status === "published" || b.status === "draft") status = b.status;
    else errors.push('status must be "published" or "draft".');
  }

  const overwrite = b.overwrite === true;

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    value: { title, slug: slug!, markdown, excerpt, category, coverImage, publishedAt, status, overwrite },
  };
}

/* -------------------------------------------------------------------------- */
/* Markdown → blocks                                                           */
/* -------------------------------------------------------------------------- */

export interface TextBlock {
  tag: "h2" | "p";
  text: string;
}

/** Inline markdown → plain text: keeps link text, drops images, emphasis markers and HTML. */
export function stripInline(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(\*|_)(\S(?:.*?\S)?)\1/g, "$2")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Converts markdown into the heading/paragraph blocks the blog renders. Headings of any
 * level become `h2`; list items, quotes and code become their own paragraphs (list items
 * prefixed with a bullet); everything is plain text, so nothing Hermes sends can inject
 * markup into the page.
 */
export function markdownToBlocks(markdown: string): TextBlock[] {
  const blocks: TextBlock[] = [];
  let paragraph: string[] = [];
  let inCode = false;
  let code: string[] = [];

  const push = (tag: TextBlock["tag"], raw: string) => {
    const text = tag === "p" && raw.startsWith("• ") ? `• ${stripInline(raw.slice(2))}` : stripInline(raw);
    if (text && text !== "•") blocks.push({ tag, text });
  };
  const flush = () => {
    if (paragraph.length) push("p", paragraph.join(" "));
    paragraph = [];
  };

  for (const line of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      if (inCode) {
        const text = code.join("\n").trim();
        if (text) blocks.push({ tag: "p", text });
        code = [];
      } else flush();
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }

    const heading = /^\s{0,3}#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
    const listItem = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/.exec(line);
    const quote = /^\s*>\s?(.*)$/.exec(line);

    if (!line.trim() || /^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) flush();
    else if (heading) {
      flush();
      push("h2", heading[1]);
    } else if (listItem) {
      flush();
      push("p", `• ${listItem[1]}`);
    } else if (quote) paragraph.push(quote[1]);
    else paragraph.push(line.trim());
  }
  if (inCode && code.length) blocks.push({ tag: "p", text: code.join("\n").trim() });
  flush();

  return blocks.slice(0, MAX_BLOCKS);
}

/** "Nov 18, 2026" — the display format the existing posts use. */
export function displayDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
