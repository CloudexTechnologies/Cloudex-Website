/**
 * The `production` dataset is public, so reads need no token — the site builds
 * and serves without any Sanity secret in the hosting environment.
 * `SANITY_API_READ_TOKEN` is only consulted for draft previews.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "so1isjsl";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-02-01";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudextechnologies.io";

/** How long a rendered insights page may be served before Next revalidates it. */
export const REVALIDATE_SECONDS = 300;
