"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Megaphone,
  HeadphonesIcon,
  DollarSign,
  Settings,
  UserCheck,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ── Data ── */
const roles = [
  {
    id: "sales",
    title: "Sales AI Employee",
    subtitle: "The Prospector",
    icon: Users,
    color: "#2563EB",
    does: "Identifies and researches ideal prospects, crafts personalised outreach sequences, manages follow-up cadences, qualifies inbound leads and books meetings directly into your calendar.",
    replaces: "SDRs, BDRs, lead generation teams, appointment setters.",
    gains:
      "Your closers stop chasing cold leads and start showing up to warm conversations.",
  },
  {
    id: "marketing",
    title: "Marketing AI Employee",
    subtitle: "The Campaign Engine",
    icon: Megaphone,
    color: "#2563EB",
    does: "Plans and schedules content across your channels, manages campaign execution, monitors performance and produces regular reports with clear insights. Also handles email marketing, social scheduling and ad performance tracking.",
    replaces: "Marketing coordinators, content schedulers, campaign managers.",
    gains: "Your senior marketers spend their time on strategy, not execution.",
  },
  {
    id: "support",
    title: "Customer Support AI Employee",
    subtitle: "The First Responder",
    icon: HeadphonesIcon,
    color: "#2563EB",
    does: "Handles inbound customer queries across email, chat and messaging channels. Resolves common issues, escalates complex ones with full context, and ensures no query goes unanswered.",
    replaces: "First-line support agents, helpdesk coordinators.",
    gains:
      "Faster response times, happier customers, and a support team focused on the cases that actually need human judgement.",
  },
  {
    id: "finance",
    title: "Finance AI Employee",
    subtitle: "The Numbers Operator",
    icon: DollarSign,
    color: "#2563EB",
    does: "Monitors cashflow, generates financial summaries and reports, tracks invoices and payment status, flags anomalies and assists with budget tracking.",
    replaces: "Finance administrators, bookkeeping support, reporting analysts.",
    gains: "Real-time financial visibility without manual spreadsheet work.",
  },
  {
    id: "operations",
    title: "Operations AI Employee",
    subtitle: "The Process Keeper",
    icon: Settings,
    color: "#2563EB",
    does: "Monitors operational workflows, tracks KPIs across departments, manages task routing, ensures deadlines are tracked and escalates blockers before they become problems.",
    replaces: "Operations coordinators, project administrators.",
    gains:
      "An operations layer that runs quietly in the background, keeping everything moving.",
  },
  {
    id: "hr",
    title: "HR and Talent AI Employee",
    subtitle: "The People Coordinator",
    icon: UserCheck,
    color: "#2563EB",
    does: "Manages recruitment pipeline admin, candidate communication, interview scheduling, onboarding task management and internal HR documentation.",
    replaces: "HR coordinators, recruitment administrators.",
    gains:
      "A hiring process that is faster, more consistent and less admin-heavy.",
  },
];

const buildStages = [
  {
    week: "Week 1",
    title: "Role Mapping",
    desc: "We spend time understanding the role in detail. What decisions does it make? What inputs does it need? What does good output look like? What should it escalate?",
  },
  {
    week: "Week 1–2",
    title: "Integration Design",
    desc: "We map which of your existing tools and systems the AI Employee will connect to your CRM, inbox, calendar, reporting tools, communication platforms.",
  },
  {
    week: "Week 2–3",
    title: "Configuration and Training",
    desc: "We configure the AI Employee with your brand voice, business context, process logic and decision rules.",
  },
  {
    week: "Week 3–4",
    title: "Testing",
    desc: "We run the AI Employee in a controlled environment, test edge cases and refine responses until output quality meets the agreed standard.",
  },
  {
    week: "Week 4",
    title: "Deployment and Handover",
    desc: "We deploy to your live environment and give your team a full handover how to monitor, how to update instructions, and how to expand its scope over time.",
  },
];

/* ── Role Card (accordion) ── */
function RoleCard({ role }: { role: (typeof roles)[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = role.icon;
  return (
    <div
      style={{
        borderRadius: 18,
        border: `1px solid ${open ? `${role.color}40` : "var(--border)"}`,
        background: open ? `${role.color}08` : "var(--surface)",
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "22px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: `${role.color}18`,
            color: role.color,
            border: `1px solid ${role.color}30`,
          }}
        >
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--text-1)",
              fontFamily: "var(--font-heading)",
              marginBottom: 2,
            }}
          >
            {role.title}
          </div>
          <div style={{ fontSize: 13, color: role.color, fontWeight: 500 }}>
            {role.subtitle}
          </div>
        </div>
        <ChevronDown
          size={18}
          style={{
            color: "var(--text-3)",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            flexShrink: 0,
          }}
        />
      </button>

      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            padding: "0 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            { label: "What it does", text: role.does },
            { label: "Who it replaces or supports", text: role.replaces },
            { label: "What your team gets back", text: role.gains },
          ].map((item, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: role.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Build Stage ── */
function BuildStage({ stage, index }: { stage: (typeof buildStages)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          padding: "24px 28px",
          borderRadius: 18,
          background: hovered ? "var(--surface-hover)" : "var(--surface)",
          border: `1px solid ${hovered ? "rgba(37,99,235,0.2)" : "var(--border)"}`,
          transition: "all 0.3s ease",
          transform: hovered ? "translateX(6px)" : "none",
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
            flexShrink: 0,
            background: "var(--accent-subtle)",
            border: "1px solid rgba(37,99,235,0.2)",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--accent)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--text-1)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {stage.title}
            </h4>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(37,99,235,0.08)",
                color: "var(--accent)",
                fontWeight: 600,
                border: "1px solid rgba(37,99,235,0.15)",
              }}
            >
              {stage.week}
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
            {stage.desc}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Page ── */
export default function AIEmployeesPage() {
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
              "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,0.18), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "8%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 999,
                  background: "var(--accent-subtle)",
                  border: "1px solid rgba(37,99,235,0.25)",
                  fontSize: 11,
                  color: "var(--accent)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 32,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "pulse 2s infinite",
                  }}
                />
                AI Employees Flagship Product
              </div>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 76px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                marginBottom: 28,
              }}
            >
              <BlurText
                text="Your First AI Employee Is Ready to Start Monday."
                delay={0.1}
                wordDelay={0.038}
              />
            </h1>

            <ScrollReveal delay={0.5}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.9vw, 21px)",
                  color: "var(--text-2)",
                  maxWidth: 660,
                  margin: "0 auto 44px",
                  lineHeight: 1.75,
                }}
              >
                A Digital FTE (Full Time Equivalent) does not need onboarding
                months. It does not call in sick. It does not forget the process.
                And it starts delivering from day one.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "15px 36px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: "none",
                  boxShadow: "0 4px 32px rgba(37,99,235,0.4)",
                }}
              >
                See What They Can Do
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What Is An AI Employee ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <ScrollReveal>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 20,
                }}
              >
                The Concept Explained
              </span>
            </ScrollReveal>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.18,
                marginBottom: 36,
              }}
            >
              <BlurText text="What Exactly Is an AI Employee?" wordDelay={0.05} />
            </h2>

            {[
              "An AI Employee or Digital FTE is a fully configured, operationally ready AI system that takes on a defined role inside your business.",
              "This is not a chatbot sitting on your website answering FAQs. This is not a workflow trigger that sends an email when a form is filled in.",
              "A Digital FTE is built to perform a job. It has a scope of work. It makes decisions within that scope. It uses your tools, operates in your systems, communicates in your brand voice, and produces work your team can act on.",
              "Think of it as the equivalent of hiring a highly skilled team member except this one works 24 hours a day, scales without friction, and costs a fraction of a full-time salary.",
            ].map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    color: i === 0 ? "var(--text-1)" : "var(--text-2)",
                    lineHeight: 1.85,
                    marginBottom: 20,
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Digital FTE Roster ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 64px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 20,
                }}
              >
                The Digital FTE Roster
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Meet the Roles We Deploy
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7 }}>
                Click any role to see exactly what it does, who it supports, and
                what your team gets back.
              </p>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: 16,
            }}
          >
            {roles.map((role, i) => (
              <ScrollReveal key={role.id} delay={i * 0.07}>
                <RoleCard role={role} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Digital FTEs ── */}
      <section
        style={{
          padding: "80px 0",
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "48px 56px",
              borderRadius: 24,
              background: "var(--accent-subtle)",
              border: "1px solid rgba(37,99,235,0.2)",
              textAlign: "center",
            }}
          >
            <ScrollReveal>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.8vw, 36px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Don&apos;t see your role listed?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  marginBottom: 12,
                }}
              >
                Every business has unique operational roles that do not fit a
                standard template. If your biggest inefficiency is specific to
                how you work, we build a custom Digital FTE around it.
              </p>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                We have deployed AI Employees for bid writing, compliance
                monitoring, data enrichment, partner communications and more.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 32px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
                }}
              >
                Tell Us What You Need
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Build Process ── */}
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
                  marginBottom: 20,
                }}
              >
                Build Process
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                The Cloudex Build Process
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              maxWidth: 780,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {buildStages.map((stage, i) => (
              <BuildStage key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Framing ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 20,
                  }}
                >
                  ROI Framing
                </span>
                <h2
                  style={{
                    fontSize: "clamp(24px, 3.2vw, 44px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  The Business Case Is Simple
                </h2>
              </div>
            </ScrollReveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 20,
                marginBottom: 40,
              }}
            >
              {[
                {
                  label: "Traditional mid-level UK hire",
                  value: "£28k–45k/yr",
                  sub: "Before taxes, benefits, equipment, management time and recruitment fees",
                  highlight: false,
                },
                {
                  label: "A Digital FTE from Cloudex",
                  value: "Fraction of that",
                  sub: "No turnover, no sick days, no training from scratch every time someone leaves",
                  highlight: true,
                },
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div
                    style={{
                      padding: "36px 32px",
                      borderRadius: 20,
                      background: card.highlight
                        ? "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(37,99,235,0.04))"
                        : "var(--surface)",
                      border: card.highlight
                        ? "1px solid rgba(37,99,235,0.3)"
                        : "1px solid var(--border)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(26px, 3vw, 40px)",
                        fontWeight: 700,
                        color: card.highlight ? "var(--accent)" : "var(--text-1)",
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em",
                        marginBottom: 12,
                      }}
                    >
                      {card.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-2)",
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {card.label}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.65 }}>
                      {card.sub}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "20px 28px",
                  borderRadius: 14,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <CheckCircle
                  size={20}
                  style={{ color: "#2563EB", flexShrink: 0 }}
                />
                <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7 }}>
                  The businesses we work with typically see measurable efficiency
                  gains within the first{" "}
                  <strong style={{ color: "var(--text-1)" }}>30 days</strong> of
                  deployment.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="section"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.12), transparent 70%), var(--bg)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
            <ScrollReveal>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 50px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  marginBottom: 20,
                }}
              >
                <BlurText text="Ready to deploy your first AI Employee?" wordDelay={0.04} />
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 40,
                }}
              >
                Book a consultation and we will identify the highest-impact role
                for your business, map the deployment plan, and give you a clear
                picture of what day one looks like.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  borderRadius: 999,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: "none",
                  boxShadow: "0 6px 36px rgba(37,99,235,0.4)",
                }}
              >
                Book Your AI Consultation
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
