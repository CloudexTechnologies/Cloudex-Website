"use client";
import { useRef, MouseEvent } from "react";

export function useSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  };

  return { ref, onMouseMove };
}
