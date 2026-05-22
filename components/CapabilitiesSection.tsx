"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Bot, MessageSquare, Cpu, Network,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

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

/* ── Animated line chart (design-spec): draw-in + axes + grid + dots + tooltip ── */
function AnimatedChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pathLen, setPathLen] = useState(1600);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDrawn(true), 60);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [drawn]);

  const points = [18, 25, 28, 38, 52, 65];
  const xLabels = ["Jan", "Mar", "May", "Jul", "Oct", "Dec"];
  const yUnit = "%";

  const W = 520, H = 360;
  const pad = { top: 24, right: 24, bottom: 48, left: 56 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const niceMin = Math.floor(Math.min(...points) / 10) * 10;
  const niceMax = Math.ceil(Math.max(...points) / 10) * 10;
  const niceRange = niceMax - niceMin || 1;

  const toX = (i: number) => pad.left + (i / (points.length - 1)) * cw;
  const toY = (v: number) => pad.top + ch - ((v - niceMin) / niceRange) * ch;

  const linePath = (() => {
    const pts = points.map((v, i) => [toX(i), toY(v)]);
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      const cpx = (x0 + x1) / 2;
      d += ` C ${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
    }
    return d;
  })();

  const areaPath = `${linePath} L ${toX(points.length - 1)},${pad.top + ch} L ${toX(0)},${pad.top + ch} Z`;
  const yTickVals = Array.from({ length: 6 }, (_, i) => niceMin + (niceRange / 5) * i);

  const tok = isDark
    ? { chartBg: "#111832", textSec: "#8694b2", axisLine: "#1e2a4a", gridLine: "#151d35", dotFill: "#080c18" }
    : { chartBg: "#f4f6fb", textSec: "#6b7280", axisLine: "#d1d5db", gridLine: "#e8ebf0", dotFill: "#ffffff" };

  const ANIM = 2000;
  const cellW = cw / (points.length - 1);

  return (
    <div style={{ background: tok.chartBg, borderRadius: 14, padding: "8px 0 0 0", overflow: "hidden" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        style={{ display: "block" }}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="cx-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={isDark ? 0.25 : 0.18} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
          {isDark && (
            <filter id="cx-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          )}
        </defs>

        {/* Grid lines */}
        {yTickVals.map((v, i) => (
          <line key={i} x1={pad.left} y1={toY(v)} x2={W - pad.right} y2={toY(v)}
            stroke={tok.gridLine} strokeWidth={1} strokeDasharray="4 4" />
        ))}

        {/* Axes */}
        <line x1={pad.left} y1={pad.top + ch} x2={W - pad.right} y2={pad.top + ch} stroke={tok.axisLine} strokeWidth={1} />
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + ch} stroke={tok.axisLine} strokeWidth={1} />

        {/* Y labels */}
        {yTickVals.map((v, i) => (
          <text key={i} x={pad.left - 10} y={toY(v) + 4} textAnchor="end"
            fill={tok.textSec} fontSize={14} fontFamily="'DM Sans', sans-serif">
            {Math.round(v)}{yUnit}
          </text>
        ))}

        {/* X labels */}
        {xLabels.map((l, i) => (
          <text key={i} x={toX(i)} y={pad.top + ch + 24} textAnchor="middle"
            fill={tok.textSec} fontSize={14} fontFamily="'DM Sans', sans-serif">
            {l}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#cx-area-grad)"
          style={{ opacity: drawn ? 1 : 0, transition: `opacity ${ANIM * 0.6}ms ease ${ANIM * 0.4}ms` }} />

        {/* Animated line */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={isDark ? "url(#cx-line-glow)" : undefined}
          style={{
            strokeDasharray: pathLen,
            strokeDashoffset: drawn ? 0 : pathLen,
            transition: `stroke-dashoffset ${ANIM}ms cubic-bezier(0.4,0,0.2,1)`,
          }}
        />

        {/* Data dots */}
        {points.map((v, i) => (
          <circle key={i}
            cx={toX(i)} cy={toY(v)}
            r={hoverIdx === i ? 6 : 3.5}
            fill={hoverIdx === i ? "var(--accent)" : tok.dotFill}
            stroke="var(--accent)" strokeWidth={2}
            style={{
              opacity: drawn ? 1 : 0,
              transition: `opacity 0.3s ease ${(i / (points.length - 1)) * ANIM}ms`,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}

        {/* Hover tooltip */}
        {hoverIdx !== null && (() => {
          const px = toX(hoverIdx), py = toY(points[hoverIdx]);
          const tW = 70, tH = 34;
          let tx = Math.min(Math.max(px - tW / 2, pad.left), W - pad.right - tW);
          let ty = py - tH - 12;
          if (ty < 4) ty = py + 16;
          const tooltipBg = isDark ? "#1a2340" : "#ffffff";
          const tooltipBorder = isDark ? "#283556" : "#e5e7eb";
          const valColor = isDark ? "#ffffff" : "#111827";
          return (
            <g>
              <line x1={px} y1={py + 8} x2={px} y2={pad.top + ch}
                stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
              <rect x={tx} y={ty} width={tW} height={tH} rx={8}
                fill={tooltipBg} stroke={tooltipBorder} strokeWidth={1} />
              <text x={tx + tW / 2} y={ty + 14} textAnchor="middle"
                fill={tok.textSec} fontSize={10} fontFamily="'DM Sans', sans-serif">
                {xLabels[hoverIdx]}
              </text>
              <text x={tx + tW / 2} y={ty + 27} textAnchor="middle"
                fill={valColor} fontSize={13} fontWeight={600} fontFamily="'DM Sans', sans-serif">
                {points[hoverIdx]}{yUnit}
              </text>
            </g>
          );
        })()}

        {/* Invisible hover hit zones */}
        {points.map((_, i) => (
          <rect key={`hit-${i}`}
            x={toX(i) - cellW / 2} y={pad.top}
            width={cellW} height={ch}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
            style={{ cursor: "crosshair" }}
          />
        ))}
      </svg>
    </div>
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

      </div>
    </section>
  );
}
