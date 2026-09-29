/**
 * llms.txt (https://llmstxt.org): a Markdown map of the site for AI assistants and answer
 * engines. `/llms.txt` is the concise index; `/llms-full.txt` inlines the substance of every
 * service and industry page so a model can answer "what does Cloudex Technologies do?" from one
 * fetch. Both are generated from the same data the pages render.
 */

import { INDUSTRY_PAGES, SERVICE_PAGES, industryHref, serviceHref } from "@/components/enterprise/detail-pages";
import { SERVICES_FAQ } from "@/components/enterprise/enterprise-content";
import { HOME_FAQ_ITEMS } from "@/components/shared/faq-content";

import { BOOKING_URL } from "./booking";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "./site";

const header = (): string[] => [
  `# ${SITE_NAME}`,
  "",
  `> ${SITE_DESCRIPTION}`,
  "",
  `${SITE_NAME} is an AI Native Technology Firm headquartered in Wolverhampton, United Kingdom. Its core practice is building Digital FTEs: AI employees for sales, support, operations and content that work alongside a client's team under the 10-80-10 rule (people set the direction, AI does the heavy lifting, people approve the result). Its Forward Deployed Engineers ground each Digital FTE in a Knowledge System of Record (KSoR) and the client's Data System of Record (DSoR). It also works as a consulting and technology partner for corporates across digital transformation, data, cloud, cybersecurity and infrastructure.`,
  "",
  "Key facts:",
  "- Founded 2022; AI Native Technology Firm since 2025",
  "- 50+ works automated, 1000+ daily AI interactions, clients save around 70% of the time on automated work",
  "- Clients include ProPac Solution, Diexus, MIMA Group and Asmar Paints",
  `- Contact: ${CONTACT.email}, ${CONTACT.phone}, ${CONTACT.streetAddress}, ${CONTACT.locality}, ${CONTACT.countryName}; ${CONTACT.hours}`,
  `- Book a discovery call: ${BOOKING_URL}`,
  "",
];

export interface LlmsArticle {
  title: string;
  slug: string;
  publishedAt: string;
}

export function llmsTxt(articles: readonly LlmsArticle[] = []): string {
  const lines = [
    ...header(),
    "## Main pages",
    "",
    `- [Home](${absoluteUrl("/")}): Digital FTEs (AI employees) that work alongside your team; the 10-80-10 rule, solutions, case studies and FAQs`,
    `- [Services](${absoluteUrl("/services")}): all six service lines, led by Digital FTEs`,
    `- [AI Workforce](${absoluteUrl("/ai-workforce")}): Digital FTEs, the 10-80-10 rule, Knowledge and Data Systems of Record (KSoR, DSoR) and Forward Deployed Engineers`,
    `- [Industries](${absoluteUrl("/industries")}): the nine industries served and how engagements work`,
    `- [About](${absoluteUrl("/about")}): company story, why clients choose Cloudex Technologies, and life at the company`,
    `- [Contact](${absoluteUrl("/contact")}): email, phone, office address and contact form`,
    `- [Insights](${absoluteUrl("/insights")}): articles on AI agents, automation and AI adoption`,
    "",
    "## Services",
    "",
    ...SERVICE_PAGES.map((p) => `- [${p.title}](${absoluteUrl(serviceHref(p.slug))}): ${p.intro}`),
    "",
    "## Industries",
    "",
    ...INDUSTRY_PAGES.map((p) => `- [${p.title}](${absoluteUrl(industryHref(p.slug))}): ${p.summary}`),
    "",
    ...(articles.length
      ? [
          "## Insights",
          "",
          ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/insights/${a.slug}`)}) (${a.publishedAt.slice(0, 10)})`),
          "",
        ]
      : []),
    "## Optional",
    "",
    `- [Full detail for AI assistants](${absoluteUrl("/llms-full.txt")}): every service and industry page in one document`,
    `- [Privacy policy](${absoluteUrl("/legal-pages/privacy-policy")})`,
    "",
  ];
  return lines.join("\n");
}

export function llmsFullTxt(): string {
  const lines = [...header()];

  lines.push("## Services", "");
  for (const p of SERVICE_PAGES) {
    lines.push(`### ${p.title}`, "", `URL: ${absoluteUrl(serviceHref(p.slug))}`, "", p.intro, "", `${p.offer.heading}:`);
    for (const c of p.offer.cards) lines.push(`- ${c.title}: ${c.body}`);
    lines.push("", `${p.why.heading}: ${p.why.body}`, "", "FAQ:");
    for (const f of p.faq) lines.push(`- Q: ${f.question}`, `  A: ${f.answer}`);
    lines.push("");
  }

  lines.push("## Industries", "");
  for (const p of INDUSTRY_PAGES) {
    lines.push(`### ${p.title}`, "", `URL: ${absoluteUrl(industryHref(p.slug))}`, "", p.intro, "", `${p.offer.heading}:`);
    for (const c of p.offer.cards) lines.push(`- ${c.title}: ${c.body}`);
    lines.push("", `${p.why.heading}: ${p.why.body}`, "", "FAQ:");
    for (const f of p.faq) lines.push(`- Q: ${f.question}`, `  A: ${f.answer}`);
    lines.push("");
  }

  lines.push("## General FAQ", "");
  for (const f of [...SERVICES_FAQ, ...HOME_FAQ_ITEMS.slice(0, 5)]) lines.push(`- Q: ${f.question}`, `  A: ${f.answer}`);
  lines.push("");

  return lines.join("\n");
}
