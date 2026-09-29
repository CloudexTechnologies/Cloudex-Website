"use client";

/**
 * Small pieces shared by more than one `/about` section.
 *
 * Everything here is transcribed from `_source/live/about.html` (offsets in
 * `_source/structure/about.md`) and the page's own Framer route module
 * `lusM6XiGId78bV8RHPai/uFQSHkXbC9GEiB6bjmhg/lab5WFjmU.js`, recovered from the
 * source map of `_source/behaviours/chunks/pdN2m033ND-….mjs`.
 *
 * MEASURED, from that module:
 *   transition1 = { type:"spring", stiffness:300, damping:60, mass:1, delay:0    }
 *   transition2 = { …same spring…,                               delay:0.15 }
 *   transition3 = { …same spring…,                               delay:0.3  }
 *   animation2  = { opacity:0, y:40 }   animation3 = { opacity:0, y:30 }
 *   animation4  = { opacity:0, y:75 }
 *
 * NOTE the about page's stagger ladder is 0 / 0.15 / 0.3 — NOT the home page's
 * 0 / 0.2 / 0.4 (`scroll-reveals.md` documents the home page). Several cards also
 * change rung per breakpoint via Framer `PropertyOverrides`, which is what
 * {@link AboutReveal} exists for.
 */

import * as React from "react";
import { motion, type Transition, type Variants } from "motion/react";

import {
  RollingText,
  ScrollReveal,
  hiddenClassName,
  useBreakpoint,
  type BreakpointName,
  type ReducedMotionPolicy,
  type RevealDirection,
  type ScrollRevealProps,
} from "@/components/primitives";
import {
  CTA_BUTTON_SERIALIZATION_HASH,
  CTA_BUTTON_TRANSITION,
  CTA_BUTTON_VARIANT_CLASS_NAMES,
} from "@/components/shared/CtaBand";

import {
  ROUNDED_EDGE_ID,
  TOKEN_BADGE_BORDER,
  TOKEN_BADGE_BG,
  TOKEN_BADGE_TEXT,
  TOKEN_BUTTON_DARK,
  TOKEN_WHITE,
} from "./about-tokens";

/* -------------------------------------------------------------------------- */
/* Reveal transitions                                                          */
/* -------------------------------------------------------------------------- */

/** The about page's own three rungs, in seconds. MEASURED. */
export const ABOUT_REVEAL_DELAYS = {
  t1: 0,
  t2: 0.15,
  t3: 0.3,
} as const;

/** One delay per breakpoint, because Framer overrides the rung per breakpoint. */
export interface AboutRevealDelays {
  readonly desktop: number;
  readonly tablet: number;
  readonly phone: number;
}

export const DELAY_ALL_ZERO: AboutRevealDelays = {
  desktop: 0,
  tablet: 0,
  phone: 0,
};

type AboutRevealOwnProps = {
  enter: RevealDirection;
  /** Per-breakpoint `delay`, straight from the module's `PropertyOverrides`. */
  delays?: AboutRevealDelays;
  /** `__framer__threshold`. MEASURED 0.5 everywhere except the four story cards (0). */
  amount?: number;
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
  children?: React.ReactNode;
} & Omit<
  ScrollRevealProps<"div">,
  "enter" | "delays" | "transition" | "delay" | "amount" | "as"
>;

/**
 * A `ScrollReveal` whose delay follows the live breakpoint.
 *
 * `useBreakpoint()` reports `"desktop"` during SSR and the hydration pass and the real
 * value immediately after, which is safe here: the reveal only reads `delay` when it
 * fires on intersection, long after hydration.
 */
export function AboutReveal({
  enter,
  delays = DELAY_ALL_ZERO,
  amount,
  children,
  ...rest
}: AboutRevealOwnProps): React.ReactElement {
  const breakpoint: BreakpointName = useBreakpoint();
  return (
    <ScrollReveal
      enter={enter}
      transition="t2"
      delay={delays[breakpoint]}
      {...(amount === undefined ? null : { amount })}
      {...rest}
    >
      {children}
    </ScrollReveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                       */
/* -------------------------------------------------------------------------- */

/** `.framer-XUE7K.framer-TPaq9.framer-1rwepof.framer-v-1rwepof[data-framer-name="Badge"]`. */
const BADGE_RADIUS = {
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
} as const;

const BADGE_BORDER = {
  "--border-bottom-width": "1px",
  "--border-color": TOKEN_BADGE_BORDER,
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
} as const;

/** `.framer-xrs0cf` — Framer routes the colour through a variable-reference alias. */
const BADGE_TEXT_STYLE = {
  "--extracted-r6o4lv": "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  "--variable-reference-ibDtCMzbS-eWNvTdAfh": TOKEN_BADGE_TEXT,
  transform: "none",
} as React.CSSProperties;

export interface BadgeCardProps {
  label: string;
  /** Defaults to the grey `#1a1a1a` badge; the hero passes the blue token. */
  backgroundColor?: string;
}

/** The badge itself, with no wrapper — the hero mounts this straight into its appear node. */
export function BadgeCard({
  label,
  backgroundColor = TOKEN_BADGE_BG,
}: BadgeCardProps): React.ReactElement {
  return (
    <div
      className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
      data-border="true"
      data-framer-name="Badge"
      data-highlight="true"
      style={
        {
          ...BADGE_BORDER,
          backgroundColor,
          ...BADGE_RADIUS,
        } as React.CSSProperties
      }
    >
      <div
        className="framer-xrs0cf"
        data-framer-component-type="RichTextContainer"
        style={BADGE_TEXT_STYLE}
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
          {label}
        </p>
      </div>
    </div>
  );
}

export interface AboutBadgeProps extends BadgeCardProps {
  /** The per-section `framer-…-container` wrapper class. */
  containerClassName: string;
}

/**
 * One `<div class="ssr-variant">` + container + badge. Framer emits a single copy of
 * this (no `hidden-*` classes) on every about-page instance — verified in the SSR.
 */
export function AboutBadge({
  containerClassName,
  label,
  backgroundColor,
}: AboutBadgeProps): React.ReactElement {
  return (
    <div className="ssr-variant">
      <div className={containerClassName}>
        <BadgeCard label={label} backgroundColor={backgroundColor} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Rounded edge (the concave corner beside every "notch")                      */
/* -------------------------------------------------------------------------- */

export interface RoundedEdgeProps {
  /** Outer `.framer-…[data-framer-name="Rounded Edge"]` class. */
  className: string;
  /** Inner `data-framer-component-type="SVG"` class. */
  svgClassName: string;
  /** `transform` on the outer node, e.g. `"rotate(90deg)"`. Omitted when Framer omits it. */
  rotate?: string;
}

/**
 * `<use href="#svg9271713167">` into the page-level `#svg-templates` sprite, exactly as
 * Framer does — see `SvgTemplates`, which `app/about/page.tsx` mounts once.
 * (`SiteNavbar` / `SiteFooter` inline their own copies instead because they are shared
 * across routes and cannot depend on a per-page sprite.)
 */
export function RoundedEdge({
  className,
  svgClassName,
  rotate,
}: RoundedEdgeProps): React.ReactElement {
  return (
    <div
      className={className}
      data-framer-name="Rounded Edge"
      style={rotate === undefined ? undefined : { transform: rotate }}
    >
      <div
        data-framer-component-type="SVG"
        data-framer-name="Vector"
        {...({
          parentsize: "0",
          _constraints: "[object Object]",
          rotation: "0",
          shadows: "",
        } as Record<string, string>)}
        className={svgClassName}
        aria-hidden="true"
        style={{ imageRendering: "pixelated", flexShrink: 0 }}
      >
        <div
          className="svgContainer"
          style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
        >
          <svg style={{ width: "100%", height: "100%" }}>
            <use href={`#${ROUNDED_EDGE_ID}`} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA button                                                                  */
/* -------------------------------------------------------------------------- */

/** MEASURED shells, read from the SSR'd inline `style` on each `<a class="framer-CsDyE">`. */
const CTA_SHELL = {
  Light: {
    backgroundColor: TOKEN_WHITE,
    hoverBorderColor:
      "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))",
  },
  Dark: {
    backgroundColor: TOKEN_BUTTON_DARK,
    hoverBorderColor: "rgba(255, 255, 255, 0.1)",
  },
} as const;

export type AboutCtaTone = keyof typeof CTA_SHELL;

/** `.framer-1pxacyp` — `style {scale:1}` → `"<variant>-hover" {scale:1.05}`. */
const CTA_TEXT_VARIANTS: Variants = { hover: { scale: 1.05 } };

const CTA_TRANSITION: Transition = CTA_BUTTON_TRANSITION;

interface AboutCtaButtonProps {
  label: string;
  href: string;
  tone: AboutCtaTone;
  /** `.framer-…-container` around the anchor. */
  containerClassName: string;
  /** The per-instance rolling-text uuid whose rule is in `app/framer/components.css`. */
  rollingTextUuid: string;
  /**
   * `false` (the default) emits the bare class, matching Framer's SSR for every uuid
   * that already has a rule in `components.css`. Sections added after the migration
   * have no such rule, so they pass `true` to have `RollingText` inline the identical
   * declarations instead. Byte-identical output either way — see `RollingText`.
   */
  selfContained?: boolean;
  reducedMotion?: ReducedMotionPolicy;
}

/**
 * `NqOBQqRTG.js` — the site's one CTA button, identical to the pair inside `CtaBand`
 * (this is a second instantiation, not a second implementation: the serialization hash,
 * variant class names and transition are imported from `CtaBand`).
 */
export function AboutCtaButton({
  label,
  href,
  tone,
  containerClassName,
  rollingTextUuid,
  selfContained = false,
  reducedMotion,
}: AboutCtaButtonProps): React.ReactElement {
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
    <div className={containerClassName}>
      <motion.a
        className={`${CTA_BUTTON_SERIALIZATION_HASH} framer-1cgg18b ${CTA_BUTTON_VARIANT_CLASS_NAMES[tone]} framer-1kblhh1`}
        data-framer-name={tone}
        href={href}
        initial={false}
        whileHover="hover"
        variants={hoverVariants}
        transition={CTA_TRANSITION}
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
          transition={CTA_TRANSITION}
          style={{ scale: 1 }}
        >
          <div className="framer-esl6hy-container">
            <RollingText
              text={label}
              uuid={rollingTextUuid}
              tone={tone}
              selfContained={selfContained}
              reducedMotion={reducedMotion}
            />
          </div>
        </motion.div>
      </motion.a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA button — all three SSR breakpoint copies                                */
/* -------------------------------------------------------------------------- */

/**
 * Framer serialises one copy of the button per breakpoint and hides the two inactive
 * ones with `hidden-<hash>` classes (PLAN.md §1.1 + the task's fidelity rule 1). The
 * class ORDER is taken verbatim from the SSR:
 *   desktop copy → `hidden-1v6k32p hidden-k39dq1`
 *   tablet  copy → `hidden-13fmyed hidden-k39dq1`
 *   phone   copy → `hidden-1v6k32p hidden-13fmyed`
 */
const CTA_HIDDEN_CLASSES: readonly string[] = [
  `${hiddenClassName("about", "tablet")} ${hiddenClassName("about", "phone")}`,
  `${hiddenClassName("about", "desktop")} ${hiddenClassName("about", "phone")}`,
  `${hiddenClassName("about", "tablet")} ${hiddenClassName("about", "desktop")}`,
];

export interface AboutCtaGroupProps {
  label: string;
  href: string;
  tone: AboutCtaTone;
  containerClassName: string;
  /** The three per-instance uuids, in document order (desktop, tablet, phone). */
  rollingTextUuids: readonly [string, string, string];
  /** See `AboutCtaButtonProps.selfContained`. */
  selfContained?: boolean;
  reducedMotion?: ReducedMotionPolicy;
}

export function AboutCtaGroup({
  label,
  href,
  tone,
  containerClassName,
  rollingTextUuids,
  selfContained,
  reducedMotion,
}: AboutCtaGroupProps): React.ReactElement {
  return (
    <>
      {rollingTextUuids.map((uuid, index) => (
        <div key={uuid} className={`ssr-variant ${CTA_HIDDEN_CLASSES[index]}`}>
          <AboutCtaButton
            label={label}
            href={href}
            tone={tone}
            containerClassName={containerClassName}
            rollingTextUuid={uuid}
            selfContained={selfContained}
            reducedMotion={reducedMotion}
          />
        </div>
      ))}
    </>
  );
}
