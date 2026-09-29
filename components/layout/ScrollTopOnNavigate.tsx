"use client";

/**
 * Scrolls to the top after a navigation that `armScrollToTop` requested. Mounted once in
 * `app/layout.tsx`; renders nothing. See `lib/scroll-top.ts` for why this exists.
 */

import * as React from "react";
import { usePathname } from "next/navigation";

import { consumeScrollToTop } from "@/lib/scroll-top";

export function ScrollTopOnNavigate(): null {
  const pathname = usePathname();
  React.useEffect(() => {
    if (consumeScrollToTop()) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default ScrollTopOnNavigate;
