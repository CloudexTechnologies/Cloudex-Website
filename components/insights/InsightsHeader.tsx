import type { ReactNode } from "react";

/**
 * Page header for `/insights` and the topic hubs: headline on the left, the deck aligned
 * to its baseline on the right, and the topic tabs underneath. Styles: `.insights-head*`
 * in `app/insights/insights.css`.
 */
export function InsightsHeader({
  eyebrow,
  title,
  deck,
  children,
}: {
  eyebrow: string;
  title: string;
  deck?: string;
  /** The topic tabs. */
  children?: ReactNode;
}) {
  return (
    <section className="insights-head">
      <div className="container">
        <div className="insights-head-grid">
          <div>
            <p className="insights-eyebrow">{eyebrow}</p>
            <h1 className="insights-title">{title}</h1>
          </div>
          {deck && <p className="insights-deck">{deck}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
