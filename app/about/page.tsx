"use client";
import { useState } from "react";
import Link from "next/link";
import { Target, Eye, TrendingUp, Users, Heart, Handshake } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";

const values = [
  {
    title: "Honesty over sales",
    desc: "We will tell you when something is not the right fit even if that means turning down work.",
    icon: Heart,
    color: "var(--accent)",
  },
  {
    title: "Depth over breadth",
    desc: "We focus on three capabilities and we go deep. You get expertise, not generalism.",
    icon: Target,
    color: "var(--accent)",
  },
  {
    title: "Partnership over transaction",
    desc: "The businesses we serve grow over time. Our relationships grow with them.",
    icon: Handshake,
    color: "var(--accent)",
  },
  {
    title: "Results over activity",
    desc: "We measure success by what changes in your business, not by how much we delivered.",
    icon: TrendingUp,
    color: "var(--accent)",
  },
];

function ValueCard({
  title,
  desc,
  icon: Icon,
  color,
}: (typeof values)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 32,
        borderRadius: 20,
        background: hovered ? "var(--surface-hover)" : "var(--surface)",
        border: "1px solid var(--border)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "var(--card-shadow)" : "none",
        cursor: "default",
        width: "100%",
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
          marginBottom: 20,
          background: `${color}14`,
          color,
          border: `1px solid ${color}28`,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 10,
          color,
          fontFamily: "var(--font-heading)",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>{desc}</p>
    </div>
  );
}

export default function AboutPage() {
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
        <PageHeroBackground />
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: 80,
            paddingBottom: 80,
          }}
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
                About Cloudex
              </span>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(34px, 5.5vw, 68px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 32,
              }}
            >
              <BlurText
                text="We started Cloudex because too many businesses were being left behind."
                delay={0.1}
                wordDelay={0.038}
              />
            </h1>

            <ScrollReveal delay={0.45}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 700,
                  margin: "0 auto 24px",
                }}
              >
                The tools that give large enterprises a competitive edge AI,
                intelligent automation, world-class digital infrastructure were
                out of reach for most businesses. Either too expensive, too complex,
                or locked inside agencies that did not fully understand how
                businesses actually operate.
              </p>
              <p
                style={{
                  fontSize: "clamp(17px, 1.8vw, 21px)",
                  color: "var(--text-1)",
                  fontWeight: 600,
                  lineHeight: 1.7,
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                We built Cloudex to change that.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 72,
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
                Who We Are
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.2,
                  marginBottom: 28,
                }}
              >
                <BlurText
                  text="A team of builders, strategists, and problem solvers."
                  wordDelay={0.04}
                />
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Cloudex Technologies is a UK-based technology company specialising
                in AI workforce solutions, digital growth, and custom software
                development.
              </p>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                }}
              >
                We work with founders, directors, and operations leaders who are
                serious about growth and who want a technology partner, not just
                a vendor.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  { label: "UK-Based", value: "100%" },
                  { label: "Core Capabilities", value: "3" },
                  { label: "Industries Served", value: "10+" },
                  { label: "Outcome-Driven", value: "Always" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "28px 20px",
                      borderRadius: 18,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(28px, 3vw, 40px)",
                        fontWeight: 700,
                        color: "var(--accent)",
                        fontFamily: "var(--font-heading)",
                        marginBottom: 6,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-3)",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 24,
                }}
              >
                Our Philosophy
              </span>
            </ScrollReveal>

            <h2
              style={{
                fontSize: "clamp(26px, 3.8vw, 54px)",
                fontWeight: 700,
                letterSpacing: "-0.028em",
                lineHeight: 1.15,
                marginBottom: 36,
              }}
            >
              <BlurText
                text="We build things that work. Quietly. Consistently. Measurably."
                wordDelay={0.042}
              />
            </h2>

            <ScrollReveal delay={0.3}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.7vw, 19px)",
                  color: "var(--text-2)",
                  lineHeight: 1.85,
                  marginBottom: 20,
                }}
              >
                We are not interested in impressive demos that do not translate to
                real results. We are not impressed by technology for its own sake.
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.7vw, 19px)",
                  color: "var(--text-2)",
                  lineHeight: 1.85,
                }}
              >
                What drives us is the moment when a client tells us their team has
                stopped wasting three hours a day on something we automated. Or
                when their phone starts ringing from website visitors who would
                have gone to a competitor six months ago.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
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
                What We Stand For
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1} style={{ display: "flex" }}>
                <ValueCard {...v} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
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
                  fontSize: "clamp(22px, 2.8vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 18,
                }}
              >
                Ready to work with us?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                Book a call and we will map out exactly where AI, digital, and
                software can make the biggest difference for you.
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
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(37,99,235,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 28px rgba(37,99,235,0.35)";
                }}
              >
                Book a Call
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
