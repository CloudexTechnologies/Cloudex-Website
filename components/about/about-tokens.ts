/**
 * Design-token strings used by the `/about` sections, spelled EXACTLY as Framer emits
 * them in `_source/live/about.html` (the fallback colour inside `var(...)` is part of
 * the string and must not be normalised — Framer ships both forms in different places
 * and the CSS custom properties are only defined for the token ids).
 *
 * No `"use client"`: pure data, so a Server Component (`TeamSection`) may import it.
 */

export const TOKEN_BLACK =
  "var(--token-a53beb93-2df8-4cea-8692-a810c05e478d, rgb(0, 0, 0))";
export const TOKEN_WHITE =
  "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))";
export const TOKEN_GREY =
  "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))";
export const TOKEN_BODY_TEXT =
  "var(--token-fc24edca-c6a9-4002-9aa0-e67221fb322a, rgba(255, 255, 255, 0.7))";
export const TOKEN_BADGE_BG =
  "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))";
export const TOKEN_BADGE_BORDER =
  "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))";
export const TOKEN_BADGE_TEXT =
  "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))";
/** Hero badge only — the one blue badge on the page. */
export const TOKEN_BLUE =
  "var(--token-819e50e5-99c5-4547-ba7c-e2d71a9ee22d, rgb(0, 85, 255))";
/** `framer-v-1c8kqsq` ("Dark") CTA button shell. */
export const TOKEN_BUTTON_DARK =
  "var(--token-f8734902-8d1d-4e80-b378-a091f0e2450d, rgb(38, 38, 38))";

/**
 * `#svg9271713167` — the 18×18 concave corner ("Rounded Edge") used by the hero notch,
 * the story-card notches and both team-card notches. The symbol itself lives in
 * `SvgTemplates`; this is only its viewBox/path, kept here so both can read it.
 */
export const ROUNDED_EDGE_ID = "svg9271713167";
