"use client";

const SOURCES = [
  { label: "CRM",   color: "#00A1E0", bg: "#E6F6FD" },
  { label: "ERP",   color: "#0070AD", bg: "#E6F2F9" },
  { label: "ITSM",  color: "#62D84E", bg: "#EDF9EA" },
  { label: "Slack", color: "#4A154B", bg: "#F3E8F7" },
  { label: "Teams", color: "#4B53BC", bg: "#ECEDF9" },
  { label: "Email", color: "#EA4335", bg: "#FDE9E8" },
  { label: "Docs",  color: "#4285F4", bg: "#EAF0FE" },
];

const OUTPUTS = [
  { label: "AI Agents",       sub: "Role-specific copilots",  color: "#2563EB" },
  { label: "Unified Search",  sub: "Evidence-grounded answers",color: "#0891B2" },
  { label: "Workflows",       sub: "Policy-enforced execution",color: "#7C3AED" },
  { label: "Safe Write Back", sub: "Verified, audit-logged",  color: "#059669" },
];

const W = 640;
const H = 480;
const coreX = W / 2;
const coreY = 210;
const sourceY = 44;
const outputY = 372;

const srcXs = SOURCES.map((_, i) => 52 + i * ((W - 104) / (SOURCES.length - 1)));
const outW = 138;
const outXs = [20, 175, 330, 484];

export function SignalTower() {
  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", position: "relative" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ signal tower: data sources to AI core to outputs"
      >
        <defs>
          <radialGradient id="stCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.45" />
            <stop offset="55%"  stopColor="#2563EB" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="stStarGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="stChipShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* ── Dashed lines: sources → core ── */}
        {SOURCES.map((s, i) => (
          <line
            key={`sl${i}`}
            x1={srcXs[i]} y1={sourceY + 32}
            x2={coreX}    y2={coreY - 36}
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="5 5"
            opacity="0.2"
          />
        ))}

        {/* ── Dashed lines: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <line
            key={`ol${i}`}
            x1={coreX}           y1={coreY + 36}
            x2={outXs[i] + outW / 2} y2={outputY}
            stroke={o.color}
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.2"
          />
        ))}

        {/* ── Animated dots: sources → core ── */}
        {SOURCES.map((s, i) => (
          <circle key={`sd${i}`} r="4.5" fill={s.color} opacity="0.9">
            <animateMotion
              dur={`${1.8 + i * 0.22}s`}
              begin={`${i * 0.32}s`}
              repeatCount="indefinite"
              path={`M ${srcXs[i]},${sourceY + 32} L ${coreX},${coreY - 36}`}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${1.8 + i * 0.22}s`}
              begin={`${i * 0.32}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ── Animated dots: core → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <circle key={`od${i}`} r="4.5" fill={o.color} opacity="0.9">
            <animateMotion
              dur={`${2.0 + i * 0.28}s`}
              begin={`${0.6 + i * 0.42}s`}
              repeatCount="indefinite"
              path={`M ${coreX},${coreY + 36} L ${outXs[i] + outW / 2},${outputY}`}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${2.0 + i * 0.28}s`}
              begin={`${0.6 + i * 0.42}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ── Source chips ── */}
        {SOURCES.map((s, i) => (
          <g key={`sc${i}`} filter="url(#stChipShadow)">
            <rect
              x={srcXs[i] - 26} y={sourceY - 20}
              width={52} height={40} rx={8}
              fill={s.bg} stroke={s.color}
              strokeWidth="0.75" opacity="0.95"
            />
            <circle cx={srcXs[i]} cy={sourceY - 6} r={7} fill={s.color} />
            <text
              x={srcXs[i]} y={sourceY + 13}
              textAnchor="middle"
              fontSize="8.5" fontWeight="600"
              fill="#344054"
              fontFamily="Inter, sans-serif"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* ── Core: outer glow pulse ── */}
        <circle cx={coreX} cy={coreY} r={68} fill="url(#stCoreGlow)">
          <animate attributeName="r" values="62;78;62" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ── Core: secondary pulse ring ── */}
        <circle cx={coreX} cy={coreY} r={50} fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.25">
          <animate attributeName="r"       values="46;56;46" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.06;0.25" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ── Core: 4-pointed star ── */}
        <g filter="url(#stStarGlow)">
          <path
            d={`M ${coreX} ${coreY - 34}
                C ${coreX + 6} ${coreY - 11} ${coreX + 11} ${coreY - 6} ${coreX + 34} ${coreY}
                C ${coreX + 11} ${coreY + 6} ${coreX + 6} ${coreY + 11} ${coreX} ${coreY + 34}
                C ${coreX - 6} ${coreY + 11} ${coreX - 11} ${coreY + 6} ${coreX - 34} ${coreY}
                C ${coreX - 11} ${coreY - 6} ${coreX - 6} ${coreY - 11} ${coreX} ${coreY - 34} Z`}
            fill="#2563EB"
          >
            <animate attributeName="opacity" values="0.88;1;0.88" dur="2.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Core labels */}
        <text
          x={coreX} y={coreY - 5}
          textAnchor="middle"
          fontSize="11" fontWeight="700"
          fill="white"
          fontFamily="Inter, sans-serif"
          letterSpacing="-0.03em"
        >
          ZUUZ
        </text>
        <text
          x={coreX} y={coreY + 9}
          textAnchor="middle"
          fontSize="7"
          fill="rgba(255,255,255,0.6)"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.10em"
        >
          AI CORE
        </text>

        {/* ── Output boxes ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`oc${i}`}>
            {/* Drop shadow */}
            <rect
              x={outXs[i]} y={outputY}
              width={outW} height={70} rx={8}
              fill="rgba(0,0,0,0.04)"
              transform="translate(0,2)"
            />
            <rect
              x={outXs[i]} y={outputY}
              width={outW} height={70} rx={8}
              fill="white"
              stroke={o.color}
              strokeWidth="1.25"
            />
            {/* Colored left bar */}
            <rect
              x={outXs[i]} y={outputY}
              width={3.5} height={70} rx={1.75}
              fill={o.color}
            />
            <text
              x={outXs[i] + 13} y={outputY + 22}
              fontSize="9.5" fontWeight="700"
              fill={o.color}
              fontFamily="Inter, sans-serif"
            >
              {o.label}
            </text>
            <text
              x={outXs[i] + 13} y={outputY + 37}
              fontSize="8" fill="#667085"
              fontFamily="Inter, sans-serif"
            >
              {o.sub.length > 20 ? o.sub.substring(0, 20) : o.sub}
            </text>
            {o.sub.length > 20 && (
              <text
                x={outXs[i] + 13} y={outputY + 50}
                fontSize="8" fill="#667085"
                fontFamily="Inter, sans-serif"
              >
                {o.sub.substring(20)}
              </text>
            )}
          </g>
        ))}

        {/* ── Bottom tagline ── */}
        <text
          x={W / 2} y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#98A2B3"
          fontFamily="Inter, sans-serif"
          fontStyle="italic"
        >
          Where decisions actually happen.
        </text>
      </svg>
    </div>
  );
}

export default SignalTower;
