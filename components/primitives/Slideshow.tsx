"use client";

/**
 * Slideshow — the testimonials carousel (`framer-slideshow-component`).
 *
 * A faithful re-implementation of the Framer-marketplace "Slideshow V2.5 (with SSR)"
 * component, reverse-engineered from its own source map:
 *   _source/behaviours/chunks/maps/y-tGuQz7XPPTEFCnbfLGyixHGBVrBORQEKbNuIp0in4.DcwpVv6A.mjs.map
 *   → sourcesContent[25]  (SlideShow.js, 36KB, full original source)
 * Instance props: sourcesContent[58] (augiA20Il.js, node `etb5IiAXZ`).
 * Prose spec: _source/behaviours/slideshow.md.
 *
 * MEASURED facts this component encodes (all verified against the live site):
 *
 *  - Slide transition: `{ type:"spring", stiffness:200, damping:40, mass:1, delay:0 }`.
 *    The instance DOES pass `transitionControl` (slideshow.md says it does not — the values
 *    happen to equal the component default, so the conclusion was right anyway).
 *    Damping ratio 40 / (2·√200) ≈ 1.414 → over-damped, ZERO overshoot. Settles in ~1.26s.
 *  - Edge behaviour: INFINITE WRAP, never clamps. `currentItem` is an unbounded integer;
 *    the visible offset is `wrap(-C, -2C, x)` over a 4×-duplicated row, so one full period
 *    is pixel-identical and the seam is invisible. Arrows are NEVER disabled at an edge —
 *    `disabled` is only `!isInitialized` (i.e. before the first measurement, which is also
 *    the SSR state).
 *  - Step: one item, `-(itemSize + gap)` px. `itemSize` is DERIVED, not the card's 365px CSS
 *    width: each slide is `calc(100/itemAmount% - gap + gap/itemAmount)` of the track.
 *    Live desktop @1440: track 1154px, itemAmount 3, gap 10 → item 378px, step 388px.
 *    Live capture: -1940 → -2328 → -2716 → -3104 on three Next presses (exactly -388 each).
 *  - First paint: the track does NOT animate into place. Measured at rAF granularity on the
 *    live site (3574 samples): the ul goes straight from the static SSR transform to
 *    `translateX(-1940px)` in a single frame. We reproduce that by SNAPPING on the first
 *    measurement and only springing on subsequent `currentItem` changes.
 *  - Arrow press feedback: `whileTap={{ scale: 0.9 }}` + `transition={{ duration: 0.15 }}`.
 *    slideshow.md flagged the tap TARGET as ESTIMATED at 0.95 — the real value read out of
 *    the source is 0.9. There is NO whileHover on the arrows at all; the
 *    `{ duration: 0.35, ease: "easeOut" }` in slideshow.md belongs to the progress-DOTS
 *    container fade, which is dead code here (`showProgressDots: false`).
 *  - NO autoplay (`autoPlayControl: false`; `intervalControl: 1.5` is inert),
 *    NO dots (`showProgressDots: false`),
 *    NO hover effect (`effectsHover: true` but opacity/scale/rotate are all identity).
 *  - Drag: `dragControl: false` on desktop AND tablet, but the PHONE breakpoint override
 *    sets `dragControl: true`. slideshow.md's "no drag, including on touch" is the base
 *    variant only. See SLIDESHOW_TESTIMONIALS.
 *  - Per-breakpoint slides-per-view: desktop 3 / tablet 2 / phone 1 (`itemAmount`
 *    overrides on `kqIoGYUMf` = tablet and `pK3PnwnUJ` = phone).
 *
 * SSR contract: until the first measurement lands, this renders EXACTLY Framer's SSR shape —
 * one copy of the slides, the static `translateX(calc(var(--framer-dir-multiplier,-1) * …))`
 * transform, `opacity:0` + `disabled` arrows, no per-slide effect styles. So hydration is
 * byte-compatible and there is no mismatch.
 */

import * as React from "react";
import {
  animate,
  frame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
  type MotionValue,
  type PanInfo,
  type Transition,
} from "motion/react";

import {
  DEFAULT_REDUCED_MOTION_POLICY,
  motionComponent,
  type MotionTagName,
  type ReducedMotionPolicy,
} from "./AppearMotion";

/* -------------------------------------------------------------------------- */
/* Constants — MEASURED                                                        */
/* -------------------------------------------------------------------------- */

/** Class names the component itself emits; `app/framer/layout.css` styles the axis ones. */
export const SLIDESHOW_CLASS_NAME = "framer-slideshow";
export const SLIDESHOW_AXIS_X_CLASS_NAME = "framer-slideshow-axis-x";
export const SLIDESHOW_AXIS_Y_CLASS_NAME = "framer-slideshow-axis-y";
export const SLIDESHOW_CONTROLS_CLASS_NAME = "framer--slideshow-controls";

/** `--framer-dir-multiplier`, set to -1 by `.framer-slideshow-axis-x` (1 under `dir=rtl`). */
const DIRECTION_MULTIPLIER_VAR = "var(--framer-dir-multiplier, -1)";

/** MEASURED slide-advance transition. Over-damped; never re-parameterise it. */
export const SLIDESHOW_TRANSITION: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 40,
  mass: 1,
  delay: 0,
};

/** MEASURED arrow press feedback. */
export const SLIDESHOW_ARROW_TAP = { scale: 0.9 } as const;
export const SLIDESHOW_ARROW_TAP_TRANSITION: Transition = { duration: 0.15 };

/**
 * The two parameterised arrow SVGs, resolved through `_source/asset-map.json`:
 *   …/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg?arrow=left
 *   …/11KSGbIZoRSg4pjdnUoif6MKHI.svg?arrow=right
 */
export const SLIDESHOW_ARROW_LEFT_SRC =
  "/assets/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.dc4be83f.svg";
export const SLIDESHOW_ARROW_RIGHT_SRC =
  "/assets/images/11KSGbIZoRSg4pjdnUoif6MKHI.76921351.svg";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type SlideshowDirection = "left" | "right" | "top" | "bottom";
export type SlideshowAlignment = "flex-start" | "center" | "flex-end";
export type SlideshowArrowPosition =
  | "auto"
  | "top-left"
  | "top-mid"
  | "top-right"
  | "bottom-left"
  | "bottom-mid"
  | "bottom-right";

export interface SlideshowArrowOptions {
  showMouseControls: boolean;
  arrowSize: number;
  arrowRadius: number;
  /** Any CSS colour; the site passes a Framer colour token with an rgb() fallback. */
  arrowFill: string;
  arrowGap: number;
  arrowPadding: number;
  arrowPaddingTop: number;
  arrowPaddingRight: number;
  arrowPaddingBottom: number;
  arrowPaddingLeft: number;
  arrowPosition: SlideshowArrowPosition;
  arrowShouldSpace: boolean;
  arrowShouldFadeIn: boolean;
  leftArrow: string;
  rightArrow: string;
}

/** MEASURED base (desktop) arrow configuration of the testimonials instance. */
export const SLIDESHOW_ARROW_DEFAULTS: SlideshowArrowOptions = {
  showMouseControls: true,
  arrowSize: 40,
  arrowRadius: 40,
  arrowFill: "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))",
  arrowGap: 10,
  arrowPadding: -12,
  arrowPaddingTop: -75,
  arrowPaddingRight: 0,
  arrowPaddingBottom: 0,
  arrowPaddingLeft: 0,
  arrowPosition: "top-right",
  arrowShouldSpace: false,
  arrowShouldFadeIn: false,
  leftArrow: SLIDESHOW_ARROW_LEFT_SRC,
  rightArrow: SLIDESHOW_ARROW_RIGHT_SRC,
};

export interface SlideshowOwnProps {
  /** One element per slide. Framer filters falsy slots; so do we. */
  children?: React.ReactNode;
  /** Slides visible at once. MEASURED: desktop 3, tablet 2, phone 1. */
  itemAmount?: number;
  /** Gap between slides, px. MEASURED 10. */
  gap?: number;
  /** Index the deck starts on. MEASURED 0. */
  startFrom?: number;
  /** MEASURED `"left"`. */
  direction?: SlideshowDirection;
  /** `place-items` on the track. MEASURED `"center"`. */
  alignment?: SlideshowAlignment;
  /** px. MEASURED 0. */
  padding?: number;
  /** px. MEASURED 0. */
  borderRadius?: number;
  /** Pointer drag. MEASURED false on desktop/tablet, TRUE on phone. */
  dragControl?: boolean;
  /** `perspective` on the clipping box. MEASURED 1200. */
  effectsPerspective?: number;
  /** Slide-advance transition. Defaults to the MEASURED spring; do not re-tune. */
  transition?: Transition;
  arrowOptions?: Partial<SlideshowArrowOptions>;
  /**
   * `"settle"` (default, consistent with the other primitives) — under
   * `prefers-reduced-motion: reduce` an arrow press jumps instead of springing.
   * `"animate"` — always spring, which is what the live site literally does.
   */
  reducedMotion?: ReducedMotionPolicy;
  className?: string;
  style?: React.CSSProperties;
}

export type SlideshowProps = SlideshowOwnProps &
  Omit<React.ComponentPropsWithoutRef<"section">, keyof SlideshowOwnProps | "ref">;

interface SlideshowSize {
  parent: number | null;
  children: number | null;
  item: number | null;
  itemWidth: number | null;
  itemHeight: number | null;
  viewportLength: number | null;
}

const EMPTY_SIZE: SlideshowSize = {
  parent: null,
  children: null,
  item: null,
  itemWidth: null,
  itemHeight: null,
  viewportLength: null,
};

/* -------------------------------------------------------------------------- */
/* Static styles — ported verbatim from the component source                   */
/* -------------------------------------------------------------------------- */

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  placeItems: "center",
  margin: 0,
  padding: 0,
  listStyleType: "none",
  // Invalid CSS, but it is in Framer's SSR output byte-for-byte; browsers drop it.
  textIndent: "none",
};

const controlsStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  pointerEvents: "none",
  userSelect: "none",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  border: 0,
  padding: 0,
  margin: 0,
};

const baseButtonStyles: React.CSSProperties = {
  border: "none",
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  overflow: "hidden",
  background: "transparent",
  cursor: "pointer",
  margin: 0,
  padding: 0,
};

const MotionUl = motionComponent("ul");
const MotionArrowBar = motionComponent("div");
const MotionButton = motionComponent("button");

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * `useTransform` needs a strictly increasing input range. Before the first measurement
 * every measured length is 0, which collapses the range; nudge it so the hooks stay
 * valid. The outputs are unused until `isInitialized`.
 */
function monotonic(values: number[]): number[] {
  const out = values.slice();
  for (let i = 1; i < out.length; i++) {
    if (!(out[i] > out[i - 1])) out[i] = out[i - 1] + 0.001;
  }
  return out;
}

type SlideElement = React.ReactElement<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;

/* -------------------------------------------------------------------------- */
/* Slide                                                                       */
/* -------------------------------------------------------------------------- */

interface SlideProps {
  child: SlideElement;
  width: string;
  height: string;
  gap: number;
  /** Absolute index across the duplicated row — drives this slide's scroll range. */
  childCounter: number;
  itemSize: number;
  parentSize: number;
  viewportLength: number;
  wrappedXOrY: MotionValue<number>;
  isInitialized: boolean;
  isHorizontal: boolean;
  effectsOpacity: number;
  effectsScale: number;
  effectsRotate: number;
}

function Slide(props: SlideProps): React.ReactElement {
  const {
    child,
    width,
    height,
    gap,
    childCounter,
    itemSize,
    parentSize,
    viewportLength,
    wrappedXOrY,
    isInitialized,
    isHorizontal,
    effectsOpacity,
    effectsScale,
    effectsRotate,
  } = props;

  const liRef = React.useRef<HTMLLIElement | null>(null);

  // Unique offsets + scroll range [0, 1, 1, 0] — verbatim from the source (LTR branch).
  const childOffset = (itemSize + gap) * childCounter;
  const scrollRange = monotonic(
    [-itemSize, 0, parentSize - itemSize + gap, parentSize].map((v) => v - childOffset),
  );
  const visibilityRange = monotonic([
    scrollRange[0] - viewportLength,
    (scrollRange[1] + scrollRange[2]) / 2,
    scrollRange[3] + viewportLength,
  ]);

  const rotateY = useTransform(wrappedXOrY, scrollRange, [
    -effectsRotate,
    0,
    0,
    effectsRotate,
  ]);
  const rotateX = useTransform(wrappedXOrY, scrollRange, [
    effectsRotate,
    0,
    0,
    -effectsRotate,
  ]);
  const opacity = useTransform(wrappedXOrY, scrollRange, [
    effectsOpacity,
    1,
    1,
    effectsOpacity,
  ]);
  const scale = useTransform(wrappedXOrY, scrollRange, [effectsScale, 1, 1, effectsScale]);
  const originXorY = useTransform(wrappedXOrY, scrollRange, [1, 1, 0, 0]);
  const visibility = useTransform(wrappedXOrY, visibilityRange, [
    "hidden",
    "visible",
    "hidden",
  ]);

  const isIntrinsic = typeof child.type === "string";

  // a11y: Framer mirrors the visual `visibility` onto `aria-hidden` and tabIndex of the
  // slide's focusable descendants, so the duplicated off-screen copies are not reachable.
  React.useEffect(() => {
    if (!isInitialized) return;
    const apply = (visible: boolean) => {
      const node = liRef.current?.firstElementChild;
      if (!node) return;
      node.querySelectorAll<HTMLElement>("button,a").forEach((el) => {
        if (visible) {
          const orig = el.dataset.origTabIndex;
          if (orig) el.tabIndex = Number(orig);
          else el.removeAttribute("tabIndex");
        } else {
          const orig = el.getAttribute("tabIndex");
          if (orig) el.dataset.origTabIndex = orig;
          el.tabIndex = -1;
        }
      });
      node.setAttribute("aria-hidden", String(!visible));
    };
    apply(visibility.get() === "visible");
    return visibility.on("change", (v) => apply(v === "visible"));
  }, [isInitialized, visibility]);

  // Non-intrinsic children (a React component) cannot take MotionValues in `style`, so
  // mirror the only non-identity effect — `visibility` — through state instead.
  const [fallbackVisible, setFallbackVisible] = React.useState(true);
  React.useEffect(() => {
    if (isIntrinsic || !isInitialized) return;
    setFallbackVisible(visibility.get() === "visible");
    return visibility.on("change", (v) => setFallbackVisible(v === "visible"));
  }, [isIntrinsic, isInitialized, visibility]);

  const baseStyle: React.CSSProperties = {
    ...child.props.style,
    flexShrink: 0,
    userSelect: "none",
    width,
    height,
  };

  let rendered: React.ReactNode;
  if (isIntrinsic) {
    const Tag = motionComponent(child.type as MotionTagName);
    const childProps = child.props as Record<string, unknown>;
    rendered = (
      <Tag
        {...childProps}
        style={
          isInitialized
            ? {
                ...baseStyle,
                opacity,
                scale,
                originX: isHorizontal ? originXorY : 0.5,
                originY: !isHorizontal ? originXorY : 0.5,
                rotateY: isHorizontal ? rotateY : 0,
                rotateX: !isHorizontal ? rotateX : 0,
                visibility,
              }
            : baseStyle
        }
      />
    );
  } else {
    rendered = React.cloneElement(child, {
      style: isInitialized
        ? { ...baseStyle, visibility: fallbackVisible ? "visible" : "hidden" }
        : baseStyle,
    });
  }

  return (
    <li ref={liRef} style={{ display: "contents" }}>
      {rendered}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Slideshow                                                                   */
/* -------------------------------------------------------------------------- */

export function Slideshow(props: SlideshowProps): React.ReactElement {
  const {
    children,
    itemAmount = 3,
    gap = 10,
    startFrom = 0,
    direction = "left",
    alignment = "center",
    padding = 0,
    borderRadius = 0,
    dragControl = false,
    effectsPerspective = 1200,
    transition = SLIDESHOW_TRANSITION,
    arrowOptions,
    reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
    className,
    style,
    ...rest
  } = props;

  const arrows: SlideshowArrowOptions = { ...SLIDESHOW_ARROW_DEFAULTS, ...arrowOptions };

  const slides = React.useMemo(() => {
    const out: SlideElement[] = [];
    React.Children.forEach(children, (node) => {
      if (React.isValidElement(node)) out.push(node as SlideElement);
    });
    return out;
  }, [children]);

  const totalItemsCount = slides.length;
  const safeTotal = Math.max(1, totalItemsCount);
  const isHorizontal = direction === "left" || direction === "right";

  const parentRef = React.useRef<HTMLUListElement | null>(null);
  const childrenSizeRef = React.useRef(0);
  const hasSnappedRef = React.useRef(false);

  const [size, setSize] = React.useState<SlideshowSize>(EMPTY_SIZE);
  /* Park on the second copy so a Previous press has somewhere to go. MEASURED start. */
  const [currentItem, setCurrentItem] = React.useState(startFrom + totalItemsCount);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const prefersReducedMotion = useReducedMotion();
  const snapInsteadOfSpring =
    reducedMotion === "settle" && prefersReducedMotion === true;

  const xOrY = useMotionValue(0);
  const wrappedXOrY = useTransform(xOrY, (value) => {
    const c = childrenSizeRef.current;
    if (!c) return 0;
    const wrapped = wrap(-c, -c * 2, value);
    return Number.isNaN(wrapped) ? 0 : wrapped;
  });

  /**
   * `isInitialized` gates the whole live mode. `parent > 0` is a deliberate addition:
   * all three breakpoint variants are in the DOM at once (Framer's `ssr-variant` /
   * `hidden-*` pattern) and the inactive ones are `display:none`, so they measure 0.
   * Without the guard they would "initialise" with a zero item size and render a
   * collapsed track. With it they stay in the SSR state until they are shown, and the
   * ResizeObserver re-measures them at that moment.
   */
  const isInitialized =
    size.item !== null && size.parent !== null && size.parent > 0;

  /* ---------------------------------------------------------------- measure */

  const measure = React.useCallback(() => {
    const ul = parentRef.current;
    if (!ul) return;
    const items = ul.children;
    // `<li>` is display:contents and has no box; the slide element is its only child.
    const firstChild = items[0]?.firstElementChild as HTMLElement | undefined;
    const lastChild = items[safeTotal - 1]?.firstElementChild as HTMLElement | undefined;
    if (!firstChild || !lastChild) return;

    const parentLength = isHorizontal ? ul.offsetWidth : ul.offsetHeight;
    const start = isHorizontal ? firstChild.offsetLeft : firstChild.offsetTop;
    const end = isHorizontal
      ? lastChild.offsetLeft + lastChild.offsetWidth
      : lastChild.offsetTop + lastChild.offsetHeight;
    const childrenLength = end - start + gap;
    const itemSize = isHorizontal ? firstChild.offsetWidth : firstChild.offsetHeight;
    const viewportLength = isHorizontal
      ? Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0,
          ul.offsetWidth,
        )
      : Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0,
          ul.offsetHeight,
        );

    childrenSizeRef.current = childrenLength;
    setSize((prev) =>
      prev.parent === parentLength &&
      prev.children === childrenLength &&
      prev.item === itemSize &&
      prev.viewportLength === viewportLength
        ? prev
        : {
            parent: parentLength,
            children: childrenLength,
            item: itemSize,
            itemWidth: firstChild.offsetWidth,
            itemHeight: firstChild.offsetHeight,
            viewportLength,
          },
    );
  }, [gap, isHorizontal, safeTotal]);

  const scheduleMeasure = React.useCallback(() => {
    frame.read(measure, false, true);
  }, [measure]);

  React.useLayoutEffect(() => {
    scheduleMeasure();
  }, [scheduleMeasure, totalItemsCount, itemAmount, gap, direction, padding]);

  React.useEffect(() => {
    const node = parentRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => scheduleMeasure());
    ro.observe(node);
    return () => ro.disconnect();
  }, [scheduleMeasure]);

  /* -------------------------------------------------------------- animation */

  const targetFor = React.useCallback(
    (item: number) => {
      const itemSize = size.item ?? 0;
      return -1 * item * (itemSize + gap);
    },
    [gap, size.item],
  );

  React.useEffect(() => {
    const itemSize = size.item;
    if (itemSize === null || itemSize <= 0) return;
    const target = -1 * currentItem * (itemSize + gap);
    if (xOrY.get() === target) return;
    // First landing: snap. MEASURED — the live site jumps straight to the rest offset in
    // one frame rather than springing in from 0.
    if (!hasSnappedRef.current || snapInsteadOfSpring) {
      hasSnappedRef.current = true;
      xOrY.set(target);
      return;
    }
    const controls = animate(xOrY, target, transition);
    return () => controls.stop();
  }, [currentItem, size.item, gap, transition, snapInsteadOfSpring, xOrY]);

  const setDelta = React.useCallback((delta: number) => {
    React.startTransition(() => setCurrentItem((item) => item + delta));
  }, []);

  /* ------------------------------------------------------------------- drag */

  const dragOriginRef = React.useRef(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handlePanStart = React.useCallback(() => {
    dragOriginRef.current = xOrY.get();
    setIsDragging(true);
  }, [xOrY]);

  const handlePan = React.useCallback(
    (_event: unknown, info: PanInfo) => {
      xOrY.set(dragOriginRef.current + (isHorizontal ? info.offset.x : info.offset.y));
    },
    [isHorizontal, xOrY],
  );

  /** Ported verbatim from the source's `handleDragEnd` (`dragMomentum: false`). */
  const handlePanEnd = React.useCallback(
    (_event: unknown, info: PanInfo) => {
      setIsDragging(false);
      const itemSize = size.item ?? 0;
      if (itemSize <= 0) return;
      const offsetXorY = isHorizontal ? info.offset.x : info.offset.y;
      const velocityXorY = isHorizontal ? info.velocity.x : info.velocity.y;
      const velocityThreshold = 200;
      const isHalfOfNext = offsetXorY < -itemSize / 2;
      const isHalfOfPrev = offsetXorY > itemSize / 2;
      const itemDelta = Math.round(Math.abs(offsetXorY) / itemSize);
      const itemDeltaFromOne = itemDelta === 0 ? 1 : itemDelta;

      let delta = 0;
      if (velocityXorY > velocityThreshold) delta = -itemDeltaFromOne;
      else if (velocityXorY < -velocityThreshold) delta = itemDeltaFromOne;
      else if (isHalfOfNext) delta = itemDelta;
      else if (isHalfOfPrev) delta = -itemDelta;

      if (delta !== 0) setDelta(delta);
      // Nothing changed, so the effect above will not fire — re-settle onto the grid.
      else animate(xOrY, targetFor(currentItem), transition);
    },
    [currentItem, isHorizontal, setDelta, size.item, targetFor, transition, xOrY],
  );

  /* ----------------------------------------------------------- duplication */

  /**
   * SSR / pre-measure renders ONE copy (Framer does the same), live mode renders 4×.
   * `extraCopyCount` covers the cases where a single copy cannot fill the viewport.
   */
  const extraCopyCount = Math.ceil((startFrom + itemAmount) / safeTotal);
  const duplicateBy = isInitialized ? extraCopyCount * 4 : extraCopyCount;

  const itemLength = `calc(${100 / itemAmount}% - ${gap}px + ${gap / itemAmount}px)`;
  const slideWidth = isHorizontal ? (itemAmount > 1 ? itemLength : "100%") : "100%";
  const slideHeight = !isHorizontal ? (itemAmount > 1 ? itemLength : "100%") : "100%";

  const dupedChildren: React.ReactNode[] = [];
  let childCounter = 0;
  for (let copy = 0; copy < duplicateBy; copy++) {
    for (let index = 0; index < totalItemsCount; index++) {
      dupedChildren.push(
        <Slide
          key={`${copy}-${index}`}
          child={slides[index]}
          width={slideWidth}
          height={slideHeight}
          gap={gap}
          childCounter={childCounter++}
          itemSize={size.item ?? 0}
          parentSize={size.parent ?? 0}
          viewportLength={size.viewportLength ?? 0}
          wrappedXOrY={wrappedXOrY}
          isInitialized={isInitialized}
          isHorizontal={isHorizontal}
          /* effectsOpacity / effectsScale / effectsRotate are all identity on this
             instance (1 / 1 / 0), so these transforms are visual no-ops — but they are
             what the component computes, and `visibility` above is NOT a no-op. */
          effectsOpacity={1}
          effectsScale={1}
          effectsRotate={0}
        />,
      );
    }
  }

  /* --------------------------------------------------------------- controls */

  const { arrowPosition } = arrows;
  const arrowHasTop =
    arrowPosition === "top-left" ||
    arrowPosition === "top-mid" ||
    arrowPosition === "top-right";
  const arrowHasBottom =
    arrowPosition === "bottom-left" ||
    arrowPosition === "bottom-mid" ||
    arrowPosition === "bottom-right";
  const arrowHasLeft = arrowPosition === "top-left" || arrowPosition === "bottom-left";
  const arrowHasRight = arrowPosition === "top-right" || arrowPosition === "bottom-right";
  const arrowHasMid =
    arrowPosition === "top-mid" ||
    arrowPosition === "bottom-mid" ||
    arrowPosition === "auto";

  const arrowButtonStyle: React.CSSProperties = {
    ...baseButtonStyles,
    backgroundColor: arrows.arrowFill,
    width: arrows.arrowSize,
    height: arrows.arrowSize,
    borderRadius: arrows.arrowRadius,
    display: arrows.showMouseControls ? "block" : "none",
    pointerEvents: isInitialized ? "auto" : "none",
    cursor: isInitialized ? "pointer" : "default",
  };
  const arrowRotate = isHorizontal ? 0 : 90;

  const staticStartFrom = Math.max(0, Math.min(startFrom, Math.max(0, totalItemsCount - 1)));
  const staticPercentOffset = (staticStartFrom * 100) / itemAmount;
  const staticPixelOffset = (staticStartFrom * gap) / itemAmount;
  const staticTransform = `translate${isHorizontal ? "X" : "Y"}(calc(${DIRECTION_MULTIPLIER_VAR} * (${staticPercentOffset}% + ${staticPixelOffset}px)))`;

  const trackStyle: React.CSSProperties = {
    ...containerStyle,
    gap,
    placeItems: alignment,
    ...(isInitialized
      ? { x: isHorizontal ? wrappedXOrY : 0, y: !isHorizontal ? wrappedXOrY : 0 }
      : { transform: staticTransform }),
    flexDirection: isHorizontal ? "row" : "column",
    cursor: isInitialized && dragControl ? (isMouseDown ? "grabbing" : "grab") : "auto",
    userSelect: "none",
    ...(isInitialized && dragControl
      ? { touchAction: isHorizontal ? "pan-y" : "pan-x" }
      : null),
    ...style,
  } as React.CSSProperties;

  const dragHandlers =
    isInitialized && dragControl
      ? { onPanStart: handlePanStart, onPan: handlePan, onPanEnd: handlePanEnd }
      : {};

  return (
    <section
      {...rest}
      className={[
        SLIDESHOW_CLASS_NAME,
        isHorizontal ? SLIDESHOW_AXIS_X_CLASS_NAME : SLIDESHOW_AXIS_Y_CLASS_NAME,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...containerStyle, padding: `${padding}px`, userSelect: "none" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={(event) => {
        // preventDefault stops Safari switching the cursor to a text caret mid-drag.
        event.preventDefault();
        React.startTransition(() => setIsMouseDown(true));
      }}
      onMouseUp={() => React.startTransition(() => setIsMouseDown(false))}
      data-slideshow-dragging={isDragging ? "true" : undefined}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          padding: "inherit",
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius,
          userSelect: "none",
          perspective: effectsPerspective,
        }}
      >
        <MotionUl ref={parentRef} {...dragHandlers} style={trackStyle}>
          {dupedChildren}
        </MotionUl>
      </div>

      <fieldset
        style={controlsStyles}
        aria-label="Slideshow pagination controls"
        className={SLIDESHOW_CONTROLS_CLASS_NAME}
      >
        <MotionArrowBar
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isHorizontal ? "row" : "column",
            justifyContent: arrows.arrowShouldSpace ? "space-between" : "center",
            gap: arrows.arrowShouldSpace ? "unset" : arrows.arrowGap,
            opacity: arrows.arrowShouldFadeIn || !isInitialized ? 0 : 1,
            alignItems: "center",
            inset: arrows.arrowPadding,
            top: arrows.arrowShouldSpace
              ? arrows.arrowPadding
              : arrowHasTop
                ? arrows.arrowPaddingTop
                : "unset",
            left: arrows.arrowShouldSpace
              ? arrows.arrowPadding
              : arrowHasLeft
                ? arrows.arrowPaddingLeft
                : arrowHasMid
                  ? 0
                  : "unset",
            right: arrows.arrowShouldSpace
              ? arrows.arrowPadding
              : arrowHasRight
                ? arrows.arrowPaddingRight
                : arrowHasMid
                  ? 0
                  : "unset",
            bottom: arrows.arrowShouldSpace
              ? arrows.arrowPadding
              : arrowHasBottom
                ? arrows.arrowPaddingBottom
                : "unset",
          }}
          animate={
            isInitialized
              ? arrows.arrowShouldFadeIn
                ? { opacity: isHovering ? 1 : 0 }
                : { opacity: 1 }
              : { opacity: 0 }
          }
          transition={transition}
        >
          <MotionButton
            type="button"
            style={{ ...arrowButtonStyle, rotate: arrowRotate }}
            disabled={!isInitialized}
            onClick={() => setDelta(-1)}
            aria-label="Previous"
            whileTap={SLIDESHOW_ARROW_TAP}
            transition={SLIDESHOW_ARROW_TAP_TRANSITION}
          >
            <img
              decoding="async"
              width={arrows.arrowSize}
              height={arrows.arrowSize}
              src={arrows.leftArrow}
              alt="Back Arrow"
            />
          </MotionButton>
          <MotionButton
            type="button"
            style={{ ...arrowButtonStyle, rotate: arrowRotate }}
            disabled={!isInitialized}
            onClick={() => setDelta(1)}
            aria-label="Next"
            whileTap={SLIDESHOW_ARROW_TAP}
            transition={SLIDESHOW_ARROW_TAP_TRANSITION}
          >
            <img
              decoding="async"
              width={arrows.arrowSize}
              height={arrows.arrowSize}
              src={arrows.rightArrow}
              alt="Next Arrow"
            />
          </MotionButton>
        </MotionArrowBar>
      </fieldset>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The home-page testimonials instance — MEASURED per-breakpoint prop sets      */
/* -------------------------------------------------------------------------- */

/**
 * Props of `etb5IiAXZ` (home → Testimonials → `.framer-1huz0j-container`), per breakpoint.
 *
 * Base (`WQLkyLRf1`, desktop) plus the two `PropertyOverrides`:
 *   `kqIoGYUMf` (tablet 810–1199.98) → `{ itemAmount: 2 }`
 *   `pK3PnwnUJ` (phone ≤809.98)      → `{ itemAmount: 1, dragControl: true,
 *                                        arrowPosition: "bottom-right",
 *                                        arrowPaddingBottom: -45 }`
 *
 * Render all three `ssr-variant` wrappers exactly as the SSR'd HTML does — the
 * `hidden-*` classes pick the live one, and the inactive ones stay in the SSR state:
 *
 *   <ScrollReveal enter="animation2" transition="t5" className="framer-1huz0j-container">
 *     <div className="ssr-variant hidden-1lsm0lh hidden-19fjg0f">
 *       <Slideshow {...SLIDESHOW_TESTIMONIALS.desktop}>{cards}</Slideshow>
 *     </div>
 *     <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
 *       <Slideshow {...SLIDESHOW_TESTIMONIALS.tablet}>{cards}</Slideshow>
 *     </div>
 *     <div className="ssr-variant hidden-1lsm0lh hidden-72rtr7">
 *       <Slideshow {...SLIDESHOW_TESTIMONIALS.phone}>{cards}</Slideshow>
 *     </div>
 *   </ScrollReveal>
 */
export const SLIDESHOW_TESTIMONIALS: Readonly<
  Record<"desktop" | "tablet" | "phone", SlideshowOwnProps>
> = {
  desktop: {
    itemAmount: 3,
    gap: 10,
    startFrom: 0,
    direction: "left",
    alignment: "center",
    padding: 0,
    borderRadius: 0,
    dragControl: false,
    effectsPerspective: 1200,
  },
  tablet: {
    itemAmount: 2,
    gap: 10,
    startFrom: 0,
    direction: "left",
    alignment: "center",
    padding: 0,
    borderRadius: 0,
    dragControl: false,
    effectsPerspective: 1200,
  },
  phone: {
    itemAmount: 1,
    gap: 10,
    startFrom: 0,
    direction: "left",
    alignment: "center",
    padding: 0,
    borderRadius: 0,
    dragControl: true,
    effectsPerspective: 1200,
    arrowOptions: {
      arrowPosition: "bottom-right",
      arrowPaddingTop: -75,
      arrowPaddingBottom: -45,
      arrowPaddingLeft: 0,
      arrowPaddingRight: 0,
    },
  },
};

export default Slideshow;
