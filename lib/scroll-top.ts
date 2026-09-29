import type * as React from "react";

/**
 * "Land at the top of the next page" for in-site links.
 *
 * Next's `<Link>` keeps the current scroll position while the new Page is "visible", and
 * decides visibility from the Page's first rendered element. Every route here starts with
 * a `display: contents` root (the Framer CSS-scope carrier), which Next skips, so a link
 * clicked far down a page lands equally far down the next one: near the end of a shorter
 * page. `SiteNavbar` already re-asserts the top for its own links; this is the same fix
 * for links elsewhere (the navbar mega menu, overview and related cards).
 *
 * Only an explicit click arms it, so back/forward keep native scroll restoration.
 */

let pending = false;

/** Call from a link's `onClick`; `ScrollTopOnNavigate` scrolls once the route commits. */
export function armScrollToTop(event?: { button?: number; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }): void {
  // New-tab and modified clicks don't navigate this window.
  if (event && (event.button !== undefined && event.button !== 0)) return;
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  pending = true;
}

/** Returns whether a scroll-to-top was requested, and clears the request. */
export function consumeScrollToTop(): boolean {
  const was = pending;
  pending = false;
  return was;
}

/**
 * `onClick` for an in-site link: arms the scroll for a new route, or, when the link
 * points at the page already showing (a no-op in the App Router), scrolls there directly.
 */
export function scrollTopOnClick(href: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>): void => {
    if (event.defaultPrevented) return;
    if (typeof window !== "undefined" && href === window.location.pathname) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    armScrollToTop(event);
  };
}
