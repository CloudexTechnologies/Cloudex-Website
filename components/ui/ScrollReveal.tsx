"use client";
import { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  style?: CSSProperties;
  className?: string;
}

const offsets: Record<Direction, string> = {
  up: "translateY(40px)",
  down: "translateY(-40px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
  none: "none",
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  style = {},
  className = "",
}: ScrollRevealProps) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) translateX(0)" : offsets[direction],
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s, filter ${duration}s ease ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
