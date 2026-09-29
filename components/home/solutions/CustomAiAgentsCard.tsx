"use client";

/**
 * Custom AI Agents — home page “Solutions” card.
 *
 * Solutions card 2/6 — “Custom AI Agents.” Three nested tickers (Top/Middle/Bottom) running in alternating directions.
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
        <div className="framer-eqy6nm-container">
          <div
            className="framer-RI3IH framer-BHHgS framer-k0Wn1 framer-1in2ra6 framer-v-1in2ra6"
            data-framer-name="Ai agents"
            style={{ width: "100%" } as CSSProperties}
          >
            <div
              className="framer-jeqrm"
              data-framer-name="Container"
              style={{
                mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 56.00000000000001%) add",
                WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 56.00000000000001%) add",
              } as CSSProperties}
            >
              {/* Framer withTickerFX "Top" — MEASURED row + reverse, 20 px/s, gap 10px, hoverModifier 20 */}
              <Marquee
                className="framer-91upkw"
                data-framer-name="Top"
                direction="right"
                speed={20}
                gap={10}
                padding={0}
                hoverFactor={0.2}
                fadeOptions={{ fadeContent: false, overflow: false }}
                itemClassName="ticker-item"
                itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
                ariaHiddenItems={false}
                annotateItems
                style={{ ...NEUTRALISE, ...{ overflowX: "clip", display: "flex", position: "relative", mask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", WebkitMask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" } }}
                listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
              >
                <React.Fragment key={0}>
                  <div
                    className="framer-1opm2ks"
                    data-border="true"
                    data-framer-name="Calista"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-t4pbqa">
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
                          width="350"
                          height="350"
                          src="/assets/images/esp0BsdoimoqjlYQ8eKpt5xblg.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1710g63" data-framer-name="Content">
                      <div
                        className="framer-1qg8v0o"
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
                          Calista
                        </p>
                      </div>
                      <div
                        className="framer-7imqmg"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Customer support specialist
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-a5wcpe"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={1}>
                  <div
                    className="framer-xm0tkt"
                    data-border="true"
                    data-framer-name="David"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-1qaz5mq">
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
                          width="350"
                          height="350"
                          src="/assets/images/hR33yRBq2G6LCXxTn6Y5sti0.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1ulh1j2" data-framer-name="Content">
                      <div
                        className="framer-14htqck"
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
                          David
                        </p>
                      </div>
                      <div
                        className="framer-h3yknj"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Sales manager
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-ylbh9q"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={2}>
                  <div
                    className="framer-79wqq2"
                    data-border="true"
                    data-framer-name="Kate"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-kz6hsg">
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
                          width="350"
                          height="350"
                          src="/assets/images/fTGUzVSjFory1PUj2VH6vpuGVk.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-3tpgbu" data-framer-name="Content">
                      <div
                        className="framer-1hu0yf1"
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
                          Kate
                        </p>
                      </div>
                      <div
                        className="framer-6lby5e"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Business Development
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-8esbnl"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
              </Marquee>
              {" "}
              {/* Framer withTickerFX "Middle" — MEASURED row + default, 20 px/s, gap 10px, hoverModifier 20 */}
              <Marquee
                className="framer-1jh2oet"
                data-framer-name="Middle"
                direction="left"
                speed={20}
                gap={10}
                padding={0}
                hoverFactor={0.2}
                fadeOptions={{ fadeContent: false, overflow: false }}
                itemClassName="ticker-item"
                itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
                ariaHiddenItems={false}
                annotateItems
                style={{ ...NEUTRALISE, ...{ overflowX: "clip", display: "flex", position: "relative", mask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", WebkitMask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" } }}
                listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
              >
                <React.Fragment key={0}>
                  <div
                    className="framer-1in7ela"
                    data-border="true"
                    data-framer-name="Chris"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-1rkn70i">
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
                          width="350"
                          height="350"
                          src="/assets/images/LwS0YQv9rhm2hpKAGbBX8XNo4.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-10801bd" data-framer-name="Content">
                      <div
                        className="framer-tfy46m"
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
                          Chris
                        </p>
                      </div>
                      <div
                        className="framer-1rzdlpb"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Social Media Manager
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-1cwurnw"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={1}>
                  <div
                    className="framer-1u97qgg"
                    data-border="true"
                    data-framer-name="Sophie"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-1uwjwe0">
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
                          width="391"
                          height="442"
                          src="/assets/images/lYReV53ztcWrvGJnwRkhXuzhOMI.efdb8358.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1fzma76" data-framer-name="Content">
                      <div
                        className="framer-1xs66k8"
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
                          Sophie
                        </p>
                      </div>
                      <div
                        className="framer-1o0bel"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Designer
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-1ijuh1c"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={2}>
                  <div
                    className="framer-oiqr51"
                    data-border="true"
                    data-framer-name="Badger"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-u6gahc">
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
                          width="350"
                          height="350"
                          src="/assets/images/Z7hsMakrTcUEE9ZP7Exj3YYlSgo.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-czm7ha" data-framer-name="Content">
                      <div
                        className="framer-j5mgpy"
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
                          Badger
                        </p>
                      </div>
                      <div
                        className="framer-5wr3g9"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          SEO specialist
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-1f8ayd5"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
              </Marquee>
              {" "}
              {/* Framer withTickerFX "Bottom" — MEASURED row + reverse, 20 px/s, gap 10px, hoverModifier 20 */}
              <Marquee
                className="framer-1p8g39q"
                data-framer-name="Bottom"
                direction="right"
                speed={20}
                gap={10}
                padding={0}
                hoverFactor={0.2}
                fadeOptions={{ fadeContent: false, overflow: false }}
                itemClassName="ticker-item"
                itemStyle={{ flexGrow: "0", flexShrink: "0", position: "relative", height: "fit-content", width: "fit-content", transform: "none" }}
                ariaHiddenItems={false}
                annotateItems
                style={{ ...NEUTRALISE, ...{ overflowX: "clip", display: "flex", position: "relative", mask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", WebkitMask: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 27.734375%, rgb(0, 0, 0) 77%, rgba(0, 0, 0, 0) 100%) add", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" } }}
                listStyle={{ display: "flex", position: "relative", listStyleType: "none", padding: "0", margin: "0", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "100%", maxHeight: "100%", maxWidth: "100%" }}
              >
                <React.Fragment key={0}>
                  <div
                    className="framer-8hoskp"
                    data-border="true"
                    data-framer-name="Emma"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-1lutnvi">
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
                          width="350"
                          height="350"
                          src="/assets/images/LwS0YQv9rhm2hpKAGbBX8XNo4.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-ow6k00" data-framer-name="Content">
                      <div
                        className="framer-1qg9lwi"
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
                          Emma
                        </p>
                      </div>
                      <div
                        className="framer-1g6okjs"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Recruiter
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-12i76kn"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={1}>
                  <div
                    className="framer-135lpaq"
                    data-border="true"
                    data-framer-name="Jhonny"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-xhyeja">
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
                          width="350"
                          height="350"
                          src="/assets/images/fpODKahXpVBEE5lsDa05QgFhBp4.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1v6k853" data-framer-name="Content">
                      <div
                        className="framer-19f54zj"
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
                          Jhonny
                        </p>
                      </div>
                      <div
                        className="framer-1oye17z"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          {"Data Analyst "}
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-rxl3xo"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
                <React.Fragment key={2}>
                  <div
                    className="framer-gh9nzk"
                    data-border="true"
                    data-framer-name="Julie"
                    style={{
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                      "--border-left-width": "1px",
                      "--border-right-width": "1px",
                      "--border-style": "solid",
                      "--border-top-width": "1px",
                      background: "linear-gradient(103deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(171, 171, 171, 0) 100%)",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    } as CSSProperties}
                  >
                    <div className="framer-pb13oo">
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
                          width="350"
                          height="350"
                          src="/assets/images/fpODKahXpVBEE5lsDa05QgFhBp4.bc82b39d.png"
                          alt="Bitmoji"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            cornerShape: "inherit",
                            objectPosition: "center",
                            objectFit: "contain",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-cq62r9" data-framer-name="Content">
                      <div
                        className="framer-4igsec"
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
                          Julie
                        </p>
                      </div>
                      <div
                        className="framer-59ed0x"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                        >
                          Copywriter
                        </p>
                      </div>
                    </div>
                    <div
                      className="framer-1uldsuu"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </React.Fragment>
              </Marquee>
              {" "}
            </div>
            <div
              className="framer-16twx8o"
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
                className="framer-eeaxy2"
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
        <div className="framer-lxbvac" data-framer-name="Text">
          <div
            className="framer-l1vx71"
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
                  {"Digital FTEs. "}
                </strong>
              </span>
              AI employees for sales, support and content roles, working alongside your team.
            </p>
          </div>
        </div>
    </>
  );
}

export function CustomAiAgentsCard() {
  return (
    <>
      {/* desktop */}
      <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
        <ScrollReveal
          className="framer-1n74cbk"
          data-framer-name="Custom AI Agents"
          enter="bottomLeft"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-1n74cbk"
          data-framer-name="Custom AI Agents"
          enter="right40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
      {/* phone */}
      <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
        <ScrollReveal
          className="framer-1n74cbk"
          data-framer-name="Custom AI Agents"
          enter="up40"
        >
          <CardBody />
        </ScrollReveal>
      </div>
    </>
  );
}

export default CustomAiAgentsCard;
