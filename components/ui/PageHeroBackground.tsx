"use client";
import DotGrid from "@/components/DotGrid";
import { useTheme } from "@/context/ThemeContext";

export function PageHeroBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dotColors = isDark
    ? { base: "#1f3060", active: "#60a5fa" }
    : { base: "#7a9cd4", active: "#1d4ed8" };

  return (
    <>
      {/* Base glow */}
      <div style={{ position: "absolute", inset: 0, background: "var(--hero-glow)" }} />

      {/* Dot grid */}
      <DotGrid
        dotSize={3}
        gap={26}
        baseColor={dotColors.base}
        activeColor={dotColors.active}
        proximity={160}
        shockRadius={260}
        shockStrength={4}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Floating orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          className="orb"
          style={{
            width: 500, height: 500, top: "-10%", left: "15%",
            background: "radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)",
            animation: "orbFloat1 22s ease-in-out infinite",
          }}
        />
        <div
          className="orb"
          style={{
            width: 400, height: 400, top: "30%", right: "5%",
            background: "radial-gradient(circle, rgba(96,165,250,0.18), transparent 70%)",
            animation: "orbFloat2 28s ease-in-out infinite",
          }}
        />
        <div
          className="orb"
          style={{
            width: 300, height: 300, bottom: "5%", left: "40%",
            background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)",
            animation: "orbFloat3 25s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}
