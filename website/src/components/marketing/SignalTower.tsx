"use client";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

const SOURCES = [
  {
    label: "CRM",
    color: "#00A1E0",
    path: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z",
  },
  {
    label: "ERP",
    color: "#0070AD",
    path: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4zM4 3h16a1 1 0 011 1v1H3V4a1 1 0 011-1zm0 15h16a1 1 0 001-1v-1H3v1a1 1 0 001 1z",
  },
  {
    label: "ITSM",
    color: "#059669",
    path: "M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.3.07-.63.07-.96 0-.33-.03-.66-.07-1l2.15-1.68c.19-.15.24-.42.12-.64l-2.04-3.53c-.12-.22-.39-.3-.61-.22l-2.54 1.02c-.52-.4-1.08-.73-1.69-.98l-.38-2.7C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.7c-.61.25-1.17.59-1.69.98L4.9 5.08c-.22-.08-.49 0-.61.22L2.25 8.83c-.13.22-.07.49.12.64L4.52 11.1c-.04.34-.07.67-.07 1s.03.66.07 1L2.37 14.78c-.19.15-.24.42-.12.64l2.04 3.53c.12.22.39.3.61.22l2.54-1.02c.52.4 1.08.73 1.69.98l.38 2.7c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.7c.61-.25 1.17-.59 1.69-.98l2.54 1.02c.22.08.49 0 .61-.22l2.04-3.53c.12-.22.07-.49-.12-.64l-2.15-1.68z",
  },
  {
    label: "Slack",
    color: "#4A154B",
    path: "M5 15.17a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 010 15.17a2.5 2.5 0 012.5-2.5H5v2.5zm1.27 0a2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5v6.33A2.5 2.5 0 018.77 24a2.5 2.5 0 01-2.5-2.5v-6.33zM8.77 5a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 018.77 0a2.5 2.5 0 012.5 2.5V5H8.77zm0 1.27a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5H2.44a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5h6.33z",
  },
  {
    label: "Teams",
    color: "#5059C9",
    path: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  },
  {
    label: "Email",
    color: "#EA4335",
    path: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z",
  },
  {
    label: "Docs",
    color: "#4285F4",
    path: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v7h7v9H6zm2-3h8v-1.5H8V17zm0-3h8v-1.5H8V14zm0-3h5v-1.5H8V11z",
  },
];

const OUTPUTS = [
  { label: "AI Agents",       sub: "Intelligent task execution",   color: BLUE      },
  { label: "Unified Search",  sub: "Search all sources instantly", color: "#0891B2" },
  { label: "Workflows",       sub: "Streamline processes",         color: "#7C3AED" },
  { label: "Safe Write Back", sub: "Secure with full audit trail", color: "#059669" },
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
  const W = 900, H = 610;
  const coreX = W / 2;  // 450
  const coreY = 248;
  const coreR = 54;
  const srcY  = 16;
  const outY  = 400;

  // Source chip centers evenly from 50 to 850 (7 sources)
  const srcXs = SOURCES.map((_, i) => 50 + i * (800 / 6));

  // Output box centers from 80 to 820 (4 outputs), left edge = center - 80
  const outCenters = OUTPUTS.map((_, i) => 80 + i * (740 / 3));
  const outLeft    = outCenters.map(c => c - 80);

  // Icon scale: 32×32 target from 24-unit viewBox
  const iconScale = 32 / 24;

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", userSelect: "none" }}>
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
            d={sCurve(coreX, coreY + coreR, outCenters[i], outY)}
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
            path={sCurve(coreX, coreY + coreR, outCenters[i], outY)}
            dur={`${1.7 + i * 0.25}s`}
            delay={`${0.8 + i * 0.22}s`}
            color={o.color}
          />
        ))}

        {/* ── SOURCE CHIPS (80×60) ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`}>
            {/* Chip card */}
            <rect x={srcXs[i] - 40} y={srcY} width={80} height={60} rx={12}
              fill="white" stroke={s.color} strokeWidth="1.8"
              style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.10))" }} />
            {/* Colored icon bg */}
            <rect x={srcXs[i] - 16} y={srcY + 8} width={32} height={32} rx={6}
              fill={s.color} opacity="0.12" />
            {/* Icon (path scaled from 24-unit to 32px) */}
            <g transform={`translate(${srcXs[i] - 16},${srcY + 8}) scale(${iconScale})`}>
              <path d={s.path} fill={s.color} />
            </g>
            {/* Label */}
            <text x={srcXs[i]} y={srcY + 76}
              textAnchor="middle" fontSize="12" fontWeight="700"
              fill="#222" fontFamily={F}>{s.label}</text>
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
          textAnchor="middle" fontSize="14" fontWeight="800"
          fill="white" fontFamily={F} letterSpacing="2">ZUUZ</text>

        {/* ── OUTPUT BOXES (160×80) ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outLeft[i]} y={outY} width={160} height={80} rx={10}
              fill="white" stroke={o.color} strokeWidth="1.8"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.10))" }} />
            {/* Left color bar */}
            <rect x={outLeft[i]} y={outY} width={5} height={80} rx={2} fill={o.color} />
            {/* Title */}
            <text x={outLeft[i] + 16} y={outY + 27}
              fontSize="13" fontWeight="700" fill={o.color} fontFamily={F}>
              {o.label}
            </text>
            {/* Sub */}
            <text x={outLeft[i] + 16} y={outY + 45}
              fontSize="10" fill="#555" fontFamily={F}>
              {o.sub.substring(0, 24)}
            </text>
            {o.sub.length > 24 && (
              <text x={outLeft[i] + 16} y={outY + 59}
                fontSize="10" fill="#555" fontFamily={F}>
                {o.sub.substring(24)}
              </text>
            )}
          </g>
        ))}

        {/* Brand tagline */}
        <text x={W / 2} y={H - 4}
          textAnchor="middle" fontSize="11" fill="#BBBBBB"
          fontFamily={F} fontStyle="italic">
          Where Decisions Actually Happen.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
