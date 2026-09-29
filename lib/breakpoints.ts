/**
 * Framer breakpoint model for the Cloudex Technologies port.
 *
 * Authority: `_source/structure/PLAN.md` §1.1 (which supersedes `_source/BRIEF.md`)
 * cross-checked against `app/framer/breakpoints.css`.
 *
 * Framer hashes its breakpoints PER PAGE, plus one shared `layout` triple used by the
 * navbar and footer on every page. A component that hard-codes `hidden-1lsm0lh` (home)
 * silently breaks on /about.
 *
 * IMPORTANT — this module deliberately has NO `"use client"` directive and NO top-level
 * React API calls. It uses a namespace import (`import * as React`) so that it stays
 * importable from Server Components (React's `react-server` build does not export
 * `createContext` / `useContext` / `useSyncExternalStore`, but we never touch them
 * outside a client render). Server Components may freely import the data + pure helpers;
 * `BreakpointProvider` / `use*` hooks may only be used from `"use client"` components.
 */

import * as React from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type BreakpointName = "desktop" | "tablet" | "phone";

/**
 * A "scope" is one Framer breakpoint triple. Five page scopes plus the shared
 * `layout` scope (navbar + footer), which is identical on all five pages.
 */
export type BreakpointScope =
  | "home"
  | "about"
  | "blog"
  | "contact"
  | "privacy-policy"
  | "layout";

export type BreakpointTriple = Readonly<Record<BreakpointName, string>>;

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

export const BREAKPOINT_NAMES = ["desktop", "tablet", "phone"] as const;

export const BREAKPOINT_SCOPES = [
  "home",
  "about",
  "blog",
  "contact",
  "privacy-policy",
  "layout",
] as const;

/** The breakpoint rendered by SSR and used as the first client paint (no hydration mismatch). */
export const DEFAULT_BREAKPOINT: BreakpointName = "desktop";

/**
 * Media queries, byte-identical to the `@media` conditions in
 * `app/framer/breakpoints.css`.
 */
export const MEDIA_QUERIES: Readonly<Record<BreakpointName, string>> = {
  desktop: "(min-width: 1200px)",
  tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  phone: "(max-width: 809.98px)",
} as const;

/** Numeric form of the same ranges, for `resolveBreakpoint(width)`. */
export const BREAKPOINT_RANGES: Readonly<
  Record<BreakpointName, { readonly min: number; readonly max: number }>
> = {
  desktop: { min: 1200, max: Number.POSITIVE_INFINITY },
  tablet: { min: 810, max: 1199.98 },
  phone: { min: 0, max: 809.98 },
} as const;

/**
 * PLAN.md §1.1. Verified against `app/framer/breakpoints.css`: every hash below
 * appears there as `.hidden-<hash>` inside the matching `@media` block.
 */
export const BREAKPOINT_HASHES = {
  home: { desktop: "72rtr7", tablet: "1lsm0lh", phone: "19fjg0f" },
  about: { desktop: "13fmyed", tablet: "1v6k32p", phone: "k39dq1" },
  blog: { desktop: "83erdg", tablet: "1ug0h8v", phone: "1wdnigt" },
  contact: { desktop: "1frsxba", tablet: "xt0inb", phone: "tlxb3v" },
  "privacy-policy": { desktop: "1n5zt6w", tablet: "b5zmah", phone: "1c7z8uo" },
  layout: { desktop: "28a2o6", tablet: "mvvops", phone: "1j9zbg5" },
} as const satisfies Readonly<Record<BreakpointScope, BreakpointTriple>>;

/* -------------------------------------------------------------------------- */
/* Pure helpers (safe in Server Components)                                    */
/* -------------------------------------------------------------------------- */

/** The Framer hash for one scope at one breakpoint, e.g. `("home","tablet") -> "1lsm0lh"`. */
export function getBreakpointHash(
  scope: BreakpointScope,
  breakpoint: BreakpointName = DEFAULT_BREAKPOINT,
): string {
  return BREAKPOINT_HASHES[scope][breakpoint];
}

/** The whole triple for a scope. */
export function getBreakpointTriple(scope: BreakpointScope): BreakpointTriple {
  return BREAKPOINT_HASHES[scope];
}

/**
 * The `hidden-*` class that HIDES an element AT `breakpoint`.
 * `hiddenClassName("home","tablet") === "hidden-1lsm0lh"` and
 * `app/framer/breakpoints.css` hides `.hidden-1lsm0lh` in the 810–1199.98px range.
 */
export function hiddenClassName(
  scope: BreakpointScope,
  breakpoint: BreakpointName,
): string {
  return `hidden-${getBreakpointHash(scope, breakpoint)}`;
}

/**
 * The appear-animation VARIANT KEY for a breakpoint.
 * Framer keys the desktop variant `"default"`, and tablet/phone by their hash.
 * (You normally do not need this: `getAppearSpec(id, hash)` falls back to `default`
 * when the hash is not a key, which is always true for a desktop hash.)
 */
export function getAppearVariantKey(
  scope: BreakpointScope,
  breakpoint: BreakpointName,
): string {
  return breakpoint === "desktop"
    ? "default"
    : getBreakpointHash(scope, breakpoint);
}

/** Map a viewport width in CSS px onto a breakpoint. */
export function resolveBreakpoint(width: number): BreakpointName {
  if (width >= BREAKPOINT_RANGES.desktop.min) return "desktop";
  if (width >= BREAKPOINT_RANGES.tablet.min) return "tablet";
  return "phone";
}

export function isBreakpointScope(value: string): value is BreakpointScope {
  return (BREAKPOINT_SCOPES as readonly string[]).includes(value);
}

/* -------------------------------------------------------------------------- */
/* Client-side store (matchMedia) — one subscription for the whole document    */
/* -------------------------------------------------------------------------- */

type Listener = () => void;

const listeners = new Set<Listener>();
let mediaQueryLists: MediaQueryList[] | null = null;
let cachedSnapshot: BreakpointName = DEFAULT_BREAKPOINT;

function canMatchMedia(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

/** Read the live breakpoint from `matchMedia`. Returns the SSR default off-browser. */
export function readBreakpoint(): BreakpointName {
  if (!canMatchMedia()) return DEFAULT_BREAKPOINT;
  if (window.matchMedia(MEDIA_QUERIES.desktop).matches) return "desktop";
  if (window.matchMedia(MEDIA_QUERIES.tablet).matches) return "tablet";
  if (window.matchMedia(MEDIA_QUERIES.phone).matches) return "phone";
  // Fractional-width edge cases (e.g. 1199.99px) fall through to the numeric map.
  return resolveBreakpoint(window.innerWidth);
}

function notify(): void {
  const next = readBreakpoint();
  if (next === cachedSnapshot) return;
  cachedSnapshot = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  if (canMatchMedia() && mediaQueryLists === null) {
    cachedSnapshot = readBreakpoint();
    mediaQueryLists = BREAKPOINT_NAMES.map((name) =>
      window.matchMedia(MEDIA_QUERIES[name]),
    );
    for (const mql of mediaQueryLists) mql.addEventListener("change", notify);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && mediaQueryLists !== null) {
      for (const mql of mediaQueryLists) mql.removeEventListener("change", notify);
      mediaQueryLists = null;
    }
  };
}

function getSnapshot(): BreakpointName {
  // Before anyone has subscribed there is no `change` listener keeping the cache
  // warm, so read through. Once subscribed, `notify` maintains `cachedSnapshot`.
  if (mediaQueryLists === null) {
    cachedSnapshot = readBreakpoint();
  }
  return cachedSnapshot;
}

function getServerSnapshot(): BreakpointName {
  return DEFAULT_BREAKPOINT;
}

/**
 * Subscribe to the live breakpoint.
 *
 * SSR and the hydration pass both return {@link DEFAULT_BREAKPOINT} (`"desktop"`),
 * so the server HTML and the first client render are identical; React then
 * re-renders with the real value immediately after hydration.
 */
export function useBreakpointStore(): BreakpointName {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* -------------------------------------------------------------------------- */
/* Context                                                                     */
/* -------------------------------------------------------------------------- */

type BreakpointContextValue = BreakpointName | null;

// Created lazily so that this module can still be evaluated in the RSC graph,
// where `React.createContext` does not exist.
let breakpointContextRef: React.Context<BreakpointContextValue> | null = null;

function breakpointContext(): React.Context<BreakpointContextValue> {
  breakpointContextRef ??= React.createContext<BreakpointContextValue>(null);
  return breakpointContextRef;
}

export interface BreakpointProviderProps {
  children?: React.ReactNode;
  /** Force a breakpoint (tests, storybook, screenshot rigs). Omit for live tracking. */
  value?: BreakpointName;
}

/**
 * Optional. Every hook here works standalone against a shared module-level
 * `matchMedia` store, so mounting a provider is only needed to *override* the
 * breakpoint or to guarantee one shared subscription.
 *
 * Client component — do not render from a Server Component.
 */
export function BreakpointProvider({
  children,
  value,
}: BreakpointProviderProps): React.ReactElement {
  const live = useBreakpointStore();
  const Context = breakpointContext();
  return React.createElement(Context.Provider, { value: value ?? live }, children);
}

/** The active breakpoint. `"desktop"` on the server and during hydration. */
export function useBreakpoint(): BreakpointName {
  const fromContext = React.useContext(breakpointContext());
  const fromStore = useBreakpointStore();
  return fromContext ?? fromStore;
}

/**
 * The Framer breakpoint hash for `scope` at the active breakpoint.
 *
 * Feed this straight into `getAppearSpec(id, hash)` — on desktop the hash is not a
 * variant key in the appear JSON, so the lookup falls back to `"default"`, which is
 * exactly what Framer does.
 */
export function useBreakpointHash(scope: BreakpointScope): string {
  return getBreakpointHash(scope, useBreakpoint());
}

/** `"default"` on desktop, the tablet/phone hash otherwise. */
export function useAppearVariantKey(scope: BreakpointScope): string {
  return getAppearVariantKey(scope, useBreakpoint());
}
