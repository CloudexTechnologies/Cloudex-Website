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
    ];
  },
};

export default nextConfig;
