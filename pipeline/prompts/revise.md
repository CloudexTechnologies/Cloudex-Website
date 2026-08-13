You wrote the article below. The quality gate returned fixes that must be applied
before it can publish. Apply them and return the complete corrected article.

<brand_context>
{{BRAND}}
</brand_context>

<gate_findings>
{{FINDINGS}}
</gate_findings>

<deterministic_checks>
Mechanical failures that must also be resolved. These are facts:
{{CHECK_REPORT}}
</deterministic_checks>

<current_article>
{{ARTICLE}}
</current_article>

## Rules

- Fix every blocker and major issue. Fix minor issues where doing so does not
  make something else worse.
- If a claim was flagged as unsupported, either find a real source for it with
  `web_search` and `web_extract` and cite it, or remove the claim. Do not
  reword an unsupported claim into a vaguer unsupported claim.
- If a cited URL was flagged as dead or not supporting the claim, replace it
  with a source you retrieve now, and adjust the sentence to match what that
  source actually says.
- Do not shorten the article to dodge a problem, and do not pad it to hit a
  length target.
- Keep everything the gate did not object to. This is a revision, not a rewrite.

## Output

Reply with one JSON object only, in exactly the same shape as the original
article JSON — every field present, not just the changed ones. No prose, no code
fence.
