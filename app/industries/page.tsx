import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

import { SvgTemplates } from "@/components/about";
import {
  ENGAGE_SECTION,
  EnterpriseCalloutSection,
  EnterpriseGridSection,
  EnterpriseHero,
  INDUSTRIES,
  INDUSTRIES_FAQ,
  INDUSTRIES_HERO,
  INDUSTRIES_SECTION,
} from "@/components/enterprise";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

/**
 * `/industries` — added after the Framer migration (no SSR counterpart). Same
 * construction as `/services`: about-page sections under the about root class list.
 */

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve: AI & Technology Solutions by Sector",
  description:
    "AI, data and cloud solutions for banking, telecom, public sector, healthcare, retail, logistics, manufacturing, hospitality and energy, tailored to each industry.",
  path: "/industries",
  image: INDUSTRIES_HERO.image.src,
});

const ROOT_CLASS_NAME =
  "framer-8WBKH framer-HFo8d framer-TPaq9 framer-WmRh7 framer-PN4gT framer-R1g06 framer-U04FB framer-13fmyed";

export default function IndustriesPage() {
  return (
    <>
      <div
        data-framer-root
        className={ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero {...INDUSTRIES_HERO} />
        <EnterpriseGridSection name="Industries" {...INDUSTRIES_SECTION} cards={INDUSTRIES} />
        <EnterpriseCalloutSection name="How we engage" {...ENGAGE_SECTION} />
        <FaqSection scope="about" items={INDUSTRIES_FAQ} />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }]), faqSchema(INDUSTRIES_FAQ)]} />
    </>
  );
}
