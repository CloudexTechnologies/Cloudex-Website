/**
 * PrivacyPolicyBody — the whole `/legal-pages/privacy-policy` document
 * (PLAN.md §3, §6.7).
 *
 * Markup source: `_source/live/privacy-policy.html`, sliced at the offsets in
 * `_source/structure/privacy-policy.md` §03 and converted with
 * `node tools/html2jsx.mjs <slice> --asset-map _source/asset-map.json`.
 *
 * ── Why this shape ───────────────────────────────────────────────────────────
 * Privacy is the structurally odd page (PLAN.md §6.7): the SSR emits ONE
 * `<section data-framer-name="Hero">` (`.framer-o3tmg`, 155019–200960) that wraps
 * the entire legal document AND a NESTED `<section data-framer-name="CTA">`
 * (`.framer-1n2dqs2`, 159575–200944). The real nesting, verified by balancing the
 * tags around offset 200930 (`</div></section></div></section>`), is:
 *
 *   section.framer-o3tmg            [data-framer-name="Hero"]      155019–200960
 *     div.framer-18w4wh6            [data-framer-name="Container"]
 *       div.framer-1kmhw3           [data-framer-name="Content"]   155130–159575
 *       section.framer-1n2dqs2      [data-framer-name="CTA"]       159575–200944  ← CtaBand
 *
 * So the CTA band is a SIBLING of the legal copy inside `.framer-18w4wh6`, not a
 * sibling of the Hero section. `.framer-f2VXI .framer-18w4wh6` in
 * `app/framer/layout.css` is what supplies the shared `gap:40px`, the gradient and
 * the `padding:180px 17px 0` (→ `180px 40px 0` tablet, `180px 24px 0` phone), so
 * both children must live inside it.
 *
 * ── Fidelity notes ───────────────────────────────────────────────────────────
 * • **No breakpoint variants.** `privacy-policy.md` §03 records "single DOM copy
 *   serves all 3 breakpoints (CSS-only responsive)" — the only `.ssr-variant` /
 *   `hidden-*` machinery on this page is INSIDE the CTA band, and `CtaBand` owns
 *   it (it already knows the privacy hashes `1n5zt6w`/`b5zmah`/`1c7z8uo` through
 *   `hiddenClassName("privacy-policy", …)`). Nothing here is collapsed.
 * • **No appear animations and no §1.5 scroll placeholders in this subtree.** All
 *   three `will-change:transform;opacity:0;transform:translateY(50px)` nodes on
 *   this page (offsets 159728 / 173496 / 187264) are the CTA band's three
 *   breakpoint containers, which `CtaBand` wraps in `ScrollReveal` itself
 *   (`containerIsReveal: true`). The two RichTextContainers here SSR at
 *   `style="transform:none"` with NO `opacity:0`, so they are already visible and
 *   must NOT be wrapped — wrapping them would introduce motion the real site does
 *   not have.
 * • Copy is verbatim EXCEPT the contact block, per the user's explicit instruction
 *   (BRIEF.md "CONTENT OVERRIDES"): the leftover `hello@notchautomation.com`
 *   becomes `info@cloudextechnologies.io`, and the literal editorial placeholder
 *   `(replace if needed)` that trailed it is dropped.
 *   The original SSR also ships a BROKEN `href="mailto:"` with an empty address —
 *   the address existed only as link text, so clicking it composed to nobody.
 *   That is fixed here to a real `mailto:` target. The anchor keeps its bare
 *   `rel` attribute, which parses to `rel=""`, as in the source.
 * • The Framer badge (`n0ccwk` / `#__framer-badge-container`) is not part of this
 *   subtree and is not rendered (PLAN.md §1.3).
 *
 * Server Component — nothing here is interactive; `CtaBand` carries its own
 * `"use client"`.
 */

import type { CSSProperties, ReactElement } from "react";

import { CtaBand } from "@/components/shared/CtaBand";
import type { ReducedMotionPolicy } from "@/components/primitives";

/* -------------------------------------------------------------------------- */
/* Copy + class names (exported so tests / screenshot rigs can assert on them)  */
/* -------------------------------------------------------------------------- */

/** `<h1>` of the page, verbatim. */
export const PRIVACY_POLICY_TITLE = "Privacy policy";

/** The nine `<h2>` headings, in source order. */
export const PRIVACY_POLICY_HEADINGS = [
  "Overview",
  "Information",
  "Usage",
  "Cookies",
  "Security",
  "Services",
  "Rights",
  "Updates",
  "Contact",
] as const;

/** Contact address. Replaces the live site's leftover `hello@notchautomation.com`. */
export const PRIVACY_POLICY_CONTACT_EMAIL = "info@cloudextechnologies.io";

/** Framer class names of the three wrappers this component owns. */
export const PRIVACY_POLICY_CLASS_NAMES = {
  section: "framer-o3tmg",
  container: "framer-18w4wh6",
  content: "framer-1kmhw3",
} as const;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface PrivacyPolicyBodyProps {
  /** `id` for the `<section>`. The SSR has none, so this defaults to unset. */
  elementId?: string;
  /** Appended after the Framer `<section>` class. */
  className?: string;
  /** Forwarded to the nested {@link CtaBand}. Defaults to its own `"settle"`. */
  reducedMotion?: ReducedMotionPolicy;
  /**
   * Render the nested CTA band already revealed (screenshot rigs / tests).
   * Forwarded to `CtaBand`'s `disableReveal`.
   */
  disableReveal?: boolean;
}

export function PrivacyPolicyBody({
  elementId,
  className,
  reducedMotion,
  disableReveal,
}: PrivacyPolicyBodyProps = {}): ReactElement {
  return (
    <section
      className={
        className
          ? `${PRIVACY_POLICY_CLASS_NAMES.section} ${className}`
          : PRIVACY_POLICY_CLASS_NAMES.section
      }
      data-framer-name="Hero"
      id={elementId}
    >
      <div className="framer-18w4wh6" data-framer-name="Container">
        <div className="framer-1kmhw3" data-framer-name="Content">
          <div className="framer-1uctbv0" data-framer-name="Heading">
            <div
              className="framer-1wy136e"
              id="header"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <h1
                className="framer-text framer-styles-preset-d8f6ar"
                data-styles-preset="btOMgah8g"
                style={
                  {
                    "--framer-text-alignment": "left",
                    "--framer-text-color":
                      "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                  } as CSSProperties
                }
              >
                Privacy policy
              </h1>
            </div>
          </div>
          <div
            className="framer-ztw4we"
            data-framer-name="Content"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" } as CSSProperties}
          >
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Overview
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              {"At "}
              <strong className="framer-text">Cloudex Technologies</strong>
              , we value your privacy and take the protection of your personal
              information seriously. This Privacy Policy explains how we collect,
              use, and safeguard your data when you visit our website or interact
              with our services. By using our site, you agree to the practices
              described in this policy.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Information
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              We may collect basic personal information such as your name, email
              address, company name, and any details you voluntarily provide
              through contact forms, newsletter signups, or service inquiries. In
              addition, we may collect limited technical and usage data, such as
              browser type and pages visited, to help us understand how users
              interact with our website.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Usage
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              Your information is used to respond to your requests, provide our
              services, and communicate important updates. If you choose to
              subscribe, we may also send product news or insights related to
              automation. We never sell, rent, or trade your personal information
              to third parties for marketing purposes.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Cookies
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              We use cookies and similar technologies to improve website
              functionality, analyze usage, and enhance user experience. Cookies
              help us understand what works well on our site so we can continue to
              improve it. You can control or disable cookies at any time through
              your browser settings.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Security
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              We implement reasonable technical and organizational measures to
              protect your information from unauthorized access, misuse, or
              disclosure. While no digital platform can guarantee complete
              security, we continuously work to maintain strong safeguards and
              secure systems.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Services
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              We may rely on trusted third-party services for analytics, email
              communication, or form handling. These providers only access the
              information necessary to perform their services and are required to
              follow appropriate data protection and privacy standards.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Rights
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              You have the right to access, update, or request deletion of your
              personal data. You may also withdraw consent for communications at
              any time. To exercise these rights, simply contact us and we will
              respond as promptly as possible.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Updates
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. Any updates will be
              posted on this page with the revised information.
            </p>
            <h2 dir="auto" className="framer-text framer-styles-preset-1y86yxm">
              Contact
            </h2>
            <p dir="auto" className="framer-text framer-styles-preset-o3oioe">
              If you have any questions or concerns about this Privacy Policy or
              how your data is handled, please contact us at:
              <br className="framer-text" />
              <strong className="framer-text">Email:</strong>{" "}
              <a
                className="framer-text framer-styles-preset-1arsep9"
                href={`mailto:${PRIVACY_POLICY_CONTACT_EMAIL}`}
                rel=""
              >
                {PRIVACY_POLICY_CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
        <CtaBand
          scope="privacy-policy"
          reducedMotion={reducedMotion}
          disableReveal={disableReveal}
        />
      </div>
    </section>
  );
}

export default PrivacyPolicyBody;
