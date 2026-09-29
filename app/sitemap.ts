import type { MetadataRoute } from "next";

import { INDUSTRY_PAGES, SERVICE_PAGES, industryHref, serviceHref } from "@/components/enterprise/detail-pages";
import { absoluteUrl } from "@/lib/site";
import { client } from "@/sanity/client";
import { CONTENT_INDEX_QUERY } from "@/sanity/queries";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

type IndexResult = {
  posts: { slug: string; publishedAt: string; _updatedAt: string }[];
  pillars: { slug: string }[];
};

/**
 * /sitemap.xml — every public route, generated from the same data the pages render, so a
 * new service, industry or insight is listed automatically. Priorities rank the pages a
 * buyer lands on (home, services, industries) above supporting ones.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/ai-workforce"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/legal-pages/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const services = SERVICE_PAGES.map((p) => ({
    url: absoluteUrl(serviceHref(p.slug)),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industries = INDUSTRY_PAGES.map((p) => ({
    url: absoluteUrl(industryHref(p.slug)),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  let content: IndexResult = { posts: [], pillars: [] };
  try {
    content = await client.fetch<IndexResult>(CONTENT_INDEX_QUERY);
  } catch (error) {
    // A Sanity outage should degrade the sitemap to the static routes, not 500 it.
    console.error("sitemap: failed to load content from Sanity", error);
  }

  const pillars = content.pillars.map((pillar) => ({
    url: absoluteUrl(`/insights/topic/${pillar.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const posts = content.posts.map((post) => ({
    url: absoluteUrl(`/insights/${post.slug}`),
    lastModified: new Date(post._updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...core, ...services, ...industries, ...pillars, ...posts];
}
