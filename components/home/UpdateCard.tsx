"use client";

/**
 * UpdateCard — the auto-cycling "Updates" panel inside home section 05's Maintenance card
 * (`.framer-aEfch`, Framer `displayName = "Calendar"`).
 *
 * ── Why this file exists ──────────────────────────────────────────────────────────────
 * `_source/live/home.html` SSRs only ONE state of this card ("July 2025 update", seven
 * feature rows), so a straight port of the slice looks static. It is not. The three
 * post-hydration captures disagree with each other and with the SSR:
 *
 *   `_source/rendered/home.desktop.html` → "July 2025 update" / "Slack integration is now available"
 *   `_source/rendered/home.tablet.html`  → "Aug 2025 update"  / "Zapier integration"
 *   `_source/rendered/home.phone.html`   → "Aug 2025 update"  / "Zapier integration"
 *
 * …and the tablet capture caught it mid-flight, with Framer's magic-motion transforms still
 * on the nodes (`transform: translate3d(0.108806px, 0, 0) scale(1.00248, 1)` on
 * `.framer-splrar`, `scale(1, 1.43252)` on `.framer-317kr6`). This behaviour is NOT in
 * `_source/behaviours/` — `INVENTORY.md` has no Maintenance doc and `integrations.md`
 * covers only the neighbouring card — so it is measured here from the module source
 * recovered from Framer's source map
 * (`framerusercontent.com/modules/RhUeYelskZ7084lhhvrH/…/NRBWtsPCm.js`, `displayName = "Calendar"`).
 *
 * ── MEASURED ──────────────────────────────────────────────────────────────────────────
 *   const cycleOrder        = ["EhsAkMBvh","R2qyGg49P","O0pkOlzb0"];          // July, Aug, Sept
 *   const variantClassNames = { EhsAkMBvh:"framer-v-1da45io",
 *                               R2qyGg49P:"framer-v-1sp6qne",
 *                               O0pkOlzb0:"framer-v-5yybu5" };
 *   const transition1       = { delay:0, duration:.6, ease:[.7,0,.3,1], type:"tween" };
 *   const onAppear5t56fc    = activeVariantCallback(async () => {
 *                               await delay(() => setVariant(CycleVariantState, true), 3500);
 *                             });
 *   useOnVariantChange(baseVariant, { default: onAppear5t56fc });
 *   … <LayoutGroup id={…}><Variants animate={variants} initial={false}>
 *        <Transition value={transition1}> <motion.div layoutId="EhsAkMBvh" …
 *
 * `callbackForVariant(map, variant)` in Framer's runtime falls back to `map.default` for any
 * variant the map does not name, so `{ default: … }` re-arms on EVERY variant: the card
 * cycles July → Aug → Sept → July for ever, 3500 ms per state, each swap a 0.6 s
 * `cubic-bezier(0.7, 0, 0.3, 1)` tween. `CycleVariantState` is called with `loop = true`.
 * The default variant is `EhsAkMBvh`, which is why the SSR — and this component's first
 * render, so hydration matches — is July.
 *
 * Row visibility is MEASURED from the two guards in the module:
 *   isDisplayed()  → false for R2qyGg49P and O0pkOlzb0   ⇒ the 6th feature is July-only
 *   isDisplayed1() → false for R2qyGg49P                 ⇒ the 7th feature is July + Sept
 * giving 7 / 5 / 6 rows. The card's own height never changes (`.framer-aEfch.framer-1da45io`
 * is a fixed `191px` with `overflow: clip`), so the rows simply re-flow inside it.
 *
 * ── No extra CSS is needed ────────────────────────────────────────────────────────────
 * `framer-v-1sp6qne` and `framer-v-5yybu5` have NO rules — neither in `app/framer/*.css`
 * nor in the live page's `<style data-framer-css-ssr-minified>` (0 occurrences in
 * `_source/live/home.html`). Every child class (`framer-700a9b`, `framer-splrar`,
 * `framer-1mg0gqa`, …) is shared by all three variants, so the ported stylesheet already
 * covers them and nothing under `app/framer/**` had to change.
 *
 * ── Magic motion ──────────────────────────────────────────────────────────────────────
 * Framer gives every node a `layoutId` under a `LayoutGroup`; those ids are reproduced
 * verbatim below so the morph between states is the same shared-layout animation the live
 * site runs, with `transition1` installed as the subtree default via `MotionConfig`
 * (Framer's `<Transition value={transition1}>` is exactly a `MotionConfigContext.Provider`).
 */

import * as React from "react";
import { LayoutGroup, motion, MotionConfig, useReducedMotion } from "motion/react";

import { IconArrowOut } from "./ProcessIcons";

/* -------------------------------------------------------------------------- */
/* Measured constants                                                          */
/* -------------------------------------------------------------------------- */

/** ms each variant is held before `setVariant(CycleVariantState, true)`. MEASURED. */
export const UPDATE_CARD_CYCLE_MS = 3500;

/** `transition1`. MEASURED. */
export const UPDATE_CARD_TRANSITION = {
  type: "tween",
  duration: 0.6,
  ease: [0.7, 0, 0.3, 1],
  delay: 0,
} as const;

/** `cycleOrder`, with the class + `data-framer-name` each state carries. MEASURED. */
export const UPDATE_CARD_VARIANTS = [
  { id: "EhsAkMBvh", className: "framer-v-1da45io", name: "July" },
  { id: "R2qyGg49P", className: "framer-v-1sp6qne", name: "Aug" },
  { id: "O0pkOlzb0", className: "framer-v-5yybu5", name: "Sept" },
] as const;

const GREEN = "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))";
const BLUE = "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))";
const ORANGE = "var(--token-b3c11e1e-3e83-4bec-9857-d0985ddf2f3d, rgb(255, 152, 0))";
const GREY = "rgb(153, 153, 153)";

const RICH_TEXT_VARS: React.CSSProperties = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
} as React.CSSProperties;

const DOT_RADIUS: React.CSSProperties = {
  borderBottomLeftRadius: 7,
  borderBottomRightRadius: 7,
  borderTopLeftRadius: 7,
  borderTopRightRadius: 7,
};

/** Per-state copy. MEASURED, verbatim from `NRBWtsPCm.js`. */
const HEADINGS = [
  { title: "July 2025 update", subtitle: "List of updates we made in July." },
  { title: "Aug 2025 update", subtitle: "List of updates we made in Aug" },
  { title: "Sep 2025 update", subtitle: "List of updates we made in Sep" },
] as const;

interface FeatureRow {
  /** `.framer-*` classes, in SSR order: row / text / dot / rich text / svg holder. */
  row: string;
  text: string;
  dot: string;
  rich: string;
  svg: string;
  /** Framer `layoutId`s, same order. */
  ids: readonly [string, string, string, string, string];
  /** Copy per variant index; `null` ⇒ the row is not rendered in that state. */
  copy: readonly (string | null)[];
  /** Dot colour per variant index. */
  dotColor: readonly string[];
  /** `--extracted-r6o4lv` per variant index (only the 4th feature has one). */
  textColor?: readonly (string | undefined)[];
}

/** MEASURED: seven rows, their per-variant copy, dot colours and visibility guards. */
const FEATURES: readonly FeatureRow[] = [
  {
    row: "framer-1mg0gqa", text: "framer-1zr7x0", dot: "framer-i46561",
    rich: "framer-1mv4fc0", svg: "framer-p2afa6",
    ids: ["wEKQIO6UI", "Nk8S8ftQD", "ryNZNLCD7", "muxxyVfZ3", "N7w6vWWal"],
    copy: ["Slack integration is now available", "Zapier integration", "Added email automation"],
    dotColor: [GREEN, GREEN, GREEN],
  },
  {
    row: "framer-sf7dsg", text: "framer-hoe63d", dot: "framer-gy0ze6",
    rich: "framer-y0wjny", svg: "framer-1bbg2p4",
    ids: ["VpFvTTc1r", "pZRFDmduo", "cWYwugtQC", "BaWgDa0AN", "JwWTt7p3N"],
    copy: ["Dark mode is now available", "Chatbot responses are now more natural", "supports larger datasets"],
    dotColor: [GREEN, ORANGE, ORANGE],
  },
  {
    row: "framer-u071qm", text: "framer-11xodb8", dot: "framer-ed9r6r",
    rich: "framer-1fltda1", svg: "framer-11rx84v",
    ids: ["AJpORBVXu", "kXfCiCvSj", "sbLzR6sXG", "SlFuRHlvN", "K0U4VWlPY"],
    copy: ["30% Faster Loading", "Notification delay issue", "UI bugs on mobile dashboard"],
    dotColor: [BLUE, BLUE, BLUE],
  },
  {
    row: "framer-osgivq", text: "framer-1my44dr", dot: "framer-1fd022f",
    rich: "framer-1ijpqui", svg: "framer-1a745lc",
    ids: ["qrw4xZoDW", "Yp7ObcoNM", "lW_9dhjb8", "dNxxc6L7q", "lNwwTv8KM"],
    copy: ["Bottleneck Detection added", "Added project templates", "Quick start onboarding"],
    dotColor: [GREEN, GREEN, GREEN],
    textColor: [undefined, GREY, GREY],
  },
  {
    row: "framer-16v55t8", text: "framer-91jbk5", dot: "framer-1woe2hb",
    rich: "framer-d3pcw7", svg: "framer-5hyvuz",
    ids: ["QwFZxKl9P", "vcaXoT8Sr", "Q4qdFmNkK", "ELSrOg6dx", "DMb62vyi1"],
    copy: ["Better Calendar Sync", "Team collaboration features", "Response time on AI chat reduced by 30%"],
    dotColor: [BLUE, ORANGE, ORANGE],
  },
  {
    // `isDisplayed()` — July only.
    row: "framer-14mvkl2", text: "framer-ku06ol", dot: "framer-wopylu",
    rich: "framer-14umzd2", svg: "framer-1uy2gdq",
    ids: ["ej6AZIyqA", "Ee7JVTwTm", "uWAQnjm59", "kCaaW5W2w", "SDQVg8ah2"],
    copy: ["AI deadline insights", null, null],
    dotColor: [BLUE, BLUE, BLUE],
  },
  {
    // `isDisplayed1()` — July and Sept.
    row: "framer-14ylwhc", text: "framer-5g7mh8", dot: "framer-1scq862",
    rich: "framer-wuh26q", svg: "framer-1me4hj",
    ids: ["vPZmri2Hg", "qjE_ON9JC", "nEQx73Ppz", "ZGjhUPfIN", "C1_QsUoZY"],
    copy: ["2FA Security Fixes", null, "Stripe integration for automated billing"],
    dotColor: [ORANGE, ORANGE, GREEN],
  },
];

/** The `data-framer-component-type="SVG"` attributes React has no typing for. */
const SVG_HOLDER_ATTRS = {
  parentsize: "0",
  _constraints: "[object Object]",
  rotation: "0",
  shadows: "",
} as Record<string, string>;

function FeatureSvg({
  className,
  layoutId,
}: {
  className: string;
  layoutId: string;
}): React.ReactElement {
  return (
    <motion.div
      data-framer-component-type="SVG"
      {...SVG_HOLDER_ATTRS}
      className={className}
      aria-hidden="true"
      layoutId={layoutId}
      style={{ imageRendering: "pixelated", flexShrink: 0 }}
    >
      <div
        className="svgContainer"
        style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
      >
        <IconArrowOut />
      </div>
    </motion.div>
  );
}

export interface UpdateCardProps {
  /**
   * Freeze on the SSR'd July state. The page never passes it; it is an escape hatch for
   * visual-diff harnesses that need a deterministic frame.
   */
  paused?: boolean;
}

export function UpdateCard({ paused = false }: UpdateCardProps = {}): React.ReactElement {
  const [index, setIndex] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % UPDATE_CARD_VARIANTS.length),
      UPDATE_CARD_CYCLE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const variant = UPDATE_CARD_VARIANTS[index];
  const heading = HEADINGS[index];
  const transition = prefersReducedMotion === true
    ? ({ duration: 0 } as const)
    : UPDATE_CARD_TRANSITION;

  return (
    <LayoutGroup id="framer-aEfch-calendar">
      <MotionConfig transition={transition}>
        <motion.div
          className={`framer-aEfch framer-BHHgS framer-jM1yb framer-k0Wn1 framer-1da45io ${variant.className}`}
          data-framer-name={variant.name}
          data-highlight="true"
          layoutId="EhsAkMBvh"
          style={{
            background:
              "linear-gradient(180deg, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 0%, rgba(255, 255, 255, 0) 100%)",
            width: "100%",
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        >
          <motion.div className="framer-700a9b" data-framer-name="Top" layoutId="SqjhZCpsY">
            <motion.div
              className="framer-splrar"
              data-framer-component-type="RichTextContainer"
              layoutId="kRyHyOpYr"
              style={RICH_TEXT_VARS}
            >
              <p
                className="framer-text framer-styles-preset-1l55uzh"
                data-styles-preset="nNXkfmGpR"
              >
                {heading.title}
              </p>
            </motion.div>
            <motion.div
              className="framer-jpf01l"
              data-framer-component-type="RichTextContainer"
              layoutId="e4mLEJozM"
              style={RICH_TEXT_VARS}
            >
              <p
                className="framer-text framer-styles-preset-huzir6"
                data-styles-preset="B3DXZg5aI"
              >
                {heading.subtitle}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="framer-r3xchp"
            data-framer-name="Divider"
            layoutId="hHX6LXocJ"
            style={{
              backgroundColor:
                "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
            }}
          />

          <motion.div className="framer-317kr6" data-framer-name="Bottom" layoutId="Q9XPhN68_">
            {FEATURES.map((feature, n) => {
              const copy = feature.copy[index];
              if (copy === null || copy === undefined) return null;
              const extracted = feature.textColor?.[index];
              return (
                <motion.div
                  key={feature.row}
                  className={feature.row}
                  data-framer-name={`${n + 1}${["st", "nd", "rd"][n] ?? "th"} feature`}
                  layoutId={feature.ids[0]}
                >
                  <motion.div
                    className={feature.text}
                    data-framer-name="Text"
                    layoutId={feature.ids[1]}
                  >
                    <motion.div
                      className={feature.dot}
                      layoutId={feature.ids[2]}
                      style={{ backgroundColor: feature.dotColor[index], ...DOT_RADIUS }}
                    />
                    <motion.div
                      className={feature.rich}
                      data-framer-component-type="RichTextContainer"
                      layoutId={feature.ids[3]}
                      style={
                        extracted
                          ? ({ "--extracted-r6o4lv": extracted, ...RICH_TEXT_VARS } as React.CSSProperties)
                          : RICH_TEXT_VARS
                      }
                    >
                      <p
                        className="framer-text framer-styles-preset-ayj2we"
                        data-styles-preset="nR64Va2dC"
                        style={
                          extracted
                            ? ({ "--framer-text-color": `var(--extracted-r6o4lv, ${extracted})` } as React.CSSProperties)
                            : undefined
                        }
                      >
                        <strong className="framer-text">{copy}</strong>
                      </p>
                    </motion.div>
                  </motion.div>
                  <FeatureSvg className={feature.svg} layoutId={feature.ids[4]} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </MotionConfig>
    </LayoutGroup>
  );
}

export default UpdateCard;
