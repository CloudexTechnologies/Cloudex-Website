/**
 * Line icons for the enterprise cards.
 *
 * The about page's "Why us" icons are `<use>` references into Framer's page sprite, which
 * holds only those six glyphs. These are drawn inline instead, on the same 24×24 box and
 * the same 1.5 stroke, and sized by the card's shared `framer-h7edyu` class.
 */

import * as React from "react";

import { TOKEN_WHITE } from "@/components/about/about-tokens";

const PATHS = {
  bot: "M6 9h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM12 5v4M9 14h.01M15 14h.01M9.5 17.5h5",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5 5-2z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
  chart: "M4 20V11M10 20V5M16 20v-6M21 20H3",
  cloud: "M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.6 1.6A3.8 3.8 0 0 1 17.5 18H7z",
  lock: "M6 11h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM8 11V7a4 4 0 0 1 8 0v4",
  server: "M5 4h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM5 13h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zM7 7.5h.01M7 16.5h.01",
  cpu: "M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  users: "M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6",
  bank: "M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18",
  signal: "M12 20v-6M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8",
  landmark: "M12 3l9 4H3l9-4zM5 7v11M19 7v11M9 7v11M15 7v11M3 21h18",
  heart: "M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1zM7 12h3l1.5-2.5 2 5 1.5-2.5H17",
  cart: "M9 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM18 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 3h3l2.7 12.5h11.5L21.5 7H6.3",
  truck: "M2 6h12v10H2zM14 10h4l3 3v3h-7M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  factory: "M3 21V10l6 4v-4l6 4V5h4v16H3zM7 17h2M12 17h2",
  bed: "M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-8v3M7 8.7a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  flow: "M4.5 3h3a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 7.5 9h-3A1.5 1.5 0 0 1 3 7.5v-3A1.5 1.5 0 0 1 4.5 3zM16.5 15h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5zM9 6h6a3 3 0 0 1 3 3v6",
  megaphone: "M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1zM17 8a5 5 0 0 1 0 8",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  link: "M10 14a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1M14 10a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1-1",
  refresh: "M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  gauge: "M12 14l4-4M3.5 17a9 9 0 1 1 17 0",
  clipboard: "M9 4h6v3H9zM8 5.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-2M9 12h6M9 16h4",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  wallet: "M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12M16 13.5h.01",
  key: "M15 7a4 4 0 1 0-3.9 4.9L3 20v1h3l1-1v-2h2v-2h2l1.1-1.1A4 4 0 0 0 15 7z",
} as const;

export type EnterpriseIconName = keyof typeof PATHS;

export function EnterpriseIcon({
  name,
  className = "framer-h7edyu",
  size,
}: {
  name: EnterpriseIconName;
  className?: string;
  /** Explicit px size, for uses outside the card's sizing class (e.g. the navbar menu). */
  size?: number;
}): React.ReactElement {
  return (
    <svg
      className={className || undefined}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={TOKEN_WHITE}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
