"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticButton } from "./ui/MagneticButton";
import { AnimatedThemeToggler } from "./ui/AnimatedThemeToggler";

/* ===== DROPDOWN DATA ===== */
const NAV_MENU = [
  {
    title: "Capabilities",
    items: [
      { label: "AI Solutions", href: "/capabilities/ai-solutions", desc: "AI-native systems & automation" },
      { label: "Digital Growth", href: "/capabilities/digital-growth", desc: "Websites that bring business" },
      { label: "Custom Software", href: "/capabilities/custom-software", desc: "Built for your processes" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Healthcare", href: "/industries/healthcare", desc: "AI & Tech for healthcare" },
      { label: "Financial Services", href: "/industries/finance", desc: "Move faster without more risk" },
      { label: "E-Commerce", href: "/industries/ecommerce", desc: "More customers, fewer dropped balls" },
      { label: "Real Estate", href: "/industries/real-estate", desc: "Keep deals moving" },
      { label: "Legal & Professional", href: "/industries/legal", desc: "Deliver more, stretch less" },
      { label: "SaaS & Technology", href: "/industries/saas-tech", desc: "We speak your language" },
      { label: "Education", href: "/industries/education", desc: "Better outcomes, less admin" },
      { label: "Hospitality & Travel", href: "/industries/hospitality", desc: "Excellent operations" },
    ],
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
        width: 680,
        maxWidth: "calc(100vw - 40px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.22s ease",
      }}
    >
      <div
        style={{
          background: "var(--surface-solid)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "24px 28px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}
      >
        {NAV_MENU.map((col, ci) => (
          <div key={ci}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
                fontFamily: "var(--font-heading)",
              }}
            >
              {col.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {col.items.map((item, ii) => (
                <DropdownItem key={ii} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DropdownItem({
  label,
  href,
  desc,
  flagship,
}: {
  label: string;
  href: string;
  desc: string;
  flagship?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 10px",
        borderRadius: "var(--radius-sm)",
        background: hovered ? "var(--surface-hover)" : "transparent",
        transition: "background 0.18s",
        display: "block",
        textDecoration: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: flagship ? 600 : 400,
            color: hovered ? "var(--text-1)" : "var(--text-2)",
            transition: "color 0.18s",
          }}
        >
          {label}
        </span>
        {flagship && (
          <span
            style={{
              fontSize: 9,
              background: "var(--accent)",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: 4,
              fontWeight: 700,
              letterSpacing: "0.05em",
              fontFamily: "var(--font-heading)",
            }}
          >
            FLAGSHIP
          </span>
        )}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.4 }}>{desc}</div>
    </Link>
  );
}

/* ===== MAIN NAV LINKS ===== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const links: Array<{ label: string; href: string; hasDropdown?: boolean; flagship?: boolean }> = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "#", hasDropdown: true },
  { label: "AI Employees", href: "/capabilities/ai-employees", flagship: true },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return pathname.startsWith("/capabilities") || pathname.startsWith("/industries");
    return pathname.startsWith(href);
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
    <>
      {/* Theme toggler fixed top-right, independent of navbar */}
      <div
        style={{
          position: "fixed",
          top: 14,
          right: 20,
          zIndex: 1100,
        }}
      >
        <AnimatedThemeToggler />
      </div>

    <nav style={wrapperStyle}>
      <div style={innerStyle}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 10, flexShrink: 0, minWidth: 160 }}>
          <Image
            src="/cloudex-logo.png"
            alt="Cloudex"
            width={160}
            height={40}
            style={{ height: 40, width: 160, objectFit: "contain", filter: "var(--logo-filter)", transition: "filter var(--transition)" }}
          />
        </Link>

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
              {link.hasDropdown ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "var(--radius-pill)",
                    color: isActive(link.href) || hoveredLink === i || dropdownOpen ? "var(--text-1)" : "var(--text-2)",
                    background: isActive(link.href) || hoveredLink === i || dropdownOpen ? "var(--surface)" : "transparent",
                    transition: "all 0.25s",
                    cursor: "pointer",
                    whiteSpace: "nowrap" as const,
                    border: "none",
                    fontFamily: "var(--font-heading)",
                    fontSize: 14,
                    fontWeight: isActive(link.href) ? 600 : 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{ transition: "transform 0.25s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)" }}
                  >
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 14px",
                    borderRadius: "var(--radius-pill)",
                    color: isActive(link.href) || hoveredLink === i ? "var(--text-1)" : "var(--text-2)",
                    background: isActive(link.href) || hoveredLink === i ? "var(--surface)" : "transparent",
                    transition: "all 0.25s",
                    whiteSpace: "nowrap" as const,
                    fontFamily: "var(--font-heading)",
                    fontSize: 14,
                    fontWeight: isActive(link.href) ? 600 : 500,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  {link.flagship && (
                    <span style={{
                      fontSize: 9, background: "var(--accent)", color: "#fff",
                      padding: "2px 5px", borderRadius: 4, fontWeight: 700,
                      letterSpacing: "0.05em", fontFamily: "var(--font-heading)",
                    }}>
                      FLAGSHIP
                    </span>
                  )}
                </Link>
              )}
              {link.hasDropdown && (
                <NavDropdown open={dropdownOpen} onEnter={openDropdown} onLeave={scheduleClose} />
              )}
            </li>
          ))}
        </ul>

        {/* Right group */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/contact" style={{ textDecoration: "none" }}>
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
                whiteSpace: "nowrap" as const,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-hover)";
                e.currentTarget.style.boxShadow = "0 4px 24px var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Schedule a Consultation
            </MagneticButton>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-hamburger"
            style={{ display: "none", flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ width: 20, height: 2, background: "var(--text-1)", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none", display: "block" }} />
            <span style={{ width: 20, height: 2, background: "var(--text-1)", borderRadius: 2, transition: "all 0.3s", opacity: mobileOpen ? 0 : 1, display: "block" }} />
            <span style={{ width: 20, height: 2, background: "var(--text-1)", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none", display: "block" }} />
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
          {links
            .filter((l) => !l.hasDropdown)
            .map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "12px 16px", fontSize: 15, fontWeight: 500,
                  color: "var(--text-1)", fontFamily: "var(--font-heading)",
                  borderRadius: "var(--radius-sm)", textDecoration: "none",
                }}
              >
                {link.label}
                {link.flagship && (
                  <span style={{
                    fontSize: 9, background: "var(--accent)", color: "#fff",
                    padding: "2px 5px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em",
                  }}>FLAGSHIP</span>
                )}
              </Link>
            ))}
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, padding: "4px 16px" }}>
              Capabilities
            </div>
            {NAV_MENU[0].items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "8px 16px", fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
