"use client";

/**
 * CaseStudySection — home page section 07 "Case Study" (`_source/structure/home.md` line 414).
 *
 * Markup source: `_source/live/home.html` bytes 686817–708605 (21,788 bytes,
 * `<section class="framer-ckfsee" data-framer-name="Case Study">`), converted with
 * `node tools/html2jsx.mjs --asset-map _source/asset-map.json` and cross-checked against
 * all three post-hydration DOMs (`_source/rendered/home.{desktop,tablet,phone}.html`).
 *
 * ── Structure ────────────────────────────────────────────────────────────────────────
 * • The heading block (`.framer-17lmi98`) is NOT duplicated per breakpoint; its badge
 *   sits in a bare `<div class="ssr-variant">` with no `hidden-*` class. Kept verbatim.
 * • The card IS duplicated: `.ssr-variant.hidden-19fjg0f` (desktop + tablet, variant
 *   "Case 1 - Desktop") and `.ssr-variant.hidden-1lsm0lh.hidden-72rtr7` (phone, variant
 *   "Case 1 - Mobile"). Two copies, not three — desktop and tablet share one. Both are
 *   rendered and `app/framer/breakpoints.css` (`.hidden-*{display:none!important}`)
 *   picks one, exactly as Framer SSRs it.
 * • The two "Rounded Edge" notch corners are `<use href="#svg9271713167">` into Framer's
 *   runtime `<div id="svg-templates">` blob, and the arrow glyph is
 *   `<use href="#svg-524537509_605">`. That blob is page-level and is not part of this
 *   section, so both paths are INLINED here — the same call BlogCard / AboutParts made.
 *
 * ── The card is a 3-case carousel (MEASURED) ─────────────────────────────────────────
 * Source: the Framer codegen modules recovered from the runtime source maps —
 *   `SvM6hVcQs.js`  (the "Case" component, 6 variants)
 *   `IDUKsyYxT.js`  (the "Arrow button" component, 4 variants)
 *   `augiA20Il.js`  (the home page module — the props it feeds "Case")
 * all three inside `_source/behaviours/chunks/maps/y-tGuQz7…DcwpVv6A.mjs.map`
 * (`sourcesContent` indices 46 / 45 / 58). The SSR only contains Case 1 because that is
 * the component's `defaultVariant`; the arrows are live `onTap` → `setVariant` handlers,
 * so porting the SSR literally would ship three dead buttons.
 *
 *   variant id    human name          class          prev (left)      next (right)
 *   H__GGz3Xs     Case 1 - Desktop    framer-v-1a6jfam   Px6jT5rdX    pTBZoLqFV
 *   pTBZoLqFV     Case 2 - Desktop    framer-v-5uist2    H__GGz3Xs    Px6jT5rdX
 *   Px6jT5rdX     Case 3 - Desktop    framer-v-1227bag   pTBZoLqFV    H__GGz3Xs
 *   SyfSgWCHG     Case 1 - Mobile     framer-v-19uutte   QNeI0yc4g    GnzdMNSF4
 *   GnzdMNSF4     Case 2 - Mobile     framer-v-1fvzg7j   SyfSgWCHG    QNeI0yc4g
 *   QNeI0yc4g     Case 3 - Mobile     framer-v-1cs7tb2   GnzdMNSF4    SyfSgWCHG
 *
 * i.e. a plain wrapping prev/next cycle that never crosses the desktop/mobile axis.
 * Measured per-variant state:
 *   • Image 1 `.framer-1utw5db`  opacity 1 on Case 1, 0 elsewhere
 *   • Image 2 `.framer-bljbq`    opacity 1 on Case 2, 0 elsewhere
 *   • Image 3 `.framer-583ew5`   opacity 1 on Case 3, 0 elsewhere
 *   • the copy and the logo are MOUNTED/UNMOUNTED per case (`isDisplayed*()`), which is
 *     why each carries its own `data-framer-appear-id` and replays on every switch.
 *   • card-level `MotionConfig` transition — `transition1` in `SvM6hVcQs.js`:
 *     `{ type:"tween", duration:0.6, ease:[0.7,0,0.3,1], delay:0 }` → CARD_TRANSITION.
 *
 * ── Appear animations (MEASURED) ─────────────────────────────────────────────────────
 * Six `withOptimizedAppearEffect` nodes, two of which SSR (Case 1 is the default variant)
 * and are therefore in `lib/appear-specs.json`; the other four are identical in spec and
 * are declared locally because they never reach the SSR:
 *   copy   `tmq1pz` (case 1) · `16bmic` (case 2) · `1dxb760` (case 3)
 *          from {opacity:0.001, y:20} → {opacity:1, y:0}
 *          transition {type:"tween", delay:0.5, duration:0.5, ease:[0.12,0.23,0.5,1]}
 *   logo   `wvlein` (case 1) · `17wpmri` (case 2) · `hecz1n` (case 3)
 *          from {opacity:0.001, y:0} → {opacity:1}
 *          transition {type:"tween", delay:0.5, duration:3, ease:[0.12,0.23,0.5,1]}
 * `tmq1pz` / `wvlein` go through the shared `AppearMotion` primitive so their SSR'd
 * inline style stays byte-identical to Framer's; the other four use the same numbers.
 * `opacity: 0.001` (not 0) is Framer's paint-priming value — kept.
 *
 * ── Scroll reveals (PLAN.md §1.5 — MEASURED, `_source/behaviours/scroll-reveals.md`) ──
 * Two elements SSR as `style="will-change:transform;opacity:0;transform:translateY(30px)"`
 * with no appear id; ported literally they stay invisible forever:
 *   `.framer-17lmi98`          Heading      `animation2` (y 30) + `transition2`
 *   `.framer-1xguppw-container` case card   `animation2` (y 30) + `transition2`  ×2 copies
 * `augiA20Il.js` gives `animation2 = {opacity:0,…,x:0,y:30}` and
 * `transition2 = {type:"spring", stiffness:300, damping:60, mass:1, delay:0}` →
 * `ScrollReveal enter="up30" transition="t2"`, viewport `{once:true, amount:0.5}`.
 *
 * ── Arrow buttons (MEASURED — `IDUKsyYxT.js`) ────────────────────────────────────────
 *   variants  jL4TA8Gd7 "Right arrow" (framer-v-19n72rr, rotate 0, hover+press)
 *             V1HhZsELT "Left arrow"  (framer-v-2atiqc,  rotate 180, hover+press)
 *             IbyDhfzNn "Right mobile"(framer-v-7cgri0,  rotate 0, press only)
 *             NsgbYp2cR "Left mobile" (framer-v-1tt4x5j, rotate 180, press only)
 *   hover / press → icon holder `scale: 0.9` and the glyph fill swaps white → grey.
 *   transition    `{type:"tween", delay:0, duration:0.1, ease:[0.7,0,0.3,1]}`
 *   `data-framer-name` is REMOVED while hovered or pressed (addPropertyOverrides sets it
 *   to `undefined` on every gesture variant) — reproduced.
 *   The SSR'd arrow carries only `tabindex="0"` + `data-highlight="true"` — no `role`, no
 *   `aria-label` — so none is added here (structural 1:1).
 *   This file previously ALSO bound an `onKeyDown` Enter/Space handler here, on the
 *   assumption that the focusable arrow was otherwise keyboard-inert. It is not: motion's
 *   tap gesture already activates `onTap` from Enter/Space on a focusable element, so both
 *   fired and ONE key press advanced TWO cases (verified in a real browser). The handler
 *   is removed; keyboard activation still works, through motion alone.
 *   Additionally the page wraps ONLY the right arrow's container `.framer-2rr3zf-container`
 *   in `whileHover: {scale:1.1, transition:{type:"spring", bounce:0.25, duration:0.45}}`;
 *   the left container has no such effect. Not symmetric — verbatim from the source.
 *
 * ── Assets ───────────────────────────────────────────────────────────────────────────
 * Every URL is rewritten through `_source/asset-map.json` (all 16 SSR'd entries resolve).
 * Case 2's and Case 3's logos never appear in the SSR, so they were absent from the map;
 * they were fetched with the map's own naming scheme (`sha256(querystring).slice(0,8)`,
 * extension from the response `content-type` — see `tools/fetch-assets.mjs`) into
 * `public/assets/images/`. See CASE_LOGOS below. No framerusercontent.com URL ships.
 *
 * ── Copy ─────────────────────────────────────────────────────────────────────────────
 * Verbatim. None of BRIEF.md's three CONTENT OVERRIDES occur in this section; the
 * `data-framer-name="Notch"`-style structural strings are untouched.
 */

import * as React from "react";
import { motion, type Transition } from "motion/react";

import {
  AppearMotion,
  ScrollReveal,
  hiddenClassName,
  type ReducedMotionPolicy,
} from "@/components/primitives";

/* -------------------------------------------------------------------------- */
/* Measured constants                                                          */
/* -------------------------------------------------------------------------- */

/** Framer serialization hash for the "Case" component. */
export const CASE_SERIALIZATION_HASH = "framer-1Rhl8";

/** The shared-style class list Framer prepends to the card root, verbatim. */
const CASE_SCOPING_CLASS_NAMES =
  "framer-1Rhl8 framer-HFo8d framer-R1g06 framer-J5GKa framer-cl021 framer-lz3Y0 framer-O71PQ framer-dhPgH framer-Tx7FV framer-1a6jfam";

/** `transition1` in `SvM6hVcQs.js` — the card's `MotionConfig` default. */
export const CARD_TRANSITION = {
  type: "tween",
  delay: 0,
  duration: 0.6,
  ease: [0.7, 0, 0.3, 1],
} as const satisfies Transition;

/** `transition1` in `IDUKsyYxT.js` — the arrow button's `MotionConfig` default. */
export const ARROW_TRANSITION = {
  type: "tween",
  delay: 0,
  duration: 0.1,
  ease: [0.7, 0, 0.3, 1],
} as const satisfies Transition;

/** `transition4`/`animation4` in `SvM6hVcQs.js` — right arrow container only. */
export const RIGHT_ARROW_HOVER_TRANSITION = {
  type: "spring",
  bounce: 0.25,
  delay: 0,
  duration: 0.45,
} as const satisfies Transition;

/** `transition2` + `animation`/`animation1` in `SvM6hVcQs.js` (copy appear effect). */
const COPY_APPEAR_INITIAL = { opacity: 0.001, x: 0, y: 20 } as const;
const COPY_APPEAR_ANIMATE = { opacity: 1, x: 0, y: 0 } as const;
const COPY_APPEAR_TRANSITION = {
  type: "tween",
  delay: 0.5,
  duration: 0.5,
  ease: [0.12, 0.23, 0.5, 1],
} as const satisfies Transition;

/** `transition3` + `animation2`/`animation3` in `SvM6hVcQs.js` (logo appear effect). */
const LOGO_APPEAR_INITIAL = { opacity: 0.001, x: 0, y: 0 } as const;
const LOGO_APPEAR_ANIMATE = { opacity: 1, x: 0, y: 0 } as const;
const LOGO_APPEAR_TRANSITION = {
  type: "tween",
  delay: 0.5,
  duration: 3,
  ease: [0.12, 0.23, 0.5, 1],
} as const satisfies Transition;

/** `<svg viewBox="0 0 18 18" id="svg9271713167">` from Framer's `#svg-templates` blob. */
const NOTCH_EDGE_PATH = "M 0 18 L 18 18 C 8.059 18 0 9.941 0 0 Z";
const NOTCH_EDGE_FILL =
  "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";

/** `<svg viewBox="0 0 14 12.251" id="svg-524537509_605">` — the arrow glyph. */
const ARROW_GLYPH_PATH =
  "M 0 6.125 C 0 5.642 0.392 5.251 0.875 5.251 L 11.012 5.251 L 7.255 1.495 C 6.913 1.153 6.913 0.599 7.255 0.257 C 7.597 -0.086 8.151 -0.086 8.494 0.257 L 13.743 5.506 C 13.908 5.67 14 5.893 14 6.125 C 14 6.358 13.908 6.581 13.743 6.745 L 8.494 11.994 C 8.151 12.336 7.597 12.336 7.255 11.994 C 6.913 11.652 6.913 11.098 7.255 10.755 L 11.012 7 L 0.875 7 C 0.392 7 0 6.609 0 6.125";
const ARROW_GLYPH_FILL_REST =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const ARROW_GLYPH_FILL_ACTIVE =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";

/** Every photo in this section shares one `sizes` string (verbatim from the SSR). */
const PHOTO_SIZES =
  "(min-width: 1200px) min(100vw - 80px, 950px), (min-width: 810px) and (max-width: 1199.98px) min(100vw - 80px, 950px), (max-width: 809.98px) min(100vw - 48px, 950px)";

const PHOTO_IMG_STYLE: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  cornerShape: "inherit",
  objectPosition: "center",
  objectFit: "cover",
} as React.CSSProperties;

const BACKGROUND_IMAGE_WRAPPER_STYLE: React.CSSProperties = {
  position: "absolute",
  borderRadius: "inherit",
  cornerShape: "inherit",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Case data — MEASURED from `augiA20Il.js` + `SvM6hVcQs.js` defaults           */
/* -------------------------------------------------------------------------- */

interface CasePhoto {
  /** `.framer-…` class on the image frame. */
  readonly className: string;
  readonly width: number;
  readonly height: number;
  readonly src: string;
  readonly srcSet: string;
  readonly alt: string;
  readonly framerName: string;
  /** Image 3 is the only one whose frame is not `inset: 0`. */
  readonly index: 0 | 1 | 2;
}

/**
 * Image 1 and Image 3 are the "Case" component's own defaults (`y96Nc_xui`,
 * `nMAF1y13g`); Image 2 is the home page's override (`nV7uiAUbd` — the component default
 * `64l3Qidyw4y3D5wng0mTJwvxA.jpg` is never used on this route).
 */
const CASE_PHOTOS: readonly CasePhoto[] = [
  {
    className: "framer-1utw5db",
    framerName: "Image 1",
    index: 0,
    width: 1495,
    height: 1024,
    src: "/assets/images/ai/case-1-1495.jpg",
    srcSet:
      "/assets/images/ai/case-1-512.jpg 512w,/assets/images/ai/case-1-1024.jpg 1024w,/assets/images/ai/case-1-1495.jpg 1495w",
    alt: "colleagues collaborating around a meeting table with laptops",
  },
  {
    className: "framer-bljbq",
    framerName: "Image 2",
    index: 1,
    width: 1536,
    height: 995,
    src: "/assets/images/ai/c-2-1536.jpg",
    srcSet:
      "/assets/images/ai/c-2-512.jpg 512w,/assets/images/ai/c-2-1024.jpg 1024w,/assets/images/ai/c-2-1536.jpg 1536w",
    alt: "two coordinators reviewing shipment dashboards on large monitors",
  },
  {
    className: "framer-583ew5",
    framerName: "Image 3",
    index: 2,
    width: 1536,
    height: 1024,
    src: "/assets/images/ai/c-3-1536.jpg",
    srcSet:
      "/assets/images/ai/c-3-512.jpg 512w,/assets/images/ai/c-3-1024.jpg 1024w,/assets/images/ai/c-3-1536.jpg 1536w",
    alt: "a support specialist wearing a headset at a call desk",
  },
] as const;

interface CaseLogo {
  /** `.framer-…` class on the logo frame. */
  readonly className: string;
  /** `data-framer-appear-id`. */
  readonly appearId: string;
  readonly framerName: string;
  readonly width: number;
  readonly height: number;
  readonly src: string;
  /** `fitImageDimension: "width"` + the frame's 20px height → width / height. */
  readonly aspectRatio: string;
}

/**
 * The four client engagements, replacing Framer's three LOGOIPSUM placeholders
 * (`EJOO9LjM3` / `DLtniT0uI` / `ogT1MFzvL` in `augiA20Il.js`).
 *
 * Only ONE logo is in the DOM at a time (`CASE_LOGOS[active]`), so the fourth entry
 * safely reuses `framer-wvlein` and its appear id: all three original classes share a
 * single CSS rule (`.framer-1Rhl8 .framer-wvlein,…{height:20px;width:auto}`), and the
 * duplicate can never co-exist with the original.
 *
 * `width`/`height` are each asset's real pixel size and `aspectRatio` is derived from
 * them, because the frame sizes on height (20px) and lets width follow.
 *
 * Logo treatment (`public/assets/images/clients/`): ProPac and Diexus publish only a
 * dark-ink lockup, so they are rendered flat white; MIMA and Asmar already publish a
 * light-on-dark lockup and are used unmodified, which keeps MIMA's "INC" badge and
 * Asmar's striped roundel intact.
 */
const CASE_LOGOS: readonly CaseLogo[] = [
  {
    className: "framer-wvlein",
    appearId: "wvlein",
    framerName: "ProPac Solution",
    width: 563,
    height: 120,
    src: "/assets/images/clients/propac-solution.png",
    aspectRatio: "4.692",
  },
  {
    className: "framer-17wpmri",
    appearId: "17wpmri",
    framerName: "Diexus",
    width: 418,
    height: 120,
    src: "/assets/images/clients/diexus.png",
    aspectRatio: "3.483",
  },
  {
    className: "framer-hecz1n",
    appearId: "hecz1n",
    framerName: "MIMA Group",
    width: 363,
    height: 120,
    src: "/assets/images/clients/mima-group.png",
    aspectRatio: "3.025",
  },
  {
    className: "framer-wvlein",
    appearId: "wvlein",
    framerName: "Asmar Paints",
    width: 443,
    height: 120,
    src: "/assets/images/clients/asmar-paints.png",
    aspectRatio: "3.692",
  },
] as const;

/**
 * Per-case copy, one per client engagement, taken from the company profile deck
 * (§06 Client Work). Every figure below comes from that deck rather than
 * being estimated. Replaces Framer's placeholder strings (`LR7WpSS4Y` / `N6hYQiDGz` /
 * `OB1HRTUWu`).
 *
 * MIMA's engagement is described by what the system does rather than by a product name,
 * so no other company's product brand appears on this site.
 */
const CASE_COPY: readonly React.ReactNode[] = [
  "Sales and content Digital FTEs run outbound prospecting and social publishing on an isolated instance. Built over a catalogue of 7 categories, 39 product types and 254 stock sizes.",
  "A Digital FTE sales team runs outbound to shippers and distributors and books the call. Shipment exception, compliance and supplier scoring agents follow across four execution phases.",
  "A Digital FTE call centre takes group enquiries, routes them by sector and escalates with full context. Delivered on an archive-driven site of 6 pages and 5 shared components.",
  "A Digital FTE sales team prospects contractors, developers and trade buyers, then books the visit. Sits on a 17-product catalogue with a colour visualiser across 72 finishes.",
];

/** `data-framer-appear-id` on each case's copy node. */
const CASE_COPY_APPEAR = [
  { className: "framer-tmq1pz", appearId: "tmq1pz" },
  { className: "framer-16bmic", appearId: "16bmic" },
  { className: "framer-1dxb760", appearId: "1dxb760" },
  /* Case 4 reuses case 2's node: the three share one CSS rule and only the active case
     is ever in the DOM, so the appear id cannot be duplicated on the page. */
  { className: "framer-16bmic", appearId: "16bmic" },
] as const;

/** `variantClassNames` in `SvM6hVcQs.js`, ordered [case1, case2, case3]. */
const CASE_VARIANT_CLASS = {
  desktop: ["framer-v-1a6jfam", "framer-v-5uist2", "framer-v-1227bag", "framer-v-5uist2"],
  mobile: ["framer-v-19uutte", "framer-v-1fvzg7j", "framer-v-1cs7tb2", "framer-v-1fvzg7j"],
} as const;

/** `humanReadableVariantMap` in `SvM6hVcQs.js`. */
const CASE_VARIANT_NAME = {
  desktop: ["Case 1 - Desktop", "Case 2 - Desktop", "Case 3 - Desktop", "Case 4 - Desktop"],
  mobile: ["Case 1 - Mobile", "Case 2 - Mobile", "Case 3 - Mobile", "Case 4 - Mobile"],
} as const;

type CardLayout = keyof typeof CASE_VARIANT_CLASS;

/* -------------------------------------------------------------------------- */
/* Rounded Edge (`<use href="#svg9271713167">` inlined)                        */
/* -------------------------------------------------------------------------- */

const SVG_HOST_PROPS = {
  parentsize: "0",
  _constraints: "[object Object]",
  rotation: "0",
  shadows: "",
} as Record<string, string>;

function RoundedEdge({
  outerClassName,
  svgClassName,
  rotate,
}: {
  outerClassName: string;
  svgClassName: string;
  rotate: 90 | 270;
}): React.ReactElement {
  return (
    <div
      className={outerClassName}
      data-framer-name="Rounded Edge"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        data-framer-component-type="SVG"
        data-framer-name="Vector"
        {...SVG_HOST_PROPS}
        className={svgClassName}
        aria-hidden="true"
        style={{ imageRendering: "pixelated", flexShrink: 0 }}
      >
        <div
          className="svgContainer"
          style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
        >
          <svg viewBox="0 0 18 18" style={{ width: "100%", height: "100%" }}>
            <path d={NOTCH_EDGE_PATH} fill={NOTCH_EDGE_FILL} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Arrow button (`IDUKsyYxT.js`)                                               */
/* -------------------------------------------------------------------------- */

const ARROW_VARIANT_CLASS = {
  "right-desktop": "framer-v-19n72rr",
  "left-desktop": "framer-v-2atiqc",
  "right-mobile": "framer-v-7cgri0",
  "left-mobile": "framer-v-1tt4x5j",
} as const;

const ARROW_VARIANT_NAME = {
  "right-desktop": "Right arrow",
  "left-desktop": "Left arrow",
  "right-mobile": "Right mobile",
  "left-mobile": "Left mobile",
} as const;

type ArrowVariant = keyof typeof ARROW_VARIANT_CLASS;

function ArrowButton({
  variant,
  onActivate,
}: {
  variant: ArrowVariant;
  onActivate: () => void;
}): React.ReactElement {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  /** `enabledGestures` — hover exists only on the two desktop variants. */
  const hoverEnabled = variant === "right-desktop" || variant === "left-desktop";
  const gestureActive = (hoverEnabled && hovered) || pressed;
  const rotate = variant.startsWith("left") ? 180 : 0;

  return (
    <motion.div
      className={`framer-eAdjt framer-19n72rr ${ARROW_VARIANT_CLASS[variant]}`}
      // Framer removes `data-framer-name` on every gesture variant.
      {...(gestureActive ? {} : { "data-framer-name": ARROW_VARIANT_NAME[variant] })}
      data-highlight="true"
      tabIndex={0}
      style={{
        height: "100%",
        width: "100%",
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setPressed(true)}
      onTapCancel={() => setPressed(false)}
      onTap={() => {
        setPressed(false);
        onActivate();
      }}
    >
      <motion.div
        className="framer-hs5j6p"
        data-framer-name="Icon holder"
        initial={{ rotate, scale: 1 }}
        animate={{ rotate, scale: gestureActive ? 0.9 : 1 }}
        transition={ARROW_TRANSITION}
      >
        <div
          data-framer-component-type="SVG"
          {...SVG_HOST_PROPS}
          className="framer-1jmpr6r"
          aria-hidden="true"
          style={{ imageRendering: "pixelated", flexShrink: 0 }}
        >
          <div
            className="svgContainer"
            style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
          >
            <svg
              viewBox="0 0 14 12.251"
              overflow="visible"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d={ARROW_GLYPH_PATH}
                fill={gestureActive ? ARROW_GLYPH_FILL_ACTIVE : ARROW_GLYPH_FILL_REST}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* The card (`SvM6hVcQs.js`)                                                   */
/* -------------------------------------------------------------------------- */

function CaseCard({
  layout,
  reducedMotion,
}: {
  layout: CardLayout;
  reducedMotion?: ReducedMotionPolicy;
}): React.ReactElement {
  const [active, setActive] = React.useState(0);

  const copy = CASE_COPY_APPEAR[active];
  const logo = CASE_LOGOS[active];
  const prev = (active + CASE_COPY.length - 1) % CASE_COPY.length;
  const next = (active + 1) % CASE_COPY.length;

  const copyNode = (
    <p className="framer-text framer-styles-preset-13jy9hb">{CASE_COPY[active]}</p>
  );

  return (
    <div
      className={`${CASE_SCOPING_CLASS_NAMES} ${CASE_VARIANT_CLASS[layout][active]}`}
      data-framer-name={CASE_VARIANT_NAME[layout][active]}
      style={{
        maxWidth: "100%",
        width: "100%",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <div className="framer-ctungi" data-framer-name="Text">
        {active === 0 ? (
          <AppearMotion
            key="tmq1pz"
            id="tmq1pz"
            as="div"
            reducedMotion={reducedMotion}
            className={copy.className}
            data-framer-component-type="RichTextContainer"
            style={
              {
                "--framer-link-text-color": "rgb(0, 153, 255)",
                "--framer-link-text-decoration": "underline",
              } as React.CSSProperties
            }
          >
            {copyNode}
          </AppearMotion>
        ) : (
          <motion.div
            key={copy.appearId}
            className={copy.className}
            data-framer-appear-id={copy.appearId}
            data-framer-component-type="RichTextContainer"
            initial={COPY_APPEAR_INITIAL}
            animate={COPY_APPEAR_ANIMATE}
            transition={COPY_APPEAR_TRANSITION}
            style={
              {
                willChange: "transform",
                "--framer-link-text-color": "rgb(0, 153, 255)",
                "--framer-link-text-decoration": "underline",
              } as React.CSSProperties
            }
          >
            {copyNode}
          </motion.div>
        )}
      </div>

      <div
        className="framer-1wqybup"
        data-framer-name="Image container"
        style={
          {
            mask: "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.85) 90%) intersect",
            WebkitMask:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.85) 90%) intersect",
          } as React.CSSProperties
        }
      >
        {CASE_PHOTOS.map((photo) => (
          <motion.div
            key={photo.className}
            className={photo.className}
            data-framer-name={photo.framerName}
            initial={{ opacity: photo.index === 0 ? 1 : 0 }}
            /* Three stock photos serve four cases: case 4 re-shows the first photo.
               Only the copy and the client logo change with it. */
            animate={{ opacity: photo.index === active % CASE_PHOTOS.length ? 1 : 0 }}
            transition={CARD_TRANSITION}
            style={{
              borderBottomLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <div
              style={BACKGROUND_IMAGE_WRAPPER_STYLE}
              data-framer-background-image-wrapper="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                decoding="async"
                loading="lazy"
                width={photo.width}
                height={photo.height}
                sizes={PHOTO_SIZES}
                srcSet={photo.srcSet}
                src={photo.src}
                alt={photo.alt}
                style={PHOTO_IMG_STYLE}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="framer-hwg2w"
        data-framer-name="Logo"
        style={{
          backgroundColor: "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
          borderBottomRightRadius: "20px",
        }}
      >
        <RoundedEdge
          outerClassName="framer-3owrls"
          svgClassName="framer-1b0qg2k"
          rotate={90}
        />
        <RoundedEdge
          outerClassName="framer-zyiu0v"
          svgClassName="framer-1x5la15"
          rotate={90}
        />
        {active === 0 ? (
          <AppearMotion
            key="wvlein"
            id="wvlein"
            as="div"
            reducedMotion={reducedMotion}
            className={logo.className}
            data-framer-name={logo.framerName}
            style={{ width: "auto", aspectRatio: logo.aspectRatio }}
          >
            <LogoImage logo={logo} />
          </AppearMotion>
        ) : (
          <motion.div
            key={logo.appearId}
            className={logo.className}
            data-framer-appear-id={logo.appearId}
            data-framer-name={logo.framerName}
            initial={LOGO_APPEAR_INITIAL}
            animate={LOGO_APPEAR_ANIMATE}
            transition={LOGO_APPEAR_TRANSITION}
            style={{
              willChange: "transform",
              width: "auto",
              aspectRatio: logo.aspectRatio,
            }}
          >
            <LogoImage logo={logo} />
          </motion.div>
        )}
      </div>

      <div
        className="framer-1k4jk1y"
        data-framer-name="Button"
        style={{
          backgroundColor: "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
          borderTopLeftRadius: "20px",
        }}
      >
        <RoundedEdge
          outerClassName="framer-cr1zyc"
          svgClassName="framer-ksh8kk"
          rotate={270}
        />
        <RoundedEdge
          outerClassName="framer-bo9lzb"
          svgClassName="framer-csmocu"
          rotate={270}
        />
        <div className="framer-4y7r0k" data-framer-name="Button container">
          <div className="framer-bbrlun-container">
            <ArrowButton
              variant={layout === "mobile" ? "left-mobile" : "left-desktop"}
              onActivate={() => setActive(prev)}
            />
          </div>
          {/* Only the RIGHT container carries `whileHover` — measured, not symmetric. */}
          <motion.div
            className="framer-2rr3zf-container"
            whileHover={{ scale: 1.1 }}
            transition={RIGHT_ARROW_HOVER_TRANSITION}
          >
            <ArrowButton
              variant={layout === "mobile" ? "right-mobile" : "right-desktop"}
              onActivate={() => setActive(next)}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LogoImage({ logo }: { logo: CaseLogo }): React.ReactElement {
  return (
    <div
      style={BACKGROUND_IMAGE_WRAPPER_STYLE}
      data-framer-background-image-wrapper="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        decoding="async"
        loading="lazy"
        width={logo.width}
        height={logo.height}
        src={logo.src}
        alt=""
        style={PHOTO_IMG_STYLE}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export interface CaseStudySectionProps {
  /**
   * Forwarded to every `ScrollReveal` / `AppearMotion` in this section. Defaults to the
   * project-wide `DEFAULT_REDUCED_MOTION_POLICY` (`"settle"`).
   */
  reducedMotion?: ReducedMotionPolicy;
}

export function CaseStudySection({
  reducedMotion,
}: CaseStudySectionProps = {}): React.ReactElement {
  return (
    <section className="framer-ckfsee" data-framer-name="Case Study">
      <ScrollReveal
        as="div"
        enter="up30"
        transition="t2"
        reducedMotion={reducedMotion}
        className="framer-17lmi98"
        data-framer-name="Heading"
      >
        {/* Bare `.ssr-variant` — the badge is NOT duplicated per breakpoint. */}
        <div className="ssr-variant">
          <div className="framer-84n3xa-container">
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
                  Case study
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="framer-ayd6j9"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <h2
            className="framer-text framer-styles-preset-1uc0rn1"
            data-styles-preset="f6v2ro_B_"
            style={{ "--framer-text-alignment": "center" } as React.CSSProperties}
          >
            How Businesses Use Our AI to Scale Faster
          </h2>
        </div>
      </ScrollReveal>

      {/* Desktop + tablet copy of the card. */}
      <div className={`ssr-variant ${hiddenClassName("home", "phone")}`}>
        <ScrollReveal
          as="div"
          enter="up30"
          transition="t2"
          reducedMotion={reducedMotion}
          className="framer-1xguppw-container"
        >
          <CaseCard layout="desktop" reducedMotion={reducedMotion} />
        </ScrollReveal>
      </div>

      {/* Phone copy of the card. */}
      <div
        className={`ssr-variant ${hiddenClassName("home", "tablet")} ${hiddenClassName("home", "desktop")}`}
      >
        <ScrollReveal
          as="div"
          enter="up30"
          transition="t2"
          reducedMotion={reducedMotion}
          className="framer-1xguppw-container"
        >
          <CaseCard layout="mobile" reducedMotion={reducedMotion} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CaseStudySection;
