/**
 * Home — section 08 "Benefits"  (`<section class="framer-y3z3gp" data-framer-name="Benefits">`)
 *
 * Source of truth: `_source/live/home.html` bytes 708605–745055 (`_source/structure/home.md` §08),
 * cross-checked against `_source/rendered/home.{desktop,tablet,phone}.html` for the two pieces the
 * SSR leaves empty (the six Phosphor icons and the Center Pillar logo sprite).
 *
 * SERVER COMPONENT. There is no interactivity in this section: `_source/behaviours/INVENTORY.md`
 * records no hover state, no appear-animation id and no ambient loop here. The only behaviour is
 * the scroll-reveal ladder, which is delegated to the `ScrollReveal` client primitive.
 *
 * Shape (Framer renders all three breakpoints and hides two with `.ssr-variant` + `hidden-<hash>`):
 *
 *   section.framer-y3z3gp
 *   ├ div.framer-w22v5q  @Heading           reveal up30 / t2
 *   └ div.framer-4bmahw  @Container  id=benefits
 *      ├ .ssr-variant desktop   → .framer-1pkg49z-container  up50 /t3   Right Shade  "Time saving."
 *      ├ .ssr-variant tablet    → .framer-1pkg49z-container  left40/t3  Right Shade
 *      ├ .ssr-variant phone     → .framer-1pkg49z-container  right40/t3 Left shade
 *      ├ .ssr-variant desktop   → .framer-3afob2 @Left container  up50/t4  (children static)
 *      ├ .ssr-variant tab+phone → .framer-3afob2 static          (children 14qxd3g left40/t4, bqer2q right40/t2)
 *      ├ .framer-1x0vqwn-container (bare, desktop-only)  up50/t3  → Center Pillar
 *      ├ .ssr-variant desktop   → .framer-bqkij4 @Right container up50/t4 (children static)
 *      ├ .ssr-variant tab+phone → .framer-bqkij4 static          (children yfx55a left40/t4, 15zbmym right40/t4)
 *      ├ .ssr-variant desktop   → .framer-6hakb9-container  up50/t2   Left shade  "Easy Scaling."
 *      ├ .ssr-variant tablet    → .framer-6hakb9-container  right40/t2 Left shade
 *      └ .ssr-variant phone     → .framer-6hakb9-container  left40/t2  Right Shade
 *
 * Reveal directions/transitions are MEASURED — `_source/behaviours/scroll-reveals.md`
 * ("Element → animation map (home page)"): `.framer-y3z3gp` animation2/t2,
 * `.framer-1pkg49z-container` t3, `.framer-3afob2` t4, `.framer-14qxd3g-container` t4,
 * `.framer-bqer2q-container` t2, `.framer-1x0vqwn-container` t3, `.framer-bqkij4` t4,
 * `.framer-yfx55a-container` t4, `.framer-15zbmym-container` t4, `.framer-6hakb9-container` t2.
 * Every enter direction below is read off the element's own SSR'd inline
 * `transform:translate{X,Y}(Npx)`, which is the authoritative per-breakpoint value.
 */

import * as React from "react";

import { ScrollReveal } from "@/components/primitives";
import { hiddenClassName } from "@/lib/breakpoints";
import { BRAND_MARK_SRC } from "@/lib/brand";

/* -------------------------------------------------------------------------- */
/* Framer design tokens used inline by this section                            */
/* -------------------------------------------------------------------------- */

const TOKEN_WHITE = "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const TOKEN_WHITE_80 = "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))";
const TOKEN_WHITE_10 = "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))";
const TOKEN_WHITE_06 = "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))";
const TOKEN_BLACK = "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";
const TOKEN_GREY_1A = "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))";

const LINK_TEXT: React.CSSProperties = {
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* `.ssr-variant` wrappers — Framer keeps all three breakpoints in the DOM     */
/* -------------------------------------------------------------------------- */

const HIDE_DESKTOP = hiddenClassName("home", "desktop"); // hidden-72rtr7
const HIDE_TABLET = hiddenClassName("home", "tablet"); // hidden-1lsm0lh
const HIDE_PHONE = hiddenClassName("home", "phone"); // hidden-19fjg0f

/** Visible on desktop only. */
const SSR_DESKTOP = `ssr-variant ${HIDE_TABLET} ${HIDE_PHONE}`;
/** Visible on tablet only. */
const SSR_TABLET = `ssr-variant ${HIDE_PHONE} ${HIDE_DESKTOP}`;
/** Visible on phone only. */
const SSR_PHONE = `ssr-variant ${HIDE_TABLET} ${HIDE_DESKTOP}`;
/** Visible on tablet + phone. */
const SSR_SMALL = `ssr-variant ${HIDE_DESKTOP}`;

/** The SSR'd resting style on a wrapper whose sibling breakpoint carries the reveal. */
const SETTLED: React.CSSProperties = { opacity: 1, transform: "none" };

/* -------------------------------------------------------------------------- */
/* Card shades — the two Framer variants of the benefit tile                   */
/* -------------------------------------------------------------------------- */

interface ShadeSpec {
  readonly className: string;
  readonly name: string;
  readonly background: string;
  readonly mask: string;
}

const SHADES = {
  /** `framer-v-vwagpj` — gradient sweeps in from the top-right. */
  right: {
    className: "framer-OP3uy framer-Bct2H framer-vwagpj framer-v-vwagpj",
    name: "Right Shade",
    background: `linear-gradient(230deg, ${TOKEN_WHITE_80} 0%, ${TOKEN_WHITE_10} 33%)`,
    mask: "linear-gradient(229deg, rgba(0, 0, 0, 0.8) 0%, rgb(0, 0, 0) 100%) add",
  },
  /** `framer-v-5vshhf` — gradient sweeps in from the top-left. */
  left: {
    className: "framer-OP3uy framer-Bct2H framer-vwagpj framer-v-5vshhf",
    name: "Left shade",
    background: `linear-gradient(132deg, ${TOKEN_WHITE_80} 0%, ${TOKEN_WHITE_06} 31%)`,
    mask: "linear-gradient(122deg, rgba(0, 0, 0, 0.8) 0%, rgb(0, 0, 0) 100%) add",
  },
} as const satisfies Readonly<Record<string, ShadeSpec>>;

type ShadeName = keyof typeof SHADES;

/* -------------------------------------------------------------------------- */
/* Icons — Phosphor "fill" glyphs, 256×256                                     */
/* Absent from the SSR (an empty `<div style="display:contents">` inside a      */
/* Suspense boundary); lifted verbatim from `_source/rendered/home.*.html`,     */
/* where all three breakpoints agree on the pairing below.                      */
/* -------------------------------------------------------------------------- */

const ICON_PATHS = {
  /** Hourglass — "Time saving." */
  hourglass:
    "M211.31,196.69A16,16,0,0,1,200,224H56a16,16,0,0,1-11.32-27.31,1.59,1.59,0,0,0,.13-.13L116.43,128,44.82,59.44a1.59,1.59,0,0,0-.13-.13A16,16,0,0,1,56,32H200a16,16,0,0,1,11.32,27.31,1.59,1.59,0,0,0-.13.13L139.57,128l71.61,68.56A1.59,1.59,0,0,0,211.31,196.69Z",
  /** Currency-circle-dollar — "Cost Efficient." */
  currency:
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm16,160h-8v8a8,8,0,0,1-16,0v-8h-8a32,32,0,0,1-32-32,8,8,0,0,1,16,0,16,16,0,0,0,16,16h32a16,16,0,0,0,0-32H116a32,32,0,0,1,0-64h4V64a8,8,0,0,1,16,0v8h4a32,32,0,0,1,32,32,8,8,0,0,1-16,0,16,16,0,0,0-16-16H116a16,16,0,0,0,0,32h28a32,32,0,0,1,0,64Z",
  /** Fast-forward — "Faster Workflows." */
  fastForward:
    "M256,128a15.76,15.76,0,0,1-7.33,13.34L160.48,197.5A15.91,15.91,0,0,1,136,184.16v-37.3L56.48,197.5A15.91,15.91,0,0,1,32,184.16V71.84A15.91,15.91,0,0,1,56.48,58.5L136,109.14V71.84A15.91,15.91,0,0,1,160.48,58.5l88.19,56.16A15.76,15.76,0,0,1,256,128Z",
  /** Lightbulb — "Better Insights." */
  lightbulb:
    "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z",
  /** Crosshair / target — "Higher Accuracy." */
  target:
    "M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z",
  /** Chart-bar — "Easy Scaling." */
  chartBar:
    "M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z",
} as const;

type IconName = keyof typeof ICON_PATHS;

/* -------------------------------------------------------------------------- */
/* Copy — verbatim. Note the trailing space inside "Time saving. ".            */
/* -------------------------------------------------------------------------- */

interface BenefitCopy {
  readonly title: string;
  readonly body: string;
  readonly icon: IconName;
}

const BENEFITS = {
  timeSaving: {
    title: "Time saving. ",
    body: "Automate tasks instantly.",
    icon: "hourglass",
  },
  costEfficient: {
    title: "Cost Efficient.",
    body: "Reduce manual workload.",
    icon: "currency",
  },
  fasterWorkflows: {
    title: "Faster Workflows.",
    body: "Speed up your operations.",
    icon: "fastForward",
  },
  betterInsights: {
    title: "Better Insights.",
    body: "Understand data quickly.",
    icon: "lightbulb",
  },
  higherAccuracy: {
    title: "Higher Accuracy.",
    body: "Minimize human errors.",
    icon: "target",
  },
  easyScaling: {
    title: "Easy Scaling.",
    body: "Grow without extra effort.",
    icon: "chartBar",
  },
} as const satisfies Readonly<Record<string, BenefitCopy>>;

/* -------------------------------------------------------------------------- */
/* Leaf components                                                             */
/* -------------------------------------------------------------------------- */

function BenefitIcon({ icon }: { icon: IconName }): React.ReactElement {
  return (
    <div className="framer-btlkxv-container">
      <div style={{ display: "contents" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
          color={TOKEN_WHITE}
          style={{
            userSelect: "none",
            width: "100%",
            height: "100%",
            display: "inline-block",
            fill: TOKEN_WHITE,
            color: TOKEN_WHITE,
            flexShrink: 0,
          }}
        >
          <g color={TOKEN_WHITE} {...({ weight: "fill" } as Record<string, string>)}>
            <path d={ICON_PATHS[icon]} />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** One benefit tile. `.framer-OP3uy` — the only two shapes in the whole section. */
function BenefitCard({
  shade,
  benefit,
}: {
  shade: ShadeName;
  benefit: BenefitCopy;
}): React.ReactElement {
  const spec: ShadeSpec = SHADES[shade];
  return (
    <div
      className={spec.className}
      data-framer-name={spec.name}
      style={{
        background: spec.background,
        width: "100%",
        borderBottomLeftRadius: "17px",
        borderBottomRightRadius: "17px",
        borderTopLeftRadius: "17px",
        borderTopRightRadius: "17px",
      }}
    >
      <div
        className="framer-fe34pe"
        data-framer-name="Container"
        style={{
          backgroundColor: TOKEN_BLACK,
          mask: spec.mask,
          WebkitMask: spec.mask,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div
          className="framer-1ic05i1"
          data-framer-name="Icon holder"
          style={{
            backgroundColor: TOKEN_WHITE_06,
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <BenefitIcon icon={benefit.icon} />
        </div>
        <div className="framer-f9vu6j" data-framer-name="Text">
          <div
            className="framer-16am2yv"
            data-framer-component-type="RichTextContainer"
            style={
              {
                "--extracted-r6o4lv": TOKEN_WHITE,
                ...LINK_TEXT,
                transform: "none",
              } as React.CSSProperties
            }
          >
            <p
              className="framer-text framer-styles-preset-sbzkm0"
              data-styles-preset="E64lfTJ9Y"
              style={
                {
                  "--framer-text-color": `var(--extracted-r6o4lv, ${TOKEN_WHITE})`,
                } as React.CSSProperties
              }
            >
              <strong className="framer-text">{benefit.title}</strong>
            </p>
          </div>
          <div
            className="framer-1q1nfdt"
            data-framer-component-type="RichTextContainer"
            style={{ ...LINK_TEXT, transform: "none" } as React.CSSProperties}
          >
            <p
              className="framer-text framer-styles-preset-sbzkm0"
              data-styles-preset="E64lfTJ9Y"
            >
              {benefit.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * `.framer-BZuOL` @Center Pillar — desktop only.
 *
 * FIDELITY NOTE: the SSR references the logo through the page-level sprite,
 * `<use href="#svg-351017049_846"/>`, whose definition lives in `<div id="svg-templates">`
 * at the very end of `<body>` — layout-owned DOM that this repo does not yet render.
 * The sprite entry is inlined here as a nested `<svg>` (which is exactly what `<use>`
 * clones) so the section is self-contained; no global id is introduced, so adding
 * `#svg-templates` to `app/layout.tsx` later cannot collide with it.
 */
function CenterPillar(): React.ReactElement {
  return (
    <div
      className="framer-BZuOL framer-1x2yq0n framer-v-1x2yq0n"
      data-framer-name="Center Pillar"
      style={{
        background: `linear-gradient(180deg, ${TOKEN_WHITE} 0%, ${TOKEN_WHITE_06} 39%)`,
        width: "100%",
        borderBottomLeftRadius: "17px",
        borderBottomRightRadius: "17px",
        borderTopLeftRadius: "17px",
        borderTopRightRadius: "17px",
      }}
    >
      <div
        className="framer-1ejb800"
        data-framer-name="Pillar"
        style={{
          backgroundColor: TOKEN_BLACK,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div className="framer-axdf2n" data-framer-name="Logo and Glow Container">
          <div
            className="framer-mb188"
            data-framer-name="Logo border"
            style={{
              background: `linear-gradient(2deg, ${TOKEN_WHITE} 0%, ${TOKEN_WHITE_06} 100%)`,
              borderBottomLeftRadius: "11px",
              borderBottomRightRadius: "11px",
              borderTopLeftRadius: "11px",
              borderTopRightRadius: "11px",
            }}
          >
            <div
              className="framer-1f91wio"
              data-framer-name="Logo holder"
              style={{
                backgroundColor: TOKEN_BLACK,
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              {/* The CT mark, identical to the navbar logo (`lib/brand`). This slot held
                  Framer's abstract sphere-and-slash glyph; the brand mark replaces it.
                  Kept in the same 48×48 `.framer-1mwt8bc` box the SVG occupied, so the
                  pillar's layout is untouched. */}
              <div className="framer-1mwt8bc" style={{ flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- matches the
                    navbar's own <img>; next/image would wrap and rewrite the URL. */}
                <img
                  decoding="auto"
                  width={512}
                  height={512}
                  sizes="48px"
                  src={BRAND_MARK_SRC}
                  alt="Cloudex Technologies"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectPosition: "center",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="framer-1eos96l"
            data-framer-name="Glow"
            style={{
              background: `linear-gradient(2deg, ${TOKEN_WHITE_80} 0%, rgba(171, 171, 171, 0) 100%)`,
              filter: "blur(20px)",
              WebkitFilter: "blur(20px)",
              borderBottomLeftRadius: "11px",
              borderBottomRightRadius: "11px",
              borderTopLeftRadius: "11px",
              borderTopRightRadius: "11px",
              opacity: 0.65,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export function BenefitsSection(): React.ReactElement {
  return (
    <section className="framer-y3z3gp" data-framer-name="Benefits">
      {/* Heading — reveal animation2 (y 30) / transition2 (0s) */}
      <ScrollReveal
        className="framer-w22v5q"
        data-framer-name="Heading"
        enter="up30"
        transition="t2"
      >
        <div className="ssr-variant">
          <div className="framer-1psz24m-container">
            <div
              className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
              data-border="true"
              data-framer-name="Badge"
              data-highlight="true"
              style={
                {
                  "--border-bottom-width": "1px",
                  "--border-color": TOKEN_WHITE_10,
                  "--border-left-width": "1px",
                  "--border-right-width": "1px",
                  "--border-style": "solid",
                  "--border-top-width": "1px",
                  backgroundColor: TOKEN_GREY_1A,
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                } as React.CSSProperties
              }
            >
              <div
                className="framer-xrs0cf"
                data-framer-component-type="RichTextContainer"
                style={
                  {
                    "--extracted-r6o4lv":
                      "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
                    ...LINK_TEXT,
                    "--variable-reference-ibDtCMzbS-eWNvTdAfh": TOKEN_WHITE_80,
                    transform: "none",
                  } as React.CSSProperties
                }
              >
                <p
                  className="framer-text framer-styles-preset-141u1yr"
                  data-styles-preset="pAzayDUZg"
                  style={
                    {
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-ibDtCMzbS-eWNvTdAfh))",
                    } as React.CSSProperties
                  }
                >
                  Benefits
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="framer-1fva823"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <h2
            className="framer-text framer-styles-preset-1uc0rn1"
            data-styles-preset="f6v2ro_B_"
            style={{ "--framer-text-alignment": "left" } as React.CSSProperties}
          >
            What Makes Our AI Better for Your Business
          </h2>
        </div>
      </ScrollReveal>

      <div className="framer-4bmahw" data-framer-name="Container" id="benefits">
        {/* ---- "Time saving." — .framer-1pkg49z-container, transition3 (0.2s) ---- */}
        <div className={SSR_DESKTOP}>
          <ScrollReveal
            className="framer-1pkg49z-container"
            enter="up50"
            transition="t3"
          >
            <BenefitCard shade="right" benefit={BENEFITS.timeSaving} />
          </ScrollReveal>
        </div>
        <div className={SSR_TABLET}>
          <ScrollReveal
            className="framer-1pkg49z-container"
            enter="left40"
            transition="t3"
          >
            <BenefitCard shade="right" benefit={BENEFITS.timeSaving} />
          </ScrollReveal>
        </div>
        <div className={SSR_PHONE}>
          <ScrollReveal
            className="framer-1pkg49z-container"
            enter="right40"
            transition="t3"
          >
            <BenefitCard shade="left" benefit={BENEFITS.timeSaving} />
          </ScrollReveal>
        </div>

        {/* ---- Left container: "Cost Efficient." + "Faster Workflows." ---- */}
        {/* Desktop: the group reveals (up50 / t4), the two tiles sit still. */}
        <div className={SSR_DESKTOP}>
          <ScrollReveal
            className="framer-3afob2"
            data-framer-name="Left container"
            enter="up50"
            transition="t4"
          >
            <div className="framer-14qxd3g-container" style={SETTLED}>
              <BenefitCard shade="right" benefit={BENEFITS.costEfficient} />
            </div>
            <div className="framer-bqer2q-container" style={SETTLED}>
              <BenefitCard shade="right" benefit={BENEFITS.fasterWorkflows} />
            </div>
          </ScrollReveal>
        </div>
        {/* Tablet + phone: the group is static and each tile reveals on its own. */}
        <div className={SSR_SMALL}>
          <div
            className="framer-3afob2"
            data-framer-name="Left container"
            style={SETTLED}
          >
            <ScrollReveal
              className="framer-14qxd3g-container"
              enter="left40"
              transition="t4"
            >
              <BenefitCard shade="right" benefit={BENEFITS.costEfficient} />
            </ScrollReveal>
            <ScrollReveal
              className="framer-bqer2q-container"
              enter="right40"
              transition="t2"
            >
              <BenefitCard shade="left" benefit={BENEFITS.fasterWorkflows} />
            </ScrollReveal>
          </div>
        </div>

        {/* ---- Center Pillar — desktop only, NOT inside an .ssr-variant ---- */}
        <ScrollReveal
          className={`framer-1x0vqwn-container ${HIDE_TABLET} ${HIDE_PHONE}`}
          enter="up50"
          transition="t3"
        >
          <CenterPillar />
        </ScrollReveal>

        {/* ---- Right container: "Better Insights." + "Higher Accuracy." ---- */}
        <div className={SSR_DESKTOP}>
          <ScrollReveal
            className="framer-bqkij4"
            data-framer-name="Right container"
            enter="up50"
            transition="t4"
          >
            <div className="framer-yfx55a-container" style={SETTLED}>
              <BenefitCard shade="left" benefit={BENEFITS.betterInsights} />
            </div>
            <div className="framer-15zbmym-container" style={SETTLED}>
              <BenefitCard shade="left" benefit={BENEFITS.higherAccuracy} />
            </div>
          </ScrollReveal>
        </div>
        <div className={SSR_SMALL}>
          <div
            className="framer-bqkij4"
            data-framer-name="Right container"
            style={SETTLED}
          >
            <ScrollReveal
              className="framer-yfx55a-container"
              enter="left40"
              transition="t4"
            >
              <BenefitCard shade="right" benefit={BENEFITS.betterInsights} />
            </ScrollReveal>
            <ScrollReveal
              className="framer-15zbmym-container"
              enter="right40"
              transition="t4"
            >
              <BenefitCard shade="left" benefit={BENEFITS.higherAccuracy} />
            </ScrollReveal>
          </div>
        </div>

        {/* ---- "Easy Scaling." — .framer-6hakb9-container, transition2 (0s) ---- */}
        <div className={SSR_DESKTOP}>
          <ScrollReveal
            className="framer-6hakb9-container"
            enter="up50"
            transition="t2"
          >
            <BenefitCard shade="left" benefit={BENEFITS.easyScaling} />
          </ScrollReveal>
        </div>
        <div className={SSR_TABLET}>
          <ScrollReveal
            className="framer-6hakb9-container"
            enter="right40"
            transition="t2"
          >
            <BenefitCard shade="left" benefit={BENEFITS.easyScaling} />
          </ScrollReveal>
        </div>
        <div className={SSR_PHONE}>
          <ScrollReveal
            className="framer-6hakb9-container"
            enter="left40"
            transition="t2"
          >
            <BenefitCard shade="right" benefit={BENEFITS.easyScaling} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
