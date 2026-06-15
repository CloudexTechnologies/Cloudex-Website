"use client";
import { useState } from "react";
import { Target, Eye, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const whyTiles: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Outcomes First",
    desc: "We do not charge for effort. Every solution we build is tied to a real business outcome more leads, more efficiency, lower cost, or faster delivery.",
    icon: Target,
  },
  {
    title: "No Black Boxes",
    desc: "You will always know what we are building, why, and how it works. Transparency is not optional here.",
    icon: Eye,
  },
  {
    title: "Built to Scale",
    desc: "Whether you are a growing business or an established enterprise, everything we deliver is designed to scale with you.",
    icon: TrendingUp,
  },
  {
    title: "One Team, Full Capability",
    desc: "AI, development, and digital growth under one roof means no handoffs to agencies who do not understand your tech stack, and no developers who do not understand your business.",
    icon: Users,
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
          title="What Makes Working With Us Different"
          subtitle="We combine AI-first architecture with deep operational understanding to build systems that produce real, measurable results."
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
