"use client";
import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import React from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  wordDelay?: number;
}

export function BlurText({
  text,
  className,
  style,
  delay = 0,
  wordDelay = 0.05,
}: BlurTextProps) {
  const [ref, visible] = useScrollReveal();
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      style={{ display: "inline", ...style }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.27em" }}
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * wordDelay,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
