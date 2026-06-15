"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot, MessageSquare, Cpu, Network, Settings, Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { RobotMonitor } from "@/components/ui/RobotMonitor";
import { Card, CardContent } from "@/components/ui/card";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const ROSTER = [
  {
    id: "sales",
    role: "Sales AI Employee",
    nickname: "The Prospector",
    icon: Bot,
    color: "#2563eb",
    does: "Identifies and researches ideal prospects, crafts personalised outreach sequences, manages follow-up cadences, qualifies inbound leads and books meetings directly into your calendar.",
    replaces: "SDRs, BDRs, lead generation teams, appointment setters",
    teamGetsBack: "Your closers stop chasing cold leads and start showing up to warm conversations.",
  },
  {
    id: "marketing",
    role: "Marketing AI Employee",
    nickname: "The Campaign Engine",
    icon: MessageSquare,
    color: "#2563eb",
    does: "Plans and schedules content across your channels, manages campaign execution, monitors performance and produces regular reports with clear insights.",
    replaces: "Marketing coordinators, content schedulers, campaign managers",
    teamGetsBack: "Your senior marketers spend their time on strategy, not execution.",
  },
  {
    id: "support",
    role: "Customer Support AI Employee",
    nickname: "The First Responder",
    icon: Cpu,
    color: "#2563eb",
    does: "Handles inbound customer queries across email, chat and messaging channels. Resolves common issues, escalates complex ones with full context, and ensures no query goes unanswered.",
    replaces: "First-line support agents, helpdesk coordinators",
    teamGetsBack: "Faster response times, happier customers, and a support team focused on cases that need human judgement.",
  },
  {
    id: "finance",
    role: "Finance AI Employee",
    nickname: "The Numbers Operator",
    icon: Network,
    color: "#2563eb",
    does: "Monitors cashflow, generates financial summaries and reports, tracks invoices and payment status, flags anomalies and assists with budget tracking.",
    replaces: "Finance administrators, bookkeeping support, reporting analysts",
    teamGetsBack: "Real-time financial visibility without manual spreadsheet work.",
  },
  {
    id: "operations",
    role: "Operations AI Employee",
    nickname: "The Process Keeper",
    icon: Settings,
    color: "#2563eb",
    does: "Monitors operational workflows, tracks KPIs across departments, manages task routing, ensures deadlines are tracked and escalates blockers before they become problems.",
    replaces: "Operations coordinators, project administrators",
    teamGetsBack: "An operations layer that runs quietly in the background, keeping everything moving.",
  },
  {
    id: "hr",
    role: "HR and Talent AI Employee",
    nickname: "The People Coordinator",
    icon: Users,
    color: "#2563eb",
    does: "Manages recruitment pipeline admin, candidate communication, interview scheduling, onboarding task management and internal HR documentation.",
    replaces: "HR coordinators, recruitment administrators",
    teamGetsBack: "A hiring process that is faster, more consistent and less admin-heavy.",
  },
];

const STATS = [
  { value: "24/7", label: "Always on", pulse: true },
  { value: "1 Day", label: "To deploy", pulse: false },
  { value: "0", label: "Sick days", pulse: false },
  { value: "£28K+", label: "Saved vs a hire", pulse: false },
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

/* ── Role card ── */
type RosterItem = typeof ROSTER[0];

function RoleCard({ item, index }: { item: RosterItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const Icon = item.icon;
  const num = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
  };

  return (
    <Link href={`/capabilities/ai-employees?role=${item.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -7 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        borderRadius: 18,
        background: "var(--bg-2)",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.38)" : "rgba(37,99,235,0.1)"}`,
        overflow: "hidden",
        cursor: "pointer",
        padding: "26px 24px 22px",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 24px 64px rgba(37,99,235,0.1), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "border-color 0.3s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Mouse-tracked radial spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(380px circle at ${spot.x}% ${spot.y}%, rgba(37,99,235,0.07), transparent 55%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Top shimmer line on hover */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s ease",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Top row: large number + icon */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
          {/* Ghost index number */}
          <span style={{
            fontSize: "clamp(38px, 3.8vw, 54px)", fontWeight: 900,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.05em", lineHeight: 1,
            color: hovered ? "rgba(37,99,235,0.42)" : "rgba(37,99,235,0.1)",
            transition: "color 0.35s ease",
            userSelect: "none",
          }}>
            {num}
          </span>

          {/* Icon with dashed orbital ring */}
          <div style={{ position: "relative", width: 46, height: 46, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              border: `1px dashed rgba(37,99,235,${hovered ? "0.5" : "0.18"})`,
              transition: "border-color 0.35s ease",
              animationName: hovered ? "cx-ring-spin" : "none",
              animationDuration: "4s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }} />
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: hovered ? "rgba(37,99,235,0.1)" : "rgba(37,99,235,0.05)",
              boxShadow: hovered ? "0 0 22px rgba(37,99,235,0.22)" : "none",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
            }}>
              <Icon style={{ width: 20, height: 20, color: "var(--accent)" }} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Role name */}
        <div style={{
          fontSize: 15, fontWeight: 700, fontFamily: "var(--font-heading)",
          color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8,
          transition: "color 0.2s ease",
        }}>
          {item.role}
        </div>

        {/* Nickname — monospace chip */}
        <span style={{
          display: "inline-block", marginBottom: 16,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--accent)",
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          padding: "3px 9px", borderRadius: 5,
          background: "rgba(37,99,235,0.07)",
          border: "1px solid rgba(37,99,235,0.18)",
        }}>
          {item.nickname}
        </span>

        {/* Description */}
        <p style={{
          fontSize: 13, lineHeight: 1.8, color: "var(--text-2)",
          margin: 0, marginBottom: 18, flex: 1,
        }}>
          {item.does}
        </p>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: 14,
          background: "linear-gradient(90deg, rgba(37,99,235,0.3) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0.35,
          transition: "opacity 0.3s ease",
        }} />

        {/* Footer: role chips */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {item.replaces.split(", ").slice(0, 2).map((r, i) => (
            <span key={i} style={{
              fontSize: 10, padding: "2px 7px", borderRadius: 4,
              background: "var(--bg)", border: "1px solid var(--border)",
              color: "var(--text-2)", whiteSpace: "nowrap",
            }}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

/* ── Stat chip ── */
function StatChip({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.07, ease: "easeOut" }}
      style={{
        padding: "18px 16px",
        borderRadius: 14,
        background: "rgba(37,99,235,0.06)",
        border: "1px solid rgba(37,99,235,0.16)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
        {stat.pulse && (
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e80",
            flexShrink: 0,
            animation: "cx-pulse-dot 2s ease infinite",
          }} />
        )}
        <span style={{
          fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800,
          fontFamily: "var(--font-heading)",
          color: "var(--text-1)", letterSpacing: "-0.02em",
        }}>
          {stat.value}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 500, letterSpacing: "0.04em" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ── AI Employee showcase ── */
function AutomationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <div ref={sectionRef} style={{
      marginTop: 64, position: "relative",
    }}>
      {/* Dot-grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)",
        backgroundSize: "30px 30px", opacity: 0.55,
      }} />
      {/* Top-right glow */}
      <div style={{
        position: "absolute", top: -100, right: -80,
        width: 480, height: 480, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 60%)",
      }} />
      {/* Bottom-left glow */}
      <div style={{
        position: "absolute", bottom: -80, left: -60,
        width: 360, height: 360, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Top: copy + stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5" style={{ gap: "clamp(32px,4vw,52px)", alignItems: "stretch", marginBottom: "clamp(36px,5vw,52px)" }}>

          {/* Left: heading + body + CTA */}
          <div className="lg:col-span-3" style={{ display: "flex", flexDirection: "column" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                AI Employees
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 800,
                lineHeight: 1.1, color: "var(--text-1)",
                marginBottom: 18, letterSpacing: "-0.03em",
              }}
            >
              Meet Your New<br />AI Employee
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-2)", maxWidth: 500, marginBottom: 10 }}
            >
              Think about what your best team member does on their best day. Now imagine that happening consistently, across every department, 24 hours a day.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-2)", maxWidth: 500, marginBottom: 32 }}
            >
              Not a chatbot. Not a simple automation. A fully operational Digital FTE that slots into your team and gets to work without adding to your payroll pressure.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 }}
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-2)", maxWidth: 500, marginBottom: 10 }}
            >
              Each AI Employee is built around a specific role inside your business. It knows the tools your team uses, the language your brand speaks, and the processes that keep your operations running. The result is an agent that behaves like a trained member of your team — not a generic assistant learning on the job.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.32 }}
              style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-2)", maxWidth: 500, marginBottom: 32 }}
            >
              Unlike hiring, there is no probation period, no performance plateau, and no quiet quitting. Your AI Employee runs every task to the same standard, every time — while your human team focuses on the decisions that actually need a person.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.38 }}
              whileHover={{ y: -2 }}
              style={{ display: "inline-block" }}
            >
              <a
                href="/capabilities/ai-employees"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 26px", borderRadius: 10,
                  background: "var(--accent)", color: "#fff",
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#1d4ed8";
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(37,99,235,0.55)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(37,99,235,0.35)";
                }}
              >
                See What an AI Employee Can Do
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: cursor robot + stats below */}
          <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Spline interactive robot */}
            <div style={{
              width: "100%", height: 380,
              borderRadius: 16, overflow: "hidden",
              background: "var(--bg-2)",
              borderBottom: "1px solid var(--border)",
            }}>
              <RobotMonitor />
            </div>
            {/* Stats 2×2 */}
            <div className="grid grid-cols-2" style={{ gap: 12 }}>
              {STATS.map((stat, i) => <StatChip key={i} stat={stat} index={i} />)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: "clamp(28px,4vw,44px)",
          background: "linear-gradient(90deg, transparent, var(--border), transparent)",
        }} />

        {/* ── Role cards grid ── */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 18 }}
          >
            The Digital FTE Roster
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
            {ROSTER.map((item, i) => <RoleCard key={i} item={item} index={i} />)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cap-blink { 0%,100%{opacity:1;} 50%{opacity:0.45;} }
        @keyframes cx-pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.55;transform:scale(0.88);} }
        @keyframes cx-ring-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
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
          title="Three Capabilities. One Partner."
          subtitle="We combine AI-powered workforce solutions, digital growth expertise, and purpose-built software so you can stop patching problems and start scaling properly."
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
                      Deploy intelligent AI Employees that handle your sales outreach, customer queries, financial reporting, marketing execution and more around the clock, without error.
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
                      We build high-converting business websites and drive search visibility so your ideal clients find you before they find anyone else.
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
                      No off-the-shelf compromise. We design and build software tailored to how your business actually works.
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
