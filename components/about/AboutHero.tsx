"use client";

/**
 * `/about` §03 — `<section class="framer-1y17f4o" data-framer-name="Hero">`.
 * Source: `_source/live/about.html` bytes 181987–188733 (`_source/structure/about.md`).
 *
 * Animation, all MEASURED:
 *  • three APPEAR animations (fire on mount, not on scroll): `1rg0io8` (badge),
 *    `1balu35` (h1), `zetnx8` (photo). `1rg0io8` and `zetnx8` carry ABOUT-page variant
 *    keys (`default` / `1v6k32p` / `k39dq1`), so they are resolved with `scope="about"`;
 *    resolving them against home's hashes would silently fall back to `default`.
 *    Every variant is the same: `opacity 0.001 → 1`, `y 40 → 0`, spring 300/60/1, delay 0.
 *  • one SCROLL reveal: `.framer-1bw02m4` ("Stats"), `animation2` (y 40) + `transition1`
 *    (delay 0), threshold 0.5, once. Without it the whole stats row stays at opacity 0.
 *
 * The two `<div class="ssr-variant">` wrappers carry NO `hidden-*` classes here — Framer
 * emits them because the nodes inside have per-breakpoint appear variants, not because
 * the markup differs. They are kept verbatim.
 */

import * as React from "react";

import { AppearMotion, type ReducedMotionPolicy } from "@/components/primitives";

import { AboutReveal, BadgeCard, RoundedEdge } from "./AboutParts";
import { TOKEN_BLUE, TOKEN_WHITE } from "./about-tokens";

/* -------------------------------------------------------------------------- */
/* Copy — verbatim                                                             */
/* -------------------------------------------------------------------------- */

export const ABOUT_HERO_BADGE = "About Us";
export const ABOUT_HERO_HEADING = "Your Shortcut to Smarter Automation";
/** The real Karachi office, matching the Contact page. Framer's template shipped
 *  "Cloudex Technologies Office, Central part, New York". */
export const ABOUT_HERO_LOCATION =
  "852, 85 Dunstall Hill, Wolverhampton WV6 0SR, UK";
/** Note the trailing space on "Time saved " — it is in the source. */
export const ABOUT_HERO_STATS = [
  { className: "framer-1373tu4", name: "1st stat", valueClassName: "framer-4ia4cl", labelClassName: "framer-35e1k8", value: "50+", label: "Works automated" },
  { className: "framer-nj7kz5", name: "2nd stats", valueClassName: "framer-1q9ltyv", labelClassName: "framer-1u5f7du", value: "1000+", label: "Daily AI Interaction" },
  { className: "framer-7mtato", name: "3rd stats", valueClassName: "framer-nq9zt3", labelClassName: "framer-d6p0ne", value: "70%", label: "Time saved " },
] as const;
export const ABOUT_HERO_INTRO =
  "We’re an AI Native Technology Firm helping businesses automate workflows, build AI agents, and unlock insights. Our mission is simple, make automation effortless so you can focus on scaling what matters most.";

/* -------------------------------------------------------------------------- */
/* Image — `iNybHyn2ecySOW7eNCg1SPLRFw.jpg`, rewritten through _source/asset-map.json */
/* -------------------------------------------------------------------------- */

const HERO_IMAGE = {
  width: 1536,
  height: 1018,
  alt: "colleagues gathered around a meeting table in an open-plan office",
  sizes:
    "(min-width: 1200px) min(max(100vw - 46px, 1px) - 34px, 1154px), (min-width: 810px) and (max-width: 1199.98px) min(max(100vw, 1px) - 80px, 1154px), (max-width: 809.98px) min(100vw - 48px, 1154px)",
  src: "/assets/images/ai/hero-1536.jpg",
  srcSet:
      "/assets/images/ai/hero-512.jpg 512w,/assets/images/ai/hero-1024.jpg 1024w,/assets/images/ai/hero-1536.jpg 1536w",
} as const;

const BACKGROUND_WRAPPER_STYLE: React.CSSProperties = {
  position: "absolute",
  borderRadius: "inherit",
  cornerShape: "inherit",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
} as React.CSSProperties;

const BACKGROUND_IMAGE_STYLE: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  cornerShape: "inherit",
  objectPosition: "center",
  objectFit: "cover",
} as React.CSSProperties;

/**
 * `.framer-1nz4ayy-container` — a Phosphor `MapPin` at `weight="fill"`. The SSR ships an
 * empty `<div style="display:contents">` placeholder and the icon is injected on
 * hydration; the path below is lifted from `_source/rendered/about.desktop.html`.
 */
function MapPinIcon(): React.ReactElement {
  return (
    <div className="framer-1nz4ayy-container">
      <div style={{ display: "contents" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
          color={TOKEN_WHITE}
          style={{
            userSelect: "none",
            width: "100%",
            height: "100%",
            display: "inline-block",
            fill: TOKEN_WHITE,
            color: TOKEN_WHITE,
            flexShrink: 0,
          }}
        >
          <g color={TOKEN_WHITE} {...({ weight: "fill" } as Record<string, string>)}>
            <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface AboutHeroProps {
  reducedMotion?: ReducedMotionPolicy;
  /** Render at the rest state with no animation (screenshots / visual diffing). */
  disabled?: boolean;
}

export function AboutHero({
  reducedMotion,
  disabled = false,
}: AboutHeroProps): React.ReactElement {
  return (
    <section className="framer-1y17f4o" data-framer-name="Hero">
      <div className="framer-1x101fe" data-framer-name="Container">
        <div className="framer-1exuph7" data-framer-name="Heading" id="header">
          <div className="ssr-variant">
            <AppearMotion
              id="1rg0io8"
              scope="about"
              className="framer-1rg0io8-container"
              reducedMotion={reducedMotion}
              disabled={disabled}
            >
              <BadgeCard label={ABOUT_HERO_BADGE} backgroundColor={TOKEN_BLUE} />
            </AppearMotion>
          </div>

          <AppearMotion
            id="1balu35"
            scope="about"
            className="framer-1balu35"
            data-framer-component-type="RichTextContainer"
            reducedMotion={reducedMotion}
            disabled={disabled}
          >
            <h1
              className="framer-text framer-styles-preset-d8f6ar"
              data-styles-preset="btOMgah8g"
              style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
            >
              {ABOUT_HERO_HEADING}
            </h1>
          </AppearMotion>
        </div>

        <div className="ssr-variant">
          <AppearMotion
            id="zetnx8"
            scope="about"
            className="framer-zetnx8"
            data-border="true"
            reducedMotion={reducedMotion}
            disabled={disabled}
          >
            <div
              style={BACKGROUND_WRAPPER_STYLE}
              data-framer-background-image-wrapper="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                decoding="async"
                width={HERO_IMAGE.width}
                height={HERO_IMAGE.height}
                sizes={HERO_IMAGE.sizes}
                srcSet={HERO_IMAGE.srcSet}
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                style={BACKGROUND_IMAGE_STYLE}
              />
            </div>

            <div className="framer-9t3rp6" data-framer-name="Notch">
              <MapPinIcon />
              <div
                className="framer-1r9ups3"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-141u1yr"
                  data-styles-preset="pAzayDUZg"
                  dir="auto"
                  style={
                    { "--framer-text-alignment": "start" } as React.CSSProperties
                  }
                >
                  {ABOUT_HERO_LOCATION}
                </p>
              </div>
              <RoundedEdge
                className="framer-1cz23lj"
                svgClassName="framer-1ig61pm"
                rotate="rotate(-180deg)"
              />
              <RoundedEdge
                className="framer-r6rdsn"
                svgClassName="framer-1hjqt9y"
                rotate="rotate(180deg)"
              />
            </div>
          </AppearMotion>
        </div>

        {/* PLAN.md §1.5 — SSR'd `opacity:0; transform:translateY(40px)`. */}
        <AboutReveal
          enter="up40"
          className="framer-1bw02m4"
          data-framer-name="Stats"
          reducedMotion={reducedMotion}
          disabled={disabled}
        >
          <div className="framer-191ccrc" data-framer-name="Stats grid">
            {ABOUT_HERO_STATS.map((stat) => (
              <div
                key={stat.className}
                className={stat.className}
                data-framer-name={stat.name}
              >
                <div
                  className={stat.valueClassName}
                  data-framer-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="framer-text framer-styles-preset-1hqdceo"
                    data-styles-preset="w3OM43FU0"
                    dir="auto"
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className={stat.labelClassName}
                  data-framer-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="framer-text framer-styles-preset-wgkvl1"
                    data-styles-preset="risoZ9TJU"
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="framer-1guwh8m" data-framer-name="About us">
            <div
              className="framer-yy22qk"
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
                {ABOUT_HERO_INTRO}
              </p>
            </div>
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}

export default AboutHero;
