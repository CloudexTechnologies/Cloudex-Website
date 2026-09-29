"use client";

/**
 * `/about` §07 — `<section class="framer-1v4l3a" data-framer-name="Why us">`.
 * Source: `_source/live/about.html` bytes 281488–305445.
 *
 * "Life at Cloudex Technologies" — the badge, heading, a CTA and a four-photo ticker.
 *
 * The live site ships this badge as "Life at Notch". Per the user's instruction
 * (BRIEF.md "CONTENT OVERRIDES") it now reads "Life at Cloudex Technologies".
 *
 * Still a flagged, unmigrated leftover, ported verbatim because the user has not
 * asked for it to change: the "View open roles" button points at
 * `www.linkedin.com/in/kanishk-dubey`.
 *
 * Scroll reveals (PLAN.md §1.5), MEASURED:
 *   `.framer-m3g4q0`  "Top Container"  animation3 (y 30) · transition1 (0s) · 0.5 · once
 *   `.framer-1teb2y4` "Grid"           animation3 (y 30) · transition1 (0s) · 0.5 · once
 *
 * The ticker, MEASURED from the route module's `withTickerFX` props on `.framer-1teb2y4`:
 *   tickerEffectVelocity 30 (px/s)   tickerEffectGap "20px"
 *   tickerEffectStackDirection "row" tickerEffectAlign "center"
 *   tickerEffectDraggable false      tickerEffectHoverModifier 50  (→ hoverFactor 0.5)
 *   tickerEffectOverflow "clip"      tickerEffectDirectionModifier "default" (→ left)
 *
 * DIVERGENCE (documented, behaviour-equivalent): Framer drives this with Motion+'s
 * `Ticker`, which keeps exactly four `<li>`s and re-projects each one past the end of the
 * row as it scrolls out. The repo's `Marquee` primitive implements the marketplace
 * `Ticker` instead — it duplicates the set and translates the whole `<ul>` linearly at
 * the same 30px/s. The visible result is the same left-to-right loop; the DOM has extra
 * cloned `<li>`s. `Marquee` renders a `<section>`, so it is nested INSIDE the reveal's
 * `.framer-1teb2y4` div (which owns the CSS mask, gap and 1154px cap) and neutralised to
 * a transparent full-width flex box, rather than replacing that div.
 */

import * as React from "react";

import { Marquee, type ReducedMotionPolicy } from "@/components/primitives";

import { AboutBadge, AboutCtaGroup, AboutReveal } from "./AboutParts";

/* -------------------------------------------------------------------------- */
/* Copy + assets — verbatim                                                    */
/* -------------------------------------------------------------------------- */

/** PLAN.md §7 — unmigrated brand string. Keep. */
export const LIFE_AT_BADGE = "Life at Cloudex Technologies";
export const LIFE_AT_HEADING = "Our People. Our Stories. Our Vibe.";
export const LIFE_AT_CTA_LABEL = "View open roles";
export const LIFE_AT_CTA_HREF = "https://www.linkedin.com/in/kanishk-dubey";

export const LIFE_AT_CTA_UUIDS = [
  "10835287-5a03-4d42-b59b-ad599d93c906",
  "df72eb48-865d-4fff-af73-894f8d670c09",
  "069fb915-6312-42b5-a1bc-9c95cce197e8",
] as const;

/** MEASURED ticker configuration. */
export const LIFE_AT_TICKER = {
  speed: 30,
  gap: 20,
  direction: "left",
  alignment: "center",
  /** `tickerEffectHoverModifier: 50` → `hoverModifier = 50 / 100`. */
  hoverFactor: 0.5,
} as const;

const SIZES_LANDSCAPE =
  "(min-width: 1200px) 600px, (min-width: 810px) and (max-width: 1199.98px) 600px, (max-width: 809.98px) 405.4054px";
const SIZES_PORTRAIT =
  "(min-width: 1200px) 300px, (min-width: 810px) and (max-width: 1199.98px) 300px, (max-width: 809.98px) 202.7027px";

export interface LifeAtPhoto {
  readonly className: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly sizes: string;
  readonly src: string;
  readonly srcSet: string;
}

export const LIFE_AT_PHOTOS: readonly LifeAtPhoto[] = [
  {
    className: "framer-8y1ceo",
    width: 1536,
    height: 1024,
    alt: "colleagues laughing around a table tennis table in the office",
    sizes: SIZES_LANDSCAPE,
    src: "/assets/images/ai/life-1-1536.jpg",
    srcSet:
      "/assets/images/ai/life-1-512.jpg 512w,/assets/images/ai/life-1-1024.jpg 1024w,/assets/images/ai/life-1-1536.jpg 1536w",
  },
  {
    className: "framer-1a3nrb6",
    width: 1024,
    height: 1280,
    alt: "a woman at a desk with a laptop and a notebook",
    sizes: SIZES_PORTRAIT,
    src: "/assets/images/ai/life-2-1024.jpg",
    srcSet:
      "/assets/images/ai/life-2-512.jpg 512w,/assets/images/ai/life-2-1024.jpg 1024w",
  },
  {
    className: "framer-140ldho",
    width: 1536,
    height: 864,
    alt: "an office team celebrating together around a table",
    sizes: SIZES_LANDSCAPE,
    src: "/assets/images/ai/life-3-1536.jpg",
    srcSet:
      "/assets/images/ai/life-3-512.jpg 512w,/assets/images/ai/life-3-1024.jpg 1024w,/assets/images/ai/life-3-1536.jpg 1536w",
  },
  {
    className: "framer-1hp3efx",
    width: 1024,
    height: 1536,
    alt: "a man working at a laptop at a high desk",
    sizes: SIZES_PORTRAIT,
    src: "/assets/images/ai/life-4-1024.jpg",
    srcSet:
      "/assets/images/ai/life-4-512.jpg 512w,/assets/images/ai/life-4-1024.jpg 1024w",
  },
];

/* -------------------------------------------------------------------------- */
/* Static styles                                                               */
/* -------------------------------------------------------------------------- */

/** The SSR's inline style on `.framer-1teb2y4`, minus the reveal's own three props. */
const GRID_STYLE = {
  overflowX: "clip",
  display: "flex",
  position: "relative",
} as React.CSSProperties;

/**
 * Neutralises `Marquee`'s own `<section>` box so `.framer-1teb2y4` keeps owning the
 * layout (`max-width: 1154px`, `gap`, the `mask` and `overflow: clip` all come from
 * `app/framer/layout.css`).
 */
const MARQUEE_SECTION_STYLE: React.CSSProperties = {
  width: "100%",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "none",
  overflow: "clip",
};

const MARQUEE_LIST_STYLE: React.CSSProperties = {
  height: "auto",
  maxHeight: "none",
};

const TICKER_ITEM_STYLE: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 0,
  position: "relative",
  height: "fit-content",
  width: "fit-content",
};

const BACKGROUND_WRAPPER_STYLE = {
  position: "absolute",
  borderRadius: "inherit",
  cornerShape: "inherit",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
} as React.CSSProperties;

const BACKGROUND_IMAGE_STYLE = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  cornerShape: "inherit",
  objectPosition: "center",
  objectFit: "cover",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface LifeAtSectionProps {
  photos?: readonly LifeAtPhoto[];
  reducedMotion?: ReducedMotionPolicy;
  /** Render at the rest state with no reveal and a static, un-duplicated row. */
  disabled?: boolean;
}

export function LifeAtSection({
  photos = LIFE_AT_PHOTOS,
  reducedMotion,
  disabled = false,
}: LifeAtSectionProps): React.ReactElement {
  return (
    <section className="framer-1v4l3a" data-framer-name="Why us">
      <AboutReveal
        enter="up30"
        className="framer-m3g4q0"
        data-framer-name="Top Container"
        reducedMotion={reducedMotion}
        disabled={disabled}
      >
        <div className="framer-11oblow" data-framer-name="Heading">
          <AboutBadge
            containerClassName="framer-11rxly6-container"
            label={LIFE_AT_BADGE}
          />
          <div
            className="framer-8nrqeg"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1uc0rn1"
              data-styles-preset="f6v2ro_B_"
            >
              {LIFE_AT_HEADING}
            </h2>
          </div>
        </div>

        <div className="framer-v6tx8s" data-framer-name="CTA">
          <AboutCtaGroup
            label={LIFE_AT_CTA_LABEL}
            href={LIFE_AT_CTA_HREF}
            tone="Dark"
            containerClassName="framer-r38q2e-container"
            rollingTextUuids={LIFE_AT_CTA_UUIDS}
            reducedMotion={reducedMotion}
          />
        </div>
      </AboutReveal>

      <AboutReveal
        enter="up30"
        className="framer-1teb2y4"
        data-framer-name="Grid"
        style={GRID_STYLE}
        reducedMotion={reducedMotion}
        disabled={disabled}
      >
        <Marquee
          direction={LIFE_AT_TICKER.direction}
          speed={LIFE_AT_TICKER.speed}
          gap={LIFE_AT_TICKER.gap}
          padding={0}
          alignment={LIFE_AT_TICKER.alignment}
          hoverFactor={LIFE_AT_TICKER.hoverFactor}
          // The edge mask is already on `.framer-1teb2y4` in `app/framer/layout.css`;
          // letting Marquee draw a second one would double-darken the fades.
          fadeOptions={{ fadeContent: false, overflow: false }}
          style={MARQUEE_SECTION_STYLE}
          listStyle={MARQUEE_LIST_STYLE}
          itemClassName="ticker-item"
          itemStyle={TICKER_ITEM_STYLE}
          annotateItems
          ariaHiddenItems={false}
          reducedMotion={reducedMotion}
          disabled={disabled}
        >
          {photos.map((photo) => (
            <div key={photo.className} className="ssr-variant">
              <div className={photo.className}>
                <div
                  style={BACKGROUND_WRAPPER_STYLE}
                  data-framer-background-image-wrapper="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    decoding="async"
                    loading="lazy"
                    width={photo.width}
                    height={photo.height}
                    sizes={photo.sizes}
                    srcSet={photo.srcSet}
                    src={photo.src}
                    alt={photo.alt}
                    style={BACKGROUND_IMAGE_STYLE}
                  />
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </AboutReveal>
    </section>
  );
}

export default LifeAtSection;
