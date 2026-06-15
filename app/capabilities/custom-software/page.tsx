"use client";
import { useState } from "react";
import Link from "next/link";
import { Settings, Users, Zap, Brain, ArrowRight } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";

const whatWeBuild = [
  {
    icon: Settings,
    color: "#2563EB",
    title: "Business Operations Software",
    desc: "Internal tools that replace spreadsheets and workarounds built around exactly how your team operates.",
    examples: ["Custom CRM and pipeline tools", "Inventory and logistics systems", "Staff scheduling and HR platforms"],
  },
  {
    icon: Users,
    color: "#2563EB",
    title: "Client-Facing Web Apps",
    desc: "Portals, platforms, and applications your clients interact with fast, reliable, and branded to your standard.",
    examples: ["Customer portals and dashboards", "Booking and quoting systems", "Membership and subscription platforms"],
  },
  {
    icon: Zap,
    color: "#2563EB",
    title: "Integrations and Automations",
    desc: "Connect your existing tools so data flows where it should without manual entry, errors, or delays.",
    examples: ["CRM and ERP integrations", "Payment and API connections", "Workflow and notification automation"],
  },
  {
    icon: Brain,
    color: "#2563EB",
    title: "AI-Native Products",
    desc: "Software built from the ground up with AI at the core not AI added as an afterthought.",
    examples: ["Document processing pipelines", "Intelligent search and retrieval", "Decision-support tools"],
  },
];

const techStack = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript"] },
  { category: "Backend", items: ["Node.js", "Python", "GraphQL"] },
  { category: "Database", items: ["PostgreSQL", "Supabase", "Redis"] },
  { category: "AI / ML", items: ["OpenAI", "Claude", "LangChain"] },
  { category: "Infrastructure", items: ["AWS", "Vercel", "Docker"] },
  { category: "DevOps", items: ["CI/CD", "Kubernetes", "Monitoring"] },
];

function BuildCard({ icon: Icon, color, title, desc, examples }: (typeof whatWeBuild)[0]) {
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
        {examples.map((ex, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--text-3)",
              marginBottom: 5,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CustomSoftwarePage() {
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
        <PageHeroBackground />
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
                Custom Software
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
                text="Software that fits your business. Not the other way around."
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
                Off-the-shelf tools create workarounds. We build the thing that removes them entirely.
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
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What We Build ── */}
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
                What We Build
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="Four categories. Unlimited configurations." wordDelay={0.05} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {whatWeBuild.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <BuildCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
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
                Our Stack
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="Modern, reliable, and built to scale." wordDelay={0.055} />
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginTop: 16,
                }}
              >
                We use proven technology not trends. Everything we choose is maintainable, well-supported, and appropriate to the job.
              </p>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {techStack.map((group, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    padding: "24px 22px",
                    borderRadius: 16,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 14,
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {group.category}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {group.items.map((item, ii) => (
                      <li
                        key={ii}
                        style={{
                          fontSize: 14,
                          color: "var(--text-2)",
                          fontWeight: 500,
                          marginBottom: 6,
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
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
                Have something in mind?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                Tell us what problem you need to solve. We will tell you if software is the right answer and what it would look like.
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
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
