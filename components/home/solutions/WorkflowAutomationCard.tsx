"use client";

/**
 * Workflow automation — home page “Solutions” card.
 *
 * Solutions card 1/6 — “Workflow Automation.” Two nested Framer tickers (“Animated lines”).
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

/** MEASURED per-breakpoint padding custom property `--1b85efz`. */
const PAD_0 = "35px 30px 32px 30px";
const PAD_1 = "10px 10px 20px 10px";

/** The card's markup. Identical at every breakpoint except `--1b85efz`. */
function CardBody({ pad }: { pad: string }) {
  return (
    <>
        <div className="framer-1xxck9k" data-framer-name="Text">
          <div
            className="framer-xywslu"
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
                  Workflow Automation.
                </strong>
              </span>
              {" Automate repetitive tasks and efficiently streamline your daily operations."}
            </p>
          </div>
        </div>
        <div className="framer-53vhcw-container">
          <div
            className="framer-GPU42 framer-TPaq9 framer-15ccnd3 framer-v-15ccnd3"
            data-framer-name="workflow automation"
            style={{
              "--1b85efz": pad,
              width: "100%",
            } as CSSProperties}
          >
            <div
              className="framer-1etcbjj"
              data-framer-name="Border"
              style={{
                background: "linear-gradient(180deg, var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3)) 0%, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 21.83277027027027%, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 49.48620495495496%, rgba(0, 200, 240, 0) 100%)",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              } as CSSProperties}
            >
              <div
                className="framer-diuicv"
                data-framer-name="Container"
                style={{
                  backgroundColor: "var(--token-462bfd45-cc6a-406c-b043-2bf80d378d7c, rgba(18, 18, 18, 0.7))",
                  mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 67%) add",
                  WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 67%) add",
                  borderBottomLeftRadius: "11px",
                  borderBottomRightRadius: "11px",
                  borderTopLeftRadius: "11px",
                  borderTopRightRadius: "11px",
                } as CSSProperties}
              >
                <div
                  className="framer-1rnrqq2"
                  data-border="true"
                  data-framer-name="1st step"
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  } as CSSProperties}
                >
                  <div className="framer-1d3quoa" data-framer-name="Content">
                    <div
                      className="framer-7gcw9w"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))",
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      } as CSSProperties}
                    >
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-b85b9h"
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
                            <use href="#svg-145902458_1249" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="framer-a9a9sh" data-framer-name="Text">
                      <div
                        className="framer-nqzmn2"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-141u1yr"
                          data-styles-preset="pAzayDUZg"
                        >
                          Count hours work
                        </p>
                      </div>
                      <div
                        className="framer-1czt92y"
                        data-framer-name="Line"
                        style={{
                          backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                          borderBottomLeftRadius: "1px",
                          borderBottomRightRadius: "1px",
                          borderTopLeftRadius: "1px",
                          borderTopRightRadius: "1px",
                        } as CSSProperties}
                      />
                    </div>
                  </div>
                  <div className="framer-12mtf40" data-framer-name="Status icon">
                    <div
                      data-framer-component-type="SVG"
                      {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                      className="framer-10g6azl"
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
                          <use href="#svg-999184187_681" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Framer withTickerFX "Animated lines" — MEASURED column + reverse, 15 px/s, gap 2px, hoverModifier 100 */}
                <Marquee
                  className="framer-672ro3"
                  data-framer-name="Animated lines"
                  direction="down"
                  speed={15}
                  gap={2}
                  padding={0}
                  hoverFactor={1}
                  fadeOptions={{ fadeContent: false, overflow: false }}
                  itemClassName="ticker-item"
                  itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
                  ariaHiddenItems={false}
                  annotateItems
                  style={{ ...NEUTRALISE, ...{ overflowY: "clip", display: "flex", position: "relative" } }}
                  listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
                >
                  <React.Fragment key={0}>
                    <div
                      className="framer-s7atao"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={1}>
                    <div
                      className="framer-pu5ebl"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={2}>
                    <div
                      className="framer-fddy5u"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={3}>
                    <div
                      className="framer-1i9zrjw"
                      data-framer-name="bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={4}>
                    <div
                      className="framer-1lzm4gu"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={5}>
                    <div
                      className="framer-5n96ug"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                </Marquee>
                {" "}
                <div
                  className="framer-1fwhz9a"
                  data-border="true"
                  data-framer-name="2nd step"
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  } as CSSProperties}
                >
                  <div className="framer-14ob5wa" data-framer-name="Content">
                    <div
                      className="framer-zw4sj0"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))",
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      } as CSSProperties}
                    >
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-1hgwmca"
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
                            <use href="#svg-1510731266_1096" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="framer-zc8t4o" data-framer-name="Text">
                      <div
                        className="framer-1d0i24e"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-141u1yr"
                          data-styles-preset="pAzayDUZg"
                        >
                          Add to CRM
                        </p>
                      </div>
                      <div
                        className="framer-1osmdvq"
                        data-framer-name="Line"
                        style={{
                          backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                          borderBottomLeftRadius: "1px",
                          borderBottomRightRadius: "1px",
                          borderTopLeftRadius: "1px",
                          borderTopRightRadius: "1px",
                        } as CSSProperties}
                      />
                    </div>
                  </div>
                  <div
                    className="framer-f9bwoz"
                    data-framer-name="Status icon"
                    style={{
                      opacity: "0.6400000000000001",
                      transform: "none",
                    } as CSSProperties}
                  >
                    <div
                      data-framer-component-type="SVG"
                      {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                      className="framer-25mcig"
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
                          <use href="#svg2091700416_826" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Framer withTickerFX "Animated lines" — MEASURED column + reverse, 15 px/s, gap 2px, hoverModifier 100 */}
                <Marquee
                  className="framer-1slk3hw"
                  data-framer-name="Animated lines"
                  direction="down"
                  speed={15}
                  gap={2}
                  padding={0}
                  hoverFactor={1}
                  fadeOptions={{ fadeContent: false, overflow: false }}
                  itemClassName="ticker-item"
                  itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
                  ariaHiddenItems={false}
                  annotateItems
                  style={{ ...NEUTRALISE, ...{ overflowY: "clip", display: "flex", position: "relative" } }}
                  listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
                >
                  <React.Fragment key={0}>
                    <div
                      className="framer-130d2ib"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={1}>
                    <div
                      className="framer-10gwt4d"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={2}>
                    <div
                      className="framer-1qlguso"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={3}>
                    <div
                      className="framer-aqmjam"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={4}>
                    <div
                      className="framer-abbmkm"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                  <React.Fragment key={5}>
                    <div
                      className="framer-bv8z4f"
                      data-framer-name="Bar"
                      style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                    />
                  </React.Fragment>
                </Marquee>
                {" "}
                <div
                  className="framer-1da0y3d"
                  data-border="true"
                  data-framer-name="3rd step"
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  } as CSSProperties}
                >
                  <div className="framer-r6hrls" data-framer-name="Content">
                    <div
                      className="framer-15mzsrx"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))",
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                      } as CSSProperties}
                    >
                      <svg
                        className="framer-lZ1WP framer-1k3t87l"
                        role="presentation"
                        viewBox="0 0 24 24"
                        style={{
                          "--1m6trwb": "0",
                          "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                          "--pgex8v": "1.5",
                        } as CSSProperties}
                      >
                        <use href="#2922751717" />
                      </svg>
                    </div>
                    <div className="framer-1nceft" data-framer-name="Text">
                      <div
                        className="framer-b10xu0"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-141u1yr"
                          data-styles-preset="pAzayDUZg"
                        >
                          Send invoice
                        </p>
                      </div>
                      <div
                        className="framer-1499ldj"
                        data-framer-name="Line"
                        style={{
                          backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                          borderBottomLeftRadius: "1px",
                          borderBottomRightRadius: "1px",
                          borderTopLeftRadius: "1px",
                          borderTopRightRadius: "1px",
                        } as CSSProperties}
                      />
                    </div>
                  </div>
                  <div className="framer-17v5rz4" data-framer-name="Status icon">
                    <div
                      data-framer-component-type="SVG"
                      {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                      className="framer-21f9ck"
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
                          <use href="#svg1811482918_771" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="framer-1yok6v2"
              data-framer-name="Glow"
              style={{
                filter: "blur(41px)",
                WebkitFilter: "blur(41px)",
                transform: "translateX(-50%)",
              } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-13yga3u"
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
                    <use href="#svg624784995_369" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export function WorkflowAutomationCard() {
  return (
    <>
      {/* desktop */}
      <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
        <ScrollReveal
          className="framer-s9o64s"
          data-framer-name="Workflow automation"
          enter="topLeft"
        >
          <CardBody pad={PAD_0} />
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-s9o64s"
          data-framer-name="Workflow automation"
          enter="left40"
        >
          <CardBody pad={PAD_0} />
        </ScrollReveal>
      </div>
      {/* phone */}
      <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
        <ScrollReveal
          className="framer-s9o64s"
          data-framer-name="Workflow automation"
          enter="up40"
        >
          <CardBody pad={PAD_1} />
        </ScrollReveal>
      </div>
    </>
  );
}

export default WorkflowAutomationCard;
