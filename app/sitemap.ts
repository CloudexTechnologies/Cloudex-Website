import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { REVALIDATE_SECONDS, siteUrl } from "@/sanity/env";
import { CONTENT_INDEX_QUERY } from "@/sanity/queries";
import { STATIC_ROUTES } from "@/lib/staticRoutes";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

type IndexResult = {
  posts: { slug: string; publishedAt: string; _updatedAt: string }[];
  pillars: { slug: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let content: IndexResult = { posts: [], pillars: [] };
  try {
    content = await client.fetch<IndexResult>(CONTENT_INDEX_QUERY);
  } catch (error) {
    // A Sanity outage should degrade the sitemap to the static routes, not 500 it.
    console.error("sitemap: failed to load content from Sanity", error);
  }

  const pillarEntries: MetadataRoute.Sitemap = content.pillars.map((pillar) => ({
    url: `${siteUrl}/insights/topic/${pillar.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = content.posts.map((post) => ({
    url: `${siteUrl}/insights/${post.slug}`,
    lastModified: new Date(post._updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...pillarEntries, ...postEntries];
}
