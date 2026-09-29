"use client";

/**
 * Home page section 06 — "Solutions" (`<section class="framer-jrzwi1">`).
 *
 * Source: `_source/live/home.html` offsets 377438–686817 (309,379 bytes, 27% of the page);
 * structure map `_source/structure/home.md` line 189. The six cards each live in their own
 * file under `components/home/solutions/` — PLAN.md §6 ranks this section the 2nd riskiest
 * on the page and flags a single 309KB component as the likeliest place for a silent
 * copy/paste divergence between the three breakpoint copies.
 *
 * What is reproduced here, and why:
 *
 *  - THREE `.ssr-variant` copies of every card. Framer renders all three breakpoint
 *    variants into the DOM and hides the inactive ones through `app/framer/breakpoints.css`
 *    (`hidden-72rtr7` desktop / `hidden-1lsm0lh` tablet / `hidden-19fjg0f` phone). The one
 *    exception is "Marketing automation", where Framer itself merged desktop and phone into
 *    a single wrapper — see `MarketingAutomationCard`.
 *  - The viewport reveals. Framer SSRs `will-change:transform; opacity:0; transform:…` on
 *    the Heading and on every card root; ported as-is they would stay invisible for ever
 *    (PLAN.md §1.5), so each is a `<ScrollReveal>` carrying the SSR'd offset as its enter
 *    state. 18 card reveals + 1 heading reveal = 19 wrappers.
 *  - Eight nested Framer `withTickerFX` tickers, driven by the `Marquee` primitive with the
 *    per-instance props read out of the page's own module sources (see each card file).
 *
 * There are NO appear-animations in this section (`_source/structure/home.md`), and no
 * hover variants beyond the tickers' `hoverModifier`.
 */

import * as React from "react";
import type { CSSProperties } from "react";

import { ScrollReveal } from "@/components/primitives";

import { AiDataAnalysisCard } from "./solutions/AiDataAnalysisCard";
import { CustomAiAgentsCard } from "./solutions/CustomAiAgentsCard";
import { CustomChatbotsCard } from "./solutions/CustomChatbotsCard";
import { MarketingAutomationCard } from "./solutions/MarketingAutomationCard";
import { SolutionsSvgTemplates } from "./solutions/SolutionsSvgTemplates";
import { VoiceAgentsCard } from "./solutions/VoiceAgentsCard";
import { WorkflowAutomationCard } from "./solutions/WorkflowAutomationCard";

export interface SolutionsSectionProps {
  /** Extra classes appended to the section root. Normally omitted. */
  className?: string;
}

export function SolutionsSection({ className }: SolutionsSectionProps = {}) {
  return (
    <section
      className={className ? `framer-jrzwi1 ${className}` : "framer-jrzwi1"}
      data-framer-name="Solutions"
      id="solutions"
    >
      {/* "Our solutions" badge + H2. MEASURED enter: animation2 (y 30), transition t2. */}
      <ScrollReveal className="framer-ecrpn9" data-framer-name="Heading" enter="up30">
            <div className="ssr-variant">
              <div className="framer-ctoxiy-container">
                <div
                  className="framer-XUE7K framer-TPaq9 framer-1rwepof framer-v-1rwepof"
                  data-border="true"
                  data-framer-name="Badge"
                  data-highlight="true"
                  style={{
                    "--border-bottom-width": "1px",
                    "--border-color": "var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1))",
                    "--border-left-width": "1px",
                    "--border-right-width": "1px",
                    "--border-style": "solid",
                    "--border-top-width": "1px",
                    backgroundColor: "var(--token-e235ccb3-249e-4bbe-a0ec-afbbbabc7347, rgb(26, 26, 26))",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  } as CSSProperties}
                >
                  <div
                    className="framer-xrs0cf"
                    data-framer-component-type="RichTextContainer"
                    style={{
                      "--extracted-r6o4lv": "var(--variable-reference-ibDtCMzbS-eWNvTdAfh)",
                      "--framer-link-text-color": "rgb(0, 153, 255)",
                      "--framer-link-text-decoration": "underline",
                      "--variable-reference-ibDtCMzbS-eWNvTdAfh": "var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8))",
                      transform: "none",
                    } as CSSProperties}
                  >
                    <p
                      className="framer-text framer-styles-preset-141u1yr"
                      data-styles-preset="pAzayDUZg"
                      style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-ibDtCMzbS-eWNvTdAfh))" } as CSSProperties}
                    >
                      Our Digital FTEs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="framer-6y7gig"
              data-framer-component-type="RichTextContainer"
              style={{ transform: "none" } as CSSProperties}
            >
              <h2
                className="framer-text framer-styles-preset-1uc0rn1"
                data-styles-preset="f6v2ro_B_"
                style={{ "--framer-text-alignment": "center" } as CSSProperties}
              >
                Digital FTEs That Work Alongside Your Team
              </h2>
            </div>
      </ScrollReveal>

      <div className="framer-54ftva" data-framer-name="Solutions Grid">
        <div className="framer-1d8ieif" data-framer-name="Left grid">
          <WorkflowAutomationCard />
          <CustomAiAgentsCard />
        </div>
        <div className="framer-1wfv9gf" data-framer-name="Center Grid">
          <VoiceAgentsCard />
          <MarketingAutomationCard />
        </div>
        <div className="framer-50m17p" data-framer-name="Right Grid">
          <AiDataAnalysisCard />
          <CustomChatbotsCard />
        </div>
      </div>

      {/* The `<use href="#…">` sprite these cards' icons resolve against. */}
      <SolutionsSvgTemplates />
    </section>
  );
}

export default SolutionsSection;
