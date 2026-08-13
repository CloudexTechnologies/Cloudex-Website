import type { PortableTextBlock } from "next-sanity";

/** Stable, readable anchor for a heading — used by both the TOC and the rendered heading. */
export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  if (slug.length <= 60) return slug;
  // Cut on a word boundary — a fragment ending mid-word reads as broken in a URL.
  return slug.slice(0, 60).replace(/-[^-]*$/, "");
}

/** Plain text of a Portable Text block, ignoring marks and non-text children. */
export function blockToPlainText(block: PortableTextBlock): string {
  const children = (block as { children?: { text?: string }[] }).children;
  if (!Array.isArray(children)) return "";
  return children.map((child) => child.text ?? "").join("");
}

export type TocEntry = { key: string; id: string; text: string; level: 2 | 3 };

/**
 * H2s and H3s only. H4 is available to writers for minor breaks but would make
 * the contents list noisy, so it is deliberately excluded.
 */
export function buildToc(body: PortableTextBlock[] | undefined): TocEntry[] {
  if (!Array.isArray(body)) return [];
  const seen = new Map<string, number>();

  return body.flatMap((block) => {
    if (block._type !== "block") return [];
    const style = (block as { style?: string }).style;
    if (style !== "h2" && style !== "h3") return [];

    const text = blockToPlainText(block);
    if (!text) return [];

    // Two sections can legitimately share a heading; suffix duplicates so anchors stay unique.
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    return [
      {
        key: block._key as string,
        id,
        text,
        level: style === "h2" ? (2 as const) : (3 as const),
      },
    ];
  });
}

/**
 * The renderer sees blocks one at a time and cannot recompute the duplicate
 * suffixes, so anchors are resolved up front and looked up by block key.
 */
export function headingIdMap(toc: TocEntry[]): Map<string, string> {
  return new Map(toc.map((entry) => [entry.key, entry.id]));
}

export function formatDate(value: string | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(value: string | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
