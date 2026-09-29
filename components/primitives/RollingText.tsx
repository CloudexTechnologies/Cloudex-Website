"use client";

/**
 * RollingText — Framer's per-character "roll" on every CTA button label.
 *
 * Measured spec: `_source/behaviours/rolling-text.md` (mechanism, stagger, transition) and
 * `_source/behaviours/cta-button.md` (the shell that hosts it). Both are MEASURED from
 * Framer's own source maps — every number below is copied, not invented.
 *
 * ## Mechanism (do not "simplify" this)
 * One `<span>` per character inside a `<p class="rolling-text-inner-<uuid>">`. The `<p>` is
 * `overflow: hidden`, exactly one line tall, and carries
 * `text-shadow: 0 var(--line-height-abs) 0 var(--text)` — which paints a free duplicate of
 * every glyph exactly one line-height BELOW it, with no extra DOM. Sliding the spans up by
 * one line-height (16.8px) pushes the real glyph out of the clip box while its text-shadow
 * twin slides into the vacated slot. The eye reads it as each letter rolling over.
 *
 * `backface-visibility: hidden` on the spans is load-bearing (Chrome shows a 1px seam
 * without it) and the space character must be U+00A0, not U+0020 — MEASURED, the SSR emits
 * `&nbsp;`.
 *
 * ## Per-instance CSS
 * The `.rolling-text-inner-<uuid>` blocks already live in `app/framer/components.css`
 * (40 of them: home 19 + about 15 + privacy-policy 6). They differ ONLY in `--text`
 * (black or white). Framer regenerates the uuid on every render, so the uuid is NOT a
 * stable identifier of a button — it is just a handle onto one of those 40 rules.
 * Callers should pass one of the measured uuids (see `ROLLING_TEXT_INSTANCES` /
 * `rollingTextUuid`) so the ported CSS keeps matching.
 *
 * `selfContained` (default `true`) additionally inlines the same declarations, so an
 * instance whose uuid has no rule in `components.css` — blog and contact SSR zero rolling
 * texts, their labels only appear post-hydration — still renders correctly. The inlined
 * values are byte-identical to the CSS rule, so there is no visual difference; pass
 * `selfContained={false}` to emit the bare class and match the original DOM exactly.
 */

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  DEFAULT_REDUCED_MOTION_POLICY,
  type ReducedMotionPolicy,
} from "./AppearMotion";
import {
  ROLLING_TEXT_COLORS,
  ROLLING_TEXT_FONT_FAMILY,
  ROLLING_TEXT_FONT_SIZE,
  ROLLING_TEXT_FONT_WEIGHT,
  ROLLING_TEXT_LETTER_SPACING,
  ROLLING_TEXT_LINE_HEIGHT,
  ROLLING_TEXT_LINE_HEIGHT_ABS,
  ROLLING_TEXT_PADDING,
  ROLL_DURATION,
  ROLL_INSTANT_TRANSITION,
  ROLL_STAGGER,
  ROLL_TRANSITION,
  rollDelay,
  rollingTextClassName,
  rollingTextUuid,
  type RollingTextTone,
} from "@/lib/rolling-text";

/*
 * NOTE: the measured constants and the uuid registry deliberately live in
 * `@/lib/rolling-text`, which has no `"use client"`. They are NOT re-exported from here:
 * a Server Component that read them through this module would get client-reference stubs
 * instead of arrays. `components/primitives/index.ts` re-exports them from the lib.
 */

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface RollingTextProps {
  /** The label, verbatim. Spaces become U+00A0, exactly as Framer's SSR does. */
  text: string;
  /**
   * The per-instance uuid whose rule lives in `app/framer/components.css`. Omit it and
   * one is resolved from the measured registry by `(text, tone)` — see `rollingTextUuid`.
   */
  uuid?: string;
  /** Which CTA variant hosts this label. Default `"Light"` (black text). */
  tone?: RollingTextTone;
  /** Explicit `--text` override. Defaults to `ROLLING_TEXT_COLORS[tone]`. */
  color?: string;
  /**
   * Controlled roll. Leave undefined and the component drives itself from
   * `mouseenter` / `mouseleave` (MEASURED: Framer uses mouse events on this container,
   * not `whileHover` on the spans — one boolean drives them all, which is what lets the
   * stagger be computed per index).
   */
  rolled?: boolean;
  /**
   * Also roll while the nearest focusable ancestor (the CTA `<a>`) is focused **by
   * keyboard**. Gated on `:focus-visible`, so clicking the button with a pointer never
   * triggers it. Default `true`. This is an accessibility addition; Framer has no
   * focus state. Pass `false` for the literal original behaviour.
   */
  focusRoll?: boolean;
  /**
   * `"settle"` (default) — with `prefers-reduced-motion: reduce`, do not roll at all.
   * The roll's resting state and its post-leave state are identical, so "settling" means
   * staying put. `"animate"` plays it anyway (what the live site does).
   */
  reducedMotion?: ReducedMotionPolicy;
  /** Render static, never roll. */
  disabled?: boolean;
  /** MEASURED default 0.35. Exposed only because it is a Framer prop. */
  stagger?: number;
  /** Roll distance in px. MEASURED default 16.8 (= `--line-height-abs`). */
  lineHeightAbs?: number;
  /**
   * Inline the per-instance declarations as well as emitting the class. Default `true`,
   * which makes the component work even for a uuid with no rule in `components.css`.
   * `false` emits the bare class and matches the original DOM byte for byte.
   */
  selfContained?: boolean;
  /** Extra classes on the outer flex container (Framer's has none). */
  className?: string;
  /** Merged over the outer flex container's measured style. */
  style?: React.CSSProperties;
  /** DOM `id` on the outer container. */
  elementId?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/** MEASURED — the SSR'd wrapper around the `<p>`; it has no class name. */
const CONTAINER_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  padding: ROLLING_TEXT_PADDING,
  boxSizing: "border-box",
};

/** MEASURED — inline on every span in the SSR'd DOM. */
const SPAN_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: ROLLING_TEXT_FONT_FAMILY,
  fontSize: ROLLING_TEXT_FONT_SIZE,
  fontStyle: "normal",
  fontWeight: ROLLING_TEXT_FONT_WEIGHT,
  letterSpacing: ROLLING_TEXT_LETTER_SPACING,
  lineHeight: `${ROLLING_TEXT_LINE_HEIGHT}em`,
};

/** The parts of the `.rolling-text-inner-<uuid> span` rule that are NOT inline in the DOM. */
const SPAN_STYLE_FROM_CSS: React.CSSProperties = {
  whiteSpace: "pre",
  flexShrink: 0,
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  color: "var(--text)",
};

/* -------------------------------------------------------------------------- */
/* Variants                                                                    */
/* -------------------------------------------------------------------------- */

/** MEASURED — `variants = { initial: { y: "0%" }, hover: { y: hoverY } }` with
 *  `hoverY = \`-${lineHeightAbs}px\`` = `"-16.8px"`. Rest is the numeric `0` (not `"0%"`)
 *  so motion renders `transform: none`, matching Framer's own SSR and post-hydration DOM. */
function rollVariants(lineHeightAbs: number) {
  return { rest: { y: 0 }, roll: { y: -lineHeightAbs } };
}

export function RollingText(props: RollingTextProps): React.ReactElement {
  const {
    text,
    uuid,
    tone = "Light",
    color,
    rolled,
    focusRoll = true,
    reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
    disabled = false,
    stagger = ROLL_STAGGER,
    lineHeightAbs = ROLLING_TEXT_LINE_HEIGHT_ABS,
    selfContained = true,
    className,
    style,
    elementId,
  } = props;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [keyboardFocused, setKeyboardFocused] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  /*
   * Keyboard focus. The focusable node is the CTA `<a>`, which is an ANCESTOR of this
   * component, so React's onFocus/onBlur (which only see descendants) cannot observe it.
   * Subscribe to the nearest focusable ancestor directly and gate on `:focus-visible`
   * so a pointer click never rolls the label.
   */
  React.useEffect(() => {
    if (!focusRoll || disabled) return;
    const host = containerRef.current?.closest<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"]), input, select, textarea',
    );
    if (host === null || host === undefined) return;

    const onFocus = () => {
      let visible = true;
      try {
        visible = host.matches(":focus-visible");
      } catch {
        /* older engines: fall back to treating any focus as keyboard focus */
      }
      setKeyboardFocused(visible);
    };
    const onBlur = () => setKeyboardFocused(false);

    host.addEventListener("focus", onFocus);
    host.addEventListener("blur", onBlur);
    return () => {
      host.removeEventListener("focus", onFocus);
      host.removeEventListener("blur", onBlur);
    };
  }, [focusRoll, disabled]);

  const settle =
    disabled || (reducedMotion === "settle" && prefersReducedMotion === true);

  const active =
    !settle && (rolled ?? (hovered || (focusRoll && keyboardFocused)));

  const resolvedUuid = uuid ?? rollingTextUuid(text, tone);
  const resolvedColor = color ?? ROLLING_TEXT_COLORS[tone];
  const chars = React.useMemo(() => Array.from(text), [text]);

  const variants = React.useMemo(() => rollVariants(lineHeightAbs), [lineHeightAbs]);

  const paragraphStyle = {
    ...(selfContained
      ? {
          ["--font-size" as string]: `${ROLLING_TEXT_FONT_SIZE}px`,
          ["--text" as string]: resolvedColor,
          ["--line-height-abs" as string]: `${lineHeightAbs}px`,
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          verticalAlign: "top",
          display: "flex",
          overflow: "hidden",
          width: "max-content",
          fontFamily: ROLLING_TEXT_FONT_FAMILY,
          fontSize: ROLLING_TEXT_FONT_SIZE,
          textTransform: "none",
          userSelect: "none",
          textShadow: "0 var(--line-height-abs) 0 var(--text)",
        }
      : color !== undefined
        ? { ["--text" as string]: resolvedColor }
        : {}),
  } as React.CSSProperties;

  const spanStyle: React.CSSProperties = selfContained
    ? { ...SPAN_STYLE, ...SPAN_STYLE_FROM_CSS }
    : SPAN_STYLE;

  return (
    <div
      ref={containerRef}
      id={elementId}
      className={className}
      style={{ ...CONTAINER_STYLE, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-rolling-text={resolvedUuid}
    >
      <motion.p
        className={rollingTextClassName(resolvedUuid)}
        style={paragraphStyle}
        initial={false}
        animate={active ? "roll" : "rest"}
      >
        {chars.map((ch, i) => (
          <motion.span
            // Characters repeat, so the index IS the identity here.
            key={i}
            style={spanStyle}
            variants={variants}
            transition={
              settle
                ? ROLL_INSTANT_TRANSITION
                : {
                    ...ROLL_TRANSITION,
                    delay: rollDelay(i, chars.length, ROLL_DURATION, stagger),
                  }
            }
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}

export default RollingText;
