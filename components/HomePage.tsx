"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { StatsSection } from "@/components/StatsSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
// import { TechMarquee } from "@/components/TechMarquee"; // kept for fallback
import { LogoCloudSection } from "@/components/LogoCloudSection";
// import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export function HomePage() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero heroStyle="centered" />
        <CapabilitiesSection />
        <StatsSection />
        <WhyChooseSection />
        {/* <TechMarquee /> */}
        <LogoCloudSection />
        <IndustriesSection />
        {/* <CaseStudiesSection /> */}
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
