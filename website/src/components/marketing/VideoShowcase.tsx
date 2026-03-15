"use client";

import { useEffect, useRef, useState } from "react";

const TABS = [
  {
    label: "Email Copilot",
    src: "/media/0223-3.mov",
    bullets: ["Classifies inbound", "Drafts replies", "Routes to CRM"],
  },
  {
    label: "Document Review",
    src: "/media/0223-2.mov",
    bullets: ["Extracts clauses", "Flags risks", "Routes for approval"],
  },
  {
    label: "Meeting Intelligence",
    src: "/media/0223-4.mov",
    bullets: ["Captures decisions", "Assigns actions", "Updates systems"],
  },
  {
    label: "Evidence Search",
    src: "/media/0223-7.mov",
    bullets: ["Searches all tools", "Cites sources", "Assembles Context Pack"],
  },
  {
    label: "Live Dashboard",
    src: "/media/0223-8.mov",
    bullets: ["Live activity", "Audit trail", "Performance metrics"],
  },
] as const;

export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function switchTab(i: number) {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 280);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {/* autoplay blocked */});
    }
  }, [active]);

  const tab = TABS[active];

  return (
    <section style={{ padding: "96px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div className="sr" style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 12, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "#0018FF",
              fontFamily: "var(--font-body)", marginBottom: 12,
            }}
          >
            See it in action
          </p>
          <h2 style={{ color: "#0A0F1E", marginBottom: 16 }}>
            Watch ZUUZ work in real time
          </h2>
          <p style={{ fontSize: 18, color: "#64748B", maxWidth: 560, margin: "0 auto", fontFamily: "var(--font-body)" }}>
            Each demo shows a complete enterprise workflow — from signal to executed action.
          </p>
        </div>

        {/* Tab Row */}
        <div
          className="sr d1"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => switchTab(i)}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: active === i ? "#0018FF" : "#fff",
                color: active === i ? "#fff" : "#475569",
                border: active === i ? "1.5px solid #0018FF" : "1.5px solid #E2E8F0",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Browser Chrome + Video */}
        <div
          className="sr d2"
          style={{
            maxWidth: 900,
            margin: "0 auto 32px",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* MacOS title bar */}
          <div
            style={{
              height: 44,
              background: "#1A1A2E",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 12,
            }}
          >
            {/* Traffic light dots */}
            <div style={{ display: "flex", gap: 7 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                <div
                  key={i}
                  style={{ width: 12, height: 12, borderRadius: "50%", background: c }}
                />
              ))}
            </div>
            {/* URL bar */}
            <div
              style={{
                flex: 1,
                maxWidth: 360,
                margin: "0 auto",
                background: "rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
              }}
            >
              zuuz.ai/demo
            </div>
          </div>

          {/* Video */}
          <div
            style={{
              position: "relative",
              background: "#0A0A14",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.28s ease",
            }}
          >
            <video
              ref={videoRef}
              key={tab.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: "100%", display: "block", maxHeight: 520 }}
            >
              <source src={tab.src} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Feature bullets */}
        <div
          className="sr d3"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px 32px",
            flexWrap: "wrap",
          }}
        >
          {tab.bullets.map((bullet) => (
            <div
              key={bullet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "#64748B",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#0018FF",
                  flexShrink: 0,
                }}
              />
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
