import { revalidatePath } from "next/cache";

/** Pages that list or show an article — refreshed after Hermes writes to Sanity. */
export function revalidateInsights(slug?: string, pillar?: string): void {
  for (const path of ["/insights", "/sitemap.xml", "/llms.txt", "/insights/feed.xml"]) revalidatePath(path);
  if (slug) revalidatePath(`/insights/${slug}`);
  if (pillar) revalidatePath(`/insights/topic/${pillar}`);
}
