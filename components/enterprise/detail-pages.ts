/**
 * One entry per `/services/<slug>` and `/industries/<slug>` page, plus the navbar menus
 * and the overview grids, which all read from here so a service or industry is defined
 * exactly once.
 *
 * Added after the Framer migration. Copy is Cloudex Technologies's own; nothing here quotes a
 * client figure that is not already on the site.
 */

import type { FaqItem } from "@/components/shared/faq-content";

import type { EnterpriseIconName } from "./EnterpriseIcon";
import type { EnterpriseCard, EnterpriseImage } from "./enterprise-content";

export interface DetailPage {
  readonly slug: string;
  readonly icon: EnterpriseIconName;
  readonly title: string;
  /** One line under the title in the navbar menu. */
  readonly blurb: string;
  /** Card body on the overview grid. */
  readonly summary: string;
  /** Three highlights listed on the overview card. */
  readonly items: readonly string[];
  /** Hero `h1`. */
  readonly heading: string;
  /** Hero notch tagline. */
  readonly notch: string;
  readonly intro: string;
  /** Alt text for the hero photo (`generated-images/gen-detail.sh` describes each scene). */
  readonly imageAlt: string;
  readonly offer: {
    readonly badge: string;
    readonly heading: string;
    readonly body: string;
    readonly cards: readonly EnterpriseCard[];
  };
  readonly why: { readonly heading: string; readonly body: string };
  /** Slugs of the related pages of the OTHER kind (industries for a service, and vice versa). */
  readonly related: readonly string[];
  readonly faq: readonly FaqItem[];
}

/** The 512/1024/1536 set `generated-images/export-enterprise.py` writes. */
export function detailImage(kind: "services" | "industries", slug: string, alt: string): EnterpriseImage {
  const stem = `/assets/images/ai/${kind === "services" ? "svc" : "ind"}-${slug}`;
  return {
    src: `${stem}-1536.jpg`,
    srcSet: `${stem}-512.jpg 512w,${stem}-1024.jpg 1024w,${stem}-1536.jpg 1536w`,
    width: 1536,
    height: 1024,
    alt,
  };
}

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const SERVICE_PAGES: readonly DetailPage[] = [
  {
    slug: "digital-ftes",
    icon: "bot",
    title: "Digital FTEs",
    blurb: "AI employees, agents and automation for your team",
    summary: "Our core: AI employees that take repetitive work off your team's plate.",
    items: ["Role-based AI employees", "Chat, voice and workflow automation", "Grounded in your knowledge and data"],
    heading: "An AI Workforce That Works for Your Team",
    notch: "Our core practice since 2022",
    intro:
      "We design, build and run Digital FTEs: AI employees for sales, support, operations and reporting. Each one is grounded in your rules and data, deployed by engineers who work inside your business, and overseen by your team.",
    imageAlt: "an operations manager watching an AI agent handle customer conversations",
    offer: {
      badge: "What we offer",
      heading: "Digital FTEs, built around your team",
      body: "Every Digital FTE follows the 10-80-10 rule: your team sets the direction, the Digital FTE does the heavy lifting, and your team approves the result.",
      cards: [
        { icon: "bot", title: "Role-Based Digital FTEs", body: "AI employees for sales outreach, customer support, operations and content, each built for one clear role on your team." },
        { icon: "phone", title: "Chat and Voice Agents", body: "Chatbots and voice agents that answer, book and follow up on web, WhatsApp and phone, and hand complex cases to your people." },
        { icon: "flow", title: "Workflow and Marketing Automation", body: "Hand-offs, approvals, campaigns and follow-ups automated between the apps you already use." },
        { icon: "database", title: "Knowledge and Data Systems of Record", body: "A Knowledge System of Record (KSoR) for your policies and methods, connected to your Data System of Record (DSoR), such as your CRM or ERP." },
        { icon: "users", title: "Forward Deployed Engineers", body: "Engineers who work inside your business, fit each Digital FTE to your workflows and stay on to run it with your team." },
        { icon: "shield", title: "Evaluation and Governance", body: "Agreed baselines and targets, ongoing evaluations, guardrails and approval gates for safe, measurable AI." },
      ],
    },
    why: {
      heading: "Why build your AI workforce with Cloudex Technologies",
      body: "Automation is where we started. We have shipped Digital FTE sales teams, call centres and content engines for clients like ProPac Solution, Diexus and MIMA Group, and every engagement starts with a baseline and target agreed with your team.",
    },
    related: ["retail-cpg", "logistics-supply-chain", "banking-financial-services", "telecommunications"],
    faq: [
      { question: "What is a Digital FTE?", answer: "A Digital FTE (Digital Full-Time Equivalent) is an AI employee built for one role, such as sales outreach, customer support or reporting. It works inside your existing tools, around the clock, under your team's oversight." },
      { question: "Will Digital FTEs replace my team?", answer: "No. They work for your team, not instead of it. Your people set the direction and approve the results, while Digital FTEs take on the repetitive work in between and escalate anything that needs judgement." },
      { question: "How do you make sure they follow our rules?", answer: "Each Digital FTE reads from a Knowledge System of Record (KSoR) holding your approved policies and procedures, and from your Data System of Record (DSoR) for live data. Sensitive actions also need a person's approval." },
      { question: "How do we measure success?", answer: "Before we build, we agree a baseline, a target and the acceptance criteria with you. After launch, we prove the result with your business KPIs, your team's adoption and ongoing evaluations." },
      { question: "We are new to AI. Where should we start?", answer: "With one high-value, repetitive process. Our engineers map it with your team, and most first Digital FTEs go live within a few weeks before expanding to other roles." },
    ],
  },
  {
    slug: "digital-transformation",
    icon: "compass",
    title: "Digital Transformation",
    blurb: "Strategy, websites, commerce and business applications",
    summary: "Strategy and platforms that modernise how you operate and sell.",
    items: ["Digital consulting and strategy", "Websites and digital commerce", "ERP, CRM and custom software"],
    heading: "Modernise How Your Business Operates",
    notch: "From strategy to working platforms",
    intro:
      "We help organisations rethink processes, customer journeys and platforms, then deliver the commerce, ERP, CRM and custom software that make the change real.",
    imageAlt: "a strategy team mapping a customer journey on a glass wall",
    offer: {
      badge: "What we offer",
      heading: "Transformation with a clear roadmap",
      body: "We connect business goals to technology choices and deliver in measurable stages.",
      cards: [
        { icon: "compass", title: "Digital Strategy", body: "Current-state assessment, target operating model and a prioritised transformation roadmap." },
        { icon: "clipboard", title: "Process Redesign", body: "Map, simplify and digitise core processes before automating them." },
        { icon: "browser", title: "Website Design and Development", body: "Fast, modern websites that explain what you do, work on every device and turn visitors into enquiries." },
        { icon: "cart", title: "Digital Commerce", body: "B2B and B2C storefronts, catalogues and ordering portals built to convert." },
        { icon: "layers", title: "ERP and CRM", body: "Implementation, customisation and integration of the systems that run your business." },
        { icon: "code", title: "Custom Software", body: "Web and mobile applications built for workflows packaged software cannot handle." },
        { icon: "users", title: "Change Enablement", body: "Training, documentation and adoption support so new systems are actually used." },
      ],
    },
    why: {
      heading: "Transformation that ships",
      body: "We keep strategy and delivery in one team, so roadmaps turn into working software, with automation designed in from the start rather than added later.",
    },
    related: ["retail-cpg", "public-sector", "automotive-manufacturing", "hospitality-travel"],
    faq: [
      { question: "Where does a transformation programme start?", answer: "With a discovery phase: we assess your processes, systems and goals, then agree a phased roadmap with clear outcomes for each stage." },
      { question: "Do you implement packaged ERP and CRM platforms?", answer: "Yes. We implement, configure and integrate established platforms, and build custom software only where it adds real value." },
      { question: "Can you work with our in-house IT team?", answer: "Yes. We work alongside internal teams, share knowledge and hand over documentation so you are never locked in." },
      { question: "How do you measure success?", answer: "Each phase has agreed metrics, such as cycle time, adoption, revenue or cost, reviewed with your stakeholders." },
    ],
  },
  {
    slug: "data-analytics",
    icon: "chart",
    title: "Data and Analytics",
    blurb: "Data platforms, BI and governance",
    summary: "Trusted data foundations and insight your leaders can act on.",
    items: ["Data modernisation", "Advanced analytics and BI", "Data management and governance"],
    heading: "Turn Your Data into Decisions",
    notch: "Trusted data, clear insight",
    intro:
      "We modernise data platforms, build dashboards leaders actually use, and put the governance in place that makes your data trustworthy and AI-ready.",
    imageAlt: "a data analyst presenting a business-intelligence dashboard to managers",
    offer: {
      badge: "What we offer",
      heading: "From raw data to confident decisions",
      body: "Modern platforms, reliable pipelines and analytics shaped around the questions you need answered.",
      cards: [
        { icon: "database", title: "Data Modernisation", body: "Move from scattered spreadsheets and legacy databases to a modern, scalable data platform." },
        { icon: "flow", title: "Data Engineering", body: "Reliable pipelines that collect, clean and combine data from every source." },
        { icon: "chart", title: "Business Intelligence", body: "Dashboards and reports designed around the decisions each team makes." },
        { icon: "gauge", title: "Advanced Analytics", body: "Forecasting, segmentation and statistical analysis that reveal what is driving results." },
        { icon: "shield", title: "Data Governance", body: "Ownership, quality rules, access control and lineage for data you can trust." },
        { icon: "link", title: "Connected Intelligence", body: "Real-time data from devices and systems brought together into one view." },
      ],
    },
    why: {
      heading: "Analytics people actually use",
      body: "We start from the decisions your teams make, not from the data you happen to have, so every dashboard and model answers a real question.",
    },
    related: ["retail-cpg", "banking-financial-services", "energy-utilities", "logistics-supply-chain"],
    faq: [
      { question: "Our data is spread across many systems. Can you help?", answer: "Yes. We connect your sources into a central platform with automated pipelines, so reports draw on one consistent version of the truth." },
      { question: "Which BI and data tools do you use?", answer: "We work with leading cloud data platforms and BI tools, and recommend options based on your scale, skills and budget." },
      { question: "How do you ensure data quality?", answer: "With validation rules in the pipelines, clear data ownership and monitoring that flags issues before they reach reports." },
      { question: "Will this prepare us for AI?", answer: "Yes. Clean, governed and well-documented data is the foundation every reliable AI solution needs." },
    ],
  },
  {
    slug: "cloud-services",
    icon: "cloud",
    title: "Cloud Services",
    blurb: "Migration, cloud-native apps and managed cloud",
    summary: "Move, build and run workloads on the right cloud, securely.",
    items: ["Cloud migration and operations", "Cloud-native development", "Integration, APIs and managed cloud"],
    heading: "Move, Build and Run in the Cloud",
    notch: "Secure, scalable, cost-aware cloud",
    intro:
      "We plan and execute cloud migrations, build cloud-native applications and integrations, and run your environments with the monitoring and cost control they need.",
    imageAlt: "a cloud engineer configuring infrastructure beside architecture diagrams",
    offer: {
      badge: "What we offer",
      heading: "The full cloud lifecycle",
      body: "Assessment, migration, development and operations, on the cloud platforms that fit you.",
      cards: [
        { icon: "search", title: "Cloud Assessment", body: "Readiness review, target architecture and a migration plan with cost estimates." },
        { icon: "cloud", title: "Cloud Migration", body: "Rehost, replatform or refactor workloads with minimal disruption." },
        { icon: "code", title: "Cloud-Native Development", body: "Scalable applications and APIs built on modern managed services." },
        { icon: "link", title: "Integration and APIs", body: "Connect cloud and on-premise systems so data flows reliably between them." },
        { icon: "gauge", title: "Cost Optimisation", body: "Right-sizing, reserved capacity and monitoring that keep cloud bills under control." },
        { icon: "refresh", title: "Managed Cloud", body: "Monitoring, patching, backups and support for your cloud environments." },
      ],
    },
    why: {
      heading: "Cloud without the surprises",
      body: "We design for security, resilience and cost from day one, and stay on to operate what we build, so your cloud keeps performing after go-live.",
    },
    related: ["banking-financial-services", "retail-cpg", "public-sector", "telecommunications"],
    faq: [
      { question: "Which cloud providers do you work with?", answer: "We work with the major public clouds and recommend a platform based on your workloads, compliance needs and existing investments." },
      { question: "Will a migration disrupt our operations?", answer: "We plan migrations in waves with testing, rollback plans and cut-overs scheduled around your business hours." },
      { question: "Can you reduce our current cloud costs?", answer: "Often, yes. A cost review typically finds idle resources, oversized instances and pricing options that lower spend." },
      { question: "Do you offer ongoing support?", answer: "Yes. Our managed cloud service covers monitoring, maintenance, security updates and incident response." },
    ],
  },
  {
    slug: "cybersecurity",
    icon: "lock",
    title: "Cybersecurity",
    blurb: "Security consulting, IAM and data protection",
    summary: "Security built into strategy, systems and day-to-day operations.",
    items: ["Security consulting", "Identity and access management", "Data protection and privacy"],
    heading: "Security Built into Everything",
    notch: "Protect data, systems and trust",
    intro:
      "We assess your security posture, strengthen identity and access, protect sensitive data and help you monitor and respond to threats across cloud and on-premise systems.",
    imageAlt: "security analysts watching threat-monitoring dashboards",
    offer: {
      badge: "What we offer",
      heading: "Security across people, process and technology",
      body: "Practical controls sized to your risk, from first assessment to continuous monitoring.",
      cards: [
        { icon: "search", title: "Security Assessment", body: "Posture review, vulnerability assessment and a prioritised remediation plan." },
        { icon: "compass", title: "Security Consulting", body: "Strategy, policies and frameworks aligned with your industry's requirements." },
        { icon: "key", title: "Identity and Access", body: "Single sign-on, multi-factor authentication and least-privilege access control." },
        { icon: "lock", title: "Data Protection", body: "Classification, encryption and privacy controls for sensitive information." },
        { icon: "cloud", title: "Cloud Security", body: "Secure configuration, workload protection and compliance for cloud environments." },
        { icon: "eye", title: "Security Monitoring", body: "Threat detection, alerting and incident response support." },
      ],
    },
    why: {
      heading: "Security that fits how you work",
      body: "We balance protection with usability, so controls reduce real risk without slowing your teams, and we build security into every system we deliver.",
    },
    related: ["banking-financial-services", "public-sector", "healthcare-life-sciences", "telecommunications"],
    faq: [
      { question: "Where should we start with cybersecurity?", answer: "With an assessment of your current posture. It identifies the most important gaps and gives you a prioritised, budgeted plan." },
      { question: "Can you help us meet compliance requirements?", answer: "Yes. We align controls and documentation with the regulations and standards that apply to your industry." },
      { question: "Do you secure AI and automation systems too?", answer: "Yes. Every solution we build includes access controls, audit logging and data protection by design." },
      { question: "Do you provide ongoing monitoring?", answer: "We provide security monitoring and incident response support, scoped to your environment and risk level." },
    ],
  },
  {
    slug: "digital-infrastructure",
    icon: "server",
    title: "Digital Infrastructure",
    blurb: "IT, networks, data centres and digital workplace",
    summary: "Reliable networks, data centres and workplaces for hybrid teams.",
    items: ["IT infrastructure management", "Network and data centre services", "Digital workplace"],
    heading: "Infrastructure Your Business Can Rely On",
    notch: "Reliable, secure, always on",
    intro:
      "We design, modernise and manage the networks, servers, data centres and workplace tools your teams depend on, across on-premise, cloud and hybrid environments.",
    imageAlt: "a network engineer checking server racks with a tablet",
    offer: {
      badge: "What we offer",
      heading: "The foundations of modern IT",
      body: "Proactive management that keeps systems available and teams productive.",
      cards: [
        { icon: "server", title: "IT Infrastructure Management", body: "Proactive monitoring, patching and maintenance of servers and systems." },
        { icon: "globe", title: "Network Services", body: "Secure, high-performance networks for offices, branches and hybrid work." },
        { icon: "database", title: "Data Centre Services", body: "Modernisation and management of physical, virtual and hybrid environments." },
        { icon: "users", title: "Digital Workplace", body: "Collaboration, device management and productivity tools for every employee." },
        { icon: "refresh", title: "Backup and Recovery", body: "Backup, disaster recovery and continuity planning you can test and trust." },
        { icon: "clipboard", title: "IT Service Desk", body: "Responsive support for users, with clear service levels and reporting." },
      ],
    },
    why: {
      heading: "Proactive, not reactive",
      body: "We monitor and maintain infrastructure before problems reach your users, and use automation to resolve routine issues faster.",
    },
    related: ["telecommunications", "public-sector", "healthcare-life-sciences", "energy-utilities"],
    faq: [
      { question: "Can you manage a mix of on-premise and cloud systems?", answer: "Yes. We manage hybrid environments as one estate, with consistent monitoring, security and support." },
      { question: "Do you support multiple office locations?", answer: "Yes. We design and manage networks and services across offices, branches and remote staff." },
      { question: "How do you minimise downtime?", answer: "Through proactive monitoring, redundancy, tested backups and planned maintenance windows." },
      { question: "Can we start with a single area?", answer: "Yes. Many clients start with one service, such as network or service desk, and expand over time." },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export const INDUSTRY_PAGES: readonly DetailPage[] = [
  {
    slug: "banking-financial-services",
    icon: "bank",
    title: "Banking and Financial Services",
    blurb: "Digital banking, risk and compliance",
    summary: "Digital banking, core modernisation, fraud analytics and regulatory reporting.",
    items: [],
    heading: "Smarter, Safer Financial Services",
    notch: "Secure, compliant, customer-first",
    intro:
      "We help banks, lenders, insurers and advisory firms modernise customer journeys, automate operations and use data to manage risk, with security and compliance designed in.",
    imageAlt: "bankers reviewing a digital banking app with a customer",
    offer: {
      badge: "Solutions",
      heading: "Technology for modern finance",
      body: "Faster service and lower operating cost without compromising control.",
      cards: [
        { icon: "phone", title: "Digital Banking Journeys", body: "Onboarding, servicing and self-service experiences customers can complete in minutes." },
        { icon: "chat", title: "AI Customer Service", body: "Assistants that answer account and product queries and hand over to staff with context." },
        { icon: "shield", title: "Fraud and Risk Analytics", body: "Models that flag unusual activity and support credit and risk decisions." },
        { icon: "clipboard", title: "Regulatory Reporting", body: "Automated data collection and reporting that reduces manual effort and errors." },
        { icon: "flow", title: "Operations Automation", body: "KYC checks, document processing and reconciliations automated end to end." },
        { icon: "layers", title: "Core Modernisation", body: "Integration and gradual modernisation of legacy core systems." },
      ],
    },
    why: {
      heading: "Built for regulated environments",
      body: "We design with auditability, data protection and access control from the start, and work within your governance and risk processes.",
    },
    related: ["digital-ftes", "cybersecurity", "data-analytics", "cloud-services"],
    faq: [
      { question: "Can AI be used safely in a regulated bank?", answer: "Yes, with the right controls: approved data environments, human oversight for key decisions, logging and model governance." },
      { question: "Do you work with legacy core banking systems?", answer: "Yes. We integrate with existing cores through APIs and middleware and modernise gradually to limit risk." },
      { question: "Which processes offer quick wins?", answer: "Customer enquiries, onboarding document checks, reconciliations and report preparation usually deliver fast, measurable savings." },
      { question: "Do you work with advisory and insurance firms too?", answer: "Yes. Our financial services work covers banks, lenders, insurers and advisory firms." },
    ],
  },
  {
    slug: "telecommunications",
    icon: "signal",
    title: "Telecommunications",
    blurb: "Customer experience and network operations",
    summary: "BSS/OSS modernisation, customer experience and automated service operations.",
    items: [],
    heading: "Simplify Telecom Operations at Scale",
    notch: "Customer experience and network efficiency",
    intro:
      "We help operators and service providers improve customer experience, automate service operations and turn network and customer data into better decisions.",
    imageAlt: "telecom engineers in a network operations centre",
    offer: {
      badge: "Solutions",
      heading: "Technology for connected businesses",
      body: "Lower cost to serve and faster service delivery across every channel.",
      cards: [
        { icon: "chat", title: "AI Customer Care", body: "Chat and voice agents that resolve billing, plan and service queries instantly." },
        { icon: "layers", title: "BSS/OSS Modernisation", body: "Integration and modernisation of billing, ordering and operations systems." },
        { icon: "flow", title: "Service Automation", body: "Automated order fulfilment, provisioning steps and trouble-ticket handling." },
        { icon: "chart", title: "Network and Customer Analytics", body: "Insight into usage, churn risk and network performance." },
        { icon: "megaphone", title: "Retention and Upsell", body: "Targeted offers and campaigns based on customer behaviour." },
        { icon: "users", title: "Contact Centre Digital FTEs", body: "AI employees that support your contact-centre team through peak demand." },
      ],
    },
    why: {
      heading: "Telecom at the heart of our name",
      body: "We understand high-volume customer operations, and build Digital FTEs that help your support teams handle scale without sacrificing service quality.",
    },
    related: ["digital-ftes", "data-analytics", "digital-infrastructure", "cloud-services"],
    faq: [
      { question: "Can AI agents handle high call and chat volumes?", answer: "Yes. AI agents scale instantly for routine queries and route complex cases to human agents with the full context." },
      { question: "Do you integrate with existing billing and CRM systems?", answer: "Yes. We connect to your BSS/OSS and CRM platforms through their APIs." },
      { question: "Can you help reduce churn?", answer: "We build churn analytics and targeted retention journeys that identify and act on at-risk customers early." },
      { question: "Do you work with ISPs and smaller providers?", answer: "Yes. Our solutions scale from regional providers to large operators." },
    ],
  },
  {
    slug: "public-sector",
    icon: "landmark",
    title: "Public Sector",
    blurb: "Citizen services and e-governance",
    summary: "Citizen-centric digital services, e-governance and secure data platforms.",
    items: [],
    heading: "Digital Services Citizens Can Trust",
    notch: "Accessible, efficient, secure",
    intro:
      "We help government bodies and public institutions deliver accessible digital services, automate administrative work and manage data securely and transparently.",
    imageAlt: "a public service officer helping a citizen at a digital kiosk",
    offer: {
      badge: "Solutions",
      heading: "Technology for public service",
      body: "Faster, more accessible services and more efficient administration.",
      cards: [
        { icon: "globe", title: "Citizen Service Portals", body: "Online applications, payments and status tracking for public services." },
        { icon: "chat", title: "Citizen Assistants", body: "AI assistants that answer common questions in multiple languages, around the clock." },
        { icon: "clipboard", title: "Case and Document Management", body: "Digitised files, workflows and approvals that replace paper processes." },
        { icon: "database", title: "Secure Data Platforms", body: "Governed data sharing between departments with strong access control." },
        { icon: "chart", title: "Performance Dashboards", body: "Transparent reporting on service levels and outcomes." },
        { icon: "shield", title: "Security and Compliance", body: "Protection for sensitive citizen data and critical systems." },
      ],
    },
    why: {
      heading: "Service design first",
      body: "We design around citizens and front-line staff, keep solutions accessible and secure, and deliver in phases that fit public procurement and governance.",
    },
    related: ["digital-transformation", "cybersecurity", "cloud-services", "digital-infrastructure"],
    faq: [
      { question: "Can you work within public procurement processes?", answer: "Yes. We can structure proposals and delivery phases to fit tendering and governance requirements." },
      { question: "How do you handle sensitive citizen data?", answer: "With strict access control, encryption, audit trails and hosting that meets data residency requirements." },
      { question: "Can services support multiple languages?", answer: "Yes. Portals and AI assistants can support English and other languages." },
      { question: "Do you digitise existing paper processes?", answer: "Yes. We map current processes, simplify them and move them to digital workflows." },
    ],
  },
  {
    slug: "healthcare-life-sciences",
    icon: "heart",
    title: "Healthcare and Life Sciences",
    blurb: "Patient experience and clinical operations",
    summary: "Connected patient data, clinical workflow automation and secure platforms.",
    items: [],
    heading: "Better Care Through Connected Technology",
    notch: "Patient-centred and secure",
    intro:
      "We help hospitals, clinics, labs and pharma companies improve patient experience, reduce administrative load on clinicians and connect data securely across systems.",
    imageAlt: "a doctor and nurse reviewing patient records on a tablet",
    offer: {
      badge: "Solutions",
      heading: "Technology for better outcomes",
      body: "More time for care, less time on administration.",
      cards: [
        { icon: "phone", title: "Patient Access", body: "Online booking, reminders and AI assistants that reduce no-shows and call volumes." },
        { icon: "clipboard", title: "Clinical Admin Automation", body: "Referrals, forms and documentation handled automatically." },
        { icon: "link", title: "Connected Health Data", body: "Integration between records, lab and billing systems for a complete view." },
        { icon: "chart", title: "Operational Analytics", body: "Insight into capacity, waiting times and resource use." },
        { icon: "flow", title: "Revenue Cycle", body: "Automated billing, claims and payment follow-up." },
        { icon: "lock", title: "Data Protection", body: "Privacy and security controls for sensitive health information." },
      ],
    },
    why: {
      heading: "Technology that gives time back to care",
      body: "We focus on the administrative work that pulls clinicians away from patients, and protect health data at every step.",
    },
    related: ["digital-ftes", "cybersecurity", "data-analytics", "cloud-services"],
    faq: [
      { question: "How do you protect patient data?", answer: "With encryption, role-based access, audit logging and hosting that meets healthcare privacy requirements." },
      { question: "Can AI help with appointment management?", answer: "Yes. AI assistants handle bookings, reminders and rescheduling, reducing no-shows and front-desk load." },
      { question: "Do you integrate with hospital systems?", answer: "Yes. We connect with existing records, lab and billing systems through standard interfaces and APIs." },
      { question: "Do you work with pharma and labs?", answer: "Yes. Our work covers providers, diagnostics and life sciences companies." },
    ],
  },
  {
    slug: "retail-cpg",
    icon: "cart",
    title: "Retail and CPG",
    blurb: "Commerce, demand and customer journeys",
    summary: "Omnichannel commerce, demand forecasting and personalised customer journeys.",
    items: [],
    heading: "Sell Smarter Across Every Channel",
    notch: "Connected commerce, personalised journeys",
    intro:
      "We help retailers and consumer brands connect online and offline sales, forecast demand accurately and personalise every customer interaction.",
    imageAlt: "a store manager checking stock levels in a supermarket aisle",
    offer: {
      badge: "Solutions",
      heading: "Technology for modern retail",
      body: "More revenue per customer and less waste across the value chain.",
      cards: [
        { icon: "cart", title: "Digital Commerce", body: "Storefronts, B2B ordering portals and catalogues built to convert." },
        { icon: "gauge", title: "Demand Forecasting", body: "Predict demand by product, store and season to optimise stock." },
        { icon: "megaphone", title: "Personalised Marketing", body: "Segmented campaigns and recommendations driven by customer data." },
        { icon: "bot", title: "AI Sales Agents", body: "Agents that prospect distributors and trade buyers and book meetings." },
        { icon: "chat", title: "Customer Service Automation", body: "Order tracking, returns and product questions answered instantly." },
        { icon: "chart", title: "Retail Analytics", body: "Sales, margin and inventory insight in one view." },
      ],
    },
    why: {
      heading: "Proven with consumer brands",
      body: "We have built AI sales departments and product catalogues for manufacturers and brands like ProPac Solution and Asmar Paints.",
    },
    related: ["digital-ftes", "digital-transformation", "data-analytics", "cloud-services"],
    faq: [
      { question: "Can you connect our online and offline sales data?", answer: "Yes. We integrate POS, e-commerce and ERP data into a single view of sales and inventory." },
      { question: "How accurate is demand forecasting?", answer: "Accuracy depends on your data history; we measure it against your current method and improve it over time." },
      { question: "Can AI help us reach new distributors?", answer: "Yes. AI sales agents research, contact and qualify trade buyers, then book meetings for your team." },
      { question: "Do you build B2B ordering portals?", answer: "Yes. We build catalogues and ordering portals for distributors, dealers and trade customers." },
    ],
  },
  {
    slug: "logistics-supply-chain",
    icon: "truck",
    title: "Logistics and Supply Chain",
    blurb: "Visibility, exceptions and shipper outreach",
    summary: "Shipment visibility, exception handling and automated shipper outreach.",
    items: [],
    heading: "Keep Goods and Information Moving",
    notch: "Visibility and control, end to end",
    intro:
      "We help logistics providers, distributors and shippers gain real-time visibility, automate exception handling and grow their customer base with AI-driven sales.",
    imageAlt: "logistics coordinators checking shipments in a warehouse",
    offer: {
      badge: "Solutions",
      heading: "Technology for resilient supply chains",
      body: "Fewer delays, faster responses and lower operating cost.",
      cards: [
        { icon: "eye", title: "Shipment Visibility", body: "Real-time tracking and status updates across carriers and partners." },
        { icon: "bolt", title: "Exception Handling", body: "Agents that detect delays and issues and trigger the right response." },
        { icon: "bot", title: "AI Sales Department", body: "Outbound prospecting to shippers and distributors, with booked calls." },
        { icon: "shield", title: "Compliance Checks", body: "Automated document and compliance verification for shipments." },
        { icon: "gauge", title: "Supplier Scoring", body: "Performance and risk scoring for suppliers and carriers." },
        { icon: "chart", title: "Operations Analytics", body: "Insight into lead times, costs and on-time performance." },
      ],
    },
    why: {
      heading: "Delivered for logistics clients",
      body: "For Diexus we built an AI sales department plus shipment exception, compliance and supplier scoring agents across four execution phases.",
    },
    related: ["digital-ftes", "data-analytics", "cloud-services", "digital-transformation"],
    faq: [
      { question: "Can you integrate with our carriers' systems?", answer: "Yes. We connect to carrier APIs, EDI feeds and tracking portals to consolidate shipment data." },
      { question: "What does an exception agent do?", answer: "It watches for delays, missing documents or anomalies and alerts the right person or triggers an automated fix." },
      { question: "Can AI help us win new shippers?", answer: "Yes. AI sales agents research and contact prospective shippers and book calls for your sales team." },
      { question: "Do you work with warehouses too?", answer: "Yes. We automate warehouse reporting, inventory updates and order processing." },
    ],
  },
  {
    slug: "automotive-manufacturing",
    icon: "factory",
    title: "Automotive and Manufacturing",
    blurb: "Smart factory and supply chain",
    summary: "Smart factory operations, supply chain visibility and connected products.",
    items: [],
    heading: "Smarter Factories, Stronger Supply Chains",
    notch: "Efficient, connected operations",
    intro:
      "We help manufacturers and automotive businesses connect production data, improve quality and planning, and modernise dealer and customer experiences.",
    imageAlt: "engineers reviewing production data beside an assembly line",
    offer: {
      badge: "Solutions",
      heading: "Technology for modern manufacturing",
      body: "Higher output and quality with better visibility across operations.",
      cards: [
        { icon: "signal", title: "Connected Production", body: "IoT sensors and dashboards that show machine and line performance in real time." },
        { icon: "gauge", title: "Predictive Maintenance", body: "Models that anticipate equipment failures before they stop production." },
        { icon: "eye", title: "Quality Analytics", body: "Detect defects and root causes earlier using production data." },
        { icon: "truck", title: "Supply Chain Planning", body: "Better forecasting and supplier visibility for materials and parts." },
        { icon: "cart", title: "Dealer and B2B Portals", body: "Ordering, catalogues and support portals for dealers and distributors." },
        { icon: "flow", title: "Back-Office Automation", body: "Purchase orders, invoices and reporting processed automatically." },
      ],
    },
    why: {
      heading: "From shop floor to top floor",
      body: "We connect operational technology with business systems, so production data informs planning, sales and service decisions.",
    },
    related: ["digital-ftes", "data-analytics", "digital-transformation", "digital-infrastructure"],
    faq: [
      { question: "Can you connect older machines?", answer: "Often, yes. Retrofit sensors and gateways can bring data from legacy equipment into modern dashboards." },
      { question: "What is predictive maintenance?", answer: "Using machine data to predict failures so maintenance happens before a breakdown, reducing downtime." },
      { question: "Do you integrate with our ERP?", answer: "Yes. We connect production and supply chain data with your ERP for accurate planning." },
      { question: "Can you help with dealer networks?", answer: "Yes. We build dealer portals and automate ordering, warranty and support processes." },
    ],
  },
  {
    slug: "hospitality-travel",
    icon: "bed",
    title: "Hospitality and Travel",
    blurb: "Bookings, guest journeys and operations",
    summary: "Seamless digital bookings, personalised guest journeys and service operations.",
    items: [],
    heading: "Memorable Guest Experiences, Efficiently Delivered",
    notch: "From booking to checkout",
    intro:
      "We help hotels, restaurants and travel businesses simplify bookings, personalise every stay and run service operations more efficiently.",
    imageAlt: "a hotel front-desk team checking in a guest",
    offer: {
      badge: "Solutions",
      heading: "Technology for hospitality",
      body: "Happier guests, more direct bookings and smoother operations.",
      cards: [
        { icon: "globe", title: "Direct Booking", body: "Booking engines and websites that convert visitors into direct reservations." },
        { icon: "chat", title: "Guest Messaging", body: "AI assistants for enquiries, reservations and requests on WhatsApp and web." },
        { icon: "phone", title: "Voice Reservations", body: "Voice agents that answer calls and take bookings at any hour." },
        { icon: "megaphone", title: "Personalised Offers", body: "Targeted campaigns and loyalty offers based on guest history." },
        { icon: "flow", title: "Operations Automation", body: "Housekeeping, maintenance and task coordination streamlined." },
        { icon: "chart", title: "Revenue Insights", body: "Occupancy, pricing and channel performance in one dashboard." },
      ],
    },
    why: {
      heading: "Service that never sleeps",
      body: "AI assistants and voice agents answer guests instantly at any hour, while your team focuses on the in-person experience.",
    },
    related: ["digital-ftes", "digital-transformation", "data-analytics", "cloud-services"],
    faq: [
      { question: "Can AI take reservations?", answer: "Yes. Chat and voice agents can check availability, take bookings and send confirmations through your booking system." },
      { question: "Will guests know they are talking to AI?", answer: "We recommend being transparent, and every assistant can hand the conversation to staff at any time." },
      { question: "Can you increase direct bookings?", answer: "A faster booking experience, instant responses and targeted offers all help shift bookings from third-party channels." },
      { question: "Do you work with restaurants and travel agencies?", answer: "Yes. Our hospitality work covers hotels, restaurants, tour operators and travel agencies." },
    ],
  },
  {
    slug: "energy-utilities",
    icon: "bolt",
    title: "Energy and Utilities",
    blurb: "Assets, reliability and field service",
    summary: "Asset management, network reliability and field-service optimisation.",
    items: [],
    heading: "Reliable Energy Through Intelligent Operations",
    notch: "Resilient assets and networks",
    intro:
      "We help energy, utility and renewable businesses monitor assets, predict failures, optimise field work and serve customers more efficiently.",
    imageAlt: "engineers at a solar farm reviewing asset monitoring data",
    offer: {
      badge: "Solutions",
      heading: "Technology for resilient utilities",
      body: "Higher reliability and lower operating cost across networks and assets.",
      cards: [
        { icon: "signal", title: "Asset Monitoring", body: "Connected sensors and dashboards for plants, grids and renewable sites." },
        { icon: "gauge", title: "Predictive Maintenance", body: "Anticipate equipment issues before they cause outages." },
        { icon: "truck", title: "Field Service Optimisation", body: "Smarter scheduling, routing and mobile tools for field teams." },
        { icon: "chat", title: "Customer Service Automation", body: "AI assistants for billing, outage and connection queries." },
        { icon: "chart", title: "Consumption Analytics", body: "Insight into demand, losses and usage patterns." },
        { icon: "shield", title: "Critical Infrastructure Security", body: "Protection for operational systems and sensitive data." },
      ],
    },
    why: {
      heading: "Data-driven reliability",
      body: "We connect operational data with business systems, so maintenance, field work and customer service are guided by what is actually happening on the network.",
    },
    related: ["digital-ftes", "data-analytics", "digital-infrastructure", "cybersecurity"],
    faq: [
      { question: "Can you work with renewable energy operators?", answer: "Yes. We monitor solar and other renewable assets and analyse their performance." },
      { question: "How does predictive maintenance reduce outages?", answer: "By spotting early warning signs in equipment data, so repairs happen before failures." },
      { question: "Can AI handle outage enquiries?", answer: "Yes. AI assistants give customers real-time outage information and reduce call-centre load during incidents." },
      { question: "How do you secure operational systems?", answer: "With network segmentation, access control and monitoring designed for critical infrastructure." },
    ],
  },
];

export function getServicePage(slug: string): DetailPage | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}

export function getIndustryPage(slug: string): DetailPage | undefined {
  return INDUSTRY_PAGES.find((p) => p.slug === slug);
}

export const serviceHref = (slug: string): string => `/services/${slug}`;
export const industryHref = (slug: string): string => `/industries/${slug}`;

/** Navbar menu entries. */
export interface NavMenuItem {
  readonly href: string;
  readonly title: string;
  readonly blurb: string;
  /** When present, listed under the title instead of the blurb (the Services menu). */
  readonly points?: readonly string[];
  readonly icon: EnterpriseIconName;
}

export const SERVICES_MENU: readonly NavMenuItem[] = SERVICE_PAGES.map((p) => ({
  href: serviceHref(p.slug),
  title: p.title,
  blurb: p.blurb,
  points: p.items,
  icon: p.icon,
}));

export const INDUSTRIES_MENU: readonly NavMenuItem[] = INDUSTRY_PAGES.map((p) => ({
  href: industryHref(p.slug),
  title: p.title,
  blurb: p.blurb,
  icon: p.icon,
}));
