import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT_FAQ_ITEMS } from "@/components/shared/faq-content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

import {
  AboutHero,
  LifeAtSection,
  OurStorySection,
  SvgTemplates,
  WhyUsSection,
} from "@/components/about";

/**
 * `/about` — 11 macro nodes, of which `app/layout.tsx` already owns 4 (navbar ×2,
 * footer ×2). This file renders the remaining 7 sections, in SSR order
 * (`_source/structure/about.md`):
 *
 *   03  Hero          `.framer-1y17f4o`   181987–188733   AboutHero
 *   04  Our story     `.framer-2kiesh`    188733–233132   OurStorySection
 *   05  Why us        `.framer-1dfxumj`   233132–263008   WhyUsSection
 *   06  Team          `.framer-1af2gb1`   263008–281488   REMOVED at the client's
 *       request. `components/about/TeamSection.tsx` is still a faithful port and is
 *       still exported from the barrel, so restoring it is a one-line change here.
 *   07  Life at Cloudex Technologies `.framer-1v4l3a`    281488–305445   LifeAtSection
 *   08  FAQs          `.framer-1nav57n`   305445–316257   FaqSection  scope="about"
 *   09  CTA           `.framer-1wdn2mc`   316257–357425   CtaBand     scope="about"
 *
 * The root `<div data-framer-root>` is transcribed from the SSR, including
 * `display: contents` — it is a CSS-scope carrier, not a layout box, which is exactly
 * why `CtaBand` requires it (its section CSS is written `.framer-8WBKH .framer-1wdn2mc`).
 * `framer-13fmyed` is the ABOUT desktop breakpoint hash (PLAN.md §1.1).
 *
 * Not ported, deliberately:
 *  • `#__framer-badge-container` / appear id `n0ccwk` — PLAN.md §1.3.
 *  • `<style data-framer-html-style>html body { background: … }</style>` — already in
 *    `app/framer/base.css:13`.
 */

export const metadata: Metadata = pageMetadata({
  title: "About Us: AI Automation Company in the UK",
  description:
    "Meet Cloudex Technologies, an AI Native Technology Firm founded in 2022, based in Wolverhampton, UK. 50+ works automated.",
  path: "/about",
  image: "/assets/images/ai/hero-1536.jpg",
});

/** MEASURED — `_source/live/about.html`, the `data-framer-root` div. */
const ROOT_CLASS_NAME =
  "framer-8WBKH framer-HFo8d framer-TPaq9 framer-WmRh7 framer-PN4gT framer-R1g06 framer-U04FB framer-13fmyed";

export default function AboutPage() {
  return (
    <>
      <div
        data-framer-root
        className={ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <AboutHero />
        <OurStorySection />
        <WhyUsSection />
        <LifeAtSection />
        <FaqSection scope="about" />
        <CtaBand scope="about" />

        {/*
          `.framer-11nsmpi-container` hosts Framer's SmoothScroll component (Lenis 1.1.2,
          `intensity: 10`). `lenis` is not a dependency of this repo and the task forbids
          installing one, so the container is rendered empty exactly as the SSR ships it
          — `_source/behaviours/smooth-scroll.md` open item 1.
        */}
        <div className="framer-11nsmpi-container">
          <div />
        </div>
      </div>

      {/* Sibling of the root div in the real DOM, so `[data-layout-template=true]>#overlay` matches. */}
      <div id="overlay" />

      <SvgTemplates />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), faqSchema(ABOUT_FAQ_ITEMS)]} />
    </>
  );
}
