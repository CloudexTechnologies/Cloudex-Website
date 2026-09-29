"use client";

/**
 * AI data analysis — home page “Solutions” card.
 *
 * Solutions card 5/6 — “AI Data Analysis.” One nested ticker (“List of expenses”).
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

/**
 * `.framer-u7fyx5` ("List of expenses") is the one ticker whose clipping box is
 * `height: min-content` on the SCROLL axis, so its own height is its content's height.
 * Framer's built-in ticker breaks that feedback loop by measuring
 * `visibleLength = Math.min(container[lengthProp], window.innerHeight)` — MEASURED, see the
 * `le()` measure callback in the `framer` runtime bundle. `Marquee` has no such clamp and
 * measures `offsetHeight` raw, so more clones make the box taller which asks for more
 * clones: MEASURED runaway to `MAX_DUPLICATED_ITEMS` (707 `<li>`, a 928s loop). This
 * reproduces Framer's clamp in CSS. The box is clipped to ~300px by
 * `.framer-1y31a2t{height:1px;flex:1 0 0;overflow:clip}` either way, so nothing visible
 * changes; only the number of clones does.
 */
const CLAMP_VIEWPORT = { maxHeight: "100vh" } satisfies React.CSSProperties;

/** MEASURED per-breakpoint padding custom property `--1hsfz6b`. */
const PAD_0 = "15px 5px 0px 35px";
const PAD_1 = "10px 5px 0px 15px";

/** The card's markup. Identical at every breakpoint except `--1hsfz6b`. */
function CardBody({ pad }: { pad: string }) {
  return (
    <>
        <div className="framer-ioyckj-container">
          <div
            className="framer-Noa6C framer-jM1yb framer-lJNWY framer-BHHgS framer-k0Wn1 framer-13dmhk3 framer-v-13dmhk3"
            data-framer-name="Data analystic"
            style={{
              "--1hsfz6b": pad,
              width: "100%",
            } as CSSProperties}
          >
            <div
              className="framer-cl3lq4"
              data-framer-name="Glow"
              style={{
                filter: "blur(41px)",
                WebkitFilter: "blur(41px)",
                transform: "rotate(48deg)",
              } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-npaw2t"
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
                    <use href="#svg1061246238_352" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="framer-c2nu3a"
              data-framer-name="Border"
              style={{
                background: "linear-gradient(138deg, var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3)) 0%, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 21.83277027027027%, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 49.48620495495496%, rgba(0, 200, 240, 0) 100%)",
                mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect, linear-gradient(270deg, rgba(0,0,0,0) 0.8516328828828829%, rgba(0,0,0,1) 48%) add",
                WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect, linear-gradient(270deg, rgba(0,0,0,0) 0.8516328828828829%, rgba(0,0,0,1) 48%) add",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              } as CSSProperties}
            >
              <div
                className="framer-1y31a2t"
                data-framer-name="Container"
                style={{
                  backgroundColor: "var(--token-462bfd45-cc6a-406c-b043-2bf80d378d7c, rgba(18, 18, 18, 0.7))",
                  borderBottomLeftRadius: "11px",
                  borderBottomRightRadius: "11px",
                  borderTopLeftRadius: "11px",
                  borderTopRightRadius: "11px",
                } as CSSProperties}
              >
                <div className="framer-183dopo" data-framer-name="Top">
                  <div className="framer-8yo7n3" data-framer-name="Text">
                    <div className="framer-1y8d9j1" data-framer-name="Expense">
                      <div
                        className="framer-1h8vjjs"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-huzir6"
                          data-styles-preset="B3DXZg5aI"
                          dir="auto"
                        >
                          EXPENSE
                        </p>
                      </div>
                      <div
                        className="framer-ovevab"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-529u5a"
                          data-styles-preset="kOiotlVqs"
                        >
                          $320,000
                        </p>
                      </div>
                    </div>
                    <div className="framer-5r7u1c" data-framer-name="Remaining">
                      <div className="framer-1a28fwb" data-framer-name="Paid">
                        <div
                          className="framer-53f0hv"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-huzir6"
                            data-styles-preset="B3DXZg5aI"
                          >
                            PAID
                          </p>
                        </div>
                        <div
                          className="framer-110vtkr"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-1l55uzh"
                            data-styles-preset="nNXkfmGpR"
                          >
                            $120,000
                          </p>
                        </div>
                      </div>
                      <div className="framer-1rnxyp2" data-framer-name="Due">
                        <div
                          className="framer-1stsvqj"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-huzir6"
                            data-styles-preset="B3DXZg5aI"
                          >
                            DUE
                          </p>
                        </div>
                        <div
                          className="framer-1ejylvq"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-1l55uzh"
                            data-styles-preset="nNXkfmGpR"
                          >
                            $200,000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="framer-18ftqzk"
                    data-framer-name="Line"
                    style={{ backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))" } as CSSProperties}
                  />
                </div>
                <div
                  className="framer-1i6ddm8"
                  data-framer-name="Graph"
                  style={{
                    backgroundColor: "var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03))",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  } as CSSProperties}
                >
                  <div
                    data-framer-component-type="SVG"
                    {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                    className="framer-1oyivg4"
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
                        <use href="#svg-642365558_864" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Framer withTickerFX "List of expenses" — MEASURED column + default, 20 px/s, gap 10px, hoverModifier 50 */}
                <Marquee
                  className="framer-u7fyx5"
                  data-framer-name="List of expenses"
                  direction="up"
                  speed={20}
                  gap={10}
                  padding={0}
                  hoverFactor={0.5}
                  fadeOptions={{ fadeContent: false, overflow: false }}
                  itemClassName="ticker-item"
                  itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "100%", transform: "none" }}
                  ariaHiddenItems={false}
                  annotateItems
                  style={{ ...NEUTRALISE, ...CLAMP_VIEWPORT, ...{ overflowY: "clip", display: "flex", position: "relative" } }}
                  listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
                >
                  <React.Fragment key={0}>
                    <div className="framer-jeycrx" data-framer-name="Payroll">
                      <div
                        className="framer-1gq9b2r"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-lZ1WP framer-100kjwu"
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
                        <div
                          className="framer-1dirvp1"
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
                            Payroll
                          </p>
                        </div>
                      </div>
                      <div className="framer-sgfi8t" data-framer-name="Digit and bar">
                        <div
                          className="framer-1oykmff"
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
                            $2539
                          </p>
                        </div>
                        <div
                          className="framer-xruh1z"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-1ucz2t0"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={1}>
                    <div className="framer-lkh1tc" data-framer-name="Tools">
                      <div
                        className="framer-lluxez"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-GrUq6 framer-5trwmh"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#2570385411" />
                        </svg>
                        <div
                          className="framer-1e28xfs"
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
                            Tools
                          </p>
                        </div>
                      </div>
                      <div className="framer-7oo9xd" data-framer-name="Digit and bar">
                        <div
                          className="framer-ypqwdr"
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
                                            320
                          </p>
                        </div>
                        <div
                          className="framer-o6y1wz"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-u95pfz"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={2}>
                    <div className="framer-nff89z" data-framer-name="marketing">
                      <div
                        className="framer-1661wir"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-vt0n7 framer-15n6rgi"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#3532162511" />
                        </svg>
                        <div
                          className="framer-1k56s0e"
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
                            Marketing
                          </p>
                        </div>
                      </div>
                      <div className="framer-1qx8ge7" data-framer-name="Digit and bar">
                        <div
                          className="framer-1dx89am"
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
                            $2450
                          </p>
                        </div>
                        <div
                          className="framer-1a99fkw"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-rdpwau"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={3}>
                    <div className="framer-wlrh16" data-framer-name="Supplies">
                      <div
                        className="framer-1slx2hz"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-UDnHN framer-71d5rb"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#2989639286" />
                        </svg>
                        <div
                          className="framer-sbv96"
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
                            Supplies
                          </p>
                        </div>
                      </div>
                      <div className="framer-k54tq" data-framer-name="Digit and bar">
                        <div
                          className="framer-15k67f9"
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
                                            110
                          </p>
                        </div>
                        <div
                          className="framer-1yh24a7"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-fl78yq"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={4}>
                    <div className="framer-detv9b" data-framer-name="Freelance">
                      <div
                        className="framer-evr4zg"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-AMkT2 framer-1749z2p"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#1334697013" />
                        </svg>
                        <div
                          className="framer-101r2i8"
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
                            Freelance
                          </p>
                        </div>
                      </div>
                      <div className="framer-4kx3sc" data-framer-name="Digit and bar">
                        <div
                          className="framer-1rs24mv"
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
                            $3750
                          </p>
                        </div>
                        <div
                          className="framer-1oynauj"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-drecik"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={5}>
                    <div className="framer-1inr3ez" data-framer-name="Training">
                      <div
                        className="framer-xzaen1"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-nB99n framer-gjevtl"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#2191839237" />
                        </svg>
                        <div
                          className="framer-1e4te7u"
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
                            Training
                          </p>
                        </div>
                      </div>
                      <div className="framer-1b5wdhg" data-framer-name="Digit and bar">
                        <div
                          className="framer-1v4ek9v"
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
                                            680
                          </p>
                        </div>
                        <div
                          className="framer-1ypdrkn"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-1jf9rev"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                  <React.Fragment key={6}>
                    <div className="framer-1gz6jjw" data-framer-name="Support">
                      <div
                        className="framer-17nqkw9"
                        data-border="true"
                        data-framer-name="Icon and name"
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
                        <svg
                          className="framer-g7Gzw framer-m49w0r"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0",
                            "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#469908671" />
                        </svg>
                        <div
                          className="framer-1aacnx6"
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
                            Support
                          </p>
                        </div>
                      </div>
                      <div className="framer-5c3laq" data-framer-name="Digit and bar">
                        <div
                          className="framer-as77p7"
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
                            $2190
                          </p>
                        </div>
                        <div
                          className="framer-l11qvq"
                          data-framer-name="Bar"
                          style={{ backgroundColor: "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))" } as CSSProperties}
                        >
                          <div
                            className="framer-15pivld"
                            data-framer-name="Fill"
                            style={{ backgroundColor: "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))" } as CSSProperties}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                </Marquee>
                {" "}
              </div>
            </div>
          </div>
        </div>
        <div className="framer-vb0ly6" data-framer-name="Text">
          <div
            className="framer-och7xv"
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
                  AI Data Analysis.
                </strong>
              </span>
              {" Turn complex data into clear, simple & easy practical insights you can easily act on."}
            </p>
          </div>
        </div>
    </>
  );
}

export function AiDataAnalysisCard() {
  return (
    <>
      {/* desktop */}
      <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
        <ScrollReveal
          className="framer-2opbu3"
          data-framer-name="AI data analysis"
          enter="topRight"
        >
          <CardBody pad={PAD_0} />
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-2opbu3"
          data-framer-name="AI data analysis"
          enter="left40"
        >
          <CardBody pad={PAD_0} />
        </ScrollReveal>
      </div>
      {/* phone */}
      <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
        <ScrollReveal
          className="framer-2opbu3"
          data-framer-name="AI data analysis"
          enter="up40"
        >
          <CardBody pad={PAD_1} />
        </ScrollReveal>
      </div>
    </>
  );
}

export default AiDataAnalysisCard;
