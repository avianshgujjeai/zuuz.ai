"use client";
import { useState, useEffect, useRef } from "react";
const STAGES = [
  {
    id: 1,
    title: "1. Purchase Request",
    desc: "An urgent MRO purchase request for $45,000 is submitted",
    highlight: { left: "0%", width: "20%" },
  },
  {
    id: 2,
    title: "2. Data Sources Pulled",
    desc: "AI agents pull data from ERP, Supplier DB, Budget, Contracts & Documents",
    highlight: { left: "20%", width: "20%" },
  },
  {
    id: 3,
    title: "3. AI Processing",
    desc: "Email Agent, Document Agent and Search Agent process the data together",
    highlight: { left: "40%", width: "20%" },
  },
  {
    id: 4,
    title: "4. Context Pack Ready",
    desc: "Full context assembled: Budget status, vendor history, contract terms, risk",
    highlight: { left: "60%", width: "20%" },
  },
  {
    id: 5,
    title: "5. Decision & Action",
    desc: "CFO approves, ERP updated, email notifications sent, audit trail logged",
    highlight: { left: "80%", width: "20%" },
  },
];
export function ArchDiagram() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!isAnimating) return;
    timerRef.current = setInterval(() => {
      setActiveStage(prev => (prev + 1) % STAGES.length);
    }, 2200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAnimating]);
  const stage = STAGES[activeStage];
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Stage indicator pills */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginBottom: 24,
        flexWrap: "wrap",
      }}>
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setActiveStage(i);
              setIsAnimating(false);
              setTimeout(() => setIsAnimating(true), 8000);
            }}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: i === activeStage
                ? "2px solid #0018FF"
                : "1.5px solid #E0E4F0",
              background: i === activeStage ? "#0018FF" : "white",
              color: i === activeStage ? "white" : "#555",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              transition: "all 0.25s ease",
            }}
          >
            Stage {s.id}
          </button>
        ))}
      </div>
      {/* Image with animated stage highlight overlay */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
        {/* The architecture diagram image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/arch-diagram.png"
          alt="ZUUZ Architecture"
          style={{ width: "100%", display: "block", borderRadius: 16 }}
        />
        {/* Dark overlay on non-active stages */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          pointerEvents: "none",
          background: "rgba(0,0,0,0.55)",
          transition: "opacity 0.5s ease",
        }}/>
        {/* Bright window on the active stage */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: stage.highlight.left,
          width: stage.highlight.width,
          background: "transparent",
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
          borderRadius: 4,
          pointerEvents: "none",
          transition: "left 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}/>
        {/* Blue pulsing border on active stage */}
        <div style={{
          position: "absolute",
          top: 8,
          bottom: 8,
          left: `calc(${stage.highlight.left} + 4px)`,
          width: `calc(${stage.highlight.width} - 8px)`,
          border: "2.5px solid #0018FF",
          borderRadius: 8,
          pointerEvents: "none",
          transition: "left 0.6s cubic-bezier(0.4,0,0.2,1)",
          animation: "stagePulse 1.5s ease-in-out infinite",
        }}/>
        {/* Progress bar at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "rgba(255,255,255,0.15)",
          borderRadius: "0 0 16px 16px",
        }}>
          <div style={{
            height: "100%",
            background: "#0018FF",
            borderRadius: "0 0 0 16px",
            width: `${((activeStage + 1) / STAGES.length) * 100}%`,
            transition: "width 0.6s ease",
          }}/>
        </div>
      </div>
      {/* Stage description card */}
      <div style={{
        marginTop: 20,
        padding: "18px 24px",
        background: "#EEF2FF",
        borderRadius: 12,
        border: "1px solid #C7D2FE",
        display: "flex",
        alignItems: "center",
        gap: 16,
        transition: "all 0.3s ease",
      }}>
        {/* Stage number circle */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#0018FF",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 800,
          flexShrink: 0,
          fontFamily: "'Montserrat', sans-serif",
        }}>
          {stage.id}
        </div>
        <div>
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#000000",
            marginBottom: 4,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            {stage.title}
          </p>
          <p style={{
            fontSize: 13,
            color: "#333333",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.5,
          }}>
            {stage.desc}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes stagePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default ArchDiagram;
