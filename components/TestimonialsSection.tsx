"use client";
import { useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { ScrollReveal } from "./ui/ScrollReveal";

const testimonials = [
  {
    quote: "Within 90 days of working with Cloudex, our inbound leads doubled. The combination of a new website and their search visibility work changed the business.",
    role: "Director",
    company: "UK-based Financial Advisory Firm",
  },
  {
    quote: "We were sceptical about AI Employees at first. Now we could not imagine running our sales process without one. It handles everything our SDR team used to do and it does it better.",
    role: "Head of Sales",
    company: "SaaS Company",
  },
  {
    quote: "The custom software they built replaced three tools we were paying subscriptions for. It pays for itself every month.",
    role: "Operations Manager",
    company: "E-Commerce Brand",
  },
];

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal delay={index * 0.12}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "32px",
          borderRadius: 20,
          background: hovered ? "var(--surface-hover)" : "var(--surface)",
          border: `1px solid ${hovered ? "rgba(37,99,235,0.2)" : "var(--border)"}`,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          height: "100%",
        }}
      >
        <div style={{ color: "#f59e0b", fontSize: 14, letterSpacing: "0.1em" }}>
          ★★★★★
        </div>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-1)",
            lineHeight: 1.8,
            fontStyle: "italic",
            margin: 0,
            flex: 1,
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              flexShrink: 0,
              background: "var(--accent-subtle)",
              border: "1px solid rgba(37,99,235,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--accent)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {t.role[0]}
          </div>
          <div>
            <div
              style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)" }}
            >
              {t.role}
            </div>
            <div
              style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}
            >
              {t.company}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from the businesses we have helped build, deploy, and scale."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
