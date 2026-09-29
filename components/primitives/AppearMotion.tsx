"use client";

/**
 * AppearMotion — replays one Framer page-entrance ("appear") animation.
 *
 * Measured spec: `_source/behaviours/hero-entrance.md`; data: `lib/appear-specs.json`.
 *
 * Design constraints:
 *  - It renders the ORIGINAL element (tag + className + inline style), never an extra
 *    wrapper div. Framer's CSS is full of child/descendant-sensitive selectors, so an
 *    inserted node changes layout.
 *  - It SSRs the `initial` state, byte-compatible with Framer's own SSR
 *    (`style="opacity:0.001;transform:translateY(35px)"`), so hydration never mismatches.
 *  - These run ON MOUNT. Do not convert them to `whileInView`: the hero is above the fold
 *    and `1wlzku5`'s 1.5s delay is measured from load.
 *
 * Caller contract: pass the SSR'd inline style MINUS `opacity` and `transform` (i.e. keep
 * the CSS custom properties, `width`, `aspect-ratio`, border radii, background…).
 * `opacity` / `transform` are owned by the animation.
 */

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { INSTANT_TRANSITION, getAppearMotionProps } from "@/lib/appear";
import { type BreakpointScope, useBreakpointHash } from "@/lib/breakpoints";

/* -------------------------------------------------------------------------- */
/* Polymorphic motion tag                                                      */
/* -------------------------------------------------------------------------- */

export type MotionTagName = keyof React.JSX.IntrinsicElements;

type AnyMotionComponent = React.ComponentType<Record<string, unknown>>;

const motionComponentCache = new Map<string, AnyMotionComponent>();

/** `motion.div`, `motion.section`, … resolved by tag name and memoised. */
export function motionComponent(tag: MotionTagName): AnyMotionComponent {
  const cached = motionComponentCache.get(tag);
  if (cached !== undefined) return cached;
  const created = (motion as unknown as Record<string, AnyMotionComponent>)[tag];
  motionComponentCache.set(tag, created);
  return created;
}

/**
 * What to do when the visitor has `prefers-reduced-motion: reduce`.
 *
 * `"settle"` (default) — snap to the natural end state on mount, so nothing is ever
 * stuck at `opacity: 0.001`.
 * `"animate"` — play anyway. This is what the live Framer site actually does: its
 * appear bootstrap is invoked with the reduced-motion flag hard-coded to `false`
 * (`…("data-framer-appear-id","__Appear_Animation_Transform__",false)`), even though the
 * script tag is labelled `data-framer-appear-animation="no-preference"`.
 */
export type ReducedMotionPolicy = "settle" | "animate";

export const DEFAULT_REDUCED_MOTION_POLICY: ReducedMotionPolicy = "settle";

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface AppearMotionOwnProps {
  /** `data-framer-appear-id`, e.g. `"8y3y06"`. Unknown ids render un-animated. */
  id: string;
  /** Which page's breakpoint triple to resolve the variant against. Default `"home"`. */
  scope?: BreakpointScope;
  /** DOM `id` attribute (the `id` prop is taken by the appear id). */
  elementId?: string;
  /** Inline `will-change`. Pass `false` to omit it (e.g. `8y3y06`, which has none). */
  willChange?: React.CSSProperties["willChange"] | false;
  reducedMotion?: ReducedMotionPolicy;
  /** Render straight at the end state, no animation. */
  disabled?: boolean;
  children?: React.ReactNode;
}

export type AppearMotionProps<T extends MotionTagName = "div"> =
  AppearMotionOwnProps & {
    /** The original tag from the SSR'd DOM. Default `"div"`. */
    as?: T;
  } & Omit<
      React.ComponentPropsWithoutRef<T>,
      keyof AppearMotionOwnProps | "as" | "ref"
    >;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function AppearMotion<T extends MotionTagName = "div">(
  props: AppearMotionProps<T>,
): React.ReactElement {
  const {
    id,
    scope = "home",
    as,
    elementId,
    willChange = "transform",
    reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
    disabled = false,
    style,
    children,
    ...rest
  } = props as unknown as AppearMotionProps<"div">;

  const hash = useBreakpointHash(scope);
  const prefersReducedMotion = useReducedMotion();
  const spec = getAppearMotionProps(id, hash);

  const tag = (as ?? "div") as MotionTagName;
  const resolvedStyle: React.CSSProperties =
    willChange === false ? { ...style } : { willChange, ...style };

  // Unknown id (the dropped Framer badge, or a typo): render the plain element so the
  // markup is still correct rather than silently invisible.
  if (spec === undefined) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[AppearMotion] no appear spec for id "${id}" — rendering static.`);
    }
    const PlainTag = tag as React.ElementType;
    const plainProps: Record<string, unknown> = {
      "data-framer-appear-id": id,
      ...rest,
      style: resolvedStyle,
    };
    if (elementId !== undefined) plainProps.id = elementId;
    return <PlainTag {...plainProps}>{children}</PlainTag>;
  }

  const snap = disabled || (reducedMotion === "settle" && prefersReducedMotion === true);

  const Tag = motionComponent(tag);
  const tagProps: Record<string, unknown> = {
    "data-framer-appear-id": id,
    ...rest,
    style: resolvedStyle,
    initial: spec.initial,
    animate: spec.animate,
    transition: snap ? INSTANT_TRANSITION : spec.transition,
  };
  if (elementId !== undefined) tagProps.id = elementId;

  return <Tag {...tagProps}>{children}</Tag>;
}

export default AppearMotion;
