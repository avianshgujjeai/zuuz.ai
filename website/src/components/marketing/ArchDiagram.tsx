"use client";

import { useRef, useEffect, useState } from "react";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

const SOURCES = [
  { label: "SAP",   color: "#0070AD", bg: "#E5F0F8" },
  { label: "M365",  color: "#D83B01", bg: "#FDE9E0" },
  { label: "Zoho",  color: "#E42527", bg: "#FDE8E8" },
  { label: "Slack", color: "#4A154B", bg: "#F3E8F7" },
  { label: "Jira",  color: "#0052CC", bg: "#E6EFFE" },
];

const ENGINE_MODULES = ["Context Pack", "Policy Gate", "Agent Execution", "Audit Log"];

const OUTPUTS = [
  { label: "Email Agent",   color: "#EA4335" },
  { label: "Doc Agent",     color: "#4285F4" },
  { label: "Meeting Agent", color: "#0891B2" },
  { label: "Decision Made", color: BLUE      },
  { label: "Safe Execute",  color: "#059669" },
];

// Canvas dot paths: percentage coordinates [x0,y0 → x1,y1]
const DOT_PATHS = [
  // sources → engine (top-half)
  { color: "#0070AD", x0: 0.10, y0: 0.08, x1: 0.50, y1: 0.44, speed: 0.008 },
  { color: "#D83B01", x0: 0.28, y0: 0.08, x1: 0.50, y1: 0.44, speed: 0.009 },
  { color: "#E42527", x0: 0.50, y0: 0.08, x1: 0.50, y1: 0.44, speed: 0.007 },
  { color: "#4A154B", x0: 0.72, y0: 0.08, x1: 0.50, y1: 0.44, speed: 0.010 },
  { color: "#0052CC", x0: 0.90, y0: 0.08, x1: 0.50, y1: 0.44, speed: 0.008 },
  // engine → outputs (bottom-half)
  { color: "#EA4335", x0: 0.50, y0: 0.62, x1: 0.10, y1: 0.92, speed: 0.009 },
  { color: "#4285F4", x0: 0.50, y0: 0.62, x1: 0.30, y1: 0.92, speed: 0.008 },
  { color: "#0891B2", x0: 0.50, y0: 0.62, x1: 0.50, y1: 0.92, speed: 0.010 },
  { color: BLUE,      x0: 0.50, y0: 0.62, x1: 0.70, y1: 0.92, speed: 0.007 },
  { color: "#059669", x0: 0.50, y0: 0.62, x1: 0.90, y1: 0.92, speed: 0.009 },
];

function AnimatedOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const progresses = DOT_PATHS.map((_, i) => (i * 0.15) % 1);
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DOT_PATHS.forEach((path, i) => {
        progresses[i] = (progresses[i] + path.speed) % 1;
        const t = progresses[i];
        const x = (path.x0 + (path.x1 - path.x0) * t) * canvas.width;
        const y = (path.y0 + (path.y1 - path.y0) * t) * canvas.height;

        // Glow halo
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 14);
        grad.addColorStop(0, path.color + "BB");
        grad.addColorStop(1, path.color + "00");
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Solid core dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = path.color;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        borderRadius: 16,
      }}
    />
  );
}

function SVGDiagram() {
  const W = 900;
  const H = 520;

  const t1Y = 30;
  const t2Y = 220;
  const t3Y = 390;
  const boxH1 = 64;
  const boxH2 = 110;
  const boxH3 = 80;

  const srcW = 140;
  const srcGap = 16;
  const srcTotal = SOURCES.length * srcW + (SOURCES.length - 1) * srcGap;
  const srcStartX = (W - srcTotal) / 2;
  const srcXs = SOURCES.map((_, i) => srcStartX + i * (srcW + srcGap));
  const srcCenter = (i: number) => srcXs[i] + srcW / 2;

  const engW = 700;
  const engX = (W - engW) / 2;

  const outW = 148;
  const outGap = 13;
  const outTotal = OUTPUTS.length * outW + (OUTPUTS.length - 1) * outGap;
  const outStartX = (W - outTotal) / 2;
  const outXs = OUTPUTS.map((_, i) => outStartX + i * (outW + outGap));
  const outCenter = (i: number) => outXs[i] + outW / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", display: "block" }}
      aria-label="ZUUZ architecture diagram"
    >
      {/* Connector lines: sources → engine */}
      {SOURCES.map((s, i) => (
        <line key={`sl${i}`}
          x1={srcCenter(i)} y1={t1Y + boxH1}
          x2={srcCenter(i)} y2={t2Y}
          stroke={s.color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"
        />
      ))}

      {/* Connector lines: engine → outputs */}
      {OUTPUTS.map((o, i) => (
        <line key={`ol${i}`}
          x1={outCenter(i)} y1={t2Y + boxH2}
          x2={outCenter(i)} y2={t3Y}
          stroke={o.color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"
        />
      ))}

      {/* Source boxes */}
      {SOURCES.map((s, i) => (
        <g key={`sb${i}`}>
          <rect x={srcXs[i]} y={t1Y} width={srcW} height={boxH1} rx={10}
            fill="white" stroke={s.color} strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
          <rect x={srcXs[i] + 6} y={t1Y + 6} width={srcW - 12} height={boxH1 - 28} rx={6}
            fill={s.bg} />
          <text x={srcCenter(i)} y={t1Y + boxH1 - 10}
            textAnchor="middle" fontSize="12" fontWeight="700"
            fill="#111111" fontFamily={F}>
            {s.label}
          </text>
        </g>
      ))}

      {/* ZUUZ Engine box */}
      <rect x={engX} y={t2Y} width={engW} height={boxH2} rx={14}
        fill="#000814"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,24,255,0.18))" }} />
      <rect x={engX} y={t2Y} width={engW} height={boxH2} rx={14}
        fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.6" />
      <text x={engX + 28} y={t2Y + 36}
        fontSize="13" fontWeight="800" fill="white"
        fontFamily={F} letterSpacing="1.5">
        ZUUZ ENGINE
      </text>

      {/* Module pills */}
      {ENGINE_MODULES.map((mod, i) => {
        const pillW = 140;
        const pillH = 34;
        const pillGap = 12;
        const pillsTotal = ENGINE_MODULES.length * pillW + (ENGINE_MODULES.length - 1) * pillGap;
        const pillsStartX = engX + (engW - pillsTotal) / 2;
        const px = pillsStartX + i * (pillW + pillGap);
        const py = t2Y + boxH2 - pillH - 16;
        return (
          <g key={`mp${i}`}>
            <rect x={px} y={py} width={pillW} height={pillH} rx={8}
              fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <text x={px + pillW / 2} y={py + pillH / 2 + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.82)"
              fontFamily={F}>
              {mod}
            </text>
          </g>
        );
      })}

      {/* Output boxes */}
      {OUTPUTS.map((o, i) => (
        <g key={`ob${i}`}>
          <rect x={outXs[i]} y={t3Y} width={outW} height={boxH3} rx={10}
            fill="white" stroke={o.color} strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.08))" }} />
          <rect x={outXs[i]} y={t3Y} width={4} height={boxH3} rx={2} fill={o.color} />
          <text x={outXs[i] + 14} y={t3Y + boxH3 / 2}
            dominantBaseline="middle"
            fontSize="12" fontWeight="700" fill={o.color}
            fontFamily={F}>
            {o.label}
          </text>
        </g>
      ))}

      {/* Tier labels */}
      <text x={engX - 4} y={t1Y + boxH1 / 2 + 4}
        textAnchor="end" fontSize="10" fontWeight="700"
        fill="#888" fontFamily={F} letterSpacing="0.08em">
        SOURCES
      </text>
      <text x={engX - 4} y={t3Y + boxH3 / 2 + 4}
        textAnchor="end" fontSize="10" fontWeight="700"
        fill="#888" fontFamily={F} letterSpacing="0.08em">
        OUTPUTS
      </text>
    </svg>
  );
}

export function ArchDiagram() {
  const [hasImage, setHasImage] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => { setHasImage(true); setChecked(true); };
    img.onerror = () => { setHasImage(false); setChecked(true); };
    img.src = "/images/arch-diagram.png";
  }, []);

  // While checking, render nothing to avoid flicker
  if (!checked) return <div style={{ minHeight: 400 }} />;

  if (hasImage) {
    return (
      <div style={{ position: "relative", width: "100%", borderRadius: 16, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/arch-diagram.png"
          alt="ZUUZ Architecture Diagram"
          style={{ width: "100%", display: "block", borderRadius: 16 }}
        />
        <AnimatedOverlay />
      </div>
    );
  }

  // Fallback: inline SVG diagram with animated dots via SVG animateMotion
  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", userSelect: "none" }}>
      <SVGDiagram />
    </div>
  );
}

export default ArchDiagram;
