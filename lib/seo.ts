/**
 * Per-page metadata in one shape: title (the root template appends "| Cloudex Technologies"),
 * description, canonical URL, and matching Open Graph / Twitter cards.
 */

import type { Metadata } from "next";

import { OG_IMAGE, SITE_NAME } from "./site";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: readonly string[];
}): Metadata {
  const image = input.image ?? OG_IMAGE;
  const fullTitle = `${input.title} | ${SITE_NAME}`;
  return {
    title: input.title,
    description: input.description,
    ...(input.keywords ? { keywords: [...input.keywords] } : null),
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      url: input.path,
      title: fullTitle,
      description: input.description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: image, alt: input.title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : null),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [image],
    },
  };
}

/** Trim to a search-snippet length at a word boundary. */
export function snippet(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
