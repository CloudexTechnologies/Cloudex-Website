"use client";

/**
 * FaqSection — the FAQ block shared by `/` and `/about` (PLAN.md §2).
 *
 * SOURCES
 * -------
 * • Markup: `_source/rendered/home.desktop.html` `section.framer-8rvyyn` and
 *   `_source/rendered/about.desktop.html` `section.framer-1nav57n`, cross-checked against
 *   the raw SSR slices (`_source/live/home.html` 1003750–1014577,
 *   `_source/live/about.html` 305445–316257) for the pre-hydration inline styles.
 * • Open-row markup: `_source/faq/{home,about}.open.html` (already encoded in the
 *   `Accordion` primitive — the `Answer` node is `.framer-vv94e4 > .framer-hloy3e > p`).
 * • Answers: `_source/faq/{home,about}.json`, copied into `./faq-content.ts`.
 * • Motion: `_source/behaviours/faq-accordion.md` (row spring + the 5-row entrance ladder)
 *   and `_source/behaviours/scroll-reveals.md` (the heading's `animation2` / `t2`).
 *
 * BREAKPOINTS
 * -----------
 * MEASURED: this section has **no** breakpoint variants. `home.md` §12 and `about.md` §08
 * both say "single DOM copy serves all 3 breakpoints (CSS-only responsive)", and the SSR
 * slices contain zero `hidden-*` classes — diffing the desktop / tablet / phone rendered
 * DOM finds only Framer's measured `height` on `.framer-5u0sui-container`, which is
 * `height:auto` in CSS anyway and is therefore not reproduced. So there is deliberately no
 * `hiddenClassName()` / `useBreakpointHash()` use here; PLAN.md §1.1 simply does not bite.
 * The two `.ssr-variant` wrappers Framer emits around the badge and the accordion ARE kept
 * (`.ssr-variant{display:contents}`), because they are in the SSR of both pages.
 *
 * HOME vs ABOUT
 * -------------
 * The two sections are byte-identical apart from seven per-page scoped class names and the
 * question list — see `SCOPE_CLASSES`. Everything else (the `Badge` component classes, the
 * row classes, the `BG` blob) is shared verbatim.
 *
 * DELIBERATE DIVERGENCES, all behaviour-neutral
 * ---------------------------------------------
 *  1. `<use href="#svg8647994865">` points at Framer's runtime `<div id="svg-templates">`
 *     sprite, which does not exist in this port. The 930×358 blob path is inlined instead,
 *     exactly as `SiteFooter` does for `#svg12158825557`. Renders identically and keeps the
 *     component free of a global-id dependency.
 *  2. `href="./contact"` → `/contact` via `next/link`, matching `SiteFooter`'s nav links.
 *  3. The inline `height: 354.016px` Framer's `LayoutJumpPreventer` writes onto
 *     `.framer-*-container` after mount is NOT reproduced: the CSS already says
 *     `height:auto`, and pinning it would stop the section growing when a row opens.
 *     The empty `.framer-12vi086-container` placeholder node itself IS kept.
 *  4. `<h2>`/`<p>` copy is rendered from `./faq-content.ts` rather than literal children so
 *     the two pages cannot drift.
 */

import * as React from "react";
import Link from "next/link";

import {
  ACCORDION_ENTER_DIRECTION,
  ACCORDION_ENTER_TRANSITIONS,
  ACCORDION_ROW_CONTAINER_CLASSES,
  AccordionRow,
  ScrollReveal,
  type ReducedMotionPolicy,
} from "@/components/primitives";

import {
  FAQ_BADGE_LABEL,
  FAQ_HEADING,
  FAQ_ITEMS,
  FAQ_SUBHEAD_LEAD,
  FAQ_SUBHEAD_LINK_HREF,
  FAQ_SUBHEAD_LINK_LABEL,
  type FaqItem,
  type FaqScope,
} from "./faq-content";

/* -------------------------------------------------------------------------- */
/* Per-page class names — MEASURED (the ONLY structural difference)            */
/* -------------------------------------------------------------------------- */

interface FaqScopeClasses {
  /** `<section>` root. */
  readonly section: string;
  /** `data-framer-name="Container"` — the row/column flex parent. */
  readonly container: string;
  /** `data-framer-name="Heading"` — carries the `translateY(30px)` scroll reveal. */
  readonly heading: string;
  /** Badge component container (inside the first `.ssr-variant`). */
  readonly badgeContainer: string;
  /** RichTextContainer wrapping the `<h2>`. */
  readonly title: string;
  /** RichTextContainer wrapping the "Got a specific question?" paragraph. */
  readonly subhead: string;
  /** Accordion component container (inside the second `.ssr-variant`). */
  readonly accordionContainer: string;
}

/**
 * home → `.framer-GhI2H` page scope, about → `.framer-8WBKH`. None of the FAQ rules in
 * `app/framer/*.css` are prefixed by the page-root class, so only these seven matter.
 */
export const SCOPE_CLASSES: Readonly<Record<FaqScope, FaqScopeClasses>> = {
  home: {
    section: "framer-8rvyyn",
    container: "framer-5dbiko",
    heading: "framer-1n4qike",
    badgeContainer: "framer-w3nskz-container",
    title: "framer-1x5yx8l",
    subhead: "framer-1iecoz6",
    accordionContainer: "framer-5u0sui-container",
  },
  about: {
    section: "framer-1nav57n",
    container: "framer-z9g84h",
    heading: "framer-1ahwrxe",
    badgeContainer: "framer-1s6kd6p-container",
    title: "framer-k684hn",
    subhead: "framer-notya3",
    accordionContainer: "framer-11nf8l0-container",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Static styles, transcribed verbatim from the SSR                            */
/* -------------------------------------------------------------------------- */

const TOKEN_BADGE_BORDER =
  "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))";
const TOKEN_BADGE_BG =
  "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))";
const TOKEN_BADGE_TEXT =
  "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))";
const TOKEN_TEXT_PRIMARY =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";

/** `.framer-XUE7K.framer-TPaq9.framer-1rwepof.framer-v-1rwepof[data-framer-name="Badge"]`. */
const BADGE_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color": TOKEN_BADGE_BORDER,
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  backgroundColor: TOKEN_BADGE_BG,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
} as React.CSSProperties;

/** `.framer-xrs0cf` — note Framer routes the colour through a variable-reference alias. */
const BADGE_TEXT_STYLE = {
  "--extracted-r6o4lv": "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  "--variable-reference-ibDtCMzbS-eWNvTdAfh": TOKEN_BADGE_TEXT,
  transform: "none",
} as React.CSSProperties;

/** `.framer-jwgcn2[data-framer-name="BG"]`. */
const BG_STYLE = {
  filter: "blur(50px)",
  WebkitFilter: "blur(50px)",
  opacity: 0.3,
} as React.CSSProperties;

/** `.framer-1vqkt93`, the `data-framer-component-type="SVG"` node. */
const BG_SVG_STYLE = {
  imageRendering: "pixelated",
  flexShrink: 0,
  opacity: 0.5,
} as React.CSSProperties;

/**
 * `#svg8647994865` — the 930×358 ellipse behind the accordion, rotated −13°, inlined.
 * See divergence (1) above.
 */
const BG_BLOB_VIEW_BOX = "0 0 930 358";
const BG_BLOB_PATH =
  "M 459 0 C 712.499 0 918 34.474 918 77 C 918 119.526 712.499 154 459 154 C 205.501 154 0 119.526 0 77 C 0 34.474 205.501 0 459 0 Z";
const BG_BLOB_TRANSFORM = "translate(6.309 102.112) rotate(-13 459 77)";

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface FaqSectionProps {
  /** Which page is rendering this — picks the scoped class names AND the default list. */
  scope: FaqScope;
  /**
   * The five question/answer pairs. Defaults to `FAQ_ITEMS[scope]`, i.e. the real list
   * captured from the live site. Framer only ships five slots
   * (`ACCORDION_ROW_CONTAINER_CLASSES`); extra items reuse the last container class.
   */
  items?: readonly FaqItem[];
  /** DOM id on the `<section>`. MEASURED: `id="faq"` on both pages. */
  elementId?: string;
  reducedMotion?: ReducedMotionPolicy;
  /** Render at the rest state with no animation (screenshots / visual diffing). */
  disabled?: boolean;
  /** Rows to force open on first render. Framer's default is none — all five Closed. */
  defaultOpenIndexes?: readonly number[];
  /** Extra class on the `<section>`; the Framer class always comes first. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function FaqSection({
  scope,
  items,
  elementId = "faq",
  reducedMotion,
  disabled = false,
  defaultOpenIndexes,
  className,
}: FaqSectionProps): React.ReactElement {
  const classes = SCOPE_CLASSES[scope];
  const rows = items ?? FAQ_ITEMS[scope];
  const openSet = React.useMemo(
    () => new Set(defaultOpenIndexes ?? []),
    [defaultOpenIndexes],
  );

  return (
    <section
      className={className ? `${classes.section} ${className}` : classes.section}
      data-framer-name="FAQs"
      id={elementId}
    >
      <div className={classes.container} data-framer-name="Container">
        {/* `animation2` (y 30) / `t2` (0s) — scroll-reveals.md. */}
        <ScrollReveal
          enter="up30"
          transition="t2"
          className={classes.heading}
          data-framer-name="Heading"
          reducedMotion={reducedMotion}
          disabled={disabled}
        >
          <div className="ssr-variant">
            <div className={classes.badgeContainer}>
              <div
                className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
                data-border="true"
                data-framer-name="Badge"
                data-highlight="true"
                style={BADGE_STYLE}
              >
                <div
                  className="framer-xrs0cf"
                  data-framer-component-type="RichTextContainer"
                  style={BADGE_TEXT_STYLE}
                >
                  <p
                    className="framer-text framer-styles-preset-141u1yr"
                    data-styles-preset="pAzayDUZg"
                    style={
                      {
                        "--framer-text-color":
                          "var(--extracted-r6o4lv, var(--variable-reference-ibDtCMzbS-eWNvTdAfh))",
                      } as React.CSSProperties
                    }
                  >
                    {FAQ_BADGE_LABEL}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={classes.title}
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1uc0rn1"
              data-styles-preset="f6v2ro_B_"
              style={
                { "--framer-text-alignment": "left" } as React.CSSProperties
              }
            >
              {FAQ_HEADING}
            </h2>
          </div>

          <div
            className={classes.subhead}
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="framer-text framer-styles-preset-wgkvl1"
              data-styles-preset="risoZ9TJU"
              dir="auto"
              style={
                { "--framer-text-alignment": "left" } as React.CSSProperties
              }
            >
              <strong className="framer-text">{FAQ_SUBHEAD_LEAD}</strong>
              <Link
                className="framer-text framer-styles-preset-19jv5cd"
                data-styles-preset="nED4Usn5Z"
                href={FAQ_SUBHEAD_LINK_HREF}
              >
                <strong className="framer-text">
                  {FAQ_SUBHEAD_LINK_LABEL}
                </strong>
              </Link>
            </p>
          </div>
        </ScrollReveal>

        <div className="ssr-variant">
          <div className={classes.accordionContainer}>
            <div
              className="framer-ZKF7B framer-sxo6ex framer-v-sxo6ex"
              data-framer-name="accordion"
              style={{
                maxWidth: "100%",
                width: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              {/* `AvoidLayoutJumping_Prod` mount point — an empty div in the SSR too. */}
              <div className="framer-12vi086-container">
                <div />
              </div>

              {rows.map((item, index) => (
                <ScrollReveal
                  key={`${item.question}-${index}`}
                  enter={ACCORDION_ENTER_DIRECTION}
                  transition={
                    ACCORDION_ENTER_TRANSITIONS[
                      Math.min(index, ACCORDION_ENTER_TRANSITIONS.length - 1)
                    ]
                  }
                  className={
                    ACCORDION_ROW_CONTAINER_CLASSES[
                      Math.min(
                        index,
                        ACCORDION_ROW_CONTAINER_CLASSES.length - 1,
                      )
                    ]
                  }
                  reducedMotion={reducedMotion}
                  disabled={disabled}
                >
                  <AccordionRow
                    rowId={`faq-${scope}-${index}`}
                    data-faq-index={index}
                    question={item.question}
                    answer={item.answer}
                    defaultOpen={openSet.has(index)}
                    reducedMotion={reducedMotion}
                  />
                </ScrollReveal>
              ))}

              <div className="framer-jwgcn2" data-framer-name="BG" style={BG_STYLE}>
                <div
                  className="framer-1vqkt93"
                  data-framer-component-type="SVG"
                  aria-hidden="true"
                  style={BG_SVG_STYLE}
                >
                  <div
                    className="svgContainer"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "inherit",
                    }}
                  >
                    <svg
                      viewBox={BG_BLOB_VIEW_BOX}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <path
                        d={BG_BLOB_PATH}
                        transform={BG_BLOB_TRANSFORM}
                        fill={TOKEN_TEXT_PRIMARY}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

/**
 * Convenience re-exports. NOTE: this module carries `"use client"`, so these read back as
 * client references inside a Server Component — a server page that needs the raw data must
 * import from `"@/components/shared/faq-content"` directly (that module has no directive).
 */
export {
  ABOUT_FAQ_ITEMS,
  FAQ_BADGE_LABEL,
  FAQ_HEADING,
  FAQ_ITEMS,
  FAQ_SUBHEAD_LEAD,
  FAQ_SUBHEAD_LINK_HREF,
  FAQ_SUBHEAD_LINK_LABEL,
  HOME_FAQ_ITEMS,
  type FaqItem,
  type FaqScope,
} from "./faq-content";
