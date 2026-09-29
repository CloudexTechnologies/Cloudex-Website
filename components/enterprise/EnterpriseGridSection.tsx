"use client";

/**
 * Card grid for `/services` (service lines) and `/industries` (sectors).
 *
 * NOT part of the Framer original. It is the `/about` "Why us" section (`WhyUsSection`)
 * generalised: the same section shell, "Top Container", 3/2/1-column grid and card
 * component classes, so it needs no CSS of its own. Two additions, both built from
 * existing presets:
 *
 *   • an optional body line under the heading, the `wgkvl1` paragraph `EnterpriseCalloutSection`
 *     already uses in the same heading column;
 *   • an optional per-card list, rendered in the card's own body preset (`o3oioe`).
 *
 * Cards with an `href` render as a `next/link` wrapping the whole card, plus a
 * "Learn more" line in the accent colour.
 *
 * Card containers cycle through the six "Why us" container classes. Their rules are
 * identical (`flex:none; place-self:start; width:100%`), so any count of cards lays out
 * correctly; the reveal stagger follows the about page's 0 / 0.15 / 0.3 ladder per column.
 */

import * as React from "react";
import NextLink from "next/link";

import {
  AboutBadge,
  AboutCtaGroup,
  AboutReveal,
  ABOUT_REVEAL_DELAYS,
} from "@/components/about/AboutParts";
import type { ReducedMotionPolicy } from "@/components/primitives";
import { scrollTopOnClick } from "@/lib/scroll-top";

import { EnterpriseIcon } from "./EnterpriseIcon";
import type { EnterpriseCard } from "./enterprise-content";

const CARD_CONTAINER_CLASSES = [
  "framer-b5bic7-container",
  "framer-mndntx-container",
  "framer-10ig43h-container",
  "framer-sdwby9-container",
  "framer-rljg36-container",
  "framer-zqhlne-container",
] as const;

const { t1, t2, t3 } = ABOUT_REVEAL_DELAYS;
const COLUMN_DELAYS = [t1, t2, t3] as const;

/** Transcribed from `WhyUsSection`. */
const CARD_STYLE = {
  background:
    "linear-gradient(120deg, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 0%, rgba(0, 0, 0, 0) 100%)",
  width: "100%",
  height: "100%",
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

const RICH_TEXT_STYLE = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

/** The list sits in the card body's column; the dot is the accent token. */
const LIST_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  margin: 0,
  padding: 0,
  listStyle: "none",
  width: "100%",
};

const LIST_ITEM_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
};

const CARD_LINK_STYLE: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  textDecoration: "none",
  color: "inherit",
};

/** The site's link blue (`--framer-link-text-color`); the #05f accent is too dark for small text here. */
const LEARN_MORE_STYLE = {
  "--framer-text-color": "rgb(0, 153, 255)",
  "--framer-text-alignment": "left",
} as React.CSSProperties;

const LIST_DOT_STYLE: React.CSSProperties = {
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  flexShrink: 0,
  transform: "translateY(-3px)",
  backgroundColor: "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
};

/** A card is a link when it has an `href`; otherwise its content renders as-is. */
function CardShell({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}): React.ReactElement {
  if (!href) return <>{children}</>;
  return (
    <NextLink href={href} onClick={scrollTopOnClick(href)} style={CARD_LINK_STYLE} aria-label={`${label}: learn more`}>
      {children}
    </NextLink>
  );
}

export interface EnterpriseGridSectionProps {
  /** `data-framer-name` on the section, for inspection. */
  name: string;
  badge: string;
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaUuids: readonly [string, string, string];
  cards: readonly EnterpriseCard[];
  /** Rendered in place of the card grid, under the same heading and CTA. */
  children?: React.ReactNode;
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function EnterpriseGridSection({
  name,
  badge,
  heading,
  body,
  ctaLabel,
  ctaHref,
  ctaUuids,
  cards,
  children,
  reducedMotion,
  disabled = false,
}: EnterpriseGridSectionProps): React.ReactElement {
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
          {body ? (
            <div className="framer-1mjt4fk" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
              <p
                className="framer-text framer-styles-preset-wgkvl1"
                data-styles-preset="risoZ9TJU"
                style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
              >
                {body}
              </p>
            </div>
          ) : null}
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

      {children ?? (
      <div className="framer-1qyn8gp" data-framer-name="Grid" style={{ alignItems: "stretch" }}>
        {cards.map((card, index) => {
          const delay = COLUMN_DELAYS[index % 3];
          return (
            <div key={card.title} className="ssr-variant" style={{ display: "contents" }}>
              <AboutReveal
                enter="up75"
                delays={{ desktop: delay, tablet: index % 2 === 0 ? t1 : t2, phone: t1 }}
                className={CARD_CONTAINER_CLASSES[index % CARD_CONTAINER_CLASSES.length]}
                style={{ placeSelf: "stretch" }}
                reducedMotion={reducedMotion}
                disabled={disabled}
              >
                <CardShell href={card.href} label={card.title}>
                  <div
                    className="framer-7dwpF framer-an3Me framer-JesZO framer-1miv5pr framer-v-1miv5pr"
                    data-framer-name={name}
                    style={CARD_STYLE}
                  >
                    <div className="framer-1lb2jea" data-framer-name="Icon holder" style={ICON_HOLDER_STYLE}>
                      <EnterpriseIcon name={card.icon} />
                    </div>
                    <div className="framer-d464xi" data-framer-name="Content">
                      <div className="framer-1gfl1hr" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
                        <p className="framer-text framer-styles-preset-17m54kk" data-styles-preset="QgMyyAavm">
                          {card.title}
                        </p>
                      </div>
                      <div className="framer-197g31p" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
                        <p className="framer-text framer-styles-preset-o3oioe" data-styles-preset="BgF22VJBv">
                          {card.body}
                        </p>
                      </div>
                      {card.items?.length ? (
                        <ul style={LIST_STYLE}>
                          {card.items.map((item) => (
                            <li key={item} style={LIST_ITEM_STYLE}>
                              <span style={LIST_DOT_STYLE} aria-hidden="true" />
                              <div className="framer-197g31p" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
                                <p
                                  className="framer-text framer-styles-preset-o3oioe"
                                  data-styles-preset="BgF22VJBv"
                                  style={{ "--framer-text-color": "var(--token-d072d1f5-ef86-4b7c-bae1-6c9f6238e10b, rgb(204, 204, 204))" } as React.CSSProperties}
                                >
                                  {item}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {card.href ? (
                        <div className="framer-197g31p" data-framer-component-type="RichTextContainer" style={RICH_TEXT_STYLE}>
                          <p className="framer-text framer-styles-preset-o3oioe" data-styles-preset="BgF22VJBv" style={LEARN_MORE_STYLE}>
                            Learn more →
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardShell>
              </AboutReveal>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}

export default EnterpriseGridSection;
