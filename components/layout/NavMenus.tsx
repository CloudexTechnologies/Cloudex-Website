"use client";

/**
 * Capabilities / Industries / Products menus for `SiteNavbar`. NOT part of the Framer
 * original: all three were added after the migration. Products lists every page in
 * `components/products/products.ts` and ends with "All products" (`/products`).
 *
 *   • {@link NavMegaPanel} — desktop. Opens below the bar while the pointer is over the
 *     Services or Industries link, lists every page with its one-line blurb, and ends with
 *     a "View all" link. It renders OUTSIDE the `<nav>` (which is `overflow: hidden` at
 *     58px) but inside `.framer-kvjt16-container`, which now owns the hover handlers, so
 *     moving the pointer from the link down into the panel keeps everything open.
 *   • {@link NavSubList} — tablet + phone. Tapping Services or Industries in the open menu
 *     expands its pages underneath instead of navigating; "All capabilities" is the first row.
 *
 * Styling is inline and uses the site's own tokens and the nav link's typography
 * (Inter Display 14px/500, white at 80% resting, 100% on hover).
 */

import * as React from "react";
import NextLink from "next/link";
import { AnimatePresence, motion, type Transition } from "motion/react";

import {
  INDUSTRIES_MENU,
  SERVICES_MENU,
  type NavMenuItem,
} from "@/components/enterprise/detail-pages";
import { EnterpriseIcon } from "@/components/enterprise/EnterpriseIcon";
import { PRODUCTS_MENU } from "@/components/products/products";
import { scrollTopOnClick } from "@/lib/scroll-top";

export type NavMenuKey = "services" | "industries" | "products";

interface NavMenu {
  label: string;
  /** Index page and its "View all" label. Absent for menus with no index route. */
  index?: { href: string; label: string };
  items: readonly NavMenuItem[];
  /** Items link to other sites: plain `<a>`, new tab. */
  external?: boolean;
  columns: number;
  width: number;
}

export const NAV_MENUS: Record<NavMenuKey, NavMenu> = {
  services: { label: "Capabilities", index: { href: "/services", label: "All capabilities" }, items: SERVICES_MENU, columns: 3, width: 820 },
  industries: { label: "Industries", index: { href: "/industries", label: "All industries" }, items: INDUSTRIES_MENU, columns: 3, width: 820 },
  products: {
    label: "Products",
    index: { href: "/products", label: "All products" },
    items: PRODUCTS_MENU,
    columns: Math.min(PRODUCTS_MENU.length, 3),
    width: 300 + 260 * (Math.min(PRODUCTS_MENU.length, 3) - 1),
  },
};

/** Which top-level nav href owns a menu. */
export function menuKeyForHref(href: string): NavMenuKey | undefined {
  if (href === "/services") return "services";
  if (href === "/industries") return "industries";
  if (href === "/products") return "products";
  return undefined;
}

const NAV_BLACK = "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";
const CARD_FILL = "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))";
const BORDER = "rgba(255, 255, 255, 0.1)";
const WHITE = "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const MUTED = "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
const LINK_BLUE = "rgb(0, 153, 255)";
const FONT = '"Inter Display", "Inter Display Placeholder", sans-serif';

/* -------------------------------------------------------------------------- */
/* Desktop                                                                     */
/* -------------------------------------------------------------------------- */

const PANEL_WRAP_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: "50%",
  maxWidth: "calc(100vw - 48px)",
  /* The transparent top padding is a hover bridge across the gap under the bar. */
  paddingTop: 10,
  zIndex: 20,
};

const PANEL_STYLE: React.CSSProperties = {
  backgroundColor: NAV_BLACK,
  border: `1px solid ${BORDER}`,
  borderRadius: 18,
  padding: 14,
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
  fontFamily: FONT,
};

function MegaItem({
  item,
  external = false,
  onNavigate,
}: {
  item: NavMenuItem;
  external?: boolean;
  onNavigate: () => void;
}): React.ReactElement {
  const [hover, setHover] = React.useState(false);
  const Anchor = external ? "a" : NextLink;
  return (
    <Anchor
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!external) scrollTopOnClick(item.href)(event);
        onNavigate();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "10px 12px",
        borderRadius: 12,
        textDecoration: "none",
        backgroundColor: hover ? CARD_FILL : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: 8,
          border: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EnterpriseIcon name={item.icon} className="" size={18} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <span style={{ color: WHITE, fontSize: 14, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {item.title}
        </span>
        {item.points ? (
          <ul style={{ listStyle: "none", margin: "2px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
            {item.points.map((point) => (
              <li key={point} style={{ display: "flex", gap: 7, alignItems: "baseline", color: MUTED, fontSize: 12.5, lineHeight: 1.35 }}>
                <span aria-hidden="true" style={{ width: 4, height: 4, flexShrink: 0, borderRadius: 999, backgroundColor: LINK_BLUE, transform: "translateY(-2px)" }} />
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <span style={{ color: MUTED, fontSize: 12.5, lineHeight: 1.35 }}>{item.blurb}</span>
        )}
      </span>
    </Anchor>
  );
}

export interface NavMegaPanelProps {
  open: NavMenuKey | null;
  onNavigate: () => void;
  transition: Transition;
}

export function NavMegaPanel({ open, onNavigate, transition }: NavMegaPanelProps): React.ReactElement {
  const menu = open ? NAV_MENUS[open] : null;
  return (
    <AnimatePresence>
      {menu ? (
        <motion.div
          key={open}
          role="menu"
          aria-label={menu.label}
          data-nav-menu={open}
          initial={{ opacity: 0, y: -8, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -8, x: "-50%" }}
          transition={transition}
          style={{ ...PANEL_WRAP_STYLE, width: menu.width }}
        >
          <div style={PANEL_STYLE}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${menu.columns}, minmax(0, 1fr))`,
                gap: 4,
              }}
            >
              {menu.items.map((item) => (
                <MegaItem key={item.href} item={item} external={menu.external} onNavigate={onNavigate} />
              ))}
            </div>
            {menu.index ? (
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 12,
                  paddingInline: 12,
                  borderTop: `1px solid ${BORDER}`,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <NextLink
                  href={menu.index.href}
                  onClick={(event) => {
                    scrollTopOnClick(menu.index!.href)(event);
                    onNavigate();
                  }}
                  style={{ color: LINK_BLUE, fontSize: 14, fontWeight: 500, textDecoration: "none", letterSpacing: "-0.02em" }}
                >
                  {menu.index.label} →
                </NextLink>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Tablet + phone                                                              */
/* -------------------------------------------------------------------------- */

export interface NavSubListProps {
  menuKey: NavMenuKey;
  /** The CSS `order` of the parent link's container, so the list sorts right under it. */
  order: number;
  onNavigate: (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => void;
  transition: Transition;
}

export function NavSubList({ menuKey, order, onNavigate, transition }: NavSubListProps): React.ReactElement {
  const menu = NAV_MENUS[menuKey];
  const rows: readonly { href: string; title: string; highlight?: boolean }[] = [
    ...(menu.index ? [{ href: menu.index.href, title: menu.index.label, highlight: true }] : []),
    ...menu.items.map((i) => ({ href: i.href, title: i.title })),
  ];
  const linkStyle = (highlight?: boolean): React.CSSProperties => ({
    padding: "7px 12px",
    fontSize: 13.5,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    textDecoration: "none",
    color: highlight ? LINK_BLUE : MUTED,
  });
  return (
    <motion.div
      data-nav-sublist={menuKey}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={transition}
      style={{ order, width: "100%", overflow: "hidden", fontFamily: FONT }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          margin: "2px 24px 8px",
          padding: "8px 0",
          borderRadius: 14,
          backgroundColor: CARD_FILL,
        }}
      >
        {rows.map((row) =>
          menu.external ? (
            <a key={row.href} href={row.href} target="_blank" rel="noopener noreferrer" style={linkStyle(row.highlight)}>
              {row.title}
            </a>
          ) : (
            <NextLink key={row.href} href={row.href} onClick={onNavigate(row.href)} style={linkStyle(row.highlight)}>
              {row.title}
            </NextLink>
          ),
        )}
      </div>
    </motion.div>
  );
}
