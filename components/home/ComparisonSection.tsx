/**
 * ComparisonSection — home page section 11 "Comparison" (`_source/structure/home.md` line 683).
 *
 * Markup source: `_source/live/home.html` bytes 977902–1003750 (25,848 bytes,
 * `<section class="framer-68g0aj" data-framer-name="Comparison">`), converted with
 * `node tools/html2jsx.mjs --asset-map _source/asset-map.json` and cross-checked against all
 * three post-hydration DOMs (`_source/rendered/home.{desktop,tablet,phone}.html`).
 *
 * ── Server Component ──────────────────────────────────────────────────────────────────
 * PLAN.md marks this section a SERVER component and that holds: no links, no buttons, no
 * `data-framer-appear-id`, no hover variants (every component instance SSRs with its base
 * class and its ONLY variant class — `framer-1rwepof/framer-v-1rwepof` for the Badge and
 * `framer-3erin3/framer-v-3erin3` for all 20 Feature points — and `app/framer/*.css`
 * contains no `:hover` rule for any class in this subtree). home.md's `hover-variant`
 * behaviour marker is a false positive off the Badge's `data-highlight="true"` attribute.
 * The file therefore carries NO `"use client"`; the only client code it mounts is the
 * shared `ScrollReveal` primitive.
 *
 * ── Breakpoint variants — NOT a 3× duplicated section ─────────────────────────────────
 * home.md says the section is "duplicated per breakpoint in the DOM (3 copies)". That is a
 * mis-read of the `hidden-*` census and the SSR disproves it: the slice contains exactly ONE
 * copy of the section, with 2 × `hidden-19fjg0f` and 2 × (`hidden-72rtr7 hidden-1lsm0lh`)
 * on FOUR individual nodes, plus 21 `ssr-variant` wrappers that carry NO hidden class
 * (`class="ssr-variant"`, all 21 — verified) and each hold exactly one child. So:
 *   • `.framer-129l7q7` "Top bar" (desktop/tablet header row)  → `hidden-19fjg0f`
 *   • `.framer-fyszvn`  "Line"    (the centre divider)         → `hidden-19fjg0f`
 *   • `.framer-8654z7` / `.framer-k3q3di` "Heading for mobile" → `hidden-72rtr7 hidden-1lsm0lh`
 * i.e. desktop+tablet get the shared top bar and the divider line; phone gets a per-column
 * heading instead. Everything else is one CSS-responsive tree. Duplicating the whole section
 * three times would be the deviation, so the four `hidden-*` nodes are reproduced literally
 * and the `hidden-` hashes come from `hiddenClassName("home", …)` rather than being typed in.
 *
 * (The rendered DOMs *drop* the inactive nodes outright rather than hiding them — Framer's
 * runtime unmounts them after hydration. Keeping them mounted and `display:none`-d, exactly
 * as the SSR does, is visually identical and is what CRITICAL FIDELITY RULE 1 asks for.)
 *
 * ── Scroll reveals (MEASURED — `_source/behaviours/scroll-reveals.md`) ────────────────
 * PLAN.md §1.5: four nodes SSR with `will-change:transform;opacity:0;transform:translate…`
 * and no appear id. Ported literally they stay invisible forever, so each is a `ScrollReveal`:
 *
 *   | node                             | SSR transform      | enter    | transition |
 *   |----------------------------------|--------------------|----------|------------|
 *   | `.framer-1qnsgv1`  Heading       | `translateY(30px)` | `up30`   | `t2` (0s)  |
 *   | `.framer-129l7q7`  Top bar       | `translateY(30px)` | `up30`   | `t2` (0s)  |
 *   | `.framer-10svbwv`  Traditional   | `translateX(-50px)`| `left50` | `t3` (0.2s)|
 *   | `.framer-13djt0a`  Automation    | `translateX(50px)` | `right50`| `t3` (0.2s)|
 *
 * matching these rows of the measured element→animation map:
 *   `| .framer-68g0aj / .framer-7lrexb | Comparison | animation2 | t2 |`          (× the two y-30s)
 *   `| .framer-fyszvn hidden-19fjg0f | Comparison container | animation13 | t3 |` (→ `.framer-10svbwv`)
 *   `| .framer-13djt0a | Automation | animation14 (x 50) | t3 |`
 * The doc keys rows by "the nearest className after `__framer__enter`", which is why two of
 * them name a parent/preceding sibling; the SSR inline `transform` disambiguates every one
 * (30 → animation2, −50 → animation13, +50 → animation14) and agrees with the doc's distances.
 * Spring is the shared over-damped glide `{stiffness:300, damping:60, mass:1}`, viewport
 * `{once:true, amount:0.5}` — all inherited from `ScrollReveal`, none overridden here.
 * `.framer-fyszvn` (Line) and `.framer-4dk0mj` (VS pill) have NO reveal of their own.
 *
 * ── Icons ─────────────────────────────────────────────────────────────────────────────
 * The four `*-container` divs SSR as empty Suspense placeholders (`<div style="display:contents">`).
 * The real content is in the hydrated DOMs: two Phosphor `weight="fill"` glyphs (hourglass for
 * "Traditional way", lightning for "Cloudex Technologies automation"), transcribed verbatim
 * including the `color`/`style` token references. No `<img>`, no remote asset, nothing to
 * rewrite through `_source/asset-map.json` — this section ships zero images.
 *
 * ── Copy ──────────────────────────────────────────────────────────────────────────────
 * Rewritten for the Digital FTE positioning: "your team today" vs "your team + Digital
 * FTEs". The points deliberately avoid replacement or headcount framing; AI is presented
 * as working for the client's people. `data-framer-name` values keep the SSR names.
 */

import * as React from "react";

import { ScrollReveal, type ReducedMotionPolicy } from "@/components/primitives";
import { hiddenClassName } from "@/lib/breakpoints";

/* -------------------------------------------------------------------------- */
/* Breakpoint hide classes (home scope: 72rtr7 / 1lsm0lh / 19fjg0f)            */
/* -------------------------------------------------------------------------- */

const HIDDEN_PHONE = hiddenClassName("home", "phone");
const HIDDEN_DESKTOP_TABLET = `${hiddenClassName("home", "desktop")} ${hiddenClassName(
  "home",
  "tablet",
)}`;

/* -------------------------------------------------------------------------- */
/* Design tokens used inline by the SSR                                        */
/* -------------------------------------------------------------------------- */

const TOKEN_WHITE =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const TOKEN_GREY =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
const TOKEN_GREEN =
  "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))";

/* -------------------------------------------------------------------------- */
/* Phosphor icons (fill weight), transcribed from the hydrated DOMs            */
/* -------------------------------------------------------------------------- */

const ICON_HOURGLASS_PATH =
  "M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM184,180.36V216H72V180l48-36v24a8,8,0,0,0,16,0V144.08Zm0-104.72L178.23,80H77.33L72,76V40H184Z";

const ICON_LIGHTNING_PATH =
  "M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z";

/**
 * Framer wraps every icon instance in `<div class="framer-<hash>-container">` and the
 * Phosphor component renders `<div style="display:contents">` + the `<svg>` inside it.
 * Both are reproduced so the CSS rule
 * `.framer-GhI2H .framer-17ug22k-container, … { flex:none; width:18px; height:18px }`
 * still finds its node.
 */
function PhosphorIcon({
  containerClassName,
  path,
}: {
  containerClassName: string;
  path: string;
}): React.ReactElement {
  return (
    <div className={containerClassName}>
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
          {/* Phosphor leaves its own non-standard `weight` attribute on the <g>;
              React has no typing for it, hence the spread. */}
          <g color={TOKEN_WHITE} {...({ weight: "fill" } as Record<string, string>)}>
            <path d={path} />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature point (the `framer-3erin3` component, 20 instances)                 */
/* -------------------------------------------------------------------------- */

/**
 * Every instance is byte-identical apart from its `*-container` class, its dot colour and
 * its label, so the 20 SSR copies are driven off these two tables instead of being pasted
 * out 20 times. The emitted DOM is unchanged, `ssr-variant` wrapper included.
 */
interface FeaturePoint {
  /** `framer-<hash>-container` — unique per instance, referenced by the ported CSS. */
  readonly container: string;
  readonly label: string;
}

/** Left column, `data-framer-name="Traditional way"`. Dots + text are the grey token. */
const TRADITIONAL_POINTS: readonly FeaturePoint[] = [
  { container: "framer-dd63gj-container", label: "Days lost to routine tasks" },
  { container: "framer-t2w1bv-container", label: "Errors from repetitive work" },
  { container: "framer-1mt4jop-container", label: "Team stretched across busywork" },
  { container: "framer-1dnuei1-container", label: "Growth limited by bandwidth" },
  { container: "framer-i8p4ix-container", label: "Cover limited to office hours" },
  { container: "framer-7ojxj7-container", label: "Decisions wait on late reports" },
  { container: "framer-us5g2o-container", label: "Skilled people stuck on data entry" },
  { container: "framer-17488j7-container", label: "Manual hand-offs between tools" },
  { container: "framer-yhg5mg-container", label: "Slower replies to customers" },
  { container: "framer-1w4ypre-container", label: "Follow-ups slip through the cracks" },
];

/** Right column, `data-framer-name="Automation"`. Green dots, white text. */
const AUTOMATION_POINTS: readonly FeaturePoint[] = [
  { container: "framer-yk7eh7-container", label: "Routine work done in minutes" },
  { container: "framer-1tb0vx9-container", label: "Consistent results your team approves" },
  { container: "framer-1ixpn50-container", label: "Lower cost per task" },
  { container: "framer-11eu4jt-container", label: "Grows with your demand" },
  { container: "framer-naljgl-container", label: "Round-the-clock cover for your team" },
  { container: "framer-qs8xte-container", label: "Live insight for faster decisions" },
  { container: "framer-1m5eca4-container", label: "People focused on clients and decisions" },
  { container: "framer-1e65i8c-container", label: "Smooth hand-offs between tools" },
  { container: "framer-1yobg1x-container", label: "Instant replies, people on complex cases" },
  { container: "framer-h9h4z-container", label: "Follow-ups that never get missed" },
];

function FeaturePointList({
  points,
  dotColor,
  textColor,
}: {
  points: readonly FeaturePoint[];
  dotColor: string;
  textColor: string;
}): React.ReactElement {
  return (
    <>
      {points.map((point) => (
        <div className="ssr-variant" key={point.container}>
          <div className={point.container}>
            <div
              className="framer-tb3Zs framer-JesZO framer-3erin3 framer-v-3erin3"
              data-framer-name="Feature point"
              style={{ width: "100%" }}
            >
              <div
                className="framer-1hm62le"
                data-framer-name="Dot"
                style={{
                  backgroundColor: dotColor,
                  borderBottomLeftRadius: "86px",
                  borderBottomRightRadius: "86px",
                  borderTopLeftRadius: "86px",
                  borderTopRightRadius: "86px",
                }}
              />
              <div
                className="framer-muph6q"
                data-framer-component-type="RichTextContainer"
                style={
                  {
                    "--extracted-r6o4lv":
                      "var(--variable-reference-yhmUCH6UM-JVGZPAwVp)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-yhmUCH6UM-JVGZPAwVp": textColor,
                    transform: "none",
                  } as React.CSSProperties
                }
              >
                <p
                  className="framer-text framer-styles-preset-o3oioe"
                  data-styles-preset="BgF22VJBv"
                  style={
                    {
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-yhmUCH6UM-JVGZPAwVp))",
                    } as React.CSSProperties
                  }
                >
                  {point.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export interface ComparisonSectionProps {
  /**
   * Forwarded to all four `ScrollReveal`s in this section. Defaults to the project-wide
   * `DEFAULT_REDUCED_MOTION_POLICY`; pass `"settle"` to snap them visible instead of
   * animating under `prefers-reduced-motion: reduce`.
   */
  reducedMotion?: ReducedMotionPolicy;
}

export function ComparisonSection({
  reducedMotion,
}: ComparisonSectionProps = {}): React.ReactElement {
  return (
    <section className="framer-68g0aj" data-framer-name="Comparison">
      {/* Heading — SSR `opacity:0; translateY(30px)` → animation2 / t2 */}
      <ScrollReveal
        as="div"
        enter="up30"
        transition="t2"
        reducedMotion={reducedMotion}
        className="framer-1qnsgv1"
        data-framer-name="Heading"
      >
        <div className="ssr-variant">
          <div className="framer-x7lbo1-container">
            <div
              className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
              data-border="true"
              data-framer-name="Badge"
              data-highlight="true"
              style={
                {
                  "--border-bottom-width": "1px",
                  "--border-color":
                    "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))",
                  "--border-left-width": "1px",
                  "--border-right-width": "1px",
                  "--border-style": "solid",
                  "--border-top-width": "1px",
                  backgroundColor:
                    "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                } as React.CSSProperties
              }
            >
              <div
                className="framer-xrs0cf"
                data-framer-component-type="RichTextContainer"
                style={
                  {
                    "--extracted-r6o4lv":
                      "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-ibDtCMzbS-eWNvTdAfh":
                      "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                    transform: "none",
                  } as React.CSSProperties
                }
              >
                <p
                  className="framer-text framer-styles-preset-141u1yr"
                  data-styles-preset="pAzayDUZg"
                  style={
                    {
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-ibDtCMzbS-eWNvTdAfh))",
                    } as React.CSSProperties
                  }
                >
                  Comparison
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="framer-1ic1i4o"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <h2
            className="framer-text framer-styles-preset-1uc0rn1"
            data-styles-preset="f6v2ro_B_"
            style={{ "--framer-text-alignment": "center" } as React.CSSProperties}
          >
            Your team today vs your team with Digital FTEs
          </h2>
        </div>
      </ScrollReveal>

      <div className="framer-7lrexb" data-framer-name="Comparison">
        {/* Top bar — desktop + tablet only. SSR `opacity:0; translateY(30px)` → animation2 / t2 */}
        <ScrollReveal
          as="div"
          enter="up30"
          transition="t2"
          reducedMotion={reducedMotion}
          className={`framer-129l7q7 ${HIDDEN_PHONE}`}
          data-border="true"
          data-framer-name="Top bar"
        >
          <div className="framer-1kvyau6" data-framer-name="Traditional">
            <PhosphorIcon
              containerClassName="framer-17ug22k-container"
              path={ICON_HOURGLASS_PATH}
            />
            <div
              className="framer-15afpxt"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-sbzkm0"
                data-styles-preset="E64lfTJ9Y"
                style={{ "--framer-text-color": TOKEN_WHITE } as React.CSSProperties}
              >
                Your team today
              </p>
            </div>
          </div>
          <div className="framer-obrb1p" data-framer-name="Automated">
            <PhosphorIcon
              containerClassName="framer-10omazn-container"
              path={ICON_LIGHTNING_PATH}
            />
            <div
              className="framer-8h96k3"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-sbzkm0"
                data-styles-preset="E64lfTJ9Y"
                dir="auto"
                style={
                  {
                    "--framer-text-alignment": "start",
                    "--framer-text-color": TOKEN_WHITE,
                  } as React.CSSProperties
                }
              >
                Your team + Digital FTEs
              </p>
            </div>
          </div>
          <div className="framer-4dk0mj" data-framer-name="Vs">
            <div
              className="framer-1wsp2d4"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-13jy9hb"
                data-styles-preset="oBvWttoAP"
                style={
                  {
                    "--framer-text-color":
                      "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
                  } as React.CSSProperties
                }
              >
                <strong className="framer-text">VS</strong>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="framer-1qvh38j" data-framer-name="Comparison container">
          {/* Centre divider — desktop + tablet only. No reveal of its own. */}
          <div
            className={`framer-fyszvn ${HIDDEN_PHONE}`}
            data-framer-name="Line"
          />

          {/* Left column — SSR `opacity:0; translateX(-50px)` → animation13 / t3 */}
          <ScrollReveal
            as="div"
            enter="left50"
            transition="t3"
            reducedMotion={reducedMotion}
            className="framer-10svbwv"
            data-framer-name="Traditional way"
          >
            <div className="framer-9i3mqi" data-framer-name="Including">
              <div
                className={`framer-8654z7 ${HIDDEN_DESKTOP_TABLET}`}
                data-framer-name="Heading for mobile"
              >
                <PhosphorIcon
                  containerClassName="framer-1155h26-container"
                  path={ICON_HOURGLASS_PATH}
                />
                <div
                  className="framer-s1798q"
                  data-framer-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="framer-text framer-styles-preset-sbzkm0"
                    data-styles-preset="E64lfTJ9Y"
                    style={
                      { "--framer-text-color": TOKEN_WHITE } as React.CSSProperties
                    }
                  >
                    Your team today
                  </p>
                </div>
              </div>
              <div className="framer-k2rvkn" data-framer-name="Features">
                <FeaturePointList
                  points={TRADITIONAL_POINTS}
                  dotColor={TOKEN_GREY}
                  textColor={TOKEN_GREY}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — SSR `opacity:0; translateX(50px)` → animation14 / t3 */}
          <ScrollReveal
            as="div"
            enter="right50"
            transition="t3"
            reducedMotion={reducedMotion}
            className="framer-13djt0a"
            data-framer-name="Automation"
          >
            <div className="framer-12jyiff" data-framer-name="Including">
              <div
                className={`framer-k3q3di ${HIDDEN_DESKTOP_TABLET}`}
                data-framer-name="Heading for mobile"
              >
                <PhosphorIcon
                  containerClassName="framer-e66a9v-container"
                  path={ICON_LIGHTNING_PATH}
                />
                <div
                  className="framer-u9iybn"
                  data-framer-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <p
                    className="framer-text framer-styles-preset-sbzkm0"
                    data-styles-preset="E64lfTJ9Y"
                    dir="auto"
                    style={
                      {
                        "--framer-text-alignment": "start",
                        "--framer-text-color": TOKEN_WHITE,
                      } as React.CSSProperties
                    }
                  >
                    Your team + Digital FTEs
                  </p>
                </div>
              </div>
              <div className="framer-q41y3a" data-framer-name="Features">
                <FeaturePointList
                  points={AUTOMATION_POINTS}
                  dotColor={TOKEN_GREEN}
                  textColor={TOKEN_WHITE}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;
