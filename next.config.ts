import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All site assets are localised into /public/assets, and the ported Framer
  // markup uses plain <img srcset> exactly as Framer emits it, so next/image
  // is deliberately not used — it would rewrite the markup and break parity.
  images: { unoptimized: true },
  // Service lines merged or retired: keep old links and search results working.
  async redirects() {
    return [
      { source: "/services/intelligent-automation", destination: "/services/digital-ftes", permanent: true },
      { source: "/services/ai-transformation", destination: "/services/digital-ftes", permanent: true },
      { source: "/services/emerging-technologies", destination: "/services", permanent: true },
      { source: "/services/business-process-services", destination: "/services", permanent: true },
      // Routes from the previous Cloudex site.
      { source: "/work", destination: "/about", permanent: true },
      { source: "/capabilities/ai-employees", destination: "/ai-workforce", permanent: true },
      { source: "/capabilities/ai-solutions", destination: "/services/digital-ftes", permanent: true },
      { source: "/capabilities/custom-software", destination: "/services/digital-transformation", permanent: true },
      { source: "/capabilities/digital-growth", destination: "/services", permanent: true },
      { source: "/capabilities", destination: "/services", permanent: true },
      { source: "/industries/healthcare", destination: "/industries/healthcare-life-sciences", permanent: true },
      { source: "/industries/finance", destination: "/industries/banking-financial-services", permanent: true },
      { source: "/industries/ecommerce", destination: "/industries/retail-cpg", permanent: true },
      { source: "/industries/hospitality", destination: "/industries/hospitality-travel", permanent: true },
      { source: "/industries/:slug(real-estate|saas-tech|legal|education)", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
