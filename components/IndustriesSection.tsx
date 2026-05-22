"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

/* ── Data ── */
const INDUSTRIES = [
  {
    id: "fintech",
    title: "FinTech",
    tagline: "Smart compliance & analytics",
    desc: "Streamline regulatory compliance, automate financial reporting, and unlock real-time analytics across your entire operation.",
    stats: [
      { v: "10x", l: "Faster Processing" },
      { v: "47%", l: "Cost Reduction" },
      { v: "99.9%", l: "Compliance Rate" },
    ],
    hue: 220,
  },
  {
    id: "realestate",
    title: "Real Estate",
    tagline: "Automated lead & listing ops",
    desc: "Capture, qualify, and nurture leads automatically while keeping your listings synced across every major platform.",
    stats: [
      { v: "3x", l: "Lead Volume" },
      { v: "60%", l: "Time Saved" },
      { v: "24/7", l: "Response Time" },
    ],
    hue: 150,
  },
  {
    id: "startups",
    title: "Startups",
    tagline: "Fast automation from day one",
    desc: "Launch faster with pre-built workflows designed to scale seamlessly from early-stage MVP to enterprise grade.",
    stats: [
      { v: "5x", l: "Ship Velocity" },
      { v: "70%", l: "Ops Automated" },
      { v: "<1hr", l: "Setup Time" },
    ],
    hue: 270,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    tagline: "AI-driven conversion ops",
    desc: "Maximize every touchpoint with intelligent cart recovery, dynamic pricing, and predictive inventory management.",
    stats: [
      { v: "34%", l: "Revenue Lift" },
      { v: "2.5x", l: "Conv. Rate" },
      { v: "89%", l: "Retention" },
    ],
    hue: 30,
  },
  {
    id: "healthcare",
    title: "Healthcare",
    tagline: "Patient workflow automation",
    desc: "Automate patient intake, scheduling, and follow-ups while maintaining full HIPAA-compliant data handling.",
    stats: [
      { v: "40%", l: "Admin Reduced" },
      { v: "99%", l: "Uptime SLA" },
      { v: "4.8★", l: "Satisfaction" },
    ],
    hue: 175,
  },
];

/* ── SVG Icons ── */
function IndustryIcon({ id, size = 24 }: { id: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    fintech: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 4 5-8" />
      </>
    ),
    realestate: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    startups: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    ecommerce: (
      <>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </>
    ),
    healthcare: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[id]}
    </svg>
  );
}

/* ── Featured Card ── */
interface Industry {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  stats: { v: string; l: string }[];
  hue: number;
}

const FeaturedCard = memo(function FeaturedCard({
  industry,
  duration,
  isPaused,
  cycleKey,
}: {
  industry: Industry;
  duration: number;
  isPaused: boolean;
  cycleKey: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const { hue } = industry;
  const accent = `oklch(0.65 0.18 ${hue})`;
  const glow = `oklch(0.65 0.18 ${hue} / 0.15)`;
  const iconBg = `oklch(0.65 0.18 ${hue} / 0.1)`;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        borderRadius: 20,
        border: "1px solid var(--border)",
        background: "var(--bg-2)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        overflow: "hidden",
        minHeight: 440,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.4s",
      }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "var(--surface)",
          zIndex: 5,
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
        }}
      >
        <div
          key={cycleKey}
          style={{
            height: "100%",
            width: 0,
            borderRadius: "0 2px 2px 0",
            background: accent,
            animationName: "ind-progress-fill",
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
            animationDuration: `${duration}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>

      {/* Animated blobs */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: glow,
            filter: "blur(80px)",
            top: -60,
            right: -40,
            animation: "ind-float1 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: glow,
            filter: "blur(80px)",
            bottom: -40,
            left: -20,
            animation: "ind-float2 11s ease-in-out infinite",
          }}
        />
      </div>

      {/* Cursor glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "opacity 0.35s",
          zIndex: 1,
          opacity: hov ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, ${glow}, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div
        key={industry.id}
        style={{
          position: "relative",
          zIndex: 2,
          padding: 36,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          animation: "ind-enter-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 22,
            background: iconBg,
            color: accent,
          }}
        >
          <IndustryIcon id={industry.id} size={28} />
        </div>

        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 5,
            color: "var(--text-1)",
          }}
        >
          {industry.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-2)",
            marginBottom: 14,
            fontWeight: 500,
          }}
        >
          {industry.tagline}
        </p>
        <p
          style={{
            fontSize: 14.5,
            color: "var(--text-2)",
            lineHeight: 1.72,
            marginBottom: "auto",
            paddingBottom: 22,
            maxWidth: 420,
          }}
        >
          {industry.desc}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
          }}
        >
          {industry.stats.map((s, i) => (
            <div
              key={s.l}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                animation: "ind-enter-up 0.45s cubic-bezier(0.16,1,0.3,1) both",
                animationDelay: `${0.15 + i * 0.1}s`,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: accent,
                }}
              >
                {s.v}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text-3)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Small Card ── */
const SmallCard = memo(function SmallCard({
  industry,
  isActive,
  onClick,
  index,
}: {
  industry: Industry;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const { hue } = industry;
  const accent = `oklch(0.65 0.18 ${hue})`;
  const iconBg =
    isActive || hov
      ? `oklch(0.65 0.18 ${hue} / 0.12)`
      : `oklch(0.65 0.18 ${hue} / 0.05)`;

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
        flex: 1,
        padding: "18px 22px",
        borderRadius: 16,
        border: `1px solid ${isActive ? "var(--border-strong)" : "var(--border)"}`,
        background: isActive || hov ? "var(--bg-3)" : "var(--bg-2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        fontFamily: "inherit",
        fontSize: "inherit",
        color: "inherit",
        textAlign: "left",
        outline: "none",
        animation: "ind-enter-up 0.45s cubic-bezier(0.16,1,0.3,1) both",
        animationDelay: `${index * 0.07}s`,
        transform: hov && !isActive ? "translateX(4px)" : "translateX(0)",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          borderRadius: "0 4px 4px 0",
          background: accent,
          height: isActive ? "55%" : hov ? "40%" : "0%",
          transition: "height 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Cursor glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "opacity 0.35s",
          zIndex: 1,
          opacity: hov ? 1 : 0,
          background: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, oklch(0.65 0.18 ${hue} / 0.06), transparent 70%)`,
        }}
      />

      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: iconBg,
          color: accent,
          transition: "background 0.3s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <IndustryIcon id={industry.id} size={20} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
          flex: 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "var(--text-1)",
          }}
        >
          {industry.title}
        </span>
        <span
          style={{
            fontSize: 12.5,
            color: "var(--text-3)",
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {industry.tagline}
        </span>
      </div>

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          flexShrink: 0,
          color: "var(--text-3)",
          opacity: hov || isActive ? 0.6 : 0,
          transform: hov || isActive ? "translateX(0)" : "translateX(-4px)",
          transition: "all 0.3s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
});

/* ── Main Section ── */
const AUTO_ROTATE_SPEED = 5; // seconds

export function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedRef = useRef(0);
  const lastStartRef = useRef(performance.now());

  /* Auto-rotate with elapsed-time tracking so pause/resume stays in sync */
  useEffect(() => {
    if (isPaused) {
      elapsedRef.current += performance.now() - lastStartRef.current;
      return;
    }

    const total = AUTO_ROTATE_SPEED * 1000;
    const remaining = Math.max(200, total - elapsedRef.current);
    lastStartRef.current = performance.now();

    timerRef.current = setTimeout(() => {
      elapsedRef.current = 0;
      setActiveIdx((prev) => (prev + 1) % INDUSTRIES.length);
      setCycleKey((k) => k + 1);
    }, remaining);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIdx, isPaused, cycleKey]);

  const pick = useCallback((i: number) => {
    elapsedRef.current = 0;
    setActiveIdx(i);
    setCycleKey((k) => k + 1);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        padding: "80px 0 0",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-40%)",
          width: "70%",
          height: "70%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: 52, position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              borderRadius: 100,
              background: "var(--accent-subtle)",
              border: "1px solid rgba(37,99,235,0.18)",
              color: "var(--accent-hover)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            Industries We Serve
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: 14,
              color: "var(--text-1)",
            }}
          >
            Built for every fast-moving industry
          </h2>
          <p
            style={{
              fontSize: "clamp(14px,1.4vw,17px)",
              color: "var(--text-2)",
              lineHeight: 1.65,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Intelligent solutions where automation creates competitive advantage.
          </p>
        </div>
      </ScrollReveal>

      {/* Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: 14,
          position: "relative",
          zIndex: 1,
        }}
        className="ind-grid"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <FeaturedCard
          industry={INDUSTRIES[activeIdx]}
          duration={AUTO_ROTATE_SPEED}
          isPaused={isPaused}
          cycleKey={cycleKey}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {INDUSTRIES.map((ind, i) => (
            <SmallCard
              key={ind.id}
              industry={ind}
              isActive={i === activeIdx}
              onClick={() => pick(i)}
              index={i}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ind-progress-fill { from { width: 0%; } to { width: 100%; } }
        @keyframes ind-enter-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ind-float1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(-30px,25px) scale(1.08); }
          66%  { transform: translate(20px,-15px) scale(0.92); }
        }
        @keyframes ind-float2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(20px,-20px) scale(0.9); }
          66%  { transform: translate(-18px,18px) scale(1.1); }
        }
        @media (max-width: 860px) {
          .ind-grid { grid-template-columns: 1fr !important; }
          .ind-grid > div:last-child {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
          }
        }
        @media (max-width: 480px) {
          .ind-grid > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
