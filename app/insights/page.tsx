"use client";
import Link from "next/link";
import { Bot, Globe, Code2, Lightbulb, ArrowRight, Clock } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const pillars = [
  {
    icon: Bot,
    color: "#2563EB",
    title: "AI & Automation",
    desc: "Practical thinking on AI employees, intelligent automation, and how businesses are deploying AI that actually works.",
    articles: [
      "What an AI Employee actually does and what it cannot",
      "The 5 workflows most businesses should automate first",
      "How to brief an AI: lessons from 30 deployments",
      "AI vs automation: when to use which",
    ],
  },
  {
    icon: Globe,
    color: "#2563EB",
    title: "Digital Growth",
    desc: "Honest perspectives on websites, SEO, conversion, and what separates businesses that grow online from those that do not.",
    articles: [
      "Why your website is not bringing in business (and how to fix it)",
      "SEO in 2025: what still works, what does not",
      "The conversion audit: 7 things to check before spending on ads",
      "What makes a website a business development tool",
    ],
  },
  {
    icon: Code2,
    color: "#2563EB",
    title: "Custom Software",
    desc: "When to build versus buy, how to approach custom software projects, and the common mistakes that cost time and money.",
    articles: [
      "Build vs buy: a framework for making the decision",
      "The hidden cost of workarounds in your business",
      "How to scope a custom software project without overengineering",
      "What a good technical brief looks like",
    ],
  },
  {
    icon: Lightbulb,
    color: "#2563EB",
    title: "Business & Strategy",
    desc: "Broader thinking on technology strategy, operational efficiency, and what we have learned working across industries.",
    articles: [
      "Why the businesses growing fastest are not the biggest adopters of AI",
      "The technology partner vs vendor distinction",
      "Measuring ROI on technology: a practical guide",
      "How to evaluate a technology proposal without a technical background",
    ],
  },
];

export default function InsightsPage() {
  return (
    <InnerPageLayout>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "72vh",
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
              "radial-gradient(ellipse 65% 45% at 50% -5%, rgba(37,99,235,0.15), transparent 65%)",
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
                Insights
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
                text="Thinking that helps you make better technology decisions."
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
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                No hype. No generic listicles. Practical perspectives from people who build and deploy AI, software, and digital systems for real businesses.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Content Pillars ── */}
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
                What We Write About
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="Four areas. One standard: useful." wordDelay={0.06} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div
                    style={{
                      padding: "32px 28px",
                      borderRadius: 20,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${pillar.color}14`,
                        color: pillar.color,
                        border: `1px solid ${pillar.color}28`,
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: pillar.color,
                        marginBottom: 10,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                        marginBottom: 20,
                      }}
                    >
                      {pillar.desc}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", flex: 1 }}>
                      {pillar.articles.map((article, ai) => (
                        <li
                          key={ai}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            padding: "8px 0",
                            borderBottom:
                              ai < pillar.articles.length - 1
                                ? "1px solid var(--border)"
                                : "none",
                          }}
                        >
                          <ArrowRight
                            size={12}
                            style={{
                              color: pillar.color,
                              flexShrink: 0,
                              marginTop: 4,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--text-2)",
                              lineHeight: 1.55,
                            }}
                          >
                            {article}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        color: "var(--text-3)",
                        fontStyle: "italic",
                      }}
                    >
                      <Clock size={11} />
                      Publishing soon
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Coming Soon Banner ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "48px 40px",
                borderRadius: 24,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                maxWidth: 640,
                margin: "0 auto",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                }}
              >
                <Lightbulb size={24} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
              </div>
              <h2
                style={{
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                Articles launching soon
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  maxWidth: 480,
                }}
              >
                We are writing content that is actually useful not AI-generated filler. Subscribe to be notified when the first articles go live.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 26px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                  marginTop: 4,
                }}
              >
                Get Notified
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </InnerPageLayout>
  );
}
