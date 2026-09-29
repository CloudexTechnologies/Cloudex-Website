"use client";

/**
 * Home page — section 03 "Hero".
 *
 * Source of truth
 * ---------------
 * `_source/live/home.html` bytes 286421–315730 (`_source/structure/home.md` §03), read back
 * against `_source/rendered/home.{desktop,tablet,phone}.html` for the post-hydration DOM.
 * Behaviour numbers come from `_source/behaviours/hero-entrance.md`,
 * `_source/behaviours/logo-marquee.md`, `_source/behaviours/rolling-text.md` and
 * `_source/behaviours/cta-button.md` — every one of them MEASURED from Framer's own source
 * maps. Nothing here is invented.
 *
 * DOM shape (SSR, verbatim)
 * -------------------------
 *   section.framer-1dastbz[data-framer-name=Hero]
 *     div.framer-pskmbs[Placeholder]
 *       div.framer-8y3y06[content]              ← appear 8y3y06
 *         div.ssr-variant                        (no hidden-* class: one copy serves all 3)
 *           div.framer-1x6uj5v-container
 *             div.framer-BRQVJ.framer-TPaq9.framer-1wlzku5.framer-v-1wlzku5[Half]
 *                                                ← appear 1wlzku5, the "New" badge
 *         div.framer-4ojp6g[Heading + subheading]
 *         div.framer-kl8vp3[Cta]                 ← 2 buttons × 2 ssr-variant copies
 *       div.framer-1n4jtxs-container > video
 *       div.framer-12o154i[Masking]              ← EMPTY div, all appearance from CSS
 *       div.framer-2xxwzy[Logos]
 *         div.framer-1z0g9c4[Right]  > SVG notch
 *         div.framer-fgh9n2[Logos]   > div.framer-113vnbk-container > <Marquee>
 *         div.framer-1l385vd[Left]   > SVG notch
 *
 * Four things that are load-bearing and easy to lose
 * --------------------------------------------------
 * 0. The badge is a VARIANT-SWITCHING component and the SSR is only its FIRST frame.
 *    SSR = "Half" (just the blue "New" pill); 1.6 s after mount the component flips itself
 *    to "Full" and grows a second RichText reading "Custom AI Agents". See `HeroBadge`.
 * 1. `.framer-12o154i` ("Masking") is a 61-byte EMPTY div. Its entire appearance is the
 *    `background-color` + double `mask: linear-gradient(...)` in `app/framer/layout.css`.
 *    Delete it and the hero's top/bottom veil and the marquee's edge mask vanish.
 * 2. The hero CTA anchors carry NO `data-border` attribute — checked in both the SSR and
 *    the rendered capture (the badge is the only `data-border` node in this section). The
 *    `[data-border=true]::after` overlay therefore never paints for them, so the button's
 *    measured hover border is a visual no-op here. The `--border-*` hover variant is still
 *    driven, because that is what Framer's CTA-button module does.
 * 3. Only TWO appear ids belong to this section: `8y3y06` and `1wlzku5`. `tmq1pz` and
 *    `wvlein` live at byte offsets 689055/705227 — a later section entirely, despite
 *    `hero-entrance.md` describing all four under one heading.
 *
 * `use client` because of AppearMotion / RollingText / Marquee and the <video> ref.
 */

import * as React from "react";

import { BOOKING_URL } from "@/lib/booking";
import { motion, useReducedMotion } from "motion/react";
import type { Transition, Variants } from "motion/react";

import {
  AppearMotion,
  Marquee,
  RollingText,
  type ReducedMotionPolicy,
  type RollingTextTone,
} from "@/components/primitives";
import { INSTANT_TRANSITION, getAppearMotionProps } from "@/lib/appear";
import {
  CTA_BUTTON_SERIALIZATION_HASH,
  CTA_BUTTON_TRANSITION,
  CTA_BUTTON_VARIANT_CLASS_NAMES,
} from "@/components/shared/CtaBand";
import { hiddenClassName, useBreakpointHash } from "@/lib/breakpoints";

/* -------------------------------------------------------------------------- */
/* Scope + breakpoint classes                                                  */
/* -------------------------------------------------------------------------- */

/** PLAN.md §1.1 — home: desktop `72rtr7` · tablet `1lsm0lh` · phone `19fjg0f`. */
const SCOPE = "home" as const;

/** Hides the copy AT phone → this is the desktop + tablet copy. */
const HIDDEN_AT_PHONE = hiddenClassName(SCOPE, "phone");
/** Hides the copy AT tablet and desktop → this is the phone copy. Framer emits them in
 *  this order: `hidden-1lsm0lh hidden-72rtr7`. */
const HIDDEN_AT_TABLET_AND_DESKTOP = `${hiddenClassName(SCOPE, "tablet")} ${hiddenClassName(
  SCOPE,
  "desktop",
)}`;

/* -------------------------------------------------------------------------- */
/* Copy — verbatim from the SSR, except HERO_SUBHEADING (Digital FTE positioning) */
/* -------------------------------------------------------------------------- */

export const HERO_BADGE_TEXT = "Your";
export const HERO_HEADING = "We Make AI Work for You Not Against You.";
export const HERO_SUBHEADING =
  "We build Digital FTEs: AI employees that take the busywork off your team, so your people can do their best work.";

/**
 * The two CTAs. `href` values are verbatim — including the live site's capitalised
 * `https://Cal.com` and the relative `./#solutions`.
 *
 * `uuids` are `[desktop+tablet copy, phone copy]`, in SSR document order; all four have a
 * `.rolling-text-inner-<uuid>` rule in `app/framer/components.css`, which is why
 * `selfContained={false}` is safe (it emits the bare class, matching Framer byte for byte).
 */
const HERO_CTAS = [
  {
    containerClassName: "framer-cy1zhg-container",
    label: "Book a call",
    href: BOOKING_URL,
    tone: "Light",
    uuids: [
      "d03a8178-4024-4ea5-9a88-02749a1e259e",
      "93e554f7-6877-4bd3-991c-8a7237b7d49c",
    ],
  },
  {
    containerClassName: "framer-1wszbvn-container",
    label: "View services",
    href: "./#solutions",
    tone: "Dark",
    uuids: [
      "4e6b18d0-b544-408d-a95c-63f37f92c648",
      "811ce907-26ca-4e6a-baaa-629b663f5dea",
    ],
  },
] as const satisfies readonly {
  containerClassName: string;
  label: string;
  href: string;
  tone: RollingTextTone;
  uuids: readonly [string, string];
}[];

/* -------------------------------------------------------------------------- */
/* Background video — MEASURED                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Light-theme hero video: an isometric office of blue-and-white robots on white, made for
 * the light theme (it replaces Framer's dark original,
 * `/assets/images/DJis4jbvxfiPHNnoy09s1NXK2tY.mp4`).
 *
 * Encoded from the 2560×1440 master `public/hero-bg.mp4` to 1920×1080 with no audio (the
 * hero is always muted): VP9 WebM first (~0.5 MB), H.264 MP4 fallback (~0.7 MB) for
 * browsers without VP9, and a WebP poster so the first paint is the scene, not a blank box.
 */
export const HERO_VIDEO_SOURCES = [
  { src: "/hero-bg.webm", type: "video/webm" },
  { src: "/hero-bg-1080.mp4", type: "video/mp4" },
] as const;
export const HERO_VIDEO_POSTER = "/hero-bg-poster.webp";

/**
 * MEASURED inline style on the `<video>`, byte for byte.
 * `.framer-1n4jtxs-container` supplies `opacity:.5; inset:0; position:absolute; z-index:1`.
 */
const HERO_VIDEO_STYLE: React.CSSProperties = {
  cursor: "auto",
  width: "100%",
  height: "100%",
  borderRadius: "0px",
  display: "block",
  objectFit: "cover",
  backgroundColor: "rgba(0, 0, 0, 0)",
  objectPosition: "50% 50%",
};

/** See the glow `<div>` in `HeroSection`. */
const HERO_COPY_GLOW_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background:
    "radial-gradient(ellipse 46% 40% at 50% 47%, rgba(232, 249, 255, 0.94) 0%, rgba(232, 249, 255, 0.78) 45%, rgba(232, 249, 255, 0) 100%)",
};

/**
 * Framer SSRs `loop preload="none" muted playsinline` and then, on hydration, flips
 * `preload` to `"auto"` and ADDS `autoplay` (compare `_source/live/home.html` with
 * `_source/rendered/home.desktop.html`). We render the post-hydration attribute set
 * directly — there is no autoplay without it, and a two-phase swap would only cost a
 * hydration mismatch.
 *
 * The ref is belt-and-braces: React does not always reflect `muted` as an ATTRIBUTE in the
 * SSR'd HTML, and Chrome refuses to autoplay a video whose `muted` property is false.
 * There is no `poster` on the original (`preload="none"` + `opacity:.5` is the whole
 * first-paint story), so none is invented here.
 */
function HeroVideo(): React.ReactElement {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    el.muted = true;
    const played = el.play();
    if (played !== undefined) void played.catch(() => undefined);
  }, []);

  return (
    <video
      ref={ref}
      poster={HERO_VIDEO_POSTER}
      loop
      preload="auto"
      muted
      playsInline
      autoPlay
      aria-hidden="true"
      style={HERO_VIDEO_STYLE}
    >
      {HERO_VIDEO_SOURCES.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}

/* -------------------------------------------------------------------------- */
/* "New / Custom AI Agents" badge — a VARIANT-SWITCHING component               */
/* -------------------------------------------------------------------------- */

/**
 * The single biggest trap in this section: the SSR is NOT the final state.
 *
 * `_source/live/home.html` SSRs the badge on its default variant `UQ9MbRfxH`
 * (`framer-v-1wlzku5`, `data-framer-name="Half"`) — just the blue "New" pill. All three
 * `_source/rendered/home.*.html` captures show `framer-v-4gay13` /
 * `data-framer-name="Full"` with a SECOND RichText, `.framer-1uas8sm`, reading
 * "Custom AI Agents". Port the SSR literally and the badge is permanently half-built.
 *
 * MEASURED from the badge module's own source
 * (`_source/behaviours/chunks/y-tGuQz7XPPTEFCnbfLGyixHGBVrBORQEKbNuIp0in4.DcwpVv6A.mjs`,
 * serializationHash `framer-BRQVJ`):
 *
 *   variantClassNames = { Rr5OOdPkq: "framer-v-4gay13",   // "Full"
 *                         UQ9MbRfxH: "framer-v-1wlzku5" } // "Half", the default
 *   useOnAppear(baseVariant, { default: async () => {
 *       await delay(() => setVariant("Rr5OOdPkq"), 1600)   // ← 1600 ms
 *   }})
 *   subtree MotionConfig transition = { type: "spring", bounce: 0.2, delay: 0, duration: 1.8 }
 *   the Full-only child renders `text` prop `dWJ1TCzdd`, which the home instance
 *   (node `yRQjpHYr6`) sets to "Custom AI Agents".
 *
 * So: mount on Half; 1.6 s later flip to Full, which mounts `.framer-1uas8sm` and changes
 * the shell's padding to `2px 10px 2px 2px` (`.framer-BRQVJ.framer-v-4gay13.framer-1wlzku5`),
 * and let a layout spring carry the width change. That lands 0.1 s AFTER the 1.5 s appear
 * animation starts — the pill fades in, then immediately unfurls.
 *
 * This root cannot use `AppearMotion`: the primitive owns `transition` outright, so the
 * layout spring would inherit the appear transition's 1.5 s delay and the morph would
 * stall. It therefore drives the SAME measured spec directly through
 * `getAppearMotionProps("1wlzku5", hash)` — the data path is unchanged, only the element
 * is local — and adds `transition.layout`.
 *
 * `layout` is on all four nodes that carry a `layoutId` in Framer's source
 * (root, `.framer-15ynzux`, `.framer-1m59l4y`, `.framer-1uas8sm`); without it on the
 * children, motion scales the "New" pill's text while the shell grows.
 */

/** MEASURED — `delay(() => setVariant("Rr5OOdPkq"), 1600)`. */
export const HERO_BADGE_MORPH_DELAY_MS = 1600;

/** MEASURED — the badge subtree's `MotionConfig` transition. */
export const HERO_BADGE_MORPH_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.2,
  delay: 0,
  duration: 1.8,
};

/** Instance prop `dWJ1TCzdd` on node `yRQjpHYr6`. Was "Custom AI Agents" (MEASURED); rewritten
 *  at the client's request to the positioning line. */
export const HERO_BADGE_FEATURE_TEXT = "AI & Technology Partner";

const BADGE_VARIANT_CLASS_NAMES = {
  Half: "framer-v-1wlzku5",
  Full: "framer-v-4gay13",
} as const;

/** MEASURED inline style on the shell, minus `opacity` / `transform` (the animation owns those). */
const BADGE_SHELL_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color":
    "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))",
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  backgroundColor: "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))",
  willChange: "transform",
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
} as React.CSSProperties;

const BADGE_RICH_TEXT_STYLE = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
} as React.CSSProperties;

function HeroBadge({
  reducedMotion = "settle",
  disabled = false,
}: {
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}): React.ReactElement {
  const hash = useBreakpointHash(SCOPE);
  const prefersReduced = useReducedMotion();
  const spec = getAppearMotionProps("1wlzku5", hash);

  // SSR + first client render must be `false`, or hydration diverges from the SSR'd DOM.
  const [full, setFull] = React.useState(false);

  React.useEffect(() => {
    if (disabled) {
      setFull(true);
      return;
    }
    const timer = window.setTimeout(() => setFull(true), HERO_BADGE_MORPH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [disabled]);

  const snap =
    disabled || (reducedMotion === "settle" && prefersReduced === true);

  const appearTransition =
    spec === undefined
      ? INSTANT_TRANSITION
      : snap
        ? INSTANT_TRANSITION
        : spec.transition;

  const layoutTransition = snap ? INSTANT_TRANSITION : HERO_BADGE_MORPH_TRANSITION;

  const variant = full ? "Full" : "Half";

  return (
    <motion.div
      className={`framer-BRQVJ framer-TPaq9 framer-1wlzku5 ${BADGE_VARIANT_CLASS_NAMES[variant]}`}
      data-border="true"
      data-framer-appear-id="1wlzku5"
      data-framer-name={variant}
      data-highlight="true"
      layout
      layoutDependency={variant}
      initial={spec?.initial}
      animate={spec?.animate}
      transition={{ ...appearTransition, layout: layoutTransition }}
      style={BADGE_SHELL_STYLE}
    >
      <motion.div
        className="framer-15ynzux"
        data-framer-name="new"
        layout
        layoutDependency={variant}
        transition={{ layout: layoutTransition }}
        style={{
          backgroundColor:
            "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <motion.div
          className="framer-1m59l4y"
          data-framer-component-type="RichTextContainer"
          layout
          layoutDependency={variant}
          transition={{ layout: layoutTransition }}
          style={BADGE_RICH_TEXT_STYLE}
        >
          <p
            className="framer-text framer-styles-preset-141u1yr"
            data-styles-preset="pAzayDUZg"
          >
            {HERO_BADGE_TEXT}
          </p>
        </motion.div>
      </motion.div>
      {full ? (
        <motion.div
          className="framer-1uas8sm"
          data-framer-component-type="RichTextContainer"
          layout
          layoutDependency={variant}
          transition={{ layout: layoutTransition }}
          style={BADGE_RICH_TEXT_STYLE}
        >
          <p
            className="framer-text framer-styles-preset-141u1yr"
            data-styles-preset="pAzayDUZg"
          >
            {HERO_BADGE_FEATURE_TEXT}
          </p>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA button — Framer's "CTA button" module (`NqOBQqRTG.js`)                   */
/* -------------------------------------------------------------------------- */

/** `.framer-1pxacyp` — `style {scale: 1}`, `"<variant>-hover": {scale: 1.05}`. MEASURED. */
const CTA_TEXT_VARIANTS: Variants = { hover: { scale: 1.05 } };

/** MEASURED rest/hover colours — `cta-button.md` §"Rest state" / §"Hover". */
const CTA_SHELL = {
  Light: {
    backgroundColor:
      "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
    hoverBorderColor:
      "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
  },
  Dark: {
    backgroundColor:
      "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))",
    hoverBorderColor: "rgba(255, 255, 255, 0.1)",
  },
} as const satisfies Record<
  RollingTextTone,
  { backgroundColor: string; hoverBorderColor: string }
>;

interface HeroCtaButtonProps {
  label: string;
  href: string;
  tone: RollingTextTone;
  rollingTextUuid: string;
  reducedMotion?: ReducedMotionPolicy;
}

/**
 * `components/shared/CtaBand.tsx` implements this button but keeps `CtaButton` private,
 * and its copy emits `data-border="true"` — correct for the CTA band, wrong here (the hero
 * anchors have no such attribute in either capture). Every MEASURED constant is imported
 * from `CtaBand`; only the shell colours, which it keeps private, are spelled out above.
 *
 * `whileHover` on the `<a>` with NAMED variants on the child is what propagates hover to
 * `.framer-1pxacyp`'s 1.05 scale while leaving `RollingText` on its own mouse-enter state.
 */
function HeroCtaButton({
  label,
  href,
  tone,
  rollingTextUuid,
  reducedMotion,
}: HeroCtaButtonProps): React.ReactElement {
  const shell = CTA_SHELL[tone];

  const hoverVariants = React.useMemo<Variants>(
    () => ({
      hover: {
        ["--border-top-width" as string]: "1px",
        ["--border-right-width" as string]: "1px",
        ["--border-bottom-width" as string]: "1px",
        ["--border-left-width" as string]: "1px",
        ["--border-color" as string]: shell.hoverBorderColor,
      },
    }),
    [shell.hoverBorderColor],
  );

  return (
    <motion.a
      className={`${CTA_BUTTON_SERIALIZATION_HASH} framer-1cgg18b ${CTA_BUTTON_VARIANT_CLASS_NAMES[tone]} framer-1kblhh1`}
      data-framer-name={tone}
      href={href}
      initial={false}
      whileHover="hover"
      variants={hoverVariants}
      transition={CTA_BUTTON_TRANSITION}
      style={
        {
          "--border-bottom-width": "0px",
          "--border-color": "rgba(0, 0, 0, 0)",
          "--border-left-width": "0px",
          "--border-right-width": "0px",
          "--border-style": "solid",
          "--border-top-width": "0px",
          backgroundColor: shell.backgroundColor,
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        } as React.CSSProperties
      }
    >
      <motion.div
        className="framer-1pxacyp"
        data-framer-name="Text"
        variants={CTA_TEXT_VARIANTS}
        transition={CTA_BUTTON_TRANSITION}
        style={{ scale: 1 }}
      >
        <div className="framer-esl6hy-container">
          <RollingText
            text={label}
            uuid={rollingTextUuid}
            tone={tone}
            selfContained={false}
            reducedMotion={reducedMotion}
          />
        </div>
      </motion.div>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/* Logo marquee                                                                */
/* -------------------------------------------------------------------------- */

export interface HeroLogo {
  /** Framer class — carries the on-screen width/height. */
  className: string;
  framerName: string;
  alt: string;
  src: string;
  /** Intrinsic `width`/`height` attributes, verbatim from the SSR. */
  width: number;
  height: number;
}

/**
 * The 11 logos, in SSR document order, every `framerusercontent.com` URL rewritten through
 * `_source/asset-map.json`. The hashed basenames are NOT derivable from the original URL —
 * they come straight out of the map.
 */
export const HERO_LOGOS: readonly HeroLogo[] = [
  { className: "framer-1lbass", framerName: "Next.js logo", alt: "Next.js", src: "/assets/images/EXnQPn75scua8UBwFaMH0xHZXw.9f3b17b5.png", width: 145, height: 40 },
  { className: "framer-o3up2h", framerName: "React logo", alt: "React", src: "/assets/images/qO8CZleOMdzCKjx3b2MBnEPk5M.874cd434.png", width: 127, height: 40 },
  { className: "framer-5jrnmk", framerName: "TypeScript logo", alt: "TypeScript", src: "/assets/images/t1ehmddk6tuFvlMCiyJKAiwb1I.1e0fe67d.png", width: 198, height: 40 },
  { className: "framer-l1rwc", framerName: "Node.js logo", alt: "Node.js", src: "/assets/images/a6setZpG1wRiALvHzKA9fSNeRU.8d034a89.png", width: 154, height: 40 },
  { className: "framer-1go4b58", framerName: "Python logo", alt: "Python", src: "/assets/images/KPOAmJEsqh29HEVguyXLsgLbFU.9b570970.png", width: 147, height: 40 },
  { className: "framer-13tv5y", framerName: "PostgreSQL logo", alt: "PostgreSQL", src: "/assets/images/DEcaIvFzKZu4hnpRtoCaCedLDAI.7956d0ae.png", width: 211, height: 40 },
  { className: "framer-ubif3g", framerName: "Supabase logo", alt: "Supabase", src: "/assets/images/ONQel9DiGviXaq04HO77J3HiUs.3a2e13db.png", width: 186, height: 40 },
  { className: "framer-1han5v4", framerName: "Vercel logo", alt: "Vercel", src: "/assets/images/IQJ5SUo5JUn09UBEAVdM74xEMpU.bbcb4f0f.png", width: 136, height: 40 },
  { className: "framer-10lrfah", framerName: "Google Cloud logo", alt: "Google Cloud", src: "/assets/images/nsEIubA3cHdtO7yKC0W3Q08PN0.26d8752f.png", width: 233, height: 40 },
  { className: "framer-msja0c", framerName: "Anthropic logo", alt: "Anthropic", src: "/assets/images/EKYZECZdpRQ7fB0Fc2Sgd8WiXU.fb7a19da.png", width: 183, height: 40 },
  { className: "framer-ke9yso", framerName: "LangChain logo", alt: "LangChain", src: "/assets/images/qJFi9cgi4oHJTdlmLRD2DAtjU.f7c97f4f.png", width: 195, height: 40 },
];

/** Exactly the `<div class="framer-…">` subtree each `<li>` wraps in the real DOM. */
function HeroLogoImage({ logo }: { logo: HeroLogo }): React.ReactElement {
  return (
    <div
      className={logo.className}
      data-framer-name={logo.framerName}
      style={{ flexShrink: 0 }}
    >
      <div
        style={
          {
            position: "absolute",
            borderRadius: "inherit",
            cornerShape: "inherit",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          } as React.CSSProperties
        }
        data-framer-background-image-wrapper="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          decoding="async"
          width={logo.width}
          height={logo.height}
          src={logo.src}
          alt={logo.alt}
          style={
            {
              display: "block",
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              cornerShape: "inherit",
              objectPosition: "center",
              objectFit: "cover",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The two notch shoulders flanking the logo strip                             */
/* -------------------------------------------------------------------------- */

/**
 * MEASURED paths, lifted from the page's `<div id="svg-templates">` sprite
 * (`_source/live/home.html` offset ~1105637):
 *   `#svg11843213078` → Right, `#svg8818536687` → Left. Both `viewBox="0 0 87 50"`.
 *
 * The live DOM reaches them with `<use href="#…">`. That sprite lives at the end of
 * `<body>` and is page-level (`app/page.tsx`, orchestrator-owned), so the two paths are
 * inlined here instead — identical rendering, no dependency on a node this component does
 * not own and no risk of a duplicate element id. If a home-scoped `SvgTemplates` is added
 * later, swap the `<path>` back for `<use href={...} />`.
 */
const NOTCH_FILL = "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";
const NOTCH_RIGHT_PATH = "M 84 0 C 38.02 0 47 50 -3 50 L -3 0 Z";
const NOTCH_LEFT_PATH = "M 0 0 C 45.98 0 37 50 87 50 L 87 0 Z";

/** Framer's non-standard attribute soup on a `data-framer-component-type="SVG"` node. */
const SVG_NODE_ATTRS = {
  parentsize: "0",
  _constraints: "[object Object]",
  rotation: "0",
  shadows: "",
} as Record<string, string>;

function HeroNotch({
  wrapperClassName,
  wrapperName,
  svgClassName,
  path,
}: {
  wrapperClassName: string;
  wrapperName: string;
  svgClassName: string;
  path: string;
}): React.ReactElement {
  return (
    <div
      className={wrapperClassName}
      data-framer-name={wrapperName}
      style={{ transform: "scale(-1)" }}
    >
      <div
        data-framer-component-type="SVG"
        data-framer-name="SVG"
        {...SVG_NODE_ATTRS}
        className={svgClassName}
        aria-hidden="true"
        style={{ imageRendering: "pixelated", flexShrink: 0 }}
      >
        <div
          className="svgContainer"
          style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
        >
          <svg viewBox="0 0 87 50" style={{ width: "100%", height: "100%" }}>
            <path d={path} fill={NOTCH_FILL} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export interface HeroSectionProps {
  /**
   * How to behave under `prefers-reduced-motion: reduce`. `"settle"` (the primitives'
   * default) snaps the appear animations to their end state and never starts the marquee;
   * `"animate"` is what the live Framer site actually does.
   */
  reducedMotion?: ReducedMotionPolicy;
  /** Render every animation at its end state — for screenshot rigs. */
  disableMotion?: boolean;
}

export function HeroSection({
  reducedMotion,
  disableMotion = false,
}: HeroSectionProps = {}): React.ReactElement {
  return (
    <section className="framer-1dastbz" data-framer-name="Hero">
      <div className="framer-pskmbs" data-framer-name="Placeholder">
        {/*
          appear 8y3y06 — y 35 → 0, opacity 0.001 → 1, tween 1.2s, delay 0,
          ease [0.7, 0, 0.3, 1]. Fires ON MOUNT; never whileInView.
          No inline `will-change` in the SSR — `.framer-8y3y06`'s own CSS rule carries it.
        */}
        <AppearMotion
          id="8y3y06"
          scope={SCOPE}
          className="framer-8y3y06"
          data-framer-name="content"
          willChange={false}
          reducedMotion={reducedMotion}
          disabled={disableMotion}
        >
          <div className="ssr-variant">
            <div className="framer-1x6uj5v-container">
              <HeroBadge reducedMotion={reducedMotion} disabled={disableMotion} />
            </div>
          </div>

          <div className="framer-4ojp6g" data-framer-name="Heading + subheading">
            <div
              className="framer-kpfuh9"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <h1
                className="framer-text framer-styles-preset-d8f6ar"
                data-styles-preset="btOMgah8g"
              >
                {HERO_HEADING}
              </h1>
            </div>
            <div
              className="framer-1lpzktn"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p
                className="framer-text framer-styles-preset-wgkvl1"
                data-styles-preset="risoZ9TJU"
              >
                {HERO_SUBHEADING}
              </p>
            </div>
          </div>

          {/*
            Framer SSRs each CTA TWICE and lets `hidden-*` pick: copy 0 is the
            desktop + tablet one (`hidden-19fjg0f`), copy 1 the phone one
            (`hidden-1lsm0lh hidden-72rtr7`). The two copies differ ONLY in their
            rolling-text uuid. Do not collapse them — PLAN fidelity rule 1.
          */}
          <div className="framer-kl8vp3" data-framer-name="Cta">
            {HERO_CTAS.map((cta) => (
              <React.Fragment key={cta.label}>
                <div className={`ssr-variant ${HIDDEN_AT_PHONE}`}>
                  <div className={cta.containerClassName}>
                    <HeroCtaButton
                      label={cta.label}
                      href={cta.href}
                      tone={cta.tone}
                      rollingTextUuid={cta.uuids[0]}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                </div>
                <div className={`ssr-variant ${HIDDEN_AT_TABLET_AND_DESKTOP}`}>
                  <div className={cta.containerClassName}>
                    <HeroCtaButton
                      label={cta.label}
                      href={cta.href}
                      tone={cta.tone}
                      rollingTextUuid={cta.uuids[1]}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </AppearMotion>

        {/* Light theme: full opacity. `.framer-1n4jtxs-container`'s `opacity:.5` dimmed
            Framer's dark video; the light video is the hero's visual and is not dimmed.
            `multiply` turns the video's pure-white backdrop into the page's #E8F9FF, so the
            scene sits on the page instead of in a white box; colours are barely shifted. */}
        <div className="framer-1n4jtxs-container" style={{ opacity: 1, mixBlendMode: "multiply" }}>
          <HeroVideo />
        </div>

        {/* Light theme: a soft white glow behind the copy only, so the headline and
            subtext stay crisp over the scene while the robots stay vivid at the edges.
            Same z-index as the video, painted after it; the copy sits above at z 2. */}
        <div aria-hidden="true" style={HERO_COPY_GLOW_STYLE} />

        {/*
          "Masking" — a genuinely EMPTY div. `.framer-12o154i` gives it
          `background-color: rgba(255,255,255,.1)`, `inset: 0` and the two stacked
          `mask: linear-gradient(...)` layers that fade the hero's top and bottom.
          Removing it (it looks like dead markup) deletes the veil AND the marquee's
          edge mask. KEEP IT.
        */}
        <div
          className="framer-12o154i"
          data-framer-name="Masking"
          /* Light theme: the top/bottom veil fades into the white page, not an ink wash. */
          style={{ backgroundColor: "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(255, 255, 255))" }}
        />

        {/* Light theme: the card's soft inner shadow (desktop only; `.ct-hero-edge` in
            theme.css). Painted before the logo tab, which casts its own shadow onto it. */}
        <div className="ct-hero-edge" aria-hidden="true" />

        <div className="framer-2xxwzy" data-framer-name="Logos">
          <HeroNotch
            wrapperClassName="framer-1z0g9c4"
            wrapperName="Right"
            svgClassName="framer-dfnhpb"
            path={NOTCH_RIGHT_PATH}
          />
          <div className="framer-fgh9n2" data-framer-name="Logos">
            <div className="framer-113vnbk-container">
              {/*
                MEASURED Ticker props (`logo-marquee.md`, node `gCpWenBtO`):
                direction left · speed 30 px/s · gap 50 · padding 10 · alignment center ·
                hoverFactor 1 (NO pause on hover) ·
                fade { content: true, width: 25, inset: 0, alpha: 0, overflow: false }.
                Every one of these is the Marquee primitive's default, but they are passed
                explicitly so a future default change cannot silently retune the hero.
              */}
              <Marquee
                direction="left"
                speed={30}
                gap={50}
                padding={10}
                alignment="center"
                hoverFactor={1}
                fadeOptions={{
                  fadeContent: true,
                  fadeWidth: 25,
                  fadeInset: 0,
                  fadeAlpha: 0,
                  overflow: false,
                }}
                reducedMotion={reducedMotion}
                disabled={disableMotion}
              >
                {HERO_LOGOS.map((logo) => (
                  <HeroLogoImage key={logo.className} logo={logo} />
                ))}
              </Marquee>
            </div>
          </div>
          <HeroNotch
            wrapperClassName="framer-1l385vd"
            wrapperName="Left"
            svgClassName="framer-zaz3gl"
            path={NOTCH_LEFT_PATH}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
