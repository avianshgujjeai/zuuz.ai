"use client";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";
const EF = "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";

const SOURCES = [
  { label: "CRM",   color: "#00A1E0", bg: "#E6F6FD", emoji: "👤" },
  { label: "ERP",   color: "#0070AD", bg: "#E5F0F8", emoji: "🏢" },
  { label: "ITSM",  color: "#059669", bg: "#E6F7F1", emoji: "⚙️"  },
  { label: "Slack", color: "#4A154B", bg: "#F3E8F7", emoji: "💬" },
  { label: "Teams", color: "#5059C9", bg: "#ECEDF9", emoji: "👥" },
  { label: "Email", color: "#EA4335", bg: "#FDE9E8", emoji: "✉️"  },
  { label: "Docs",  color: "#4285F4", bg: "#EAF0FE", emoji: "📄" },
];

const OUTPUTS = [
  { label: "AI Agents",       sub: "Task execution",     color: BLUE      },
  { label: "Unified Search",  sub: "Cross-system search", color: "#0891B2" },
  { label: "Workflows",       sub: "Process automation",  color: "#7C3AED" },
  { label: "Safe Write Back", sub: "Audit-logged exec.",  color: "#059669" },
];

function sCurve(x1: number, y1: number, x2: number, y2: number): string {
  const dy = y2 - y1;
  const dx = x2 - x1;
  const cp1x = x1 + dx * 0.1;
  const cp1y = y1 + dy * 0.55;
  const cp2x = x2 - dx * 0.1;
  const cp2y = y2 - dy * 0.55;
  return `M ${x1},${y1} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
}

function AnimDot({ path, dur, delay, color }: { path: string; dur: string; delay: string; color: string }) {
  return (
    <circle r="4.5" fill={color} opacity="0">
      <animateMotion dur={dur} begin={delay} repeatCount="indefinite" path={path} />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1"
        dur={dur} begin={delay} repeatCount="indefinite" />
    </circle>
  );
}

export function SignalTower() {
  const W    = 920;
  const H    = 660;
  const coreX = W / 2;  // 460
  const coreY = 280;
  const coreR = 54;
  const srcY  = 16;
  const outY  = 460;

  // 7 source chip centers, spread from 50 to 870
  const srcXs = SOURCES.map((_, i) => 50 + i * (820 / 6));

  // 4 output boxes 170px wide with 20px gap → total 740px, centred in W=920
  const outStartX = (W - 740) / 2;  // 90
  const outXs     = OUTPUTS.map((_, i) => outStartX + i * 190);  // left edges: [90, 280, 470, 660]
  const outCenter = (i: number) => outXs[i] + 85;               // box centers for S-curves

  return (
    <div style={{ width: "100%", maxWidth: 920, margin: "0 auto", userSelect: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ signal flow diagram"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={BLUE}    stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#A3F3FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor={BLUE}    stopOpacity="0"    />
          </radialGradient>
          <filter id="starGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── S-CURVE LINES: sources → core ── */}
        {SOURCES.map((s, i) => (
          <path key={`sp${i}`}
            d={sCurve(srcXs[i], srcY + 60, coreX, coreY - coreR)}
            stroke={s.color} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4"
          />
        ))}

        {/* ── S-CURVE LINES: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <path key={`op${i}`}
            d={sCurve(coreX, coreY + coreR, outCenter(i), outY)}
            stroke={o.color} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4"
          />
        ))}

        {/* ── ANIMATED DOTS: sources → core ── */}
        {SOURCES.map((s, i) => (
          <AnimDot
            key={`ad${i}`}
            path={sCurve(srcXs[i], srcY + 60, coreX, coreY - coreR)}
            dur={`${1.9 + i * 0.2}s`}
            delay={`${i * 0.28}s`}
            color={s.color}
          />
        ))}

        {/* ── ANIMATED DOTS: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <AnimDot
            key={`od${i}`}
            path={sCurve(coreX, coreY + coreR, outCenter(i), outY)}
            dur={`${1.7 + i * 0.25}s`}
            delay={`${0.8 + i * 0.22}s`}
            color={o.color}
          />
        ))}

        {/* ── SOURCE CHIPS (88×60) ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`}>
            {/* Card background */}
            <rect x={srcXs[i] - 44} y={srcY} width={88} height={60} rx={12}
              fill="white" stroke={s.color} strokeWidth="2"
              style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.10))" }} />
            {/* Colored icon background */}
            <rect x={srcXs[i] - 22} y={srcY + 6} width={44} height={36} rx={8}
              fill={s.bg} />
            {/* Emoji icon */}
            <text x={srcXs[i]} y={srcY + 30}
              textAnchor="middle" fontSize="22"
              dominantBaseline="middle"
              fontFamily={EF}>
              {s.emoji}
            </text>
            {/* Label — dark, readable */}
            <text x={srcXs[i]} y={srcY + 76}
              textAnchor="middle" fontSize="13" fontWeight="700"
              fill="#111111" fontFamily={F}>
              {s.label}
            </text>
          </g>
        ))}

        {/* ── CORE: ambient glow halo ── */}
        <circle cx={coreX} cy={coreY} r={88} fill="url(#coreGlow)">
          <animate attributeName="r" values="84;100;84" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ── 4-POINTED STAR (r=54) ── */}
        <path filter="url(#starGlow)"
          d={[
            `M ${coreX} ${coreY - coreR}`,
            `C ${coreX + 6} ${coreY - 18} ${coreX + 18} ${coreY - 6} ${coreX + coreR} ${coreY}`,
            `C ${coreX + 18} ${coreY + 6} ${coreX + 6} ${coreY + 18} ${coreX} ${coreY + coreR}`,
            `C ${coreX - 6} ${coreY + 18} ${coreX - 18} ${coreY + 6} ${coreX - coreR} ${coreY}`,
            `C ${coreX - 18} ${coreY - 6} ${coreX - 6} ${coreY - 18} ${coreX} ${coreY - coreR} Z`,
          ].join(" ")}
          fill={BLUE}>
          <animate attributeName="opacity" values="0.88;1;0.88" dur="2.5s" repeatCount="indefinite" />
        </path>
        {/* Inner star highlight */}
        <path
          d={[
            `M ${coreX} ${coreY - 32}`,
            `C ${coreX + 4} ${coreY - 10} ${coreX + 10} ${coreY - 4} ${coreX + 32} ${coreY}`,
            `C ${coreX + 10} ${coreY + 4} ${coreX + 4} ${coreY + 10} ${coreX} ${coreY + 32}`,
            `C ${coreX - 4} ${coreY + 10} ${coreX - 10} ${coreY + 4} ${coreX - 32} ${coreY}`,
            `C ${coreX - 10} ${coreY - 4} ${coreX - 4} ${coreY - 10} ${coreX} ${coreY - 32} Z`,
          ].join(" ")}
          fill="rgba(255,255,255,0.28)" />
        {/* ZUUZ label */}
        <text x={coreX} y={coreY + 6}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="14" fontWeight="800"
          fill="white" fontFamily={F} letterSpacing="2">ZUUZ</text>

        {/* ── OUTPUT BOXES (170×88) ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outXs[i]} y={outY} width={170} height={88} rx={10}
              fill="white" stroke={o.color} strokeWidth="2"
              style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.10))" }} />
            {/* Left color bar */}
            <rect x={outXs[i]} y={outY} width={5} height={88} rx={2} fill={o.color} />
            {/* Title */}
            <text x={outXs[i] + 16} y={outY + 30}
              fontSize="14" fontWeight="700" fill={o.color} fontFamily={F}>
              {o.label}
            </text>
            {/* Sub — dark grey, readable */}
            <text x={outXs[i] + 16} y={outY + 52}
              fontSize="12" fill="#333333" fontFamily={F}>
              {o.sub}
            </text>
          </g>
        ))}

        {/* Brand tagline — readable */}
        <text x={W / 2} y={H - 12}
          textAnchor="middle" fontSize="13" fill="#444444"
          fontFamily={F} fontWeight="500">
          Where Decisions Actually Happen.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
