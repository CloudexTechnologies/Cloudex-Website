import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Reads go to the Sanity API, not its CDN. Every page that uses this is ISR-cached on
 * Cloudflare, so Sanity sees roughly one request per page per revalidation window. The
 * CDN, by contrast, kept serving the previous version of a query for minutes after a
 * publish or archive, which on-demand revalidation then re-cached as the "fresh" page.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

/** Bypasses the CDN — use for `generateStaticParams` and anything that must be exact. */
export const freshClient = client.withConfig({ useCdn: false });
