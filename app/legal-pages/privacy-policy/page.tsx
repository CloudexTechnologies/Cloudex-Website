/**
 * `/legal-pages/privacy-policy` — PLAN.md §3, §6.7.
 *
 * Source: `_source/live/privacy-policy.html`, `_source/structure/privacy-policy.md`.
 *
 * The page's ONLY job is Framer's per-page root wrapper. `app/layout.tsx` already
 * renders `<html><body><div id="main"><div class="framer-dUOq6 framer-28a2o6">` with
 * the navbar, `{children}`, the `.framer-1a909du` spacer and the footer, so nothing
 * of that is repeated here.
 *
 * ── The root class list is load-bearing ──────────────────────────────────────
 * Every rule for this page in `app/framer/layout.css` is scoped under
 * `.framer-f2VXI` (`.framer-f2VXI .framer-o3tmg`, `.framer-f2VXI .framer-18w4wh6`,
 * `.framer-f2VXI .framer-9472tl-container`, …). `framer-1n5zt6w` is this page's
 * DESKTOP breakpoint hash (PLAN.md §1.1 — hashes are PER PAGE; privacy has no
 * `__framer__breakpoints` blob, so they were recovered from its
 * `data-framer-breakpoint-css`). Drop either class and the document loses its
 * width, its 180px top padding and its gradient. The list is copied verbatim from
 * the SSR at offset 154791:
 *
 *   <div data-framer-root class="framer-f2VXI framer-HFo8d framer-y1svz framer-X2moO
 *        framer-cl021 framer-lz3Y0 framer-O71PQ framer-JesZO framer-WQyg0
 *        framer-Tx7FV framer-1n5zt6w"
 *        style="min-height:100vh;width:auto;display:contents">
 *
 * `display:contents` is why this wrapper does not disturb the layout template's
 * flex column even though it declares `min-height:100vh`.
 *
 * ── `.framer-152jc0k-container` ──────────────────────────────────────────────
 * The last child of the root is `<div class="framer-152jc0k-container">` holding an
 * empty `<div>` inside a Suspense marker. It is privacy-only (it appears in no other
 * page's SSR) and it still renders empty AFTER hydration in
 * `_source/rendered/privacy-policy.desktop.html` (offset 171802), i.e. it is a Framer
 * code component with no visual output. Its CSS
 * (`.framer-f2VXI .framer-152jc0k-container{flex:none;width:auto;height:auto;position:relative}`)
 * is already in `app/framer/layout.css`, so it is reproduced for structural fidelity.
 * It is NOT the Framer badge — that is `#__framer-badge-container` / appear id
 * `n0ccwk`, which is dropped per PLAN.md §1.3.
 */

import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import type { CSSProperties, ReactElement } from "react";

import { PrivacyPolicyBody } from "@/components/legal/PrivacyPolicyBody";

/** Verbatim from `<title>` in `_source/live/privacy-policy.html`. */
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Cloudex Technologies collects, uses and protects your personal information when you use our website and services.",
  path: "/legal-pages/privacy-policy",
});

/** The SSR root's class list, verbatim (offset 154791). */
export const PRIVACY_POLICY_ROOT_CLASS_NAME =
  "framer-f2VXI framer-HFo8d framer-y1svz framer-X2moO framer-cl021 framer-lz3Y0 framer-O71PQ framer-JesZO framer-WQyg0 framer-Tx7FV framer-1n5zt6w";

const ROOT_STYLE: CSSProperties = {
  minHeight: "100vh",
  width: "auto",
  display: "contents",
};

export default function PrivacyPolicyPage(): ReactElement {
  return (
    <div
      data-framer-root
      className={PRIVACY_POLICY_ROOT_CLASS_NAME}
      style={ROOT_STYLE}
    >
      <PrivacyPolicyBody />
      <div className="framer-152jc0k-container">
        <div />
      </div>
    </div>
  );
}
