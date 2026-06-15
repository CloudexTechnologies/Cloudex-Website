"use client";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { value: "30 days", label: "Average AI Employee deployment" },
  { value: "60%+", label: "Reduction in admin overhead" },
  { value: "3x", label: "Typical lead response improvement" },
  { value: "10+", label: "Industries served" },
];

const placeholderCases = [
  {
    industry: "Financial Services",
    title: "AI compliance assistant deployed at regulated firm",
    outcome: "73% reduction in documentation time",
    tag: "AI Employee",
    color: "#2563EB",
  },
  {
    industry: "E-Commerce",
    title: "24/7 customer support AI handling 400+ queries/day",
    outcome: "91% resolution without human escalation",
    tag: "AI Employee",
    color: "#2563EB",
  },
  {
    industry: "Real Estate",
    title: "Automated lead qualification and booking system",
    outcome: "3x more viewings booked per week",
    tag: "Digital Growth",
    color: "#2563EB",
  },
  {
    industry: "Legal",
    title: "Custom document review and drafting platform",
    outcome: "6 hours saved per fee-earner per week",
    tag: "Custom Software",
    color: "#2563EB",
  },
];

export default function WorkPage() {
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
                Our Work
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
                text="Results we are proud of."
                delay={0.1}
                wordDelay={0.06}
              />
            </h1>

            <ScrollReveal delay={0.45}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.9vw, 20px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                We measure our success by what changes in your business. These are some of the outcomes we have delivered for the businesses we work with.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    padding: "32px 24px",
                    borderRadius: 20,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 44px)",
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "-0.03em",
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-3)",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
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
                Case Studies
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="Selected client outcomes." wordDelay={0.06} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
              marginBottom: 48,
            }}
          >
            {placeholderCases.map((c, i) => (
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--text-3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {c.industry}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: c.color,
                        background: `${c.color}14`,
                        border: `1px solid ${c.color}28`,
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(16px, 1.8vw, 20px)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.3,
                      marginBottom: 16,
                      flex: 1,
                      color: "var(--text-1)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: `${c.color}0D`,
                      border: `1px solid ${c.color}20`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: c.color,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {c.outcome}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon note */}
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "24px 28px",
                borderRadius: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                maxWidth: 600,
                margin: "0 auto",
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
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  flexShrink: 0,
                }}
              >
                <Briefcase size={20} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-1)",
                    marginBottom: 4,
                  }}
                >
                  Full case studies coming soon
                </div>
                <div style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>
                  We are documenting detailed client journeys. In the meantime, book a call to hear specific outcomes relevant to your industry.
                </div>
              </div>
            </div>
          </ScrollReveal>
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
                Want results like these?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                Book a call and we will map out exactly where AI, digital, and software can make the biggest difference for your business.
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
                Schedule a Consultation
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
