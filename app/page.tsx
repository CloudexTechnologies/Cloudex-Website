import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import type { Metadata } from "next";

import HomeSvgTemplates from "@/components/home/SvgTemplates";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_FAQ_ITEMS } from "@/components/shared/faq-content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { faqSchema } from "@/lib/structured-data";
import {
  AboutScope,
  ENTERPRISE_TEASER,
  EnterpriseCalloutSection,
} from "@/components/enterprise";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

/**
 * Home page. Section order and the root class list are taken verbatim from the
 * SSR (`_source/live/home.html`); see `_source/structure/home.md` for the map.
 *
 * `<div data-framer-root>` carries the page's serialization-hash classes — the
 * section CSS in app/framer/layout.css is scoped under `.framer-GhI2H`, so
 * dropping this wrapper strips every section of its width and padding.
 * `display:contents` keeps it out of the layout-template flexbox.
 *
 * Post-migration changes: Comparison moved up to follow Solutions; Testimonials and
 * Pricing removed. The "For enterprises" teaser after Comparison was added post-migration. It is an
 * about-page section, so it sits in `AboutScope` to pick up the `.framer-8WBKH` rules.
 *
 * `HomeSvgTemplates` is the `<div id="svg-templates">` symbol sheet Framer emits
 * at the end of <body>; the notch/arrow SVGs reference it via `<use href="#...">`.
 */
export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <div
        data-framer-root
        className="framer-GhI2H framer-HFo8d framer-PN4gT framer-DSt1c framer-J5GKa framer-R1g06 framer-TPaq9 framer-an3Me framer-Bct2H framer-dhPgH framer-U04FB framer-72rtr7"
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <HeroSection />
        <IntroSection />
        <ProcessSection />
        <SolutionsSection />
        <ComparisonSection />
        <AboutScope>
          <EnterpriseCalloutSection name="For enterprises" {...ENTERPRISE_TEASER} />
        </AboutScope>
        <CaseStudySection />
        <BenefitsSection />
        <FaqSection scope="home" />
        <CtaBand scope="home" />
      </div>
      <HomeSvgTemplates />
      <JsonLd data={faqSchema(HOME_FAQ_ITEMS)} />
    </>
  );
}
