/**
 * ProcessIcons — the vector sprites used by home section 05 "Process".
 *
 * Framer de-duplicates every SVG on a page into a hidden
 * `<div id="svg-templates" aria-hidden="true">` blob and renders each instance as
 * `<svg style="width:100%;height:100%"><use href="#<id>"/></svg>`. The blob lives at
 * `_source/live/home.html` bytes ~1,105,000–1,130,000 and is NOT part of any section's
 * slice, so a 1:1 port of the section alone would emit `<use>` elements pointing at
 * nothing and every icon would render blank.
 *
 * `app/layout.tsx` is orchestrator-owned and does not ship the sprite blob, so — following
 * the precedent already set by `components/blog/BlogCard.tsx` and
 * `components/about/SvgTemplates.tsx` — each `<use>` is inlined at its call site instead:
 * the referenced `<svg>`'s `viewBox` (and its `overflow="visible"`, where the source has
 * one) moves onto the rendered `<svg>` and its children are emitted directly. Rendering is
 * identical — a `<use>` of an `<svg>` element instantiates it as a nested `<svg>` with
 * `width=height=100%` — and it avoids minting duplicate DOM ids when several sections that
 * share a sprite are mounted on the same page.
 *
 * Every `d`, `fill` and token reference below is copied verbatim from the blob; nothing is
 * redrawn or re-optimised. Ids on the `#1727193461` paths (`ZAwn0e2yN`, `bq5comQIv`,
 * `xmvtAEC_v`) and its `width`/`height` attributes — which have no effect on a `<path>` —
 * are the only attributes dropped.
 *
 * Server-safe: no hooks, no `"use client"`.
 */

import * as React from "react";

/* -------------------------------------------------------------------------- */
/* Design tokens, verbatim from the sprite blob                                */
/* -------------------------------------------------------------------------- */

const TOKEN_WHITE =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
const TOKEN_WHITE_30 =
  "var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3))";
const TOKEN_GREY =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
const TOKEN_BLACK =
  "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";

/** Every inlined sprite renders at the size its `.framer-*` holder gives it. */
const FILL: React.CSSProperties = { width: "100%", height: "100%" };

/* -------------------------------------------------------------------------- */
/* `#svg413715875_1239` — "Bottlenecks" (broken-link glyph), 1st issue row     */
/* -------------------------------------------------------------------------- */

export function IconLink(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 15.326 15.267" overflow="visible">
      <g>
        <path
          d="M 3.114 6.284 L 1.216 8.182 C -0.405 9.803 -0.405 12.431 1.216 14.052 C 2.837 15.673 5.465 15.673 7.086 14.052 L 9.615 11.521 C 10.567 10.569 10.998 9.213 10.77 7.885 C 10.543 6.558 9.685 5.423 8.469 4.842 L 7.658 5.653 C 7.576 5.735 7.504 5.828 7.445 5.928 C 8.387 6.199 9.115 6.947 9.36 7.896 C 9.605 8.845 9.33 9.852 8.636 10.545 L 6.109 13.074 C 5.028 14.155 3.275 14.155 2.194 13.074 C 1.113 11.992 1.113 10.24 2.194 9.158 L 3.291 8.063 C 3.136 7.483 3.076 6.881 3.114 6.282 Z"
          fill={TOKEN_WHITE}
        />
        <path
          d="M 5.712 3.745 C 4.759 4.697 4.328 6.053 4.556 7.381 C 4.784 8.708 5.642 9.843 6.857 10.424 L 7.929 9.35 C 6.975 9.094 6.229 8.348 5.973 7.394 C 5.718 6.439 5.991 5.42 6.69 4.721 L 9.217 2.192 C 10.298 1.111 12.051 1.111 13.132 2.192 C 14.214 3.274 14.214 5.026 13.132 6.108 L 12.035 7.203 C 12.19 7.784 12.25 8.386 12.212 8.984 L 14.111 7.086 C 15.731 5.465 15.731 2.837 14.111 1.216 C 12.49 -0.405 9.862 -0.405 8.241 1.216 Z"
          fill={TOKEN_WHITE}
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg-912522774_1532` — the glyph inside the ONE animated holder            */
/* -------------------------------------------------------------------------- */

export function IconSync(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 18.067 14.044" overflow="visible">
      <g>
        <path
          d="M 13.171 5.811 L 17.774 5.811 C 17.887 5.811 17.991 5.877 18.039 5.979 C 18.087 6.082 18.071 6.204 17.999 6.291 L 15.697 9.054 C 15.641 9.121 15.559 9.159 15.472 9.159 C 15.385 9.159 15.303 9.121 15.248 9.054 L 12.946 6.291 C 12.873 6.204 12.858 6.082 12.906 5.979 C 12.954 5.877 13.057 5.811 13.171 5.811 M 0.293 8.152 L 4.896 8.152 C 5.009 8.152 5.113 8.087 5.161 7.984 C 5.209 7.881 5.193 7.76 5.121 7.672 L 2.819 4.909 C 2.763 4.843 2.681 4.804 2.594 4.804 C 2.507 4.804 2.425 4.843 2.369 4.909 L 0.068 7.672 C -0.005 7.76 -0.021 7.881 0.028 7.984 C 0.076 8.087 0.179 8.152 0.293 8.152"
          fill={TOKEN_WHITE}
        />
        <path
          d="M 8.946 1.168 C 11.728 1.168 14.126 3.126 14.682 5.851 L 15.873 5.851 C 15.413 3.141 13.415 0.948 10.759 0.238 C 8.104 -0.471 5.278 0.433 3.528 2.552 C 3.386 2.713 3.344 2.937 3.416 3.138 C 3.489 3.339 3.665 3.485 3.876 3.518 C 4.087 3.551 4.3 3.466 4.43 3.297 C 5.504 1.996 7.129 1.168 8.946 1.168 Z M 2.019 8.193 C 2.478 10.903 4.476 13.096 7.132 13.806 C 9.788 14.515 12.613 13.611 14.364 11.492 C 14.505 11.332 14.548 11.107 14.475 10.906 C 14.403 10.705 14.226 10.56 14.015 10.527 C 13.804 10.494 13.592 10.578 13.461 10.747 C 12.025 12.486 9.718 13.246 7.53 12.7 C 5.342 12.155 3.662 10.402 3.209 8.193 Z"
          fill={TOKEN_WHITE}
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg394550156_785` — "Communication Gaps" (speech bubble), 3rd issue row   */
/* -------------------------------------------------------------------------- */

export function IconChat(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 16 14.931" overflow="visible">
      <path
        d="M 16 7 C 16 10.866 12.418 14 8 14 C 7.208 14.002 6.418 13.899 5.653 13.694 C 5.069 13.99 3.728 14.558 1.472 14.928 C 1.272 14.96 1.12 14.752 1.199 14.566 C 1.553 13.73 1.873 12.616 1.969 11.6 C 0.744 10.37 0 8.76 0 7 C 0 3.134 3.582 0 8 0 C 12.418 0 16 3.134 16 7 M 5 7 C 5 6.448 4.552 6 4 6 C 3.448 6 3 6.448 3 7 C 3 7.552 3.448 8 4 8 C 4.552 8 5 7.552 5 7 M 9 7 C 9 6.448 8.552 6 8 6 C 7.448 6 7 6.448 7 7 C 7 7.552 7.448 8 8 8 C 8.552 8 9 7.552 9 7 M 12 8 C 12.552 8 13 7.552 13 7 C 13 6.448 12.552 6 12 6 C 11.448 6 11 6.448 11 7 C 11 7.552 11.448 8 12 8"
        fill={TOKEN_WHITE}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg-1060162572_1529` — "Missed Deadlines" (calendar), 5th row            */
/* -------------------------------------------------------------------------- */

export function IconCalendar(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 15 15" overflow="visible">
      <g>
        <path
          d="M 6.042 11.016 L 6.042 6.015 L 5.449 6.015 C 5.024 6.243 4.613 6.495 4.219 6.771 L 4.219 7.423 C 4.57 7.182 5.127 6.841 5.398 6.694 L 5.409 6.694 L 5.409 11.016 Z M 7.156 9.793 C 7.2 10.393 7.713 11.111 8.753 11.111 C 9.932 11.111 10.628 10.111 10.628 8.419 C 10.628 6.606 9.895 5.918 8.797 5.918 C 7.928 5.918 7.112 6.548 7.112 7.614 C 7.112 8.701 7.884 9.273 8.683 9.273 C 9.383 9.273 9.836 8.921 9.98 8.533 L 10.005 8.533 C 10.001 9.766 9.573 10.561 8.782 10.561 C 8.159 10.561 7.837 10.14 7.797 9.793 Z M 9.924 7.62 C 9.924 8.273 9.4 8.727 8.814 8.727 C 8.251 8.727 7.742 8.368 7.742 7.602 C 7.742 6.83 8.288 6.467 8.837 6.467 C 9.43 6.467 9.924 6.84 9.924 7.62"
          fill={TOKEN_WHITE}
        />
        <path
          d="M 3.281 0 C 3.54 0 3.75 0.21 3.75 0.469 L 3.75 0.938 L 11.25 0.938 L 11.25 0.469 C 11.25 0.21 11.46 0 11.719 0 C 11.978 0 12.188 0.21 12.188 0.469 L 12.188 0.938 L 13.125 0.938 C 14.161 0.938 15 1.777 15 2.813 L 15 13.125 C 15 14.161 14.161 15 13.125 15 L 1.875 15 C 0.839 15 0 14.161 0 13.125 L 0 2.813 C 0 1.777 0.839 0.938 1.875 0.938 L 2.813 0.938 L 2.813 0.469 C 2.813 0.21 3.022 0 3.281 0 M 0.938 3.75 L 0.938 13.125 C 0.938 13.643 1.357 14.063 1.875 14.063 L 13.125 14.063 C 13.643 14.063 14.063 13.643 14.063 13.125 L 14.063 3.75 Z"
          fill={TOKEN_WHITE}
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#1727193461` — "Time consumption" clock, 4th issue row                     */
/* -------------------------------------------------------------------------- */

/**
 * The only sprite whose consuming `<svg>` carries its own `className`, `viewBox` and CSS
 * custom properties (`--1m6trwb` fill-opacity, `--21h8s6` colour, `--pgex8v` stroke width),
 * so ONLY its three `<path>` children are inlined — the wrapper stays in `ProcessSection`.
 */
export function ClockPaths(): React.ReactElement {
  return (
    <>
      <path
        d="M 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 Z"
        fillOpacity="var(--1m6trwb, 0)"
        fill="var(--21h8s6, rgb(0, 0, 0))"
        transform="translate(3 3)"
      />
      <path
        d="M 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 Z"
        fill="transparent"
        strokeDasharray=""
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="var(--pgex8v, 1.5)"
        stroke="var(--21h8s6, rgb(0, 0, 0))"
        transform="translate(3 3)"
      />
      <path
        d="M 0 0 L 0 5.25 L 5.25 5.25"
        fill="transparent"
        strokeDasharray=""
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="var(--pgex8v, 1.5)"
        stroke="var(--21h8s6, rgb(0, 0, 0))"
        transform="translate(12 6.75)"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg624784995_369` — the 262 × 54 glow ellipse (all three cards)           */
/* -------------------------------------------------------------------------- */

export function IconGlowEllipse(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 262 54" overflow="visible">
      <path
        d="M 131 0 C 203.349 0 262 12.088 262 27 C 262 41.912 203.349 54 131 54 C 58.651 54 0 41.912 0 27 C 0 12.088 58.651 0 131 0 Z"
        fill={TOKEN_WHITE_30}
        fillOpacity="1"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg9271713167` — the 18 × 18 concave corner of the "Notch" cutout         */
/* -------------------------------------------------------------------------- */

/**
 * STRUCTURAL, not branding: `data-framer-name="Notch"` / `"Rounded Edge"` / `"Vector"` are
 * Framer element names for the step-number cut-out at the top of each process card.
 * BRIEF.md's CONTENT OVERRIDES explicitly exclude them.
 */
export function IconRoundedEdge(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 18 18">
      <path
        d="M 0 18 L 18 18 C 8.059 18 0 9.941 0 0 Z"
        fill={TOKEN_BLACK}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg407168808_578` — the "Request more" plus                               */
/* -------------------------------------------------------------------------- */

export function IconPlus(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 6 6" overflow="visible">
      <path
        d="M 3 0 C 3.207 0 3.375 0.168 3.375 0.375 L 3.375 2.625 L 5.625 2.625 C 5.832 2.625 6 2.793 6 3 C 6 3.207 5.832 3.375 5.625 3.375 L 3.375 3.375 L 3.375 5.625 C 3.375 5.832 3.207 6 3 6 C 2.793 6 2.625 5.832 2.625 5.625 L 2.625 3.375 L 0.375 3.375 C 0.168 3.375 0 3.207 0 3 C 0 2.793 0.168 2.625 0.375 2.625 L 2.625 2.625 L 2.625 0.375 C 2.625 0.168 2.793 0 3 0"
        fill={TOKEN_WHITE}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg-351253055_594` / `#svg331359886_586` — the Updates feed arrows        */
/* -------------------------------------------------------------------------- */

export function IconArrowLeft(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 6.001 5.251" overflow="visible">
      <path
        d="M 6.001 2.625 C 6.001 2.833 5.833 3 5.626 3 L 1.281 3 L 2.891 4.61 C 3.038 4.757 3.038 4.994 2.891 5.141 C 2.745 5.288 2.507 5.288 2.36 5.141 L 0.11 2.891 C 0.04 2.821 0 2.725 0 2.625 C 0 2.526 0.04 2.43 0.11 2.36 L 2.36 0.11 C 2.507 -0.037 2.745 -0.037 2.891 0.11 C 3.038 0.257 3.038 0.494 2.891 0.641 L 1.281 2.25 L 5.626 2.25 C 5.833 2.25 6.001 2.418 6.001 2.625"
        fill={TOKEN_WHITE}
      />
    </svg>
  );
}

export function IconArrowRight(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 6.001 5.251" overflow="visible">
      <path
        d="M 0 2.625 C 0 2.418 0.168 2.25 0.375 2.25 L 4.72 2.25 L 3.11 0.641 C 2.963 0.494 2.963 0.257 3.11 0.11 C 3.256 -0.037 3.494 -0.037 3.64 0.11 L 5.89 2.36 C 5.961 2.43 6.001 2.526 6.001 2.625 C 6.001 2.725 5.961 2.821 5.89 2.891 L 3.64 5.141 C 3.494 5.288 3.256 5.288 3.11 5.141 C 2.963 4.994 2.963 4.757 3.11 4.61 L 4.72 3 L 0.375 3 C 0.168 3 0 2.833 0 2.625"
        fill={TOKEN_WHITE}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* `#svg-1555900707_1089` — the per-feature "open" arrow in the July card      */
/* -------------------------------------------------------------------------- */

export function IconArrowOut(): React.ReactElement {
  return (
    <svg style={FILL} viewBox="0 0 6 6" overflow="visible">
      <g>
        <path
          d="M 3.239 1.313 C 3.239 1.209 3.155 1.125 3.051 1.125 L 0.563 1.125 C 0.252 1.125 0 1.377 0 1.688 L 0 5.438 C 0 5.748 0.252 6 0.563 6 L 4.313 6 C 4.623 6 4.875 5.748 4.875 5.438 L 4.875 2.949 C 4.875 2.845 4.791 2.761 4.688 2.761 C 4.584 2.761 4.5 2.845 4.5 2.949 L 4.5 5.438 C 4.5 5.541 4.416 5.625 4.313 5.625 L 0.563 5.625 C 0.459 5.625 0.375 5.541 0.375 5.438 L 0.375 1.688 C 0.375 1.584 0.459 1.5 0.563 1.5 L 3.051 1.5 C 3.155 1.5 3.239 1.416 3.239 1.313"
          fill={TOKEN_GREY}
        />
        <path
          d="M 6 0.188 C 6 0.084 5.916 0 5.813 0 L 3.938 0 C 3.834 0 3.75 0.084 3.75 0.188 C 3.75 0.291 3.834 0.375 3.938 0.375 L 5.36 0.375 L 2.305 3.43 C 2.232 3.503 2.232 3.622 2.305 3.695 C 2.378 3.769 2.497 3.769 2.57 3.695 L 5.625 0.64 L 5.625 2.063 C 5.625 2.166 5.709 2.25 5.813 2.25 C 5.916 2.25 6 2.166 6 2.063 Z"
          fill={TOKEN_GREY}
        />
      </g>
    </svg>
  );
}
