// Unit tests for the Hermes publishing contract. Run: npm run test:hermes
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  isAuthorized,
  markdownToBlocks,
  slugify,
  stripInline,
  validatePostInput,
} from "../lib/hermes/contract.ts";

const KEY = "k".repeat(48);
const CATS = ["Technology", "Insights", "Guides", "Growth"] as const;
const NOW = new Date("2026-11-18T10:00:00Z");

test("auth accepts only the exact bearer key", async () => {
  assert.equal(await isAuthorized(`Bearer ${KEY}`, KEY), true);
  assert.equal(await isAuthorized(`bearer   ${KEY}`, KEY), true);
  assert.equal(await isAuthorized(`Bearer ${KEY}x`, KEY), false);
  assert.equal(await isAuthorized(KEY, KEY), false);
  assert.equal(await isAuthorized(null, KEY), false);
  assert.equal(await isAuthorized("Bearer ", KEY), false);
});

test("auth refuses everything when the key is unset or too short", async () => {
  assert.equal(await isAuthorized("Bearer anything", undefined), false);
  assert.equal(await isAuthorized("Bearer short", "short"), false);
});

test("valid minimal post gets defaults", () => {
  const r = validatePostInput({ title: "AI Agents: A Guide!", markdown: "Hello world." }, CATS, NOW);
  assert.ok(r.ok);
  assert.equal(r.value.slug, "ai-agents-a-guide");
  assert.equal(r.value.category, "Technology");
  assert.equal(r.value.status, "published");
  assert.equal(r.value.publishedAt, NOW.toISOString());
  assert.equal(r.value.overwrite, false);
});

test("category match is case-insensitive and normalised", () => {
  const r = validatePostInput({ title: "t", markdown: "m", category: "guides" }, CATS, NOW);
  assert.ok(r.ok);
  assert.equal(r.value.category, "Guides");
});

test("invalid input reports every problem at once", () => {
  const r = validatePostInput(
    {
      title: "",
      markdown: "",
      slug: "Bad Slug",
      category: "Nope",
      coverImage: { url: "http://insecure.example/x.png" },
      publishedAt: "not a date",
      status: "live",
      excerpt: "x".repeat(301),
    },
    CATS,
    NOW,
  );
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.errors.length, 8);
});

test("non-object bodies are rejected", () => {
  for (const body of [null, [], "x", 3]) assert.equal(validatePostInput(body, CATS, NOW).ok, false);
});

test("javascript: cover URLs are rejected", () => {
  const r = validatePostInput({ title: "t", markdown: "m", coverImage: { url: "javascript:alert(1)" } }, CATS);
  assert.equal(r.ok, false);
});

test("slugify strips accents and punctuation", () => {
  assert.equal(slugify("  Café — Ünïcode & AI  "), "cafe-unicode-ai");
  assert.equal(slugify("!!!"), "");
});

test("inline markdown and HTML become plain text", () => {
  assert.equal(
    stripInline('**Bold** _em_ `code` [link](https://x.y) ![img](a.png) <script>alert(1)</script>'),
    "Bold em code link alert(1)",
  );
});

test("markdown becomes h2/p blocks", () => {
  const md = [
    "# Title",
    "",
    "First line",
    "continues here.",
    "",
    "## Section",
    "- one",
    "- **two**",
    "1. three",
    "> quoted",
    "",
    "```",
    "code()",
    "```",
    "---",
    "Last.",
  ].join("\n");
  assert.deepEqual(markdownToBlocks(md), [
    { tag: "h2", text: "Title" },
    { tag: "p", text: "First line continues here." },
    { tag: "h2", text: "Section" },
    { tag: "p", text: "• one" },
    { tag: "p", text: "• two" },
    { tag: "p", text: "• three" },
    { tag: "p", text: "quoted" },
    { tag: "p", text: "code()" },
    { tag: "p", text: "Last." },
  ]);
});
