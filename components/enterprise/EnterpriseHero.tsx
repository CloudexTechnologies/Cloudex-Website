"use client";

/**
 * Hero for `/services` and `/industries`.
 *
 * NOT part of the Framer original. It is the `/about` hero (`AboutHero`) with its copy,
 * image and stats lifted into props: the same class names, appear ids and reveal, so it
 * inherits the about page's CSS scope (`.framer-8WBKH`, which both new routes put on their
 * root) and behaves identically at all three breakpoints. Only the notch icon differs,
 * a check seal instead of the map pin, because the notch carries a tagline, not an address.
 */

import * as React from "react";

import { AboutReveal, BadgeCard, RoundedEdge } from "@/components/about/AboutParts";
import { ABOUT_HERO_STATS } from "@/components/about/AboutHero";
import { TOKEN_BLACK, TOKEN_BLUE, TOKEN_WHITE } from "@/components/about/about-tokens";
import { AppearMotion, type ReducedMotionPolicy } from "@/components/primitives";

import type { EnterpriseImage, EnterpriseStat } from "./enterprise-content";

/** Same box as `AboutHero`'s image slot. */
const HERO_IMAGE_SIZES =
  "(min-width: 1200px) min(max(100vw - 46px, 1px) - 34px, 1154px), (min-width: 810px) and (max-width: 1199.98px) min(max(100vw, 1px) - 80px, 1154px), (max-width: 809.98px) min(100vw - 48px, 1154px)";

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

/** Sits in the `.framer-1nz4ayy-container` slot the about hero uses for its map pin. */
function SealIcon(): React.ReactElement {
  return (
    <div className="framer-1nz4ayy-container">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ width: "100%", height: "100%", display: "inline-block", flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="10" fill={TOKEN_WHITE} />
        <path
          d="M7.5 12.5l3 3 6-6.5"
          fill="none"
          stroke={TOKEN_BLACK}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export interface EnterpriseHeroProps {
  badge: string;
  heading: string;
  notch: string;
  intro: string;
  /** Up to three, filling the about hero's three stat slots. Omit on detail pages. */
  stats?: readonly EnterpriseStat[];
  image: EnterpriseImage;
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function EnterpriseHero({
  badge,
  heading,
  notch,
  intro,
  stats = [],
  image,
  reducedMotion,
  disabled = false,
}: EnterpriseHeroProps): React.ReactElement {
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
              <BadgeCard label={badge} backgroundColor={TOKEN_BLUE} />
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
              {heading}
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
            <div style={BACKGROUND_WRAPPER_STYLE} data-framer-background-image-wrapper="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                decoding="async"
                width={image.width}
                height={image.height}
                sizes={HERO_IMAGE_SIZES}
                srcSet={image.srcSet}
                src={image.src}
                alt={image.alt}
                style={BACKGROUND_IMAGE_STYLE}
              />
            </div>

            <div className="framer-9t3rp6" data-framer-name="Notch">
              <SealIcon />
              <div
                className="framer-1r9ups3"
                data-framer-component-type="RichTextContainer"
                style={{ transform: "none" }}
              >
                <p
                  className="framer-text framer-styles-preset-141u1yr"
                  data-styles-preset="pAzayDUZg"
                  dir="auto"
                  style={{ "--framer-text-alignment": "start" } as React.CSSProperties}
                >
                  {notch}
                </p>
              </div>
              <RoundedEdge className="framer-1cz23lj" svgClassName="framer-1ig61pm" rotate="rotate(-180deg)" />
              <RoundedEdge className="framer-r6rdsn" svgClassName="framer-1hjqt9y" rotate="rotate(180deg)" />
            </div>
          </AppearMotion>
        </div>

        <AboutReveal
          enter="up40"
          className="framer-1bw02m4"
          data-framer-name="Stats"
          reducedMotion={reducedMotion}
          disabled={disabled}
        >
          {stats.length > 0 ? (
            <div className="framer-191ccrc" data-framer-name="Stats grid">
              {ABOUT_HERO_STATS.map((slot, index) => {
                const stat = stats[index];
                if (!stat) return null;
                return (
                  <div key={slot.className} className={slot.className} data-framer-name={slot.name}>
                    <div
                      className={slot.valueClassName}
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p className="framer-text framer-styles-preset-1hqdceo" data-styles-preset="w3OM43FU0" dir="auto">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={slot.labelClassName}
                      data-framer-component-type="RichTextContainer"
                      style={{ transform: "none" }}
                    >
                      <p className="framer-text framer-styles-preset-wgkvl1" data-styles-preset="risoZ9TJU">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="framer-1guwh8m" data-framer-name="Intro">
            <div
              className="framer-yy22qk"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-wgkvl1"
                data-styles-preset="risoZ9TJU"
                style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
              >
                {intro}
              </p>
            </div>
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}

export default EnterpriseHero;
