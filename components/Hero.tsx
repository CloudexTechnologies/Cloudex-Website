"use client";
import { useRef } from "react";
import { MagneticButton } from "./ui/MagneticButton";
import DotGrid from "./DotGrid";
import { useTheme } from "@/context/ThemeContext";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  heroStyle?: "centered" | "split";
}

function FloatingOrbs() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "15%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)",
          animation: "orbFloat1 22s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          top: "30%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.18), transparent 70%)",
          animation: "orbFloat2 28s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          bottom: "5%",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)",
          animation: "orbFloat3 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function AnimatedWord({
  word,
  index,
  isGradient,
}: {
  word: string;
  index: number;
  isGradient: boolean;
}) {
  return (
    <span
      className={isGradient ? "hero-gradient-word" : undefined}
      style={{
        display: "inline-block",
        opacity: 0,
        animation: "fadeInUp 0.8s ease forwards",
        animationDelay: `${0.4 + index * 0.08}s`,
        ...(isGradient
          ? {
              background:
                "linear-gradient(135deg, #2563EB, #60a5fa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : {}),
      }}
    >
      {word}&nbsp;
    </span>
  );
}

export function Hero({ heroStyle = "centered" }: HeroProps) {
  const { theme } = useTheme();
  const ctaBtn = useRef<HTMLButtonElement>(null);
  const ctaIcon = useRef<HTMLDivElement>(null);

  const dotColors =
    theme === "dark"
      ? { base: "#1f3060", active: "#60a5fa" }
      : { base: "#7a9cd4", active: "#1d4ed8" };

  const scrollTo = (selector: string) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const onCTAEnter = () => {
    if (!ctaBtn.current || !ctaIcon.current) return;
    ctaBtn.current.style.paddingLeft = "56px";
    ctaBtn.current.style.paddingRight = "24px";
    ctaBtn.current.style.boxShadow = "0 8px 40px rgba(37,99,235,0.45)";
    const w = ctaBtn.current.offsetWidth;
    ctaIcon.current.style.right = `${w - 44}px`;
    ctaIcon.current.style.transform = "translateY(-50%) rotate(45deg)";
  };

  const onCTALeave = () => {
    if (!ctaBtn.current || !ctaIcon.current) return;
    ctaBtn.current.style.paddingLeft = "24px";
    ctaBtn.current.style.paddingRight = "56px";
    ctaBtn.current.style.boxShadow = "0 4px 24px rgba(37,99,235,0.3)";
    ctaIcon.current.style.right = "4px";
    ctaIcon.current.style.transform = "translateY(-50%) rotate(0deg)";
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--hero-glow)",
        }}
      />
      <DotGrid
        dotSize={3}
        gap={26}
        baseColor={dotColors.base}
        activeColor={dotColors.active}
        proximity={160}
        shockRadius={260}
        shockStrength={4}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <FloatingOrbs />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: 80,
          paddingBottom: 60,
          maxWidth: heroStyle === "split" ? 1200 : 880,
          display: heroStyle === "split" ? "grid" : "block",
          gridTemplateColumns: heroStyle === "split" ? "1fr 1fr" : "1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div
          style={{ textAlign: heroStyle === "split" ? "left" : "center" }}
        >
          {/* Badge */}
          <div
            style={{
              opacity: 0,
              animation: "fadeInUp 0.7s ease 0.2s forwards",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 18px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                fontSize: 13,
                color: "var(--text-2)",
                fontWeight: 500,
                fontFamily: "var(--font-heading)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulse 2s infinite",
                }}
              />
              UK-Based AI &amp; Technology Partner
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 24,
            }}
          >
            {["Your", "Business", "Deserves"].map((w, i) => (
              <AnimatedWord key={i} word={w} index={i} isGradient={false} />
            ))}
            <br />
            {["a", "Team", "That"].map((w, i) => (
              <AnimatedWord key={i} word={w} index={i + 3} isGradient={false} />
            ))}
            {["Never", "Sleeps"].map((w, i) => (
              <AnimatedWord key={i} word={w} index={i + 6} isGradient={true} />
            ))}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 19px)",
              color: "var(--text-2)",
              maxWidth: 640,
              margin: heroStyle === "split" ? "0" : "0 auto",
              lineHeight: 1.7,
              opacity: 0,
              animation: "fadeInUp 0.8s ease 1s forwards",
            }}
          >
            We build AI Employees, high-performance digital presences, and custom
            software that move your business forward without the overhead that
            slows it down.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 40,
              justifyContent: heroStyle === "split" ? "flex-start" : "center",
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeInUp 0.8s ease 1.2s forwards",
            }}
          >
            <button
              ref={ctaBtn}
              onClick={() => scrollTo("#cta")}
              onMouseEnter={onCTAEnter}
              onMouseLeave={onCTALeave}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                flexShrink: 0,
                height: 48,
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 24,
                paddingRight: 56,
                borderRadius: 999,
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "pointer",
                transition:
                  "padding-left 0.5s cubic-bezier(0.16,1,0.3,1), padding-right 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                Schedule a Consultation
              </span>
              <div
                ref={ctaIcon}
                style={{
                  position: "absolute",
                  right: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition:
                    "right 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </button>
            <MagneticButton
              onClick={() => scrollTo("#capabilities")}
              style={{
                height: 48,
                padding: "0 32px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface)",
                color: "var(--text-1)",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-hover)";
                e.currentTarget.style.borderColor = "var(--border-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--surface)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              See How It Works
            </MagneticButton>
          </div>
        </div>

        {/* Split layout visual */}
        {heroStyle === "split" && (
          <div
            style={{
              opacity: 0,
              animation: "fadeInUp 0.8s ease 0.8s forwards",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: 24,
                background:
                  "linear-gradient(135deg, var(--surface), var(--accent-subtle))",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                color: "var(--text-3)",
                fontSize: 14,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}
                >
                  ⬡
                </div>
                <div>AI-powered visual</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0,
          animation: "fadeIn 1s ease 1.8s forwards",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--text-3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-heading)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 20,
            height: 32,
            borderRadius: 10,
            border: "1.5px solid var(--border-strong)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: "var(--accent)",
              animation: "fadeInUp 1.5s ease infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
