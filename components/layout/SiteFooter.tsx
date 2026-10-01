"use client";

/**
 * SiteFooter — the footer shared by all 5 routes.
 *
 * Markup source: `_source/live/home.html` (raw SSR, offsets 1055925–1082096) cross-checked
 * against `_source/rendered/home.{desktop,tablet,phone}.html`. Converted with
 * `tools/html2jsx.mjs --asset-map _source/asset-map.json`.
 *
 * Behaviour source: the footer's own Framer codegen module, recovered verbatim from
 * `_source/behaviours/chunks/maps/script_main.BYcRrXOG.mjs.map`
 *   → `.../vWsi0tz7RA1w7636WjLR/Oz4hJVOqJ.js`  (the footer)
 *   → `.../cgI0Bwt1saoxfV2LcZoq/Input_Waitlist.js` + `.../dNcsiLsuC8uzH8lzqFBp/Input.js`
 *     (the newsletter field — `framer/InputSites@1.16.3`, `service: "getwaitlist"`).
 * Every number below is MEASURED from that source unless explicitly marked otherwise.
 *
 * Fidelity notes
 * --------------
 * • Framer SSRs BOTH breakpoint variants and hides the inactive one with the LAYOUT hash
 *   triple (PLAN.md §1.1: desktop `28a2o6` / tablet `mvvops` / phone `1j9zbg5`), NOT the
 *   home-page triple. Both are rendered here, exactly as the SSR does.
 *     - `Desktop` (framer-v-1tyvp9q) — shown at desktop AND tablet, `hidden-1j9zbg5`
 *     - `mobile`  (framer-v-14so53d) — shown at phone only, `hidden-mvvops hidden-28a2o6`
 *   The two variants differ in exactly three places (verified by diffing the SSR subtrees):
 *     1. footer class / `data-framer-name`
 *     2. `.framer-11gja0v` rotate 90 → 0
 *     3. `.framer-mle7ye` borderBottomLeftRadius 14 → 0
 *   so both are rendered from ONE `<FooterVariant>` and cannot drift apart.
 *
 * • `.framer-sl3uaf` is a scroll reveal, not an appear-animation: the SSR inline style is
 *   `will-change:transform;opacity:0;transform:translateY(50px)` and there is no
 *   `data-framer-appear-id` anywhere in the footer. Its spring is `{stiffness: 320,
 *   damping: 70, mass: 1}` — NOT the site-wide `REVEAL_TRANSITIONS.t2` (300/60/1), so it is
 *   passed explicitly. (`__framer__threshold: .5`, `__framer__animateOnce: true` match the
 *   ScrollReveal defaults.)
 *
 * • The Framer badge (`#__framer-badge-container`, appear id `n0ccwk`) is NOT rendered —
 *   PLAN.md §1.3. It is not in the SSR DOM either; only its CSS is.
 *
 * • `framer-lib-cursors-host` is inert (cursor-host.md) and is not rendered here or
 *   referenced by anything in this file.
 *
 * • The `<use href="#svg12158825557">` references Framer's global `<div id="svg-templates">`
 *   sprite, which lives outside every component. The footer is the ONLY consumer of that
 *   symbol (4 `<use>` sites = 2 per variant), so the 18×18 path is inlined instead, which
 *   renders identically and keeps this component self-contained with no global id dependency.
 *
 * • The Framer template author credit ("Visioned and Crafted  by Kanishk Dubey",
 *   linking to `https://x.com/xlauncherx7`) was REMOVED at the client's request. It was
 *   previously kept verbatim per PLAN.md §7. With it gone, the "Legals" row holds a
 *   single child, so its `justify-content: space-between` is overridden to `flex-end`
 *   to keep the privacy link on the right where the design puts it.
 */

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls } from "motion/react";
import type { Transition, Variants } from "motion/react";

import {
  ScrollReveal,
  hiddenClassName,
  type ReducedMotionPolicy,
} from "@/components/primitives";

/* -------------------------------------------------------------------------- */
/* Constants — MEASURED                                                        */
/* -------------------------------------------------------------------------- */

/** `serializationHash` of the footer module. */
export const FOOTER_SERIALIZATION_HASH = "framer-TJuOO";

/** `variantClassNames` — `FLrAFdOlO` = Desktop, `WSDdaMr1N` = mobile. */
export const FOOTER_VARIANT_CLASS_NAMES = {
  desktop: "framer-v-1tyvp9q",
  mobile: "framer-v-14so53d",
} as const;

export type FooterVariantName = keyof typeof FOOTER_VARIANT_CLASS_NAMES;

/** The scoping class list the footer element carries, minus the variant class. */
export const FOOTER_BASE_CLASS =
  "framer-TJuOO framer-Nfc2n framer-Bct2H framer-d2uK3 framer-TPaq9 framer-WQyg0 framer-1tyvp9q";

/** The layout-template container Framer wraps the footer in (`.framer-dUOq6 .framer-a4yijq-container`). */
export const FOOTER_CONTAINER_CLASS = "framer-a4yijq-container";

/**
 * `transition2` in the footer module — the reveal spring for `.framer-sl3uaf`.
 * damping 70 / (2·√(320·1)) ≈ 1.96 → over-damped, zero overshoot.
 * Deliberately NOT `REVEAL_TRANSITIONS.t2`; the footer uses its own numbers.
 */
export const FOOTER_REVEAL_TRANSITION = {
  type: "spring",
  stiffness: 320,
  damping: 70,
  mass: 1,
  delay: 0,
} as const satisfies Transition;

/** `__framer__enter` = `{opacity: 0, …, x: 0, y: 50}` → ScrollReveal's `up50` / `animation12`. */
export const FOOTER_REVEAL_ENTER = "up50" as const;

/**
 * `transition1` in the footer module — the Desktop↔mobile VARIANT transition.
 * Unused here: both variants are SSR'd and swapped by CSS, never animated. Exported so
 * nobody has to re-derive it if the footer is ever driven as a real variant machine.
 */
export const FOOTER_VARIANT_TRANSITION = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
  delay: 0,
} as const satisfies Transition;

/** The 18×18 rounded-edge path behind `#svg12158825557`, both notch corners. */
const ROUNDED_EDGE_PATH = "M 0 0 L 0 18 C 0 8.059 8.059 0 18 0 Z";
const ROUNDED_EDGE_FILL =
  "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";

/** Framer's stops and angle, recoloured for the light theme: the grey ink-alpha ends
 *  become the brand tint, the dark middle becomes the raised surface. */
const FOOTER_GRADIENT =
  "linear-gradient(114deg, var(--ct-accent-tint, rgba(0, 85, 255, 0.1)) 0%, var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17)) 11.417863175675675%, var(--token-a8471d98-b099-4061-946e-68d6bcaf188a, rgb(17, 17, 17)) 80.03765484234235%, var(--ct-accent-tint, rgba(0, 85, 255, 0.1)) 100%)";

/* --- design tokens used by the footer, spelled exactly as Framer emits them --- */
const TOKEN_BLACK = "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";
const TOKEN_WHITE =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const TOKEN_GREY =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
const TOKEN_INPUT_FILL =
  "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))";

/* --- the logo, resolved through _source/asset-map.json --- */
export const FOOTER_LOGO = {
  alt: "Cloudex Technologies",
  width: 1024,
  height: 198,
  sizes:
    "(min-width: 1200px) 150px, (min-width: 810px) and (max-width: 1199.98px) 150px, (max-width: 809.98px) 150px",
  src: "/assets/images/brand/cloudex-logo-1024.webp",
  srcSet:
    "/assets/images/brand/cloudex-logo-256.webp 256w,/assets/images/brand/cloudex-logo-512.webp 512w,/assets/images/brand/cloudex-logo-1024.webp 1024w",
} as const;

export const FOOTER_TAGLINE = "Making Automation Simple and Reliable";

/* -------------------------------------------------------------------------- */
/* Links                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Framer emits page links RELATIVE to the current route (`./about` from `/`, `../about`
 * from `/legal-pages/privacy-policy`). Root-absolute paths are the equivalent here; the
 * rendered `<a>` is otherwise identical.
 *
 * `data-framer-page-link-current="true"` lands on whichever entry matches the live
 * pathname exactly — Framer marks it by page id, so a `/blog/<slug>` route marks NOTHING
 * (verified in `_source/rendered/blog--*.desktop.html`).
 *
 * Services and Industries were added after the migration. Framer has no per-link class
 * for them, so they reuse Blog's: every page-link class shares one rule in `layout.css`.
 */
export const FOOTER_PAGE_LINKS = [
  { className: "framer-1jfwtqt", href: "/", label: "Home" },
  { className: "framer-42zu09", href: "/about", label: "About" },
  { className: "framer-17it8en", href: "/services", label: "Services" },
  { className: "framer-17it8en", href: "/industries", label: "Industries" },
  { className: "framer-17it8en", href: "/products", label: "Products" },
  { className: "framer-17it8en", href: "/insights", label: "Insights" },
  { className: "framer-196eq5m", href: "/contact", label: "Contact" },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  { className: "framer-oooxr1", href: "https://linkedin.com", label: "LinkedIn" },
  { className: "framer-16sc959", href: "https://youtube.com", label: "Youtube" },
  { className: "framer-1hxtjsn", href: "https://x.com", label: "Twitter" },
  { className: "framer-y8yoe", href: "https://facebook.com", label: "Facebook" },
] as const;

export const FOOTER_PRIVACY_LINK = {
  className: "framer-wingml",
  href: "/legal-pages/privacy-policy",
  label: "Privacy policy",
} as const;

/* -------------------------------------------------------------------------- */
/* Newsletter — MEASURED from Input.js (`service: "getwaitlist"`)              */
/* -------------------------------------------------------------------------- */

/**
 * What the real footer form posts to.
 *
 * NOT a Framer endpoint: `Input.js` posts JSON to getwaitlist.com.
 *   POST https://api.getwaitlist.com/api/v1/waiter/
 *   { api_key: <getwaitlistAPI>, email: <value>, referral_link: document.URL }
 *
 * The site configures `getwaitlistAPI: ""` — the SSR'd markup proves it
 * (`<input type="hidden" name="api_key" value="">`). So the live form posts an EMPTY
 * api key and the request cannot succeed. It still LOOKS successful, because Input.js
 * chains `.then(onSuccess)` with no `res.ok` check: `fetch` only rejects on a network
 * error, so a 4xx still clears the field. See the report / `NEWSLETTER_LIVE_ENDPOINT`.
 */
export const NEWSLETTER_LIVE_ENDPOINT =
  "https://api.getwaitlist.com/api/v1/waiter/";

/** `getwaitlistAPI` as configured on this site: the empty string. */
export const NEWSLETTER_LIVE_API_KEY = "";

/**
 * ESTIMATED (the only estimated number in this file). The live spinner is visible for
 * however long the getwaitlist round trip takes. The default local handler performs no
 * network call, so it holds the Loading state for this long to keep the state cycle
 * observable. Pass `onNewsletterSubmit` to replace it.
 */
export const NEWSLETTER_NOOP_LATENCY_MS = 600;

/** `emailRegex` — copied verbatim from Input.js. */
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidNewsletterEmail(email: string): boolean {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

/** `formVariants` — the error shake, on the CONTAINER div (not the form). */
export const NEWSLETTER_FORM_VARIANTS: Variants = {
  default: { x: 0 },
  error: { x: [0, -4, 4, 0], transition: { duration: 0.2 } },
};

/** `Spinner` — 16×16, rotate 0→360, duration 1, repeat Infinity, motion's DEFAULT ease. */
export const NEWSLETTER_SPINNER_TRANSITION = {
  duration: 1,
  repeat: Infinity,
} as const satisfies Transition;

/** Resolved `input`/`button` prop objects, as the footer module passes them. */
export const NEWSLETTER_STYLE = {
  /** `paddingPerSide:false, padding:15, isDocked:true, widthWhenDocked:100` → `15px 115px 15px 15px` */
  inputPadding: "15px 115px 15px 15px",
  /** `buttonPaddingPerSide:true, isDocked:true` → top/bottom collapse to 0 */
  buttonPadding: "0px 12px 0px 12px",
  inputBorderRadius: 24,
  /** `borderRadius - insetWhenDocked` = 24 − 5 */
  buttonBorderRadius: 19,
  insetWhenDocked: 5,
  widthWhenDocked: 100,
  placeholder: "name@email.com",
  buttonLabel: "Subscribe",
  /** `height: true` → the input sizes to content, the button to 100%. */
  inputHeight: "auto",
  buttonHeight: "100%",
} as const;

const INPUT_FONT: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
  fontStyle: "normal",
  fontWeight: 500,
  letterSpacing: "0em",
  lineHeight: "1em",
};

const BUTTON_FONT: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  letterSpacing: "-0.03em",
  lineHeight: "1em",
};

export type NewsletterSubmitHandler = (
  email: string,
) => void | Promise<void>;

/** The default, deliberately local, no-op submit. See the functional-gap note above. */
const defaultNewsletterSubmit: NewsletterSubmitHandler = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, NEWSLETTER_NOOP_LATENCY_MS),
  );

/* -------------------------------------------------------------------------- */
/* Spinner                                                                     */
/* -------------------------------------------------------------------------- */

function NewsletterSpinner({ color }: { color: string }): React.ReactElement {
  return (
    <motion.div
      style={{ height: 16, width: 16 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={NEWSLETTER_SPINNER_TRANSITION}
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          style={{ fill: "currentColor", color }}
        >
          <path
            d="M 8 0 C 3.582 0 0 3.582 0 8 C 0 12.419 3.582 16 8 16 C 12.418 16 16 12.419 16 8 C 15.999 3.582 12.418 0 8 0 Z M 8 14 C 4.687 14 2 11.314 2 8 C 2 4.687 4.687 2 8 2 C 11.314 2 14 4.687 14 8 C 14 11.314 11.314 14 8 14 Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M 8 0 C 12.418 0 15.999 3.582 16 8 C 16 8 16 9 15 9 C 14 9 14 8 14 8 C 14 4.687 11.314 2 8 2 C 4.687 2 2 4.687 2 8 C 2 8 2 9 1 9 C 0 9 0 8 0 8 C 0 3.582 3.582 0 8 0 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Newsletter form                                                             */
/* -------------------------------------------------------------------------- */

export interface NewsletterFormProps {
  /**
   * Replaces the default local no-op. Resolve → Success (field clears);
   * reject/throw → Error (shake, field kept). Exactly Input.js's contract.
   */
  onSubmitEmail?: NewsletterSubmitHandler;
  /** Test hook — lands on the container as `data-testid`. */
  testId?: string;
}

/**
 * Reproduces `framer/InputSites@1.16.3` with `service: "getwaitlist"`, docked button,
 * node-for-node. States, in Input.js's own vocabulary:
 *
 *   idle      — `isLoading:false, isError:false`
 *   invalid   — submit with "" or a non-matching email → `error` shake, NO request
 *   loading   — spinner overlay covers the button; re-submits are ignored
 *   success   — `setLoading(false); setFocus(false); setEmail("")`
 *   error     — network/handler rejection → `setLoading(false); setError(true)` + shake
 *
 * There is no error text and no red border in the source — do not add either.
 *
 * NOTE on validation layering: the SSR'd `<form>` has NO `novalidate` and the `<input>` is
 * `type="email"` without `required`, so the browser's own constraint validation runs FIRST.
 * A non-empty malformed address is stopped by Chrome's bubble and `onSubmit` never fires;
 * the JS `emailRegex` path is reached for an EMPTY field, for a value the browser accepts
 * but the regex rejects, and in browsers with constraint validation off. That layering is
 * Framer's, reproduced verbatim — `noValidate` is deliberately NOT set.
 */
export function NewsletterForm({
  onSubmitEmail = defaultNewsletterSubmit,
  testId,
}: NewsletterFormProps): React.ReactElement {
  const [email, setEmail] = React.useState("");
  const [, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [, setIsFocus] = React.useState(false);
  const formControls = useAnimationControls();

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(false);
      setEmail(event.target.value);
    },
    [],
  );

  const handleFocus = React.useCallback(() => setIsFocus(true), []);

  const handleBlur = React.useCallback(() => {
    setIsFocus(false);
    setIsError(false);
  }, []);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isLoading) return; // "Prevent submitting while submitting" — verbatim
      setIsLoading(true);

      if (email === "" || !isValidNewsletterEmail(email)) {
        setIsError(true);
        void formControls.start("error");
        setIsLoading(false);
        return;
      }

      try {
        await onSubmitEmail(email);
        // onSuccess() — reset. `redirectAs: "link"` with no `link` configured, so there
        // is no navigation and no tracking call on this site.
        setIsLoading(false);
        setIsFocus(false);
        setEmail("");
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
        void formControls.start("error");
      }
    },
    [email, isLoading, onSubmitEmail, formControls],
  );

  return (
    <motion.div
      style={{
        maxWidth: "100%",
        width: "100%",
        position: "relative",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ["--framer-custom-placeholder-color" as string]: TOKEN_GREY,
      }}
      variants={NEWSLETTER_FORM_VARIANTS}
      animate={formControls}
      data-testid={testId}
      data-newsletter-state={isLoading ? "loading" : "idle"}
    >
      <form
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          position: "relative",
          flexDirection: "row",
          color: TOKEN_BLACK,
          gap: 0,
        }}
        onSubmit={handleSubmit}
        method="POST"
      >
        <input type="hidden" name="api_key" value={NEWSLETTER_LIVE_API_KEY} />
        <input
          type="email"
          name="email"
          placeholder={NEWSLETTER_STYLE.placeholder}
          value={email}
          className="v1 framer-custom-input"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          data-1p-ignore="true"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            width: "100%",
            height: "auto",
            outline: "none",
            border: "none",
            padding: NEWSLETTER_STYLE.inputPadding,
            borderRadius: NEWSLETTER_STYLE.inputBorderRadius,
            ...INPUT_FONT,
            background: TOKEN_INPUT_FILL,
            color: TOKEN_WHITE,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: NEWSLETTER_STYLE.insetWhenDocked,
            right: NEWSLETTER_STYLE.insetWhenDocked,
            bottom: NEWSLETTER_STYLE.insetWhenDocked,
          }}
        >
          <input
            type="submit"
            value={NEWSLETTER_STYLE.buttonLabel}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              width: NEWSLETTER_STYLE.widthWhenDocked,
              height: NEWSLETTER_STYLE.buttonHeight,
              outline: "none",
              border: "none",
              cursor: "pointer",
              padding: NEWSLETTER_STYLE.buttonPadding,
              borderRadius: NEWSLETTER_STYLE.buttonBorderRadius,
              ...BUTTON_FONT,
              background: TOKEN_WHITE,
              color: TOKEN_BLACK,
              zIndex: 1,
              boxShadow: "none",
            }}
          />
          {isLoading && (
            <div
              style={{
                borderRadius: NEWSLETTER_STYLE.buttonBorderRadius,
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                inset: 0,
                zIndex: 2,
                color: TOKEN_BLACK,
                background: TOKEN_WHITE,
              }}
            >
              <NewsletterSpinner color={TOKEN_BLACK} />
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small shared pieces                                                         */
/* -------------------------------------------------------------------------- */

/** `<use href="#svg12158825557">` inlined. `viewBox` moves onto the rendered `<svg>`. */
function RoundedEdgeSvg({ className }: { className: string }): React.ReactElement {
  return (
    <div
      data-framer-component-type="SVG"
      {...({
        parentsize: "0",
        _constraints: "[object Object]",
        rotation: "0",
        shadows: "",
      } as Record<string, string>)}
      className={className}
      aria-hidden="true"
      style={{ imageRendering: "pixelated", flexShrink: 0 }}
    >
      <div
        className="svgContainer"
        style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
      >
        <svg viewBox="0 0 18 18" style={{ width: "100%", height: "100%" }}>
          <path d={ROUNDED_EDGE_PATH} fill={ROUNDED_EDGE_FILL} />
        </svg>
      </div>
    </div>
  );
}

function LinkParagraph({
  className,
  href,
  external,
  current,
  children,
}: {
  className: string;
  href: string;
  external?: boolean;
  current?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const anchorClassName = "framer-text framer-styles-preset-1arsep9";
  const anchor = external ? (
    <a
      className={anchorClassName}
      data-styles-preset="PeLcf7ehs"
      href={href}
      target="_blank"
      rel=""
    >
      {children}
    </a>
  ) : (
    <Link
      className={anchorClassName}
      data-styles-preset="PeLcf7ehs"
      href={href}
      prefetch={false}
      {...(current ? { "data-framer-page-link-current": "true" } : {})}
    >
      {children}
    </Link>
  );

  return (
    <div
      className={className}
      data-framer-component-type="RichTextContainer"
      style={{
        ["--extracted-r6o4lv" as string]: TOKEN_GREY,
        transform: "none",
      }}
    >
      <p
        className="framer-text framer-styles-preset-141u1yr"
        data-styles-preset="pAzayDUZg"
        style={{
          ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${TOKEN_GREY})`,
        }}
      >
        {anchor}
      </p>
    </div>
  );
}

function ColumnHeading({
  className,
  label,
}: {
  className: string;
  label: string;
}): React.ReactElement {
  return (
    <div
      className={className}
      data-framer-component-type="RichTextContainer"
      style={{
        ["--extracted-r6o4lv" as string]: TOKEN_WHITE,
        ["--framer-link-text-color" as string]: "rgb(0, 153, 255)",
        ["--framer-link-text-decoration" as string]: "underline",
        transform: "none",
      }}
    >
      <p
        className="framer-text framer-styles-preset-1omitwj"
        data-styles-preset="CZhcsmPUo"
        style={{
          ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${TOKEN_WHITE})`,
        }}
      >
        <strong className="framer-text">{label}</strong>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* One footer variant                                                          */
/* -------------------------------------------------------------------------- */

interface FooterVariantProps {
  variant: FooterVariantName;
  currentPath: string;
  onNewsletterSubmit?: NewsletterSubmitHandler;
  reducedMotion?: ReducedMotionPolicy;
  revealDisabled?: boolean;
  testId?: string;
}

function FooterVariant({
  variant,
  currentPath,
  onNewsletterSubmit,
  reducedMotion,
  revealDisabled,
  testId,
}: FooterVariantProps): React.ReactElement {
  const isMobile = variant === "mobile";

  return (
    <footer
      className={`${FOOTER_BASE_CLASS} ${FOOTER_VARIANT_CLASS_NAMES[variant]}`}
      data-framer-name={isMobile ? "mobile" : "Desktop"}
      data-testid={testId}
      style={{ width: "100%" }}
    >
      <ScrollReveal
        enter={FOOTER_REVEAL_ENTER}
        transition={FOOTER_REVEAL_TRANSITION}
        reducedMotion={reducedMotion}
        disabled={revealDisabled}
        className="framer-sl3uaf"
        data-framer-name="Footer"
        style={{
          background: FOOTER_GRADIENT,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <div className="framer-kg07fk" data-framer-name="Notch">
          <div
            className="framer-11gja0v"
            data-framer-name="Rounded Edge"
            style={{ transform: isMobile ? "none" : "rotate(90deg)" }}
          >
            <RoundedEdgeSvg className="framer-u5sqwr" />
          </div>
          <div
            className="framer-mle7ye"
            data-framer-name="Content"
            style={{
              backgroundColor: TOKEN_BLACK,
              borderBottomLeftRadius: isMobile ? "0px" : "14px",
              borderBottomRightRadius: "14px",
            }}
          >
            <div
              className="framer-emcpa4"
              data-framer-name="Logo"
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div
                className="framer-gtszo6"
                data-framer-name="Cloudex Technologies logo"
              >
                <div
                  style={{
                    position: "absolute",
                    borderRadius: "inherit",
                    ["cornerShape" as string]: "inherit",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0",
                  }}
                  data-framer-background-image-wrapper="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    decoding="async"
                    width={FOOTER_LOGO.width}
                    height={FOOTER_LOGO.height}
                    sizes={FOOTER_LOGO.sizes}
                    srcSet={FOOTER_LOGO.srcSet}
                    src={FOOTER_LOGO.src}
                    alt={FOOTER_LOGO.alt}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      ["cornerShape" as string]: "inherit",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="framer-g0qxil" data-framer-name="Rounded Edge">
            <RoundedEdgeSvg className="framer-h4o64n" />
          </div>
        </div>

        <div className="framer-o4deo7" data-framer-name="Content">
          <div className="framer-16eo53d" data-framer-name="Container">
            <div className="framer-b68q31" data-framer-name="Left section">
              <div className="framer-zdbmoo" data-framer-name="Tagline">
                <div
                  className="framer-nd7ld8"
                  data-framer-component-type="RichTextContainer"
                  style={{
                    ["--framer-link-text-color" as string]: "rgb(0, 153, 255)",
                    ["--framer-link-text-decoration" as string]: "underline",
                    transform: "none",
                  }}
                >
                  <p
                    className="framer-text framer-styles-preset-12rrjiu"
                    data-styles-preset="qvlEncZWk"
                    dir="auto"
                  >
                    {FOOTER_TAGLINE}
                  </p>
                </div>
              </div>

              <div className="framer-xnv9qu" data-framer-name="newsletter">
                <div
                  className="framer-1vomwk6"
                  data-framer-component-type="RichTextContainer"
                  style={{
                    ["--framer-link-text-color" as string]: "rgb(0, 153, 255)",
                    ["--framer-link-text-decoration" as string]: "underline",
                    transform: "none",
                  }}
                >
                  <p
                    className="framer-text framer-styles-preset-sbzkm0"
                    data-styles-preset="E64lfTJ9Y"
                    style={{ ["--framer-text-alignment" as string]: "left" }}
                  >
                    <strong className="framer-text">Join our newsletter</strong>
                  </p>
                </div>
                <div className="framer-auzm4l-container">
                  <NewsletterForm
                    onSubmitEmail={onNewsletterSubmit}
                    testId={testId ? `${testId}-newsletter` : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="framer-uld8n7" data-framer-name="Links">
              <div className="framer-176zqq2" data-framer-name="Pages">
                <ColumnHeading className="framer-blhfyo" label="Pages" />
                {FOOTER_PAGE_LINKS.map((link) => (
                  <LinkParagraph
                    key={link.href}
                    className={link.className}
                    href={link.href}
                    current={currentPath === link.href}
                  >
                    {link.label}
                  </LinkParagraph>
                ))}
              </div>

              <div className="framer-1mwg92z" data-framer-name="Socials">
                <ColumnHeading className="framer-68qlsg" label="Socials" />
                {FOOTER_SOCIAL_LINKS.map((link) => (
                  <LinkParagraph
                    key={link.href}
                    className={link.className}
                    href={link.href}
                    external
                  >
                    {link.label}
                  </LinkParagraph>
                ))}
              </div>
            </div>
          </div>

          <div className="framer-bsp3v9" data-framer-name="Legals">
            {/* `space-between` positioned the credit left and this link right; with the
                credit gone a lone child would jump to the left, so pin it right. The
                mobile variant re-stacks this row to a centred column and is unaffected. */}
            <div
              className="framer-1s6ujd5"
              data-framer-name="Links"
              style={{ justifyContent: "flex-end" }}
            >
              <LinkParagraph
                className={FOOTER_PRIVACY_LINK.className}
                href={FOOTER_PRIVACY_LINK.href}
                current={currentPath === FOOTER_PRIVACY_LINK.href}
              >
                {FOOTER_PRIVACY_LINK.label}
              </LinkParagraph>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* SiteFooter                                                                  */
/* -------------------------------------------------------------------------- */

export interface SiteFooterProps {
  /**
   * Overrides `usePathname()` when deciding which page link gets
   * `data-framer-page-link-current`. Pass it from a Server Component or a test.
   */
  currentPath?: string;
  /** Replaces the default local no-op newsletter handler. */
  onNewsletterSubmit?: NewsletterSubmitHandler;
  /** Forwarded to the `.framer-sl3uaf` ScrollReveal. Default `"settle"`. */
  reducedMotion?: ReducedMotionPolicy;
  /** Render the reveal at its rest state, no animation (screenshots, tests). */
  revealDisabled?: boolean;
  /** Extra classes on the `.framer-a4yijq-container` wrapper. */
  className?: string;
}

/**
 * Renders `.framer-a4yijq-container` plus BOTH SSR variants, exactly as Framer does.
 *
 * Placement: the container rule is `.framer-dUOq6 .framer-a4yijq-container { order: 1002 }`,
 * so this must be mounted INSIDE the `framer-dUOq6` layout scope (the `<div id="main">`
 * subtree), as the last child of the template column. Outside that scope it renders
 * unstyled.
 */
export function SiteFooter({
  currentPath,
  onNewsletterSubmit,
  reducedMotion,
  revealDisabled,
  className,
}: SiteFooterProps = {}): React.ReactElement {
  const pathname = usePathname();
  const resolvedPath = currentPath ?? pathname ?? "/";

  const desktopHidden = `ssr-variant ${hiddenClassName("layout", "phone")}`;
  const mobileHidden = `ssr-variant ${hiddenClassName("layout", "tablet")} ${hiddenClassName("layout", "desktop")}`;

  return (
    <div
      className={
        className
          ? `${FOOTER_CONTAINER_CLASS} ${className}`
          : FOOTER_CONTAINER_CLASS
      }
    >
      <div className={desktopHidden}>
        <FooterVariant
          variant="desktop"
          currentPath={resolvedPath}
          onNewsletterSubmit={onNewsletterSubmit}
          reducedMotion={reducedMotion}
          revealDisabled={revealDisabled}
          testId="site-footer-desktop"
        />
      </div>
      <div className={mobileHidden}>
        <FooterVariant
          variant="mobile"
          currentPath={resolvedPath}
          onNewsletterSubmit={onNewsletterSubmit}
          reducedMotion={reducedMotion}
          revealDisabled={revealDisabled}
          testId="site-footer-mobile"
        />
      </div>
    </div>
  );
}

export default SiteFooter;
