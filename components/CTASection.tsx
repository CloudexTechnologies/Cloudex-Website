"use client";
import { ScrollReveal } from "./ui/ScrollReveal";
import { MagneticButton } from "./ui/MagneticButton";

export function CTASection() {
  return (
    <section
      id="cta"
      className="section"
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.08), transparent 70%)",
        }}
      />
      <div
        className="grid-bg"
        style={{
          maskImage:
            "radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 60%)",
        }}
      />
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              lineHeight: 1.15,
            }}
          >
            Ready to see what Cloudex can do{" "}
            <span className="gradient-text">for your business?</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "var(--text-2)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Book a free consultation and we will map out exactly where AI,
            digital, and software can make the biggest difference for you.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MagneticButton
              style={{
                padding: "16px 36px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
                boxShadow: "0 4px 30px rgba(37,99,235,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 50px rgba(37,99,235,0.5)";
                e.currentTarget.style.background = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 30px rgba(37,99,235,0.35)";
                e.currentTarget.style.background = "var(--accent)";
              }}
            >
              Schedule Your Free Consultation
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
