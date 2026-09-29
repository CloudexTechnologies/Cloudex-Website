/**
 * ProcessSection — home page section 05 "Process" (`_source/structure/home.md` line 113).
 *
 * Markup source: `_source/live/home.html` bytes 316719–377438 (60,719 bytes,
 * `<section class="framer-1ltw54r" data-framer-name="Process">`), converted with
 * `node tools/html2jsx.mjs --asset-map _source/asset-map.json` and cross-checked against
 * all three post-hydration DOMs (`_source/rendered/home.{desktop,tablet,phone}.html`).
 *
 * Copy: the three steps were rewritten as the 10-80-10 rule (First 10% / Middle 80% /
 * Final 10%: your team sets direction, Digital FTEs do the work, your team approves).
 * The card visuals and the step names below are the Framer originals.
 *
 * The section renders three step cards side by side:
 *   Step 1. Analyzing workflow  — `.framer-GtpxM`  (`…/yC4ecTPpV.js`)
 *   Step 2. Integrating Solutions — `.framer-uR7R1` (`…/BiHYAFIZy.js`)
 *   Step 3. Regular Maintenance — `.framer-h9A3Y`  (`…/xNwcc4rjs.js`)
 * each wrapped in its `Notch` (the `Step N.` label + two `Rounded Edge`/`Vector` cut-out
 * corners) and a `Content` caption block.
 *
 * ── Server Component ──────────────────────────────────────────────────────────────────
 * No links, no buttons, no form controls, no `data-framer-appear-id`, and no hover state
 * anywhere in the subtree: every component instance SSRs with its base class and its only
 * variant class (`framer-1rwepof/framer-v-1rwepof`, `framer-1p313hh/framer-v-1p313hh`,
 * `framer-1zpq5g/framer-v-1zpq5g`, `framer-1ke4dig/framer-v-1ke4dig`,
 * `framer-1da45io/framer-v-1da45io`) and `app/framer/*.css` has no `:hover` rule for any
 * class here. home.md's `hover-variant` marker is a false positive off the two
 * `data-highlight="true"` attributes. This file therefore carries NO `"use client"`; the
 * only client code it mounts is `ScrollReveal` and `./ProcessMotion`.
 *
 * ── Breakpoint variants — ONE DOM copy ────────────────────────────────────────────────
 * home.md: "none — single DOM copy serves all 3 breakpoints (CSS-only responsive)".
 * Verified against the slice: 0 × `hidden-72rtr7`, 0 × `hidden-1lsm0lh`, 0 × `hidden-19fjg0f`,
 * and the four `ssr-variant` wrappers all carry the bare `class="ssr-variant"` with exactly
 * one child each. `.ssr-variant { display: contents }` (app/framer/layout.css), so they are
 * layout-transparent; they are kept because the post-hydration DOMs keep them too.
 * Duplicating this section per breakpoint would be the deviation, so `lib/breakpoints.ts`
 * is deliberately not used here.
 *
 * ── Scroll reveals (MEASURED — `_source/behaviours/scroll-reveals.md`) ────────────────
 * PLAN.md §1.5: four nodes SSR with `will-change:transform; opacity:0; transform:translateY(…)`
 * and no appear id. Ported literally they stay invisible forever, so each is a `ScrollReveal`:
 *
 *   | node              | data-framer-name | SSR transform      | enter  | transition  |
 *   |-------------------|------------------|--------------------|--------|-------------|
 *   | `.framer-y20zjc`  | Heading          | `translateY(30px)` | `up30` | `t2` (0s)   |
 *   | `.framer-nixrx0`  | Analyzing        | `translateY(75px)` | `up75` | `t2` (0s)   |
 *   | `.framer-m44wd7`  | Integrations     | `translateY(75px)` | `up75` | `t3` (0.2s) |
 *   | `.framer-j0vkif`  | Maintenance      | `translateY(75px)` | `up75` | `t4` (0.4s) |
 *
 * That is the 0 / 0.2 / 0.4 ladder `integrations.md` describes ("the three cards rise in
 * sequence, 200ms apart, each travelling 75px — that staircase *is* the integrations
 * animation"). `scroll-reveals.md` names the rows `.framer-75fhuo` / `.framer-16vjy5z` /
 * `.framer-chzmgn` because it keys each row by "the nearest className after
 * `__framer__enter`"; in the real DOM `.framer-75fhuo` is the un-animated grid and both
 * `.framer-16vjy5z` and `.framer-chzmgn` are RichText captions with `transform: none`.
 * The SSR inline styles disambiguate it: the y-75 wrappers are the three named
 * `Analyzing` / `Integrations` / `Maintenance`, in that DOM order, so the doc's distances
 * and delays are applied to them. Spring is the shared over-damped glide
 * `{stiffness:300, damping:60, mass:1}` (ratio ≈ 1.73, ZERO overshoot) and viewport is
 * `{once:true, amount:0.5}` — inherited from `ScrollReveal`, nothing overridden.
 *
 * ── What deliberately does NOT animate ────────────────────────────────────────────────
 * INVENTORY.md risk #4 and `analyzing-workflow-card.md`, re-verified against the recovered
 * module sources:
 *   • The two elements named `"Animating line"` (`.framer-bxvptv`, `.framer-13ar0lf`) are
 *     STATIC — frozen frames of a progress bar parked at `left:-98px` / `left:-116px` by
 *     `app/framer/layout.css`. `yC4ecTPpV.js` contains no `variants`, no second
 *     `__framer__loop`, no `useEffect`, no `setInterval`. They are plain `<div>`s here.
 *     Their tracks (`.framer-1ekz8k2`, `.framer-7g96vv`) are plain `<div>`s too.
 *   • The three glows (`.framer-1lwqqit` "glow", `.framer-1pcbo0g` "Gradient",
 *     `.framer-14casg1` "Glow") are constant `blur(41px)` at `opacity: 0.8`. No pulse,
 *     no breathing (INVENTORY.md documented negative #4).
 *   • The Integration tiles have no hover lift, glow, tilt or reorder — single variant,
 *     no `enabledGestures` (`integrations.md`, documented negative #5).
 *   • The Maintenance card's own shell (`xNwcc4rjs.js`) contains no `withFX`/`withTickerFX`
 *     and has a single variant: the "Updates" heading, the New/Improved/Fixed legend and
 *     the two arrows are static. The arrows are decorative `<div>`s in the source — not
 *     buttons, no handlers, no `onTap` — and are reproduced as such; clicking them does
 *     nothing on the live site and does nothing here.
 *   • The Badge (`.framer-XUE7K`, `eWNvTdAfh.js`) looks animated because it calls
 *     `setVariant("ZIod2QNvX")` after 4200 ms, but `ZIod2QNvX` is not in its
 *     `variantClassNames` (the component has one variant, `d6zK31fLp`) and the id appears
 *     exactly once in the module — a dead switch. It is plain markup here.
 * Adding motion to any of these would be a fidelity failure, not a bonus.
 *
 * ── What DOES move ────────────────────────────────────────────────────────────────────
 *   • `.framer-llytlh` — one 2 s linear 360° rotation. `./ProcessMotion`.
 *   • `.framer-15p9bzn` — the Integrations rows scroll vertically at 15 px/s.
 *     `./ProcessMotion`. (`integrations.md` does not mention this; it is measured from
 *     `BiHYAFIZy.js` and corroborated by all three rendered DOMs.)
 *   • `.framer-aEfch` — the "July 2025 update" panel auto-cycles July → Aug → Sept every
 *     3500 ms with a 0.6 s `cubic-bezier(0.7, 0, 0.3, 1)` magic-motion morph. `./UpdateCard`.
 *     (Also undocumented in `_source/behaviours/`; the SSR ships only the July state, but
 *     the tablet and phone rendered DOMs show "Aug 2025 update" mid-transition.)
 * Each of those three files' headers carries the measured constants and the evidence.
 *
 * ── Assets ────────────────────────────────────────────────────────────────────────────
 * 11 distinct `framerusercontent.com` URLs (10 `.png`, 1 `.svg`), all rewritten through
 * `_source/asset-map.json` by the converter — including the `&amp;`-escaped query strings —
 * and one of them (`qdwkjZaOXSVErvC0s7nS80QgVzU.png`) is used twice. Every `<img>` keeps
 * Framer's `decoding="async" loading="lazy"` and its intrinsic `width`/`height`, and sits
 * inside the `data-framer-background-image-wrapper` div the CSS expects.
 * The 26 `<svg><use href="#…"/></svg>` sprite references are inlined via `./ProcessIcons`
 * (see that file for why).
 *
 * ── Copy ──────────────────────────────────────────────────────────────────────────────
 * Verbatim from the SSR. None of BRIEF.md's three CONTENT OVERRIDES occurs in this section.
 * `data-framer-name="Notch"` appears three times (once per card) and is STRUCTURAL — the
 * step-number cut-out shape — so it is left untouched, per BRIEF.md's DO NOT TOUCH list.
 */

import * as React from "react";
import type { CSSProperties } from "react";

import { ScrollReveal, type ReducedMotionPolicy } from "@/components/primitives";

import {
  ClockPaths,
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconChat,
  IconGlowEllipse,
  IconLink,
  IconPlus,
  IconRoundedEdge,
  IconSync,
} from "./ProcessIcons";
import { IntegrationsTicker, SpinningIconHolder } from "./ProcessMotion";
import { UpdateCard } from "./UpdateCard";

export interface ProcessSectionProps {
  /**
   * Forwarded to the four `ScrollReveal` wrappers in this section. Defaults to the
   * project-wide `DEFAULT_REDUCED_MOTION_POLICY`; pass `"animate"` to keep the reveals
   * running under `prefers-reduced-motion: reduce`.
   */
  reducedMotion?: ReducedMotionPolicy;
}

export function ProcessSection({
  reducedMotion,
}: ProcessSectionProps = {}): React.ReactElement {
  return (
    <section className="framer-1ltw54r" data-framer-name="Process">
      <ScrollReveal
        className="framer-y20zjc"
        data-framer-name="Heading"
        enter="up30"
        transition="t2"
        reducedMotion={reducedMotion}
      >
        <div className="ssr-variant">
          <div className="framer-1t2tba8-container">
            <div
              className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
              data-border="true"
              data-framer-name="Badge"
              data-highlight="true"
              style={{
                "--border-bottom-width": "1px",
                "--border-color": "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))",
                "--border-left-width": "1px",
                "--border-right-width": "1px",
                "--border-style": "solid",
                "--border-top-width": "1px",
                backgroundColor: "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              } as CSSProperties}
            >
              <div
                className="framer-xrs0cf"
                data-framer-component-type="RichTextContainer"
                style={{
                  "--extracted-r6o4lv": "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  "--variable-reference-ibDtCMzbS-eWNvTdAfh": "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                  transform: "none",
                } as CSSProperties}
              >
                <p
                  className="framer-text framer-styles-preset-141u1yr"
                  data-styles-preset="pAzayDUZg"
                  style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-ibDtCMzbS-eWNvTdAfh))" } as CSSProperties}
                >
                  The 10-80-10 Rule
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="framer-1ugghcg"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" } as CSSProperties}
        >
          <h2
            className="framer-text framer-styles-preset-1uc0rn1"
            data-styles-preset="f6v2ro_B_"
          >
            Your team leads. Digital FTEs do the heavy lifting.
          </h2>
        </div>
      </ScrollReveal>
      <div className="framer-75fhuo" data-framer-name="Process grid">
        <ScrollReveal
          className="framer-nixrx0"
          data-framer-name="Analyzing"
          enter="up75"
          transition="t2"
          reducedMotion={reducedMotion}
        >
          <div className="ssr-variant">
            <div className="framer-1ugk146-container">
              <div
                className="framer-GtpxM framer-TPaq9 framer-k0Wn1 framer-jM1yb framer-BHHgS framer-1p313hh framer-v-1p313hh"
                data-framer-name="Analyzing workflow"
                style={{ width: "100%" } as CSSProperties}
              >
                <div
                  className="framer-jxk1x4"
                  data-framer-name="Border"
                  style={{
                    background: "linear-gradient(180deg, var(--token-5c4c4689-2e9f-4d75-8648-a6fa99ee1dd8, rgba(255, 255, 255, 0.5)) 0%, var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2)) 30%, var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03)) 80%)",
                    mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect",
                    WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  } as CSSProperties}
                >
                  <div
                    className="framer-1hjm88w"
                    data-framer-name="card"
                    style={{
                      background: "linear-gradient(180deg, var(--token-5f2865e9-378d-430e-acd2-eb9119a65629, rgba(17, 17, 17, 0.9)) 0%, var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17)) 100%)",
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    } as CSSProperties}
                  >
                    <div className="framer-1p2vfx2" data-framer-name="Top">
                      <div className="framer-16ga4kt" data-framer-name="Text">
                        <div
                          className="framer-1p379g3"
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
                            Analyzing Workflow
                          </p>
                        </div>
                        <div
                          className="framer-1s4x9m3"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            To get an idea of what can be automated
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1hqipib"
                        data-framer-name="Line"
                        style={{ backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))" } as CSSProperties}
                      />
                    </div>
                    <div className="framer-1ugafw9" data-framer-name="Bottom">
                      <div
                        className="framer-plgnji"
                        data-framer-name="1st issue"
                        style={{
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-bbrzk8"
                          data-border="true"
                          data-framer-name="icon holder"
                          style={{
                            "--border-bottom-width": "1px",
                            "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            "--border-left-width": "1px",
                            "--border-right-width": "1px",
                            "--border-style": "solid",
                            "--border-top-width": "1px",
                            backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            borderBottomLeftRadius: "52px",
                            borderBottomRightRadius: "52px",
                            borderTopLeftRadius: "52px",
                            borderTopRightRadius: "52px",
                          } as CSSProperties}
                        >
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-y4cw0y"
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
                              <IconLink />
                            </div>
                          </div>
                        </div>
                        <div className="framer-1gi02m8" data-framer-name="text">
                          <div
                            className="framer-t4xtnq"
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
                              Bottlenecks
                            </p>
                          </div>
                          <div
                            className="framer-6t194f"
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
                              15+ issues found
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="framer-1hw576k"
                        data-framer-name="2nd issue"
                        style={{
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        } as CSSProperties}
                      >
                        <SpinningIconHolder>
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-1gg6ox1"
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
                              <IconSync />
                            </div>
                          </div>
                        </SpinningIconHolder>
                        <div className="framer-114jjo7" data-framer-name="text">
                          <div
                            className="framer-1wlcqg1"
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
                              85% repeated tasks
                            </p>
                          </div>
                          <div
                            className="framer-1ekz8k2"
                            data-framer-name="Line"
                            style={{
                              backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                              borderBottomLeftRadius: "1px",
                              borderBottomRightRadius: "1px",
                              borderTopLeftRadius: "1px",
                              borderTopRightRadius: "1px",
                            } as CSSProperties}
                          >
                            <div
                              className="framer-bxvptv"
                              data-framer-name="Animating line"
                              style={{
                                background: "linear-gradient(270deg, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)) 8%, var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3)) 100%)",
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
                        className="framer-1e9mdhp"
                        data-framer-name="3rd issue"
                        style={{
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-rco88l"
                          data-border="true"
                          data-framer-name="icon holder"
                          style={{
                            "--border-bottom-width": "1px",
                            "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            "--border-left-width": "1px",
                            "--border-right-width": "1px",
                            "--border-style": "solid",
                            "--border-top-width": "1px",
                            backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            borderBottomLeftRadius: "52px",
                            borderBottomRightRadius: "52px",
                            borderTopLeftRadius: "52px",
                            borderTopRightRadius: "52px",
                          } as CSSProperties}
                        >
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-1z0pq16"
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
                              <IconChat />
                            </div>
                          </div>
                        </div>
                        <div className="framer-ay4pht" data-framer-name="text">
                          <div
                            className="framer-ws0xgg"
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
                              Communication Gaps
                            </p>
                          </div>
                          <div
                            className="framer-1mnmdck"
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
                              Needs to be automated
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="framer-19caecx"
                        data-framer-name="4th issue"
                        style={{
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-mc6egk"
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
                            borderBottomLeftRadius: "52px",
                            borderBottomRightRadius: "52px",
                            borderTopLeftRadius: "52px",
                            borderTopRightRadius: "52px",
                          } as CSSProperties}
                        >
                          <svg
                            className="framer-d4tNk framer-11iwlo0"
                            role="presentation"
                            viewBox="0 0 24 24"
                            style={{
                              "--1m6trwb": "0",
                              "--21h8s6": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                              "--pgex8v": "1.5",
                            } as CSSProperties}
                          >
                            <ClockPaths />
                          </svg>
                        </div>
                        <div className="framer-648p8o" data-framer-name="Text">
                          <div
                            className="framer-w7z36g"
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
                              Time consumption
                            </p>
                          </div>
                          <div
                            className="framer-7g96vv"
                            data-framer-name="Line"
                            style={{
                              backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                              borderBottomLeftRadius: "1px",
                              borderBottomRightRadius: "1px",
                              borderTopLeftRadius: "1px",
                              borderTopRightRadius: "1px",
                            } as CSSProperties}
                          >
                            <div
                              className="framer-13ar0lf"
                              data-framer-name="Animating line"
                              style={{
                                background: "linear-gradient(270deg, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)) 8%, var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3)) 100%)",
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
                        className="framer-1fqk7af"
                        style={{
                          borderBottomLeftRadius: "6px",
                          borderBottomRightRadius: "6px",
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-fgaxsb"
                          data-border="true"
                          style={{
                            "--border-bottom-width": "1px",
                            "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            "--border-left-width": "1px",
                            "--border-right-width": "1px",
                            "--border-style": "solid",
                            "--border-top-width": "1px",
                            backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            borderBottomLeftRadius: "52px",
                            borderBottomRightRadius: "52px",
                            borderTopLeftRadius: "52px",
                            borderTopRightRadius: "52px",
                          } as CSSProperties}
                        >
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-ccujf"
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
                              <IconCalendar />
                            </div>
                          </div>
                        </div>
                        <div className="framer-fimych">
                          <div
                            className="framer-1x3xmau"
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
                              Missed Deadlines
                            </p>
                          </div>
                          <div
                            className="framer-1m8a4kr"
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
                              30% Missed Deadlines
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="framer-1lwqqit"
                  data-framer-name="glow"
                  style={{
                    filter: "blur(41px)",
                    WebkitFilter: "blur(41px)",
                    opacity: "0.8",
                    transform: "translateX(-50%)",
                  } as CSSProperties}
                >
                  <div
                    data-framer-component-type="SVG"
                    {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                    className="framer-1w6mh6l"
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
                      <IconGlowEllipse />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="framer-dytzms" data-framer-name="Notch">
            <div
              className="framer-fdjh96"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-141u1yr"
                data-styles-preset="pAzayDUZg"
              >
                <strong className="framer-text">
                  First 10%.
                </strong>
              </p>
            </div>
            <div
              className="framer-10f188n"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-oidmul"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
            <div
              className="framer-i9lowr"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-1j7oi4c"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
          </div>
          <div className="framer-1217agn" data-framer-name="Content">
            <div
              className="framer-1kg6b43"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-17m54kk"
                data-styles-preset="QgMyyAavm"
              >
                Your Team Sets the Direction
              </p>
            </div>
            <div
              className="framer-16vjy5z"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-sbzkm0"
                data-styles-preset="E64lfTJ9Y"
              >
                You set the goals, rules and approvals. We map where Digital FTEs can help.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal
          className="framer-m44wd7"
          data-framer-name="Integrations"
          enter="up75"
          transition="t3"
          reducedMotion={reducedMotion}
        >
          <div className="ssr-variant">
            <div className="framer-yhfich-container">
              <div
                className="framer-uR7R1 framer-TPaq9 framer-k0Wn1 framer-BHHgS framer-jM1yb framer-1zpq5g framer-v-1zpq5g"
                data-framer-name="Integration"
                style={{ width: "100%" } as CSSProperties}
              >
                <div
                  className="framer-mdymzm"
                  data-framer-name="Outline"
                  style={{
                    background: "linear-gradient(180deg, var(--token-5c4c4689-2e9f-4d75-8648-a6fa99ee1dd8, rgba(255, 255, 255, 0.5)) 0%, var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2)) 30%, var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03)) 80%)",
                    mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect",
                    WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 47%) intersect",
                    borderBottomLeftRadius: "13px",
                    borderBottomRightRadius: "13px",
                    borderTopLeftRadius: "13px",
                    borderTopRightRadius: "13px",
                  } as CSSProperties}
                >
                  <div
                    className="framer-1q61eoo"
                    data-framer-name="Card"
                    style={{
                      background: "linear-gradient(180deg, var(--token-5f2865e9-378d-430e-acd2-eb9119a65629, rgba(17, 17, 17, 0.9)) 0%, var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17)) 100%)",
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    } as CSSProperties}
                  >
                    <div className="framer-6g8d6o" data-framer-name="Top">
                      <div className="framer-ssfra2" data-framer-name="Text">
                        <div
                          className="framer-719nem"
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
                            Integrations
                          </p>
                        </div>
                        <div
                          className="framer-m2mvck"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-fc24edca-c6a9-4002-9aa0-e67221fb322a, rgba(255, 255, 255, 0.7))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            dir="auto"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fc24edca-c6a9-4002-9aa0-e67221fb322a, rgba(255, 255, 255, 0.7)))" } as CSSProperties}
                          >
                            Seamlessly integrates with your tools
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1anqn9u"
                        data-framer-name="Line"
                        style={{ backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))" } as CSSProperties}
                      />
                    </div>
                    <IntegrationsTicker className="framer-15p9bzn">
                          <div
                            className="framer-vrxx6k"
                            data-border="true"
                            data-framer-name="Project management"
                            style={{
                              "--border-bottom-width": "1px",
                              "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "solid",
                              "--border-top-width": "0px",
                            } as CSSProperties}
                          >
                            <div className="framer-1v28cku" data-framer-name="Top">
                              <div
                                className="framer-1mc92bh"
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
                                  Project Management
                                </p>
                              </div>
                              <div
                                className="framer-9mq9jq"
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
                                  Sync tasks and updates with project management tools:
                                </p>
                              </div>
                            </div>
                            <div className="framer-14vyve3" data-framer-name="Bottom">
                              <div className="framer-18dczhm" data-framer-name="integrations">
                                <div
                                  className="framer-1wqb71l"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-vxp1c2"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="400"
                                        src="/assets/images/B3ezc1nswXFkpzW9KWX40t7bHKY.534fe575.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1htbcrs"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1h8hwst"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="300"
                                        height="400"
                                        src="/assets/images/VuvajiHW5WLZ7HaFJKa9GXEU4.d4b1189e.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1f7cemp"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-5z0p8n"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="400"
                                        src="/assets/images/gPEzEKsNKBusglCCgdohBhJTkLQ.534fe575.png"
                                        alt=""
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
                                </div>
                              </div>
                              <div
                                className="framer-fgr0r1"
                                data-border="true"
                                data-framer-name="Request more"
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
                                <div
                                  data-framer-component-type="SVG"
                                  {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                                  className="framer-1i9pfr9"
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
                                    <IconPlus />
                                  </div>
                                </div>
                                <div
                                  className="framer-bfcah1"
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
                                    Request more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="framer-f7u03y"
                            data-border="true"
                            data-framer-name="Team Communication"
                            style={{
                              "--border-bottom-width": "1px",
                              "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "solid",
                              "--border-top-width": "0px",
                            } as CSSProperties}
                          >
                            <div className="framer-9llnyk" data-framer-name="Top">
                              <div
                                className="framer-dk54x6"
                                data-framer-component-type="RichTextContainer"
                                style={{
                                  "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                                  "--framer-link-text-color": "rgb(0, 153, 255)",
                                  "--framer-link-text-decoration": "underline",
                                  transform: "none",
                                } as CSSProperties}
                              >
                                <p
                                  className="framer-text framer-styles-preset-1l55uzh"
                                  data-styles-preset="nNXkfmGpR"
                                  style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                                >
                                  Team Communication
                                </p>
                              </div>
                              <div
                                className="framer-7gyqme"
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
                                  Share workflow updates directly in chat apps.
                                </p>
                              </div>
                            </div>
                            <div className="framer-188lhat" data-framer-name="Bottom">
                              <div className="framer-10t6ls8" data-framer-name="integrations">
                                <div
                                  className="framer-1inc7kf"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-kuxai2"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="360"
                                        height="400"
                                        src="/assets/images/KozRZhi5uV6U8G42qYcpQAiAm3g.8c62ab3e.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1xttkqs"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1yx3iam"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="381"
                                        src="/assets/images/3Kj5xxCxyAVG0RRecGPwrAsuQck.641ca594.png"
                                        alt=""
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
                                </div>
                              </div>
                              <div
                                className="framer-1rngxr6"
                                data-border="true"
                                data-framer-name="Request more"
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
                                <div
                                  data-framer-component-type="SVG"
                                  {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                                  className="framer-11jauxf"
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
                                    <IconPlus />
                                  </div>
                                </div>
                                <div
                                  className="framer-7n6tnw"
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
                                    Request more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="framer-57vk52"
                            data-border="true"
                            data-framer-name="Sales Tools"
                            style={{
                              "--border-bottom-width": "1px",
                              "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "solid",
                              "--border-top-width": "0px",
                            } as CSSProperties}
                          >
                            <div className="framer-hqh2mx" data-framer-name="Top">
                              <div
                                className="framer-1p4m1e5"
                                data-framer-component-type="RichTextContainer"
                                style={{
                                  "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                                  "--framer-link-text-color": "rgb(0, 153, 255)",
                                  "--framer-link-text-decoration": "underline",
                                  transform: "none",
                                } as CSSProperties}
                              >
                                <p
                                  className="framer-text framer-styles-preset-1l55uzh"
                                  data-styles-preset="nNXkfmGpR"
                                  style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                                >
                                  Sales Tools
                                </p>
                              </div>
                              <div
                                className="framer-18g5m91"
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
                                  Streamline your sales pipeline with AI.
                                </p>
                              </div>
                            </div>
                            <div className="framer-73a4h1" data-framer-name="Bottom">
                              <div className="framer-5107dd" data-framer-name="integrations">
                                <div
                                  className="framer-ykwa5a"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-4a3ajh"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="350"
                                        height="400"
                                        src="/assets/images/8xUlkui6JB2C37cRKDMNSY7oT8.540a02d3.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-lbii31"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-6nfoo5"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="40"
                                        height="40"
                                        src="/assets/images/IUGqTKBBS7ZPIEUIjuT3cXDVVoA.d6fecf64.svg"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1ghz5j3"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1py798t"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="400"
                                        src="/assets/images/DffJuhPDmqBmLHK8bBHXYmXna4.534fe575.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1ujmsv4"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1s15cht"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="257"
                                        src="/assets/images/A8jK11J6hi5ME6g2v4KvTx8nw.1124a631.png"
                                        alt=""
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
                                </div>
                              </div>
                              <div
                                className="framer-7907tz"
                                data-border="true"
                                data-framer-name="Request more"
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
                                <div
                                  data-framer-component-type="SVG"
                                  {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                                  className="framer-p5w7ey"
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
                                    <IconPlus />
                                  </div>
                                </div>
                                <div
                                  className="framer-8uv97g"
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
                                    Request more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="framer-14qnaoe"
                            data-border="true"
                            data-framer-name="Customer support"
                            style={{
                              "--border-bottom-width": "1px",
                              "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "solid",
                              "--border-top-width": "0px",
                            } as CSSProperties}
                          >
                            <div className="framer-1gkqpc4" data-framer-name="Top">
                              <div
                                className="framer-1nh1y8j"
                                data-framer-component-type="RichTextContainer"
                                style={{
                                  "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                                  "--framer-link-text-color": "rgb(0, 153, 255)",
                                  "--framer-link-text-decoration": "underline",
                                  transform: "none",
                                } as CSSProperties}
                              >
                                <p
                                  className="framer-text framer-styles-preset-1l55uzh"
                                  data-styles-preset="nNXkfmGpR"
                                  style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                                >
                                  Customer Support
                                </p>
                              </div>
                              <div
                                className="framer-g5ae4q"
                                data-framer-component-type="RichTextContainer"
                                style={{
                                  "--extracted-r6o4lv": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                                  "--framer-link-text-color": "rgb(0, 153, 255)",
                                  "--framer-link-text-decoration": "underline",
                                  transform: "none",
                                } as CSSProperties}
                              >
                                <p
                                  className="framer-text framer-styles-preset-huzir6"
                                  data-styles-preset="B3DXZg5aI"
                                  style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))" } as CSSProperties}
                                >
                                  Automation to your customer chat systems.
                                </p>
                              </div>
                            </div>
                            <div className="framer-1bdnbo5" data-framer-name="Bottom">
                              <div className="framer-wf6v87" data-framer-name="integrations">
                                <div
                                  className="framer-1yly8ls"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1sz1nyz"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="298"
                                        src="/assets/images/qdwkjZaOXSVErvC0s7nS80QgVzU.9ff824f2.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1ss8v9y"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-1l8w893"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="372"
                                        src="/assets/images/kdE9hrfAodhH1Rhxb44aQDWm1Yw.915870ba.png"
                                        alt=""
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
                                </div>
                                <div
                                  className="framer-1iicjg0"
                                  data-border="true"
                                  data-framer-name="Icon holder"
                                  style={{
                                    "--border-bottom-width": "1px",
                                    "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                                    "--border-left-width": "1px",
                                    "--border-right-width": "1px",
                                    "--border-style": "solid",
                                    "--border-top-width": "1px",
                                    borderBottomLeftRadius: "52px",
                                    borderBottomRightRadius: "52px",
                                    borderTopLeftRadius: "52px",
                                    borderTopRightRadius: "52px",
                                  } as CSSProperties}
                                >
                                  <div
                                    className="framer-cli84v"
                                    style={{
                                      borderBottomLeftRadius: "104px",
                                      borderBottomRightRadius: "104px",
                                      borderTopLeftRadius: "104px",
                                      borderTopRightRadius: "104px",
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
                                        width="400"
                                        height="298"
                                        src="/assets/images/qdwkjZaOXSVErvC0s7nS80QgVzU.9ff824f2.png"
                                        alt=""
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
                                </div>
                              </div>
                              <div
                                className="framer-6fbn77"
                                data-border="true"
                                data-framer-name="Request more"
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
                                <div
                                  data-framer-component-type="SVG"
                                  {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                                  className="framer-1gl74lq"
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
                                    <IconPlus />
                                  </div>
                                </div>
                                <div
                                  className="framer-54wrnz"
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
                                    Request more
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                    </IntegrationsTicker>
                    {" "}
                  </div>
                </div>
                <div
                  className="framer-1pcbo0g"
                  data-framer-name="Gradient"
                  style={{
                    filter: "blur(41px)",
                    WebkitFilter: "blur(41px)",
                    opacity: "0.8",
                    transform: "translateX(-50%)",
                  } as CSSProperties}
                >
                  <div
                    data-framer-component-type="SVG"
                    {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                    className="framer-1a6tvkx"
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
                      <IconGlowEllipse />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="framer-sja6hc" data-framer-name="Notch">
            <div
              className="framer-bv6g34"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-141u1yr"
                data-styles-preset="pAzayDUZg"
              >
                <strong className="framer-text">
                  Middle 80%.
                </strong>
              </p>
            </div>
            <div
              className="framer-1nw4l2q"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-1k4obth"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
            <div
              className="framer-ee8mzn"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-8g86fl"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
          </div>
          <div className="framer-1umz75h" data-framer-name="Content">
            <div
              className="framer-lhlwu0"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-17m54kk"
                data-styles-preset="QgMyyAavm"
              >
                Digital FTEs Do the Work
              </p>
            </div>
            <div
              className="framer-chzmgn"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-sbzkm0"
                data-styles-preset="E64lfTJ9Y"
              >
                AI employees handle the repetitive work inside the tools you already use.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal
          className="framer-j0vkif"
          data-framer-name="Maintenance"
          enter="up75"
          transition="t4"
          reducedMotion={reducedMotion}
        >
          <div className="ssr-variant">
            <div className="framer-9hkwc3-container">
              <div
                className="framer-h9A3Y framer-TPaq9 framer-k0Wn1 framer-jM1yb framer-1ke4dig framer-v-1ke4dig"
                data-framer-name="Maintenence"
                style={{ width: "100%" } as CSSProperties}
              >
                <div
                  className="framer-tzkygw"
                  data-framer-name="Outline"
                  style={{
                    background: "linear-gradient(180deg, var(--token-5c4c4689-2e9f-4d75-8648-a6fa99ee1dd8, rgba(255, 255, 255, 0.5)) 0%, var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2)) 30%, var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03)) 80%)",
                    mask: "linear-gradient(0deg, rgba(0,0,0,0) -4%, rgba(0,0,0,1) 44%) intersect",
                    WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) -4%, rgba(0,0,0,1) 44%) intersect",
                    borderBottomLeftRadius: "13px",
                    borderBottomRightRadius: "13px",
                    borderTopLeftRadius: "13px",
                    borderTopRightRadius: "13px",
                  } as CSSProperties}
                >
                  <div
                    className="framer-1va180u"
                    data-framer-name="Card"
                    style={{
                      background: "linear-gradient(180deg, var(--token-5f2865e9-378d-430e-acd2-eb9119a65629, rgba(17, 17, 17, 0.9)) 0%, var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17)) 100%)",
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    } as CSSProperties}
                  >
                    <div className="framer-19v21jt" data-framer-name="Top">
                      <div className="framer-h5veed" data-framer-name="Text">
                        <div
                          className="framer-vvvp3c"
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
                            Updates
                          </p>
                        </div>
                        <div
                          className="framer-11vewwy"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            keep functions runs smoothly
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1vbfue2"
                        data-framer-name="Divider"
                        style={{ backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))" } as CSSProperties}
                      />
                    </div>
                    <div className="framer-k9m4cn" data-framer-name="Bottom">
                      <div className="framer-1a6268o" data-framer-name="Top">
                        <div className="framer-x0gkyu" data-framer-name="Status">
                          <div className="framer-5nuts1" data-framer-name="New">
                            <div
                              className="framer-107i6fx"
                              data-framer-name="Dot"
                              style={{
                                backgroundColor: "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))",
                                borderBottomLeftRadius: "7px",
                                borderBottomRightRadius: "7px",
                                borderTopLeftRadius: "7px",
                                borderTopRightRadius: "7px",
                              } as CSSProperties}
                            />
                            <div
                              className="framer-muiye2"
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
                                New
                              </p>
                            </div>
                          </div>
                          <div className="framer-10o246z" data-framer-name="Improved">
                            <div
                              className="framer-1bughon"
                              style={{
                                backgroundColor: "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
                                borderBottomLeftRadius: "7px",
                                borderBottomRightRadius: "7px",
                                borderTopLeftRadius: "7px",
                                borderTopRightRadius: "7px",
                              } as CSSProperties}
                            />
                            <div
                              className="framer-lgwz4"
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
                                Improved
                              </p>
                            </div>
                          </div>
                          <div className="framer-3wjzr4" data-framer-name="Fixed">
                            <div
                              className="framer-10za7lt"
                              style={{
                                backgroundColor: "var(--token-b3c11e1e-3e83-4bec-9857-d0985ddf2f3d, rgb(255, 152, 0))",
                                borderBottomLeftRadius: "7px",
                                borderBottomRightRadius: "7px",
                                borderTopLeftRadius: "7px",
                                borderTopRightRadius: "7px",
                              } as CSSProperties}
                            />
                            <div
                              className="framer-170vxsj"
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
                                Fixed
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="framer-1eoqeu9"
                          data-framer-name="Arrow left"
                          style={{
                            backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            borderBottomLeftRadius: "2px",
                            borderBottomRightRadius: "2px",
                            borderTopLeftRadius: "2px",
                            borderTopRightRadius: "2px",
                          } as CSSProperties}
                        >
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-dviavz"
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
                              <IconArrowLeft />
                            </div>
                          </div>
                        </div>
                        <div
                          className="framer-16ji0f1"
                          data-framer-name="Arrow right"
                          style={{
                            backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                            borderBottomLeftRadius: "2px",
                            borderBottomRightRadius: "2px",
                            borderTopLeftRadius: "2px",
                            borderTopRightRadius: "2px",
                          } as CSSProperties}
                        >
                          <div
                            data-framer-component-type="SVG"
                            {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                            className="framer-ayxfg"
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
                              <IconArrowRight />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="framer-fdgvqj-container">
                        <UpdateCard />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="framer-14casg1"
                  data-framer-name="Glow"
                  style={{
                    filter: "blur(41px)",
                    WebkitFilter: "blur(41px)",
                    opacity: "0.8",
                    transform: "translateX(-50%)",
                  } as CSSProperties}
                >
                  <div
                    data-framer-component-type="SVG"
                    {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                    className="framer-1kgm2zn"
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
                      <IconGlowEllipse />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="framer-1jbn33u" data-framer-name="Notch">
            <div
              className="framer-aq9w1a"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-141u1yr"
                data-styles-preset="pAzayDUZg"
              >
                <strong className="framer-text">
                  Final 10%.
                </strong>
              </p>
            </div>
            <div
              className="framer-awmjb4"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-956daw"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
            <div
              className="framer-hvcikt"
              data-framer-name="Rounded Edge"
              style={{ transform: "rotate(90deg)" } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                data-framer-name="Vector"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-xof9ry"
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
                  <IconRoundedEdge />
                </div>
              </div>
            </div>
          </div>
          <div className="framer-zvszv6" data-framer-name="Content">
            <div
              className="framer-1h79795"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-17m54kk"
                data-styles-preset="QgMyyAavm"
              >
                Your Team Makes the Call
              </p>
            </div>
            <div
              className="framer-9z2aa3"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <p
                className="framer-text framer-styles-preset-sbzkm0"
                data-styles-preset="E64lfTJ9Y"
              >
                Your people review and approve. Nothing ships without your sign-off.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ProcessSection;
