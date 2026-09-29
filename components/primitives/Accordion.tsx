"use client";

/**
 * Accordion — one Framer FAQ row (`hyOMSZchT.js`, `displayName = "Row"`).
 *
 * Measured spec: `_source/behaviours/faq-accordion.md`.
 * Real markup: `_source/rendered/home.desktop.html` (Closed) and
 * `_source/faq/home.open.html` (Open, captured with Chrome — the answers are NOT in SSR).
 *
 * MEASURED facts this file encodes verbatim:
 *  - serializationHash `framer-eehbh`; variant classes `framer-v-kulxri` (Closed, default)
 *    and `framer-v-1sndqej` (Open). The base class `framer-kulxri` stays in BOTH states.
 *  - `data-framer-name` swaps "Closed" ↔ "Open"; `data-border`, `data-highlight`,
 *    `tabindex="0"` are constant.
 *  - Icon: flat 180° rotation on open, 0 on close. Not 45°, not 90°.
 *  - Transition (height AND icon): spring { stiffness: 400, damping: 40, mass: 1, delay: 0 }
 *    → damping ratio exactly 1.0, critically damped, ZERO overshoot.
 *  - Rows are INDEPENDENT. The wrapper passes no shared open-index and no sibling-closing
 *    callback, so several rows can be open at once. Do not hoist a single `openIndex`.
 *  - Row height 61px collapsed (`FramerhyOMSZchT.defaultProps = { height: 61 }`) → content
 *    height expanded. Variant CSS also moves padding-bottom 18px → 20px
 *    (`.framer-eehbh.framer-v-1sndqej.framer-kulxri{padding:18px 20px 20px}`), which rides
 *    the same spring.
 *
 * Deliberate deviations from the SSR DOM, all noted:
 *  1. The Answer node (`.framer-vv94e4`) is always mounted. Framer omits it entirely while
 *     closed, but `height: auto` animation and `aria-controls` both need a real element.
 *     It is clipped by the row's `overflow: hidden` (already in `app/framer/layout.css`)
 *     and is `aria-hidden` while closed, so nothing is visible or announced.
 *  2. The row carries an inline `height` (and `padding-bottom`) on the first render so SSR
 *     paints the collapsed box instead of flashing the answer before hydration. After mount
 *     the motion animation owns both properties.
 *  3. `onClick` rather than Framer's `onTap`/pointer binding, so keyboard activation and
 *     programmatic `.click()` both work.
 */

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";

import { INSTANT_TRANSITION } from "@/lib/appear";

import {
  type ReducedMotionPolicy,
  DEFAULT_REDUCED_MOTION_POLICY,
} from "./AppearMotion";

/* -------------------------------------------------------------------------- */
/* Measured constants                                                          */
/* -------------------------------------------------------------------------- */

/** `serializationHash` of the Row component. */
export const ACCORDION_SERIALIZATION_HASH = "framer-eehbh";

/** `variantClassNames` — keyed by Framer's own variant ids. */
export const ACCORDION_VARIANT_CLASS_NAMES = {
  /** R6i0y2Tsu — "Closed", the default variant. */
  closed: "framer-v-kulxri",
  /** RmKyPTBUV — "Open". */
  open: "framer-v-1sndqej",
} as const;

/** The invariant part of the row's class list, in SSR order. */
export const ACCORDION_ROW_BASE_CLASS =
  "framer-eehbh framer-PN4gT framer-JesZO framer-kulxri";

/**
 * transition1 — damping 40 / (2·√400) = 1.0 → exactly critically damped.
 * The snappiest spring on the site. Both the height and the 180° icon rotation ride it.
 */
export const ACCORDION_SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
  delay: 0,
} as const satisfies Transition;

/** `FramerhyOMSZchT.defaultProps.height`. Also the measured desktop value (61.2px). */
export const ACCORDION_CLOSED_HEIGHT = 61;

/** Row padding, MEASURED from the two variant CSS rules. */
export const ACCORDION_PADDING = {
  top: 18,
  inline: 20,
  /** `.framer-eehbh.framer-kulxri{padding:18px 20px}` */
  bottomClosed: 18,
  /** `.framer-eehbh.framer-v-1sndqej.framer-kulxri{padding:18px 20px 20px}` */
  bottomOpen: 20,
} as const;

/** Icon rotation, MEASURED: `style {rotate:0}` / `variants {RmKyPTBUV:{rotate:180}}`. */
export const ACCORDION_ICON_ROTATION = { closed: 0, open: 180 } as const;

/* --- wrapper (`Gr_LwNmZg.js`) — exported for FaqSection ---------------------- */

/** The five per-row container classes emitted by the accordion wrapper, in order. */
export const ACCORDION_ROW_CONTAINER_CLASSES = [
  "framer-1fjc0hl-container",
  "framer-177tqx0-container",
  "framer-1hobf0l-container",
  "framer-14iqijw-container",
  "framer-ftaxvw-container",
] as const;

/**
 * transition2..6 — the wrapper's five-row entrance ladder. `y: 40`, spring by
 * bounce/duration (NOT stiffness/damping), 0.15s apart. This is a DIFFERENT spring from
 * `ScrollReveal`'s `REVEAL_SPRING`; do not unify them.
 *
 * Use with `<ScrollReveal enter="up40" transition={ACCORDION_ENTER_TRANSITIONS[i]}>`.
 */
export const ACCORDION_ENTER_TRANSITIONS = [
  { type: "spring", bounce: 0.2, duration: 1, delay: 0 },
  { type: "spring", bounce: 0.2, duration: 1, delay: 0.15 },
  { type: "spring", bounce: 0.2, duration: 1, delay: 0.3 },
  { type: "spring", bounce: 0.2, duration: 1, delay: 0.45 },
  { type: "spring", bounce: 0.2, duration: 1, delay: 0.6 },
] as const satisfies readonly Transition[];

/** `animation` on the wrapper's row scroll-reveals — matches `REVEAL_ENTER.up40`. */
export const ACCORDION_ENTER_DIRECTION = "up40" as const;

/* --- design tokens used by the row's inline styles -------------------------- */

const TOKEN_TEXT_PRIMARY =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const TOKEN_TEXT_MUTED =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
const TOKEN_SURFACE =
  "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))";

/** The row's SSR'd inline style, verbatim (minus the animated height/padding). */
const ROW_STATIC_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color": TOKEN_SURFACE,
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  backgroundColor: TOKEN_SURFACE,
  width: "100%",
  borderBottomLeftRadius: 17,
  borderBottomRightRadius: 17,
  borderTopLeftRadius: 17,
  borderTopRightRadius: 17,
} as React.CSSProperties;

const QUESTION_TEXT_STYLE = {
  "--extracted-r6o4lv": TOKEN_TEXT_PRIMARY,
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  "--framer-paragraph-spacing": "0px",
  transform: "none",
} as React.CSSProperties;

const ANSWER_TEXT_STYLE = {
  "--extracted-r6o4lv": TOKEN_TEXT_MUTED,
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  "--framer-paragraph-spacing": "0px",
  transform: "none",
} as React.CSSProperties;

const QUESTION_P_STYLE = {
  "--framer-text-alignment": "left",
  "--framer-text-color":
    "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))",
} as React.CSSProperties;

const ANSWER_P_STYLE = {
  "--framer-text-color":
    "var(--extracted-r6o4lv, var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153)))",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Chevron                                                                     */
/* -------------------------------------------------------------------------- */

const CHEVRON_PATH =
  "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z";

/** The Phosphor `CaretDown` (bold) Framer ships in the Icon Holder, transcribed verbatim. */
export function AccordionChevron(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      color={TOKEN_TEXT_PRIMARY}
      style={{
        userSelect: "none",
        width: "100%",
        height: "100%",
        display: "inline-block",
        fill: TOKEN_TEXT_PRIMARY,
        color: TOKEN_TEXT_PRIMARY,
        flexShrink: 0,
      }}
    >
      <g
        color={TOKEN_TEXT_PRIMARY}
        {...({ weight: "bold" } as React.SVGProps<SVGGElement>)}
      >
        <path d={CHEVRON_PATH} />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface AccordionRowOwnProps {
  /** Question copy (`question1..5` on the Framer wrapper). */
  question: React.ReactNode;
  /** Answer copy (`answer1..5`). Not present in SSR — see `_source/faq/*.json`. */
  answer: React.ReactNode;
  /**
   * Uncontrolled initial state. MEASURED default variant is "Closed", so `false`.
   * Rows are independent; there is no group exclusivity.
   */
  defaultOpen?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Fires with the NEXT state on every toggle. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Stable id prefix for `aria-controls` / `aria-labelledby`. Defaults to a
   * `useId()` value, which is SSR-safe.
   */
  rowId?: string;
  /**
   * Collapsed height in px. Default 61 (Framer's `defaultProps.height`); it is also
   * re-measured from the rendered question after mount, so a wrapped question on phone
   * collapses to the right height.
   */
  closedHeight?: number;
  /** Disable the live re-measure and pin the collapsed height to `closedHeight`. */
  measureClosedHeight?: boolean;
  reducedMotion?: ReducedMotionPolicy;
  /** Render at the target state with no animation (harness / screenshot use). */
  disabled?: boolean;
}

/**
 * Everything a `motion.div` accepts, minus the props this component owns.
 * (Based on `HTMLMotionProps` rather than `React.ComponentPropsWithoutRef<"div">` because
 * motion re-types the drag handlers and the two are not assignable.)
 */
export type AccordionRowProps = AccordionRowOwnProps &
  Omit<
    HTMLMotionProps<"div">,
    | keyof AccordionRowOwnProps
    | "ref"
    | "children"
    | "initial"
    | "animate"
    | "transition"
  >;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function AccordionRow(props: AccordionRowProps): React.ReactElement {
  const {
    question,
    answer,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    rowId,
    closedHeight = ACCORDION_CLOSED_HEIGHT,
    measureClosedHeight = true,
    reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
    disabled = false,
    className,
    style,
    onClick,
    onKeyDown,
    ...rest
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const generatedId = React.useId();
  const id = rowId ?? generatedId;
  const questionId = `${id}-question`;
  const answerId = `${id}-answer`;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = React.useCallback(() => {
    const next = !(isControlled ? controlledOpen : uncontrolledOpen);
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [isControlled, controlledOpen, uncontrolledOpen, onOpenChange]);

  /* --- collapsed height ---------------------------------------------------- */

  const questionRef = React.useRef<HTMLDivElement | null>(null);
  const [measured, setMeasured] = React.useState<number | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const el = questionRef.current;
    if (!measureClosedHeight || el === null) return;
    if (typeof ResizeObserver === "undefined") return;

    const read = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        setMeasured(
          h + ACCORDION_PADDING.top + ACCORDION_PADDING.bottomClosed,
        );
      }
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [measureClosedHeight]);

  const collapsedHeight = measured ?? closedHeight;

  /* --- animation ----------------------------------------------------------- */

  const snap =
    disabled || (reducedMotion === "settle" && prefersReducedMotion === true);
  const transition: Transition = snap ? INSTANT_TRANSITION : ACCORDION_SPRING;

  const rowClassName = [
    ACCORDION_ROW_BASE_CLASS,
    open
      ? ACCORDION_VARIANT_CLASS_NAMES.open
      : ACCORDION_VARIANT_CLASS_NAMES.closed,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // First render (SSR + hydration) paints the collapsed box itself, so the answer never
  // flashes. After mount the motion animation owns `height` / `paddingBottom`.
  const firstPaintStyle: React.CSSProperties = mounted
    ? {}
    : {
        height: open ? undefined : collapsedHeight,
        paddingBottom: open
          ? ACCORDION_PADDING.bottomOpen
          : ACCORDION_PADDING.bottomClosed,
      };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    toggle();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
      return;
    }
    if (event.target !== event.currentTarget) return;
    event.preventDefault(); // Space must not scroll the page
    toggle();
  };

  return (
    <motion.div
      {...rest}
      className={rowClassName}
      data-border="true"
      data-framer-name={open ? "Open" : "Closed"}
      data-highlight="true"
      data-accordion-open={open ? "true" : "false"}
      tabIndex={0}
      aria-expanded={open}
      aria-controls={answerId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ ...ROW_STATIC_STYLE, ...style, ...firstPaintStyle }}
      initial={false}
      animate={{
        height: open ? "auto" : collapsedHeight,
        paddingBottom: open
          ? ACCORDION_PADDING.bottomOpen
          : ACCORDION_PADDING.bottomClosed,
      }}
      transition={transition}
    >
      <div
        ref={questionRef}
        className="framer-1ljf4rn"
        data-framer-name="Question"
      >
        <div
          className="framer-8pmgib"
          data-framer-component-type="RichTextContainer"
          style={QUESTION_TEXT_STYLE}
        >
          <p
            id={questionId}
            className="framer-text framer-styles-preset-wgkvl1"
            data-styles-preset="risoZ9TJU"
            style={QUESTION_P_STYLE}
          >
            {question}
          </p>
        </div>
        <div className="framer-2ygmfz" data-framer-name="Icon Holder">
          <motion.div
            className="framer-nvwuvo-container"
            style={{ willChange: "transform" }}
            initial={false}
            animate={{
              rotate: open
                ? ACCORDION_ICON_ROTATION.open
                : ACCORDION_ICON_ROTATION.closed,
            }}
            transition={transition}
          >
            <div style={{ display: "contents" }}>
              <AccordionChevron />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="framer-vv94e4"
        data-framer-name="Answer"
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!open}
      >
        <div
          className="framer-hloy3e"
          data-framer-component-type="RichTextContainer"
          style={ANSWER_TEXT_STYLE}
        >
          <p
            className="framer-text framer-styles-preset-o3oioe"
            data-styles-preset="BgF22VJBv"
            style={ANSWER_P_STYLE}
          >
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Alias — the file is `Accordion.tsx`, the Framer component is called "Row". */
export const Accordion = AccordionRow;

export default AccordionRow;
