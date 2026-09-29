"use client";
import { useState } from "react";
import Image from "next/image";
import { SOCIAL_PROFILES } from "@/lib/seo";

const FG   = "#e2e8f0";
const MUTED = "rgba(148,163,184,0.75)";
const BORDER = "rgba(255,255,255,0.08)";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  "Capabilities": [
    { label: "AI Solutions",     href: "/capabilities/ai-solutions" },
    { label: "AI Employees",     href: "/capabilities/ai-employees" },
    { label: "Digital Growth",   href: "/capabilities/digital-growth" },
    { label: "Custom Software",  href: "/capabilities/custom-software" },
  ],
  "Company": [
    { label: "About",       href: "/about" },
    { label: "Case Studies", href: "/work" },
    { label: "Insights",    href: "/insights" },
    { label: "Contact",     href: "/contact" },
  ],
};

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? "#60a5fa" : MUTED,
        transition: "color 0.22s",
        textDecoration: "none",
        display: "inline-block",
        padding: "6px 0",
      }}
    >
      {label}
    </a>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? "#60a5fa" : MUTED,
        transition: "color 0.22s",
        textDecoration: "none",
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
        background: "#080d1a",
        borderTop: `1px solid ${BORDER}`,
        padding: "64px 0 32px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(24px, 4vw, 48px)",
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <Image
              src="/cloudex-logo.png"
              alt="Cloudex"
              width={120}
              height={24}
              style={{
                height: 24,
                width: "auto",
                marginBottom: 16,
                filter: "brightness(0) invert(1)",
              }}
            />
            <p
              style={{
                fontSize: 14,
                color: MUTED,
                lineHeight: 1.65,
                maxWidth: 260,
                marginBottom: 20,
              }}
            >
              Building AI Employees, high-performance digital presences, and
              custom software that move businesses forward.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                href="tel:+447840983410"
                style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}
              >
                +44 7840 983410
              </a>
              <a
                href="mailto:info@cloudextechnologies.io"
                style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}
              >
                info@cloudextechnologies.io
              </a>
              <span style={{ fontSize: 13, color: MUTED }}>
                852, 85 Dunstall Hill, Wolverhampton WV6 0SR, UK
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: FG,
                  fontFamily: "var(--font-heading)",
                  lineHeight: 1.15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                {links.map((link, i) => (
                  <FooterLink key={i} label={link.label} href={link.href} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: MUTED }}>
            © {new Date().getFullYear()} Cloudex Technologies. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {SOCIAL_PROFILES.map((profile) => (
              <SocialLink key={profile.label} label={profile.label} href={profile.url} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
