"use client";
import { useRef, useState, useEffect } from "react";

interface ScrollRevealOpts {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal(opts: ScrollRevealOpts = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: opts.threshold ?? 0.12, rootMargin: opts.rootMargin ?? "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts.threshold, opts.rootMargin]);

  return [ref, visible] as const;
}
