import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Heart, DollarSign, ShoppingBag, Home, Scale, Code2, GraduationCap, Hotel,
  ArrowRight, CheckCircle
} from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const industries: Record<string, {
  name: string;
  tagline: string;
  intro: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  color: string;
  challenges: string[];
  howWeHelp: { title: string; desc: string }[];
  cta: string;
  ctaLabel: string;
}> = {
  healthcare: {
    name: "Healthcare",
    tagline: "AI and technology that helps practices deliver better care without burning out the people providing it.",
    intro: "Healthcare professionals spend too much time on administration and not enough on patients. We build AI and software solutions that flip that ratio.",
    icon: Heart,
    color: "#e35d6a",
    challenges: [
      "Admin workload consuming clinical hours",
      "Patient communication that falls through the cracks",
      "Repetitive scheduling and triage tasks",
      "Data scattered across systems",
    ],
    howWeHelp: [
      { title: "AI Intake and Triage", desc: "Automate patient intake, symptom collection, and routing so your staff focus on care." },
      { title: "Appointment Automation", desc: "Reduce no-shows and manual scheduling with intelligent booking and reminder systems." },
      { title: "Admin AI Employees", desc: "Digital staff that handle referrals, follow-ups, and documentation around the clock." },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Healthcare AI",
  },
  finance: {
    name: "Financial Services",
    tagline: "Move faster without more risk. AI and automation for regulated financial businesses.",
    intro: "Financial services firms face growing regulatory demands, client expectations, and competitive pressure. We help you automate the manageable and focus on the strategic.",
    icon: DollarSign,
    color: "#2563EB",
    challenges: [
      "Compliance documentation that consumes adviser time",
      "Manual onboarding and KYC processes",
      "Client communication at scale",
      "Data analysis that still relies on spreadsheets",
    ],
    howWeHelp: [
      { title: "Compliance Automation", desc: "Automate document generation, review, and audit trails to reduce compliance burden." },
      { title: "Client AI Employees", desc: "Digital relationship managers that keep clients informed and engaged 24/7." },
      { title: "Data Intelligence", desc: "Custom dashboards and AI tools that surface insights from your data automatically." },
    ],
    cta: "/contact",
    ctaLabel: "Explore Financial AI Solutions",
  },
  ecommerce: {
    name: "E-Commerce",
    tagline: "More customers. Fewer dropped balls. AI and software that keeps your store growing.",
    intro: "E-commerce growth creates operational complexity more orders, more queries, more moving parts. We automate the complexity so you can scale without the growing pains.",
    icon: ShoppingBag,
    color: "#7c3aed",
    challenges: [
      "Customer support volume overwhelming the team",
      "Cart abandonment and poor conversion rates",
      "Inventory and fulfilment coordination",
      "Post-purchase experience and retention",
    ],
    howWeHelp: [
      { title: "AI Customer Support", desc: "An AI employee that handles returns, queries, and tracking 24/7 in your brand voice." },
      { title: "Conversion Optimisation", desc: "Website and funnel improvements that measurably increase the percentage of visitors who buy." },
      { title: "Operations Automation", desc: "Connect your store, warehouse, and logistics so orders flow without manual intervention." },
    ],
    cta: "/contact",
    ctaLabel: "Grow Your Store With AI",
  },
  "real-estate": {
    name: "Real Estate",
    tagline: "Keep deals moving. AI tools that handle the admin so your agents can focus on relationships.",
    intro: "Property is a relationship business. But too much of the day gets swallowed by follow-ups, paperwork, and chasing. We fix that.",
    icon: Home,
    color: "#059669",
    challenges: [
      "Lead follow-up that falls behind",
      "Viewings and valuations that need constant coordination",
      "Client communication across long transaction timelines",
      "Documentation and compliance paperwork",
    ],
    howWeHelp: [
      { title: "AI Lead Nurturing", desc: "An AI employee that follows up, qualifies, and books appointments automatically." },
      { title: "Client Communication AI", desc: "Keep buyers and sellers updated throughout transactions without manual check-ins." },
      { title: "Property Management Tools", desc: "Custom software that tracks properties, clients, and deals in one place." },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Real Estate AI",
  },
  legal: {
    name: "Legal & Professional Services",
    tagline: "Deliver more. Stretch less. AI and automation that gives your team capacity back.",
    intro: "Legal and professional services firms bill on time but too much of that time goes to tasks that do not require expertise. We change that.",
    icon: Scale,
    color: "#d97706",
    challenges: [
      "Document drafting and review consuming fee-earner time",
      "Client onboarding and due diligence friction",
      "Communication and matter updates",
      "Knowledge management across the firm",
    ],
    howWeHelp: [
      { title: "Document AI", desc: "Automated first-draft generation, contract review, and document analysis at scale." },
      { title: "Client AI Employee", desc: "Handles intake, status updates, and routine queries so fee-earners focus on advice." },
      { title: "Practice Management Tools", desc: "Custom software built around your workflows, not someone else's." },
    ],
    cta: "/contact",
    ctaLabel: "Explore Legal AI Solutions",
  },
  "saas-tech": {
    name: "SaaS & Technology",
    tagline: "We speak your language. AI and engineering for tech businesses that want to move faster.",
    intro: "You understand technology but even tech companies accumulate inefficiencies. We work as an extension of your team to ship faster and scale smarter.",
    icon: Code2,
    color: "#2563EB",
    challenges: [
      "Engineering capacity stretched too thin",
      "Customer success and onboarding at scale",
      "Internal tooling that never gets prioritised",
      "AI features that are talked about but not shipped",
    ],
    howWeHelp: [
      { title: "AI Feature Development", desc: "We build and ship AI capabilities into your product fast, properly integrated." },
      { title: "Customer Success AI", desc: "Automate onboarding, check-ins, and churn risk identification with AI employees." },
      { title: "Internal Tooling", desc: "Custom tools that solve the ops and workflow problems your eng team never gets to." },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Our Engineering Team",
  },
  education: {
    name: "Education",
    tagline: "Better outcomes, less admin. AI tools built for schools, colleges, and training providers.",
    intro: "Educational organisations are drowning in administration while funding pressures mean teams cannot grow. AI changes what is possible without adding headcount.",
    icon: GraduationCap,
    color: "#059669",
    challenges: [
      "Admin workload eating into teaching and leadership time",
      "Student communication and parent engagement",
      "Enrolment, applications, and onboarding",
      "Reporting and compliance documentation",
    ],
    howWeHelp: [
      { title: "AI Admissions", desc: "Handle enquiries, applications, and follow-ups automatically, at any hour." },
      { title: "Student Communication", desc: "Personalised, timely communication at scale without adding staff." },
      { title: "Reporting Automation", desc: "Auto-generate compliance and progress reports from your existing systems." },
    ],
    cta: "/contact",
    ctaLabel: "Explore Education AI Solutions",
  },
  hospitality: {
    name: "Hospitality & Travel",
    tagline: "Excellent operations without the overhead. AI that keeps guests happy and staff sane.",
    intro: "Hospitality runs on service but back-of-house complexity is relentless. We automate the operational layer so your team can focus on delivering great experiences.",
    icon: Hotel,
    color: "#e35d6a",
    challenges: [
      "Booking enquiries and confirmations that need instant responses",
      "Guest communication across multiple channels",
      "Seasonal demand making staffing unpredictable",
      "Review management and reputation monitoring",
    ],
    howWeHelp: [
      { title: "AI Guest Services", desc: "An AI employee that handles booking enquiries, FAQs, and pre-arrival communication 24/7." },
      { title: "Operations Automation", desc: "Automate check-in coordination, housekeeping requests, and supplier communications." },
      { title: "Review and Reputation Tools", desc: "Monitor, respond to, and act on guest feedback automatically." },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Hospitality AI",
  },
};

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries[params.slug];
  if (!industry) notFound();

  const Icon = industry.icon;

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
            background: `radial-gradient(ellipse 60% 45% at 50% -5%, ${industry.color}18, transparent 65%)`,
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
                  gap: 10,
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
                <Icon size={13} style={{ color: industry.color }} />
                {industry.name}
              </span>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(32px, 5.5vw, 66px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 32,
              }}
            >
              <BlurText text={industry.tagline} delay={0.1} wordDelay={0.036} />
            </h1>

            <ScrollReveal delay={0.5}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 640,
                  margin: "0 auto 40px",
                }}
              >
                {industry.intro}
              </p>
              <Link
                href={industry.cta}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 999,
                  background: industry.color,
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: `0 4px 28px ${industry.color}40`,
                }}
              >
                {industry.ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Challenges ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 64,
              alignItems: "start",
            }}
          >
            <ScrollReveal direction="left">
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: industry.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 18,
                }}
              >
                Common Challenges
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-0.022em",
                  lineHeight: 1.2,
                  marginBottom: 28,
                }}
              >
                <BlurText text="What we hear from businesses like yours." wordDelay={0.045} />
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {industry.challenges.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 0",
                      borderBottom: i < industry.challenges.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <CheckCircle
                      size={16}
                      style={{ color: industry.color, flexShrink: 0, marginTop: 3 }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(14px, 1.4vw, 16px)",
                        color: "var(--text-2)",
                        lineHeight: 1.65,
                      }}
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: industry.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 18,
                }}
              >
                How We Help
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {industry.howWeHelp.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "24px 22px",
                      borderRadius: 16,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: industry.color,
                        marginBottom: 8,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {h.title}
                    </h3>
                    <p
                      style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}
                    >
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
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
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${industry.color}0D, transparent 70%), var(--surface)`,
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
                Ready to see what is possible?
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                Book a call and we will map out exactly where AI and technology can make the biggest difference for your {industry.name.toLowerCase()} business.
              </p>
              <Link
                href={industry.cta}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 999,
                  background: industry.color,
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: `0 4px 28px ${industry.color}40`,
                }}
              >
                {industry.ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
