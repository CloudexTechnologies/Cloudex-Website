"use client";

/**
 * A heading + body + one CTA band: `/industries` "How we engage" and the home-page teaser.
 *
 * NOT part of the Framer original. It was first built as the about page's "Where we
 * operate" section (since removed) with its copy lifted into props, so it is built only
 * from classes the ported about CSS defines and collapses to a column on tablet and phone the same way.
 *
 * On the home page it must sit inside {@link AboutScope}: the section rules are written
 * `.framer-8WBKH .framer-1dfxumj`, and the home root carries the home hash instead.
 */

import * as React from "react";

import { AboutBadge, AboutCtaGroup, AboutReveal } from "@/components/about/AboutParts";
import type { ReducedMotionPolicy } from "@/components/primitives";

const RICH_TEXT_STYLE = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

export interface EnterpriseCalloutSectionProps {
  name: string;
  badge: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  ctaUuids: readonly [string, string, string];
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function EnterpriseCalloutSection({
  name,
  badge,
  heading,
  body,
  ctaLabel,
  ctaHref,
  ctaUuids,
  reducedMotion,
  disabled = false,
}: EnterpriseCalloutSectionProps): React.ReactElement {
  return (
    <section className="framer-1dfxumj" data-framer-name={name}>
      <AboutReveal
        enter="up30"
        className="framer-1r51ygz"
        data-framer-name="Top Container"
        reducedMotion={reducedMotion}
        disabled={disabled}
      >
        <div className="framer-12jxdp4" data-framer-name="Heading">
          <AboutBadge containerClassName="framer-1q54x7f-container" label={badge} />
          <div className="framer-1mjt4fk" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
            <h2
              className="framer-text framer-styles-preset-1uc0rn1"
              data-styles-preset="f6v2ro_B_"
              style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
            >
              {heading}
            </h2>
          </div>
          <div className="framer-1mjt4fk" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
            <p
              className="framer-text framer-styles-preset-wgkvl1"
              data-styles-preset="risoZ9TJU"
              style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
            >
              {body}
            </p>
          </div>
        </div>

        <div className="framer-7z7v20" data-framer-name="CTA">
          <AboutCtaGroup
            label={ctaLabel}
            href={ctaHref}
            tone="Dark"
            containerClassName="framer-pkexsj-container"
            rollingTextUuids={ctaUuids}
            selfContained
            reducedMotion={reducedMotion}
          />
        </div>
      </AboutReveal>
    </section>
  );
}

/**
 * Carries the about page's CSS scope for about-built sections mounted on another route.
 * `display: contents` keeps it out of layout, exactly like each route's own root div.
 */
export function AboutScope({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="framer-8WBKH" style={{ display: "contents" }}>
      {children}
    </div>
  );
}

export default EnterpriseCalloutSection;
