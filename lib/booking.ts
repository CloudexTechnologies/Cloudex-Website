/**
 * Cal.com booking: the one place the discovery-call link lives.
 *
 * Every "book a call" CTA links to `BOOKING_URL`, so it works as a plain link without
 * JavaScript (and on middle-click / Ctrl-click opens Cal.com in a new tab). With JavaScript,
 * `CalBookingPopup` (mounted once in `app/layout.tsx`) intercepts ordinary clicks on any link
 * to this URL and opens Cal.com's embed as a popup over the page instead.
 */

/** `<username>/<event-slug>` on cal.com. */
export const CAL_LINK = "cloudex-technology/30min";

export const BOOKING_URL = `https://cal.com/${CAL_LINK}`;

/** Namespaces this site's Cal instance so it cannot collide with another embed. */
export const CAL_NAMESPACE = "discovery-call";

/** True for any link to the booking page (case-insensitive host, optional trailing slash). */
export function isBookingHref(href: string | null | undefined): boolean {
  if (!href) return false;
  return href.replace(/\/+$/, "").toLowerCase() === BOOKING_URL.toLowerCase();
}
