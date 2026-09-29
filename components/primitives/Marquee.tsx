"use client";

/**
 * Marquee — the Framer-marketplace `Ticker` used by the hero logo row.
 *
 * Measured spec: `_source/behaviours/logo-marquee.md`.
 *
 * Everything here is MEASURED except `MAX_DUPLICATED_ITEMS` (a safety ceiling that never
 * binds at realistic viewport widths — flagged ESTIMATED in the spec).
 *
 * Mechanism, verbatim from the spec:
 *   childrenLength = (last.offsetLeft + last.offsetWidth) - first.offsetLeft + gap
 *   duplicateBy    = min(round(parentWidth / childrenLength * 2) + 1, MAX_DUPLICATED_ITEMS)
 *   animateToValue = childrenLength + childrenLength * round(parentWidth / childrenLength)
 *   duration_ms    = |animateToValue| / speed * 1000
 *
 * `speed` is px/s, NOT a duration: two rows of different content widths scroll at the same
 * px/s. Never hard-code a seconds value — it matches at exactly one viewport width.
 *
 * Because `animateToValue` is an exact integer multiple of `childrenLength`, the row at the
 * end of one iteration is pixel-identical to its start: the wrap is invisible. There is no
 * crossfade and no second animated copy.
 *
 * Driven by the **Web Animations API** (`element.animate`), not by `motion` — that is what
 * the original uses, it runs off the main thread, and `iterations: Infinity` with
 * `easing: "linear"` never accumulates the drift a rAF loop would.
 *
 * NO pause-on-hover. `hoverFactor: 1` is assigned straight to `playbackRate` on mouse-enter
 * and `1` is the normal rate — MEASURED. A build that pauses on hover is wrong.
 *
 * DOM shape (matches `_source/live/home.html` byte for byte at first paint):
 *   <section style="…;opacity:0;mask-image:…;overflow:hidden">
 *     <ul style="…;gap:50px;flex-direction:row;will-change:auto;transform:translateX(-0px)">
 *       <li aria-hidden="true">{child}</li>            ← the real set
 *       <li aria-hidden="true" style="will-change:transform">{child}</li>   ← clones
 *     </ul>
 *   </section>
 *
 * SCOPE NOTE: this reproduces the ONE instance on the site that uses this component — the
 * hero logo row (`.framer-113vnbk-container`). The Integrations rows, the Process
 * "Animated lines"/"Waves", the Solutions cards and the about-page "Life at" grid use
 * Framer's *built-in* `Ticker` instead, whose DOM is `<li class="ticker-item"
 * aria-posinset aria-setsize style="transform:translateX(Npx)">` (per-item recycling, not a
 * single list transform). `itemClassName` / `annotateItems` let those sections render the
 * same DOM shape and get identical constant-px/s seamless motion, but the internal
 * bookkeeping is this component's, not the built-in Ticker's. See the report.
 */

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";

import {
  DEFAULT_REDUCED_MOTION_POLICY,
  type ReducedMotionPolicy,
} from "./AppearMotion";

/* -------------------------------------------------------------------------- */
/* Measured constants (`1_augiA20Il.js`, node `gCpWenBtO`)                      */
/* -------------------------------------------------------------------------- */

/** px per second. MEASURED. */
export const MARQUEE_SPEED = 30;
/** px between items. MEASURED. */
export const MARQUEE_GAP = 50;
/** px, all four sides of the clipping container. MEASURED. */
export const MARQUEE_PADDING = 10;
/** Edge-fade width, in % of the container. MEASURED (`fadeOptions.fadeWidth`). */
export const MARQUEE_FADE_WIDTH = 25;
/** MEASURED (`fadeOptions.fadeInset`). */
export const MARQUEE_FADE_INSET = 0;
/** Mask alpha at the very edges. MEASURED (`fadeOptions.fadeAlpha`). */
export const MARQUEE_FADE_ALPHA = 0;
/** `playbackRate` applied on mouse-enter. 1 === normal === no pause, no slowdown. MEASURED. */
export const MARQUEE_HOVER_FACTOR = 1;
/**
 * Safety ceiling on the number of cloned sets. **ESTIMATED** — the module constant's literal
 * value was not read out of the source map. At realistic widths
 * `round(parent / children * 2) + 1` is far below it, so it never binds.
 */
export const MAX_DUPLICATED_ITEMS = 100;

/* -------------------------------------------------------------------------- */
/* Types                                                                        */
/* -------------------------------------------------------------------------- */

/** Where the content travels. The site configures `"left"` — MEASURED. */
export type MarqueeDirection = "left" | "right" | "up" | "down";

export type MarqueeAlignment = "start" | "center" | "end";

export interface MarqueeFadeOptions {
  /** Draw the edge mask at all. MEASURED `true`. */
  fadeContent?: boolean;
  /** % of the container each edge fade spans. MEASURED `25`. */
  fadeWidth?: number;
  /** % the fade is pushed in from each edge. MEASURED `0`. */
  fadeInset?: number;
  /** Mask alpha at the outermost stop. MEASURED `0`. */
  fadeAlpha?: number;
  /** `true` lets content escape the container. MEASURED `false` → `overflow: hidden`. */
  overflow?: boolean;
}

export interface MarqueeProps {
  children?: React.ReactNode;
  /** MEASURED `"left"`. */
  direction?: MarqueeDirection;
  /** px per second. MEASURED `30`. */
  speed?: number;
  /** px between items, and the term that closes the loop seam. MEASURED `50`. */
  gap?: number;
  /** px padding on the clipping container. MEASURED `10`. */
  padding?: number | string;
  /** Cross-axis placement of the items. MEASURED `"center"`. */
  alignment?: MarqueeAlignment;
  /** MEASURED: `{ fadeContent: true, fadeWidth: 25, fadeInset: 0, fadeAlpha: 0, overflow: false }`. */
  fadeOptions?: MarqueeFadeOptions;
  /** `playbackRate` while hovered. MEASURED `1` — i.e. no pause on hover. */
  hoverFactor?: number;
  /** Pause while scrolled out of view. MEASURED `true`. */
  pauseOffscreen?: boolean;
  /** Pause while the tab is hidden. MEASURED `true`. */
  pauseWhenHidden?: boolean;
  /**
   * `"settle"` (default) — honour `prefers-reduced-motion: reduce` by never creating the
   * animation, which is what the original Ticker does (`useReducedMotion()` gate).
   * `"animate"` — scroll anyway.
   */
  reducedMotion?: ReducedMotionPolicy;
  /** Render the static, un-duplicated, un-animated row. */
  disabled?: boolean;

  /** `className` on the outer `<section>`. */
  className?: string;
  /** Merged over the computed `<section>` style. */
  style?: React.CSSProperties;
  /** Merged over the computed `<ul>` style. */
  listStyle?: React.CSSProperties;
  /** `id` on the outer `<section>`. */
  elementId?: string;
  /** `className` on every `<li>` (pass `"ticker-item"` for the built-in-Ticker DOM shape). */
  itemClassName?: string;
  /** Merged over every `<li>`'s style. */
  itemStyle?: React.CSSProperties;
  /** Emit `aria-posinset` / `aria-setsize` on each `<li>`, as the built-in Ticker does. */
  annotateItems?: boolean;
  /** `aria-hidden` on every `<li>`. MEASURED `true` (Framer hides the whole row from AT). */
  ariaHiddenItems?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Pure helpers (exported for the harness / tests)                              */
/* -------------------------------------------------------------------------- */

const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

export const isHorizontal = (direction: MarqueeDirection): boolean =>
  direction === "left" || direction === "right";

/**
 * `duplicateBy` — how many EXTRA copies of the child set to render.
 * MEASURED: `min(round(parentSize / childrenLength * 2) + 1, MAX_DUPLICATED_ITEMS)`.
 */
export function marqueeDuplicateBy(
  parentSize: number,
  childrenLength: number,
  max: number = MAX_DUPLICATED_ITEMS,
): number {
  if (childrenLength <= 0) return 0;
  return Math.min(Math.round((parentSize / childrenLength) * 2) + 1, max);
}

/**
 * `animateToValue` — the distance one iteration travels, always an exact integer multiple
 * of `childrenLength`, which is what makes the seam invisible.
 * MEASURED: `childrenLength + childrenLength * round(parentSize / childrenLength)`.
 */
export function marqueeAnimateToValue(
  parentSize: number,
  childrenLength: number,
): number {
  if (childrenLength <= 0) return 0;
  return childrenLength + childrenLength * Math.round(parentSize / childrenLength);
}

/** MEASURED: `|animateToValue| / speed * 1000`. */
export function marqueeDurationMs(animateToValue: number, speed: number): number {
  if (speed <= 0) return 0;
  return (Math.abs(animateToValue) / speed) * 1000;
}

/**
 * The edge mask. MEASURED:
 * `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)`
 */
export function marqueeMaskImage(
  direction: MarqueeDirection,
  fadeWidth: number = MARQUEE_FADE_WIDTH,
  fadeInset: number = MARQUEE_FADE_INSET,
  fadeAlpha: number = MARQUEE_FADE_ALPHA,
): string {
  const fadeDirection = isHorizontal(direction) ? "to right" : "to bottom";
  const fadeWidthStart = fadeWidth / 2;
  const fadeWidthEnd = 100 - fadeWidth / 2;
  const fadeInsetStart = clamp(fadeInset, 0, fadeWidthStart);
  const fadeInsetEnd = 100 - fadeInset;
  return (
    `linear-gradient(${fadeDirection}, ` +
    `rgba(0, 0, 0, ${fadeAlpha}) ${fadeInsetStart}%, ` +
    `rgba(0, 0, 0, 1) ${fadeWidthStart}%, ` +
    `rgba(0, 0, 0, 1) ${fadeWidthEnd}%, ` +
    `rgba(0, 0, 0, ${fadeAlpha}) ${fadeInsetEnd}%)`
  );
}

/**
 * The transform string the row carries. Framer SSRs `translateX(-0px)` — the minus sign is
 * part of its `transformer(0)` output, so it is reproduced verbatim.
 */
export function marqueeTransform(direction: MarqueeDirection, value: number): string {
  return isHorizontal(direction)
    ? `translateX(-${value}px)`
    : `translateY(-${value}px)`;
}

const ALIGNMENT_TO_PLACE_ITEMS: Record<MarqueeAlignment, string> = {
  start: "start",
  center: "center",
  end: "end",
};

/* -------------------------------------------------------------------------- */
/* Component                                                                    */
/* -------------------------------------------------------------------------- */

interface Measurement {
  /** `offsetWidth` (horizontal) or `offsetHeight` (vertical) of the clipping container. */
  parent: number;
  /** One full set of children along the travel axis, `gap` included. */
  children: number;
}

const ZERO: Measurement = { parent: 0, children: 0 };

export function Marquee({
  children,
  direction = "left",
  speed = MARQUEE_SPEED,
  gap = MARQUEE_GAP,
  padding = MARQUEE_PADDING,
  alignment = "center",
  fadeOptions,
  hoverFactor = MARQUEE_HOVER_FACTOR,
  pauseOffscreen = true,
  pauseWhenHidden = true,
  reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
  disabled = false,
  className,
  style,
  listStyle,
  elementId,
  itemClassName,
  itemStyle,
  annotateItems = false,
  ariaHiddenItems = true,
}: MarqueeProps): React.ReactElement {
  const items = React.useMemo(() => React.Children.toArray(children), [children]);
  const itemCount = items.length;

  const parentRef = React.useRef<HTMLElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const firstRef = React.useRef<HTMLLIElement | null>(null);
  const lastRef = React.useRef<HTMLLIElement | null>(null);
  const animationRef = React.useRef<Animation | null>(null);

  const [size, setSize] = React.useState<Measurement>(ZERO);

  const prefersReduced = useReducedMotion();
  const reduced = reducedMotion === "settle" && prefersReduced === true;

  // `useInView` needs a RefObject; `pauseOffscreen: false` makes the result irrelevant.
  const inView = useInView(parentRef);
  const active = pauseOffscreen ? inView : true;

  const horizontal = isHorizontal(direction);

  /* ---- measure -------------------------------------------------------- */

  React.useLayoutEffect(() => {
    if (disabled) return;

    const measure = (): void => {
      const parentEl = parentRef.current;
      const firstEl = firstRef.current;
      const lastEl = lastRef.current;
      if (!parentEl || !firstEl || !lastEl) return;

      const parent = horizontal ? parentEl.offsetWidth : parentEl.offsetHeight;
      const start = horizontal ? firstEl.offsetLeft : firstEl.offsetTop;
      const end = horizontal
        ? lastEl.offsetLeft + lastEl.offsetWidth
        : lastEl.offsetTop + lastEl.offsetHeight;

      const next: Measurement = { parent, children: end - start + gap };
      setSize((prev) =>
        prev.parent === next.parent && prev.children === next.children ? prev : next,
      );
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    if (parentRef.current) observer.observe(parentRef.current);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [disabled, gap, horizontal, itemCount]);

  /* ---- derived -------------------------------------------------------- */

  const duplicateBy = disabled ? 0 : marqueeDuplicateBy(size.parent, size.children);
  const animateTo = disabled ? 0 : marqueeAnimateToValue(size.parent, size.children);
  const durationMs = marqueeDurationMs(animateTo, speed);

  /* ---- animate (WAAPI) ------------------------------------------------ */

  React.useEffect(() => {
    const list = listRef.current;
    if (disabled || reduced || !list || animateTo <= 0 || durationMs <= 0) return;
    if (typeof list.animate !== "function") return;

    const from = marqueeTransform(direction, 0);
    const to = marqueeTransform(direction, animateTo);

    const animation = list.animate(
      { transform: [from, to] },
      {
        duration: durationMs,
        iterations: Infinity,
        easing: "linear",
        // `right` / `down` are the same keyframes played backwards. The SSR'd base
        // transform therefore stays `translateX(-0px)` for every direction.
        direction:
          direction === "right" || direction === "down" ? "reverse" : "normal",
      },
    );
    animationRef.current = animation;

    return () => {
      animation.cancel();
      if (animationRef.current === animation) animationRef.current = null;
    };
  }, [animateTo, direction, disabled, durationMs, reduced]);

  /* ---- pause offscreen / on a hidden tab ------------------------------ */

  React.useEffect(() => {
    if (disabled || reduced) return;

    const sync = (): void => {
      const animation = animationRef.current;
      if (!animation) return;
      const hidden = pauseWhenHidden && typeof document !== "undefined" && document.hidden;
      const shouldRun = active && !hidden;
      if (shouldRun && animation.playState === "paused") animation.play();
      else if (!shouldRun && animation.playState === "running") animation.pause();
    };

    sync();
    if (!pauseWhenHidden) return;
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [active, animateTo, disabled, durationMs, pauseWhenHidden, reduced]);

  /* ---- hover: playbackRate = hoverFactor (MEASURED 1 → no-op) --------- */

  const handleMouseEnter = React.useCallback((): void => {
    const animation = animationRef.current;
    if (animation) animation.playbackRate = hoverFactor;
  }, [hoverFactor]);

  const handleMouseLeave = React.useCallback((): void => {
    const animation = animationRef.current;
    if (animation) animation.playbackRate = 1;
  }, []);

  /* ---- styles --------------------------------------------------------- */

  const {
    fadeContent = true,
    fadeWidth = MARQUEE_FADE_WIDTH,
    fadeInset = MARQUEE_FADE_INSET,
    fadeAlpha = MARQUEE_FADE_ALPHA,
    overflow = false,
  } = fadeOptions ?? {};

  const mask = fadeContent
    ? marqueeMaskImage(direction, fadeWidth, fadeInset, fadeAlpha)
    : undefined;

  const measured = size.parent > 0 && size.children > 0;
  const willChange = !disabled && !reduced && active ? "transform" : "auto";

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    placeItems: ALIGNMENT_TO_PLACE_ITEMS[alignment],
    margin: 0,
    padding,
    listStyleType: "none",
    textIndent: "none",
    // Framer SSRs `opacity: 0` and only reveals once the row has been measured and
    // duplicated — otherwise the single un-duplicated row flashes.
    opacity: disabled || measured ? 1 : 0,
    ...(mask ? { WebkitMaskImage: mask, maskImage: mask } : null),
    overflow: overflow ? "visible" : "hidden",
    ...style,
  };

  const ulStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    placeItems: ALIGNMENT_TO_PLACE_ITEMS[alignment],
    margin: 0,
    padding: 0,
    listStyleType: "none",
    textIndent: "none",
    gap,
    position: "relative",
    flexDirection: horizontal ? "row" : "column",
    willChange,
    transform: marqueeTransform(direction, 0),
    ...listStyle,
  };

  const cloneStyle: React.CSSProperties | undefined =
    willChange === "transform"
      ? { willChange: "transform", ...itemStyle }
      : itemStyle;

  /* ---- render --------------------------------------------------------- */

  const renderItem = (
    node: React.ReactNode,
    index: number,
    setIndex: number,
  ): React.ReactElement => {
    const original = setIndex === 0;
    return (
      <li
        key={`${setIndex}-${index}`}
        ref={
          // A single-item marquee is BOTH the first and the last child, so a plain
          // ref object on one branch of a ternary would leave `lastRef` null and the
          // row would never measure (and never reach opacity 1).
          original && (index === 0 || index === itemCount - 1)
            ? (node: HTMLLIElement | null) => {
                if (index === 0) firstRef.current = node;
                if (index === itemCount - 1) lastRef.current = node;
              }
            : undefined
        }
        className={itemClassName}
        aria-hidden={ariaHiddenItems ? "true" : undefined}
        aria-posinset={annotateItems ? index + 1 : undefined}
        aria-setsize={annotateItems ? itemCount : undefined}
        style={original ? itemStyle : cloneStyle}
      >
        {node}
      </li>
    );
  };

  return (
    <section
      ref={parentRef}
      id={elementId}
      className={className}
      style={sectionStyle}
      onMouseEnter={hoverFactor === 1 ? undefined : handleMouseEnter}
      onMouseLeave={hoverFactor === 1 ? undefined : handleMouseLeave}
    >
      <ul ref={listRef} style={ulStyle}>
        {items.map((node, index) => renderItem(node, index, 0))}
        {Array.from({ length: duplicateBy }, (_unused, setIndex) =>
          items.map((node, index) => renderItem(node, index, setIndex + 1)),
        )}
      </ul>
    </section>
  );
}

export default Marquee;
