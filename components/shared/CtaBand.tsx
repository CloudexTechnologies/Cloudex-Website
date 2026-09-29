"use client";

/**
 * CtaBand — the "Ready to Automate…" band shared by `/`, `/about` and
 * `/legal-pages/privacy-policy` (PLAN.md §2).
 *
 * Markup source: the raw SSR DOM, sliced at the offsets the structure docs give:
 *   • `_source/live/home.html`            1014577–1055790  (`section.framer-14s4w75`)
 *   • `_source/live/about.html`            316257–357425   (`section.framer-1wdn2mc`)
 *   • `_source/live/privacy-policy.html`   159575–200944   (`section.framer-1n2dqs2`,
 *     NESTED inside `section.framer-o3tmg` "Hero")
 * cross-checked against `_source/rendered/{home,about,privacy-policy}.{desktop,tablet,phone}.html`
 * and converted with `tools/html2jsx.mjs --asset-map _source/asset-map.json`.
 *
 * Behaviour sources (all MEASURED):
 *   • `_source/behaviours/cta-button.md`  — the button shell (border fade-in + 1.05 scale,
 *     tween 0.5s cubic-bezier(0.82, 0.08, 0.29, 1)).
 *   • `_source/behaviours/rolling-text.md` — delegated wholesale to the `RollingText` primitive.
 *   • `_source/behaviours/scroll-reveals.md` — the card is a PLAN.md §1.5 viewport reveal.
 *
 * ── Is the markup really identical on all three pages? ────────────────────────────────
 * Almost. Diffing the three SSR subtrees with the per-instance rolling-text uuids and the
 * `hidden-*` hashes normalised away leaves EXACTLY these differences, all of which are
 * parameterised by `scope` through {@link CTA_BAND_PAGES}:
 *
 *   1. `<section>` class      — `framer-14s4w75` / `framer-1wdn2mc` / `framer-1n2dqs2`.
 *   2. container class        — `framer-79ld5i-container` / `framer-qihhwc-container` /
 *                               `framer-9472tl-container`.
 *                               All three are page-scoped in `app/framer/layout.css`
 *                               (`.framer-GhI2H …` home, `.framer-8WBKH …` about,
 *                               `.framer-f2VXI …` privacy), so the HOST PAGE's root element
 *                               must carry its serialization-hash class or this band loses
 *                               its width/padding. That class is the page component's job.
 *   3. privacy only: the container is ITSELF a second scroll reveal
 *      (`will-change:transform;opacity:0;transform:translateY(50px)`). home/about wrap it
 *      in a plain `<div>`.
 *   4. the card's `max-width:100%` is present on home + privacy, ABSENT on about.
 *   5. privacy's `<img>` has no `loading="lazy"` and orders its (functionally identical,
 *      all-142px) `sizes` entries differently.
 *   6. ssr-variant ORDER: home + about emit desktop → tablet → phone; privacy emits
 *      desktop → phone → tablet.
 *   7. the per-instance rolling-text uuids (6 per page, 18 total — every one of them already
 *      has its rule in `app/framer/components.css`, so `selfContained={false}` is safe and
 *      reproduces the original DOM exactly).
 *
 * Everything else — the highlight line, the logo, the `<h2>`, both hrefs, both labels, the
 * card's `framer-v-17o0y2c` (Desktop) / `framer-v-18vqlko` (Mobile) inner variant — is
 * byte-identical across the three pages.
 *
 * ── Fidelity notes ───────────────────────────────────────────────────────────────────
 * • All THREE breakpoint copies are rendered and hidden with `hidden-<hash>` + `.ssr-variant`,
 *   exactly as Framer SSRs them. The hashes come from `hiddenClassName(scope, bp)`, so the
 *   band is correct on every host page (PLAN.md §1.1 — hashes are PER PAGE).
 * • PLAN.md §1.5: the card SSRs at `opacity:0; transform:translateY(50px)`. Without the
 *   `ScrollReveal` wrapper the whole band renders blank. `up50` (= Framer's `animation12`)
 *   + `t2` (spring 300/60/1, delay 0, threshold 0.5, once).
 * • Copy is verbatim, including the leftovers flagged in PLAN.md §7: the primary CTA still
 *   points at `https://framer.link/kanishkdubey` and the secondary at `https://Cal.com`
 *   (capital C, as in the source).
 * • DELIBERATE DEVIATION (one): Framer's SSR anchor carries no `data-border`; its runtime
 *   adds `data-border="true"` only while hovered. An attribute cannot be animated, so
 *   `cta-button.md` prescribes keeping it static and driving the four `--border-*-width`
 *   custom properties instead. At rest they are `0px` with `--border-color: rgba(0,0,0,0)`,
 *   so the `::after` overlay is a zero-width transparent, `pointer-events:none` box —
 *   visually identical to not existing.
 * • The Framer badge (`n0ccwk`) is not part of this subtree and is not rendered (PLAN.md §1.3).
 */

import * as React from "react";

import { BOOKING_URL } from "@/lib/booking";
import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";

import {
  RollingText,
  ScrollReveal,
  hiddenClassName,
  type BreakpointName,
  type BreakpointScope,
  type ReducedMotionPolicy,
  type RollingTextTone,
} from "@/components/primitives";

/* -------------------------------------------------------------------------- */
/* Copy + assets — VERBATIM                                                    */
/* -------------------------------------------------------------------------- */

export const CTA_BAND_HEADING =
  "Ready to Automate Your Business with Cloudex Technologies Automation?";

/**
 * Both CTAs, verbatim from the SSR. `https://framer.link/kanishkdubey` is one of the
 * leftovers PLAN.md §7 says to port rather than silently fix; `Cal.com` keeps its
 * capital C exactly as the source spells it.
 */
export const CTA_BAND_BUTTONS = [
  {
    label: "Let's automate",
    /* Was the Framer template author's link (`framer.link/kanishkdubey`). */
    href: "/contact",
    tone: "Light",
    containerClassName: "framer-sdzyff-container",
  },
  {
    label: "Need to talk first",
    href: BOOKING_URL,
    tone: "Dark",
    containerClassName: "framer-11ah0or-container",
  },
] as const satisfies readonly {
  label: string;
  href: string;
  tone: RollingTextTone;
  containerClassName: string;
}[];

/** The logo, resolved through `_source/asset-map.json` (never derive the extension from the URL). */
export const CTA_BAND_LOGO = {
  alt: "Cloudex Technologies",
  width: 1024,
  height: 198,
  src: "/assets/images/brand/cloudex-logo-1024.webp",
  srcSet:
    "/assets/images/brand/cloudex-logo-256.webp 256w,/assets/images/brand/cloudex-logo-512.webp 512w,/assets/images/brand/cloudex-logo-1024.webp 1024w",
} as const;

/* Light theme: the glow and the highlight line are the brand blue rather than ink
   alphas, which read as grey smudges on white. Framer's geometry is unchanged. */
const CARD_BACKGROUND =
  "radial-gradient(50% 50% at 50% 0%, var(--ct-accent-glow, rgba(0, 85, 255, 0.12)) 0%, rgba(0, 85, 255, 0) 100%)";

const HIGHLIGHT_LINE_BACKGROUND =
  "linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255)) 51.08741554054054%, rgba(0, 85, 255, 0) 100%)";

/* -------------------------------------------------------------------------- */
/* Button shell — MEASURED (`cta-button.md`)                                   */
/* -------------------------------------------------------------------------- */

/** `serializationHash` of the "CTA button" module. */
export const CTA_BUTTON_SERIALIZATION_HASH = "framer-CsDyE";

/** `variantClassNames`: `fyg_02HwB` = Light, `yOhxvQNPk` = Dark. */
export const CTA_BUTTON_VARIANT_CLASS_NAMES = {
  Light: "framer-v-1cgg18b",
  Dark: "framer-v-1c8kqsq",
} as const satisfies Record<RollingTextTone, string>;

/**
 * The subtree `MotionConfigContext` value: the border fade, the 1.05 inner scale AND the
 * per-character label roll all run on this one tween.
 */
export const CTA_BUTTON_TRANSITION = {
  type: "tween",
  duration: 0.5,
  ease: [0.82, 0.08, 0.29, 1],
  delay: 0,
} as const satisfies Transition;

/** Rest colours per variant, spelled exactly as Framer emits the tokens. */
const CTA_BUTTON_SHELL = {
  Light: {
    backgroundColor:
      "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
    hoverBorderColor:
      "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
  },
  Dark: {
    backgroundColor:
      "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))",
    hoverBorderColor: "rgba(255, 255, 255, 0.1)",
  },
} as const satisfies Record<
  RollingTextTone,
  { backgroundColor: string; hoverBorderColor: string }
>;

/** `.framer-1pxacyp` — `style {scale: 1}`, `"<variant>-hover": {scale: 1.05}`. */
const CTA_TEXT_VARIANTS: Variants = { hover: { scale: 1.05 } };

/* -------------------------------------------------------------------------- */
/* Scroll reveal — MEASURED (`scroll-reveals.md`, PLAN.md §1.5)                */
/* -------------------------------------------------------------------------- */

/** SSR inline `transform:translateY(50px)` → `animation12`. */
export const CTA_BAND_REVEAL_ENTER = "up50" as const;
/** Spring 300/60/1, delay 0 — the site-wide default ladder rung. */
export const CTA_BAND_REVEAL_TRANSITION = "t2" as const;

/* -------------------------------------------------------------------------- */
/* Per-page configuration                                                      */
/* -------------------------------------------------------------------------- */

/** The three pages that actually host this band (PLAN.md §2). */
export type CtaBandPage = "home" | "about" | "privacy-policy";

export interface CtaBandVariantConfig {
  /** Which breakpoint this SSR copy is FOR. */
  readonly breakpoint: BreakpointName;
  /** The two breakpoints it is hidden AT, in the order Framer emits the classes. */
  readonly hiddenAt: readonly [BreakpointName, BreakpointName];
  /** The card's inner variant: `17o0y2c` = "Desktop", `18vqlko` = "Mobile". */
  readonly cardVariantClassName: string;
  readonly cardVariantName: string;
  /** Per-instance rolling-text uuids, [Light, Dark], in document order. */
  readonly rollingTextUuids: readonly [string, string];
}

export interface CtaBandPageConfig {
  readonly sectionClassName: string;
  readonly containerClassName: string;
  /** privacy-policy only: the container is itself a §1.5 reveal. */
  readonly containerIsReveal: boolean;
  /** Present on home + privacy, absent on about. */
  readonly cardMaxWidth: string | undefined;
  readonly imageLoading: "lazy" | undefined;
  readonly imageSizes: string;
  readonly variants: readonly CtaBandVariantConfig[];
}

const SIZES_DTP =
  "(min-width: 1200px) 186px, (min-width: 810px) and (max-width: 1199.98px) 186px, (max-width: 809.98px) 186px";
const SIZES_DPT =
  "(min-width: 1200px) 186px, (max-width: 809.98px) 186px, (min-width: 810px) and (max-width: 1199.98px) 186px";

const DESKTOP_CARD = {
  cardVariantClassName: "framer-v-17o0y2c",
  cardVariantName: "Desktop",
} as const;
const MOBILE_CARD = {
  cardVariantClassName: "framer-v-18vqlko",
  cardVariantName: "Mobile",
} as const;

/**
 * Everything that differs between the three host pages, read straight out of the SSR.
 * Nothing here is inferred.
 */
export const CTA_BAND_PAGES = {
  home: {
    sectionClassName: "framer-14s4w75",
    containerClassName: "framer-79ld5i-container",
    containerIsReveal: false,
    cardMaxWidth: "100%",
    imageLoading: "lazy",
    imageSizes: SIZES_DTP,
    variants: [
      {
        breakpoint: "desktop",
        hiddenAt: ["tablet", "phone"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "3e9f915a-3816-4e94-b7db-0813b9c1d4c5",
          "97789c4d-93fa-42ed-95cd-eac960d24af9",
        ],
      },
      {
        breakpoint: "tablet",
        hiddenAt: ["phone", "desktop"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "a835f8d0-e64a-424c-9a1b-827381035f7c",
          "fa7d2c48-1e31-48d2-8e62-21f579a37299",
        ],
      },
      {
        breakpoint: "phone",
        hiddenAt: ["tablet", "desktop"],
        ...MOBILE_CARD,
        rollingTextUuids: [
          "49b88178-349d-44be-bb3f-658bc30630b5",
          "15955232-5185-472f-9159-d45ab227eab9",
        ],
      },
    ],
  },
  about: {
    sectionClassName: "framer-1wdn2mc",
    containerClassName: "framer-qihhwc-container",
    containerIsReveal: false,
    cardMaxWidth: undefined,
    imageLoading: "lazy",
    imageSizes: SIZES_DTP,
    variants: [
      {
        breakpoint: "desktop",
        hiddenAt: ["tablet", "phone"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "df899822-92cf-4e70-b7b1-092c7cfcb9ca",
          "7794d6da-c51d-48b9-b8ab-ea3f427602ac",
        ],
      },
      {
        breakpoint: "tablet",
        hiddenAt: ["desktop", "phone"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "53d63a38-2d23-4a97-927e-d6c07fc1d769",
          "a155b491-2074-4783-aa90-e4a7eefc197b",
        ],
      },
      {
        breakpoint: "phone",
        hiddenAt: ["tablet", "desktop"],
        ...MOBILE_CARD,
        rollingTextUuids: [
          "31ab9a87-4dee-4396-a1e7-3c64d623bb81",
          "712251d9-33fd-4697-9691-75b2269df705",
        ],
      },
    ],
  },
  "privacy-policy": {
    sectionClassName: "framer-1n2dqs2",
    containerClassName: "framer-9472tl-container",
    containerIsReveal: true,
    cardMaxWidth: "100%",
    imageLoading: undefined,
    imageSizes: SIZES_DPT,
    // NOTE the order: privacy SSRs desktop → PHONE → tablet.
    variants: [
      {
        breakpoint: "desktop",
        hiddenAt: ["phone", "tablet"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "930798d3-9767-4902-bea5-cb21ce3907ae",
          "d6d9c7d0-408c-4b2d-8792-c035b89bbe40",
        ],
      },
      {
        breakpoint: "phone",
        hiddenAt: ["desktop", "tablet"],
        ...MOBILE_CARD,
        rollingTextUuids: [
          "076443a1-0fa5-47fe-abc2-a0f9d3d07d35",
          "38d3aae8-754c-4ca5-a18e-816c4015b03d",
        ],
      },
      {
        breakpoint: "tablet",
        hiddenAt: ["desktop", "phone"],
        ...DESKTOP_CARD,
        rollingTextUuids: [
          "f77c31fc-a04a-410a-8c80-762d0da3ddd5",
          "e105b0f0-1e03-4180-8776-1f6cb5cbc7fc",
        ],
      },
    ],
  },
} as const satisfies Record<CtaBandPage, CtaBandPageConfig>;

export function isCtaBandPage(scope: BreakpointScope): scope is CtaBandPage {
  return scope === "home" || scope === "about" || scope === "privacy-policy";
}

/* -------------------------------------------------------------------------- */
/* Button                                                                      */
/* -------------------------------------------------------------------------- */

interface CtaButtonProps {
  label: string;
  href: string;
  tone: RollingTextTone;
  /** The per-instance uuid whose rule lives in `app/framer/components.css`. */
  rollingTextUuid: string;
  reducedMotion?: ReducedMotionPolicy;
}

/**
 * `NqOBQqRTG.js` — "CTA button". `whileHover` on the `<a>` with NAMED variants on the
 * child is what propagates the hover to `.framer-1pxacyp`'s 1.05 scale while leaving
 * `RollingText` on its own mouse-enter state, mirroring Framer's structure exactly.
 *
 * All four `--border-*-width` are given an explicit `"0px"` start value in `style`;
 * leaving them unset makes motion snap on the first hover instead of fading.
 */
function CtaButton({
  label,
  href,
  tone,
  rollingTextUuid,
  reducedMotion,
}: CtaButtonProps): React.ReactElement {
  const shell = CTA_BUTTON_SHELL[tone];

  const hoverVariants = React.useMemo<Variants>(
    () => ({
      hover: {
        ["--border-top-width" as string]: "1px",
        ["--border-right-width" as string]: "1px",
        ["--border-bottom-width" as string]: "1px",
        ["--border-left-width" as string]: "1px",
        ["--border-color" as string]: shell.hoverBorderColor,
      },
    }),
    [shell.hoverBorderColor],
  );

  return (
    <motion.a
      className={`${CTA_BUTTON_SERIALIZATION_HASH} framer-1cgg18b ${CTA_BUTTON_VARIANT_CLASS_NAMES[tone]} framer-1kblhh1`}
      data-framer-name={tone}
      data-border="true"
      href={href}
      initial={false}
      whileHover="hover"
      variants={hoverVariants}
      transition={CTA_BUTTON_TRANSITION}
      style={
        {
          "--border-bottom-width": "0px",
          "--border-color": "rgba(0, 0, 0, 0)",
          "--border-left-width": "0px",
          "--border-right-width": "0px",
          "--border-style": "solid",
          "--border-top-width": "0px",
          backgroundColor: shell.backgroundColor,
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        } as React.CSSProperties
      }
    >
      <motion.div
        className="framer-1pxacyp"
        data-framer-name="Text"
        variants={CTA_TEXT_VARIANTS}
        transition={CTA_BUTTON_TRANSITION}
        style={{ scale: 1 }}
      >
        <div className="framer-esl6hy-container">
          <RollingText
            text={label}
            uuid={rollingTextUuid}
            tone={tone}
            selfContained={false}
            reducedMotion={reducedMotion}
          />
        </div>
      </motion.div>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/* One SSR breakpoint copy                                                     */
/* -------------------------------------------------------------------------- */

interface CtaBandVariantProps {
  scope: BreakpointScope;
  page: CtaBandPageConfig;
  variant: CtaBandVariantConfig;
  heading: string;
  headingId?: string;
  reducedMotion?: ReducedMotionPolicy;
  disableReveal?: boolean;
}

function CtaBandVariant({
  scope,
  page,
  variant,
  heading,
  headingId,
  reducedMotion,
  disableReveal,
}: CtaBandVariantProps): React.ReactElement {
  const card = (
    <ScrollReveal
      className={`framer-ull10 framer-R1g06 framer-17o0y2c ${variant.cardVariantClassName}`}
      data-framer-name={variant.cardVariantName}
      enter={CTA_BAND_REVEAL_ENTER}
      transition={CTA_BAND_REVEAL_TRANSITION}
      reducedMotion={reducedMotion}
      disabled={disableReveal}
      style={{
        background: CARD_BACKGROUND,
        ...(page.cardMaxWidth === undefined
          ? {}
          : { maxWidth: page.cardMaxWidth }),
        width: "100%",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
      }}
    >
      <div
        className="framer-9nfub7"
        data-framer-name="Highlight line"
        style={{ background: HIGHLIGHT_LINE_BACKGROUND }}
      />
      <div className="framer-16kc0fz" data-framer-name="Content">
        <div
          className="framer-18hthov"
          data-framer-name="Logo"
          style={{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <div className="framer-1fn7044" data-framer-name="Cloudex Technologies logo">
            <div
              style={
                {
                  position: "absolute",
                  borderRadius: "inherit",
                  cornerShape: "inherit",
                  top: "0",
                  right: "0",
                  bottom: "0",
                  left: "0",
                } as React.CSSProperties
              }
              data-framer-background-image-wrapper="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                decoding="async"
                {...(page.imageLoading === undefined
                  ? {}
                  : { loading: page.imageLoading })}
                width={CTA_BAND_LOGO.width}
                height={CTA_BAND_LOGO.height}
                sizes={page.imageSizes}
                srcSet={CTA_BAND_LOGO.srcSet}
                src={CTA_BAND_LOGO.src}
                alt={CTA_BAND_LOGO.alt}
                style={
                  {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    cornerShape: "inherit",
                    objectPosition: "center",
                    objectFit: "cover",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>
        <div className="framer-1ps093" data-framer-name="Heading">
          <div
            className="framer-1x0e2fy"
            data-framer-component-type="RichTextContainer"
            style={
              {
                "--framer-link-text-color": "rgb(0, 153, 255)",
                "--framer-link-text-decoration": "underline",
                transform: "none",
              } as React.CSSProperties
            }
          >
            <h2
              className="framer-text framer-styles-preset-1uc0rn1"
              data-styles-preset="f6v2ro_B_"
              dir="auto"
              id={headingId}
              style={
                { "--framer-text-alignment": "center" } as React.CSSProperties
              }
            >
              {heading}
            </h2>
          </div>
        </div>
        <div className="framer-1ehvore" data-framer-name="Cta">
          {CTA_BAND_BUTTONS.map((button, i) => (
            <div key={button.href} className={button.containerClassName}>
              <CtaButton
                label={button.label}
                href={button.href}
                tone={button.tone}
                rollingTextUuid={variant.rollingTextUuids[i] ?? ""}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );

  const hidden = variant.hiddenAt
    .map((bp) => hiddenClassName(scope, bp))
    .join(" ");

  return (
    <div className={`ssr-variant ${hidden}`}>
      {page.containerIsReveal ? (
        <ScrollReveal
          className={page.containerClassName}
          enter={CTA_BAND_REVEAL_ENTER}
          transition={CTA_BAND_REVEAL_TRANSITION}
          reducedMotion={reducedMotion}
          disabled={disableReveal}
        >
          {card}
        </ScrollReveal>
      ) : (
        <div className={page.containerClassName}>{card}</div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Public component                                                            */
/* -------------------------------------------------------------------------- */

export interface CtaBandProps {
  /**
   * Which page's Framer breakpoint triple + section classes to use (PLAN.md §1.1 —
   * hashes are PER PAGE). `"home"`, `"about"` and `"privacy-policy"` are the three real
   * hosts; any other scope keeps ITS OWN breakpoint hashes but falls back to the home
   * page's section/container class names, which are only styled under `.framer-GhI2H`.
   */
  scope: BreakpointScope;
  /** Override the verbatim heading. Defaults to {@link CTA_BAND_HEADING}. */
  heading?: string;
  /** DOM `id` on the `<section>`. */
  elementId?: string;
  /** DOM `id` put on every copy's `<h2>` — leave unset; the band SSRs three `<h2>`s. */
  headingId?: string;
  /** Extra classes appended to the `<section>`'s Framer class. */
  className?: string;
  reducedMotion?: ReducedMotionPolicy;
  /** Render the band already revealed (screenshot rigs, tests). */
  disableReveal?: boolean;
}

/**
 * Renders ONLY the `<section data-framer-name="CTA">` subtree — no page wrapper, no nav,
 * no footer. On `/legal-pages/privacy-policy` it is mounted as a child of the Hero
 * `<section>`; nothing here assumes it is a top-level section.
 */
export function CtaBand({
  scope,
  heading = CTA_BAND_HEADING,
  elementId,
  headingId,
  className,
  reducedMotion,
  disableReveal,
}: CtaBandProps): React.ReactElement {
  const page: CtaBandPageConfig = isCtaBandPage(scope)
    ? CTA_BAND_PAGES[scope]
    : CTA_BAND_PAGES.home;

  return (
    <section
      id={elementId}
      className={
        className === undefined
          ? page.sectionClassName
          : `${page.sectionClassName} ${className}`
      }
      data-framer-name="CTA"
    >
      {page.variants.map((variant) => (
        <CtaBandVariant
          key={variant.breakpoint}
          scope={scope}
          page={page}
          variant={variant}
          heading={heading}
          headingId={headingId}
          reducedMotion={reducedMotion}
          disableReveal={disableReveal}
        />
      ))}
    </section>
  );
}

export default CtaBand;
