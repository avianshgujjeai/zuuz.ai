"use client";
import { useState, useEffect, useRef } from "react";
const STAGES = [
  { id:1, title:"1. Purchase Request",    desc:"An urgent MRO purchase request for $45K is submitted by the team." },
  { id:2, title:"2. Data Sources Pulled", desc:"AI agents pull data from ERP, Supplier DB, Budget System, Contracts & Documents." },
  { id:3, title:"3. AI Processing",       desc:"Email Agent, Document Agent and Search Agent process all data together." },
  { id:4, title:"4. Context Pack Ready",  desc:"Full context assembled: budget status, vendor history, contract terms, risk score." },
  { id:5, title:"5. Decision & Action",   desc:"CFO approves, ERP updated, email notifications sent, immutable audit trail logged." },
];
export function ArchDiagram() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % STAGES.length);
    }, 2200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);
  return (
    <div style={{ fontFamily:"'Montserrat',sans-serif" }}>
      {/* Stage selector pills */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {STAGES.map((s, i) => (
          <button key={s.id} onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); }}
            style={{
              padding:"7px 18px", borderRadius:999, cursor:"pointer",
              fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:600,
              border: i===active ? "2px solid #0018FF" : "1.5px solid #CCCCCC",
              background: i===active ? "#0018FF" : "white",
              color: i===active ? "white" : "#444444",
              transition:"all 0.2s ease",
            }}>
            Stage {s.id}
          </button>
        ))}
      </div>
      {/* Image + overlay container */}
      <div style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        isolation: "isolate",
        background: "#F5F6FF",
        width: "100%",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/arch-diagram.png"
          alt="ZUUZ Architecture Diagram"
          style={{
            width: "100%",
            display: "block",
            opacity: 1,
          }}
        />
        {/* Left overlay — hides stages to the left of active */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${active * 20}%`,
          height: "100%",
          background: "#F5F6FF",
          transition: "width 0.4s ease",
          zIndex: 2,
          pointerEvents: "none",
        }} />
        {/* Right overlay — hides stages to the right of active */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: `${(4 - active) * 20}%`,
          height: "100%",
          background: "#F5F6FF",
          transition: "width 0.4s ease",
          zIndex: 2,
          pointerEvents: "none",
        }} />
      </div>
      {/* Stage description */}
      <div style={{ marginTop:16, padding:"16px 20px", background:"#EEF2FF", borderRadius:12, border:"1px solid #C7D2FE", display:"flex", alignItems:"center", gap:14 }}>
        <div style={{
          width:40, height:40, borderRadius:"50%",
          background:"#0018FF", color:"white",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:16, fontWeight:800, flexShrink:0,
          fontFamily:"'Montserrat',sans-serif",
        }}>{STAGES[active].id}</div>
        <div>
          <p style={{ fontSize:14, fontWeight:700, color:"#000000", fontFamily:"'Montserrat',sans-serif", marginBottom:3 }}>
            {STAGES[active].title}
          </p>
          <p style={{ fontSize:13, color:"#333333", lineHeight:1.5, fontFamily:"'Montserrat',sans-serif" }}>
            {STAGES[active].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArchDiagram;
