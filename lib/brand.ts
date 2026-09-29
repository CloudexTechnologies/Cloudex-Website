/**
 * Shared brand assets.
 *
 * The CT mark lives here rather than in `SiteNavbar.tsx` because that module is
 * `"use client"`: anything exported from it is a client reference, so a Server
 * Component (BenefitsSection) cannot read the string at render time. A plain module
 * keeps one source of truth that both sides can import.
 */

/** The CT mark in the brand blue (#05f) on transparency, 512×512, for the light theme
 *  (recoloured from the white Framer original `kcSrs0OehwB3wYHTtV8STEEIOw.0162c903.png`). Resolved through
 *  `_source/asset-map.json`. Used by the Benefits centre pillar. */
export const BRAND_MARK_SRC = "/assets/images/brand/cloudex-mark.png";

/** The full Cloudex Technologies wordmark on transparency (1024×198), trimmed from
 *  `~/Downloads/cloudex-logo.png`. Used by the navbar, footer and CTA band. */
export const BRAND_LOGO_SRC = "/assets/images/brand/cloudex-logo-1024.webp";
export const BRAND_LOGO_SRCSET =
  "/assets/images/brand/cloudex-logo-256.webp 256w,/assets/images/brand/cloudex-logo-512.webp 512w,/assets/images/brand/cloudex-logo-1024.webp 1024w";
