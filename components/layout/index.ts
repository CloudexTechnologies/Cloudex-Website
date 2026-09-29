/**
 * components/layout — the shared site chrome (PLAN.md §2).
 *
 * `CursorHost` is deliberately absent: `_source/behaviours/cursor-host.md` proves
 * `framer-lib-cursors-host` is inert (the route calls `useCustomCursors({})` and the node is
 * only a CSS-scope manifest). Since the CSS is imported statically from `app/framer/*.css`,
 * there is nothing for it to anchor. Do not add it back.
 *
 * `SiteNavbar` is another agent's file; only its component + props type are re-exported here,
 * at the bottom. Extend that block rather than replacing this one.
 *
 * No `default` export: this barrel fronts several components, so importing one by name keeps
 * the two layout agents from fighting over the default slot.
 */

/* --- SiteFooter (shared by all 5 routes) --- */
export {
  SiteFooter,
  NewsletterForm,
  isValidNewsletterEmail,
  FOOTER_SERIALIZATION_HASH,
  FOOTER_VARIANT_CLASS_NAMES,
  FOOTER_BASE_CLASS,
  FOOTER_CONTAINER_CLASS,
  FOOTER_REVEAL_TRANSITION,
  FOOTER_REVEAL_ENTER,
  FOOTER_VARIANT_TRANSITION,
  FOOTER_LOGO,
  FOOTER_TAGLINE,
  FOOTER_PAGE_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_PRIVACY_LINK,
  NEWSLETTER_LIVE_ENDPOINT,
  NEWSLETTER_LIVE_API_KEY,
  NEWSLETTER_NOOP_LATENCY_MS,
  NEWSLETTER_FORM_VARIANTS,
  NEWSLETTER_SPINNER_TRANSITION,
  NEWSLETTER_STYLE,
} from "./SiteFooter";

export type {
  SiteFooterProps,
  NewsletterFormProps,
  NewsletterSubmitHandler,
  FooterVariantName,
} from "./SiteFooter";

/* --- SiteNavbar (shared by all 5 routes) --- */
export {
  SiteNavbar,
  NavItem,
  Hamburger,
  NAV_LINKS,
  NAV_BLACK_TOKEN,
  NAV_TRANSPARENT,
  NAV_LOGO_SRC,
  NAV_DESKTOP_SPRING,
  NAV_MOBILE_SPRING,
  NAV_ITEM_SPRING,
  NAV_ITEM_SPRING_DELAYED,
  HAMBURGER_SPRING,
  NOTCH_MID_WIDTH,
  NOTCH_SHOULDER_PATHS,
  HAMBURGER_BAR_Y,
  NAV_VARIANT_CLASS_NAMES,
  NAV_VARIANT_NAMES,
  NAV_ITEM_VARIANT_CLASS_NAMES,
  NAV_ITEM_STATES,
  HAMBURGER_VARIANT_CLASS_NAMES,
  NAV_DESKTOP_WRAPPER_CLASS,
  NAV_PHONE_WRAPPER_CLASS,
} from "./SiteNavbar";

export type {
  SiteNavbarProps,
  NavItemProps,
  NavItemVariant,
  NavLink,
  HamburgerProps,
} from "./SiteNavbar";
