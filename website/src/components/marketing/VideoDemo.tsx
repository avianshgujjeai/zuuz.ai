"use client";

import { useState, useRef, useEffect } from "react";

const TABS = [
  { label: "Deal Desk",        sub: "Sales",    src: "/media/0223-3.mov" },
  { label: "HR Ops",           sub: "HR",       src: "/media/0223-2.mov" },
  { label: "IT Triage",        sub: "IT",       src: "/media/0223-4.mov" },
  { label: "Contract Review",  sub: "Legal",    src: "/media/0223-7.mov" },
  { label: "AP Matching",      sub: "Finance",  src: "/media/0223-8.mov" },
];

const TAG_COLORS: Record<string, string> = {
  Sales:   "#2563EB",
  HR:      "#7C3AED",
  IT:      "#0891B2",
  Legal:   "#059669",
  Finance: "#D97706",
};

export function VideoDemo() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function switchTab(i: number) {
    if (i === active || fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 180);
  }

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {/* autoplay blocked — fine */});
  }, [active]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Tab pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t, i) => {
          const isActive = i === active;
          const color = TAG_COLORS[t.sub];
          return (
            <button
              key={t.label}
              onClick={() => switchTab(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 999,
                border: isActive ? `1.5px solid ${color}` : "1.5px solid #E4E7EC",
                background: isActive ? `${color}12` : "#fff",
                cursor: "pointer",
                transition: "all 0.18s ease",
                outline: "none",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {t.sub}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? color : "#475467",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Browser chrome */}
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            background: "#2A2A2E",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
              <div
                key={c}
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
              background: "#1C1C1E",
              borderRadius: 6,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#3F9142" strokeWidth="1.5"/>
              <path d="M5.5 8l1.5 1.5L10.5 6" stroke="#3F9142" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              app.zuuz.ai / copilot / {TABS[active].label.toLowerCase().replace(/ /g, "-")}
            </span>
          </div>
        </div>

        {/* Video */}
        <div
          style={{
            position: "relative",
            background: "#0C111D",
            aspectRatio: "16/9",
          }}
        >
          <video
            ref={videoRef}
            key={active}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.18s ease",
            }}
          >
            <source src={TABS[active].src} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Caption */}
      <p
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "Inter, sans-serif",
          marginTop: 14,
          letterSpacing: "0.02em",
        }}
      >
        {TABS[active].label} Copilot &mdash; live product demo
      </p>
    </div>
  );
}

export default VideoDemo;
