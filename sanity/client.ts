import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Bypasses the CDN — use for `generateStaticParams` and anything that must be exact. */
export const freshClient = client.withConfig({ useCdn: false });
