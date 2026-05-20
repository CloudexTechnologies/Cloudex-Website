"use client";
import { useState } from "react";
import Image from "next/image";

const footerLinks: Record<string, string[]> = {
  "Our Capabilities": [
    "AI Solutions",
    "Digital Growth",
    "Custom Software Development",
  ],
  Company: ["About", "Case Studies", "Careers", "Contact"],
  Resources: ["Blog", "Documentation", "Privacy Policy", "Terms of Service"],
};

function FooterLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? "var(--accent)" : "var(--text-3)",
        transition: "color 0.25s",
      }}
    >
      {label}
    </a>
  );
}

function SocialLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? "var(--accent)" : "var(--text-3)",
        transition: "color 0.25s",
      }}
    >
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        padding: "64px 0 32px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <Image
              src="/uploads/Cloudex-Logo-Transparent-1.png"
              alt="Cloudex"
              width={120}
              height={24}
              style={{
                height: 24,
                width: "auto",
                marginBottom: 16,
                filter: "var(--logo-filter)",
                transition: "filter var(--transition)",
              }}
            />
            <p
              style={{
                fontSize: 14,
                color: "var(--text-3)",
                lineHeight: 1.65,
                maxWidth: 260,
              }}
            >
              Building intelligent systems that help businesses operate smarter
              and scale with confidence.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "var(--text-1)",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </h5>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {links.map((link, i) => (
                  <FooterLink key={i} label={link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>
            © 2026 Cloudex Technologies. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Twitter", "LinkedIn", "GitHub"].map((s, i) => (
              <SocialLink key={i} label={s} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
