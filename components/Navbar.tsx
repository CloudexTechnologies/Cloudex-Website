"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MagneticButton } from "./ui/MagneticButton";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";


/* ===== DROPDOWN DATA ===== */
const capabilitiesMenu = [
  {
    title: "AI Solutions",
    desc: "Autonomous AI systems for your business",
    items: [
      "AI Employees for Startups",
      "AI Employees for E-commerce",
      "AI Employees for Healthcare",
      "AI Employees for Real Estate",
      "AI-Native Products for SaaS",
      "AI-Native Products for FinTech",
      "AI-Native Products for EdTech",
      "AI-Native Products for Marketplaces",
    ],
  },
  {
    title: "Digital Growth",
    desc: "Strengthen your online presence",
    items: [
      "High-Converting Business Website System",
      "Search Visibility System",
      "Lead Capture & Conversion System",
      "Marketing Automation System",
    ],
  },
  {
    title: "Custom Software Development",
    desc: "Built around your processes",
    items: ["Custom Management Systems"],
  },
];

function NavDropdown({
  open,
  onEnter,
  onLeave,
}: {
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: 10,
        zIndex: 100,
        width: 720,
        maxWidth: "calc(100vw - 40px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <div
        style={{
          background: "var(--surface-solid)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 28,
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {capabilitiesMenu.map((col, ci) => (
          <div key={ci}>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: 15,
                marginBottom: 4,
                color: "var(--accent)",
              }}
            >
              {col.title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              {col.desc}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {col.items.map((item, ii) => (
                <DropdownItem key={ii} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DropdownItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 10px",
        borderRadius: "var(--radius-sm)",
        fontSize: 13,
        color: hovered ? "var(--text-1)" : "var(--text-2)",
        background: hovered ? "var(--surface-hover)" : "transparent",
        transition: "all 0.2s",
        display: "block",
      }}
    >
      {label}
    </a>
  );
}

/* ===== NAVBAR ===== */
const links = [
  { label: "Home", href: "#hero" },
  { label: "Our Capabilities", href: "#capabilities", hasDropdown: true },
  { label: "About", href: "#why-choose" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#cta" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    padding: scrolled ? "10px 20px" : "16px 20px",
    transition: "padding 0.4s cubic-bezier(0.16,1,0.3,1)",
  };

  const innerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: scrolled ? 920 : 1200,
    padding: scrolled ? "6px 20px" : "10px 24px",
    borderRadius: "var(--radius-pill)",
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    background: scrolled ? "var(--nav-bg)" : "transparent",
    backdropFilter: scrolled ? "blur(24px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
    boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.15)" : "none",
    position: "relative",
  };

  return (
    <nav style={wrapperStyle}>
      <div style={innerStyle}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 10 }}
        >
          <Image
            src="/uploads/Cloudex-Logo-Transparent-1.png"
            alt="Cloudex"
            width={160}
            height={40}
            style={{
              height: 40,
              width: "auto",
              filter: "var(--logo-filter)",
              transition: "filter var(--transition)",
            }}
          />
        </a>

        {/* Desktop Links */}
        <ul
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            listStyle: "none",
            fontFamily: "var(--font-heading)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {links.map((link, i) => (
            <li
              key={i}
              style={{ position: "relative" }}
              onMouseEnter={() => {
                setHoveredLink(i);
                if (link.hasDropdown) openDropdown();
              }}
              onMouseLeave={() => {
                setHoveredLink(null);
                if (link.hasDropdown) scheduleClose();
              }}
            >
              <button
                onClick={() => {
                  if (!link.hasDropdown) scrollTo(link.href);
                  else setDropdownOpen(!dropdownOpen);
                }}
                style={{
                  padding: "7px 14px",
                  borderRadius: "var(--radius-pill)",
                  color:
                    hoveredLink === i || (link.hasDropdown && dropdownOpen)
                      ? "var(--text-1)"
                      : "var(--text-2)",
                  background:
                    hoveredLink === i || (link.hasDropdown && dropdownOpen)
                      ? "var(--surface)"
                      : "transparent",
                  transition: "all 0.25s",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  position: "relative" as const,
                  border: "none",
                  fontFamily: "var(--font-heading)",
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      transition: "transform 0.25s",
                      transform: dropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    }}
                  >
                    <path
                      d="M2 4L5 7L8 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {link.hasDropdown && (
                <NavDropdown
                  open={dropdownOpen}
                  onEnter={openDropdown}
                  onLeave={scheduleClose}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right group */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AnimatedThemeToggler />
          <MagneticButton
            style={{
              padding: "8px 20px",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-heading)",
              transition: "all 0.25s",
              cursor: "pointer",
              border: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-hover)";
              e.currentTarget.style.boxShadow =
                "0 4px 24px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Let&apos;s Build Together
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-hamburger"
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              padding: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                background: "var(--text-1)",
                borderRadius: 2,
                transition: "all 0.3s",
                transform: mobileOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
                display: "block",
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                background: "var(--text-1)",
                borderRadius: 2,
                transition: "all 0.3s",
                opacity: mobileOpen ? 0 : 1,
                display: "block",
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                background: "var(--text-1)",
                borderRadius: 2,
                transition: "all 0.3s",
                transform: mobileOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
                display: "block",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 16,
            right: 16,
            marginTop: 8,
            background: "var(--surface-solid)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
            animation: "fadeInUp 0.3s ease",
          }}
        >
          {links.map((link, i) => (
            <MobileNavItem
              key={i}
              label={link.label}
              onClick={() => scrollTo(link.href)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

function MobileNavItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        width: "100%",
        padding: "12px 16px",
        textAlign: "left",
        fontSize: 15,
        fontWeight: 500,
        color: "var(--text-1)",
        fontFamily: "var(--font-heading)",
        borderRadius: "var(--radius-sm)",
        background: hovered ? "var(--surface)" : "none",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      {label}
    </button>
  );
}
