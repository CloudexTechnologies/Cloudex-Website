import { client } from "@/sanity/client";
import { REVALIDATE_SECONDS, siteUrl } from "@/sanity/env";
import { CONTENT_INDEX_QUERY } from "@/sanity/queries";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

type IndexResult = {
  posts: {
    title: string;
    slug: string;
    deck: string;
    publishedAt: string;
    pillar?: { title: string };
    author?: string;
  }[];
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: IndexResult["posts"] = [];
  try {
    ({ posts } = await client.fetch<IndexResult>(CONTENT_INDEX_QUERY));
  } catch (error) {
    console.error("feed.xml: failed to load content from Sanity", error);
  }

  const items = posts
    .slice(0, 50)
    .map((post) => {
      const url = `${siteUrl}/insights/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.deck)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
${post.pillar ? `      <category>${escapeXml(post.pillar.title)}</category>\n` : ""}${
        post.author ? `      <dc:creator>${escapeXml(post.author)}</dc:creator>\n` : ""
      }    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Cloudex Technologies — Insights</title>
    <link>${siteUrl}/insights</link>
    <description>Technical analysis of AI systems, agent architectures, and applied automation from Cloudex Technologies.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/insights/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
