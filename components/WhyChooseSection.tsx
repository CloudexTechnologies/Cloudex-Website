"use client";
import { useState } from "react";
import { Brain, ServerCog, SlidersHorizontal, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const whyTiles: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "AI-First Thinking",
    desc: "Every solution is built with intelligence at its core, ensuring your business operates smarter, not just faster.",
    icon: Brain,
  },
  {
    title: "Reliable & Scalable Systems",
    desc: "Infrastructure engineered for growth — systems that perform consistently and scale alongside your business demands.",
    icon: ServerCog,
  },
  {
    title: "Solutions Built Around You",
    desc: "No off-the-shelf compromises. Every product is architected around your specific workflows and operational needs.",
    icon: SlidersHorizontal,
  },
  {
    title: "Long-Term Support",
    desc: "We don't disappear after launch. Continuous optimization, monitoring, and strategic guidance for lasting impact.",
    icon: HeartHandshake,
  },
];

function WhyTile({ tile }: { tile: (typeof whyTiles)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 32,
        borderRadius: 18,
        height: "100%",
        background: hovered ? "var(--surface-hover)" : "var(--surface)",
        border: "1px solid var(--border)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          marginBottom: 18,
          color: "var(--accent)",
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          display: "inline-block",
        }}
      >
        <tile.icon size={28} strokeWidth={1.5} />
      </div>
      <h4
        style={{
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {tile.title}
      </h4>
      <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>
        {tile.desc}
      </p>
    </div>
  );
}

export function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="section"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="container">
        <SectionHeader
          label="Why Cloudex"
          title="Why Businesses Choose Cloudex"
          subtitle="We combine AI-first architecture with deep operational understanding to build systems that truly work."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {whyTiles.map((tile, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <WhyTile tile={tile} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
