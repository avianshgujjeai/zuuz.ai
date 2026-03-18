"use client";
import { useId } from "react";

const SOURCES = [
  {
    label: "Email",
    color: "#EA4335",
    iconPath: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2l8 5 8-5v1l-8 5-8-5V6z",
  },
  {
    label: "CRM",
    color: "#00A1E0",
    iconPath: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  },
  {
    label: "ERP",
    color: "#0070AD",
    iconPath: "M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z",
  },
  {
    label: "Slack",
    color: "#4A154B",
    iconPath: "M6.527 14.514A1.973 1.973 0 014.56 12.55a1.973 1.973 0 011.967-1.964h1.967v1.964a1.973 1.973 0 01-1.967 1.964zm0-5.892A1.973 1.973 0 014.56 6.658a1.973 1.973 0 011.967-1.965 1.973 1.973 0 011.967 1.965v4.912H6.527zm5.924 0a1.973 1.973 0 011.967-1.964 1.973 1.973 0 011.967 1.964 1.973 1.973 0 01-1.967 1.965h-1.967V8.622zm0 5.892v-1.964h1.967a1.973 1.973 0 011.967 1.964 1.973 1.973 0 01-1.967 1.965 1.973 1.973 0 01-1.967-1.965zM6.527 20.406a1.973 1.973 0 01-1.967-1.965 1.973 1.973 0 011.967-1.964h1.967v1.964a1.973 1.973 0 01-1.967 1.965zm5.924-1.965v1.965a1.973 1.973 0 01-1.967 1.964 1.973 1.973 0 01-1.967-1.964v-1.965h3.934zM6.527 3.594A1.973 1.973 0 014.56 1.63 1.973 1.973 0 016.527-.335a1.973 1.973 0 011.967 1.965v1.964H6.527zm5.924 0V1.63a1.973 1.973 0 011.967-1.965 1.973 1.973 0 011.967 1.965 1.973 1.973 0 01-1.967 1.964h-1.967z",
  },
  {
    label: "Teams",
    color: "#5059C9",
    iconPath: "M21 6.5c0 1.93-1.57 3.5-3.5 3.5S14 8.43 14 6.5 15.57 3 17.5 3 21 4.57 21 6.5zM17.5 12c-2.79 0-5.5 1.21-5.5 2.71V17h11v-2.29c0-1.5-2.71-2.71-5.5-2.71zM9 11c1.66 0 3-1.34 3-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm0 2c-2.21 0-6 .79-6 2.36V17h12v-1.64C15 13.79 11.21 13 9 13z",
  },
  {
    label: "Docs",
    color: "#4285F4",
    iconPath: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11 8 15.01z",
  },
  {
    label: "ITSM",
    color: "#62D84E",
    iconPath: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  },
];

const OUTPUTS = [
  { label: "Email",      sub: "Triage & routing",          color: "#0018FF" },
  { label: "Documents",  sub: "Review & extraction",        color: "#0891B2" },
  { label: "Meetings",   sub: "Capture & action",           color: "#7C3AED" },
  { label: "Decision",   sub: "Policy-enforced approval",   color: "#059669" },
  { label: "Safe Exec.", sub: "Verified write-back",        color: "#D97706" },
];

export function SignalTower() {
  const uid = useId().replace(/:/g, "");
  const W = 720, H = 540;
  const coreX = W / 2, coreY = 240;
  const srcY = 40;
  const outY = 390;

  const srcXs = SOURCES.map((_, i) => 40 + i * ((W - 80) / (SOURCES.length - 1)));
  const outXs = OUTPUTS.map((_, i) => 48 + i * ((W - 96) / (OUTPUTS.length - 1)));

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto", userSelect: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ AI data flow diagram"
      >
        <defs>
          {/* Gradient flow lines: source → core */}
          {SOURCES.map((s, i) => (
            <linearGradient key={`sg${i}`} id={`sg${uid}${i}`}
              x1={srcXs[i]} y1={srcY + 48} x2={coreX} y2={coreY - 44}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#0018FF" stopOpacity="0.15"/>
            </linearGradient>
          ))}
          {/* Gradient flow lines: core → output */}
          {OUTPUTS.map((o, i) => (
            <linearGradient key={`og${i}`} id={`og${uid}${i}`}
              x1={coreX} y1={coreY + 44} x2={outXs[i]} y2={outY}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0018FF" stopOpacity="0.6"/>
              <stop offset="100%" stopColor={o.color} stopOpacity="0.8"/>
            </linearGradient>
          ))}
          {/* Core glow radial */}
          <radialGradient id={`cg${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0018FF" stopOpacity="0.5"/>
            <stop offset="60%"  stopColor="#A3F3FF" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#0018FF" stopOpacity="0"/>
          </radialGradient>
          {/* Glow filter for flow dots */}
          <filter id={`gf${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* ── Gradient flow lines: sources → core ── */}
        {SOURCES.map((s, i) => (
          <line key={`fl${i}`}
            x1={srcXs[i]} y1={srcY + 48}
            x2={coreX}    y2={coreY - 44}
            stroke={`url(#sg${uid}${i})`}
            strokeWidth="2.5"
            strokeDasharray="6 4"
            opacity="0.65"
          />
        ))}

        {/* ── Gradient flow lines: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <line key={`fl2${i}`}
            x1={coreX}    y1={coreY + 44}
            x2={outXs[i]} y2={outY}
            stroke={`url(#og${uid}${i})`}
            strokeWidth="2.5"
            strokeDasharray="6 4"
            opacity="0.65"
          />
        ))}

        {/* ── Animated flow dots: sources → core ── */}
        {SOURCES.map((s, i) => {
          const dur = 1.6 + i * 0.2;
          const delay = i * 0.32;
          const path = `M ${srcXs[i]},${srcY + 48} L ${coreX},${coreY - 44}`;
          return (
            <g key={`afd${i}`} filter={`url(#gf${uid})`}>
              <circle r="5" fill={s.color} opacity="0.4">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`}
                  repeatCount="indefinite" path={path}/>
                <animate attributeName="opacity"
                  values="0;0.4;0.4;0" keyTimes="0;0.05;0.9;1"
                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
              </circle>
              <circle r="3" fill={s.color} opacity="0.95">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`}
                  repeatCount="indefinite" path={path}/>
                <animate attributeName="opacity"
                  values="0;1;1;0" keyTimes="0;0.05;0.92;1"
                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          );
        })}

        {/* ── Animated flow dots: core → outputs ── */}
        {OUTPUTS.map((o, i) => {
          const dur = 1.8 + i * 0.22;
          const delay = 0.5 + i * 0.38;
          const path = `M ${coreX},${coreY + 44} L ${outXs[i]},${outY}`;
          return (
            <g key={`aod${i}`} filter={`url(#gf${uid})`}>
              <circle r="5" fill={o.color} opacity="0.4">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`}
                  repeatCount="indefinite" path={path}/>
                <animate attributeName="opacity"
                  values="0;0.4;0.4;0" keyTimes="0;0.05;0.9;1"
                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
              </circle>
              <circle r="3" fill={o.color} opacity="0.95">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`}
                  repeatCount="indefinite" path={path}/>
                <animate attributeName="opacity"
                  values="0;1;1;0" keyTimes="0;0.05;0.92;1"
                  dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          );
        })}

        {/* ── Source chips with SVG icons ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`}>
            <rect x={srcXs[i] - 28} y={srcY} width={56} height={44} rx={10}
              fill="white" stroke={s.color} strokeWidth="2.5"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }}/>
            <g transform={`translate(${srcXs[i] - 10}, ${srcY + 10})`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={s.color}>
                <path d={s.iconPath}/>
              </svg>
            </g>
            <text x={srcXs[i]} y={srcY + 60}
              textAnchor="middle" fontSize="11" fontWeight="700"
              fill="#333333" fontFamily="Montserrat, sans-serif">
              {s.label}
            </text>
          </g>
        ))}

        {/* ── ZUUZ Core Node ── */}
        <circle cx={coreX} cy={coreY} r={80} fill={`url(#cg${uid})`}>
          <animate attributeName="r" values="75;90;75" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx={coreX} cy={coreY} r={58}
          fill="none" stroke="#A3F3FF" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="56;62;56" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.08;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        {/* Main filled circle */}
        <circle cx={coreX} cy={coreY} r={46} fill="#0018FF"/>
        <circle cx={coreX} cy={coreY} r={40}
          fill="none" stroke="rgba(163,243,255,0.3)" strokeWidth="1"/>
        {/* 4-pointed star */}
        <path
          d={`M${coreX},${coreY - 22} L${coreX + 5},${coreY - 5} L${coreX + 22},${coreY} L${coreX + 5},${coreY + 5} L${coreX},${coreY + 22} L${coreX - 5},${coreY + 5} L${coreX - 22},${coreY} L${coreX - 5},${coreY - 5} Z`}
          fill="white" opacity="0.9">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite"/>
        </path>
        <text x={coreX} y={coreY + 5}
          textAnchor="middle" fontSize="11" fontWeight="800"
          fill="white" fontFamily="Montserrat, sans-serif" letterSpacing="0.06em">
          ZUUZ
        </text>

        {/* ── Output Boxes ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outXs[i] - 54} y={outY} width={108} height={56} rx={10}
              fill="white" stroke={o.color} strokeWidth="2.5"
              style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.08))" }}/>
            {/* Top color bar */}
            <rect x={outXs[i] - 54} y={outY} width={108} height={4} rx={2}
              fill={o.color}/>
            <text x={outXs[i]} y={outY + 24}
              textAnchor="middle" fontSize="13" fontWeight="800"
              fill={o.color} fontFamily="Montserrat, sans-serif">
              {o.label}
            </text>
            <text x={outXs[i]} y={outY + 40}
              textAnchor="middle" fontSize="10" fill="#222222"
              fontFamily="Montserrat, sans-serif">
              {o.sub}
            </text>
          </g>
        ))}

        {/* Brand tagline */}
        <text x={W / 2} y={H - 8}
          textAnchor="middle" fontSize="12" fill="#333333"
          fontFamily="Montserrat, sans-serif" fontWeight="500">
          Forged by Insight. Driven by Precision.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
