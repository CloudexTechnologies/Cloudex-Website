"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function InnerPageLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      {/* Blue glow behind the transparent navbar same depth as homepage hero */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 320,
          background:
            "radial-gradient(ellipse 80% 120% at 50% -15%, rgba(37,99,235,0.13), transparent 70%)",
          pointerEvents: "none",
          zIndex: 999,
        }}
      />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
