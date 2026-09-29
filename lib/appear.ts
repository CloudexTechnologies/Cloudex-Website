/**
 * Framer "appear animations" → `motion` props.
 *
 * Data: `lib/appear-specs.json`, a verbatim copy of `_source/appear-animations.json`
 * (the merged 11-id union of every page's
 * `<script type="framer/appear" id="__framer__appearAnimationsContent">`).
 * `_source/` is reference material, not shipped source, hence the copy.
 *
 * Measured reference: `_source/behaviours/hero-entrance.md`.
 *
 * These fire ON MOUNT (page entrance), never on scroll — see `ScrollReveal` for the
 * viewport-driven mechanism, which is a different system entirely.
 *
 * No `"use client"`: this module is pure data + pure functions (the `motion` imports are
 * type-only and erase at build time), so Server Components may import it safely.
 */

import type { TargetAndTransition, Transition } from "motion/react";

import rawAppearSpecs from "./appear-specs.json";

/* -------------------------------------------------------------------------- */
/* Types — the exact shape Framer emits                                        */
/* -------------------------------------------------------------------------- */

/** Framer always writes the full transform set, even when every value is identity. */
export interface AppearTransformState {
  opacity: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  skewX: number;
  skewY: number;
  x: number;
  y: number;
}

export interface AppearTweenTransition {
  type: "tween";
  duration: number;
  delay: number;
  /** cubic-bezier control points; `motion` consumes the 4-tuple directly. */
  ease: readonly number[];
}

/** Framer's designer-facing spring parameterisation. */
export interface AppearSpringBounceTransition {
  type: "spring";
  bounce: number;
  duration: number;
  delay: number;
}

/** Framer's physical spring parameterisation. NOT interchangeable with the above. */
export interface AppearSpringPhysicsTransition {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
  delay: number;
}

export type AppearTransition =
  | AppearTweenTransition
  | AppearSpringBounceTransition
  | AppearSpringPhysicsTransition;

export interface AppearVariant {
  initial: AppearTransformState;
  animate: AppearTransformState & { transition: AppearTransition };
}

/** Keyed `"default"` (desktop) plus the tablet / phone breakpoint hashes. */
export type AppearVariantMap = Record<string, AppearVariant>;

export type AppearSpecMap = Record<string, AppearVariantMap>;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

export const APPEAR_SPECS: AppearSpecMap =
  rawAppearSpecs as unknown as AppearSpecMap;

/** Literal union of the 11 ids actually present in the merged JSON. */
export type AppearId = keyof typeof rawAppearSpecs;

export const APPEAR_IDS = Object.keys(APPEAR_SPECS) as AppearId[];

/** Framer's key for the desktop variant. */
export const APPEAR_DEFAULT_VARIANT_KEY = "default";

/**
 * `data-framer-appear-id="n0ccwk"` is the "Made in Framer" badge. It is on every page,
 * has no entry in any appear blob, and PLAN.md §1.3 says to drop it along with
 * `<div id="__framer-badge-container">`. Listed here so nobody re-adds it.
 */
export const APPEAR_IDS_TO_DROP = ["n0ccwk"] as const;

export function isAppearId(id: string): id is AppearId {
  return Object.prototype.hasOwnProperty.call(APPEAR_SPECS, id);
}

/* -------------------------------------------------------------------------- */
/* Resolution                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Resolve one appear variant.
 *
 * `hash` is a Framer breakpoint hash (`useBreakpointHash(scope)`). Desktop hashes are
 * never variant keys, so they fall through to `"default"` — which is exactly how Framer
 * behaves, and why passing the raw desktop hash is correct rather than a bug.
 *
 * Returns `undefined` for an unknown id (e.g. the dropped badge).
 */
export function getAppearSpec(
  id: string,
  hash?: string,
): AppearVariant | undefined {
  const variants = APPEAR_SPECS[id];
  if (variants === undefined) return undefined;
  if (hash !== undefined && variants[hash] !== undefined) return variants[hash];
  return variants[APPEAR_DEFAULT_VARIANT_KEY];
}

/** Every variant key defined for an id, e.g. `["default","1lsm0lh","19fjg0f"]`. */
export function getAppearVariantKeys(id: string): string[] {
  const variants = APPEAR_SPECS[id];
  return variants === undefined ? [] : Object.keys(variants);
}

/* -------------------------------------------------------------------------- */
/* Conversion to motion props                                                  */
/* -------------------------------------------------------------------------- */

export interface AppearMotionSpec {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

const TRANSFORM_KEYS = [
  "opacity",
  "rotate",
  "rotateX",
  "rotateY",
  "scale",
  "skewX",
  "skewY",
  "x",
  "y",
] as const;

type TransformKey = (typeof TRANSFORM_KEYS)[number];

/** Values that are a no-op if animated, and that Framer writes on every spec. */
const IDENTITY: Readonly<Record<TransformKey, number>> = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 0,
};

/**
 * Keep a key when it actually moves, or when it sits away from identity.
 * Everything else is dropped so the composed `transform` matches Framer's SSR'd
 * inline style (`translateY(35px)`, not `translateY(35px) scale(1) rotate(0deg)`).
 */
function significantKeys(variant: AppearVariant): TransformKey[] {
  return TRANSFORM_KEYS.filter((key) => {
    const from = variant.initial[key];
    const to = variant.animate[key];
    return from !== to || from !== IDENTITY[key];
  });
}

function pick(
  state: AppearTransformState,
  keys: readonly TransformKey[],
): TargetAndTransition {
  const out: Record<string, number> = {};
  for (const key of keys) out[key] = state[key];
  return out as TargetAndTransition;
}

/**
 * Framer's transition objects are already in `motion`'s vocabulary. Pass them through
 * verbatim — never convert `{bounce,duration}` into `{stiffness,damping,mass}` or back,
 * that introduces error (INVENTORY.md, "Cross-cutting notes").
 */
export function toMotionTransition(transition: AppearTransition): Transition {
  if (transition.type === "tween") {
    return {
      type: "tween",
      duration: transition.duration,
      delay: transition.delay,
      ease: [...transition.ease] as [number, number, number, number],
    };
  }
  if ("bounce" in transition) {
    return {
      type: "spring",
      bounce: transition.bounce,
      duration: transition.duration,
      delay: transition.delay,
    };
  }
  return {
    type: "spring",
    stiffness: transition.stiffness,
    damping: transition.damping,
    mass: transition.mass,
    delay: transition.delay,
  };
}

/**
 * Turn one resolved variant into `{ initial, animate, transition }`.
 * `opacity: 0.001` is preserved verbatim — it is Framer's paint-priming value, not a
 * rounding artefact, and it is what the SSR'd HTML contains.
 */
export function toMotionProps(variant: AppearVariant): AppearMotionSpec {
  const keys = significantKeys(variant);
  return {
    initial: pick(variant.initial, keys),
    animate: pick(variant.animate, keys),
    transition: toMotionTransition(variant.animate.transition),
  };
}

/** Resolve + convert in one step. `undefined` for an unknown id. */
export function getAppearMotionProps(
  id: string,
  hash?: string,
): AppearMotionSpec | undefined {
  const variant = getAppearSpec(id, hash);
  return variant === undefined ? undefined : toMotionProps(variant);
}

/**
 * The natural end state (`animate` without its transition). Used for the
 * reduced-motion path so nothing is ever left stuck at `opacity: 0.001`.
 */
export function getAppearRestState(
  id: string,
  hash?: string,
): TargetAndTransition | undefined {
  const variant = getAppearSpec(id, hash);
  if (variant === undefined) return undefined;
  return pick(variant.animate, significantKeys(variant));
}

/** A zero-length tween, for the reduced-motion / "snap to end" path. */
export const INSTANT_TRANSITION: Transition = {
  type: "tween",
  duration: 0,
  delay: 0,
};
