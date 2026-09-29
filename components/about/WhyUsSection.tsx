"use client";

/**
 * `/about` §05 — `<section class="framer-1dfxumj" data-framer-name="Why us">`.
 * Source: `_source/live/about.html` bytes 233132–263008.
 *
 * Scroll reveals (PLAN.md §1.5), MEASURED from the route module's `ContainerWithFX`
 * props plus its `PropertyOverrides` (baseVariant = desktop `KyWRlgP1q`,
 * `jfSBP_833` = tablet, `v_Ask5CxP` = phone):
 *
 *   `.framer-1r51ygz`  "Top Container"  animation3 (y 30)  delay 0 everywhere
 *   `.framer-b5bic7-container`   animation4 (y 75)  delay 0    / 0    / 0
 *   `.framer-mndntx-container`   animation4         delay 0.15 / 0.15 / 0
 *   `.framer-10ig43h-container`  animation4         delay 0.3  / 0    / 0
 *   `.framer-sdwby9-container`   animation4         delay 0    / 0.15 / 0
 *   `.framer-rljg36-container`   animation4         delay 0.15 / 0    / 0
 *   `.framer-zqhlne-container`   animation4         delay 0.3  / 0.15 / 0
 *                                                   (desktop / tablet / phone)
 *
 * The icons are `<use href="#…">` into the page sprite — see `SvgTemplates`.
 */

import * as React from "react";

import { BOOKING_URL } from "@/lib/booking";

import type { ReducedMotionPolicy } from "@/components/primitives";

import {
  AboutBadge,
  AboutCtaGroup,
  AboutReveal,
  ABOUT_REVEAL_DELAYS,
  type AboutRevealDelays,
} from "./AboutParts";
import { TOKEN_WHITE } from "./about-tokens";

/* -------------------------------------------------------------------------- */
/* Copy — verbatim                                                             */
/* -------------------------------------------------------------------------- */

export const WHY_US_BADGE = "Why us";
export const WHY_US_HEADING = "Why people chooses us over others";
export const WHY_US_CTA_LABEL = "Let's get started";
export const WHY_US_CTA_HREF = BOOKING_URL;

export const WHY_US_CTA_UUIDS = [
  "d8f52c76-a296-4d8d-8023-45cd954d9792",
  "1698e877-ea55-4b57-9df8-b3c27ec223f0",
  "0399d8e7-eb50-45c5-a25f-8c07791366c6",
] as const;

export interface WhyUsCard {
  readonly containerClassName: string;
  /** The per-card icon class; `framer-h7edyu` is the shared sizing class. */
  readonly iconClassName: string;
  /** `#…` id in the page's `#svg-templates` sprite. */
  readonly iconHref: string;
  readonly title: string;
  readonly body: string;
  readonly delays: AboutRevealDelays;
}

const { t1, t2, t3 } = ABOUT_REVEAL_DELAYS;

export const WHY_US_CARDS: readonly WhyUsCard[] = [
  {
    containerClassName: "framer-b5bic7-container",
    iconClassName: "framer-JrhtI framer-h7edyu",
    iconHref: "#1028000027",
    title: "AI-First Approach",
    body: "We build every solution with AI at the core, ensuring smarter automation and long-term scalability from day one.",
    delays: { desktop: t1, tablet: t1, phone: t1 },
  },
  {
    containerClassName: "framer-mndntx-container",
    iconClassName: "framer-8cee5 framer-h7edyu",
    iconHref: "#1273241095",
    title: "Custom Solutions",
    body: "Every automation is tailored to your business goals, workflows, and tools. Never one-size-fits-all.",
    delays: { desktop: t2, tablet: t2, phone: t1 },
  },
  {
    containerClassName: "framer-10ig43h-container",
    iconClassName: "framer-LmhHe framer-h7edyu",
    iconHref: "#1529132500",
    title: "Simple & Clear",
    body: "We simplify complex AI concepts and deliver tools that your team can easily understand and use daily and easily",
    delays: { desktop: t3, tablet: t1, phone: t1 },
  },
  {
    containerClassName: "framer-sdwby9-container",
    iconClassName: "framer-2HOUp framer-h7edyu",
    iconHref: "#1808785782",
    title: "Proven Process",
    body: "Our structured, step-by-step process ensures reliable delivery, clear communication, and consistent results.",
    delays: { desktop: t1, tablet: t2, phone: t1 },
  },
  {
    containerClassName: "framer-rljg36-container",
    iconClassName: "framer-iTb8F framer-h7edyu",
    iconHref: "#500676987",
    title: "Seamless Integration",
    body: "We integrate AI smoothly into your existing systems without disrupting workflows or slowing your team down.",
    delays: { desktop: t2, tablet: t1, phone: t1 },
  },
  {
    containerClassName: "framer-zqhlne-container",
    iconClassName: "framer-DK6PS framer-h7edyu",
    iconHref: "#1430394497",
    title: "Ongoing Support",
    body: "We continuously monitor, improve, and maintain your AI systems to keep them performing at their best and easy",
    delays: { desktop: t3, tablet: t2, phone: t1 },
  },
];

/* -------------------------------------------------------------------------- */
/* Static styles, transcribed from the SSR                                     */
/* -------------------------------------------------------------------------- */

const CARD_STYLE = {
  background:
    "linear-gradient(120deg, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 0%, rgba(0, 0, 0, 0) 100%)",
  width: "100%",
  borderBottomLeftRadius: "18px",
  borderBottomRightRadius: "18px",
  borderTopLeftRadius: "18px",
  borderTopRightRadius: "18px",
} as React.CSSProperties;

const ICON_HOLDER_STYLE = {
  backgroundColor: "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
} as React.CSSProperties;

/**
 * The three custom properties the sprite's `<path>`s read:
 * `--1m6trwb` fill-opacity, `--21h8s6` colour, `--pgex8v` stroke-width.
 */
const ICON_STYLE = {
  "--1m6trwb": 1,
  "--21h8s6": TOKEN_WHITE,
  "--pgex8v": 1.5,
} as React.CSSProperties;

const RICH_TEXT_STYLE = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface WhyUsSectionProps {
  cards?: readonly WhyUsCard[];
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function WhyUsSection({
  cards = WHY_US_CARDS,
  reducedMotion,
  disabled = false,
}: WhyUsSectionProps): React.ReactElement {
  return (
    <section className="framer-1dfxumj" data-framer-name="Why us">
      <AboutReveal
        enter="up30"
        className="framer-1r51ygz"
        data-framer-name="Top Container"
        reducedMotion={reducedMotion}
        disabled={disabled}
      >
        <div className="framer-12jxdp4" data-framer-name="Heading">
          <AboutBadge
            containerClassName="framer-1q54x7f-container"
            label={WHY_US_BADGE}
          />
          <div
            className="framer-1mjt4fk"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h2
              className="framer-text framer-styles-preset-1uc0rn1"
              data-styles-preset="f6v2ro_B_"
            >
              {WHY_US_HEADING}
            </h2>
          </div>
        </div>

        <div className="framer-7z7v20" data-framer-name="CTA">
          <AboutCtaGroup
            label={WHY_US_CTA_LABEL}
            href={WHY_US_CTA_HREF}
            tone="Dark"
            containerClassName="framer-pkexsj-container"
            rollingTextUuids={WHY_US_CTA_UUIDS}
            reducedMotion={reducedMotion}
          />
        </div>
      </AboutReveal>

      <div className="framer-1qyn8gp" data-framer-name="Grid">
        {cards.map((card) => (
          <div key={card.containerClassName} className="ssr-variant">
            <AboutReveal
              enter="up75"
              delays={card.delays}
              className={card.containerClassName}
              reducedMotion={reducedMotion}
              disabled={disabled}
            >
              <div
                className="framer-7dwpF framer-an3Me framer-JesZO framer-1miv5pr framer-v-1miv5pr"
                data-framer-name="Why us"
                style={CARD_STYLE}
              >
                <div
                  className="framer-1lb2jea"
                  data-framer-name="Icon holder"
                  style={ICON_HOLDER_STYLE}
                >
                  <svg
                    className={card.iconClassName}
                    role="presentation"
                    viewBox="0 0 24 24"
                    style={ICON_STYLE}
                  >
                    <use href={card.iconHref} />
                  </svg>
                </div>
                <div className="framer-d464xi" data-framer-name="Content">
                  <div
                    className="framer-1gfl1hr"
                    data-framer-component-type="RichTextContainer"
                    style={RICH_TEXT_STYLE}
                  >
                    <p
                      className="framer-text framer-styles-preset-17m54kk"
                      data-styles-preset="QgMyyAavm"
                    >
                      {card.title}
                    </p>
                  </div>
                  <div
                    className="framer-197g31p"
                    data-framer-component-type="RichTextContainer"
                    style={RICH_TEXT_STYLE}
                  >
                    <p
                      className="framer-text framer-styles-preset-o3oioe"
                      data-styles-preset="BgF22VJBv"
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            </AboutReveal>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyUsSection;
