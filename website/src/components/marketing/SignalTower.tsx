"use client";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

const SOURCES = [
  { label: "CRM",   iconSrc: "/signal-icons/crm.png"  },
  { label: "ERP",   iconSrc: "/signal-icons/erp.png"  },
  { label: "ITSM",  iconSrc: "/signal-icons/itsm.png" },
  { label: "Slack", iconSrc: "/signal-icons/slack.png" },
  { label: "Teams", iconSrc: "/signal-icons/teams.png" },
  { label: "Email", iconSrc: "/signal-icons/email.png" },
  { label: "Docs",  iconSrc: "/signal-icons/docs.png"  },
];

const OUTPUTS = [
  { label: "AI Agents",           sub: "Intelligent task execution",  color: BLUE      },
  { label: "Unified Search",      sub: "Search all sources instantly", color: "#0891B2" },
  { label: "Workflow Automation", sub: "Streamline processes",         color: "#7C3AED" },
  { label: "Safe Write Back",     sub: "Secure with full audit trail", color: "#059669" },
];

function AnimDot({ path, dur, delay, color }: { path: string; dur: string; delay: string; color: string }) {
  return (
    <circle r="4" fill={color} opacity="0">
      <animateMotion dur={dur} begin={delay} repeatCount="indefinite" path={path} />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1"
        dur={dur} begin={delay} repeatCount="indefinite" />
    </circle>
  );
}

export function SignalTower() {
  const W = 820, H = 560;
  const coreX = W / 2;
  const coreY = 240;
  const srcY  = 10;
  const outY  = 400;

  // Horizontal bus Y positions
  const trunkY  = srcY + 90;   // top bus — source drops meet here
  const branchY = outY - 70;   // bottom bus — output drops start here

  const srcXs = SOURCES.map((_, i) => 60 + i * ((W - 120) / (SOURCES.length - 1)));
  const outXs = OUTPUTS.map((_, i) => 40 + i * ((W - 200) / (OUTPUTS.length - 1)));
  const outCX = (i: number) => outXs[i] + 74;  // center X of output box

  // L-shaped path: source chip bottom → vertical drop to trunkY → horizontal to coreX → vertical to core top
  function srcToCorePath(sx: number): string {
    return `M ${sx},${srcY + 46} L ${sx},${trunkY} L ${coreX},${trunkY} L ${coreX},${coreY - 46}`;
  }

  // L-shaped path: core bottom → vertical down to branchY → horizontal to output center → vertical down to output
  function coreToOutPath(ox: number): string {
    return `M ${coreX},${coreY + 46} L ${coreX},${branchY} L ${outCX(ox)},${branchY} L ${outCX(ox)},${outY}`;
  }

  return (
    <div style={{ width: "100%", maxWidth: 820, margin: "0 auto", userSelect: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ signal flow diagram"
      >
        <defs>
          <marker id="arrowBlue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,1 L0,6 L6,3.5 Z" fill={BLUE} opacity="0.7" />
          </marker>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={BLUE}    stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#A3F3FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor={BLUE}    stopOpacity="0" />
          </radialGradient>
          <filter id="starGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── TOP HORIZONTAL BUS ── */}
        <line
          x1={srcXs[0]} y1={trunkY}
          x2={srcXs[srcXs.length - 1]} y2={trunkY}
          stroke={BLUE} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35"
        />

        {/* ── VERTICAL DROPS: source chips → top bus ── */}
        {SOURCES.map((_, i) => (
          <line key={`sv${i}`}
            x1={srcXs[i]} y1={srcY + 46}
            x2={srcXs[i]} y2={trunkY}
            stroke={BLUE} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.28"
          />
        ))}

        {/* ── CENTER TRUNK: top bus → core ── */}
        <line
          x1={coreX} y1={trunkY}
          x2={coreX} y2={coreY - 46}
          stroke={BLUE} strokeWidth="2" opacity="0.55"
          markerEnd="url(#arrowBlue)"
        />

        {/* ── CENTER TRUNK: core → bottom bus ── */}
        <line
          x1={coreX} y1={coreY + 46}
          x2={coreX} y2={branchY}
          stroke={BLUE} strokeWidth="2" opacity="0.55"
        />

        {/* ── BOTTOM HORIZONTAL BUS ── */}
        <line
          x1={outCX(0)} y1={branchY}
          x2={outCX(OUTPUTS.length - 1)} y2={branchY}
          stroke={BLUE} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35"
        />

        {/* ── VERTICAL DROPS: bottom bus → output boxes ── */}
        {OUTPUTS.map((_, i) => (
          <line key={`ov${i}`}
            x1={outCX(i)} y1={branchY}
            x2={outCX(i)} y2={outY}
            stroke={BLUE} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.28"
            markerEnd="url(#arrowBlue)"
          />
        ))}

        {/* ── ANIMATED DOTS: sources → core (L-shaped) ── */}
        {SOURCES.map((_, i) => (
          <AnimDot
            key={`ad${i}`}
            path={srcToCorePath(srcXs[i])}
            dur={`${1.8 + i * 0.22}s`}
            delay={`${i * 0.31}s`}
            color={BLUE}
          />
        ))}

        {/* ── ANIMATED DOTS: core → outputs (L-shaped) ── */}
        {OUTPUTS.map((o, i) => (
          <AnimDot
            key={`od${i}`}
            path={coreToOutPath(i)}
            dur={`${1.6 + i * 0.28}s`}
            delay={`${0.9 + i * 0.25}s`}
            color={o.color}
          />
        ))}

        {/* ── SOURCE CHIPS ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`}>
            <rect x={srcXs[i] - 34} y={srcY} width={68} height={46} rx={10}
              fill="#F0F2FF" stroke={BLUE} strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,24,255,0.12))" }} />
            <image href={s.iconSrc} x={srcXs[i] - 13} y={srcY + 6} width={26} height={26} />
            <text x={srcXs[i]} y={srcY + 62}
              textAnchor="middle" fontSize="10" fontWeight="600"
              fill="#555" fontFamily={F}>{s.label}</text>
          </g>
        ))}

        {/* ── ZUUZ CORE: ambient glow halo ── */}
        <circle cx={coreX} cy={coreY} r={72} fill="url(#coreGlow)">
          <animate attributeName="r" values="68;82;68" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ── THE 4-POINTED STAR ── */}
        <path filter="url(#starGlow)"
          d={[
            `M ${coreX} ${coreY - 46}`,
            `C ${coreX + 5} ${coreY - 15} ${coreX + 15} ${coreY - 5} ${coreX + 46} ${coreY}`,
            `C ${coreX + 15} ${coreY + 5} ${coreX + 5} ${coreY + 15} ${coreX} ${coreY + 46}`,
            `C ${coreX - 5} ${coreY + 15} ${coreX - 15} ${coreY + 5} ${coreX - 46} ${coreY}`,
            `C ${coreX - 15} ${coreY - 5} ${coreX - 5} ${coreY - 15} ${coreX} ${coreY - 46} Z`,
          ].join(" ")}
          fill={BLUE}>
          <animate attributeName="opacity" values="0.88;1;0.88" dur="2.5s" repeatCount="indefinite" />
        </path>
        {/* Inner star highlight — depth */}
        <path
          d={[
            `M ${coreX} ${coreY - 28}`,
            `C ${coreX + 3} ${coreY - 9} ${coreX + 9} ${coreY - 3} ${coreX + 28} ${coreY}`,
            `C ${coreX + 9} ${coreY + 3} ${coreX + 3} ${coreY + 9} ${coreX} ${coreY + 28}`,
            `C ${coreX - 3} ${coreY + 9} ${coreX - 9} ${coreY + 3} ${coreX - 28} ${coreY}`,
            `C ${coreX - 9} ${coreY - 3} ${coreX - 3} ${coreY - 9} ${coreX} ${coreY - 28} Z`,
          ].join(" ")}
          fill="rgba(255,255,255,0.28)" />

        {/* ── OUTPUT BOXES ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outXs[i]} y={outY} width={148} height={80} rx={8}
              fill="white" stroke="#E8E8EE" strokeWidth="1"
              style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.08))" }} />
            <rect x={outXs[i]} y={outY} width={4} height={80} rx={2} fill={o.color} />
            <text x={outXs[i] + 14} y={outY + 22}
              fontSize="11" fontWeight="700" fill={o.color} fontFamily={F}>
              {o.label}
            </text>
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
