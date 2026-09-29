import type { ReactNode } from "react";

import "@/app/insights/insights.css";

/**
 * Page wrapper for the insights routes. The site navbar and footer come from
 * `app/layout.tsx`; this only supplies the theme variables the insights components read
 * (`app/insights/insights.css`) and clears the fixed navbar.
 */
export function InsightsShell({ children }: { children: ReactNode }) {
  return <main className="insights-root">{children}</main>;
}
