/**
 * schema.org JSON-LD builders. Rendered with `<JsonLd>` (components/seo/JsonLd.tsx).
 *
 * Every entity is linked by `@id` to the one Organization node emitted site-wide from
 * `app/layout.tsx`, so search engines see a single, consistent company graph: the
 * organisation, its website, its services, its FAQs and its articles.
 */

import type { FaqItem } from "@/components/shared/faq-content";

import { BOOKING_URL } from "./booking";
import {
  CONTACT,
  LOGO_URL,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site";

type Json = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_URL),
    image: absoluteUrl(OG_IMAGE),
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.country,
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Worldwide" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        availableLanguage: ["English"],
        areaServed: ["GB"],
      },
    ],
    knowsAbout: [
      "AI automation",
      "AI agents",
      "Chatbots",
      "Voice agents",
      "Workflow automation",
      "Marketing automation",
      "Data analytics",
      "Cloud services",
      "Cybersecurity",
      "Digital transformation",
    ],
    potentialAction: { "@type": "ReserveAction", target: BOOKING_URL, name: "Book a discovery call" },
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: readonly { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: readonly FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: readonly string[];
  audience?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Worldwide" },
    ],
    ...(input.audience ? { audience: { "@type": "BusinessAudience", audienceType: input.audience } } : null),
    ...(input.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: input.name,
            itemListElement: input.offers.map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
            })),
          },
        }
      : null),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}
