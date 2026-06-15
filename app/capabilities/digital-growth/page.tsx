"use client";
import { useState } from "react";
import Link from "next/link";
import { Globe, Search, TrendingUp, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const services = [
  {
    icon: Globe,
    color: "#2563EB",
    title: "High-Performance Websites",
    desc: "We design and build websites that are fast, clear, and built to convert. Not portfolios. Not brochures. Business development tools.",
    bullets: ["Custom design, no templates", "Sub-2s load times", "Mobile-first, always"],
  },
  {
    icon: Search,
    color: "#2563EB",
    title: "Search Visibility",
    desc: "We get your business in front of people who are already looking for what you do and keep you there.",
    bullets: ["Technical SEO and content strategy", "Local and national search", "Transparent reporting"],
  },
  {
    icon: TrendingUp,
    color: "#2563EB",
    title: "Conversion Optimisation",
    desc: "Traffic is only valuable if it converts. We analyse what is stopping visitors from becoming customers and fix it.",
    bullets: ["Landing page optimisation", "A/B testing and analysis", "Funnel mapping and repair"],
  },
  {
    icon: BarChart3,
    color: "#2563EB",
    title: "Digital Audit",
    desc: "Before we recommend anything, we look at what you have. A clear, honest assessment of where you are and what is holding you back.",
    bullets: ["Website and SEO audit", "Competitor benchmarking", "Priority action list"],
  },
];

const whoIsItFor = [
  "Your website exists but it brings in almost no business",
  "You are spending on ads but not seeing the return",
  "Competitors with worse services are outranking you",
  "You are not sure what is and is not working",
  "You want growth but not more people to manage it",
];

function ServiceCard({ icon: Icon, color, title, desc, bullets }: (typeof services)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        borderRadius: 20,
        background: hovered ? "var(--surface-hover)" : "var(--surface)",
        border: "1px solid var(--border)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "var(--card-shadow)" : "none",
        cursor: "default",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}14`,
          color,
          border: `1px solid ${color}28`,
          marginBottom: 20,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 12,
          color,
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
        {desc}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--text-3)",
              marginBottom: 6,
            }}
          >
            <CheckCircle size={13} style={{ color, flexShrink: 0 }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DigitalGrowthPage() {
  return (
    <InnerPageLayout>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 76,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 45% at 50% -5%, rgba(37,99,235,0.15), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 999,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 36,
                }}
              >
                Digital Growth
              </span>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(34px, 5.8vw, 70px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
                marginBottom: 32,
              }}
            >
              <BlurText
                text="Your digital presence should be working as hard as you are."
                delay={0.1}
                wordDelay={0.036}
              />
            </h1>

            <ScrollReveal delay={0.5}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.9vw, 20px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 640,
                  margin: "0 auto 40px",
                }}
              >
                We build websites and digital strategies that consistently bring in business not just traffic.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 4px 28px rgba(37,99,235,0.35)",
                }}
              >
                Get a Free Digital Audit
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 18,
                }}
              >
                What We Do
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="Four services. One goal: more business." wordDelay={0.05} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <ServiceCard {...s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            <ScrollReveal direction="left">
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 18,
                }}
              >
                Who This Is For
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                <BlurText
                  text="Digital Growth is right for you if..."
                  wordDelay={0.045}
                />
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {whoIsItFor.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "16px 0",
                      borderBottom: i < whoIsItFor.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(37,99,235,0.1)",
                        border: "1px solid rgba(37,99,235,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <CheckCircle size={14} style={{ color: "var(--accent)" }} />
                    </div>
                    <span
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        color: "var(--text-2)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              maxWidth: 600,
              margin: "0 auto",
              padding: "60px 40px",
              borderRadius: 24,
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.08), transparent 70%), var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <ScrollReveal>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 18,
                }}
              >
                Start with a free digital audit.
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                We will review your website, search presence, and digital footprint and tell you exactly what is holding you back.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 4px 28px rgba(37,99,235,0.35)",
                }}
              >
                Get a Free Digital Audit
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
