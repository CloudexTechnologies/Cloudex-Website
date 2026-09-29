"use client";

/**
 * `/about` §04 — `<section class="framer-2kiesh" data-framer-name="Our story">`.
 * Source: `_source/live/about.html` bytes 188733–233132.
 *
 * Layout: a sticky-ish two-column split — `.framer-1y68enf` ("Left": badge, heading,
 * subhead, CTA) beside `.framer-1ts059q` ("Right Cards": the four 2022→2025 milestones).
 *
 * Scroll reveals (PLAN.md §1.5), all MEASURED from the route module:
 *   `.framer-1y68enf`          animation3 (y 30) · transition1 (0s) · threshold 0.5
 *   the four `…-container`s    animation3 (y 30) · transition1 (0s) · **threshold 0**
 *
 * The four cards' threshold really is 0, not 0.5 — they are 450px tall and stacked, so
 * Framer fires them as soon as any part enters. Reproduced with `amount={0}`.
 *
 * Copy is verbatim, including the misspelling in the CTA label
 * "Start your sucess journey" (PLAN.md §7).
 */

import * as React from "react";

import { BOOKING_URL } from "@/lib/booking";

import type { ReducedMotionPolicy } from "@/components/primitives";

import { AboutBadge, AboutCtaGroup, AboutReveal, RoundedEdge } from "./AboutParts";
import { TOKEN_BLACK, TOKEN_BODY_TEXT, TOKEN_WHITE } from "./about-tokens";

/* -------------------------------------------------------------------------- */
/* Copy + assets — verbatim                                                    */
/* -------------------------------------------------------------------------- */

export const OUR_STORY_BADGE = "Our Story";
export const OUR_STORY_HEADING = "The Journey That Built Our AI-Driven Future";
export const OUR_STORY_SUBHEAD =
  "From our first project to today, we’ve stayed focused on one mission: turning complexity into simplicity with AI.";
/** `sic` — the typo is in the live site (PLAN.md §7). Do not fix it. */
export const OUR_STORY_CTA_LABEL = "Start your sucess journey";
export const OUR_STORY_CTA_HREF = BOOKING_URL;

/** The three per-instance rolling-text uuids, in SSR document order. */
export const OUR_STORY_CTA_UUIDS = [
  "69b7cdfc-bb1e-4177-ab4e-052231cadf40",
  "82bcaee5-d5de-472a-b22e-d77240bb1682",
  "2576cfa4-ac94-45af-9f77-e08104c5c181",
] as const;

export interface StoryMilestone {
  readonly containerClassName: string;
  readonly title: string;
  readonly body: string;
  readonly year: string;
  readonly image: {
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly src: string;
    readonly srcSet: string;
  };
}

const CARD_IMAGE_SIZES =
  "(min-width: 1200px) calc(min(min(100vw, 1200px) - 80px, 1154px) * 0.45), (min-width: 810px) and (max-width: 1199.98px) calc(min(min(100vw, 1200px) - 80px, 1154px) / 2), (max-width: 809.98px) min(min(100vw, 1200px) - 48px, 1154px)";

export const OUR_STORY_MILESTONES: readonly StoryMilestone[] = [
  {
    containerClassName: "framer-w4kibl-container",
    title: "The Spark That Started It All",
    body: "Every startup begins with a crazy idea. Ours was simple: what if businesses could run smarter with AI? That spark pushed us to take the first step.",
    year: "2022",
    image: {
      width: 1024,
      height: 1536,
      alt: "a man with a cup of chai and a laptop in a quiet office corner",
      src: "/assets/images/ai/story-1-1024.jpg",
      srcSet:
      "/assets/images/ai/story-1-512.jpg 512w,/assets/images/ai/story-1-1024.jpg 1024w",
    },
  },
  {
    containerClassName: "framer-1yckpw8-container",
    title: "First Wins That Proved Our Vision",
    body: "We rolled up our sleeves and built our first chatbots and workflow automations. Seeing clients save hours of manual work proved that we were onto something big.",
    year: "2023",
    image: {
      width: 1536,
      height: 1024,
      alt: "two colleagues looking at a shared laptop screen",
      src: "/assets/images/ai/story-2-1536.jpg",
      srcSet:
      "/assets/images/ai/story-2-512.jpg 512w,/assets/images/ai/story-2-1024.jpg 1024w,/assets/images/ai/story-2-1536.jpg 1536w",
    },
  },
  {
    containerClassName: "framer-1aqtqtj-container",
    title: "Leveling Up and Expanding Our Reach",
    // The double space after "taught us," is in the source.
    body: "Momentum kicked in. We moved beyond chatbots launching voice agents, AI marketing tools, and data analytics. Each project taught us,  and grew our vision.",
    year: "2024",
    image: {
      width: 1024,
      height: 1536,
      alt: "two engineers reviewing code side by side",
      src: "/assets/images/ai/story-3-1024.jpg",
      srcSet:
      "/assets/images/ai/story-3-512.jpg 512w,/assets/images/ai/story-3-1024.jpg 1024w",
    },
  },
  {
    containerClassName: "framer-ziefp7-container",
    title: "Full Speed Ahead to Smarter Solutions",
    body: "This was the year we truly became an AI Native Technology Firm. A complete suite of AI solutions, bigger clients, and one mission in focus: helping businesses scale smarter.",
    year: "2025",
    image: {
      width: 1536,
      height: 1024,
      alt: "colleagues standing together in conversation in an office",
      src: "/assets/images/ai/story-4-1536.jpg",
      srcSet:
      "/assets/images/ai/story-4-512.jpg 512w,/assets/images/ai/story-4-1024.jpg 1024w,/assets/images/ai/story-4-1536.jpg 1536w",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Static styles, transcribed from the SSR                                     */
/* -------------------------------------------------------------------------- */

const CARD_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color": TOKEN_BLACK,
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  width: "100%",
  borderBottomLeftRadius: "18px",
  borderBottomRightRadius: "18px",
  borderTopLeftRadius: "18px",
  borderTopRightRadius: "18px",
} as React.CSSProperties;

/** `.framer-1sombq6` — Framer's `add`-composited gradient mask over the photo. */
const CARD_PHOTO_MASK =
  "linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.18) 24.909927679158447%, rgba(0,0,0,1) 83%) add";

const CARD_PHOTO_STYLE = {
  mask: CARD_PHOTO_MASK,
  WebkitMask: CARD_PHOTO_MASK,
} as React.CSSProperties;

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

const NOTCH_STYLE = {
  backgroundColor: TOKEN_BLACK,
  borderBottomRightRadius: "18px",
} as React.CSSProperties;

const NOTCH_TEXT_STYLE = {
  "--extracted-r6o4lv": TOKEN_WHITE,
  "--framer-paragraph-spacing": "0px",
  transform: "none",
} as React.CSSProperties;

const CARD_TITLE_STYLE = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

const CARD_BODY_STYLE = {
  "--extracted-r6o4lv": TOKEN_BODY_TEXT,
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface OurStorySectionProps {
  milestones?: readonly StoryMilestone[];
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function OurStorySection({
  milestones = OUR_STORY_MILESTONES,
  reducedMotion,
  disabled = false,
}: OurStorySectionProps): React.ReactElement {
  return (
    <section className="framer-2kiesh" data-framer-name="Our story">
      <div className="framer-8rxlc0" data-framer-name="Container">
        <AboutReveal
          enter="up30"
          className="framer-1y68enf"
          data-framer-name="Left"
          reducedMotion={reducedMotion}
          disabled={disabled}
        >
          <AboutBadge
            containerClassName="framer-vvmmck-container"
            label={OUR_STORY_BADGE}
          />

          <div className="framer-4qmss5" data-framer-name="Heading and subheading">
            <div
              className="framer-dff12t"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <h2
                className="framer-text framer-styles-preset-1uc0rn1"
                data-styles-preset="f6v2ro_B_"
              >
                {OUR_STORY_HEADING}
              </h2>
            </div>
            <div
              className="framer-82hx1l"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-wgkvl1"
                data-styles-preset="risoZ9TJU"
                style={
                  { "--framer-text-alignment": "left" } as React.CSSProperties
                }
              >
                {OUR_STORY_SUBHEAD}
              </p>
            </div>
          </div>

          <AboutCtaGroup
            label={OUR_STORY_CTA_LABEL}
            href={OUR_STORY_CTA_HREF}
            tone="Light"
            containerClassName="framer-konowo-container"
            rollingTextUuids={OUR_STORY_CTA_UUIDS}
            reducedMotion={reducedMotion}
          />
        </AboutReveal>

        <div className="framer-1ts059q" data-framer-name="Right Cards">
          {milestones.map((milestone) => (
            <div key={milestone.containerClassName} className="ssr-variant">
              <AboutReveal
                enter="up30"
                amount={0}
                className={milestone.containerClassName}
                reducedMotion={reducedMotion}
                disabled={disabled}
              >
                <div
                  className="framer-zDznV framer-dhPgH framer-JesZO framer-TPaq9 framer-iwge05 framer-v-iwge05"
                  data-border="true"
                  data-framer-name="Our story"
                  style={CARD_STYLE}
                >
                  <div className="framer-kdeq7b" data-framer-name="Content">
                    <div
                      className="framer-bmutq8"
                      data-framer-component-type="RichTextContainer"
                      style={CARD_TITLE_STYLE}
                    >
                      <p
                        className="framer-text framer-styles-preset-13jy9hb"
                        data-styles-preset="oBvWttoAP"
                      >
                        {milestone.title}
                      </p>
                    </div>
                    <div
                      className="framer-wp22n5"
                      data-framer-component-type="RichTextContainer"
                      style={CARD_BODY_STYLE}
                    >
                      <p
                        className="framer-text framer-styles-preset-o3oioe"
                        data-styles-preset="BgF22VJBv"
                        dir="auto"
                        style={
                          {
                            "--framer-text-alignment": "left",
                            "--framer-text-color": `var(--extracted-r6o4lv, ${TOKEN_BODY_TEXT})`,
                          } as React.CSSProperties
                        }
                      >
                        {milestone.body}
                      </p>
                    </div>
                  </div>

                  <div className="framer-1sombq6" style={CARD_PHOTO_STYLE}>
                    <div
                      style={BACKGROUND_WRAPPER_STYLE}
                      data-framer-background-image-wrapper="true"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        decoding="async"
                        loading="lazy"
                        width={milestone.image.width}
                        height={milestone.image.height}
                        sizes={CARD_IMAGE_SIZES}
                        srcSet={milestone.image.srcSet}
                        src={milestone.image.src}
                        alt={milestone.image.alt}
                        style={BACKGROUND_IMAGE_STYLE}
                      />
                    </div>
                  </div>

                  <div
                    className="framer-9a4bjj"
                    data-framer-name="Notch"
                    style={NOTCH_STYLE}
                  >
                    <div
                      className="framer-1sofoyv"
                      data-framer-component-type="RichTextContainer"
                      style={NOTCH_TEXT_STYLE}
                    >
                      <p
                        className="framer-text framer-styles-preset-141u1yr"
                        data-styles-preset="pAzayDUZg"
                        style={
                          {
                            "--framer-text-color": `var(--extracted-r6o4lv, ${TOKEN_WHITE})`,
                          } as React.CSSProperties
                        }
                      >
                        {milestone.year}
                      </p>
                    </div>
                    <RoundedEdge
                      className="framer-1qcjp8s"
                      svgClassName="framer-ljd3ro"
                      rotate="rotate(90deg)"
                    />
                    <RoundedEdge
                      className="framer-9ufsuv"
                      svgClassName="framer-1b3rn2h"
                      rotate="rotate(90deg)"
                    />
                  </div>
                </div>
              </AboutReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStorySection;
