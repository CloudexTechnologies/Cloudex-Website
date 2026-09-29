"use client";

/**
 * Voice agent — home page “Solutions” card.
 *
 * Solutions card 3/6 — “Voice Agents.” One nested ticker (“Waves”).
 *
 * Ported from `_source/live/home.html` section 06 "Solutions" (offsets 377438–686817) with
 * `tools/html2jsx.mjs`; image URLs rewritten through `_source/asset-map.json`.
 *
 * Framer SSRs one `.ssr-variant` copy of this card per breakpoint and hides the inactive
 * ones with the `hidden-*` rules in `app/framer/breakpoints.css` — all copies are rendered
 * here, exactly as Framer does. The copies are byte-identical apart from the entrance
 * direction (and, where noted, one padding custom property), so the shared markup lives in
 * a single `CardBody` and cannot drift between breakpoints (PLAN.md §6).
 *
 * The reveal wrapper reproduces Framer's SSR'd `will-change:transform; opacity:0;
 * transform:…`: ported as-is without `<ScrollReveal>` the card never becomes visible
 * (PLAN.md §1.5). Spring is MEASURED `{stiffness:300, damping:60, mass:1}`, threshold 0.5,
 * once — see `_source/behaviours/scroll-reveals.md`.
 */

import * as React from "react";
import type { CSSProperties } from "react";

import { Marquee, ScrollReveal } from "@/components/primitives";

/**
 * The `Marquee` primitive was written for the hero logo row, whose clipping container owns
 * no CSS of its own, so it writes `width/height/max*: 100%` (plus flex/list resets) inline.
 * Framer's BUILT-IN ticker — the one these cards use — does not: its container is sized by
 * the `framer-*` class (e.g. `.framer-672ro3{height:28px}`) and its inline style holds only
 * `overflow/display/position` (+ the mask). Left in place, the inline `height:100%` makes
 * the container grow to the card, which makes `duplicateBy` explode — MEASURED: 606 cloned
 * items and a 7689px-tall card. Setting them `undefined` drops them from the emitted style
 * and hands sizing back to the class, which is what Framer renders.
 */
const NEUTRALISE = {
  width: undefined,
  height: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  margin: undefined,
  placeItems: undefined,
  listStyleType: undefined,
  textIndent: undefined,
} satisfies React.CSSProperties;


/** The card's markup. Identical at every breakpoint. */
function CardBody() {
  return (
    <>
        <div className="framer-fetn53-container">
          <div
            className="framer-A6cYZ framer-1ik98ab framer-v-1ik98ab"
            data-framer-name="Voice agent"
            style={{ width: "100%" } as CSSProperties}
          >
            {/* Framer withTickerFX "Waves" — MEASURED row + reverse, 30 px/s, gap 6px, hoverModifier 100 */}
            <Marquee
              className="framer-585uqh"
              data-framer-name="Waves"
              direction="right"
              speed={30}
              gap={6}
              padding={0}
              hoverFactor={1}
              fadeOptions={{ fadeContent: false, overflow: false }}
              itemClassName="ticker-item"
              itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
              ariaHiddenItems={false}
              annotateItems
              style={{ ...NEUTRALISE, ...{ overflowX: "clip", display: "flex", position: "absolute", mask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.9) 25.351914414414416%, rgb(0, 0, 0) 51.054131054131055%, rgba(0, 0, 0, 0.9) 77.89273648648648%, rgba(0, 0, 0, 0) 100%) add", WebkitMask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.9) 25.351914414414416%, rgb(0, 0, 0) 51.054131054131055%, rgba(0, 0, 0, 0.9) 77.89273648648648%, rgba(0, 0, 0, 0) 100%) add" } }}
              listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
            >
              <React.Fragment key={0}>
                <div
                  className="framer-1htsnys"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={1}>
                <div
                  className="framer-1qsc1nl"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={2}>
                <div
                  className="framer-1aviwzy"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={3}>
                <div
                  className="framer-19dvvlf"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={4}>
                <div
                  className="framer-yzn3h3"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={5}>
                <div
                  className="framer-2f9y44"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={6}>
                <div
                  className="framer-ukhd9d"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
              <React.Fragment key={7}>
                <div
                  className="framer-c1gj6t"
                  data-framer-name="bar"
                  style={{
                    backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    borderBottomLeftRadius: "2px",
                    borderBottomRightRadius: "2px",
                    borderTopLeftRadius: "2px",
                    borderTopRightRadius: "2px",
                  } as CSSProperties}
                />
              </React.Fragment>
            </Marquee>
            {" "}
            <div
              className="framer-lex90w"
              data-border="true"
              data-framer-name="Icon"
              style={{
                "--border-bottom-width": "1px",
                "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backgroundColor: "var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17))",
                borderBottomLeftRadius: "66px",
                borderBottomRightRadius: "66px",
                borderTopLeftRadius: "66px",
                borderTopRightRadius: "66px",
              } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-1981o5"
                aria-hidden="true"
                style={{
                  imageRendering: "pixelated",
                  flexShrink: "0",
                } as CSSProperties}
              >
                <div
                  className="svgContainer"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "inherit",
                  } as CSSProperties}
                >
                  <svg
                    style={{
                      width: "100%",
                      height: "100%",
                    } as CSSProperties}
                  >
                    <use href="#svg-1028717113_800" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="framer-1tui3kk"
              data-framer-name="Glow"
              style={{
                filter: "blur(41px)",
                WebkitFilter: "blur(41px)",
                transform: "translate(-50%, -50%)",
              } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-ydh244"
                aria-hidden="true"
                style={{
                  imageRendering: "pixelated",
                  flexShrink: "0",
                } as CSSProperties}
              >
                <div
                  className="svgContainer"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "inherit",
                  } as CSSProperties}
                >
                  <svg
                    style={{
                      width: "100%",
                      height: "100%",
                    } as CSSProperties}
                  >
                    <use href="#svg1890931538_365" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-10cl05y" data-framer-name="Text">
          <div
            className="framer-10cu6g"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" } as CSSProperties}
          >
            <p
              className="framer-text framer-styles-preset-sbzkm0"
              data-styles-preset="E64lfTJ9Y"
              dir="auto"
            >
              <span
                style={{ "--framer-text-color": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))" } as CSSProperties}
                className="framer-text"
              >
                <strong className="framer-text">
                  Voice Agents.
                </strong>
              </span>
              {" Let AI handle calls, inquiries, and follow-ups naturally and reliably every day."}
            </p>
          </div>
        </div>
    </>
  );
}

export function VoiceAgentsCard() {
  return (
    <>
      {/* desktop */}
      <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
        <ScrollReveal
          className="framer-1fiv9h4"
          data-framer-name="Voice agent"
          enter="down40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-1fiv9h4"
          data-framer-name="Voice agent"
          enter="left40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* phone */}
      <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
        <ScrollReveal
          className="framer-1fiv9h4"
          data-framer-name="Voice agent"
          enter="up40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
    </>
  );
}

export default VoiceAgentsCard;
