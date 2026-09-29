"use client";

/**
 * ScrollReveal — Framer's viewport ("scroll") entrance effects.
 *
 * This is a SEPARATE mechanism from appear-animations. PLAN.md §1.5: ~69 elements across
 * the site are SSR'd with `style="will-change:transform;opacity:0;transform:translateY(Npx)"`
 * and carry NO `data-framer-appear-id`. Without this component they stay at `opacity: 0`
 * forever and the page renders broken.
 *
 * Measured spec: `_source/behaviours/scroll-reveals.md`
 *   - spring { stiffness: 300, damping: 60, mass: 1 }  → damping ratio ≈ 1.73, ZERO overshoot.
 *     Motion's default spring bounces; this one must not.
 *   - threshold 0.5   → `viewport={{ amount: 0.5 }}` (not `"some"`, and there is no rootMargin)
 *   - animateOnce     → `viewport={{ once: true }}`; they never replay
 *   - stagger ladder  → 0 / 0.2 / 0.4s, per element (Framer uses no `staggerChildren` here)
 *   - 13 enter directions, distances 30 / 40 / 50 / 75px
 *
 * Like AppearMotion it renders the ORIGINAL element — no extra wrapper div.
 */

import * as React from "react";
import type { Transition } from "motion/react";
import { useReducedMotion } from "motion/react";

import { INSTANT_TRANSITION } from "@/lib/appear";

import {
  type MotionTagName,
  type ReducedMotionPolicy,
  DEFAULT_REDUCED_MOTION_POLICY,
  motionComponent,
} from "./AppearMotion";

/* -------------------------------------------------------------------------- */
/* Enter states — all 13, MEASURED                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every enter state is `{ opacity: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1,
 * skewX: 0, skewY: 0 }` plus a translation; only the translation differs, so the
 * identity members are dropped (they compose to the same `transform`).
 *
 * Names describe where the element STARTS relative to its final position.
 */
export const REVEAL_ENTER = {
  /** animation2 — y 30 */
  up30: { opacity: 0, x: 0, y: 30 },
  /** animation6 — y 40 */
  up40: { opacity: 0, x: 0, y: 40 },
  /** animation12 — y 50 */
  up50: { opacity: 0, x: 0, y: 50 },
  /** animation3 — y 75 */
  up75: { opacity: 0, x: 0, y: 75 },
  /** animation9 — y −40 */
  down40: { opacity: 0, x: 0, y: -40 },
  /** animation5 — x −40 */
  left40: { opacity: 0, x: -40, y: 0 },
  /** animation13 — x −50 */
  left50: { opacity: 0, x: -50, y: 0 },
  /** animation8 — x 40 */
  right40: { opacity: 0, x: 40, y: 0 },
  /** animation14 — x 50 */
  right50: { opacity: 0, x: 50, y: 0 },
  /** animation4 — x −40, y −40 */
  topLeft: { opacity: 0, x: -40, y: -40 },
  /** animation10 — x 40, y −40 */
  topRight: { opacity: 0, x: 40, y: -40 },
  /** animation7 — x −40, y 40 */
  bottomLeft: { opacity: 0, x: -40, y: 40 },
  /** animation11 — x 40, y 40 */
  bottomRight: { opacity: 0, x: 40, y: 40 },
} as const;

export type RevealDirection = keyof typeof REVEAL_ENTER;

export const REVEAL_DIRECTIONS = Object.keys(REVEAL_ENTER) as RevealDirection[];

/** All of them resolve to this. */
export const REVEAL_REST = { opacity: 1, x: 0, y: 0 } as const;

/**
 * Framer's own `animationN` constant names, as used by the element→animation table in
 * `scroll-reveals.md`. Handy when transcribing that table.
 */
export const REVEAL_ANIMATION_ALIASES = {
  animation2: "up30",
  animation3: "up75",
  animation4: "topLeft",
  animation5: "left40",
  animation6: "up40",
  animation7: "bottomLeft",
  animation8: "right40",
  animation9: "down40",
  animation10: "topRight",
  animation11: "bottomRight",
  animation12: "up50",
  animation13: "left50",
  animation14: "right50",
} as const satisfies Record<string, RevealDirection>;

export type RevealAnimationAlias = keyof typeof REVEAL_ANIMATION_ALIASES;

/**
 * Recover a direction from the SSR'd inline transform, e.g.
 * `transform:translateX(-40px) translateY(40px)` → `"bottomLeft"`.
 * Returns `undefined` for an offset Framer never emits on this site.
 */
export function revealDirectionFor(
  x: number,
  y: number,
): RevealDirection | undefined {
  return REVEAL_DIRECTIONS.find(
    (name) => REVEAL_ENTER[name].x === x && REVEAL_ENTER[name].y === y,
  );
}

/* -------------------------------------------------------------------------- */
/* Transitions — MEASURED                                                      */
/* -------------------------------------------------------------------------- */

/**
 * damping 60 / (2·√(300·1)) ≈ 1.73 → over-damped, zero overshoot. These glide.
 * Do NOT substitute motion's default spring or a `bounce`-parameterised one.
 */
export const REVEAL_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 60,
  mass: 1,
} as const;

export const REVEAL_TRANSITIONS = {
  /** transition2 — delay 0 */
  t2: { ...REVEAL_SPRING, delay: 0 },
  /** transition3 — delay 0.2 */
  t3: { ...REVEAL_SPRING, delay: 0.2 },
  /** transition4 — delay 0.4 */
  t4: { ...REVEAL_SPRING, delay: 0.4 },
  /** transition5 — testimonials only: tween 1s, ease [0.7,0,0.3,1] */
  t5: {
    type: "tween",
    duration: 1,
    ease: [0.7, 0, 0.3, 1] as [number, number, number, number],
    delay: 0,
  },
} as const satisfies Record<string, Transition>;

export type RevealTransitionKey = keyof typeof REVEAL_TRANSITIONS;

/** threshold 0.5 + animateOnce, MEASURED on all 54 home-page wrappers. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.5 } as const;

function resolveTransition(
  transition: RevealTransitionKey | Transition | undefined,
  delay: number | undefined,
): Transition {
  const base: Transition =
    transition === undefined
      ? REVEAL_TRANSITIONS.t2
      : typeof transition === "string"
        ? REVEAL_TRANSITIONS[transition]
        : transition;
  return delay === undefined ? base : { ...base, delay };
}

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface ScrollRevealOwnProps {
  /** Which of the 13 measured enter states, or a raw `animationN` alias. */
  enter: RevealDirection | RevealAnimationAlias;
  /** `"t2"` (0s) | `"t3"` (0.2s) | `"t4"` (0.4s) | `"t5"` (tween) or a raw Transition. Default `"t2"`. */
  transition?: RevealTransitionKey | Transition;
  /** Overrides the delay of whichever transition was chosen. */
  delay?: number;
  /** Viewport threshold. Default 0.5 — only change it to deviate from Framer. */
  amount?: number;
  /** `viewport.once`. Default true — Framer's reveals never replay. */
  once?: boolean;
  /** DOM `id` attribute. */
  elementId?: string;
  /** Inline `will-change`; Framer SSRs `transform` on every one of these. */
  willChange?: React.CSSProperties["willChange"] | false;
  reducedMotion?: ReducedMotionPolicy;
  /** Render straight at the rest state, no animation. */
  disabled?: boolean;
  children?: React.ReactNode;
}

export type ScrollRevealProps<T extends MotionTagName = "div"> =
  ScrollRevealOwnProps & {
    /** The original tag from the SSR'd DOM. Default `"div"`. */
    as?: T;
  } & Omit<
      React.ComponentPropsWithoutRef<T>,
      keyof ScrollRevealOwnProps | "as" | "ref"
    >;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function ScrollReveal<T extends MotionTagName = "div">(
  props: ScrollRevealProps<T>,
): React.ReactElement {
  const {
    enter,
    transition,
    delay,
    amount = REVEAL_VIEWPORT.amount,
    once = REVEAL_VIEWPORT.once,
    as,
    elementId,
    willChange = "transform",
    reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
    disabled = false,
    style,
    children,
    ...rest
  } = props as unknown as ScrollRevealProps<"div">;

  const prefersReducedMotion = useReducedMotion();

  const direction: RevealDirection =
    enter in REVEAL_ENTER
      ? (enter as RevealDirection)
      : REVEAL_ANIMATION_ALIASES[enter as RevealAnimationAlias];

  const initial = REVEAL_ENTER[direction];
  const resolvedStyle: React.CSSProperties =
    willChange === false ? { ...style } : { willChange, ...style };

  const Tag = motionComponent((as ?? "div") as MotionTagName);

  // Reduced motion / disabled: settle on mount rather than on intersection, so an element
  // that never reaches 50% visibility still ends up visible instead of stuck at opacity 0.
  const snap =
    disabled || (reducedMotion === "settle" && prefersReducedMotion === true);

  const tagProps: Record<string, unknown> = {
    "data-scroll-reveal": direction,
    ...rest,
    style: resolvedStyle,
    initial,
  };
  if (elementId !== undefined) tagProps.id = elementId;

  if (snap) {
    tagProps.animate = REVEAL_REST;
    tagProps.transition = INSTANT_TRANSITION;
  } else {
    tagProps.whileInView = REVEAL_REST;
    tagProps.viewport = { once, amount };
    tagProps.transition = resolveTransition(transition, delay);
  }

  return <Tag {...tagProps}>{children}</Tag>;
}

/**
 * Optional safety net for JS-disabled visitors.
 *
 * Both primitives SSR their hidden `initial` state (exactly as Framer does), so with
 * scripting off they would stay invisible — Framer's live site has the same hole. Mount
 * this ONCE, near the top of `<body>` in `app/layout.tsx`, to close it. It is inert
 * whenever JavaScript runs.
 *
 * Keep it OUTSIDE `<div id="main">` so it cannot disturb `nth-child` selectors.
 */
export function NoScriptMotionFallback(): React.ReactElement {
  return (
    <noscript>
      <style>
        {"[data-scroll-reveal],[data-framer-appear-id]{opacity:1!important;transform:none!important}"}
      </style>
    </noscript>
  );
}

export default ScrollReveal;
