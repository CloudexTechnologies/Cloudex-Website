"use client";

import { cn } from "@/lib/utils";

export interface LogoCloudLogo {
  src: string;
  alt: string;
}

interface LogoCloudProps {
  logos: LogoCloudLogo[];
  className?: string;
  speed?: number;
  logoHeight?: number;
  gap?: number;
}

export function LogoCloud({
  logos,
  className,
  speed = 40,
  logoHeight = 36,
  gap = 64,
}: LogoCloudProps) {
  const duration = `${Math.round(logos.length * (120 / speed))}s`;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(to right, var(--bg-2, var(--background)), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(to left, var(--bg-2, var(--background)), transparent)",
        }}
      />

      {/* Track — duplicated list for seamless loop */}
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${duration} linear infinite`,
          gap: `${gap}px`,
          alignItems: "center",
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center justify-center"
            style={{ padding: "0 4px" }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              draggable={false}
              style={{
                height: logoHeight,
                width: "auto",
                maxWidth: 80,
                objectFit: "contain",
                opacity: 0.7,
                transition: "opacity 0.25s",
                userSelect: "none",
                pointerEvents: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLImageElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLImageElement).style.opacity = "0.7")
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
