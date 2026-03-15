"use client";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

// Source system chips — icons loaded from signal-icons/ (user uploads)
// Falls back to brand-icons/ where available
const SOURCES = [
  { label: "CRM",   iconSrc: "/signal-icons/crm.png",   fallbackColor: "#00A1E0" },
  { label: "ERP",   iconSrc: "/signal-icons/erp.png",   fallbackColor: "#0070AD" },
  { label: "ITSM",  iconSrc: "/signal-icons/itsm.png",  fallbackColor: "#62D84E" },
  { label: "Slack", iconSrc: "/signal-icons/slack.png",  fallbackSrc: "/brand-icons/slack-icon.svg" },
  { label: "Teams", iconSrc: "/signal-icons/teams.png",  fallbackSrc: "/brand-icons/microsoft-teams.svg" },
  { label: "Email", iconSrc: "/signal-icons/email.png",  fallbackColor: "#EA4335" },
  { label: "Docs",  iconSrc: "/signal-icons/docs.png",  fallbackColor: "#4285F4" },
];

// Output pillars — matching banner exactly
const OUTPUTS = [
  { label: "AI Agents",           sub: "Intelligent, autonomous task execution.", color: BLUE       },
  { label: "Unified Search",      sub: "Search all data sources instantly.",       color: "#0891B2"  },
  { label: "Workflow Automation", sub: "Streamline complex processes.",            color: "#7C3AED"  },
  { label: "Safe Write Back",     sub: "Secure execution with full audit trail.",  color: "#059669"  },
];

export function SignalTower() {
  const W = 820, H = 560;
  const coreX = W / 2;
  const coreY = 230;
  const srcY  = 10;
  const outY  = 400;

  const srcXs = SOURCES.map((_, i) =>
    60 + i * ((W - 120) / (SOURCES.length - 1))
  );
  const outXs = OUTPUTS.map((_, i) =>
    40 + i * ((W - 200) / (OUTPUTS.length - 1))
  );

  // Cubic bezier: source chip bottom → core star edge
  function curve(x1: number, y1: number, x2: number, y2: number): string {
    const bend = 0.35;
    const midY = (y1 + y2) * 0.55;
    const cp1x = x1 + (coreX - x1) * bend;
    const cp1y = y1 + (midY - y1) * 0.4;
    const cp2x = x2 + (coreX - x2) * bend;
    const cp2y = midY + (y2 - midY) * 0.5;
    return `M ${x1},${y1} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: 820,
      margin: "0 auto",
      userSelect: "none",
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ signal flow diagram"
      >
        <defs>
          {/* Arrowhead marker pointing down/forward */}
          <marker id="arrowBlue" markerWidth="7" markerHeight="7"
            refX="5" refY="3.5" orient="auto">
            <path d="M0,1 L0,6 L6,3.5 Z" fill={BLUE} opacity="0.7"/>
          </marker>
          {/* Core star glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={BLUE}    stopOpacity="0.55"/>
            <stop offset="60%"  stopColor="#A3F3FF" stopOpacity="0.15"/>
            <stop offset="100%" stopColor={BLUE}    stopOpacity="0"/>
          </radialGradient>
          {/* Glow filter for the star */}
          <filter id="starGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          {/* Glow for animated dots */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* ── CURVED DASHED LINES: sources → core ── */}
        {SOURCES.map((_, i) => (
          <path key={`sl${i}`}
            d={curve(srcXs[i], srcY + 52, coreX, coreY - 36)}
            stroke={BLUE}
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity="0.32"
            markerEnd="url(#arrowBlue)"
          />
        ))}

        {/* ── STRAIGHT LINES: core → outputs (with arrowheads) ── */}
        {OUTPUTS.map((_, i) => (
          <line key={`ol${i}`}
            x1={coreX}          y1={coreY + 36}
            x2={outXs[i] + 72}  y2={outY}
            stroke={BLUE}
            strokeWidth="1.6"
            opacity="0.38"
            markerEnd="url(#arrowBlue)"
          />
        ))}

        {/* ── ANIMATED DOTS along curves: sources → core ── */}
        {SOURCES.map((_, i) => {
          const d = curve(srcXs[i], srcY + 52, coreX, coreY - 36);
          const dur = `${1.8 + i * 0.22}s`;
          const delay = `${i * 0.33}s`;
          return (
            <circle key={`ad${i}`} r="4.5" fill={BLUE}
              filter="url(#dotGlow)">
              <animateMotion dur={dur} begin={delay} repeatCount="indefinite" path={d}/>
              <animate attributeName="opacity"
                values="0;0.9;0.9;0" keyTimes="0;0.06;0.92;1"
                dur={dur} begin={delay} repeatCount="indefinite"/>
            </circle>
          );
        })}

        {/* ── SOURCE CHIPS ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`}>
            {/* Rounded square chip */}
            <rect x={srcXs[i] - 34} y={srcY} width={68} height={46} rx={10}
              fill="#F0F2FF" stroke={BLUE} strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,24,255,0.12))" }}/>
            {/* Icon: SVG <image> tag — renders the PNG/SVG file */}
            <image
              href={s.iconSrc}
              x={srcXs[i] - 13} y={srcY + 6}
              width={26} height={26}
            />
            {/* Label below chip */}
            <text x={srcXs[i]} y={srcY + 62}
              textAnchor="middle" fontSize="10" fontWeight="600"
              fill="#555" fontFamily={F}>{s.label}</text>
          </g>
        ))}

        {/* ── ZUUZ CORE: ambient glow halo ── */}
        <circle cx={coreX} cy={coreY} r={72} fill="url(#coreGlow)">
          <animate attributeName="r" values="68;82;68" dur="4s" repeatCount="indefinite"/>
        </circle>

        {/* ── THE 4-POINTED STAR (bezier, matching ZUUZ brand star) ── */}
        <path filter="url(#starGlow)"
          d={[
            `M ${coreX} ${coreY - 46}`,
            `C ${coreX + 5} ${coreY - 15} ${coreX + 15} ${coreY - 5} ${coreX + 46} ${coreY}`,
            `C ${coreX + 15} ${coreY + 5} ${coreX + 5} ${coreY + 15} ${coreX} ${coreY + 46}`,
            `C ${coreX - 5} ${coreY + 15} ${coreX - 15} ${coreY + 5} ${coreX - 46} ${coreY}`,
            `C ${coreX - 15} ${coreY - 5} ${coreX - 5} ${coreY - 15} ${coreX} ${coreY - 46} Z`,
          ].join(" ")}
          fill={BLUE}>
          <animate attributeName="opacity" values="0.88;1;0.88"
            dur="2.5s" repeatCount="indefinite"/>
        </path>
        {/* Inner star highlight — gives depth */}
        <path
          d={[
            `M ${coreX} ${coreY - 28}`,
            `C ${coreX + 3} ${coreY - 9} ${coreX + 9} ${coreY - 3} ${coreX + 28} ${coreY}`,
            `C ${coreX + 9} ${coreY + 3} ${coreX + 3} ${coreY + 9} ${coreX} ${coreY + 28}`,
            `C ${coreX - 3} ${coreY + 9} ${coreX - 9} ${coreY + 3} ${coreX - 28} ${coreY}`,
            `C ${coreX - 9} ${coreY - 3} ${coreX - 3} ${coreY - 9} ${coreX} ${coreY - 28} Z`,
          ].join(" ")}
          fill="rgba(255,255,255,0.28)"/>

        {/* ── OUTPUT BOXES — white card, left color accent ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outXs[i]} y={outY} width={148} height={80} rx={8}
              fill="white" stroke="#E8E8EE" strokeWidth="1"
              style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.08))" }}/>
            {/* Left color accent bar */}
            <rect x={outXs[i]} y={outY} width={4} height={80} rx={2}
              fill={o.color}/>
            {/* Label */}
            <text x={outXs[i] + 14} y={outY + 22}
              fontSize="11" fontWeight="700" fill={o.color} fontFamily={F}>
              {o.label}
            </text>
            {/* Sub-text (split at ~22 chars) */}
            <text x={outXs[i] + 14} y={outY + 39}
              fontSize="8.5" fill="#666" fontFamily={F}>
              {o.sub.substring(0, 22)}
            </text>
            {o.sub.length > 22 && (
              <text x={outXs[i] + 14} y={outY + 52}
                fontSize="8.5" fill="#666" fontFamily={F}>
                {o.sub.substring(22)}
              </text>
            )}
          </g>
        ))}

        {/* Brand tagline */}
        <text x={W / 2} y={H - 6}
          textAnchor="middle" fontSize="11" fill="#BBBBBB"
          fontFamily={F} fontStyle="italic">
          Where Decisions Actually Happen.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
