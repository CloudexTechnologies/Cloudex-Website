/**
 * Motion-core primitives barrel.
 *
 * Other primitives owned by other agents (RollingText, Marquee, Accordion, Slideshow —
 * PLAN.md §3) should add their own re-export lines below; do not edit the blocks above
 * the marker.
 */

/* --- motion core ---------------------------------------------------------- */

export {
  AppearMotion,
  DEFAULT_REDUCED_MOTION_POLICY,
  motionComponent,
  type AppearMotionOwnProps,
  type AppearMotionProps,
  type MotionTagName,
  type ReducedMotionPolicy,
} from "./AppearMotion";

export {
  NoScriptMotionFallback,
  REVEAL_ANIMATION_ALIASES,
  REVEAL_DIRECTIONS,
  REVEAL_ENTER,
  REVEAL_REST,
  REVEAL_SPRING,
  REVEAL_TRANSITIONS,
  REVEAL_VIEWPORT,
  ScrollReveal,
  revealDirectionFor,
  type RevealAnimationAlias,
  type RevealDirection,
  type RevealTransitionKey,
  type ScrollRevealOwnProps,
  type ScrollRevealProps,
} from "./ScrollReveal";

/* --- re-exported data layer (convenience) --------------------------------- */

export {
  APPEAR_IDS,
  APPEAR_IDS_TO_DROP,
  APPEAR_SPECS,
  getAppearMotionProps,
  getAppearRestState,
  getAppearSpec,
  isAppearId,
  toMotionProps,
  type AppearId,
  type AppearMotionSpec,
  type AppearVariant,
} from "@/lib/appear";

export {
  BREAKPOINT_HASHES,
  BREAKPOINT_NAMES,
  BREAKPOINT_SCOPES,
  BreakpointProvider,
  MEDIA_QUERIES,
  getBreakpointHash,
  hiddenClassName,
  resolveBreakpoint,
  useAppearVariantKey,
  useBreakpoint,
  useBreakpointHash,
  type BreakpointName,
  type BreakpointScope,
} from "@/lib/breakpoints";

/* --- other primitives (add below) ----------------------------------------- */

/** The component itself is a Client Component. */
export { RollingText, type RollingTextProps } from "./RollingText";

/**
 * …its measured constants + uuid registry live in a module with no `"use client"`, so a
 * Server Component may import them from here too (same trick as `lib/breakpoints.ts`).
 */
export {
  ROLLING_TEXT_COLORS,
  ROLLING_TEXT_FONT_FAMILY,
  ROLLING_TEXT_FONT_SIZE,
  ROLLING_TEXT_FONT_WEIGHT,
  ROLLING_TEXT_INSTANCES,
  ROLLING_TEXT_LABELS,
  ROLLING_TEXT_LETTER_SPACING,
  ROLLING_TEXT_LINE_HEIGHT,
  ROLLING_TEXT_LINE_HEIGHT_ABS,
  ROLLING_TEXT_PADDING,
  ROLL_DURATION,
  ROLL_EASE,
  ROLL_INSTANT_TRANSITION,
  ROLL_REVERSE,
  ROLL_STAGGER,
  ROLL_TRANSITION,
  hasRollingTextRule,
  rollDelay,
  rollingTextClassName,
  rollingTextUuid,
  rollingTextUuidsByTone,
  type RollingTextInstance,
  type RollingTextLabel,
  type RollingTextTone,
} from "@/lib/rolling-text";


/* --- Accordion (FAQ row) --------------------------------------------------- */

export {
  ACCORDION_CLOSED_HEIGHT,
  ACCORDION_ENTER_DIRECTION,
  ACCORDION_ENTER_TRANSITIONS,
  ACCORDION_ICON_ROTATION,
  ACCORDION_PADDING,
  ACCORDION_ROW_BASE_CLASS,
  ACCORDION_ROW_CONTAINER_CLASSES,
  ACCORDION_SERIALIZATION_HASH,
  ACCORDION_SPRING,
  ACCORDION_VARIANT_CLASS_NAMES,
  Accordion,
  AccordionChevron,
  AccordionRow,
  type AccordionRowOwnProps,
  type AccordionRowProps,
} from "./Accordion";


/* --- Marquee (Ticker) ------------------------------------------------------ */

export {
  MARQUEE_FADE_ALPHA,
  MARQUEE_FADE_INSET,
  MARQUEE_FADE_WIDTH,
  MARQUEE_GAP,
  MARQUEE_HOVER_FACTOR,
  MARQUEE_PADDING,
  MARQUEE_SPEED,
  MAX_DUPLICATED_ITEMS,
  Marquee,
  isHorizontal,
  marqueeAnimateToValue,
  marqueeDurationMs,
  marqueeDuplicateBy,
  marqueeMaskImage,
  marqueeTransform,
  type MarqueeAlignment,
  type MarqueeDirection,
  type MarqueeFadeOptions,
  type MarqueeProps,
} from "./Marquee";


/* --- Slideshow (testimonials carousel) ------------------------------------- */

export {
  SLIDESHOW_ARROW_DEFAULTS,
  SLIDESHOW_ARROW_LEFT_SRC,
  SLIDESHOW_ARROW_RIGHT_SRC,
  SLIDESHOW_ARROW_TAP,
  SLIDESHOW_ARROW_TAP_TRANSITION,
  SLIDESHOW_AXIS_X_CLASS_NAME,
  SLIDESHOW_AXIS_Y_CLASS_NAME,
  SLIDESHOW_CLASS_NAME,
  SLIDESHOW_CONTROLS_CLASS_NAME,
  SLIDESHOW_TESTIMONIALS,
  SLIDESHOW_TRANSITION,
  Slideshow,
  type SlideshowAlignment,
  type SlideshowArrowOptions,
  type SlideshowArrowPosition,
  type SlideshowDirection,
  type SlideshowOwnProps,
  type SlideshowProps,
} from "./Slideshow";
