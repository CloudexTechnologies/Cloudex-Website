"use client";
import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "./useScrollReveal";

export function useAnimatedCounter(end: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal({ threshold: 0.3 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, end, duration]);

  return [ref, count] as const;
}
