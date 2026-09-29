"use client";

/**
 * ContactHero — the ONE section `/contact` SSRs: `<section class="framer-8l81tn">`,
 * `data-framer-name="Hero"`, which wraps the whole page body (PLAN.md §3, contact.md §03).
 *
 * ── Sources ──────────────────────────────────────────────────────────────────────────
 * Markup      `_source/live/contact.html` 158989–172243 (the offsets in contact.md §03),
 *             cross-checked against all three `_source/rendered/contact.*.html` captures.
 *             Structural reference for the two sub-components that Framer inlines here:
 *               • `eWNvTdAfh.js` — the "Contact" Badge.
 *               • `zfl6tTRbM.js` — `displayName = "Contact info"`, the four detail cards
 *                 (`With link` = `framer-v-130vfja`, `Without link` = `framer-v-1h18j4b`).
 *             Both recovered from the chunk source maps under `_source/behaviours/chunks/`.
 * Behaviour   contact.md §03 + `lib/appear-specs.json`: appear ids `1ndg6ic` (Heading) and
 *             `1xuz3de` (Contact details), both `default`-only,
 *             `y: 40 → 0, opacity .001 → 1`, spring `{stiffness 300, damping 60, mass 1,
 *             delay 0}` — the over-damped Framer spring (ratio ≈ 1.73, no overshoot).
 *             Delegated wholesale to the `AppearMotion` primitive.
 *
 * ── Fidelity notes ───────────────────────────────────────────────────────────────────
 * • NO breakpoint variants. The desktop, tablet and phone post-hydration captures are
 *   byte-identical (13,198 bytes each) and carry no `hidden-*` class anywhere — `/contact`
 *   is CSS-only responsive. So PLAN.md §1.1's three-copy rule has nothing to apply to
 *   here; `scope="contact"` is still passed to `AppearMotion` so the variant lookup uses
 *   this page's triple (1frsxba / xt0inb / tlxb3v) rather than home's.
 * • NO PLAN.md §1.5 scroll placeholders. `/contact` has ZERO inline
 *   `opacity:0;transform:translateY(Npx)` elements (PLAN.md §1.5 counts them: "0 on
 *   blog/contact"), so nothing here needs a `ScrollReveal` wrapper.
 * • The four `<div class="ssr-variant">` wrappers around the detail cards are in the SSR
 *   even though each holds a single copy (Framer emits one per `PropertyOverrides`).
 *   `.ssr-variant { display: contents }` — they are kept because
 *   `.ssr-variant > :first-child { width: 100% !important }` is load-bearing.
 * • Copy is VERBATIM except the contact details, which are now the REAL ones. Framer's
 *   live site ships placeholders (`Admin@mail.com`, `+1234567890`, a Fresno CA address)
 *   and two BROKEN hrefs — the literal strings `Mailto:` and `tel:`, with no address or
 *   number after the scheme, so both links were dead whatever label they carried. All
 *   four cards, and both hrefs, are replaced below.
 * • `id="header"` on the Heading is Framer's scroll-section anchor
 *   (`@framerScrollSections {"VpYfqmfSJ":{"pattern":":VpYfqmfSJ","name":"header"}}`).
 */

import * as React from "react";

import { AppearMotion, type ReducedMotionPolicy } from "@/components/primitives";

import { ContactForm, type ContactFormProps } from "./ContactForm";

/* -------------------------------------------------------------------------- */
/* Copy + data (all VERBATIM from the SSR)                                     */
/* -------------------------------------------------------------------------- */

export const CONTACT_BADGE_LABEL = "Contact" as const;

/** Note the typographic apostrophe (U+2019) — it is in the source. */
export const CONTACT_HEADING = "Have a Project in Mind? Let’s Talk" as const;

export interface ContactDetail {
  /** The per-instance `framer-*-container` class from the SSR. */
  readonly containerClassName: string;
  /** `HLF3YbSKF` "With link" / `ARUB8kshi` "Without link". */
  readonly variantClassName: string;
  readonly variantName: "With link" | "Without link";
  readonly title: string;
  readonly value: string;
  /** `undefined` on the "Without link" card. VERBATIM — two of these are broken. */
  readonly href?: string;
}

export const CONTACT_DETAILS: readonly ContactDetail[] = [
  {
    containerClassName: "framer-17n5fib-container",
    variantClassName: "framer-v-130vfja",
    variantName: "With link",
    title: "Email",
    value: "info@cloudextechnologies.io",
    /* Framer shipped the bare string "Mailto:" with no address, so the link was dead
       whatever the label said. Real mailto now. */
    href: "mailto:info@cloudextechnologies.io",
  },
  {
    containerClassName: "framer-1rgyovx-container",
    variantClassName: "framer-v-130vfja",
    variantName: "With link",
    title: "Phone",
    value: "+44 7840 983410",
    /* Framer shipped a bare "tel:" with no number. `tel:` must be digits only, no
       spaces, so the href drops the formatting the label keeps. */
    href: "tel:+447840983410",
  },
  {
    containerClassName: "framer-1fok3sp-container",
    variantClassName: "framer-v-1h18j4b",
    variantName: "Without link",
    title: "Timing",
    value: "Monday to Friday : 9AM-6PM UK time",
  },
  {
    containerClassName: "framer-1683fyd-container",
    variantClassName: "framer-v-130vfja",
    variantName: "With link",
    title: "Address",
    /* The real Karachi office. Framer's template shipped a placeholder US address
       ("3631 Edgewood avenue, Freshno, California, 93721") pointing at a bare
       maps.google.com link; both are replaced here. */
    value: "852, 85 Dunstall Hill, Wolverhampton WV6 0SR, UK",
    href: "https://www.google.com/maps/search/?api=1&query=852%2C%2085%20Dunstall%20Hill%2C%20Wolverhampton%20WV6%200SR",
  },
] as const;

/** `zfl6tTRbM.js`: the card's root `style`. */
const CARD_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(120deg, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 0%, rgba(0, 0, 0, 0) 100%)",
  width: "100%",
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
};

/** `eWNvTdAfh.js` via the SSR: the Badge's root `style`. */
const BADGE_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color":
    "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))",
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "solid",
  "--border-top-width": "1px",
  backgroundColor:
    "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
} as React.CSSProperties;

const BADGE_TEXT_STYLE = {
  "--extracted-r6o4lv": "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  "--variable-reference-ibDtCMzbS-eWNvTdAfh":
    "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
  transform: "none",
} as React.CSSProperties;

const CARD_TITLE_STYLE = {
  "--extracted-r6o4lv":
    "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

export interface ContactHeroProps {
  /**
   * Replaces the default `<ContactForm />` inside `div.framer-1xbzyr1`. Handy for
   * screenshot rigs that need a forced submit state; leave unset in production.
   */
  form?: React.ReactNode;
  /** Forwarded to the default `<ContactForm />` when `form` is not supplied. */
  formProps?: ContactFormProps;
  reducedMotion?: ReducedMotionPolicy;
  /** Render both appear animations already settled (screenshots / visual tests). */
  disableAppear?: boolean;
  /** Appended after the Framer `framer-8l81tn` class. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function ContactHero(props: ContactHeroProps): React.ReactElement {
  const {
    form,
    formProps,
    reducedMotion = "settle",
    disableAppear = false,
    className,
  } = props;

  return (
    <section
      className={
        className === undefined ? "framer-8l81tn" : `framer-8l81tn ${className}`
      }
      data-framer-name="Hero"
    >
      <div className="framer-x7nyjb" data-framer-name="Container">
        {/* ---- Heading — appear id 1ndg6ic ---- */}
        <AppearMotion
          id="1ndg6ic"
          scope="contact"
          className="framer-1ndg6ic"
          data-framer-name="Heading"
          elementId="header"
          reducedMotion={reducedMotion}
          disabled={disableAppear}
        >
          <div className="framer-rcmd1-container">
            <div
              className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
              data-border="true"
              data-framer-name="Badge"
              data-highlight="true"
              style={BADGE_STYLE}
            >
              <div
                className="framer-xrs0cf"
                data-framer-component-type="RichTextContainer"
                style={BADGE_TEXT_STYLE}
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
                  {CONTACT_BADGE_LABEL}
                </p>
              </div>
            </div>
          </div>
          <div
            className="framer-27uzso"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <h1
              className="framer-text framer-styles-preset-d8f6ar"
              data-styles-preset="btOMgah8g"
              style={
                { "--framer-text-alignment": "left" } as React.CSSProperties
              }
            >
              {CONTACT_HEADING}
            </h1>
          </div>
        </AppearMotion>

        {/* ---- Contact details + form — appear id 1xuz3de ---- */}
        <AppearMotion
          id="1xuz3de"
          scope="contact"
          className="framer-1xuz3de"
          data-framer-name="Contact details"
          reducedMotion={reducedMotion}
          disabled={disableAppear}
        >
          <div className="framer-1d42doc" data-framer-name="Content">
            {CONTACT_DETAILS.map((detail) => (
              <div className="ssr-variant" key={detail.title}>
                <div className={detail.containerClassName}>
                  <div
                    className={`framer-GXr6a framer-PN4gT framer-JesZO framer-WQyg0 framer-130vfja ${detail.variantClassName}`}
                    data-framer-name={detail.variantName}
                    style={CARD_STYLE}
                  >
                    <div
                      className="framer-1hg0h3w"
                      data-framer-name="Container"
                    >
                      <div
                        className="framer-1ay0d4e"
                        data-framer-component-type="RichTextContainer"
                        style={CARD_TITLE_STYLE}
                      >
                        <p
                          className="framer-text framer-styles-preset-wgkvl1"
                          data-styles-preset="risoZ9TJU"
                          dir="auto"
                          style={
                            {
                              "--framer-text-color":
                                "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))",
                            } as React.CSSProperties
                          }
                        >
                          <strong className="framer-text">
                            {detail.title}
                          </strong>
                        </p>
                      </div>
                      <div
                        className="framer-1uzlq40"
                        data-framer-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          className="framer-text framer-styles-preset-o3oioe"
                          data-styles-preset="BgF22VJBv"
                          dir="auto"
                        >
                          {detail.href === undefined ? (
                            detail.value
                          ) : (
                            <a
                              className="framer-text framer-styles-preset-1arsep9"
                              data-styles-preset="PeLcf7ehs"
                              href={detail.href}
                              target="_blank"
                              rel=""
                            >
                              {detail.value}
                            </a>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="framer-1xbzyr1" data-framer-name="Form Container">
            {form ?? <ContactForm {...formProps} />}
          </div>
        </AppearMotion>
      </div>
    </section>
  );
}

export default ContactHero;
