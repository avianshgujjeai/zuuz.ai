"use client";
import { useState, useEffect, useRef } from "react";
const STAGES = [
  { id:1, title:"1. Purchase Request",    desc:"An urgent MRO purchase request for $45K is submitted by the team." },
  { id:2, title:"2. Data Sources Pulled", desc:"AI agents pull data from ERP, Supplier DB, Budget System, Contracts & Documents." },
  { id:3, title:"3. AI Processing",       desc:"Email Agent, Document Agent and Search Agent process all data together." },
  { id:4, title:"4. Context Pack Ready",  desc:"Full context assembled: budget status, vendor history, contract terms, risk score." },
  { id:5, title:"5. Decision & Action",   desc:"CFO approves, ERP updated, email notifications sent, immutable audit trail logged." },
];
const STAGE_POSITIONS = [
  { left:"0%",  width:"20%" },
  { left:"20%", width:"20%" },
  { left:"40%", width:"20%" },
  { left:"60%", width:"20%" },
  { left:"80%", width:"20%" },
];
const IMG_SRC = "/images/arch-diagram.png";
export function ArchDiagram() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % STAGES.length);
    }, 2200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);
  const pos = STAGE_POSITIONS[active];
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
      <div style={{ position:"relative", borderRadius:16, overflow:"hidden", background:"#F5F6FF", minHeight:300 }}>
        {imgError && (
          <div style={{ padding:40, textAlign:"center", color:"#666" }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:14 }}>
              Architecture diagram image not found at /images/arch-diagram.png
            </p>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, color:"#888", marginTop:8 }}>
              Please upload arch-diagram.png to website/public/images/
            </p>
          </div>
        )}
        {!imgError && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={IMG_SRC}
            alt="ZUUZ Architecture Diagram"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ width:"100%", display:"block", borderRadius:16, opacity: imgLoaded ? 1 : 0, transition:"opacity 0.3s" }}
          />
        )}
        {imgLoaded && !imgError && (
          <>
            <div style={{ position:"absolute", inset:0, borderRadius:16, background:"rgba(0,0,0,0.60)", pointerEvents:"none" }}/>
            <div style={{
              position:"absolute", top:0, bottom:0,
              left:pos.left, width:pos.width,
              background:"transparent",
              boxShadow:"0 0 0 9999px rgba(0,0,0,0.60)",
              pointerEvents:"none",
              transition:"left 0.55s cubic-bezier(0.4,0,0.2,1)",
            }}/>
            <div style={{
              position:"absolute", top:8, bottom:8,
              left:`calc(${pos.left} + 4px)`,
              width:`calc(${pos.width} - 8px)`,
              border:"2.5px solid #0018FF",
              borderRadius:8, pointerEvents:"none",
              transition:"left 0.55s cubic-bezier(0.4,0,0.2,1)",
              animation:"archPulse 1.5s ease-in-out infinite",
            }}/>
          </>
        )}
        {/* Progress bar */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:4, background:"rgba(0,0,0,0.2)", borderRadius:"0 0 16px 16px" }}>
          <div style={{
            height:"100%", background:"#0018FF",
            width:`${((active+1)/STAGES.length)*100}%`,
            transition:"width 0.55s ease", borderRadius:"0 0 0 16px",
          }}/>
        </div>
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
      <style>{`
        @keyframes archPulse {
          0%,100% { border-color:#0018FF; box-shadow:0 0 12px rgba(0,24,255,0.4); }
          50%      { border-color:#A3F3FF; box-shadow:0 0 24px rgba(0,24,255,0.6); }
        }
      `}</style>
    </div>
  );
}

export default ArchDiagram;
