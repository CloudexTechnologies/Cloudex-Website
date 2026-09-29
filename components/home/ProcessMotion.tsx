"use client";

/**
 * ProcessMotion — the two genuinely moving parts of home section 05 "Process".
 *
 * Everything else in the section is static; see the header of `ProcessSection.tsx` for the
 * full negative inventory. Only these two pieces need the client.
 *
 * ── 1. `SpinningIconHolder` (`.framer-llytlh`) ───────────────────────────────────────
 * MEASURED in `_source/behaviours/analyzing-workflow-card.md`, and re-verified here
 * against the module source recovered from Framer's own source map
 * (`mcW9wceSHtmRl1zfOYbJ/…/yC4ecTPpV.js`, the "Analyzing workflow" component):
 *
 *   const animation   = { opacity:1, rotate:360, rotateX:0, rotateY:0, scale:1,
 *                         skewX:0, skewY:0, x:0, y:0 };
 *   const transition2 = { delay:0, duration:2, ease:[0,0,1,1], type:"tween" };
 *   <MotionDivWithFX __framer__loop={animation} __framer__loopEffectEnabled={true}
 *                    __framer__loopPauseOffscreen={true} __framer__loopRepeatDelay={0}
 *                    __framer__loopRepeatType="loop" __framer__loopTransition={transition2}
 *                    className="framer-llytlh" … />
 *
 * `ease: [0,0,1,1]` is `cubic-bezier(0,0,1,1)` — LINEAR. Motion's tween default is
 * `easeInOut`, which makes a `rotate: 360` loop visibly pump once per revolution
 * (INVENTORY.md risk #7), so the rotation is driven by `useAnimationFrame` at a constant
 * 180°/s instead of by a keyframe tween: exactly linear, `repeatDelay: 0` continuous,
 * and it genuinely *pauses* (rather than unwinding) when the card leaves the viewport,
 * which is what `__framer__loopPauseOffscreen: true` does. `prefers-reduced-motion`
 * gates it, matching Framer's `withFX` loops.
 *
 * This is the ONLY animation inside the card. The two elements literally named
 * `"Animating line"` are static (INVENTORY.md risk #4) and the glow is a constant
 * `blur(41px) / opacity 0.8` — both are plain markup in `ProcessSection.tsx`.
 *
 * ── 2. `IntegrationsTicker` (`.framer-15p9bzn`) ──────────────────────────────────────
 * `_source/behaviours/integrations.md` records the Integration card as having a single
 * variant and no gestures — true, and reproduced (no hover lift on the tiles). But that
 * doc does NOT mention that the four tool rows sit in a vertical ticker, and they do.
 * MEASURED from `sPpUFUrJLFPaRVapJlyh/…/BiHYAFIZy.js`:
 *
 *   const MotionDivWithTickerFX = withTickerFX(motion.div);
 *   <MotionDivWithTickerFX className="framer-15p9bzn"
 *     tickerEffectAlign="start" tickerEffectDirectionModifier="default"
 *     tickerEffectDraggable={false} tickerEffectEnabled={true} tickerEffectGap={10}
 *     tickerEffectHoverModifier={100} tickerEffectOverflow="clip"
 *     tickerEffectPosition="relative" tickerEffectStackDirection="column"
 *     tickerEffectVelocity={15}>
 *
 * Corroborated by the post-hydration DOMs, where the list carries a live offset:
 * `transform: translateY(-4.722px)` (desktop), `-4.41px` (tablet), `-9.348px` (phone) —
 * three different values from three independent captures of the same markup.
 *
 * `hoverModifier` is `100`, i.e. `hoverFactor = 100/100 = 1` → **no pause and no slowdown
 * on hover**, and `tickerEffectDraggable: false` → no drag. Both are reproduced as
 * absences: there are no pointer handlers here at all.
 *
 * Mechanism, ported from Framer's own `Ticker`/`TickerItemWrapper` (recovered from
 * `app.framerstatic.com/framer.PE56BHYF.mjs` via `framer.CkPAC0_e.mjs.map`) rather than
 * approximated:
 *
 *   sign            = 1                                  (yStrategy)
 *   measureItem(li) = { start: li.offsetTop, end: start + li.offsetHeight }
 *   totalItemLength = last.end − first.start
 *   inset           = parseInt(getComputedStyle(container).paddingTop)      → 0 here
 *   visibleLength   = min(container.offsetHeight, window.innerHeight)       → 199 here
 *   cloneCount      = calcNumClones(visibleLength, itemPositions, gap)      → 0 here,
 *                     because one set of four rows already overfills the 199px window
 *   totalListSize   = (totalItemLength + gap) × (cloneCount + 1)
 *   offset         -= Δt/1000 × velocity × sign            (a raw rAF integrator)
 *   renderedOffset  = wrap(−(totalItemLength + gap + inset), −inset, offset)
 *   item.y          = renderedOffset + item.end ≤ −inset ? totalListSize : 0
 *
 * That last line is the recycling rule: a row whose bottom edge has passed the top of the
 * window jumps one full list-length down, so the loop is seamless without cloning the DOM.
 * The `opacity: 0 → 1` on the `<ul>` is Framer's pre-measurement state, not a reveal —
 * the SSR ships `opacity:0; transform:translateY(-10px)`, which is precisely
 * `wrap(−(0 + 10 + 0), 0, 0)` evaluated against the unmeasured `totalItemLength = 0`,
 * and both fall out of the port for free.
 *
 * Why not `components/primitives/Marquee`: its own header scopes it — "this reproduces the
 * ONE instance on the site that uses this component — the hero logo row … The Integrations
 * rows … use Framer's *built-in* `Ticker` instead, whose DOM is `<li class="ticker-item"
 * aria-posinset aria-setsize>` (per-item recycling, not a single list transform)." Marquee
 * is a WAAPI whole-list translate that renders clone `<li>`s and forces
 * `width/height: 100%`, `padding`, `place-items` and `overflow: hidden` onto a `<section>`
 * root; `.framer-15p9bzn` is a `<div>` whose height (199px) comes from
 * `app/framer/layout.css`. Driving it through Marquee would need every one of those
 * overridden and would still emit the wrong DOM, so the built-in ticker is reproduced here
 * instead — scoped to this section, as the task allows.
 */

import * as React from "react";
import {
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
  type MotionValue,
} from "motion/react";

/* -------------------------------------------------------------------------- */
/* 1. The one looping rotation                                                 */
/* -------------------------------------------------------------------------- */

/** MEASURED: `rotate: 360` over `duration: 2` ⇒ 180°/s, linear. */
export const SPIN_DEGREES_PER_SECOND = 360 / 2;

/** The icon holder's inline style, verbatim from the SSR. */
const ICON_HOLDER_STYLE: React.CSSProperties = {
  "--border-bottom-width": "1px",
  "--border-color":
    "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  backgroundColor:
    "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
  borderBottomLeftRadius: "52px",
  borderBottomRightRadius: "52px",
  borderTopLeftRadius: "52px",
  borderTopRightRadius: "52px",
  opacity: 1,
} as React.CSSProperties;

export function SpinningIconHolder({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  // `__framer__loopPauseOffscreen: true`. No `once`, no margin — it resumes on re-entry.
  const inView = useInView(ref);
  const prefersReducedMotion = useReducedMotion();
  const rotate = useMotionValue(0);

  useAnimationFrame((_time, delta) => {
    if (!inView || prefersReducedMotion === true) return;
    // `repeatType: "loop"` ⇒ restart from 0, never mirror.
    rotate.set((rotate.get() + (delta / 1000) * SPIN_DEGREES_PER_SECOND) % 360);
  });

  return (
    <motion.div
      ref={ref}
      className="framer-llytlh"
      data-border="true"
      data-framer-name="icon holder"
      style={{ ...ICON_HOLDER_STYLE, rotate }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Framer's built-in vertical ticker                                        */
/* -------------------------------------------------------------------------- */

/** `tickerEffectVelocity` — px per second. MEASURED. */
export const TICKER_VELOCITY = 15;
/** `tickerEffectGap` — px between rows. MEASURED. */
export const TICKER_GAP = 10;
/** `tickerEffectHoverModifier: 100` ⇒ `hoverFactor = 1` ⇒ no pause, no slowdown. MEASURED. */
export const TICKER_HOVER_FACTOR = 1;

interface ItemBounds {
  start: number;
  end: number;
}

/** Framer's `wrap` (from `motion`): maps `v` into `[min, max)`. */
export function wrapValue(min: number, max: number, v: number): number {
  const range = max - min;
  if (range === 0) return min;
  return (((v - min) % range) + range) % range + min;
}

/** `calcTotalItemLength` — MEASURED: `last.end − first.start`. */
export function tickerTotalItemLength(positions: ItemBounds[]): number {
  if (positions.length === 0) return 0;
  return positions[positions.length - 1].end - positions[0].start;
}

/** `calcNumClones` — MEASURED, transcribed literally. */
export function tickerCloneCount(
  visibleLength: number,
  positions: ItemBounds[],
  gap: number,
): number {
  if (positions.length === 0 || visibleLength <= 0) return 0;
  const total = tickerTotalItemLength(positions);
  const maxItem = Math.max(...positions.map((p) => p.end - p.start));
  let count = 0;
  let safeFillLength = 0;
  while (safeFillLength < visibleLength) {
    safeFillLength = (total + gap) * (count + 1) - maxItem;
    count++;
    if (count > 1000) break; // the source has no guard; this can only fire on a 0-height set
  }
  return Math.max(count - 1, 0);
}

interface TickerState {
  positions: ItemBounds[];
  visibleLength: number;
  inset: number;
}

const EMPTY_STATE: TickerState = { positions: [], visibleLength: 0, inset: 0 };

/** `<ul>` base style — Framer's `listStyle`, plus the axis/size props it merges in. */
const LIST_STYLE: React.CSSProperties = {
  display: "flex",
  position: "relative",
  listStyleType: "none",
  padding: 0,
  margin: 0,
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: `${TICKER_GAP}px`,
  alignItems: "flex-start", // `align: "start"` → `alignAlias.start`
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  maxWidth: "100%",
};

/** `containerStyle` + `position: tickerEffectPosition` + the axis-y overflow clip. */
const CONTAINER_STYLE: React.CSSProperties = {
  overflowY: "clip",
  display: "flex",
  position: "relative",
};

function TickerRow({
  bounds,
  listSize,
  inset,
  offset,
  index,
  count,
  children,
}: {
  bounds: ItemBounds | undefined;
  listSize: number;
  inset: number;
  offset: MotionValue<number>;
  index: number;
  count: number;
  children: React.ReactNode;
}): React.ReactElement {
  const y = useTransform(offset, (current) => {
    if (!bounds || (!bounds.start && !bounds.end) || !listSize) return 0;
    return current + bounds.end <= -inset ? listSize : 0;
  });

  return (
    <motion.li
      className="ticker-item"
      aria-hidden={false}
      aria-posinset={index + 1}
      aria-setsize={count}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        position: "relative",
        height: "fit-content",
        width: "100%",
        y,
      }}
    >
      {children}
    </motion.li>
  );
}

export interface IntegrationsTickerProps {
  /** `.framer-15p9bzn` — the class `app/framer/layout.css` gives its 199px height. */
  className?: string;
  children?: React.ReactNode;
}

export function IntegrationsTicker({
  className,
  children,
}: IntegrationsTickerProps): React.ReactElement {
  const items = React.useMemo(
    () => React.Children.toArray(children),
    [children],
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [state, setState] = React.useState<TickerState>(EMPTY_STATE);

  // `useInView(ref, { margin: "100px" })` — MEASURED; gates BOTH measuring and the rAF.
  const inView = useInView(containerRef, { margin: "100px" });
  const prefersReducedMotion = useReducedMotion();

  const offset = useMotionValue(0);

  const totalItemLength = tickerTotalItemLength(state.positions);
  const isMeasured = totalItemLength > 0;
  const cloneCount = isMeasured
    ? tickerCloneCount(state.visibleLength, state.positions, TICKER_GAP)
    : 0;
  const totalListSize =
    totalItemLength === 0 ? 0 : (totalItemLength + TICKER_GAP) * (cloneCount + 1);

  /* ---- measure ------------------------------------------------------- */

  React.useLayoutEffect(() => {
    if (!inView) return;
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    const measure = (): void => {
      const rows = list.querySelectorAll<HTMLElement>(".ticker-item");
      if (rows.length === 0) return;
      const positions: ItemBounds[] = [];
      for (const row of rows) {
        positions.push({
          start: row.offsetTop,
          end: row.offsetTop + row.offsetHeight,
        });
      }
      const visibleLength = Math.min(container.offsetHeight, window.innerHeight);
      const inset = parseInt(window.getComputedStyle(container).paddingTop) || 0;
      setState((prev) => {
        const same =
          prev.visibleLength === visibleLength &&
          prev.inset === inset &&
          prev.positions.length === positions.length &&
          prev.positions.every(
            (p, i) => p.start === positions[i].start && p.end === positions[i].end,
          );
        return same ? prev : { positions, visibleLength, inset };
      });
    };

    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(list);
    return () => observer.disconnect();
  }, [inView, items.length]);

  /* ---- drive ---------------------------------------------------------- */

  useAnimationFrame((_time, delta) => {
    if (!isMeasured || !inView || prefersReducedMotion === true) return;
    // sign = 1 (yStrategy), directionModifier = 1 ("default"), hoverFactor never leaves 1.
    offset.set(offset.get() - (delta / 1000) * TICKER_VELOCITY);
  });

  const renderedOffset = useTransform(offset, (current) =>
    wrapValue(-totalItemLength - TICKER_GAP - state.inset, -state.inset, current),
  );

  return (
    <div ref={containerRef} className={className} style={CONTAINER_STYLE}>
      <motion.ul
        ref={listRef}
        style={{
          ...LIST_STYLE,
          opacity: isMeasured ? 1 : 0,
          willChange: isMeasured && inView ? "transform" : undefined,
          y: renderedOffset,
        }}
      >
        {items.map((item, index) => (
          <TickerRow
            key={index}
            bounds={state.positions[index]}
            listSize={totalListSize}
            inset={state.inset}
            offset={renderedOffset}
            index={index}
            count={items.length}
          >
            {item}
          </TickerRow>
        ))}
      </motion.ul>
    </div>
  );
}
