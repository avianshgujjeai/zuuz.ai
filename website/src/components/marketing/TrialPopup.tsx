"use client";
import { useState, useEffect } from "react";

const CAL_URL = "https://cal.com/avinashgujje/30min";
const F = "'Montserrat',sans-serif";
const B = "#0018FF";

export function TrialPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", phone: ""
  });

  useEffect(() => {
    // Show popup after user scrolls 40% of page
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (!dismissed && !visible && scrolled / total > 0.4) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, visible]);

  function close() { setDismissed(true); setVisible(false); }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      notes: `Company: ${form.company} | Phone: ${form.phone}`,
    });
    window.open(`${CAL_URL}?${params.toString()}`, "_blank");
    setSubmitted(true);
    setTimeout(() => close(), 3000);
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={close} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 998, backdropFilter: "blur(2px)",
      }} />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 999, width: "min(520px, 92vw)",
        background: "#fff", borderRadius: 20,
        padding: "36px 32px",
        boxShadow: "0 20px 60px rgba(0,24,255,0.15)",
        fontFamily: F,
      }}>
        {/* Close */}
        <button onClick={close} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 20, color: "#999", lineHeight: 1, padding: 4,
        }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Calendar opened!</h3>
            <p style={{ fontSize: 14, color: "#555" }}>Pick a time that works for you. We look forward to the call.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, marginBottom: 8 }}>
              Start Your Trial
            </p>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#000", marginBottom: 6, lineHeight: 1.2 }}>
              See ZUUZ on your workflows
            </h3>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>
              Book a 30-min session. We show ZUUZ running on your actual processes — not a generic demo.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jane"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E0E0E8", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Doe"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E0E0E8", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>Work Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@company.com"
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E0E0E8", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>Company *</label>
                  <input name="company" value={form.company} onChange={handleChange} required placeholder="Acme Corp"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E0E0E8", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 0100"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E0E0E8", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <button type="submit" style={{
                width: "100%", padding: "13px", background: B, color: "#fff",
                border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700,
                fontFamily: F, cursor: "pointer",
              }}>
                Book a Meeting →
              </button>
              <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 10 }}>
                No commitment · 30 minutes · Your actual workflows
              </p>
            </form>
          </>
        )}
      </div>
    </>
  );
}
