/**
 * One entry per `/products/<slug>` page, plus the navbar's Products menu, the `/products`
 * grid and the sitemap, which all read from here so a product is defined exactly once.
 *
 * Products are sold on Whop. `checkoutUrl` is a Whop checkout configuration, tagged with
 * `source=cloudextechnologies.io` so these sales are told apart from the Whop store page's;
 * the site-wide Whop Pixel (`lib/whop-pixel.ts`) attributes the visit before it.
 * To add a product: create its plan and checkout configuration with the `whop` CLI, add an
 * entry here, and put its 512/1024/1536 hero images in `public/assets/images/products/`.
 */

import type { FaqItem } from "@/components/shared/faq-content";
import type { EnterpriseIconName } from "@/components/enterprise/EnterpriseIcon";
import type { EnterpriseCard, EnterpriseImage } from "@/components/enterprise/enterprise-content";
import type { NavMenuItem } from "@/components/enterprise/detail-pages";

export interface Product {
  readonly slug: string;
  readonly icon: EnterpriseIconName;
  readonly title: string;
  /** One line under the title in the navbar menu. */
  readonly blurb: string;
  /** Card body on the `/products` grid. */
  readonly summary: string;
  /** Hero `h1`. */
  readonly heading: string;
  /** Hero notch tagline. */
  readonly notch: string;
  readonly intro: string;
  readonly imageAlt: string;
  readonly price: { readonly amount: number; readonly currency: "USD"; readonly label: string; readonly terms: string };
  readonly checkoutUrl: string;
  readonly inside: { readonly heading: string; readonly body: string; readonly cards: readonly EnterpriseCard[] };
  readonly workflow: { readonly heading: string; readonly body: string; readonly cards: readonly EnterpriseCard[] };
  readonly pricing: { readonly heading: string; readonly body: string };
  readonly faq: readonly FaqItem[];
}

/** Product heroes are screenshots: show them whole, on the screenshot's own background. */
export const PRODUCT_IMAGE_FIT = { fit: "contain", background: "rgb(6, 6, 12)" } as const;

export function productImage(slug: string, alt: string): EnterpriseImage {
  const stem = `/assets/images/products/${slug}`;
  return {
    src: `${stem}-1536.jpg`,
    srcSet: `${stem}-512.jpg 512w,${stem}-1024.jpg 1024w,${stem}-1536.jpg 1536w`,
    width: 1536,
    height: 1024,
    alt,
  };
}

export const PRODUCTS: readonly Product[] = [
  {
    slug: "cod-dev-os",
    icon: "code",
    title: "Cod Dev OS",
    blurb: "One command turns a brief into a fully-wired Claude Code project",
    summary:
      "A developer operating system for Claude Code: 9 agents, 56 auto-routing skills, a spec-driven workflow and a persistent memory vault, set up from your project brief in one command.",
    heading: "One command turns a brief into a fully-wired Claude Code project",
    notch: "$129 one-time · MIT licensed",
    intro:
      "Run newproject my-app ~/brief.pdf and Cod Dev OS scaffolds the repo, reads your brief, writes CLAUDE.md with your stack and principles, sets up a persistent memory vault and names the first three specs to run. Before you type a single prompt.",
    imageAlt: "Terminal running newproject: Cod Dev OS scaffolds agents, commands, skills, hooks, specs and a memory vault",
    price: { amount: 129, currency: "USD", label: "$129", terms: "one-time" },
    checkoutUrl: "https://whop.com/checkout/ch_NJ5KDKope600aND/",
    inside: {
      heading: "Five layers, wired to each other",
      body:
        "Most skill packs are a folder of markdown you still have to wire up yourself. The value here is the wiring: agents that know about the memory vault, a router that reads your constitution before it chooses, hooks that fire unasked, and isolation that holds when several agents run at once.",
      cards: [
        {
          icon: "compass",
          title: "Brief to constitution",
          body: "The bootstrap agent reads your PDF or Markdown brief and writes CLAUDE.md plus a project constitution every later decision is checked against.",
          items: ["newproject + /bootstrap", "CLAUDE.md with your stack", "Project constitution"],
        },
        {
          icon: "flow",
          title: "Spec-driven workflow",
          body: "15 workflow commands move work from specify to plan, tasks, implement and ADR, with checklists and prompt history captured on the way.",
          items: ["/sp.specify, /sp.plan", "/sp.tasks, /sp.implement", "/sp.adr, /sp.phr"],
        },
        {
          icon: "users",
          title: "9 specialised agents",
          body: "Each agent owns one job and knows about the memory vault, so a schema change, a deploy or a failing test goes to the agent built for it.",
          items: ["db-architect, deploy-agent", "error-hunter, qa-playwright", "ui-auditor, spec-curator"],
        },
        {
          icon: "spark",
          title: "56 auto-routing skills",
          body: "A router reads your constitution before it picks the expertise for the task. You never call a skill by name.",
          items: ["UI and UX", "Architecture and clean code", "Databases, deploys, testing"],
        },
        {
          icon: "database",
          title: "Persistent memory vault",
          body: "Decisions, codebase state and prompt history live in an Obsidian vault that loads at the start of every session.",
          items: ["Session logs", "Architecture decisions", "Open questions"],
        },
        {
          icon: "shield",
          title: "Hooks and isolation",
          body: "Prettier, black and shfmt run on every file Claude writes, and each issue gets its own git worktree so two agents never clobber one tree.",
          items: ["Formatting hooks", "Per-issue git worktrees", "Session sync"],
        },
      ],
    },
    workflow: {
      heading: "From brief to shipped feature, without re-explaining your project",
      body: "Every session starts with your project's context already loaded, and the right agent or skill steps in for each part of the work.",
      cards: [
        { icon: "bolt", title: "1. Bootstrap", body: "Run newproject with your brief. CLAUDE.md, the constitution and the memory vault are written for you." },
        { icon: "clipboard", title: "2. Specify and plan", body: "/sp.specify and /sp.plan turn a feature idea into a spec and a plan checked against your constitution." },
        { icon: "refresh", title: "3. Build and remember", body: "/sp.tasks and /sp.implement execute the plan, then decisions and ADRs go to the vault for the next session." },
      ],
    },
    pricing: {
      heading: "$129 once. Yours to keep.",
      body:
        "One payment, no subscription. You get the full OS: 9 agents, 56 skills, the spec-driven workflow, the memory vault and setup scripts for Ubuntu, Debian, Fedora and RHEL. MIT licensed, so you can use it commercially and for client work, with 12 months of updates included. Secure checkout by Whop.",
    },
    faq: [
      {
        question: "What do I need to run Cod Dev OS?",
        answer:
          "Claude Code on Ubuntu, Debian, Fedora or RHEL. One setup script installs Node.js, the Claude Code CLI, uv and the formatters, and copies the agents and skills into place.",
      },
      {
        question: "Is it a subscription?",
        answer: "No. It is a one-time $129 payment. The files are yours to keep, and updates are included for 12 months.",
      },
      {
        question: "Can I use it for client work?",
        answer: "Yes. Cod Dev OS is MIT licensed, so you can modify it, use it commercially and build client projects on it.",
      },
      {
        question: "How is it different from a skill pack?",
        answer:
          "A skill pack is a folder of instructions you wire up yourself. Cod Dev OS ships the wiring: agents that read the memory vault, a router that checks your constitution before choosing a skill, hooks that run on every file, and worktree isolation for parallel agents.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const productHref = (slug: string): string => `/products/${slug}`;

export const PRODUCTS_MENU: readonly NavMenuItem[] = PRODUCTS.map((p) => ({
  href: productHref(p.slug),
  title: p.title,
  blurb: p.blurb,
  icon: p.icon,
}));
