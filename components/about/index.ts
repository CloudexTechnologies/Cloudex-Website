/**
 * `/about` section barrel. `app/about/page.tsx` is the only consumer.
 *
 * Section order on the page (`_source/structure/about.md`):
 *   03 Hero · 04 Our story · 05 Why us · 06 Team · 07 Life at Cloudex Technologies
 *   08 FAQs  → `components/shared/FaqSection` (`scope="about"`)
 *   09 CTA   → `components/shared/CtaBand`    (`scope="about"`)
 */

export { AboutHero, default as AboutHeroDefault } from "./AboutHero";
export { OurStorySection } from "./OurStorySection";
export { WhyUsSection } from "./WhyUsSection";
export { TeamSection } from "./TeamSection";
export { LifeAtSection } from "./LifeAtSection";
export { SvgTemplates } from "./SvgTemplates";

export {
  ABOUT_REVEAL_DELAYS,
  AboutBadge,
  AboutCtaButton,
  AboutCtaGroup,
  AboutReveal,
  BadgeCard,
  DELAY_ALL_ZERO,
  RoundedEdge,
  type AboutCtaGroupProps,
  type AboutCtaTone,
  type AboutRevealDelays,
} from "./AboutParts";

export type { AboutHeroProps } from "./AboutHero";
export type { OurStorySectionProps, StoryMilestone } from "./OurStorySection";
export type { WhyUsSectionProps, WhyUsCard } from "./WhyUsSection";
export type { TeamSectionProps, TeamMember } from "./TeamSection";
export type { LifeAtSectionProps, LifeAtPhoto } from "./LifeAtSection";
