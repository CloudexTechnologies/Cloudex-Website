"use client";
import { useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";

const allTestimonials = [
  { quote: "Cloudex deployed an AI employee that handles 80% of our customer inquiries. Our team finally focuses on what matters.", name: "Sarah Chen", role: "COO, TechScale Inc." },
  { quote: "The website system they built doubled our conversion rate in under two months. The ROI has been remarkable.", name: "Marcus Rivera", role: "Founder, GrowthLab" },
  { quote: "Their AI-native product approach was exactly what we needed. They didn't just add AI — they built with it from day one.", name: "Priya Patel", role: "CTO, FinEdge" },
  { quote: "We saw a 3× improvement in lead response time after Cloudex automated our intake workflows. Absolutely transformative.", name: "James Okonkwo", role: "VP Sales, PropVest" },
  { quote: "Cloudex built our custom management platform in record time. The system scales with us effortlessly.", name: "Lena Hoffmann", role: "CEO, OpsCloud" },
  { quote: "The AI agents they deployed handle complex queries with human-like precision. Our support costs dropped by 60%.", name: "Daniel Park", role: "Head of Product, NexaAI" },
  { quote: "Working with Cloudex was seamless. They understood our domain deeply and delivered a solution we're proud of.", name: "Amara Diallo", role: "Founder, MediBridge" },
  { quote: "Our entire workflow is now automated. What used to require a team of five is handled by a single AI system.", name: "Tom Hargreaves", role: "COO, StreamlineHQ" },
  { quote: "From strategy to deployment, Cloudex were true partners. The platform they built is the backbone of our growth.", name: "Nisha Kapoor", role: "Director, ScaleForce" },
];

function TestimonialCard({ t }: { t: (typeof allTestimonials)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px 26px",
        borderRadius: 20,
        marginBottom: 14,
        background: hovered ? "var(--surface-hover)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
        transition: "background 0.3s, border-color 0.3s",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ color: "#f59e0b", fontSize: 13, letterSpacing: "0.15em" }}>
        ★★★★★
      </div>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--text-2)",
          lineHeight: 1.75,
          fontStyle: "italic",
          margin: 0,
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            flexShrink: 0,
            background: "var(--accent-subtle)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--accent)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {t.name[0]}
        </div>
        <div>
          <div
            style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)" }}
          >
            {t.name}
          </div>
          <div
            style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 1 }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialColumn({
  items,
  duration,
  reverse,
  className,
}: {
  items: (typeof allTestimonials);
  duration: number;
  reverse: boolean;
  className?: string;
}) {
  return (
    <div className={`testimonial-col${className ? ` ${className}` : ""}`}>
      <div
        style={{
          animation: `${reverse ? "scrollTestimonialsDown" : "scrollTestimonialsUp"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          label="Testimonials"
          title="Trusted by Growing Businesses"
          subtitle="Hear from the teams we've helped build, deploy, and scale."
        />

        <div
          style={{
            position: "relative",
            height: 560,
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div style={{ display: "flex", gap: 14, height: "100%" }}>
            <TestimonialColumn
              items={allTestimonials.slice(0, 3)}
              duration={22}
              reverse={false}
            />
            <TestimonialColumn
              items={allTestimonials.slice(3, 6)}
              duration={28}
              reverse={true}
              className="testimonial-col-2"
            />
            <TestimonialColumn
              items={allTestimonials.slice(6, 9)}
              duration={19}
              reverse={false}
              className="testimonial-col-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
