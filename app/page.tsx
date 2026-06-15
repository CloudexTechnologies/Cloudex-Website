"use client";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useTweaks } from "@/hooks/useTweaks";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { StatsSection } from "@/components/StatsSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
// import { TechMarquee } from "@/components/TechMarquee"; // kept for fallback
import { LogoCloudSection } from "@/components/LogoCloudSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
} from "@/components/TweaksPanel";

const TWEAK_DEFAULTS = {
  heroStyle: "centered" as "centered" | "split",
  accentHue: "electric" as "electric" | "bright" | "indigo",
};

function AppContent() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const hues: Record<string, string> = {
      electric: "#2563EB",
      bright: "#3b82f6",
      indigo: "#6366f1",
    };
    const color = hues[tweaks.accentHue] || hues.electric;
    document.documentElement.style.setProperty("--accent", color);
    return () => { document.documentElement.style.removeProperty("--accent"); };
  }, [tweaks.accentHue]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero heroStyle={tweaks.heroStyle} />
        <CapabilitiesSection />
        <StatsSection />
        <WhyChooseSection />
        {/* <TechMarquee /> */}
        <LogoCloudSection />
        <IndustriesSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />

      <TweaksPanel title="Cloudex Tweaks">
        <TweakSection label="Hero">
          <TweakRadio
            label="Layout"
            value={tweaks.heroStyle}
            onChange={(v) => setTweak("heroStyle", v as "centered" | "split")}
            options={[
              { label: "Centered", value: "centered" },
              { label: "Split", value: "split" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Accent">
          <TweakRadio
            label="Blue Tone"
            value={tweaks.accentHue}
            onChange={(v) =>
              setTweak("accentHue", v as "electric" | "bright" | "indigo")
            }
            options={["electric", "bright", "indigo"]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
