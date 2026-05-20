"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  Rocket, ShoppingCart, Activity, Cloud, BarChart2, Building2,
  Bot, MessageSquare, Cpu, Network,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const industries = [
  { label: "Startups",    icon: Rocket,       benefit: "Fast automation from day one" },
  { label: "E-commerce",  icon: ShoppingCart, benefit: "AI-driven conversion ops" },
  { label: "Healthcare",  icon: Activity,     benefit: "Patient workflow automation" },
  { label: "SaaS",        icon: Cloud,        benefit: "AI-native product development" },
  { label: "FinTech",     icon: BarChart2,    benefit: "Smart compliance & analytics" },
  { label: "Real Estate", icon: Building2,    benefit: "Automated lead & listing ops" },
];

const PIPELINE = [
  { label: "AI Employees & Agents",          icon: Bot,           desc: "Autonomous agents that recruit, train, and operate independently — handling complex tasks without human oversight." },
  { label: "Customer Interaction Automation", icon: MessageSquare, desc: "AI-powered responses across every channel, 24/7 — personalized at scale, indistinguishable from your best reps." },
  { label: "AI-Native Product Development",  icon: Cpu,           desc: "Software built with intelligence at its core — not bolted-on features, but AI as fundamental architecture." },
  { label: "Intelligent Workflow Systems",    icon: Network,       desc: "End-to-end process automation that learns from every execution and improves without manual reconfiguration." },
];


const hoverOn = (e: React.MouseEvent<HTMLDivElement>) =>
  (e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.14)");
const hoverOff = (e: React.MouseEvent<HTMLDivElement>) =>
  (e.currentTarget.style.boxShadow = "");

/* ── Animated chart: reveals left→right on scroll into view ── */
function AnimatedChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svgRef} className="w-full" viewBox="0 0 386 123" fill="none">
      <defs>
        <linearGradient id="growthGradient" x1="3" y1="15" x2="3" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(37,99,235,0.22)" />
          <stop offset="1" stopColor="rgba(37,99,235,0)" />
        </linearGradient>
        <clipPath id="chartClip">
          <rect
            x="0" y="0" height="123"
            width={revealed ? 386 : 0}
            style={{ transition: "width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          />
        </clipPath>
      </defs>
      <rect width="386" height="123" rx="10" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 123C3 123 30 96 40 98C50 100 58 106 65 104C74 102 80 88 88 88C96 84 102 96 108 94C116 92 120 76 128 78C136 76 146 88 152 86C158 84 168 64 174 66C180 66 190 75 196 73C204 71 214 52 220 54C228 52 238 62 244 60C252 58 262 42 268 44C276 42 286 52 292 50C300 48 312 30 318 33C326 31 338 40 344 38C352 36 374 18 383 20C383 60 383 123 383 123"
        fill="url(#growthGradient)"
        clipPath="url(#chartClip)"
      />
      <path
        d="M3 110C12 109 30 96 40 98C50 100 58 106 65 104C74 102 80 88 88 88C96 84 102 96 108 94C116 92 120 76 128 78C136 76 146 88 152 86C158 84 168 64 174 66C180 66 190 75 196 73C204 71 214 52 220 54C228 52 238 62 244 60C252 58 262 42 268 44C276 42 286 52 292 50C300 48 312 30 318 33C326 31 338 40 344 38C352 36 374 18 383 20"
        stroke="var(--accent)"
        strokeWidth="3"
        clipPath="url(#chartClip)"
      />
    </svg>
  );
}

/* ── Code typewriter for Custom Software card ── */
const CODE_LINES = [
  "async function build() {",
  "  const ai = new System();",
  "  await ai.configure({",
  "    scale: 'enterprise',",
  "  });",
  "  return ai.deploy();",
  "}",
];

const FULL_CODE = CODE_LINES.join("\n");

function tokenizeLine(line: string): React.ReactNode {
  const parts = line.split(/(\b(?:async|function|const|await|return|new)\b|'[^']*'|"[^"]*"|\d+)/g);
  return parts.map((part, i) => {
    if (/^(async|function|const|await|return|new)$/.test(part))
      return <span key={i} style={{ color: "#79c0ff" }}>{part}</span>;
    if (/^('[^']*'|"[^"]*")$/.test(part))
      return <span key={i} style={{ color: "#7ee787" }}>{part}</span>;
    if (/^\d+$/.test(part))
      return <span key={i} style={{ color: "#ffa657" }}>{part}</span>;
    return part;
  });
}

function CodeTypewriter() {
  const [count, setCount] = useState(0);
  const done = count >= FULL_CODE.length;

  useEffect(() => {
    if (done) return;
    const ch = FULL_CODE[count];
    const delay = ch === "\n" ? 90 : 42;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, done]);

  const lines = FULL_CODE.slice(0, count).split("\n");

  return (
    <>
      <style>{`@keyframes codeCursor{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <div
        style={{
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#161b22",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        </div>
        {/* Code */}
        <pre
          style={{
            margin: 0,
            padding: "16px 20px",
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: "11px",
            lineHeight: "1.8",
            color: "#e6edf3",
            minHeight: "120px",
            textAlign: "left",
          }}
        >
          {lines.map((line, i) => {
            const isLast = i === lines.length - 1;
            return (
              <div key={i}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    userSelect: "none",
                    marginRight: "14px",
                    fontSize: "10px",
                  }}
                >
                  {String(i + 1).padStart(2, " ")}
                </span>
                {tokenizeLine(line)}
                {isLast && !done && (
                  <span
                    style={{
                      animation: "codeCursor 1s step-end infinite",
                      color: "#79c0ff",
                    }}
                  >
                    ▋
                  </span>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </>
  );
}

/* ── AI-Powered Automation: animated pipeline ── */
function AutomationSection() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % PIPELINE.length), 2800);
    return () => clearInterval(id);
  }, []);

  const ActiveIcon = PIPELINE[active].icon;

  return (
    <div ref={sectionRef} style={{
      marginTop: "20px", borderRadius: "20px",
      background: "var(--bg-2)", border: "1px solid var(--border)",
      overflow: "hidden", position: "relative",
    }}>
      {/* Dot-grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(37,99,235,0.15) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.6,
      }} />
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: "420px", height: "420px", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)",
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-2"
        style={{ position: "relative", zIndex: 1, padding: "52px 56px", gap: "56px", alignItems: "center" }}>

        {/* ── Left: heading + live description ── */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px",
            opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(10px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}>
            <span style={{
              display: "inline-block", width: 8, height: 8, borderRadius: "50%",
              background: "rgba(37,99,235,1)", boxShadow: "0 0 10px rgba(37,99,235,0.9)",
              animation: "cap-blink 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
              AI-Powered Automation
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 700,
            lineHeight: 1.2, color: "var(--text-1)", marginBottom: "16px",
            opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(14px)",
            transition: "opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s",
          }}>
            Intelligence wired into<br />every operation
          </h2>

          <p style={{
            fontSize: "15px", lineHeight: 1.8, color: "var(--text-2)",
            maxWidth: "400px", marginBottom: "28px",
            opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(14px)",
            transition: "opacity 0.55s ease 0.16s, transform 0.55s ease 0.16s",
          }}>
            From AI agents that handle customer interactions to end-to-end workflow intelligence — measurable automation at your core.
          </p>

          {/* Active step live preview */}
          <div style={{
            padding: "18px 20px", borderRadius: "14px",
            background: "var(--accent-subtle)", border: "1px solid rgba(37,99,235,0.18)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.55s ease 0.24s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <ActiveIcon style={{ width: 14, height: 14, color: "var(--accent)", flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {PIPELINE[active].label}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.7, margin: 0 }}>
              {PIPELINE[active].desc}
            </p>
          </div>
        </div>

        {/* ── Right: vertical pipeline ── */}
        <div>
          {PIPELINE.map(({ label, icon: Icon }, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <div key={i} style={{ display: "flex" }}>
                {/* Dot + vertical connector */}
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  width: 20, flexShrink: 0, marginRight: 16, paddingTop: 16,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                    background: isActive ? "rgba(37,99,235,1)" : isPast ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.1)",
                    boxShadow: isActive ? "0 0 0 3px rgba(37,99,235,0.2), 0 0 14px rgba(37,99,235,0.8)" : "none",
                    transition: "all 0.4s ease",
                  }} />
                  {i < PIPELINE.length - 1 && (
                    <div style={{
                      flex: 1, width: 1, minHeight: 20, marginTop: 4,
                      background: isPast
                        ? "linear-gradient(180deg, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0.15) 100%)"
                        : "rgba(255,255,255,0.06)",
                      transition: "background 0.4s ease",
                    }} />
                  )}
                </div>

                {/* Step card */}
                <ScrollReveal delay={0.1 + i * 0.08} direction="right" style={{ flex: 1, marginBottom: i < PIPELINE.length - 1 ? 6 : 0 }}>
                  <div
                    onClick={() => setActive(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "13px 16px", borderRadius: 12, cursor: "pointer",
                      background: isActive ? "rgba(37,99,235,0.07)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(37,99,235,0.22)" : "transparent"}`,
                      transition: "background 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isActive ? "rgba(37,99,235,0.13)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.07)"}`,
                      transition: "all 0.3s ease",
                    }}>
                      <Icon style={{ width: 17, height: 17, color: isActive ? "var(--accent)" : "rgba(255,255,255,0.3)" }} strokeWidth={1.5} />
                    </div>
                    <span style={{
                      fontSize: 14, lineHeight: 1.35, flex: 1,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--text-1)" : "var(--text-2)",
                      transition: "all 0.3s ease",
                    }}>
                      {label}
                    </span>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: isActive ? "rgba(37,99,235,1)" : "transparent",
                      boxShadow: isActive ? "0 0 8px rgba(37,99,235,0.7)" : "none",
                      transition: "all 0.3s ease",
                    }} />
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@keyframes cap-blink { 0%,100%{opacity:1;} 50%{opacity:0.45;} }`}</style>
    </div>
  );
}

/* ── Industries We Serve: infinite marquee ── */
const MARQUEE_ITEMS = [...industries, ...industries];

function IndustriesSection() {
  return (
    <div style={{ marginTop: "20px" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999, marginBottom: 16,
            background: "var(--accent-subtle)", border: "1px solid rgba(37,99,235,0.2)",
          }}>
            <Users style={{ width: 13, height: 13, color: "var(--accent)" }} strokeWidth={2} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
              Industries We Serve
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 700,
            color: "var(--text-1)", marginBottom: 12, lineHeight: 1.25,
          }}>
            Built for every fast-moving industry
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.75, maxWidth: 460, margin: "0 auto" }}>
            Intelligent solutions where automation creates competitive advantage.
          </p>
        </div>
      </ScrollReveal>

      {/* Marquee */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, var(--bg), transparent)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to left, var(--bg), transparent)",
        }} />

        <div
          className="cap-marquee"
          style={{ display: "flex", gap: 14, animation: "cap-scroll 34s linear infinite", width: "max-content" }}
        >
          {MARQUEE_ITEMS.map(({ label, icon: Icon, benefit }, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0, width: 210, padding: "22px 20px", borderRadius: 16,
                background: "var(--bg-2)", border: "1px solid var(--border)",
                display: "flex", flexDirection: "column", gap: 14,
                transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(37,99,235,0.35)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 10px 28px rgba(37,99,235,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                background: "var(--accent-subtle)", border: "1px solid rgba(37,99,235,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ width: 19, height: 19, color: "var(--accent)" }} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 5 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.55 }}>{benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cap-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cap-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <SectionHeader
          label="Our Capabilities"
          title="Solutions That Drive Real Results"
          subtitle="We build intelligent systems across three core pillars — each designed to help your business operate smarter, grow faster, and scale with confidence."
        />

        <div className="relative z-10 grid grid-cols-6 gap-5 mt-20">

          {/* ── Card 1: AI Solutions (FEATURED) ─────────────────── */}
          <div className="col-span-full lg:col-span-2">
            <ScrollReveal className="h-full">
              <Card
                className="relative flex flex-col overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid rgba(37,99,235,0.35)",
                  boxShadow: "0 0 40px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
                  background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(37,99,235,0.07) 0%, transparent 70%), var(--bg-2)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), transparent)" }}
                />
                <CardContent
                  className="flex flex-1 flex-col justify-between text-center"
                  style={{ padding: "32px" }}
                >
                  {/* Top: badge + visual */}
                  <div className="flex flex-col items-center w-full">
                    <span
                      className="inline-flex items-center rounded-full text-[10px] font-semibold uppercase tracking-widest"
                      style={{
                        background: "var(--accent-subtle)",
                        border: "1px solid rgba(37,99,235,0.3)",
                        color: "var(--accent)",
                        padding: "6px 16px",
                        marginBottom: "20px",
                      }}
                    >
                      Core Service
                    </span>
                    <div className="w-full">
                      <CpuArchitecture text="AI" />
                    </div>
                  </div>
                  {/* Bottom: title + description */}
                  <div className="flex flex-col items-center" style={{ paddingTop: "20px", minHeight: "160px" }}>
                    <h2
                      className="text-xl font-bold tracking-tight text-center"
                      style={{ color: "var(--text-1)", marginBottom: "12px" }}
                    >
                      AI Solutions
                    </h2>
                    <p
                      className="text-sm max-w-52 text-center"
                      style={{ color: "var(--text-2)", lineHeight: 1.75 }}
                    >
                      Autonomous systems that replace repetitive roles and accelerate every part of your operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* ── Card 2: Digital Growth ───────────────────────────── */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2">
            <ScrollReveal delay={0.1} className="h-full">
              <Card
                className="relative flex flex-col overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                <CardContent
                  className="flex flex-1 flex-col justify-between text-center"
                  style={{ padding: "32px" }}
                >
                  {/* Top: chart */}
                  <div className="w-full">
                    <AnimatedChart />
                  </div>
                  {/* Bottom: title + description */}
                  <div className="flex flex-col items-center" style={{ paddingTop: "20px", minHeight: "160px" }}>
                    <h2
                      className="text-xl font-bold tracking-tight text-center"
                      style={{ color: "var(--text-1)", marginBottom: "12px" }}
                    >
                      Digital Growth
                    </h2>
                    <p className="text-sm max-w-52 text-center" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                      Platforms that strengthen your online presence and convert engagement into real business results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* ── Card 3: Custom Software ──────────────────────────── */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2">
            <ScrollReveal delay={0.2} className="h-full">
              <Card
                className="relative flex flex-col overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                <CardContent
                  className="flex flex-1 flex-col justify-between text-center"
                  style={{ padding: "32px" }}
                >
                  {/* Top: code terminal */}
                  <div className="w-full">
                    <CodeTypewriter />
                  </div>
                  {/* Bottom: title + description */}
                  <div className="flex flex-col items-center" style={{ paddingTop: "20px", minHeight: "160px" }}>
                    <h2
                      className="text-xl font-bold tracking-tight text-center"
                      style={{ color: "var(--text-1)", marginBottom: "12px" }}
                    >
                      Custom Software
                    </h2>
                    <p className="text-sm max-w-52 text-center" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                      Tailored systems built around your specific processes — automating workflows and enabling scalable growth.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

        </div>

        <AutomationSection />
        <IndustriesSection />

      </div>
    </section>
  );
}
