import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import { ContactHero } from "@/components/contact/ContactHero";

/**
 * `/contact` — the whole route.
 *
 * Source: `_source/live/contact.html`. The page root is
 *
 *   <div data-framer-root class="framer-dq4EH framer-HFo8d framer-lJNWY framer-1frsxba"
 *        style="min-height:100vh;width:auto;display:contents">
 *
 * and it is load-bearing, not decoration:
 *   • `framer-dq4EH` is the page's serialization hash — EVERY layout rule for this route
 *     in `app/framer/layout.css` is written `.framer-dq4EH .framer-8l81tn { … }`, so
 *     dropping it strips the hero of its padding, gradient, grid and radii.
 *   • `framer-HFo8d` and `framer-lJNWY` scope the shared text-style presets
 *     (`framer-styles-preset-d8f6ar` = the `<h1>`, `framer-styles-preset-529u5a` = the
 *     form labels). Without them the type falls back to the browser default.
 *   • `framer-1frsxba` is this page's DESKTOP breakpoint hash (PLAN.md §1.1:
 *     contact = 1frsxba / xt0inb / tlxb3v) and carries the root flex box.
 *   • `display: contents` is inline in the SSR and overrides that root box's
 *     `width: 1200px; height: 1080px`, letting the section size itself. It must stay.
 *
 * Only the page's OWN markup is rendered here. `app/layout.tsx` (orchestrator-owned)
 * already supplies `<html><body><div id="main">`, the
 * `.framer-dUOq6.framer-28a2o6[data-layout-template]` wrapper, `SiteNavbar`, the
 * `.framer-1a909du` spacer and `SiteFooter`.
 *
 * Two siblings from the SSR are reproduced verbatim after the section:
 *   • `div.framer-1rwbfyi-container` — Framer's `SmoothScroll_Prod` mount point. It SSRs
 *     EMPTY (`<div class="framer-1rwbfyi-container"><div></div></div>`); the behaviour is
 *     Lenis 1.1.2 `{ duration: 1 }` attached to the window, per
 *     `_source/behaviours/smooth-scroll.md`. Wiring Lenis is a site-wide concern (it is on
 *     every route), not a `/contact` one, and no primitive for it exists yet — see the
 *     report. The container is kept so the DOM matches and so the eventual mount has a
 *     home.
 *   • `div#overlay` — Framer's per-page portal target, a sibling of the page root.
 *
 * The Framer badge (`#__framer-badge-container`, appear id `n0ccwk`) is dropped per
 * PLAN.md §1.3.
 *
 * No `metadata` override: `contact.html`'s `<title>`, description, og:* and twitter:* are
 * byte-identical to the ones `app/layout.tsx` already sets, so this page inherits them.
 * Only the canonical URL differs, and that points at the Framer preview domain
 * (`adaptable-octopus-801049.framer.app`), which must not ship.
 */
export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Book an AI Automation Consultation",
  description:
    "Talk to Cloudex Technologies about AI automation for your business. Email info@cloudextechnologies.io, call +44 7840 983410, or visit us in Wolverhampton, UK.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <div
        data-framer-root
        className="framer-dq4EH framer-HFo8d framer-lJNWY framer-1frsxba"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <ContactHero />
        <div className="framer-1rwbfyi-container">
          <div />
        </div>
      </div>
      <div id="overlay" />
    </>
  );
}
