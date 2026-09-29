/**
 * Site identity and SEO defaults: the one source for the canonical origin, names, contact
 * details and default copy used by metadata, the sitemap, robots.txt, llms.txt and the
 * JSON-LD structured data.
 *
 * `SITE_URL` is the production origin. Override it per environment with
 * `NEXT_PUBLIC_SITE_URL` (e.g. a staging domain); never include a trailing slash.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudextechnologies.io").replace(/\/+$/, "");

export const SITE_NAME = "Cloudex Technologies";

/** Home `<title>`: brand first, then the terms buyers search for. */
export const SITE_TITLE = "Cloudex Technologies | AI Native Technology Firm";

/** Default meta description (~155 chars): what we do, for whom, where. */
export const SITE_DESCRIPTION =
  "AI Native Technology Firm in the United Kingdom. We build Digital FTEs, AI employees that work alongside your team, plus data, cloud and IT services.";

export const SITE_KEYWORDS = [
  "AI Native Technology Firm",
  "AI Native Technology Firm UK",
  "AI technology firm Wolverhampton",
  "Digital FTE",
  "AI employees",
  "AI workforce",
  "10-80-10 rule",
  "Forward Deployed Engineers",
  "Knowledge System of Record",
  "custom AI agents",
  "AI chatbots for business",
  "AI voice agents",
  "workflow automation",
  "marketing automation",
  "AI consulting",
  "technology partner",
  "digital transformation",
  "enterprise IT services",
  "Cloudex Technologies",
];

/** Default social card (1200×630-class artwork already on the site). */
export const OG_IMAGE = "/assets/images/GUBRRoaJBzzhVwBh8mgauaj6uBE.png";

export const LOGO_URL = "/assets/images/brand/cloudex-logo.png";

export const CONTACT = {
  email: "info@cloudextechnologies.io",
  phone: "+44 7840 983410",
  streetAddress: "852, 85 Dunstall Hill",
  locality: "Wolverhampton",
  region: "West Midlands",
  postalCode: "WV6 0SR",
  country: "GB",
  countryName: "United Kingdom",
  hours: "Monday to Friday, 9AM to 6PM UK time",
} as const;

export const absoluteUrl = (path = "/"): string => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
