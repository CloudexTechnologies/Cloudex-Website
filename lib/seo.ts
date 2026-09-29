import type { Metadata } from "next";

export const SITE_NAME = "Cloudex Technologies";

/**
 * Public profiles, used for the footer links and the Organization `sameAs`.
 * Leave a value empty until the profile exists — a dead `#` link is worse for
 * crawlers than no link at all.
 */
export const SOCIAL_PROFILES: { label: string; url: string }[] = [
  { label: "LinkedIn", url: "" },
  { label: "X", url: "" },
  { label: "Instagram", url: "" },
  { label: "Facebook", url: "" },
  { label: "YouTube", url: "" },
].filter((profile) => profile.url);

/**
 * Metadata for a hand-authored page. Canonical and hreflang must be set per
 * route: anything set in the root layout is inherited by every page that does
 * not override it, which is how inner pages ended up canonicalised to "/".
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: path, "x-default": path },
      // Re-declared because a route's `alternates` replaces the root layout's wholesale.
      types: { "application/rss+xml": "/insights/feed.xml" },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
