"use client";

import { useEffect, useState } from "react";

const F = "'Montserrat', sans-serif";

const SOURCES = ["Email", "Docs", "Calendar", "CRM", "ERP"];

const STEPS = [
  { label: "Context Pack",    sub: "Evidence bundle",   color: "#111827", border: "#111827", bg: "white"   },
  { label: "Approver",        sub: "Human-in-the-loop", color: "#B45309", border: "#F59E0B", bg: "#FFFBEB" },
  { label: "Safe Write-back", sub: "Verified action",   color: "#065F46", border: "#10B981", bg: "#ECFDF5" },
  { label: "Audit Log",       sub: "Immutable record",  color: "#1E40AF", border: "#3B82F6", bg: "#EFF6FF" },
];

function Arrow({ color = "#D1D5DB" }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      <div style={{ width: 28, height: 2, background: color }} />
      <div style={{
        width: 0, height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderLeft: `8px solid ${color}`,
      }} />
    </div>
  );
}

export function WorkflowPipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % STEPS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "28px 0" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {/* Source chips stacked on the left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginRight: 10 }}>
          {SOURCES.map(s => (
            <div key={s} style={{
              padding: "5px 14px",
              border: "1.5px solid #D1D5DB",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              background: "white",
              fontFamily: F,
              textAlign: "center",
              minWidth: 76,
            }}>{s}</div>
          ))}
        </div>

        <Arrow color="#555555" />

        {/* Pipeline steps */}
        {STEPS.map((step, i) => (
          <div key={step.label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              padding: "13px 15px",
              minWidth: 118,
              maxWidth: 138,
              border: `2px solid ${i === active ? step.border : "#E5E7EB"}`,
              borderRadius: 12,
              background: i === active ? step.bg : "white",
              textAlign: "center",
              transition: "all 0.3s ease",
              boxShadow: i === active ? `0 0 0 3px ${step.border}22` : "none",
            }}>
              <p style={{
                fontSize: 13,
                fontWeight: 700,
                color: i === active ? step.color : "#374151",
                fontFamily: F,
                lineHeight: 1.3,
                marginBottom: 3,
              }}>{step.label}</p>
              <p style={{
                fontSize: 10,
                color: "#555555",
                fontFamily: F,
              }}>{step.sub}</p>
            </div>
            {i < STEPS.length - 1 && (
              <Arrow color={i === active ? step.border : "#D1D5DB"} />
            )}
          </div>
        ))}

        {/* Live indicator */}
        <div style={{
          marginLeft: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 20,
          background: "#ECFDF5",
          border: "1px solid #A7F3D0",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#10B981", display: "inline-block",
            boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
          }} />
          <span style={{
            fontSize: 11, color: "#059669", fontWeight: 700,
            fontFamily: F,
          }}>Live</span>
        </div>
      </div>
    </div>
  );
}

export default WorkflowPipeline;
