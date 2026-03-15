"use client";
import { useRef } from "react";

const SOURCES = [
  { id:"crm",   label:"CRM",   color:"#00A1E0", bg:"#E6F6FD", icon:"◈" },
  { id:"erp",   label:"ERP",   color:"#0070AD", bg:"#E6F2F9", icon:"⬡" },
  { id:"itsm",  label:"ITSM",  color:"#62D84E", bg:"#EDF9EA", icon:"◎" },
  { id:"slack", label:"Slack", color:"#4A154B", bg:"#F3E8F7", icon:"#" },
  { id:"teams", label:"Teams", color:"#5059C9", bg:"#ECEDF9", icon:"T" },
  { id:"email", label:"Email", color:"#EA4335", bg:"#FDE9E8", icon:"@" },
  { id:"docs",  label:"Docs",  color:"#4285F4", bg:"#EAF0FE", icon:"≡" },
];

const OUTPUTS = [
  { label:"Email",       sublabel:"Triage & routing",        color:"#2563EB" },
  { label:"Documents",   sublabel:"Review & extraction",      color:"#0891B2" },
  { label:"Meetings",    sublabel:"Capture & action",         color:"#7C3AED" },
  { label:"Decision",    sublabel:"Policy-enforced approval", color:"#059669" },
  { label:"Safe Exec.",  sublabel:"Verified write-back",      color:"#D97706" },
];

export function SignalTower() {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 700, H = 500;
  const coreX = W / 2, coreY = 210;
  const srcY = 30, outY = 360;

  const srcSpacing = (W - 100) / (SOURCES.length - 1);
  const srcXs = SOURCES.map((_, i) => 50 + i * srcSpacing);

  const outSpacing = (W - 120) / (OUTPUTS.length - 1);
  const outXs = OUTPUTS.map((_, i) => 60 + i * outSpacing);

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="stCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.3"/>
            <stop offset="70%"  stopColor="#2563EB" stopOpacity="0.07"/>
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
          </radialGradient>
          <filter id="stGlow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* ── CONNECTOR LINES: sources → core ── */}
        {SOURCES.map((s, i) => (
          <line key={`sl-${i}`}
            x1={srcXs[i]} y1={srcY + 40}
            x2={coreX}    y2={coreY - 42}
            stroke={s.color}
            strokeWidth="1"
            strokeDasharray="4 5"
            opacity="0.25"
          />
        ))}

        {/* ── CONNECTOR LINES: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <line key={`ol-${i}`}
            x1={coreX}    y1={coreY + 42}
            x2={outXs[i]} y2={outY}
            stroke={o.color}
            strokeWidth="1"
            strokeDasharray="4 5"
            opacity="0.25"
          />
        ))}

        {/* ── ANIMATED DATA BLOCKS: sources → core ── */}
        {SOURCES.map((s, i) => {
          const x1 = srcXs[i], y1 = srcY + 40;
          const x2 = coreX,    y2 = coreY - 42;
          const dur = 1.6 + i * 0.22;
          const delay = i * 0.38;
          return (
            <g key={`sb-${i}`}>
              <rect width="16" height="8" rx="2" fill={s.color} opacity="0.9">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path={`M ${x1},${y1} L ${x2},${y2}`}
                />
                <animate attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.08;0.9;1"
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"/>
              </rect>
            </g>
          );
        })}

        {/* ── ANIMATED DATA BLOCKS: core → outputs ── */}
        {OUTPUTS.map((o, i) => {
          const x1 = coreX, y1 = coreY + 42;
          const x2 = outXs[i], y2 = outY;
          const dur = 1.8 + i * 0.25;
          const delay = 0.4 + i * 0.42;
          return (
            <g key={`ob-${i}`}>
              <rect width="16" height="8" rx="2" fill={o.color} opacity="0.9">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path={`M ${x1},${y1} L ${x2},${y2}`}
                />
                <animate attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.08;0.9;1"
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"/>
              </rect>
            </g>
          );
        })}

        {/* ── SOURCE CHIPS — rectangular blocks ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc-${i}`}>
            <rect
              x={srcXs[i] - 32} y={srcY}
              width={64} height={38}
              rx={8}
              fill="white"
              stroke={s.color}
              strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.07))" }}
            />
            {/* Top color bar */}
            <rect
              x={srcXs[i] - 32} y={srcY}
              width={64} height={4}
              rx={8}
              fill={s.color}
              opacity="0.75"
            />
            {/* Icon */}
            <text
              x={srcXs[i] - 14} y={srcY + 24}
              fontSize="11" fontWeight="600"
              fill={s.color}
              fontFamily="Inter, sans-serif">
              {s.icon}
            </text>
            {/* Label */}
            <text
              x={srcXs[i] + 2} y={srcY + 25}
              fontSize="9" fontWeight="600"
              fill="#374151"
              fontFamily="Inter, sans-serif">
              {s.label}
            </text>
          </g>
        ))}

        {/* ── CORE: ZUUZ AI Processing Engine ── */}
        <circle cx={coreX} cy={coreY} r={72} fill="url(#stCoreGlow)">
          <animate attributeName="r" values="68;80;68" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx={coreX} cy={coreY} r={50}
          fill="none" stroke="#DBEAFE" strokeWidth="1" opacity="0.6"/>
        <circle cx={coreX} cy={coreY} r={42}
          fill="#1E40AF"
          filter="url(#stGlow)"/>
        <circle cx={coreX} cy={coreY} r={42}
          fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="40;46;40" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>
        <text x={coreX} y={coreY - 6}
          textAnchor="middle" fontSize="16" fontWeight="700"
          fill="white" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
          ZUUZ
        </text>
        <text x={coreX} y={coreY + 10}
          textAnchor="middle" fontSize="7.5" fill="#93C5FD"
          fontFamily="Inter, sans-serif" letterSpacing="0.12em">
          AI ENGINE
        </text>

        {/* ── OUTPUT BOXES ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`oc-${i}`}>
            <rect
              x={outXs[i] - 52} y={outY}
              width={104} height={52}
              rx={8}
              fill="white"
              stroke={o.color}
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.07))" }}
            />
            <rect
              x={outXs[i] - 52} y={outY}
              width={4} height={52}
              rx={2}
              fill={o.color}
            />
            <text
              x={outXs[i] - 40} y={outY + 22}
              fontSize="11" fontWeight="600"
              fill={o.color}
              fontFamily="Inter, sans-serif">
              {o.label}
            </text>
            <text
              x={outXs[i] - 40} y={outY + 38}
              fontSize="8.5" fill="#6B7280"
              fontFamily="Inter, sans-serif">
              {o.sublabel}
            </text>
          </g>
        ))}

        <text x={W / 2} y={H - 8}
          textAnchor="middle" fontSize="11"
          fill="#9CA3AF" fontFamily="Inter, sans-serif" fontStyle="italic">
          Where decisions actually happen.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
