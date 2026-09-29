"use client";

/**
 * Opens Cal.com's booking popup for every link to `BOOKING_URL` (see `lib/booking.ts`).
 * Mounted once in `app/layout.tsx`; renders nothing.
 *
 * One delegated, capture-phase click listener instead of wiring each button: the CTAs are
 * Framer-ported `<a>`s spread across several components, and any future link to the booking
 * page gets the popup automatically. Modified clicks (new tab, middle click) are left alone,
 * and until Cal's script has loaded the click simply follows the link, so booking always
 * works.
 *
 * Cal's script (from app.cal.com) is loaded lazily: when the browser is idle, or earlier if
 * the visitor points at / focuses a booking link, so it never competes with the first paint.
 * The popup is themed to the site: light mode, brand blue #05f.
 */

import * as React from "react";
import { getCalApi } from "@calcom/embed-react";

import { CAL_LINK, CAL_NAMESPACE, isBookingHref } from "@/lib/booking";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

const CAL_CONFIG = { layout: "month_view", theme: "light" } as const;

function bookingAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const a = target.closest("a");
  return a && isBookingHref(a.getAttribute("href")) ? a : null;
}

export function CalBookingPopup(): null {
  const calRef = React.useRef<CalApi | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let started = false;

    const init = () => {
      if (started) return;
      started = true;
      void getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
        if (cancelled) return;
        cal("ui", {
          theme: "light",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#0055ff" },
            dark: { "cal-brand": "#0055ff" },
          },
        });
        calRef.current = cal;
      });
    };

    // Warm up early if the visitor heads for a booking link.
    const onIntent = (event: Event) => {
      if (bookingAnchor(event.target)) init();
    };

    const onClick = (event: MouseEvent) => {
      const anchor = bookingAnchor(event.target);
      if (!anchor) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const cal = calRef.current;
      if (!cal) {
        init(); // Not loaded yet: follow the link this time.
        return;
      }
      event.preventDefault();
      cal("modal", { calLink: CAL_LINK, config: CAL_CONFIG });
    };

    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent);
    document.addEventListener("click", onClick, true);

    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(init, { timeout: 4000 })
      : globalThis.setTimeout(init, 2500);

    return () => {
      cancelled = true;
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("click", onClick, true);
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else globalThis.clearTimeout(idle);
    };
  }, []);

  return null;
}

export default CalBookingPopup;
