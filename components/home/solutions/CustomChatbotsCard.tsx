"use client";

/**
 * Custom chatbots — home page “Solutions” card.
 *
 * Solutions card 6/6 — “Custom Chatbots.” One nested ticker (“Background chat”).
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
        <div className="framer-s3idxx-container">
          <div
            className="framer-tywMe framer-k0Wn1 framer-TPaq9 framer-1dtl99v framer-v-1dtl99v"
            data-framer-name="Chatbot"
            style={{ width: "100%" } as CSSProperties}
          >
            {/* Framer withTickerFX "Background chat" — MEASURED column + default, 30 px/s, gap 10px, hoverModifier 100 */}
            <Marquee
              className="framer-m8mbv7"
              data-framer-name="Background chat"
              direction="up"
              speed={30}
              gap={10}
              padding={0}
              hoverFactor={1}
              fadeOptions={{ fadeContent: false, overflow: false }}
              itemClassName="ticker-item"
              itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "100%", transform: "none" }}
              ariaHiddenItems={false}
              annotateItems
              style={{ ...NEUTRALISE, ...{ overflowY: "clip", display: "flex", position: "absolute", mask: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%) add", WebkitMask: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%) add", opacity: "0.75" } }}
              listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
            >
              <React.Fragment key={0}>
                <div className="framer-1rt13u5" data-framer-name="Conversation">
                  <div className="framer-d6gyfx" data-framer-name="Customer">
                    <div
                      className="framer-e3g7xa"
                      data-border="true"
                      data-framer-name="Chat lines container"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03))",
                        borderBottomLeftRadius: "6px",
                        borderBottomRightRadius: "6px",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                      } as CSSProperties}
                    >
                      <div className="framer-xp7gfc" data-framer-name="Lines">
                        <div
                          className="framer-vmvvux"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                          >
                            Customer
                          </p>
                        </div>
                        <div className="framer-c4z13q" data-framer-name="1st line">
                          <div
                            className="framer-11iu4te"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-1pcp4up"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-1bnfh0o"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-1v25uv3" data-framer-name="2nd line">
                          <div
                            className="framer-wefldq"
                            data-framer-name="Line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-gr78t9"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-10t47j9">
                          <div
                            className="framer-azojdx"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-y8kca0"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-arvsw9"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-100mxnn">
                          <div
                            className="framer-1b99sqc"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-1mnr9zg"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="framer-ujqokg"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        borderBottomLeftRadius: "57px",
                        borderBottomRightRadius: "57px",
                        borderTopLeftRadius: "57px",
                        borderTopRightRadius: "57px",
                      } as CSSProperties}
                    >
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-110a414"
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
                            <use href="#svg-1602672271_396" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framer-vckdla" data-framer-name="Calista">
                    <div
                      className="framer-3ikn9h"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        borderBottomLeftRadius: "57px",
                        borderBottomRightRadius: "57px",
                        borderTopLeftRadius: "57px",
                        borderTopRightRadius: "57px",
                      } as CSSProperties}
                    >
                      <div
                        style={{
                          position: "absolute",
                          borderRadius: "inherit",
                          cornerShape: "inherit",
                          top: "0",
                          right: "0",
                          bottom: "0",
                          left: "0",
                        } as CSSProperties}
                        data-framer-background-image-wrapper="true"
                      >
                        <img
                          decoding="async"
                          loading="lazy"
                          width="512"
                          height="512"
                          src="/assets/images/BV1GIO9DspBGeFhSmqgjByjOps.0162c903.png"
                          alt=""
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "cover",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div
                      className="framer-aggcg1"
                      data-border="true"
                      data-framer-name="Conversation"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03))",
                        borderBottomLeftRadius: "6px",
                        borderBottomRightRadius: "6px",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                      } as CSSProperties}
                    >
                      <div className="framer-1jrcw85" data-framer-name="Lines">
                        <div
                          className="framer-1e69osr"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                          >
                            Calista
                          </p>
                        </div>
                        <div className="framer-uqzx9q" data-framer-name="1st line">
                          <div
                            className="framer-a3q8n2"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-vhw5ja"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-5lxyx1"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-kv66it" data-framer-name="2nd line">
                          <div
                            className="framer-1teg9fh"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-on9hst" data-framer-name="3rd line">
                          <div
                            className="framer-1f3dj5q"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-1vr2755"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-cfy4fk"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-gfymxx" data-framer-name="4th line">
                          <div
                            className="framer-vcwk69"
                            data-framer-name="line"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framer-ejnier" data-framer-name="Customer">
                    <div
                      className="framer-yd62pv"
                      data-border="true"
                      data-framer-name="Chat lines container"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03))",
                        borderBottomLeftRadius: "6px",
                        borderBottomRightRadius: "6px",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                      } as CSSProperties}
                    >
                      <div className="framer-63dhog" data-framer-name="Lines">
                        <div
                          className="framer-w1iylr"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                          >
                            Customer
                          </p>
                        </div>
                        <div className="framer-eu21q6" data-framer-name="1st line">
                          <div
                            className="framer-4fdv2m"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-155omf7"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-1rgyf4j"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-70gp3m">
                          <div
                            className="framer-19ar8kd"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-10xpvza"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-1ufm7es">
                          <div
                            className="framer-1ejfnp9"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-jmi7jf"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-h52mw"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                        <div className="framer-1keipgp">
                          <div
                            className="framer-vp5jbm"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                          <div
                            className="framer-s5ml7y"
                            style={{
                              backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              borderBottomLeftRadius: "2px",
                              borderBottomRightRadius: "2px",
                              borderTopLeftRadius: "2px",
                              borderTopRightRadius: "2px",
                            } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="framer-z5s2cc"
                      data-border="true"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        borderBottomLeftRadius: "57px",
                        borderBottomRightRadius: "57px",
                        borderTopLeftRadius: "57px",
                        borderTopRightRadius: "57px",
                      } as CSSProperties}
                    >
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-nnuoj5"
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
                            <use href="#svg-1602672271_396" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </Marquee>
            {" "}
            <div
              className="framer-1uahf48"
              data-border="true"
              data-framer-name="Chatbox"
              style={{
                "--border-bottom-width": "1px",
                "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backdropFilter: "blur(5px)",
                backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                WebkitBackdropFilter: "blur(5px)",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
              } as CSSProperties}
            >
              <div className="framer-4hxgvx" data-framer-name="Text">
                <div
                  className="framer-10lfmpw"
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
                    Custom chat bots
                  </p>
                </div>
              </div>
              <div
                className="framer-dltpb3"
                data-border="true"
                data-framer-name="Icon holder"
                style={{
                  "--border-bottom-width": "1px",
                  "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                  "--border-left-width": "1px",
                  "--border-right-width": "1px",
                  "--border-style": "solid",
                  "--border-top-width": "1px",
                  backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                  borderBottomLeftRadius: "2px",
                  borderBottomRightRadius: "2px",
                  borderTopLeftRadius: "2px",
                  borderTopRightRadius: "2px",
                } as CSSProperties}
              >
                <div className="framer-fjoibo-container">
                  <div style={{ display: "contents" } as CSSProperties} />
                </div>
              </div>
            </div>
            <div
              className="framer-1gfomim"
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
                className="framer-1gwz2lr"
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
        <div className="framer-139j3kd" data-framer-name="Text">
          <div
            className="framer-1fzentx"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" } as CSSProperties}
          >
            <p
              className="framer-text framer-styles-preset-sbzkm0"
              data-styles-preset="E64lfTJ9Y"
            >
              <span
                style={{ "--framer-text-color": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))" } as CSSProperties}
                className="framer-text"
              >
                <strong className="framer-text">
                  {"Custom Chatbots. "}
                </strong>
              </span>
              Provide instant, accurate responses to customers anytime with intelligent AI.
            </p>
          </div>
        </div>
    </>
  );
}

export function CustomChatbotsCard() {
  return (
    <>
      {/* desktop */}
      <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
        <ScrollReveal
          className="framer-1g1yo9v"
          data-framer-name="Custom chatbots"
          enter="bottomRight"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-1g1yo9v"
          data-framer-name="Custom chatbots"
          enter="right40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* phone */}
      <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
        <ScrollReveal
          className="framer-1g1yo9v"
          data-framer-name="Custom chatbots"
          enter="up40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
    </>
  );
}

export default CustomChatbotsCard;
