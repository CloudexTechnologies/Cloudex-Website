/**
 * The hand-authored pages. Article routes are appended from Sanity at request
 * time, so this list only needs to cover what lives in the repo.
 */
export const STATIC_ROUTES: {
  path: string;
  label: string;
  group: "core" | "capabilities" | "industries";
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}[] = [
  { path: "/", label: "Homepage", group: "core", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", label: "About", group: "core", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", label: "Our Work", group: "core", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", label: "Insights", group: "core", priority: 0.9, changeFrequency: "daily" },
  { path: "/contact", label: "Contact", group: "core", priority: 0.7, changeFrequency: "monthly" },

  { path: "/capabilities/ai-employees", label: "AI Employees", group: "capabilities", priority: 0.9, changeFrequency: "monthly" },
  { path: "/capabilities/ai-solutions", label: "AI Solutions", group: "capabilities", priority: 0.9, changeFrequency: "monthly" },
  { path: "/capabilities/custom-software", label: "Custom Software", group: "capabilities", priority: 0.9, changeFrequency: "monthly" },
  { path: "/capabilities/digital-growth", label: "Digital Growth", group: "capabilities", priority: 0.9, changeFrequency: "monthly" },

  { path: "/industries/healthcare", label: "Healthcare", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/finance", label: "Financial Services", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/ecommerce", label: "E-commerce", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/real-estate", label: "Real Estate", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/saas-tech", label: "SaaS & Technology", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/legal", label: "Legal", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/education", label: "Education", group: "industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/industries/hospitality", label: "Hospitality", group: "industries", priority: 0.7, changeFrequency: "monthly" },
];
