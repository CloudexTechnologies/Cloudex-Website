"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";

const whatHappensNext = [
  {
    step: "01",
    title: "We review your message",
    desc: "We review your message and respond within one business day.",
  },
  {
    step: "02",
    title: "We schedule a discovery call",
    desc: "A 30-minute discovery call no agenda apart from understanding your business.",
  },
  {
    step: "03",
    title: "We put together a proposal",
    desc: "If there is a genuine fit, we put together a clear proposal within five working days.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    interest: "",
    challenge: "",
    source: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text-1)",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text-2)",
    marginBottom: 7,
    fontFamily: "var(--font-heading)",
  };

  return (
    <InnerPageLayout>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "52vh",
          display: "flex",
          alignItems: "center",
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 76,
        }}
      >
        <PageHeroBackground />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 60, paddingBottom: 60 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 999,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 32,
                }}
              >
                Contact
              </span>
            </ScrollReveal>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 22,
              }}
            >
              <BlurText text="Let us have a proper conversation." delay={0.1} wordDelay={0.042} />
            </h1>
            <ScrollReveal delay={0.4}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.7vw, 19px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 580,
                  margin: "0 auto",
                }}
              >
                No pressure. No pitch deck until we know you actually need one.
                Just a straight conversation about where your business is and
                where technology can help it go.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Form + Details ── */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 60,
              alignItems: "start",
            }}
          >
            {/* Form */}
            <ScrollReveal direction="left">
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 24,
                  padding: "40px 36px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "rgba(34,197,94,0.12)",
                        border: "1px solid rgba(34,197,94,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <CheckCircle size={28} style={{ color: "#22c55e" }} />
                    </div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 12,
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      Message received
                    </h3>
                    <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75 }}>
                      We will review your message and get back to you within one
                      business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 28,
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Get in touch
                    </h2>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          style={inputStyle}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Business Name *</label>
                        <input
                          required
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="Your company"
                          style={inputStyle}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7000 000000"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>What are you looking for help with? *</label>
                      <select
                        required
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Select an option</option>
                        <option value="ai-solutions">AI Solutions</option>
                        <option value="digital-growth">Digital Growth</option>
                        <option value="custom-software">Custom Software</option>
                        <option value="not-sure">Not Sure Yet</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Tell us about your challenge *</label>
                      <textarea
                        required
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleChange}
                        rows={4}
                        placeholder="What is the main problem you are trying to solve?"
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: 100,
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle}>How did you find us? (optional)</label>
                      <input
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        placeholder="Google, referral, LinkedIn..."
                        style={inputStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: "100%",
                        padding: "14px 24px",
                        borderRadius: 10,
                        background: submitting ? "var(--accent-hover)" : "var(--accent)",
                        color: "#fff",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 15,
                        border: "none",
                        cursor: submitting ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.25s",
                        boxShadow: "0 4px 20px rgba(37,99,235,0.28)",
                      }}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      {!submitting && <ArrowRight size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Details */}
            <ScrollReveal direction="right" delay={0.15}>
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 28,
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Contact Details
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+44 7840 983410",
                      href: "tel:+447840983410",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "info@cloudextechnologies.io",
                      href: "mailto:info@cloudextechnologies.io",
                    },
                    {
                      icon: MapPin,
                      label: "Office",
                      value: "852, 85 Dunstall Hill, Wolverhampton WV6 0SR, United Kingdom",
                      href: null,
                    },
                  ].map((contact, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background: "var(--accent-subtle)",
                          color: "var(--accent)",
                          border: "1px solid rgba(37,99,235,0.15)",
                        }}
                      >
                        <contact.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "var(--text-3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.07em",
                            marginBottom: 4,
                          }}
                        >
                          {contact.label}
                        </div>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            style={{
                              fontSize: 15,
                              color: "var(--text-1)",
                              textDecoration: "none",
                              lineHeight: 1.5,
                            }}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: 15, color: "var(--text-1)", lineHeight: 1.6 }}>
                            {contact.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "28px 28px",
                    borderRadius: 18,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 20,
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Here is what to expect after you reach out.
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {whatHappensNext.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--accent)",
                            fontFamily: "var(--font-heading)",
                            width: 28,
                            flexShrink: 0,
                            paddingTop: 2,
                          }}
                        >
                          {item.step}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "var(--text-1)",
                              marginBottom: 3,
                            }}
                          >
                            {item.title}
                          </div>
                          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
