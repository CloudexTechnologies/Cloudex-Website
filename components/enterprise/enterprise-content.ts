/**
 * Copy for `/services`, `/industries` and the home-page enterprise teaser.
 *
 * NOT part of the Framer original: these pages were added after the migration to position
 * Cloudex Technologies as a consulting and technology partner for corporates, alongside its
 * AI-automation core. The service-line and industry taxonomy follows the categories large
 * regional IT consultancies use; every description here is Cloudex Technologies's own wording.
 *
 * Every CTA below is new, so its rolling-text uuids have no rule in `components.css` and
 * the buttons render with `selfContained` (see `AboutCtaButton`).
 */

import type { FaqItem } from "@/components/shared/faq-content";

import { INDUSTRY_PAGES, SERVICE_PAGES, industryHref, serviceHref } from "./detail-pages";
import type { EnterpriseIconName } from "./EnterpriseIcon";

export interface EnterpriseCard {
  readonly icon: EnterpriseIconName;
  readonly title: string;
  readonly body: string;
  /** Rendered as a short list under the body. */
  readonly items?: readonly string[];
  /** Makes the whole card a link, with a "Learn more" line. */
  readonly href?: string;
}

export interface EnterpriseStat {
  readonly value: string;
  readonly label: string;
}

export interface EnterpriseImage {
  readonly src: string;
  readonly srcSet: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/* -------------------------------------------------------------------------- */
/* /services                                                                   */
/* -------------------------------------------------------------------------- */

export const SERVICES_HERO = {
  badge: "Services",
  heading: "Your Consulting and Technology Partner",
  notch: "Advisory, delivery and managed services",
  intro:
    "Digital FTEs are our core: AI employees that work alongside your team. Around them, we help corporates plan, build and run modern technology, from strategy to delivery and long-term managed services.",
  stats: [
    { value: "6", label: "Service lines" },
    { value: "9", label: "Industries" },
    { value: "2", label: "Countries" },
  ],
  image: {
    src: "/assets/images/ai/services-hero-1536.jpg",
    srcSet:
      "/assets/images/ai/services-hero-512.jpg 512w,/assets/images/ai/services-hero-1024.jpg 1024w,/assets/images/ai/services-hero-1536.jpg 1536w",
    width: 1536,
    height: 1024,
    alt: "a consultant presenting a technology roadmap to executives in a boardroom",
  },
} as const satisfies {
  badge: string;
  heading: string;
  notch: string;
  intro: string;
  stats: readonly EnterpriseStat[];
  image: EnterpriseImage;
};

export const SERVICE_LINES_SECTION = {
  badge: "What we deliver",
  heading: "End-to-end services for the modern enterprise",
  body: "Engage us for a single initiative or as a long-term partner across your technology estate.",
  ctaLabel: "Talk to a consultant",
  ctaHref: "/contact",
  ctaUuids: [
    "3f6c1a2e-8b47-4d19-a5e0-7c2b9d4f6e81",
    "9a2d5e7b-1c63-4f8a-b2d4-6e0f3a9c7b52",
    "c7e41b09-5d2a-4e6f-8a13-2b9f0d6c4e73",
  ],
} as const;

/** Overview cards, one per `/services/<slug>` page (defined in `detail-pages.ts`). */
export const SERVICE_LINES: readonly EnterpriseCard[] = SERVICE_PAGES.map((p) => ({
  icon: p.icon,
  title: p.title,
  body: p.summary,
  items: p.items,
  href: serviceHref(p.slug),
}));

export const SERVICES_FAQ: readonly FaqItem[] = [
  {
    question: "Do you only work on AI automation projects?",
    answer:
      "No. Digital FTEs are our core, but we also advise on and deliver digital transformation, data, cloud, security and infrastructure programmes for corporates.",
  },
  {
    question: "Can you act as a long-term technology partner?",
    answer:
      "Yes. Many clients start with one initiative and then retain us for delivery, integration and managed services across their technology estate.",
  },
  {
    question: "How does an engagement usually start?",
    answer:
      "With a short discovery and assessment. We map your goals, systems and constraints, then propose a roadmap with clear scope, timelines and outcomes.",
  },
  {
    question: "Do you work with our existing vendors and systems?",
    answer:
      "Yes. We integrate with the platforms you already use and work alongside your internal teams and other vendors rather than replacing them.",
  },
  {
    question: "Where do you deliver from?",
    answer:
      "Our team is based in Wolverhampton, UK, and we deliver on site and remotely to clients across the UK and beyond.",
  },
];

/* -------------------------------------------------------------------------- */
/* /industries                                                                 */
/* -------------------------------------------------------------------------- */

export const INDUSTRIES_HERO = {
  badge: "Industries",
  heading: "Technology Expertise for Every Industry",
  notch: "Consultant and technology partner",
  intro:
    "We bring AI, data and cloud expertise to corporates and public institutions, adapting proven solutions to the regulations, systems and realities of each sector.",
  stats: [
    { value: "9", label: "Industries" },
    { value: "50+", label: "Works automated" },
    { value: "70%", label: "Time saved" },
  ],
  image: {
    src: "/assets/images/ai/industries-hero-1536.jpg",
    srcSet:
      "/assets/images/ai/industries-hero-512.jpg 512w,/assets/images/ai/industries-hero-1024.jpg 1024w,/assets/images/ai/industries-hero-1536.jpg 1536w",
    width: 1536,
    height: 1024,
    alt: "engineers working in an operations centre with large monitoring dashboards",
  },
} as const satisfies {
  badge: string;
  heading: string;
  notch: string;
  intro: string;
  stats: readonly EnterpriseStat[];
  image: EnterpriseImage;
};

export const INDUSTRIES_SECTION = {
  badge: "Industries we serve",
  heading: "Sector knowledge, applied with modern technology",
  body: "Every industry has its own rules and systems. We tailor each solution to them.",
  ctaLabel: "Explore our services",
  ctaHref: "/services",
  ctaUuids: [
    "5b8e2f14-6a3c-4d97-9e21-0c4f7a8b3d65",
    "e2a9c6d3-7f15-4b08-a6c4-9d3e1b5f7a20",
    "71d4b8e6-2c9f-4a53-b7e0-5f8a2c6d9e14",
  ],
} as const;

/** Overview cards, one per `/industries/<slug>` page (defined in `detail-pages.ts`). */
export const INDUSTRIES: readonly EnterpriseCard[] = INDUSTRY_PAGES.map((p) => ({
  icon: p.icon,
  title: p.title,
  body: p.summary,
  href: industryHref(p.slug),
}));

export const ENGAGE_SECTION = {
  badge: "How we engage",
  heading: "Consultant, then technology partner",
  body: "We start with strategy, assessments and roadmaps that align technology with your goals, then stay on to deliver, integrate and run the solution with you.",
  ctaLabel: "Start a conversation",
  ctaHref: "/contact",
  ctaUuids: [
    "a4c7e1f9-3b26-4d85-8f0a-6e2d9b4c1a37",
    "d9f2b5a8-6e41-4c3d-9b7f-1a8e5c2d6f90",
    "4e1a8c3f-9d72-4b56-a0e8-3c5f7b9d2a16",
  ],
} as const;

export const INDUSTRIES_FAQ: readonly FaqItem[] = [
  {
    question: "Which industries do you work with?",
    answer:
      "Banking and financial services, telecommunications, public sector, healthcare, retail, logistics, manufacturing, hospitality and energy, from growing businesses to large corporates.",
  },
  {
    question: "Do you have experience with regulated sectors?",
    answer:
      "Yes. We design with compliance, data protection and auditability in mind, and adapt our delivery to each sector's regulatory requirements.",
  },
  {
    question: "Can your solutions work with our industry systems?",
    answer:
      "Yes. We integrate AI, data and cloud solutions with the core platforms your industry relies on instead of asking you to replace them.",
  },
  {
    question: "What does a typical first project look like?",
    answer:
      "A focused assessment or pilot on one high-value process, with measurable outcomes, before scaling across departments.",
  },
  {
    question: "Is my industry missing from the list?",
    answer:
      "Get in touch. Our consulting approach carries across sectors, and we will tell you honestly whether we are the right partner.",
  },
];

/* -------------------------------------------------------------------------- */
/* Home-page teaser                                                            */
/* -------------------------------------------------------------------------- */

export const ENTERPRISE_TEASER = {
  badge: "For enterprises",
  heading: "Forward Deployed Engineers, working inside your business",
  body: "Our engineers join your team, agree a baseline and target with you before anything is built, then prove the result in your real day-to-day work. Around your Digital FTEs, we also deliver data, cloud and security programmes.",
  ctaLabel: "Explore our services",
  ctaHref: "/services",
  ctaUuids: [
    "8c3e6a1d-4f97-4b2e-a5d8-7e0b9c3f6a14",
    "1f7b4d9e-2a58-4c6f-b3e1-9d6a0c8e5b27",
    "b6d2a9f4-8e13-4a7c-9f5b-2c4e7a1d8b30",
  ],
} as const;
