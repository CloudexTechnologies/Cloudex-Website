"use client";

/**
 * The "What we offer" body on `/services/<slug>`: one alternating row per offer, each an
 * animated scene (`ServiceVisual`) beside a plain-language explanation and three
 * "what this looks like" points (`service-details-content.ts`).
 *
 * Rows fade up as they enter the viewport. A row's scene only animates while it is on
 * screen (`data-play`), so a long page is not running twenty loops at once; with
 * `prefers-reduced-motion` the scenes hold still (`service-details.css`).
 */

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import "./service-details.css";

import { ServiceVisual } from "./ServiceVisual";
import type { EnterpriseCard } from "./enterprise-content";
import type { ServiceDetail } from "./service-details-content";

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({ card, detail, index }: { card: EnterpriseCard; detail?: ServiceDetail; index: number }) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = React.useState(false);

  return (
    <motion.article
      className="svd-row"
      data-flip={index % 2 === 1 ? "true" : undefined}
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE }}
      onViewportEnter={() => setPlaying(true)}
      onViewportLeave={() => setPlaying(false)}
    >
      <div className="svd-visual" data-play={playing ? "true" : undefined}>
        <ServiceVisual icon={card.icon} />
      </div>
      <div className="svd-text">
        <span className="svd-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="svd-title">{card.title}</h3>
        <p className="svd-lead">{detail?.lead ?? card.body}</p>
        {detail ? (
          <>
            <p className="svd-kicker">What this looks like</p>
            <ul className="svd-points">
              {detail.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ServiceDetails({
  cards,
  details,
}: {
  cards: readonly EnterpriseCard[];
  details?: readonly ServiceDetail[];
}): React.ReactElement {
  return (
    <div className="svd">
      {cards.map((card, index) => (
        <Row key={card.title} card={card} detail={details?.[index]} index={index} />
      ))}
    </div>
  );
}

export default ServiceDetails;
