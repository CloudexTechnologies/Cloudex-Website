/**
 * Copy for `/ai-workforce`: how Cloudex Technologies builds Digital FTEs (AI employees) and
 * the model behind them — the 10-80-10 rule, the Knowledge and Data Systems of Record,
 * and Forward Deployed Engineers.
 *
 * Concepts follow the Panaversity *AI Agent Factory* curriculum (glossary, thesis, the
 * FDE AF Model and System of Context pages); the wording is Cloudex Technologies's own.
 * Positioning rule: AI works for the client's team, never instead of it.
 */

import type { FaqItem } from "@/components/shared/faq-content";

import type { EnterpriseCard, EnterpriseImage, EnterpriseStat } from "./enterprise-content";

export const AI_WORKFORCE_HERO = {
  badge: "AI Workforce",
  heading: "Digital FTEs That Work for Your Team",
  notch: "Your people lead, AI does the heavy lifting",
  intro:
    "A Digital FTE is an AI employee built for one role on your team. We ground it in your rules and your data, our engineers deploy it inside your business, and your people stay in charge of every result.",
  stats: [
    { value: "10-80-10", label: "Your team leads" },
    { value: "24/7", label: "Cover for your team" },
    { value: "2", label: "Systems of Record" },
  ],
  image: {
    src: "/assets/images/ai/c-2-1536.jpg",
    srcSet:
      "/assets/images/ai/c-2-512.jpg 512w,/assets/images/ai/c-2-1024.jpg 1024w,/assets/images/ai/c-2-1536.jpg 1536w",
    width: 1536,
    height: 1024,
    alt: "an engineer walking a client team through live operations dashboards",
  },
} as const satisfies {
  badge: string;
  heading: string;
  notch: string;
  intro: string;
  stats: readonly EnterpriseStat[];
  image: EnterpriseImage;
};

export const AI_WORKFORCE_MODEL_SECTION = {
  badge: "The model",
  heading: "An AI workforce your team can trust",
  body: "Digital FTEs work alongside your people and read from the same trusted sources your business already runs on.",
  ctaLabel: "See our Digital FTEs",
  ctaHref: "/services/digital-ftes",
  ctaUuids: [
    "2a673acf-5eda-4ae3-b082-743ca4d133a1",
    "a48f8ae2-7e2e-482f-b117-17803e862d13",
    "898990af-bbb9-4527-b4ef-e8745ac6cd38",
  ],
} as const;

export const AI_WORKFORCE_MODEL_CARDS: readonly EnterpriseCard[] = [
  {
    icon: "bot",
    title: "Digital FTEs",
    body: "AI employees, each built for one role such as sales outreach, customer support, operations or reporting, working inside the tools your team already uses.",
  },
  {
    icon: "users",
    title: "Hybrid Workforce",
    body: "Your people and your Digital FTEs work side by side. People bring judgement and creativity; Digital FTEs bring scale and consistency.",
  },
  {
    icon: "flow",
    title: "The 10-80-10 Rule",
    body: "Your team sets the direction (the first 10%), Digital FTEs do the heavy lifting (the middle 80%), and your team reviews and approves (the final 10%).",
  },
  {
    icon: "database",
    title: "KSoR: Knowledge System of Record",
    body: "Your policies, procedures and methods in one governed home, with an owner, versions and review, so every answer a Digital FTE gives can be traced to its source.",
  },
  {
    icon: "layers",
    title: "DSoR: Data System of Record",
    body: "The systems that hold your live business data, such as your CRM, ERP or ledger. The KSoR says what the rule is; the DSoR says what the number is.",
  },
  {
    icon: "link",
    title: "System of Context",
    body: "The connecting layer that finds, filters and assembles what each task needs from both records, within the permissions your team sets.",
  },
];

export const AI_WORKFORCE_RULE_SECTION = {
  badge: "The 10-80-10 Rule",
  heading: "Nothing ships without your sign-off",
  body: "First 10%: your team defines the goal, the rules and who approves what. Middle 80%: Digital FTEs do the repetitive, round-the-clock work. Final 10%: your people review the result and make the call. Your team spends less time on busywork and more on the decisions only they can make.",
  ctaLabel: "Book a call",
  ctaHref: "/contact",
  ctaUuids: [
    "c4a4d8e2-7961-41ee-9061-116c89b2dafe",
    "fa8da262-6a65-4ae3-a938-112b63e45a9a",
    "f6cc562c-5a83-406b-93b6-7a3a2747c930",
  ],
} as const;

export const AI_WORKFORCE_FDE_SECTION = {
  badge: "How we deliver",
  heading: "Forward Deployed Engineers, inside your business",
  body: "We do not hand over a tool and leave. Our engineers join your team, fit each Digital FTE to your workflows and prove the result in your real work.",
  ctaLabel: "Talk to an engineer",
  ctaHref: "/contact",
  ctaUuids: [
    "25f45429-90e8-47af-bc3e-480c9e31c1af",
    "03732a77-b6cf-4be2-8a87-ab7dfc8ce2a6",
    "1817d36d-5c83-4915-baca-4927632f78b9",
  ],
} as const;

export const AI_WORKFORCE_FDE_CARDS: readonly EnterpriseCard[] = [
  {
    icon: "users",
    title: "Forward Deployed Engineers",
    body: "Engineers who work inside your business, learn your systems and rules, and build, deploy and run your Digital FTEs with your team.",
  },
  {
    icon: "compass",
    title: "Outcome Architect",
    body: "Owns the business side: the problem to solve, the redesigned workflow between your people and Digital FTEs, the target and adoption.",
  },
  {
    icon: "clipboard",
    title: "Contract of Success",
    body: "Before anything is built, we agree three things in writing: today's baseline, the target, and the acceptance criteria that mean the work is done.",
  },
  {
    icon: "gauge",
    title: "Proof in Production",
    body: "Success is shown in your real day-to-day work: business KPIs against the baseline, your team's adoption, and ongoing evaluations.",
  },
  {
    icon: "shield",
    title: "Guardrails and Approvals",
    body: "Permissions, approval gates and policy checks are built into the system, so sensitive actions always wait for a person.",
  },
  {
    icon: "refresh",
    title: "Continuous Improvement",
    body: "Every Digital FTE is monitored and evaluated after launch, and its knowledge is kept current as your policies and systems change.",
  },
];

export const AI_WORKFORCE_FAQ: readonly FaqItem[] = [
  {
    question: "What is a Digital FTE?",
    answer:
      "A Digital FTE (Digital Full-Time Equivalent) is an AI employee built for one role, such as sales outreach, customer support or reporting. It works inside your existing tools, around the clock, under your team's oversight.",
  },
  {
    question: "Will Digital FTEs replace my staff?",
    answer:
      "No. They work for your team, not instead of it. Your people set the direction and approve the results, while Digital FTEs take on the repetitive work in between and hand anything that needs judgement to a person.",
  },
  {
    question: "What is the difference between KSoR and DSoR?",
    answer:
      "The Knowledge System of Record (KSoR) holds your rules: policies, procedures and methods. The Data System of Record (DSoR) holds your state: the live data in your CRM, ERP or ledger. A Digital FTE needs both to answer correctly.",
  },
  {
    question: "What does a Forward Deployed Engineer do?",
    answer:
      "An FDE works inside your business rather than from a distance. They connect Digital FTEs to your systems and data, build the evaluations and guardrails, and run the solution in production with your team.",
  },
  {
    question: "How do we know it is working?",
    answer:
      "We agree a baseline, a target and acceptance criteria before building. After launch, we report on your business KPIs, your team's adoption and ongoing evaluations of each Digital FTE.",
  },
];
