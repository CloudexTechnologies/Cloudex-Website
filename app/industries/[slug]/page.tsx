import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart, DollarSign, ShoppingBag, Home, Scale, Code2, GraduationCap, Hotel,
  ArrowRight, CheckCircle,
} from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Industry = {
  name: string;
  tagline: string;
  intro: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  color: string;
  stats: { value: string; label: string }[];
  challenges: string[];
  howWeHelp: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  cta: string;
  ctaLabel: string;
};

const industries: Record<string, Industry> = {
  healthcare: {
    name: "Healthcare & MedTech",
    tagline: "AI and technology that helps practices deliver better care without burning out the people providing it.",
    intro: "Healthcare professionals spend too much time on administration and not enough on patients. We build AI and software solutions that flip that ratio.",
    desc: "Automate patient intake, scheduling, and follow-ups while maintaining full compliance. Reduce admin overhead so your clinical team can focus on patient outcomes.",
    icon: Heart,
    color: "#e35d6a",
    stats: [
      { value: "40%", label: "Admin Reduced" },
      { value: "99%", label: "Uptime SLA" },
      { value: "24/7", label: "AI Coverage" },
    ],
    challenges: [
      "Admin workload consuming clinical hours that should go to patients",
      "Patient communication falling through the cracks between appointments",
      "Repetitive scheduling and triage tasks eating into staff time",
      "Data scattered across disconnected systems with no single view",
      "Staff burnout from non-clinical responsibilities piling up",
    ],
    howWeHelp: [
      {
        title: "AI Intake and Triage",
        desc: "Automate patient intake, symptom collection, and routing so your staff focus on care, not paperwork. Patients get faster acknowledgement; your team gets structured information before the appointment.",
      },
      {
        title: "Appointment Automation",
        desc: "Reduce no-shows and manual scheduling with intelligent booking, reminders, and rescheduling systems. Works across SMS, email, and your existing booking platform.",
      },
      {
        title: "Admin AI Employees",
        desc: "Digital staff that handle referrals, follow-ups, and documentation around the clock — no sick days, no overtime. Every task tracked, every output auditable.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Map where the hours go",
        desc: "We spend time with your team — not in a workshop, but doing the actual work alongside you — to understand exactly where clinical time gets lost to administration.",
      },
      {
        step: "02",
        title: "Deploy into your existing setup",
        desc: "Your AI employee connects to your existing systems. No rip-and-replace. No months of migration. No disruption to clinical workflows while we integrate.",
      },
      {
        step: "03",
        title: "Monitor, refine, extend",
        desc: "We stay involved after go-live. As your needs change, the system adapts. You get a partner — not a vendor who disappears after the handover call.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Healthcare AI",
  },

  finance: {
    name: "Financial Services",
    tagline: "Move faster without taking on more risk. AI and automation for regulated financial businesses.",
    intro: "Financial services firms face growing regulatory demands, client expectations, and competitive pressure. We help you automate the manageable and focus on the strategic.",
    desc: "Streamline regulatory compliance, automate financial reporting, and unlock real-time analytics. AI Employees that monitor cashflow, flag anomalies and generate reports around the clock.",
    icon: DollarSign,
    color: "#2563EB",
    stats: [
      { value: "10x", label: "Faster Processing" },
      { value: "47%", label: "Cost Reduction" },
      { value: "99.9%", label: "Compliance Rate" },
    ],
    challenges: [
      "Compliance documentation consuming adviser and analyst time",
      "Manual onboarding and KYC processes that slow client acquisition",
      "Client communication at scale without sacrificing relationship quality",
      "Data analysis that still relies on spreadsheets built years ago",
      "Reporting cycles that take days and are already out of date when they land",
    ],
    howWeHelp: [
      {
        title: "Compliance Automation",
        desc: "Automate document generation, review, and audit trails to reduce the compliance burden on fee-earners. Your team focuses on judgement calls — the AI handles the paper trail.",
      },
      {
        title: "Client AI Employees",
        desc: "Digital relationship managers that keep clients informed and engaged 24/7. Responds to routine queries, generates account summaries, and escalates anything that needs human input.",
      },
      {
        title: "Data Intelligence",
        desc: "Custom dashboards and AI tools that surface insights from your data automatically. Anomaly detection, cashflow monitoring, and reporting — without waiting for the analyst to run the numbers.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit your compliance workflow",
        desc: "We map where time is spent against what actually requires expertise. Most compliance tasks are process-heavy but not judgement-heavy — exactly where AI delivers the most value.",
      },
      {
        step: "02",
        title: "Deploy your AI infrastructure",
        desc: "We build and integrate the systems into your existing tech stack. No new platforms to learn. No rebuilding what already works. Just automation layered over what you have.",
      },
      {
        step: "03",
        title: "Scale with confidence",
        desc: "Once the foundation is in place, extending coverage to new processes takes days, not months. You get a system that grows with your business and keeps pace with regulatory change.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Explore Financial AI Solutions",
  },

  ecommerce: {
    name: "E-Commerce & Retail",
    tagline: "More customers, fewer dropped balls. AI and software that keeps your store growing.",
    intro: "E-commerce growth creates operational complexity — more orders, more queries, more moving parts. We automate the complexity so you can scale without the growing pains.",
    desc: "Maximise every touchpoint with intelligent AI Employees handling customer support, cart recovery, and campaign execution. Your operations run 24/7 without adding headcount.",
    icon: ShoppingBag,
    color: "#7c3aed",
    stats: [
      { value: "34%", label: "Revenue Lift" },
      { value: "2.5x", label: "Conv. Rate" },
      { value: "89%", label: "Retention" },
    ],
    challenges: [
      "Customer support volume overwhelming the team during peak periods",
      "Cart abandonment and poor conversion rates bleeding revenue",
      "Inventory and fulfilment coordination slowing fulfilment times",
      "Post-purchase experience and retention falling behind competitors",
      "Marketing execution not keeping pace with the content calendar",
    ],
    howWeHelp: [
      {
        title: "AI Customer Support",
        desc: "An AI employee that handles returns, queries, and order tracking 24/7 in your brand voice. Resolves the majority of tickets without human intervention — escalates what it can't handle with full context.",
      },
      {
        title: "Conversion Optimisation",
        desc: "Website and funnel improvements that measurably increase the percentage of visitors who buy. We test, iterate, and track — not guesswork, not design opinions.",
      },
      {
        title: "Operations Automation",
        desc: "Connect your store, warehouse, and logistics so orders flow without manual intervention. Fewer errors, faster fulfilment, and a support team that stops firefighting stock queries.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Identify your biggest revenue leaks",
        desc: "We audit your funnel, support volume, and fulfilment process to find where you're losing money and customers. The wins are usually obvious once you look at the data properly.",
      },
      {
        step: "02",
        title: "Deploy AI where it has the highest impact first",
        desc: "We don't try to automate everything at once. We deploy in order of ROI — support first, then ops, then marketing — so you see results within weeks, not quarters.",
      },
      {
        step: "03",
        title: "Grow without the overhead",
        desc: "As order volume grows, your AI systems scale with it. You don't need to hire in line with revenue anymore. The operational layer stays lean while the topline grows.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Grow Your Store With AI",
  },

  "real-estate": {
    name: "Real Estate",
    tagline: "Keep deals moving. AI tools that handle the admin so your agents can focus on relationships.",
    intro: "Property is a relationship business. But too much of the day gets swallowed by follow-ups, paperwork, and chasing. We fix that.",
    desc: "Capture, qualify, and nurture leads automatically. AI Employees handle prospecting, outreach sequences, and appointment booking so your agents focus on closing.",
    icon: Home,
    color: "#059669",
    stats: [
      { value: "3x", label: "Lead Volume" },
      { value: "60%", label: "Time Saved" },
      { value: "24/7", label: "Response Time" },
    ],
    challenges: [
      "Lead follow-up falling behind while agents handle active clients",
      "Viewings and valuations that need constant coordination and chasing",
      "Client communication across long transaction timelines going quiet",
      "Documentation and compliance paperwork taking hours per transaction",
      "New listings not being marketed fast enough to the right buyers",
    ],
    howWeHelp: [
      {
        title: "AI Lead Nurturing",
        desc: "An AI employee that follows up, qualifies, and books appointments automatically — for every enquiry, at any hour. No lead sits cold because an agent was busy with another client.",
      },
      {
        title: "Client Communication AI",
        desc: "Keep buyers and sellers updated throughout transactions without manual check-ins. Milestone updates, document requests, and progress summaries go out automatically.",
      },
      {
        title: "Property Management Tools",
        desc: "Custom software that tracks properties, clients, and deals in one place. Built around how your agency actually works, not a generic CRM you're force-fitting.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Connect your existing CRM and portals",
        desc: "We integrate with what you already use — Rightmove, Zoopla, your CRM, your email. No moving to a new platform. No persuading the team to change how they work.",
      },
      {
        step: "02",
        title: "Deploy lead and client AI",
        desc: "Your AI employee starts following up, booking, and communicating within days. We calibrate it to your brand, your process, and your typical client questions before go-live.",
      },
      {
        step: "03",
        title: "Your agents close — the AI handles the rest",
        desc: "Routine follow-ups, status updates, and document chasing happen automatically. Your agents spend their time on viewings, negotiations, and building the relationships that win instructions.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Real Estate AI",
  },

  legal: {
    name: "Legal & Professional Services",
    tagline: "Deliver more, stretch less. AI and automation that gives your team capacity back.",
    intro: "Legal and professional services firms bill on time but too much of that time goes to tasks that don't require expertise. We change that.",
    desc: "AI Employees that handle document processing, client intake, billing administration, and research tasks — so your fee-earners spend their time on work that actually bills.",
    icon: Scale,
    color: "#d97706",
    stats: [
      { value: "65%", label: "Admin Cut" },
      { value: "3x", label: "Capacity" },
      { value: "0", label: "Dropped Tasks" },
    ],
    challenges: [
      "Document drafting and review consuming fee-earner time that should be billable",
      "Client onboarding and due diligence friction slowing matter opening",
      "Communication and matter updates falling on the wrong people",
      "Knowledge management that relies on individual memory rather than systems",
      "Billing administration creating delays in recovery and cash collection",
    ],
    howWeHelp: [
      {
        title: "Document AI",
        desc: "Automated first-draft generation, contract review, and document analysis at scale. Fee-earners review and sign off — they stop spending hours producing what AI can produce in minutes.",
      },
      {
        title: "Client AI Employee",
        desc: "Handles intake, status updates, and routine queries so fee-earners focus on advice. Clients get faster responses; the firm gets a scalable client service layer without adding headcount.",
      },
      {
        title: "Practice Management Tools",
        desc: "Custom software built around your workflows, not someone else's. Matter tracking, billing dashboards, and knowledge bases that reflect how your firm actually operates.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Map fee-earner time by task type",
        desc: "We work through a typical week with your team to categorise tasks by whether they require expertise or just time. The second category is where we focus first.",
      },
      {
        step: "02",
        title: "Automate the routine — carefully",
        desc: "Legal automation requires precision. We build with your specific matter types, jurisdiction, and risk tolerance in mind. Nothing goes live without sign-off from your team.",
      },
      {
        step: "03",
        title: "Reclaim billable capacity",
        desc: "Once routine tasks are automated, fee-earners have more time for work that bills at full rate. Capacity increases without the overhead of additional hires.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Explore Legal AI Solutions",
  },

  "saas-tech": {
    name: "SaaS & Technology",
    tagline: "We speak your language. AI and engineering for tech businesses that want to move faster.",
    intro: "You understand technology but even tech companies accumulate inefficiencies. We work as an extension of your team to ship faster and scale smarter.",
    desc: "From AI-native product development to custom integrations and data pipelines — we build with the same stack you use and understand the operational realities of scaling a tech business.",
    icon: Code2,
    color: "#2563EB",
    stats: [
      { value: "5x", label: "Ship Velocity" },
      { value: "70%", label: "Ops Automated" },
      { value: "<1hr", label: "Setup Time" },
    ],
    challenges: [
      "Engineering capacity stretched too thin between product and internal tooling",
      "Customer success and onboarding that doesn't scale with growth",
      "Internal tooling that never gets prioritised because product always wins",
      "AI features that are talked about in planning but never shipped",
      "Ops and support workflows that still run on manual processes and spreadsheets",
    ],
    howWeHelp: [
      {
        title: "AI Feature Development",
        desc: "We build and ship AI capabilities into your product fast, properly integrated. Not proof-of-concepts. Production-grade features with the right architecture from the start.",
      },
      {
        title: "Customer Success AI",
        desc: "Automate onboarding, health check-ins, and churn risk identification with AI employees. Your CSMs focus on strategic accounts; the AI handles the operational layer.",
      },
      {
        title: "Internal Tooling",
        desc: "Custom tools that solve the ops and workflow problems your eng team never gets to. Built in the same stack you use, by engineers who understand the tradeoffs.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Technical discovery — no fluff",
        desc: "We look at your stack, your codebase conventions, your current bottlenecks. We come in as engineers, not consultants. The output is a scoped build plan, not a report.",
      },
      {
        step: "02",
        title: "Build alongside your team",
        desc: "We work in your repos, follow your conventions, and ship through your review process. You stay in control of the codebase. We extend it.",
      },
      {
        step: "03",
        title: "Ship and iterate",
        desc: "We move fast and we're not precious about it. If the approach needs changing after the first iteration, we change it. The goal is working software in production, not perfect plans.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Our Engineering Team",
  },

  education: {
    name: "Education & EdTech",
    tagline: "Better outcomes, less admin. AI tools built for schools, colleges, and training providers.",
    intro: "Educational organisations are drowning in administration while funding pressures mean teams can't grow. AI changes what is possible without adding headcount.",
    desc: "Automate enrolment, student communications, and reporting workflows. AI Employees that support learners around the clock without expanding your operations team.",
    icon: GraduationCap,
    color: "#059669",
    stats: [
      { value: "50%", label: "Admin Saved" },
      { value: "24/7", label: "Student Support" },
      { value: "2x", label: "Enrolment Speed" },
    ],
    challenges: [
      "Admin workload eating into teaching, leadership, and pastoral time",
      "Student and parent communication that falls behind at busy periods",
      "Enrolment, applications, and onboarding processes that are largely manual",
      "Reporting and compliance documentation consuming staff hours every term",
      "Prospective student enquiries that go unanswered or get slow responses",
    ],
    howWeHelp: [
      {
        title: "AI Admissions",
        desc: "Handle enquiries, applications, and follow-ups automatically, at any hour. Prospective students get immediate, accurate responses. Your admissions team focuses on conversion, not inbox management.",
      },
      {
        title: "Student Communication",
        desc: "Personalised, timely communication at scale without adding staff. Attendance alerts, assignment reminders, welfare check-ins — consistent and automatic.",
      },
      {
        title: "Reporting Automation",
        desc: "Auto-generate compliance and progress reports from your existing systems. What used to take days at the end of each term now runs on schedule without anyone touching it.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Understand your admin burden",
        desc: "We spend time with your operations and teaching staff to quantify where time goes. The picture is almost always worse than leadership expects — and the fixes are clearer than expected.",
      },
      {
        step: "02",
        title: "Automate enquiries and communications first",
        desc: "The highest-volume, lowest-complexity tasks come first. Enquiry handling and student comms typically go live within two to three weeks of starting.",
      },
      {
        step: "03",
        title: "Scale intake without scaling staff",
        desc: "Once the foundation is in place, you can grow enrolment without growing the ops team. More students, same headcount, better experience for everyone.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Explore Education AI Solutions",
  },

  hospitality: {
    name: "Hospitality & Travel",
    tagline: "Excellent operations every time. AI that keeps guests happy and staff focused on service.",
    intro: "Hospitality runs on service but back-of-house complexity is relentless. We automate the operational layer so your team can focus on delivering great experiences.",
    desc: "From booking and guest communication to review management and upsell campaigns — AI Employees that keep every touchpoint sharp without adding to your payroll.",
    icon: Hotel,
    color: "#e35d6a",
    stats: [
      { value: "4.9★", label: "Avg Rating" },
      { value: "80%", label: "Queries Resolved" },
      { value: "24/7", label: "Guest Coverage" },
    ],
    challenges: [
      "Booking enquiries needing instant responses at all hours, including overnight",
      "Guest communication across multiple channels becoming impossible to manage",
      "Seasonal demand making consistent staffing levels hard to maintain",
      "Review management and reputation monitoring falling behind",
      "Upsell opportunities being missed because the right message goes out too late or not at all",
    ],
    howWeHelp: [
      {
        title: "AI Guest Services",
        desc: "An AI employee that handles booking enquiries, FAQs, and pre-arrival communication 24/7. Guests get instant, accurate answers. Your team wakes up to confirmed bookings, not a queue of unanswered messages.",
      },
      {
        title: "Operations Automation",
        desc: "Automate check-in coordination, housekeeping requests, and supplier communications. The operational layer runs quietly in the background while your team focuses on the guest in front of them.",
      },
      {
        title: "Review and Reputation Tools",
        desc: "Monitor, respond to, and act on guest feedback automatically. Every review gets a response. Trends get surfaced before they become patterns. Upsell messages go out at the right moment.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Map the guest journey end to end",
        desc: "We look at every touchpoint from first enquiry to post-stay review and identify where slow responses, missed messages, or manual processes are costing you bookings or reviews.",
      },
      {
        step: "02",
        title: "Deploy 24/7 guest AI",
        desc: "Your AI guest services employee goes live integrated with your booking system and communication channels. Calibrated to your property, your tone, and your FAQs before launch.",
      },
      {
        step: "03",
        title: "Monitor and refine",
        desc: "We review performance weekly in the early weeks — response accuracy, guest satisfaction, escalation rates. As quality stabilises, you get consistent 5-star service without the staffing headache.",
      },
    ],
    cta: "/contact",
    ctaLabel: "Talk to Us About Hospitality AI",
  },
};

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug];
  if (!industry) return {};
  return {
    title: `${industry.name} AI Solutions | Cloudex Technologies`,
    description: industry.desc,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.name} AI Solutions | Cloudex Technologies`,
      description: industry.desc,
      url: `https://cloudextechnologies.io/industries/${slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries[slug];
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
                fontSize: "clamp(30px, 5vw, 62px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 28,
              }}
            >
              <BlurText text={industry.tagline} delay={0.1} wordDelay={0.036} />
            </h1>

            <ScrollReveal delay={0.45}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.7vw, 18px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 620,
                  margin: "0 auto 20px",
                }}
              >
                {industry.intro}
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "var(--text-3)",
                  lineHeight: 1.75,
                  maxWidth: 580,
                  margin: "0 auto 44px",
                }}
              >
                {industry.desc}
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 44,
                }}
              >
                {industry.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "18px 28px",
                      borderRadius: 16,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      minWidth: 120,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(22px, 2.5vw, 30px)",
                        color: industry.color,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-3)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

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

      {/* ── Challenges + How We Help ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* Challenges */}
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
                What We Hear
              </span>
              <h2
                style={{
                  fontSize: "clamp(20px, 2.8vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 28,
                }}
              >
                <BlurText text="The problems businesses in your sector bring to us." wordDelay={0.04} />
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
                      borderBottom:
                        i < industry.challenges.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    <CheckCircle
                      size={15}
                      style={{ color: industry.color, flexShrink: 0, marginTop: 3 }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(13px, 1.3vw, 15px)",
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

            {/* How We Help */}
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
              <h2
                style={{
                  fontSize: "clamp(20px, 2.8vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 28,
                }}
              >
                <BlurText text="What we actually build for you." wordDelay={0.04} />
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {industry.howWeHelp.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "22px 20px",
                      borderRadius: 16,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: industry.color,
                        marginBottom: 8,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {h.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-2)",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
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

      {/* ── Process ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
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
                How It Works
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-0.022em",
                  lineHeight: 1.18,
                }}
              >
                <BlurText text="What working with us looks like." wordDelay={0.045} />
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {industry.process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div
                  style={{
                    padding: "28px 24px",
                    borderRadius: 18,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: 38,
                      color: `${industry.color}22`,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      marginBottom: 20,
                    }}
                  >
                    {p.step}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "var(--text-1)",
                      letterSpacing: "-0.01em",
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-2)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
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
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${industry.color}0D, transparent 70%), var(--surface)`,
              border: "1px solid var(--border)",
            }}
          >
            <ScrollReveal>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 36px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                Ready to see what is possible?
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  marginBottom: 36,
                  maxWidth: 460,
                  margin: "0 auto 36px",
                }}
              >
                Book a call and we will map out exactly where AI and technology can make the biggest difference for your {industry.name.toLowerCase()} business — and what day one looks like.
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
