"use client";
import { useRef, useEffect, useState } from "react";

interface ScrollFloatProps {
  text: string;
  style?: React.CSSProperties;
  /** Extra delay in ms before the clip animation fires (default 0) */
  delay?: number;
}

export function ScrollFloat({ text, style, delay = 0 }: ScrollFloatProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    /* The clip container: overflow hidden hides the starting-below state.
       paddingBottom + negative marginBottom gives descenders room. */
    <div
      ref={wrapRef}
      style={{
        overflow: "hidden",
        paddingBottom: "0.15em",
        marginBottom: "-0.15em",
      }}
    >
      <div
        style={{
          ...style,
          display: style?.display ?? "block",
          willChange: "transform, opacity",
          transform: visible ? "translateY(0)" : "translateY(105%)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.55s ease ${delay}ms`,
        }}
      >
        {text}
      </div>
    </div>
  );
}
