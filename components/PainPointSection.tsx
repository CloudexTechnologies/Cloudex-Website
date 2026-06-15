"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Bot, Globe, Code2, ArrowRight } from "lucide-react";
import { ScrollFloat } from "./ui/ScrollFloat";

const phrases: { lines: string[]; size: string }[] = [
  {
    lines: ["You are running a team."],
    size: "clamp(28px, 4.2vw, 62px)",
  },
  {
    lines: ["Deadlines are piling up."],
    size: "clamp(26px, 4vw, 58px)",
  },
  {
    lines: ["Good talent is expensive", "and hard to hold onto."],
    size: "clamp(22px, 3.2vw, 48px)",
  },
  {
    lines: ["Your website is not pulling its weight."],
    size: "clamp(22px, 3vw, 44px)",
  },
  {
    lines: [
      "And the software you are using was built",
      "for someone else's business, not yours.",
    ],
    size: "clamp(20px, 2.6vw, 38px)",
  },
];

export function PainPointSection() {
  const resolveRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = resolveRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* ── Headline ── */}
      <div style={{ padding: "120px 0 80px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          {["Most businesses are leaving", "money on the table "].map((line, i) => (
            <ScrollFloat
              key={i}
              text={line}
              delay={i * 120}
              style={{
                fontSize: "clamp(28px, 4.2vw, 62px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                color: "var(--text-1)",
                fontFamily: "var(--font-heading)",
                display: "block",
              }}
            />
          ))}
          <ScrollFloat
            text="and they know it."
            delay={240}
            style={{
              fontSize: "clamp(28px, 4.2vw, 62px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              background: "linear-gradient(135deg, #2563EB 30%, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-heading)",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* ── Phrase Stack ── */}
      <div style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {phrases.map((phrase, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(32px, 4vw, 60px) 0",
                  borderBottom: i < phrases.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                {phrase.lines.map((line, li) => (
                  <ScrollFloat
                    key={li}
                    text={line}
                    delay={li * 100}
                    style={{
                      fontSize: phrase.size,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.08,
                      color: "var(--text-1)",
                      fontFamily: "var(--font-heading)",
                      display: "block",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three Capabilities. One Partner. ── */}
      <div
        ref={resolveRef}
        style={{
          background: "var(--bg-2)",
          borderTop: "1px solid var(--border)",
          padding: "120px 0",
        }}
      >
        <div className="container">

          {/* Eyebrow + statement */}
          <div style={{ maxWidth: 760, marginBottom: 80 }}>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                marginBottom: 24,
              }}
            >
              <span style={{
                fontSize: 11, fontWeight: 700, color: "var(--accent)",
                textTransform: "uppercase", letterSpacing: "0.1em",
                fontFamily: "var(--font-heading)",
              }}>
                The Cloudex Difference
              </span>
            </div>

            <ScrollFloat
              text="Three Capabilities."
              style={{
                fontSize: "clamp(30px, 4.2vw, 60px)",
                fontWeight: 800, letterSpacing: "-0.03em",
                lineHeight: 1.08, color: "var(--text-1)",
                fontFamily: "var(--font-heading)", display: "block",
              }}
            />
            <ScrollFloat
              text="One Partner."
              delay={110}
              style={{
                fontSize: "clamp(30px, 4.2vw, 60px)",
                fontWeight: 800, letterSpacing: "-0.03em",
                lineHeight: 1.08, fontFamily: "var(--font-heading)",
                display: "block",
                background: "linear-gradient(135deg, var(--accent) 20%, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />

            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "var(--text-2)", lineHeight: 1.8,
                marginTop: 28,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
              }}
            >
              Cloudex was built for exactly this moment. We bring together
              AI-powered workforce solutions, digital growth expertise, and
              purpose-built software so you can stop patching problems and
              start scaling properly.
            </p>
          </div>

          {/* Three capabilities horizontal rows with dividers */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                icon: Bot,
                color: "var(--accent)",
                label: "AI Solutions",
                sublabel: "AI Employees and AI Native Products",
                desc: "Deploy intelligent AI Employees that handle your sales outreach, customer queries, financial reporting, marketing execution and more around the clock, without error.",
                href: "/capabilities/ai-solutions",
                delay: 0,
              },
              {
                icon: Globe,
                color: "var(--accent)",
                label: "Digital Growth",
                sublabel: "Websites That Actually Bring Business",
                desc: "We build high-converting business websites and drive search visibility so your ideal clients find you before they find anyone else.",
                href: "/capabilities/digital-growth",
                delay: 120,
              },
              {
                icon: Code2,
                color: "var(--accent)",
                label: "Custom Software",
                sublabel: "Software Built Around You",
                desc: "No off-the-shelf compromise. We design and build software tailored to how your business actually works.",
                href: "/capabilities/custom-software",
                delay: 240,
              },
            ].map(({ icon: Icon, color, label, sublabel, desc, href, delay: d }, i) => (
              <CapRow
                key={i}
                Icon={Icon}
                color={color}
                label={label}
                sublabel={sublabel}
                desc={desc}
                href={href}
                visible={visible}
                delay={d}
                isLast={i === 2}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function CapRow({
  Icon, color, label, sublabel, desc, href, visible, delay, isLast,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  color: string;
  label: string;
  sublabel: string;
  desc: string;
  href: string;
  visible: boolean;
  delay: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr auto",
        gap: "clamp(24px, 4vw, 64px)",
        alignItems: "center",
        padding: "clamp(28px, 3.5vw, 48px) 0",
        borderTop: "1px solid var(--border)",
        borderBottom: isLast ? "1px solid var(--border)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.7s ease ${delay + 200}ms, transform 0.7s ease ${delay + 200}ms`,
        cursor: "default",
      }}
    >
      {/* Left: icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${color}14`,
          border: `1px solid ${color}28`,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>
          <Icon size={20} strokeWidth={1.5} style={{ color }} />
        </div>
        <div>
          <div style={{
            fontSize: "clamp(16px, 1.6vw, 20px)",
            fontWeight: 700, color,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.01em",
            marginBottom: 2,
          }}>
            {label}
          </div>
          <div style={{
            fontSize: 12, color: "var(--text-3)",
            fontWeight: 500, lineHeight: 1.4,
          }}>
            {sublabel}
          </div>
        </div>
      </div>

      {/* Middle: description */}
      <p style={{
        fontSize: "clamp(13px, 1.3vw, 15px)",
        color: "var(--text-2)", lineHeight: 1.75,
      }}>
        {desc}
      </p>

      {/* Right: arrow link */}
      <Link
        href={href}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 40, height: 40, borderRadius: "50%",
          background: hovered ? color : "var(--surface)",
          border: `1px solid ${hovered ? color : "var(--border)"}`,
          color: hovered ? "#fff" : "var(--text-3)",
          textDecoration: "none", flexShrink: 0,
          transition: "all 0.25s ease",
          transform: hovered ? "translateX(4px)" : "none",
        }}
      >
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
