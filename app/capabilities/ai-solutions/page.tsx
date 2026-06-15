"use client";
import Link from "next/link";
import { Search, Cpu, Layers, Rocket, ArrowRight } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";

const howItWorksSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map your current workflows, identify automation and intelligence opportunities, and define what success looks like in measurable terms.",
    icon: Search,
  },
  {
    num: "02",
    title: "Design",
    desc: "We architect the solution whether that's an AI employee, a custom model, or an intelligent workflow layer scoped to your actual needs.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Build and Test",
    desc: "We build in short cycles with continuous feedback. Nothing ships until it performs in conditions that mirror your real environment.",
    icon: Cpu,
  },
  {
    num: "04",
    title: "Deploy and Handover",
    desc: "We deploy, document, and hand over. Your team understands what was built, how to use it, and what to expect from it.",
    icon: Rocket,
  },
];

export default function AISolutionsPage() {
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
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
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
                AI Solutions
              </span>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
                marginBottom: 32,
              }}
            >
              <BlurText
                text="AI that works inside your business, not alongside it."
                delay={0.1}
                wordDelay={0.038}
              />
            </h1>

            <ScrollReveal delay={0.5}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.9vw, 20px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 660,
                  margin: "0 auto 40px",
                }}
              >
                We build AI that integrates with your operations, your data, and your people not
                generic tools bolted on top.
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
                Talk to Us
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Two Ways We Apply AI ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
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
                Our Approach
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                <BlurText text="Two ways we apply AI to your business." wordDelay={0.045} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                label: "AI Employees",
                tag: "FLAGSHIP",
                color: "#2563EB",
                title: "Digital workers that operate like real team members.",
                bullets: [
                  "Trained on your processes, voice, and data",
                  "Operate across sales, support, operations, HR and more",
                  "Available 24/7 no sick days, no turnover",
                  "Deployed in 30 days or less",
                ],
                cta: "Explore AI Employees",
                href: "/capabilities/ai-employees",
              },
              {
                label: "AI-Native Products",
                tag: null,
                color: "#2563EB",
                title: "Custom AI systems built for your workflows.",
                bullets: [
                  "Document intelligence and data extraction",
                  "Predictive models for decisions and risk",
                  "AI-powered internal tools and dashboards",
                  "LLM integrations with your existing software",
                ],
                cta: "Start a Conversation",
                href: "/contact",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction={i === 0 ? "left" : "right"}>
                <div
                  style={{
                    padding: "40px 36px",
                    borderRadius: 24,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 24,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: card.color,
                        fontFamily: "var(--font-heading)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {card.label}
                    </span>
                    {card.tag && (
                      <span
                        style={{
                          fontSize: 9,
                          background: card.color,
                          color: "#fff",
                          padding: "2px 7px",
                          borderRadius: 4,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 28px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      marginBottom: 24,
                      color: "var(--text-1)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", flex: 1 }}>
                    {card.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 12,
                          fontSize: 14,
                          color: "var(--text-2)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: card.color,
                            flexShrink: 0,
                            marginTop: 7,
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 24px",
                      borderRadius: 999,
                      background: `${card.color}14`,
                      color: card.color,
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: 13,
                      textDecoration: "none",
                      border: `1px solid ${card.color}28`,
                      alignSelf: "flex-start",
                      transition: "all 0.2s",
                    }}
                  >
                    {card.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 72px" }}>
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
                How It Works
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="From idea to running in four stages." wordDelay={0.05} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {howItWorksSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div
                    style={{
                      padding: "32px 28px",
                      borderRadius: 20,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 40,
                          fontWeight: 800,
                          color: "var(--border)",
                          fontFamily: "var(--font-heading)",
                          lineHeight: 1,
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {step.num}
                      </span>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(37,99,235,0.1)",
                          color: "var(--accent)",
                          border: "1px solid rgba(37,99,235,0.2)",
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 10,
                        color: "var(--text-1)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-2)",
                        lineHeight: 1.75,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
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
                Ready to explore what AI can do for you?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                We will walk through your operations and identify where AI delivers the highest return no jargon, no overselling.
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
                Talk to Us
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
