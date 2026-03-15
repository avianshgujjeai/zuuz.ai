"use client";

import { useState, useRef, useEffect } from "react";

const TABS = [
  { category:"EMAIL",    catColor:"#3B82F6", label:"Email Insights",        video:"/media/0223-3.mov", urlPath:"email-insights" },
  { category:"DOCS",     catColor:"#8B5CF6", label:"Document Review",       video:"/media/0223-4.mov", urlPath:"document-review" },
  { category:"MEETINGS", catColor:"#06B6D4", label:"Meeting Intelligence",  video:"/media/0223-2.mov", urlPath:"meeting-intelligence" },
  { category:"DECISION", catColor:"#10B981", label:"Decision Routing",      video:"/media/0223-7.mov", urlPath:"decision-routing" },
  { category:"EXEC",     catColor:"#F59E0B", label:"Safe Execution",        video:"/media/0223-8.mov", urlPath:"safe-execution" },
];

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
    }, 160);
  }

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {/* autoplay blocked */});
  }, [active]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Tab pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.label}
              onClick={() => switchTab(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                borderRadius: 999,
                border: isActive
                  ? `1.5px solid ${t.catColor}`
                  : "1.5px solid rgba(255,255,255,0.12)",
                background: isActive
                  ? `${t.catColor}1A`
                  : "rgba(255,255,255,0.04)",
                cursor: "pointer",
                transition: "all 0.18s ease",
                outline: "none",
              }}
            >
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: isActive ? t.catColor : "rgba(255,255,255,0.4)",
                fontFamily: "Inter, sans-serif",
              }}>
                {t.category}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                fontFamily: "Inter, sans-serif",
              }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Browser chrome */}
      <div style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
      }}>
        {/* Chrome bar */}
        <div style={{
          background: "#1F2937",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {(["#FF5F57","#FEBC2E","#28C840"] as const).map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1,
            maxWidth: 360,
            margin: "0 auto",
            background: "#374151",
            borderRadius: 6,
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#28C840" strokeWidth="1.5"/>
              <path d="M5.5 8l1.5 1.5L10.5 6" stroke="#28C840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.01em",
            }}>
              app.zuuz.ai / copilot / {TABS[active].urlPath}
            </span>
          </div>
        </div>

        {/* Video */}
        <div style={{ position: "relative", background: "#0C111D", aspectRatio: "16/9" }}>
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
              transition: "opacity 0.16s ease",
            }}
          >
            <source src={TABS[active].video} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Caption */}
      <p style={{
        textAlign: "center",
        fontSize: 12,
        color: "rgba(255,255,255,0.25)",
        fontFamily: "Inter, sans-serif",
        marginTop: 12,
      }}>
        {TABS[active].label} Copilot &mdash; live product demo
      </p>
    </div>
  );
}

export default VideoDemo;
