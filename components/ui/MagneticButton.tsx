"use client";
import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function MagneticButton({
  children,
  style = {},
  className = "",
  ...props
}: MagneticButtonProps) {
  return (
    <button
      className={className}
      style={{
        transition: "background 0.3s, box-shadow 0.3s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
