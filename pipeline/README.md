# Cloudex insights pipeline

Autonomous research → writing → review → publishing for the `/insights` section.
Runs on the OVH VPS under Hermes' scheduler; publishes into Sanity, which the
Next.js site reads.

## What runs when

| Job | Schedule (UTC) | Script | Speaks up when |
|---|---|---|---|
| `cloudex-research-scan` | daily 06:30 | `bin/research_scan.py` | queue drops below 4 topics, or sources fail |
| `cloudex-publish` | Tue & Thu 09:00 | `bin/write_and_publish.py` | every run — published, held, or skipped |

Both are Hermes cron jobs created with `--no-agent`, so the script *is* the job
and its stdout is delivered verbatim to WhatsApp. That is deliberate: the
orchestration is deterministic Python, and the model is called only where
judgement is actually needed.

## The publish path

```
pick topic ──► Hermes writes it (web_search + web_extract on real sources)
                   │
                   ├── writer may abort if the sources don't support the angle
                   ▼
            markdown → Portable Text (lib/markdown_pt.py)
                   ▼
            deterministic checks (lib/checks.py)
              length · keyword placement · heading order · citation
              reachability · internal links · banned phrasing · readability
                   ▼
            Hermes quality gate (prompts/gate.md)
              re-opens cited URLs, scores accuracy/depth/readability/SEO/brand
                   ▼
         pass? ──no──► one revision pass ──► re-check, re-gate
                   │                              │
                  yes                        still no
                   ▼                              ▼
        Codex $imagegen hero image        saved with status "held"
                   ▼                       owner told why
        publish to Sanity, ping revalidate
                   ▼
             WhatsApp summary
```

A draft publishes only if **all** of these hold: zero deterministic blockers,
gate verdict `pass`, accuracy ≥ 85, overall ≥ `GATE_PASS_SCORE`, and no
blocker/major issues listed. Anything else lands in the Studio under
**Articles → Held at quality gate**.

## Content mix

`RESEARCH_SHARE=0.7` with `RATIO_WINDOW=10`. Before each run the pipeline looks
at the last 10 *published* articles and asks for whichever type is under quota,
so a held or skipped run cannot drift the ratio.

## Layout

```
config/brand.md        voice, service lines, evidence rules — injected into every prompt
config/sources.json    arXiv categories, RSS feeds, HN queries, commercial watchlist
prompts/               research · write · gate · revise
lib/settings.py        env-backed configuration
lib/sanity.py          HTTP client: query, mutate, asset upload
lib/hermes.py          Hermes one-shot calls, Codex image generation, notifications
lib/fetching.py        arXiv / RSS / Hacker News collection
lib/markdown_pt.py     Markdown → Portable Text
lib/checks.py          deterministic pre-gate checks
lib/common.py          prompts, slugs, run logging, revalidate ping
bin/research_scan.py   daily job
bin/write_and_publish.py  Tue/Thu job
```

## Deploying

```bash
./pipeline/deploy.sh          # sync code
./pipeline/deploy.sh --cron   # sync and (re)create the schedules
```

`.env` on the server is never overwritten. Create it once from `.env.example`
and set `SANITY_WRITE_TOKEN`.

## Running by hand

```bash
ssh ubuntu@135.125.233.21
cd /home/ubuntu/cloudex-content

python3 bin/research_scan.py                    # fill the topic queue
python3 bin/write_and_publish.py --dry-run      # full run, writes nothing
python3 bin/write_and_publish.py --skip-image   # publish without hero art
python3 bin/write_and_publish.py --topic-id <id>
```

Every run writes its prompts, drafts and final document to `logs/<run-id>/`, and
a `runLog` document to Sanity. When something looks wrong on the site, start
there — the draft that produced it is on disk.

## Tuning it

- **Too strict / too lenient** — `GATE_PASS_SCORE` in `.env`. The accuracy floor
  of 85 is hard-coded in `gate_allows_publish`; that one is not meant to be dialled down.
- **Different sources** — `config/sources.json`. Feeds that 404 are logged and skipped.
- **Different voice** — `config/brand.md`. It is the single source of truth for
  tone across all four prompts.
- **More or fewer articles** — recreate the cron with a different schedule.
  Watch the topic queue depth if you go faster than the scan can refill it.
