/**
 * RollingText — measured constants and the per-instance uuid registry.
 *
 * NO `"use client"` here, and no React: a Server Component cannot read a plain data export
 * out of a `"use client"` module (it only ever sees a client-reference stub), and several
 * of PLAN.md §3's server components render CTA buttons. Same shape as `lib/breakpoints.ts`.
 *
 * Measured spec: `_source/behaviours/rolling-text.md` + `_source/behaviours/cta-button.md`.
 * Every number here is copied from Framer's source maps / SSR, not invented.
 */

import type { Easing, Transition } from "motion/react";

/* -------------------------------------------------------------------------- */
/* Measured constants                                                          */
/* -------------------------------------------------------------------------- */

/** MEASURED — decoded from the `&quot;`-escaped SSR inline style. */
export const ROLLING_TEXT_FONT_FAMILY =
  '"Inter Display", "Inter Display Placeholder", sans-serif';

/** MEASURED — `--font-size: 14px` on all 40 instances. */
export const ROLLING_TEXT_FONT_SIZE = 14;
/** MEASURED — `font-weight: 600` inline on every span. */
export const ROLLING_TEXT_FONT_WEIGHT = 600;
/** MEASURED — `letter-spacing: -0.2px` inline on every span. */
export const ROLLING_TEXT_LETTER_SPACING = "-0.2px";
/** MEASURED — `line-height: 1.2em`. */
export const ROLLING_TEXT_LINE_HEIGHT = 1.2;
/** MEASURED — `--line-height-abs: 16.8px` = 14 × 1.2. The roll distance. */
export const ROLLING_TEXT_LINE_HEIGHT_ABS =
  ROLLING_TEXT_FONT_SIZE * ROLLING_TEXT_LINE_HEIGHT;
/** MEASURED — padding on the rolling-text container, not on the button. */
export const ROLLING_TEXT_PADDING = "10px 16px 10px 16px";

/** MEASURED — `cubic-bezier(0.82, 0.08, 0.29, 1)`, shared with the button border + scale. */
export const ROLL_EASE = [0.82, 0.08, 0.29, 1] as const;

/** MEASURED — `duration: 0.5`, shared by the border fade, the 1.05 scale and the roll. */
export const ROLL_DURATION = 0.5;

/** MEASURED — the CTA button overrides the component's own spring with this tween. */
export const ROLL_TRANSITION: Transition = {
  type: "tween",
  duration: ROLL_DURATION,
  ease: ROLL_EASE as unknown as Easing,
  delay: 0,
};

/** MEASURED — `stagger: 35` (a percentage) on the CTA button wrapper → 0.35. */
export const ROLL_STAGGER = 0.35;

/** MEASURED — `reverse: !1`, so the roll runs left → right. */
export const ROLL_REVERSE = false;

export const ROLL_INSTANT_TRANSITION: Transition = { type: "tween", duration: 0, delay: 0 };

/**
 * MEASURED — `delay(i) = (duration / text.length) * index * staggerFactor`.
 * `"Book a call"` (11 chars) → ≈0.0159·i s, last char starts ≈0.159s after the first.
 */
export function rollDelay(
  index: number,
  length: number,
  duration = ROLL_DURATION,
  stagger = ROLL_STAGGER,
): number {
  if (length <= 0) return 0;
  const i = ROLL_REVERSE ? length - 1 - index : index;
  return (duration / length) * i * stagger;
}

/* -------------------------------------------------------------------------- */
/* Tone (which CTA button variant hosts the label)                             */
/* -------------------------------------------------------------------------- */

/**
 * `"Light"` = the Light CTA button (white background) → BLACK label.
 * `"Dark"`  = the Dark CTA button (rgb(38,38,38))     → WHITE label.
 * Naming follows `cta-button.md`'s `humanReadableVariantMap`.
 */
export type RollingTextTone = "Light" | "Dark";

/** MEASURED — the two `--text` values found across all 40 per-instance rules. */
export const ROLLING_TEXT_COLORS: Readonly<Record<RollingTextTone, string>> = {
  Light: "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
  /* The "Dark" shell is the brand blue in the light theme; its label is white
     (`--ct-on-accent`, app/framer/theme.css), not the ink token. */
  Dark: "var(--ct-on-accent, rgb(255, 255, 255))",
};

/* -------------------------------------------------------------------------- */
/* Instance registry — the 40 uuids that have a rule in components.css         */
/* -------------------------------------------------------------------------- */

export interface RollingTextInstance {
  /** Which live page's SSR emitted it (that is where its CSS rule came from). */
  readonly page: "home" | "about" | "privacy-policy";
  /** Document order within that page's SSR. */
  readonly index: number;
  /** The label, verbatim (including the "sucess" typo). */
  readonly text: string;
  readonly tone: RollingTextTone;
  readonly uuid: string;
}

/**
 * MEASURED — every `.rolling-text-inner-<uuid>` rule present in
 * `app/framer/components.css`, in SSR document order. blog / contact SSR none of these;
 * reuse any uuid of the right tone there (the stylesheet is global).
 *
 * Triples are the three `ssr-variant` breakpoint copies of one button; pairs are the
 * desktop + phone navbar copies.
 */
export const ROLLING_TEXT_INSTANCES: readonly RollingTextInstance[] = [
  // ---- home (19) ----
  { page: "home", index: 0, text: "Book a call", tone: "Light", uuid: "d03a8178-4024-4ea5-9a88-02749a1e259e" },
  { page: "home", index: 1, text: "Book a call", tone: "Light", uuid: "93e554f7-6877-4bd3-991c-8a7237b7d49c" },
  { page: "home", index: 2, text: "View services", tone: "Dark", uuid: "4e6b18d0-b544-408d-a95c-63f37f92c648" },
  { page: "home", index: 3, text: "View services", tone: "Dark", uuid: "811ce907-26ca-4e6a-baaa-629b663f5dea" },
  { page: "home", index: 4, text: "Choose this plan", tone: "Dark", uuid: "f0677f7f-fc1f-413c-8d60-5a6aeb0efdb3" },
  { page: "home", index: 5, text: "Choose this plan", tone: "Dark", uuid: "2685b957-8412-4090-a36a-37baf818b58b" },
  { page: "home", index: 6, text: "Choose this plan", tone: "Dark", uuid: "48092e86-7608-46cc-bbd9-33dc9299cd11" },
  { page: "home", index: 7, text: "Choose this plan", tone: "Light", uuid: "9eb9b3b3-b204-4500-8b36-fd69496e50aa" },
  { page: "home", index: 8, text: "Choose this plan", tone: "Light", uuid: "b3c8b148-9b80-487f-8849-1b38a0fb4430" },
  { page: "home", index: 9, text: "Choose this plan", tone: "Light", uuid: "50d1e5dd-70fe-40b3-a58f-a1301648ef11" },
  { page: "home", index: 10, text: "Schedule a call", tone: "Dark", uuid: "ae562af6-07f0-4e36-80b6-4911be5caecf" },
  { page: "home", index: 11, text: "Schedule a call", tone: "Dark", uuid: "1c19098b-a601-4482-9a7d-46c1f4785895" },
  { page: "home", index: 12, text: "Schedule a call", tone: "Dark", uuid: "bc3955ff-2bb2-47eb-99b3-b7fe200be3be" },
  { page: "home", index: 13, text: "Let's automate", tone: "Light", uuid: "3e9f915a-3816-4e94-b7db-0813b9c1d4c5" },
  { page: "home", index: 14, text: "Need to talk first", tone: "Dark", uuid: "97789c4d-93fa-42ed-95cd-eac960d24af9" },
  { page: "home", index: 15, text: "Let's automate", tone: "Light", uuid: "a835f8d0-e64a-424c-9a1b-827381035f7c" },
  { page: "home", index: 16, text: "Need to talk first", tone: "Dark", uuid: "fa7d2c48-1e31-48d2-8e62-21f579a37299" },
  { page: "home", index: 17, text: "Let's automate", tone: "Light", uuid: "49b88178-349d-44be-bb3f-658bc30630b5" },
  { page: "home", index: 18, text: "Need to talk first", tone: "Dark", uuid: "15955232-5185-472f-9159-d45ab227eab9" },
  // ---- about (15) ----
  { page: "about", index: 0, text: "Start your sucess journey", tone: "Light", uuid: "69b7cdfc-bb1e-4177-ab4e-052231cadf40" },
  { page: "about", index: 1, text: "Start your sucess journey", tone: "Light", uuid: "82bcaee5-d5de-472a-b22e-d77240bb1682" },
  { page: "about", index: 2, text: "Start your sucess journey", tone: "Light", uuid: "2576cfa4-ac94-45af-9f77-e08104c5c181" },
  { page: "about", index: 3, text: "Let's get started", tone: "Dark", uuid: "d8f52c76-a296-4d8d-8023-45cd954d9792" },
  { page: "about", index: 4, text: "Let's get started", tone: "Dark", uuid: "1698e877-ea55-4b57-9df8-b3c27ec223f0" },
  { page: "about", index: 5, text: "Let's get started", tone: "Dark", uuid: "0399d8e7-eb50-45c5-a25f-8c07791366c6" },
  { page: "about", index: 6, text: "View open roles", tone: "Dark", uuid: "10835287-5a03-4d42-b59b-ad599d93c906" },
  { page: "about", index: 7, text: "View open roles", tone: "Dark", uuid: "df72eb48-865d-4fff-af73-894f8d670c09" },
  { page: "about", index: 8, text: "View open roles", tone: "Dark", uuid: "069fb915-6312-42b5-a1bc-9c95cce197e8" },
  { page: "about", index: 9, text: "Let's automate", tone: "Light", uuid: "df899822-92cf-4e70-b7b1-092c7cfcb9ca" },
  { page: "about", index: 10, text: "Need to talk first", tone: "Dark", uuid: "7794d6da-c51d-48b9-b8ab-ea3f427602ac" },
  { page: "about", index: 11, text: "Let's automate", tone: "Light", uuid: "53d63a38-2d23-4a97-927e-d6c07fc1d769" },
  { page: "about", index: 12, text: "Need to talk first", tone: "Dark", uuid: "a155b491-2074-4783-aa90-e4a7eefc197b" },
  { page: "about", index: 13, text: "Let's automate", tone: "Light", uuid: "31ab9a87-4dee-4396-a1e7-3c64d623bb81" },
  { page: "about", index: 14, text: "Need to talk first", tone: "Dark", uuid: "712251d9-33fd-4697-9691-75b2269df705" },
  // ---- privacy-policy (6) ----
  { page: "privacy-policy", index: 0, text: "Let's automate", tone: "Light", uuid: "930798d3-9767-4902-bea5-cb21ce3907ae" },
  { page: "privacy-policy", index: 1, text: "Need to talk first", tone: "Dark", uuid: "d6d9c7d0-408c-4b2d-8792-c035b89bbe40" },
  { page: "privacy-policy", index: 2, text: "Let's automate", tone: "Light", uuid: "076443a1-0fa5-47fe-abc2-a0f9d3d07d35" },
  { page: "privacy-policy", index: 3, text: "Need to talk first", tone: "Dark", uuid: "38d3aae8-754c-4ca5-a18e-816c4015b03d" },
  { page: "privacy-policy", index: 4, text: "Let's automate", tone: "Light", uuid: "f77c31fc-a04a-410a-8c80-762d0da3ddd5" },
  { page: "privacy-policy", index: 5, text: "Need to talk first", tone: "Dark", uuid: "e105b0f0-1e03-4180-8776-1f6cb5cbc7fc" },
];

/** Every label that appears on the site, verbatim. Note the MEASURED "sucess" typo. */
export const ROLLING_TEXT_LABELS = [
  "Book a call",
  "View services",
  "Choose this plan",
  "Schedule a call",
  "Let's automate",
  "Need to talk first",
  "Start your sucess journey",
  "Let's get started",
  "View open roles",
] as const;

export type RollingTextLabel = (typeof ROLLING_TEXT_LABELS)[number];

/** All measured uuids of a given tone, in document order. */
export function rollingTextUuidsByTone(tone: RollingTextTone): readonly string[] {
  return ROLLING_TEXT_INSTANCES.filter((i) => i.tone === tone).map((i) => i.uuid);
}

/**
 * The `nth` measured uuid for a (label, tone) pair — e.g.
 * `rollingTextUuid("Choose this plan", "Dark", 1)`. Falls back to any uuid of the right
 * tone, so a caller always lands on a real rule in `components.css`.
 */
export function rollingTextUuid(
  text: string,
  tone: RollingTextTone,
  nth = 0,
): string {
  const exact = ROLLING_TEXT_INSTANCES.filter(
    (i) => i.text === text && i.tone === tone,
  );
  const pick = (pool: readonly string[]): string | undefined =>
    pool.length === 0
      ? undefined
      : pool[Math.min(Math.max(nth, 0), pool.length - 1)];
  return (
    pick(exact.map((i) => i.uuid)) ??
    pick(rollingTextUuidsByTone(tone)) ??
    ROLLING_TEXT_INSTANCES[0].uuid
  );
}

/** `uuid` → the Framer class name. */
export function rollingTextClassName(uuid: string): string {
  return `rolling-text-inner-${uuid}`;
}

const KNOWN_UUIDS: ReadonlySet<string> = new Set(
  ROLLING_TEXT_INSTANCES.map((i) => i.uuid),
);

/** True when `app/framer/components.css` already carries a rule for this uuid. */
export function hasRollingTextRule(uuid: string): boolean {
  return KNOWN_UUIDS.has(uuid);
}

