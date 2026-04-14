"use client";
import { useState } from "react";

const CAL_URL = "https://cal.com/avinashgujje/30min";
const F = "'Montserrat',sans-serif";
const B = "#0018FF";

export default function RequestTrialPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", phone: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Build cal.com URL with prefilled params
    const params = new URLSearchParams({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      notes: `Company: ${form.company} | Phone: ${form.phone}`,
    });
    window.open(`${CAL_URL}?${params.toString()}`, "_blank");
    setSubmitted(true);
  }

  return (
    <main style={{ fontFamily: F, minHeight: "100vh", background: "linear-gradient(155deg,#EEF2FF 0%,#fff 60%)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, marginBottom: 12 }}>
            Start Your Trial
          </p>
          <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#000", marginBottom: 16, lineHeight: 1.1 }}>
            See ZUUZ in your workflows
          </h1>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.7 }}>
            Fill in your details and book a 30-minute session — we will show ZUUZ running on your actual processes, not a canned demo.
          </p>
        </div>

        {/* Form card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 32px rgba(0,24,255,0.08)", border: "1px solid #E0E4F8" }}>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h2 style={{ fontWeight: 700, color: "#000", marginBottom: 12 }}>Meeting link opened!</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>
                If the calendar didn&apos;t open, click below to book directly.
              </p>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", padding: "12px 28px", background: B, color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Book a meeting →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* First + Last name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>First Name *</label>
                  <input
                    name="firstName" value={form.firstName} onChange={handleChange} required
                    placeholder="Jane"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E0E0E8", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>Last Name *</label>
                  <input
                    name="lastName" value={form.lastName} onChange={handleChange} required
                    placeholder="Doe"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E0E0E8", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>Work Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="jane@company.com"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E0E0E8", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Company */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>Company Name *</label>
                <input
                  name="company" value={form.company} onChange={handleChange} required
                  placeholder="Acme Corp"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E0E0E8", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>Contact Number</label>
                <input
                  name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+1 555 0100"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #E0E0E8", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Submit */}
              <button type="submit" style={{
                width: "100%", padding: "14px", background: B, color: "#fff",
                border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
                fontFamily: F, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8,
              }}>
                Book a Meeting →
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 12 }}>
                Opens a 30-min calendar slot directly with our team.
              </p>
            </form>
          )}
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
          {["SOC 2 Type I", "No commitment", "30 min session"].map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#DCFCE7"/>
                <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#10B981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
