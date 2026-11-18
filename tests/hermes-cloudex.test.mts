// Unit tests for the Cloudex-specific parts of the Hermes route. Run: npm run test:hermes
import assert from "node:assert/strict";
import { test } from "node:test";

import { validateCloudexFields } from "../lib/hermes/cloudex-fields.ts";
import { markdownToPortableText, plainText } from "../lib/hermes/portable-text.ts";

let n = 0;
const key = () => `k${n++}`;

test("headings, lists, quotes and code map to Portable Text", () => {
  n = 0;
  const blocks = markdownToPortableText(
    ["# Top", "Intro **bold** and *em*.", "", "### Sub", "- a", "2. b", "> said", "", "```ts app.ts", "x()", "```"].join("\n"),
    key,
  );
  assert.deepEqual(
    blocks.map((b) => (b._type === "block" ? [b.style, b.listItem ?? "", plainText([b])] : ["code", b.language, b.code])),
    [
      ["h2", "", "Top"],
      ["normal", "", "Intro bold and em."],
      ["h3", "", "Sub"],
      ["normal", "bullet", "a"],
      ["normal", "number", "b"],
      ["blockquote", "", "said"],
      ["code", "ts", "x()"],
    ],
  );
  const intro = blocks[1];
  assert.ok(intro._type === "block");
  assert.deepEqual(intro.children.map((c) => c.marks), [[], ["strong"], [], ["em"], []]);
});

test("safe links become link marks; unsafe hrefs stay plain text", () => {
  const [block] = markdownToPortableText("[ok](https://a.b/c) [rel](/insights) [bad](javascript:alert(1)) <b>x</b>", key);
  assert.ok(block._type === "block");
  assert.deepEqual(block.markDefs.map((d) => d.href), ["https://a.b/c", "/insights"]);
  assert.ok(!JSON.stringify(block).includes("javascript:"));
  assert.ok(!JSON.stringify(block).includes("<b>"));
});

test("cloudex fields default and validate", () => {
  const ok = validateCloudexFields({});
  assert.ok(ok.ok && ok.value.contentType === "research");
  const bad = validateCloudexFields({
    contentType: "x",
    keyTakeaways: ["a", "b", "c", "d", "e", "f", "g"],
    primaryKeyword: "",
    faq: [{ question: "q" }],
    citations: [{ title: "t", url: "http://insecure" }],
  });
  assert.ok(!bad.ok && bad.errors.length === 5);
});
