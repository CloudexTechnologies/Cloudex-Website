/**
 * FAQ content — the home and about question/answer sets.
 *
 * No `"use client"`: this module is plain data, so a Server Component may import the
 * constants too (same trick as `lib/breakpoints.ts` / `lib/rolling-text.ts`).
 *
 * PROVENANCE
 * ----------
 * The Framer original's questions and answers (captured from the live site) are kept in
 * `_source/faq/home.json` / `_source/faq/about.json`. Both lists below have since been
 * rewritten for the Digital FTE positioning, so they no longer match those files.
 *
 * Order matters — it is the order the five `framer-*-container` slots are
 * emitted in, which is also the entrance-stagger order (0 / 0.15 / 0.3 / 0.45 / 0.6s).
 */

/** Which page's list. Matches the `BreakpointScope` names for `home` / `about`. */
export type FaqScope = "home" | "about";

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * `/` — rewritten for the Digital FTE positioning (the Framer original's five generic
 * AI-automation questions are in `_source/faq/home.json`). Keep exactly five rows: the
 * section has five `framer-*-container` slots.
 */
export const HOME_FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What is a Digital FTE?",
    answer:
      "A Digital FTE (Digital Full-Time Equivalent) is an AI employee built for one role, such as sales outreach, customer support or reporting. It works inside the tools your team already uses, around the clock, under your team's oversight.",
  },
  {
    question: "Will AI replace my staff?",
    answer:
      "No. Digital FTEs work for your team, not instead of it. They take on the repetitive work so your people can focus on clients, decisions and the work only they can do, and they hand anything that needs judgement to a person.",
  },
  {
    question: "What is the 10-80-10 rule?",
    answer:
      "It is how every task is shared. Your team sets the direction (the first 10%), Digital FTEs do the heavy lifting (the middle 80%), and your team reviews and approves the result (the final 10%). Nothing ships without your sign-off.",
  },
  {
    question: "How do Digital FTEs know our rules and data?",
    answer:
      "We connect them to two trusted sources: a Knowledge System of Record (KSoR) for your policies, procedures and methods, and your Data System of Record (DSoR), such as your CRM or ERP, for live business data. They cite your rules instead of guessing.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "Our Forward Deployed Engineers work with your team to pick one high-value process. Together we agree a baseline, a target and the acceptance criteria before anything is built, then prove the result in your real day-to-day work.",
  },
] as const;

/**
 * `/about` — company questions. Replaces the Framer original's paid-ads copy (a template
 * leftover, PLAN.md §7; still in `_source/faq/about.json`). Keep exactly five rows.
 */
export const ABOUT_FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "From growing businesses to large corporates, across banking, telecom, retail, logistics, healthcare, the public sector and more. If your team spends hours on repetitive work, a Digital FTE can help.",
  },
  {
    question: "What is a Forward Deployed Engineer?",
    answer:
      "An engineer who works inside your business rather than from a distance. Our FDEs learn your systems, rules and workflows, then build, deploy and run your Digital FTEs alongside your team.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most first Digital FTEs go live within a few weeks. We start with one focused process, measure it against the baseline we agreed with you, and expand once the results are proven.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. We monitor, evaluate and improve every Digital FTE after launch, and keep its knowledge up to date as your policies, products and systems change.",
  },
  {
    question: "Where are you based?",
    answer:
      "Our team is based in Wolverhampton, UK, and we work with clients across the UK and beyond, both on site and remotely.",
  },
] as const;

/** Lookup by page scope — what `<FaqSection scope="home" />` falls back to. */
export const FAQ_ITEMS: Readonly<Record<FaqScope, readonly FaqItem[]>> = {
  home: HOME_FAQ_ITEMS,
  about: ABOUT_FAQ_ITEMS,
} as const;

/* -------------------------------------------------------------------------- */
/* Copy shared by both pages (identical byte-for-byte in both SSR slices)       */
/* -------------------------------------------------------------------------- */

/** Badge pill text. */
export const FAQ_BADGE_LABEL = "FAQs";
/** `<h2>`. */
export const FAQ_HEADING = "Frequently Asked Questions";
/**
 * Sub-line. The `<strong>` keeps the SSR's TRAILING SPACE before the link —
 * `<strong class="framer-text">Got a specific question? </strong>`.
 */
export const FAQ_SUBHEAD_LEAD = "Got a specific question? ";
/** The linked `<strong>`; Framer SSRs `href="./contact"`, rewritten to a rooted path. */
export const FAQ_SUBHEAD_LINK_LABEL = "Contact us";
export const FAQ_SUBHEAD_LINK_HREF = "/contact";
