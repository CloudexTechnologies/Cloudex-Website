/**
 * Framer's runtime `<div id="svg-templates">` sprite, for the `/about` route.
 *
 * On the live site this div is injected at the end of `<body>` by the Framer runtime and
 * holds every `<svg id="…">` that a `data-framer-component-type="SVG"` node reaches with
 * `<use href="#…">`. It is NOT in the SSR'd HTML, which is why `_source/live/about.html`
 * contains `<use>` references with nothing to resolve them; `_source/rendered/about.*.html`
 * has the real thing (offset 329674 in the desktop capture).
 *
 * Only the seven symbols the about page's own sections reference are kept:
 *   svg9271713167  the 18×18 concave corner ("Rounded Edge"): hero notch, 4 story cards, 3 team cards
 *   1028000027     Why-us icon 1 — "AI-First Approach"
 *   1273241095     Why-us icon 2 — "Custom Solutions"
 *   1529132500     Why-us icon 3 — "Simple & Clear"
 *   1808785782     Why-us icon 4 — "Proven Process"
 *   500676987      Why-us icon 5 — "Seamless Integration"
 *   1430394497     Why-us icon 6 — "Ongoing Support"
 *
 * Dropped because their only consumers already inline them: `svg12437585915` /
 * `svg9734401351` (navbar notch shoulders), `svg12158825557` (footer edge) and
 * `svg8647994865` (the blurred ellipse behind the FAQ accordion).
 *
 * Server Component — static markup, no directive needed.
 */

import type { CSSProperties } from "react";

export function SvgTemplates() {
  return (
    <div
      id="svg-templates"
      style={{
        position: "absolute",
        overflow: "hidden",
        bottom: "0",
        left: "0",
        width: "0",
        height: "0",
        zIndex: "0",
        contain: "strict",
      } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 18 18" id="svg9271713167">
        <path
          d="M 0 18 L 18 18 C 8.059 18 0 9.941 0 0 Z"
          fill="var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))"
        />
      </svg>
      <svg
        id="1028000027"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10.5 0 L 9 7.5 L 15 9.75 L 4.5 21 L 6 13.5 L 0 11.25 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="21px"
          id="C0XRUgMsp"
          transform="translate(4.5 1.5)"
          width="15px"
        />
        <path
          d="M 10.5 0 L 9 7.5 L 15 9.75 L 4.5 21 L 6 13.5 L 0 11.25 Z"
          fill="transparent"
          height="21px"
          id="z9XZNqukS"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(4.5 1.5)"
          width="15px"
        />
      </svg>
      <svg
        id="1273241095"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 4.498 17.999 C 4.083 17.999 3.748 17.663 3.748 17.249 L 3.748 13.246 C 2.645 13.768 1.328 13.461 0.569 12.506 C -0.19 11.55 -0.19 10.197 0.569 9.242 C 1.328 8.286 2.645 7.979 3.748 8.501 L 3.748 4.499 C 3.748 4.084 4.083 3.749 4.498 3.749 L 8.875 3.749 C 8.352 2.646 8.659 1.328 9.615 0.569 C 10.571 -0.19 11.924 -0.19 12.879 0.569 C 13.835 1.328 14.142 2.646 13.62 3.749 L 17.998 3.749 C 18.412 3.749 18.748 4.084 18.748 4.499 L 18.748 8.501 C 17.645 7.979 16.328 8.286 15.569 9.242 C 14.81 10.197 14.81 11.55 15.569 12.506 C 16.328 13.461 17.645 13.768 18.748 13.246 L 18.748 17.249 C 18.748 17.663 18.412 17.999 17.998 17.999 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="17.998659259667242px"
          id="HZSn1eS6P"
          transform="translate(1.502 2.251)"
          width="18.747669069603216px"
        />
        <path
          d="M 4.498 17.999 C 4.083 17.999 3.748 17.663 3.748 17.249 L 3.748 13.246 C 2.645 13.768 1.328 13.461 0.569 12.506 C -0.19 11.55 -0.19 10.197 0.569 9.242 C 1.328 8.286 2.645 7.979 3.748 8.501 L 3.748 4.499 C 3.748 4.084 4.083 3.749 4.498 3.749 L 8.875 3.749 C 8.352 2.646 8.659 1.328 9.615 0.569 C 10.571 -0.19 11.924 -0.19 12.879 0.569 C 13.835 1.328 14.142 2.646 13.62 3.749 L 17.998 3.749 C 18.412 3.749 18.748 4.084 18.748 4.499 L 18.748 8.501 C 17.645 7.979 16.328 8.286 15.569 9.242 C 14.81 10.197 14.81 11.55 15.569 12.506 C 16.328 13.461 17.645 13.768 18.748 13.246 L 18.748 17.249 C 18.748 17.663 18.412 17.999 17.998 17.999 Z"
          fill="transparent"
          height="17.998659259667242px"
          id="jLOSTu8rS"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(1.502 2.251)"
          width="18.747669069603216px"
        />
      </svg>
      <svg
        id="1529132500"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 5.65 10.849 L 0.485 8.946 C 0.194 8.839 0 8.561 0 8.25 C 0 7.939 0.194 7.661 0.485 7.553 L 5.65 5.65 L 7.553 0.485 C 7.661 0.194 7.939 0 8.25 0 C 8.561 0 8.839 0.194 8.946 0.485 L 10.849 5.65 L 16.014 7.553 C 16.306 7.661 16.5 7.939 16.5 8.25 C 16.5 8.561 16.306 8.839 16.014 8.946 L 10.849 10.849 L 8.946 16.014 C 8.839 16.306 8.561 16.5 8.25 16.5 C 7.939 16.5 7.661 16.306 7.553 16.014 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="16.499524626865806px"
          id="PJgleNJ9m"
          transform="translate(2.25 5.25)"
          width="16.499524626865806px"
        />
        <path
          d="M 5.65 10.849 L 0.485 8.946 C 0.194 8.839 0 8.561 0 8.25 C 0 7.939 0.194 7.661 0.485 7.553 L 5.65 5.65 L 7.553 0.485 C 7.661 0.194 7.939 0 8.25 0 C 8.561 0 8.839 0.194 8.946 0.485 L 10.849 5.65 L 16.014 7.553 C 16.306 7.661 16.5 7.939 16.5 8.25 C 16.5 8.561 16.306 8.839 16.014 8.946 L 10.849 10.849 L 8.946 16.014 C 8.839 16.306 8.561 16.5 8.25 16.5 C 7.939 16.5 7.661 16.306 7.553 16.014 Z"
          fill="transparent"
          height="16.499524626865806px"
          id="anmSEgUk_"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(2.25 5.25)"
          width="16.499524626865806px"
        />
        <path
          d="M 0 0 L 0 4.5"
          fill="transparent"
          height="4.5px"
          id="NIr4Oia9T"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(16.5 1.5)"
          width="1px"
        />
        <path
          d="M 0 0 L 0 3"
          fill="transparent"
          height="3px"
          id="w6flwq75s"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(21 6.75)"
          width="1px"
        />
        <path
          d="M 0 0 L 4.5 0"
          fill="transparent"
          height="1px"
          id="uNW3QRMrS"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 3.75)"
          width="4.5px"
        />
        <path
          d="M 0 0 L 3 0"
          fill="transparent"
          height="1px"
          id="KasWMFKns"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(19.5 8.25)"
          width="3px"
        />
      </svg>
      <svg
        id="1808785782"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0.75 4.5 C 0.336 4.5 0 4.164 0 3.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 3.75 0 C 4.164 0 4.5 0.336 4.5 0.75 L 4.5 3.75 C 4.5 4.164 4.164 4.5 3.75 4.5 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="4.5px"
          id="qo9FLkHzt"
          transform="translate(1.5 9.75)"
          width="4.5px"
        />
        <path
          d="M 0.75 6 C 0.336 6 0 5.664 0 5.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 5.25 0 C 5.664 0 6 0.336 6 0.75 L 6 5.25 C 6 5.664 5.664 6 5.25 6 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="6px"
          id="TGY1uL3YV"
          transform="translate(14.25 3.75)"
          width="6px"
        />
        <path
          d="M 0.75 6 C 0.336 6 0 5.664 0 5.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 5.25 0 C 5.664 0 6 0.336 6 0.75 L 6 5.25 C 6 5.664 5.664 6 5.25 6 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="6px"
          id="xnPydHzlr"
          transform="translate(14.25 14.25)"
          width="6px"
        />
        <path
          d="M 0.75 4.5 C 0.336 4.5 0 4.164 0 3.75 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 3.75 0 C 4.164 0 4.5 0.336 4.5 0.75 L 4.5 3.75 C 4.5 4.164 4.164 4.5 3.75 4.5 Z"
          fill="transparent"
          height="4.5px"
          id="CbUQMvhwr"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(1.5 9.75)"
          width="4.5px"
        />
        <path
          d="M 0.75 6 C 0.336 6 0 5.664 0 5.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 5.25 0 C 5.664 0 6 0.336 6 0.75 L 6 5.25 C 6 5.664 5.664 6 5.25 6 Z"
          fill="transparent"
          height="6px"
          id="nyOM_ck03"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 3.75)"
          width="6px"
        />
        <path
          d="M 0.75 6 C 0.336 6 0 5.664 0 5.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 5.25 0 C 5.664 0 6 0.336 6 0.75 L 6 5.25 C 6 5.664 5.664 6 5.25 6 Z"
          fill="transparent"
          height="6px"
          id="vCcaweqzi"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(14.25 14.25)"
          width="6px"
        />
        <path
          d="M 0 0 L 4.5 0"
          fill="transparent"
          height="1px"
          id="PwkyCWwYU"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(6 12)"
          width="4.5px"
        />
        <path
          d="M 3.75 10.5 L 1.5 10.5 C 0.672 10.5 0 9.828 0 9 L 0 1.5 C 0 0.672 0.672 0 1.5 0 L 3.75 0"
          fill="transparent"
          height="10.5px"
          id="j8usZoOwO"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(10.5 6.75)"
          width="3.75px"
        />
      </svg>
      <svg
        id="500676987"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 6.75 C 0 6.988 0.013 7.226 0.037 7.463 C 0.274 7.487 0.512 7.5 0.75 7.5 C 4.478 7.5 7.5 4.478 7.5 0.75 C 7.5 0.512 7.487 0.274 7.463 0.037 C 7.226 0.013 6.988 0 6.75 0 C 3.022 0 0 3.022 0 6.75 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="7.5px"
          id="nqrutLz0s"
          transform="translate(8.25 8.25)"
          width="7.5px"
        />
        <path
          d="M 0 6.75 C 0 3.022 3.022 0 6.75 0 C 10.478 0 13.5 3.022 13.5 6.75 C 13.5 10.478 10.478 13.5 6.75 13.5 C 3.022 13.5 0 10.478 0 6.75 Z"
          fill="transparent"
          height="13.5px"
          id="KnxLC8zOf"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(2.25 2.25)"
          width="13.5px"
        />
        <path
          d="M 0 6.75 C 0 3.022 3.022 0 6.75 0 C 10.478 0 13.5 3.022 13.5 6.75 C 13.5 10.478 10.478 13.5 6.75 13.5 C 3.022 13.5 0 10.478 0 6.75 Z"
          fill="transparent"
          height="13.5px"
          id="V7yKWcAMI"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(8.25 8.25)"
          width="13.5px"
        />
      </svg>
      <svg
        id="1430394497"
        display="block"
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 16.5 6 L 16.5 0.75 C 16.5 0.336 16.164 0 15.75 0 L 0.75 0 C 0.336 0 0 0.336 0 0.75 L 0 6 C 0 15 8.25 17.25 8.25 17.25 C 8.25 17.25 16.5 15 16.5 6 Z"
          fillOpacity="var(--1m6trwb, 0)"
          fill="var(--21h8s6, rgb(0, 0, 0))"
          height="17.25px"
          id="dnXAEWy2v"
          transform="translate(3.75 4.5)"
          width="16.5px"
        />
        <path
          d="M 16.5 6 L 16.5 0.75 C 16.5 0.336 16.164 0 15.75 0 L 0.75 0 C 0.336 0 0 0.336 0 0.75 L 0 6 C 0 15 8.25 17.25 8.25 17.25 C 8.25 17.25 16.5 15 16.5 6 Z"
          fill="transparent"
          height="17.25px"
          id="eVavSOlBM"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(3.75 4.5)"
          width="16.5px"
        />
        <path
          d="M 0 3 L 2.25 5.25 L 7.5 0"
          fill="transparent"
          height="5.25px"
          id="xoBw5M0M6"
          strokeDasharray=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="var(--pgex8v, 1.5)"
          stroke="var(--21h8s6, rgb(0, 0, 0))"
          transform="translate(8.25 9.75)"
          width="7.5px"
        />
      </svg>
    </div>
  );
}

export default SvgTemplates;
