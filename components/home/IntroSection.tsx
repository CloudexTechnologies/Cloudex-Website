/**
 * IntroSection — home page section 04 "Intro" (`_source/structure/home.md` line 95).
 *
 * Markup source: `_source/live/home.html` bytes 315730–316719 (989 bytes,
 * `<section class="framer-7x1fn" data-framer-name="Intro" id="intro">`), converted with
 * `node tools/html2jsx.mjs --asset-map _source/asset-map.json` and cross-checked against
 * all three post-hydration DOMs (`_source/rendered/home.{desktop,tablet,phone}.html`).
 *
 * ── Structure notes ──────────────────────────────────────────────────────────────────
 * • NO breakpoint variants. home.md: "single DOM copy serves all 3 breakpoints
 *   (CSS-only responsive)". Verified: the three rendered DOMs are byte-identical over
 *   this subtree apart from the hydrated inline style on `.framer-wbehpo`. So there are
 *   deliberately no `.ssr-variant` wrappers and no `hidden-<hash>` classes here — adding
 *   them would be the deviation.
 * • NO appear-animations (`data-framer-appear-id`), no images, no video, no links, no
 *   interactivity → this stays a Server Component. The only client code is the
 *   `ScrollReveal` primitive it mounts.
 * • The section's CSS lives in `app/framer/layout.css` scoped as `.framer-GhI2H .framer-7x1fn`,
 *   so it only lays out correctly inside the page root `app/page.tsx` renders.
 *
 * ── Behaviour (MEASURED — `_source/behaviours/scroll-reveals.md`) ─────────────────────
 * PLAN.md §1.5: `.framer-wbehpo` SSRs as
 *   `style="will-change:transform;opacity:0;transform:translateY(30px)"`
 * with no appear id. Ported literally it would stay invisible forever, so it is wrapped
 * in `ScrollReveal`:
 *   enter      `up30`  (Framer's `animation2`, y 30)
 *   transition `t2`    (spring stiffness 300 / damping 60 / mass 1, delay 0 — damping
 *                       ratio ≈ 1.73, over-damped, ZERO overshoot)
 *   viewport   `{ once: true, amount: 0.5 }` (threshold 0.5, animateOnce)
 * That is the row `| .framer-1l9vq7t | Text | animation2 (y 30) | t2 (0s) |` in
 * `scroll-reveals.md`. The doc keys the row by the parent frame's class + `data-framer-name`;
 * the element that actually carries the hidden SSR state — and that the live site resolves
 * to `opacity: 1; transform: none` — is its `.framer-wbehpo` RichTextContainer child, so
 * the wrapper goes there. Both the enter distance (30px) and the transition are unchanged.
 * `.framer-163vf16` (the "70%" numeral) has NO reveal; its `translate(-50%, -50%)` is
 * static centring, present in both the SSR and the hydrated DOM.
 *
 * ── Copy ─────────────────────────────────────────────────────────────────────────────
 * Rewritten at the client's request: the SSR's "10M" / "we saves team over 10 million
 * hours every years" became "70%" / "We are Cloudex Technologies, and we save teams 70% of
 * their time", matching the "70% Time saved" stat on /about.
 */

import * as React from "react";

import { ScrollReveal, type ReducedMotionPolicy } from "@/components/primitives";

export interface IntroSectionProps {
  /**
   * Forwarded to the one `ScrollReveal` in this section. Defaults to the project-wide
   * `DEFAULT_REDUCED_MOTION_POLICY`; pass `"settle"` to snap it visible instead of
   * animating under `prefers-reduced-motion: reduce`.
   */
  reducedMotion?: ReducedMotionPolicy;
}

export function IntroSection({
  reducedMotion,
}: IntroSectionProps = {}): React.ReactElement {
  return (
    <section className="framer-7x1fn" data-framer-name="Intro" id="intro">
      <div
        className="framer-163vf16"
        data-framer-component-type="RichTextContainer"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <p
          className="framer-text framer-styles-preset-tebz1a"
          data-styles-preset="VFXGrPBrq"
        >
          70%
        </p>
      </div>
      <div className="framer-1l9vq7t" data-framer-name="Text">
        <ScrollReveal
          as="div"
          enter="up30"
          transition="t2"
          reducedMotion={reducedMotion}
          className="framer-wbehpo"
          data-framer-component-type="RichTextContainer"
        >
          <h3
            className="framer-text framer-styles-preset-1g6vhw2"
            data-styles-preset="mh_X6iPMR"
            dir="auto"
            style={
              {
                "--framer-text-alignment": "start",
                "--framer-text-color": "rgb(255, 255, 255)",
              } as React.CSSProperties
            }
          >
            <span
              data-text-fill="true"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)) 0%, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)) 84%)",
              }}
              className="framer-text"
            >
              We are Cloudex Technologies, and we save teams 70% of their time
            </span>
          </h3>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default IntroSection;
