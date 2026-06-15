"use client";
import { useState } from "react";
import Link from "next/link";

/* ── Data ── */
const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare & MedTech",
    tagline: "AI and technology built for healthcare",
    desc: "Automate patient intake, scheduling, and follow-ups while maintaining full compliance. Reduce admin overhead so your clinical team can focus on patient outcomes.",
    href: "/industries/healthcare",
    stats: [
      { value: "40%", label: "Admin Reduced" },
      { value: "99%",  label: "Uptime SLA" },
      { value: "24/7", label: "AI Coverage" },
    ],
  },
  {
    id: "finance",
    name: "Financial Services",
    tagline: "Move faster without taking on more risk",
    desc: "Streamline regulatory compliance, automate financial reporting, and unlock real-time analytics. AI Employees that monitor cashflow, flag anomalies and generate reports around the clock.",
    href: "/industries/finance",
    stats: [
      { value: "10x",   label: "Faster Processing" },
      { value: "47%",   label: "Cost Reduction" },
      { value: "99.9%", label: "Compliance Rate" },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    tagline: "More customers. Fewer dropped balls.",
    desc: "Maximise every touchpoint with intelligent AI Employees handling customer support, cart recovery, and campaign execution. Your operations run 24/7 without adding headcount.",
    href: "/industries/ecommerce",
    stats: [
      { value: "34%",  label: "Revenue Lift" },
      { value: "2.5x", label: "Conv. Rate" },
      { value: "89%",  label: "Retention" },
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    tagline: "Technology that keeps deals moving",
    desc: "Capture, qualify, and nurture leads automatically. AI Employees handle prospecting, outreach sequences, and appointment booking so your agents focus on closing.",
    href: "/industries/real-estate",
    stats: [
      { value: "3x",   label: "Lead Volume" },
      { value: "60%",  label: "Time Saved" },
      { value: "24/7", label: "Response Time" },
    ],
  },
  {
    id: "saastech",
    name: "SaaS & Technology",
    tagline: "We speak your language",
    desc: "From AI-native product development to custom integrations and data pipelines — we build with the same stack you use and understand the operational realities of scaling a tech business.",
    href: "/industries/saas-tech",
    stats: [
      { value: "5x",   label: "Ship Velocity" },
      { value: "70%",  label: "Ops Automated" },
      { value: "<1hr", label: "Setup Time" },
    ],
  },
  {
    id: "legal",
    name: "Legal & Professional Services",
    tagline: "Deliver more, stretch less",
    desc: "AI Employees that handle document processing, client intake, billing administration, and research tasks — so your fee-earners spend their time on work that actually bills.",
    href: "/industries/legal",
    stats: [
      { value: "65%", label: "Admin Cut" },
      { value: "3x",  label: "Capacity" },
      { value: "0",   label: "Dropped tasks" },
    ],
  },
  {
    id: "education",
    name: "Education & EdTech",
    tagline: "Better outcomes, less admin",
    desc: "Automate enrolment, student communications, and reporting workflows. AI Employees that support learners around the clock without expanding your operations team.",
    href: "/industries/education",
    stats: [
      { value: "50%", label: "Admin Saved" },
      { value: "24/7", label: "Student Support" },
      { value: "2x",  label: "Enrolment Speed" },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Travel",
    tagline: "Excellent operations, every time",
    desc: "From booking and guest communication to review management and upsell campaigns — AI Employees that keep every touchpoint sharp without adding to your payroll.",
    href: "/industries/hospitality",
    stats: [
      { value: "4.9★", label: "Avg Rating" },
      { value: "80%",  label: "Queries Resolved" },
      { value: "24/7", label: "Guest Coverage" },
    ],
  },
];

/* ── Icons ── */
function Icon({ id }: { id: string }) {
  const s = { width: 22, height: 22, fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "healthcare":   return <svg {...s} viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
    case "finance":      return <svg {...s} viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
    case "ecommerce":    return <svg {...s} viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
    case "realestate":   return <svg {...s} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "saastech":     return <svg {...s} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "legal":        return <svg {...s} viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case "education":    return <svg {...s} viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case "hospitality":  return <svg {...s} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>;
    default: return null;
  }
}

/* ── Row ── */
function AccordionRow({ industry, index, open, onToggle }: {
  industry: typeof INDUSTRIES[0];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: open ? "var(--surface)" : "var(--bg)",
        border: open ? "1px solid rgba(37,99,235,0.28)" : "1px solid var(--border)",
        boxShadow: open ? "0 26px 60px -30px rgba(37,99,235,0.28)" : "0 1px 2px rgba(0,0,0,0.03)",
        transition: "background .4s ease, border-color .4s ease, box-shadow .4s ease",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, var(--accent), #60a5fa)",
        transform: open ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .55s cubic-bezier(.16,1,.3,1)",
      }} />

      {/* Header button */}
      <button
        onClick={onToggle}
        style={{
          all: "unset",
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 20,
          width: "100%",
          padding: "22px 26px",
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 15,
          color: open ? "var(--accent)" : "var(--text-3)",
          minWidth: 24,
          transition: "color .35s ease",
          flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon box */}
        <div style={{
          flexShrink: 0,
          width: 48, height: 48,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          color: open ? "#ffffff" : "var(--accent)",
          background: open
            ? "linear-gradient(135deg, var(--accent), #60a5fa)"
            : "rgba(37,99,235,0.09)",
          boxShadow: open ? "0 12px 24px -10px rgba(37,99,235,0.6)" : "none",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
        }}>
          <Icon id={industry.id} />
        </div>

        {/* Title + tagline */}
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: 19,
            color: "var(--text-1)",
            letterSpacing: "-0.01em",
          }}>
            {industry.name}
          </div>
          <div style={{
            fontSize: 14,
            color: "var(--text-3)",
            marginTop: 3,
            fontFamily: "var(--font-body)",
          }}>
            {industry.tagline}
          </div>
        </div>

        {/* Chevron */}
        <div style={{
          flexShrink: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          color: open ? "#ffffff" : "var(--text-3)",
          background: open ? "var(--accent)" : "var(--surface)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expandable panel */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows .5s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transition: "opacity .45s ease",
          transitionDelay: open ? ".08s" : "0s",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: 36,
            padding: "4px 28px 30px 90px",
            fontFamily: "var(--font-body)",
          }}>
            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "center" }}>
              <p style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--text-2)",
                margin: 0,
              }}>
                {industry.desc}
              </p>
              <Link
                href={industry.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Explore {industry.name}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 12 }}>
              {industry.stats.map((stat, si) => (
                <div
                  key={si}
                  style={{
                    flex: 1,
                    padding: "16px 16px 18px",
                    borderRadius: 14,
                    background: "rgba(37,99,235,0.055)",
                    border: "1px solid rgba(37,99,235,0.10)",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)",
                    transitionDelay: open ? (0.14 + si * 0.07) + "s" : "0s",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--text-3)",
                    marginTop: 9,
                    textTransform: "uppercase",
                    fontFamily: "var(--font-heading)",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
export function IndustriesSection() {
  const [open, setOpen] = useState(0);

  const toggle = (i: number) => setOpen(prev => prev === i ? -1 : i);

  return (
    <section className="section" style={{ position: "relative", overflow: "hidden", background: "var(--bg)" }}>
      {/* Pulsing radial glow */}
      <div style={{
        position: "absolute",
        top: -80, left: "50%",
        transform: "translateX(-50%)",
        width: 760, height: 420,
        background: "radial-gradient(60% 60% at 50% 40%, rgba(37,99,235,0.07), rgba(37,99,235,0) 70%)",
        pointerEvents: "none",
        animation: "ia-glow 7s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes ia-glow { 0%,100% { opacity:.55; } 50% { opacity:.95; } }
      `}</style>

      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 56px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 999,
            background: "rgba(37,99,235,0.07)",
            border: "1px solid rgba(37,99,235,0.16)",
            marginBottom: 26,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}>
              Industries We Serve
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(30px, 4vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
            margin: "0 0 20px",
          }}>
            We work across the industries<br />that move the economy.
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--text-2)",
            margin: 0,
          }}>
            Generic solutions produce generic results. We bring specific knowledge of the challenges,
            regulations, and operational realities of each industry we serve.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 1080, margin: "0 auto" }}>
          {INDUSTRIES.map((ind, i) => (
            <AccordionRow
              key={ind.id}
              industry={ind}
              index={i}
              open={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
