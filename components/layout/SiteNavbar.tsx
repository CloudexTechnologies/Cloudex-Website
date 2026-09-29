"use client";

/**
 * SiteNavbar — the navbar shared byte-identically by all 5 routes.
 *
 * Measured specs:
 *   `_source/behaviours/navbar-desktop.md`  (hover-expand notch)
 *   `_source/behaviours/navbar-mobile.md`   (hamburger morph + menu panel)
 *   `_source/behaviours/nav-link-hover.md`  (In / In Delayed / Out)
 * Re-derived from Framer's own source maps (`_source/behaviours/chunks/maps/
 * script_main.BYcRrXOG.mjs.map` → `LgoUnShL6.js` = NavItem, `pQVYkCmqe.js` = hamburger,
 * `O89z7Q561.js` = Navigation), so every number below is MEASURED, none invented.
 *
 * ── THE #1 FIDELITY FACT ──────────────────────────────────────────────────────
 * The desktop nav links are INVISIBLE AT REST. Framer SSRs every NavItem in the
 * `Out` variant: `filter: blur(4px); opacity: 0; transform: translateX(-50%) scale(1.1)`,
 * lifted out of flow (`position:absolute; top:-20px; left:49%`) and clipped by the bar's
 * `overflow:hidden`. Hovering ANYWHERE on the `<nav>` switches every NavItem to
 * `In Delayed`, which un-blurs / fades / un-scales them into flow with a 0.1s delay, and
 * simultaneously widens the notch's "Mid" block 48px → 340px. Mouse-out reverses it.
 * A navbar that shows Home/About/Blog/Contact at rest is WRONG.
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * Structure (verbatim from `_source/rendered/home.{desktop,phone}.html`): TWO complete
 * navs live in the DOM at once, hidden per breakpoint by the shared **layout** hash
 * triple (PLAN.md §1.1 — `28a2o6` / `mvvops` / `1j9zbg5`), NOT the per-page triple.
 * The tablet band (810–1199.98px) uses the PHONE navbar, which is why the desktop
 * wrapper carries both `hidden-mvvops` and `hidden-1j9zbg5`.
 *
 * Deliberate, documented divergences from Framer's SSR (all behaviour-neutral):
 *   1. NavItem keeps its `href` in the `Out` variant (Framer deletes it). Swapping the
 *      anchor's identity mid-transition would remount it and kill the layout animation.
 *      It is unreachable anyway: on desktop you cannot click without first hovering
 *      (which reveals the link), and on mobile the closed containers are
 *      `pointer-events: none`.
 *   2. The notch shoulder SVGs are inlined instead of `<use href="#svg…">` into Framer's
 *      runtime-generated `#svg-templates` sprite, which does not exist here.
 *   3. The hamburger bars are driven by an explicit ±9px `y` (arithmetic on the measured
 *      CSS: closed top 6px / bottom 5px in a 31px box, open top
 *      `calc(51.61290322580647% - 1px)` = 15px) instead of motion's layout engine.
 *      Layout animation plus `rotate: ±45deg` on the same element is the one combination
 *      motion documents as unreliable; the arithmetic is identical and deterministic.
 *      The `framer-v-1f7ec13` variant class is still applied, with the CSS `top`/`bottom`
 *      neutralised by an inline override so the two mechanisms cannot fight.
 *   4. `role="button"` + `aria-expanded` + Enter/Space on the hamburger, and
 *      `aria-current` on the logo. Framer ships a bare tabbable `<div>`; these add
 *      semantics without touching a single pixel.
 *   5. Every nav link and both logos scroll the destination to the top (see
 *      `handleNavClick`). Framer's runtime router does this for free; the App Router
 *      does not on a same-route click, and its cross-route scroll can lose a race with
 *      the browser's scroll restoration.
 *
 * There is NO CTA button in this navbar and NO active-route state on the nav links —
 * verified across all five `_source/rendered/*.desktop.html` files, none of which stamps
 * `data-framer-page-link-current` on a NavItem. The only current-page marker in the whole
 * navbar is on the LOGO (`href="./"`), and only on `/`.
 */

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { Transition } from "motion/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  type ReducedMotionPolicy,
  DEFAULT_REDUCED_MOTION_POLICY,
} from "@/components/primitives/AppearMotion";
import { hiddenClassName } from "@/lib/breakpoints";
import { BRAND_LOGO_SRC, BRAND_LOGO_SRCSET } from "@/lib/brand";

import {
  NavMegaPanel,
  NavSubList,
  menuKeyForHref,
  type NavMenuKey,
} from "./NavMenus";

/* -------------------------------------------------------------------------- */
/* Tokens                                                                      */
/* -------------------------------------------------------------------------- */

/** `--token-a53beb93-…` — the site's black. Used by the notch, its shoulders and the
 *  phone bar's open background. Verbatim from the SSR'd inline styles. */
export const NAV_BLACK_TOKEN =
  "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";

/** The nav's own resting background in BOTH desktop variants and in `Phone Closed`. */
export const NAV_TRANSPARENT = "rgba(0, 0, 0, 0)";

/** The full Cloudex Technologies wordmark (`lib/brand`). The Benefits centre pillar keeps the
 *  square CT mark, which fits its round slot. */
export const NAV_LOGO_SRC = BRAND_LOGO_SRC;
export const NAV_LOGO_SRCSET = BRAND_LOGO_SRCSET;

/* -------------------------------------------------------------------------- */
/* Transitions — all MEASURED                                                  */
/* -------------------------------------------------------------------------- */

/** `O89z7Q561.js` `transition1` — desktop hover: notch widen + shoulder slide. */
export const NAV_DESKTOP_SPRING: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.9,
  delay: 0,
};

/** `O89z7Q561.js` `transition2` — the four PHONE variants override the whole subtree. */
export const NAV_MOBILE_SPRING: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.7,
  delay: 0,
};

/** `LgoUnShL6.js` `transition1` — NavItem outer `<a>`, and inner text when `In`/`Out`. */
export const NAV_ITEM_SPRING: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.6,
  delay: 0,
};

/**
 * `LgoUnShL6.js` `transition2` — inner text only, and only while the BASE variant is
 * `In Delayed`. Note this covers the hover override too (the gesture variant is
 * `bST8cHccV-hover`, whose base is still `bST8cHccV`), so a desktop nav-link hover
 * genuinely carries the 0.1s delay.
 */
export const NAV_ITEM_SPRING_DELAYED: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.6,
  delay: 0.1,
};

/** `pQVYkCmqe.js` `transition1` — stiffness/damping form, ratio ≈1.34, NO overshoot. */
export const HAMBURGER_SPRING: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 60,
  mass: 1,
  delay: 0,
};

/** Used when `prefers-reduced-motion: reduce` and the policy is `"settle"`. */
const INSTANT: Transition = { type: "tween", duration: 0, delay: 0 };

/* -------------------------------------------------------------------------- */
/* Geometry — all MEASURED                                                     */
/* -------------------------------------------------------------------------- */

/**
 * `.framer-jyjdtl` ("Mid"): the ONE property the desktop hover animates. Framer's open
 * width was 340 for four links; Services, Industries, AI Workforce and Our Products (added
 * post-migration) widen the revealed row to eight, and the full wordmark logo is wider,
 * so the notch opens to 900 to keep the same margin around them.
 * The inline animated width overrides the `framer-v-1pw3m48` rule's 340px.
 */
export const NOTCH_MID_WIDTH = { closed: 48, open: 900 } as const;

/**
 * Hamburger bar travel, in a 31×31 box.
 *   line3 ("top"):    closed `top: 6px`  → open `calc(51.6129% - 1px)` = 15px  → y +9
 *   line 1 ("bottom"):closed `bottom:5px` (top 24px) → 15px                   → y −9
 */
export const HAMBURGER_BAR_Y = { top: 9, bottom: -9 } as const;

/** Notch shoulder paths, verbatim from `O89z7Q561.js`. viewBox `0 0 87 34` for both. */
export const NOTCH_SHOULDER_PATHS = {
  left: "M 0 0 C 45.98 0 37 34 87 34 L 87 0 Z",
  right: "M 87 0 C 41.02 0 50 34 0 34 L 0 0 Z",
} as const;

/* -------------------------------------------------------------------------- */
/* Variant classes — MEASURED (`variantClassNames` in each module)             */
/* -------------------------------------------------------------------------- */

export const NAV_VARIANT_CLASS_NAMES = {
  /** `cItRVYDx5` — desktop rest, the SSR default. */
  desktopClosed: "framer-v-14epcrf",
  /** `r2iTM7ovC` — desktop hover. Framer's own typo: "Dekstop Open". */
  desktopOpen: "framer-v-1pw3m48",
  /** `NqQ1Gw4IZ` — phone/tablet rest. */
  phoneClosed: "framer-v-16hxzu9",
  /** `rAGTaXZPi` — phone/tablet menu open. */
  phoneOpen: "framer-v-8j8qfo",
} as const;

export const NAV_VARIANT_NAMES = {
  desktopClosed: "Desktop Closed",
  desktopOpen: "Dekstop Open",
  phoneClosed: "Phone Closed",
  phoneOpen: "Phone Open",
} as const;

export const NAV_ITEM_VARIANT_CLASS_NAMES = {
  /** `nuPhnXy2I` — never selected by this navbar, kept for completeness. */
  In: "framer-v-zo2ti",
  /** `B5C2W3pe2` — the SSR'd desktop + phone-closed state. */
  Out: "framer-v-1fbmjci",
  /** `bST8cHccV` — desktop hover AND phone menu open. */
  "In Delayed": "framer-v-107d226",
} as const;

export type NavItemVariant = keyof typeof NAV_ITEM_VARIANT_CLASS_NAMES;

export const HAMBURGER_VARIANT_CLASS_NAMES = {
  /** `Erm_bKtP3` */
  closed: "framer-v-1ozrrcy",
  /** `XFBSR4qxH` */
  open: "framer-v-1f7ec13",
} as const;

/* -------------------------------------------------------------------------- */
/* NavItem motion states — MEASURED (`LgoUnShL6.js` style + variants)          */
/* -------------------------------------------------------------------------- */

/**
 * Base `style` is `{ filter:"none", WebkitFilter:"none", opacity:.8, scale:1 }` and the
 * variants override from there. `filter:"none"` is written as `blur(0px)` because motion
 * cannot interpolate to the `none` keyword and would hard-cut.
 */
export const NAV_ITEM_STATES = {
  /** `nuPhnXy2I` — resting visible link, 80% opaque. */
  in: { filter: "blur(0px)", WebkitFilter: "blur(0px)", opacity: 0.8, scale: 1 },
  /** `bST8cHccV` — identical target; only the transition's 0.1s delay differs. */
  inDelayed: {
    filter: "blur(0px)",
    WebkitFilter: "blur(0px)",
    opacity: 0.8,
    scale: 1,
  },
  /** `B5C2W3pe2` — the invisible rest state. */
  out: { filter: "blur(4px)", WebkitFilter: "blur(4px)", opacity: 0, scale: 1.1 },
  /** `nuPhnXy2I-hover` / `bST8cHccV-hover` — the entire nav-link hover: 0.8 → 1. */
  hover: {
    filter: "blur(0px)",
    WebkitFilter: "blur(0px)",
    opacity: 1,
    scale: 1,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Links                                                                       */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  /** Framer's `webPageId`, kept so the mapping to a Next route is auditable. Routes added
   *  after the migration have none and use their slug. */
  readonly webPageId: string;
  readonly label: string;
  readonly href: string;
  /** The per-instance Framer container class; it carries the mobile `order`. */
  readonly containerClassName: string;
}

/**
 * DOM order is Home, About, Services, **Logo + Menu Icon**, Industries, Blog, Contact. On
 * mobile the CSS `order` property re-stacks them with the logo row first — do not
 * reorder here.
 *
 * Services, Industries and Our Products were added after the migration and have no Framer
 * container class. Each borrows its neighbour's (About's, Blog's, Blog's): the rules are identical apart
 * from the phone `order`, and on an `order` tie flexbox falls back to DOM order, so the
 * phone menu reads Home, About, Services, Industries, Our Products, Blog, Contact with no
 * new CSS. Our Products opens its menu on click rather than following its href.
 */
export const NAV_LINKS: readonly NavLink[] = [
  {
    webPageId: "augiA20Il",
    label: "Home",
    href: "/",
    containerClassName: "framer-kbmi72-container",
  },
  {
    webPageId: "lab5WFjmU",
    label: "Company",
    href: "/about",
    containerClassName: "framer-mez1yj-container",
  },
  {
    webPageId: "services",
    label: "Services",
    href: "/services",
    containerClassName: "framer-mez1yj-container",
  },
  {
    webPageId: "industries",
    label: "Industries",
    href: "/industries",
    containerClassName: "framer-d3zajn-container",
  },
  {
    webPageId: "ai-workforce",
    label: "AI Workforce",
    href: "/ai-workforce",
    containerClassName: "framer-d3zajn-container",
  },
  {
    webPageId: "xksG1qwfk",
    label: "Insights",
    href: "/insights",
    containerClassName: "framer-d3zajn-container",
  },
  {
    webPageId: "czQha9DIH",
    label: "Contact",
    href: "/contact",
    containerClassName: "framer-1yhtuvl-container",
  },
] as const;

/** Index into `NAV_LINKS` of the links rendered BEFORE the logo row (four before, three after). */
const LINKS_BEFORE_LOGO = 4;

/* -------------------------------------------------------------------------- */
/* Breakpoint wrappers — the shared LAYOUT triple, not the per-page one        */
/* -------------------------------------------------------------------------- */

/** `ssr-variant hidden-mvvops hidden-1j9zbg5` — desktop-only wrapper. */
export const NAV_DESKTOP_WRAPPER_CLASS = [
  "ssr-variant",
  hiddenClassName("layout", "tablet"),
  hiddenClassName("layout", "phone"),
].join(" ");

/** `ssr-variant hidden-28a2o6` — tablet + phone wrapper. */
export const NAV_PHONE_WRAPPER_CLASS = [
  "ssr-variant",
  hiddenClassName("layout", "desktop"),
].join(" ");

/* -------------------------------------------------------------------------- */
/* Motion components                                                           */
/* -------------------------------------------------------------------------- */

/**
 * `next/link` forwards its ref to the underlying `<a>`, so motion can measure and
 * transform it. This keeps client-side routing without adding a DOM node.
 */
const MotionNextLink = motion.create(NextLink);

/* -------------------------------------------------------------------------- */
/* Notch shoulder                                                              */
/* -------------------------------------------------------------------------- */

function NotchShoulder({
  className,
  d,
}: {
  className: string;
  d: string;
}): React.ReactElement {
  return (
    <div
      data-framer-component-type="SVG"
      data-framer-name="SVG"
      className={className}
      aria-hidden="true"
      style={{ imageRendering: "pixelated", flexShrink: 0 }}
    >
      <div
        className="svgContainer"
        style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 87 34"
          style={{ width: "100%", height: "100%" }}
        >
          <path d={d} fill={NAV_BLACK_TOKEN} />
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* NavItem                                                                     */
/* -------------------------------------------------------------------------- */

/** `transformTemplate1` in `LgoUnShL6.js`; applied ONLY by the `Out` variant. */
const outTransformTemplate = (_: unknown, generated: string): string =>
  `translateX(-50%) ${generated}`;

export interface NavItemProps {
  label: string;
  href: string;
  variant: NavItemVariant;
  /**
   * `v8vPIIBUk` — bound by the parent in the two phone-OPEN variants (closes the menu),
   * and always bound to the scroll-to-top handler. Typed with the event rather than as a
   * bare thunk because a same-route click has to be cancelled, not followed.
   */
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  transition: Transition;
  /** Transition for the inner text; `In Delayed` gets the +0.1s one. */
  textTransition: Transition;
  /** Disable motion's layout engine (reduced motion / `disabled`). */
  animate: boolean;
  /**
   * Set on the phone menu's Services / Industries rows, which expand a sub-list instead of
   * navigating: adds `aria-expanded` and a "+"/"−" marker after the label.
   */
  expanded?: boolean;
}

/**
 * One nav link. Renders EXACTLY Framer's two nodes: the `<a>` and the RichText `<div>`
 * holding a single `<p>` — no wrapper.
 *
 * The hover lives on the INNER text in Framer, but is TRIGGERED by the outer `<a>`, so it
 * is wired here with motion's variant propagation (`whileHover="hover"` on the anchor,
 * matching `variants` on the child) — the exact equivalent of Framer's gesture variants.
 */
export function NavItem({
  label,
  href,
  variant,
  onNavigate,
  transition,
  textTransition,
  animate,
  expanded,
}: NavItemProps): React.ReactElement {
  const isOut = variant === "Out";
  const stateKey = isOut ? "out" : variant === "In" ? "in" : "inDelayed";

  return (
    <MotionNextLink
      href={href}
      className={`framer-TLfWE framer-TPaq9 framer-zo2ti ${NAV_ITEM_VARIANT_CLASS_NAMES[variant]} framer-1mtnv4g`}
      data-framer-name={variant}
      data-highlight="true"
      data-nav-item-variant={variant}
      tabIndex={0}
      layout={animate ? true : false}
      layoutDependency={variant}
      initial={false}
      animate={stateKey}
      whileHover={isOut ? undefined : "hover"}
      transition={transition}
      onClick={onNavigate}
      aria-expanded={expanded}
      style={{ height: "100%" }}
    >
      <motion.div
        className="framer-zk0tzl"
        data-framer-component-type="RichTextContainer"
        layout={animate ? true : false}
        layoutDependency={variant}
        variants={NAV_ITEM_STATES}
        transition={textTransition}
        transformTemplate={isOut ? outTransformTemplate : undefined}
        style={{
          "--framer-link-text-color": "rgb(0, 153, 255)",
          "--framer-link-text-decoration": "underline",
        } as React.CSSProperties}
      >
        <p
          className="framer-text framer-styles-preset-141u1yr"
          data-styles-preset="pAzayDUZg"
        >
          {label}
          {expanded === undefined ? null : (
            <span aria-hidden="true" style={{ marginLeft: 6, display: "inline-block", width: "0.7em" }}>
              {expanded ? "−" : "+"}
            </span>
          )}
        </p>
      </motion.div>
    </MotionNextLink>
  );
}

/* -------------------------------------------------------------------------- */
/* Hamburger                                                                   */
/* -------------------------------------------------------------------------- */

export interface HamburgerProps {
  open: boolean;
  onToggle: () => void;
  transition: Transition;
}

/**
 * `pQVYkCmqe.js` — "Navigation/hamburger".
 *
 * `line2` is UNMOUNTED when open (Framer wraps it in `isDisplayed() && …`), not faded:
 * fading would leave it occupying its slot through the morph. Conditional render is the
 * exact match.
 */
export function Hamburger({
  open,
  onToggle,
  transition,
}: HamburgerProps): React.ReactElement {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      onToggle();
    },
    [onToggle],
  );

  return (
    <div
      className={`framer-P5MjK framer-1ozrrcy ${
        open
          ? HAMBURGER_VARIANT_CLASS_NAMES.open
          : HAMBURGER_VARIANT_CLASS_NAMES.closed
      }`}
      data-framer-name={open ? "open" : "closed"}
      data-highlight="true"
      data-hamburger-open={open ? "true" : "false"}
      role="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      tabIndex={0}
      onPointerUp={onToggle}
      onKeyDown={handleKeyDown}
      style={{ height: "100%", width: "100%" }}
    >
      {/* line3 — the TOP bar. Slides to centre and rotates +45°. */}
      <motion.div
        className="framer-bpkmqc"
        data-framer-name="line3"
        initial={false}
        animate={{ y: open ? HAMBURGER_BAR_Y.top : 0, rotate: open ? 45 : 0 }}
        transition={transition}
        style={{ backgroundColor: "rgb(255, 255, 255)", top: 6 }}
      />
      {/* line2 — the MIDDLE bar. Removed from the tree when open. */}
      {!open && (
        <div
          className="framer-1hypfvb"
          data-framer-name="line2"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        />
      )}
      {/* line 1 — Framer's name really does contain a space. The BOTTOM bar: −45°. */}
      <motion.div
        className="framer-l1dd45"
        data-framer-name="line 1"
        initial={false}
        animate={{ y: open ? HAMBURGER_BAR_Y.bottom : 0, rotate: open ? -45 : 0 }}
        transition={transition}
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          top: "auto",
          bottom: 5,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Logo                                                                        */
/* -------------------------------------------------------------------------- */

interface NavLogoProps {
  /** Stamps `data-framer-page-link-current` exactly as Framer does on `/`. */
  current: boolean;
  /** `onTap: v8vPIIBUk7mg0l7` — closes the menu in `Phone Open`, plus scroll-to-top. */
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  animate: boolean;
  transition: Transition;
}

function NavLogo({
  current,
  onNavigate,
  animate,
  transition,
}: NavLogoProps): React.ReactElement {
  return (
    <MotionNextLink
      href="/"
      className="framer-xb6sci framer-1sw0wfd"
      data-framer-name="Logo"
      {...(current ? { "data-framer-page-link-current": "true" } : null)}
      aria-current={current ? "page" : undefined}
      aria-label="Cloudex Technologies — home"
      layout={animate ? true : false}
      transition={transition}
      onClick={onNavigate}
    >
      <motion.div
        className="framer-l9m08r"
        data-framer-name="Cloudex Technologies icon"
        layout={animate ? true : false}
        transition={transition}
      >
        <div
          style={{
            position: "absolute",
            borderRadius: "inherit",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          data-framer-background-image-wrapper="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Framer's exact <img>;
              next/image would inject a wrapper and rewrite the URL. */}
          <img
            decoding="auto"
            width={1024}
            height={198}
            sizes="134px"
            srcSet={NAV_LOGO_SRCSET}
            src={NAV_LOGO_SRC}
            alt="Cloudex Technologies"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              objectPosition: "center",
              objectFit: "contain",
            }}
          />
        </div>
      </motion.div>
    </MotionNextLink>
  );
}

/* -------------------------------------------------------------------------- */
/* SiteNavbar                                                                  */
/* -------------------------------------------------------------------------- */

export interface SiteNavbarProps {
  /**
   * Route used for the logo's current-page marker. Defaults to `usePathname()`; pass it
   * explicitly only in harnesses that render outside the router.
   */
  pathname?: string;
  /** Controlled override of the desktop hover state (tests / screenshots). */
  desktopOpen?: boolean;
  /** Controlled override of the phone menu state. */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** `"settle"` (default) renders the end state instantly under reduced motion. */
  reducedMotion?: ReducedMotionPolicy;
  /** Render statically: no hover reveal, no menu animation. */
  disabled?: boolean;
}

export function SiteNavbar({
  pathname,
  desktopOpen,
  mobileOpen,
  onMobileOpenChange,
  reducedMotion = DEFAULT_REDUCED_MOTION_POLICY,
  disabled = false,
}: SiteNavbarProps): React.ReactElement {
  const routerPathname = usePathname();
  const activePath = pathname ?? routerPathname ?? "/";
  const isHome = activePath === "/";

  const prefersReducedMotion = useReducedMotion();
  const settle =
    disabled || (prefersReducedMotion === true && reducedMotion === "settle");
  const animate = !settle;

  const desktopSpring = animate ? NAV_DESKTOP_SPRING : INSTANT;
  const mobileSpring = animate ? NAV_MOBILE_SPRING : INSTANT;
  const itemSpring = animate ? NAV_ITEM_SPRING : INSTANT;
  const itemSpringDelayed = animate ? NAV_ITEM_SPRING_DELAYED : INSTANT;
  const hamburgerSpring = animate ? HAMBURGER_SPRING : INSTANT;

  /* -- desktop bar --------------------------------------------------------- */
  /* Pinned open: the links and widened notch always show instead of revealing on hover. */
  const isDesktopOpen = desktopOpen ?? true;

  /* -- phone menu ---------------------------------------------------------- */
  const [menuOpenState, setMenuOpenState] = React.useState(false);
  const isMenuOpen = mobileOpen ?? menuOpenState;

  const setMenuOpen = React.useCallback(
    (next: boolean) => {
      if (mobileOpen === undefined) setMenuOpenState(next);
      onMobileOpenChange?.(next);
    },
    [mobileOpen, onMobileOpenChange],
  );

  const toggleMenu = React.useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen, setMenuOpen]);

  const closeMenu = React.useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  /* -- Services / Industries menus (post-migration, see ./NavMenus) ---------- */
  /** Desktop: which mega panel is showing. Only meaningful while the bar is open. */
  const [desktopMenu, setDesktopMenu] = React.useState<NavMenuKey | null>(null);
  /** Phone: which sub-list is expanded in the open menu. */
  const [phoneMenu, setPhoneMenu] = React.useState<NavMenuKey | null>(null);
  React.useEffect(() => {
    if (!isMenuOpen) setPhoneMenu(null);
  }, [isMenuOpen]);

  const closeDesktopMenus = React.useCallback(() => {
    setDesktopMenu(null);
  }, []);

  /* -- scroll to top on navigation ----------------------------------------- */
  /**
   * A navbar click must land at the TOP of the destination page. Two separate gaps:
   *
   *   1. SAME-ROUTE clicks — tapping "Home" while already on `/`, or the logo from any
   *      page you are scrolled down on — are a no-op in the App Router. There is no
   *      navigation, so nothing scrolls and the click appears dead. Cancelled here and
   *      scrolled by hand instead.
   *   2. CROSS-ROUTE clicks do navigate, and Next scrolls for them, but the browser's own
   *      scroll restoration can win that race on a history entry it has already seen,
   *      leaving you mid-page. `pendingTopRef` re-asserts the top once the new pathname
   *      commits, which is strictly after the router's own attempt.
   *
   * Only nav clicks arm the ref, so ordinary in-page links, back/forward and deep links
   * into a section keep their native scroll behaviour untouched.
   */
  const pendingTopRef = React.useRef(false);

  React.useEffect(() => {
    if (!pendingTopRef.current) return;
    pendingTopRef.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activePath]);

  const handleNavClick = React.useCallback(
    (href: string) =>
      (event: React.MouseEvent<HTMLAnchorElement>): void => {
        /* Leave modified clicks (open-in-new-tab, middle click) entirely alone. */
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        if (href === activePath) {
          event.preventDefault();
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: settle ? "auto" : "smooth",
          });
          return;
        }

        pendingTopRef.current = true;
      },
    [activePath, settle],
  );

  /* -- variants ------------------------------------------------------------ */
  const desktopItemVariant: NavItemVariant = isDesktopOpen ? "In Delayed" : "Out";
  const phoneItemVariant: NavItemVariant = isMenuOpen ? "In Delayed" : "Out";

  const renderNavItem = (
    link: NavLink,
    variant: NavItemVariant,
    scope: "desktop" | "phone",
  ): React.ReactNode => {
    const menuKey = menuKeyForHref(link.href);
    const item = (
      <motion.div
        key={`${scope}-${link.href}`}
        className={link.containerClassName}
        layout={animate ? true : false}
        layoutDependency={variant}
        transition={scope === "desktop" ? desktopSpring : mobileSpring}
        /* Desktop: pointing at a link opens its mega panel, or closes the other one. */
        {...(scope === "desktop"
          ? {
              onMouseEnter: () => setDesktopMenu(menuKey ?? null),
              onFocus: () => setDesktopMenu(menuKey ?? null),
            }
          : null)}
      >
        <NavItem
          label={link.label}
          href={link.href}
          variant={variant}
          expanded={scope === "phone" && menuKey ? phoneMenu === menuKey : undefined}
          /* Scroll-to-top always; `v8vPIIBUk` (close the menu) only in the phone-open
             variants, exactly as Framer binds it. On the phone, Services / Industries
             toggle their sub-list instead of navigating. */
          onNavigate={(event) => {
            if (scope === "phone" && menuKey) {
              event.preventDefault();
              setPhoneMenu((current) => (current === menuKey ? null : menuKey));
              return;
            }
            handleNavClick(link.href)(event);
            if (scope === "phone" && isMenuOpen) closeMenu();
            if (scope === "desktop") closeDesktopMenus();
          }}
          transition={itemSpring}
          textTransition={
            variant === "In Delayed" ? itemSpringDelayed : itemSpring
          }
          animate={animate}
        />
      </motion.div>
    );

    if (scope !== "phone" || !menuKey) return item;
    return (
      <React.Fragment key={`${scope}-${link.href}`}>
        {item}
        <AnimatePresence initial={false}>
          {isMenuOpen && phoneMenu === menuKey ? (
            <NavSubList
              key={`sub-${menuKey}`}
              menuKey={menuKey}
              /* The parent container's phone `order` (About's = 2, Blog's = 3). */
              order={menuKey === "services" ? 2 : 3}
              onNavigate={(href) => (event) => {
                handleNavClick(href)(event);
                closeMenu();
              }}
              transition={mobileSpring}
            />
          ) : null}
        </AnimatePresence>
      </React.Fragment>
    );
  };

  return (
    <>
      {/* ── Desktop (≥1200px) ─────────────────────────────────────────────── */}
      <div className={NAV_DESKTOP_WRAPPER_CLASS}>
        {/* The hover handlers sit on the container rather than the <nav> so the mega panel,
            which must render outside the 58px `overflow:hidden` bar, still counts as
            inside. The container is exactly the bar's box otherwise. */}
        <div
          className="framer-kvjt16-container"
          onMouseLeave={closeDesktopMenus}
        >
          <motion.nav
            className={`framer-oazrc framer-14epcrf ${
              isDesktopOpen
                ? NAV_VARIANT_CLASS_NAMES.desktopOpen
                : NAV_VARIANT_CLASS_NAMES.desktopClosed
            }`}
            data-framer-name={
              isDesktopOpen
                ? NAV_VARIANT_NAMES.desktopOpen
                : NAV_VARIANT_NAMES.desktopClosed
            }
            data-highlight="true"
            data-nav-open={isDesktopOpen ? "true" : "false"}
            /* Framer puts `onMouseEnter` on the <nav>, so the WHOLE bar is the hit area —
               including the empty space beside the links. MEASURED. The container above
               now carries it (same box), so the mega panel is part of the hit area too. */
            transition={desktopSpring}
            style={{
              backgroundColor: NAV_TRANSPARENT,
              width: "100%",
              /* Light theme: the bar and its notch cast a soft shadow, so the notched shape
                 reads over the hero card and over content once scrolled. A filter (not a
                 box-shadow) so it follows the notch's curves; drawn outside the nav's own
                 58px clip. */
              filter: "var(--ct-bar-shadow, none)",
            }}
          >
            <div className="framer-mds9fs" data-framer-name="Content">
              {NAV_LINKS.slice(0, LINKS_BEFORE_LOGO).map((link) =>
                renderNavItem(link, desktopItemVariant, "desktop"),
              )}

              <div className="framer-19opgm7" data-framer-name="Logo + Menu Icon">
                <NavLogo
                  current={isHome}
                  onNavigate={handleNavClick("/")}
                  animate={animate}
                  transition={desktopSpring}
                />
                {/* No hamburger here: `isDisplayed()` is false in both desktop variants. */}
              </div>

              {NAV_LINKS.slice(LINKS_BEFORE_LOGO).map((link) =>
                renderNavItem(link, desktopItemVariant, "desktop"),
              )}
            </div>

            {/* "Base" renders ONLY in the desktop variants — it is the notch ornament. */}
            <div className="framer-looqt4" data-framer-name="Base">
              <div
                className="framer-9jeimb"
                data-framer-name="Top"
                style={{ backgroundColor: NAV_BLACK_TOKEN }}
              />
              <div className="framer-1cjf4h0" data-framer-name="Notch">
                <motion.div
                  className="framer-asjn4q"
                  data-framer-name="Left"
                  layout={animate ? "position" : false}
                  layoutDependency={isDesktopOpen}
                  transition={desktopSpring}
                  style={{ boxShadow: `0px -2px 0px 0px ${NAV_BLACK_TOKEN}` }}
                >
                  <NotchShoulder
                    className="framer-1ubnhzz"
                    d={NOTCH_SHOULDER_PATHS.left}
                  />
                </motion.div>

                {/* The ONE property the desktop hover animates. */}
                <motion.div
                  className="framer-jyjdtl"
                  data-framer-name="Mid"
                  initial={false}
                  animate={{
                    width: isDesktopOpen
                      ? NOTCH_MID_WIDTH.open
                      : NOTCH_MID_WIDTH.closed,
                  }}
                  transition={desktopSpring}
                  style={{
                    backgroundColor: NAV_BLACK_TOKEN,
                    /* Three 2px spread-less shadows that bleed the Mid block left,
                       right and up so it meets the shoulders with no seam. Framer
                       hardcodes them as `rgb(5, 5, 5)`, which was invisible only
                       because the whole navbar sat on near-black. On the cobalt theme
                       that literal painted two visible black bars either side of the
                       notch, so it now follows the notch's own colour token — same
                       seam-covering job, nothing to see. */
                    boxShadow: [
                      `-2px 0px 0px 0px ${NAV_BLACK_TOKEN}`,
                      `2px 0px 0px 0px ${NAV_BLACK_TOKEN}`,
                      `0px -2px 0px 0px ${NAV_BLACK_TOKEN}`,
                    ].join(", "),
                  }}
                />

                <motion.div
                  className="framer-1tm5xdj"
                  data-framer-name="Right"
                  layout={animate ? "position" : false}
                  layoutDependency={isDesktopOpen}
                  transition={desktopSpring}
                  style={{ boxShadow: `0px -2px 0px 0px ${NAV_BLACK_TOKEN}` }}
                >
                  <NotchShoulder
                    className="framer-af5by6"
                    d={NOTCH_SHOULDER_PATHS.right}
                  />
                </motion.div>
              </div>
            </div>
          </motion.nav>

          <NavMegaPanel
            open={isDesktopOpen ? desktopMenu : null}
            onNavigate={closeDesktopMenus}
            transition={itemSpring}
          />
        </div>
      </div>

      {/* ── Tablet + phone (≤1199.98px) ───────────────────────────────────── */}
      <div className={NAV_PHONE_WRAPPER_CLASS}>
        <div className="framer-kvjt16-container">
          <motion.nav
            className={`framer-oazrc framer-14epcrf ${
              isMenuOpen
                ? NAV_VARIANT_CLASS_NAMES.phoneOpen
                : NAV_VARIANT_CLASS_NAMES.phoneClosed
            }`}
            data-framer-name={
              isMenuOpen
                ? NAV_VARIANT_NAMES.phoneOpen
                : NAV_VARIANT_NAMES.phoneClosed
            }
            data-nav-open={isMenuOpen ? "true" : "false"}
            layout={animate ? true : false}
            layoutDependency={isMenuOpen}
            initial={false}
            /* Opening the menu fades the bar transparent → solid black. MEASURED. */
            animate={{
              backgroundColor: isMenuOpen ? NAV_BLACK_TOKEN : NAV_TRANSPARENT,
            }}
            transition={mobileSpring}
            style={{ width: "100%" }}
          >
            <motion.div
              className="framer-mds9fs"
              data-framer-name="Content"
              layout={animate ? true : false}
              layoutDependency={isMenuOpen}
              transition={mobileSpring}
            >
              {NAV_LINKS.slice(0, LINKS_BEFORE_LOGO).map((link) =>
                renderNavItem(link, phoneItemVariant, "phone"),
              )}

              <motion.div
                className="framer-19opgm7"
                data-framer-name="Logo + Menu Icon"
                layout={animate ? true : false}
                layoutDependency={isMenuOpen}
                transition={mobileSpring}
              >
                <NavLogo
                  current={isHome}
                  onNavigate={(event) => {
                    handleNavClick("/")(event);
                    if (isMenuOpen) closeMenu();
                  }}
                  animate={animate}
                  transition={mobileSpring}
                />
                <div className="framer-1ccfzfu-container">
                  <Hamburger
                    open={isMenuOpen}
                    onToggle={toggleMenu}
                    transition={hamburgerSpring}
                  />
                </div>
              </motion.div>

              {NAV_LINKS.slice(LINKS_BEFORE_LOGO).map((link) =>
                renderNavItem(link, phoneItemVariant, "phone"),
              )}
            </motion.div>
            {/* No "Base": `isDisplayed1()` is false in all four phone variants. */}
          </motion.nav>
        </div>
      </div>
    </>
  );
}

export default SiteNavbar;
