"use client";

const sources = [
  { label: "Email", color: "#0078D4", x: 30  },
  { label: "CRM",   color: "#00A1E0", x: 130 },
  { label: "ERP",   color: "#F80000", x: 230 },
  { label: "Docs",  color: "#0052CC", x: 330 },
  { label: "ITSM",  color: "#81B5A1", x: 430 },
];

const outputs = [
  { label: "AI Agents",       color: "#2563EB", x: 15  },
  { label: "Unified Search",  color: "#3B82F6", x: 140 },
  { label: "Workflows",       color: "#7C3AED", x: 285 },
  { label: "Safe Write-back", color: "#10B981", x: 400 },
];

const cx = 265, cy = 158;

export function FlowDiagram() {
  return (
    <div style={{ width: "100%", maxWidth: 540, margin: "0 auto" }}>
      <svg
        viewBox="0 0 540 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ data flow: sources to core to outputs"
      >
        <defs>
          <radialGradient id="coreGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="blueGlowFilter" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Connector lines: source → core ── */}
        {sources.map((s, i) => (
          <line
            key={`sl${i}`}
            x1={s.x + 35} y1={56}
            x2={cx}       y2={cy - 38}
            stroke={`${s.color}28`}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
        ))}

        {/* ── Connector lines: core → output ── */}
        {outputs.map((o, i) => (
          <line
            key={`ol${i}`}
            x1={cx}       y1={cy + 38}
            x2={o.x + 57} y2={263}
            stroke={`${o.color}28`}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
        ))}

        {/* ── Animated dots: source → core ── */}
        {sources.map((s, i) => (
          <circle key={`sd${i}`} r="4.5" fill={s.color} opacity="0.9" filter="url(#blueGlowFilter)">
            <animateMotion
              dur={`${2.0 + i * 0.3}s`}
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
              path={`M ${s.x + 35},56 L ${cx},${cy - 38}`}
            />
          </circle>
        ))}

        {/* ── Animated dots: core → output ── */}
        {outputs.map((o, i) => (
          <circle key={`od${i}`} r="4.5" fill={o.color} opacity="0.9">
            <animateMotion
              dur={`${2.2 + i * 0.3}s`}
              begin={`${0.6 + i * 0.5}s`}
              repeatCount="indefinite"
              path={`M ${cx},${cy + 38} L ${o.x + 57},263`}
            />
          </circle>
        ))}

        {/* ── Source chips ── */}
        {sources.map((s, i) => (
          <g key={`sc${i}`}>
            <rect x={s.x} y={28} width={70} height={28} rx={8} fill="white" stroke="#E2E8F0" strokeWidth="1" />
            <rect x={s.x} y={28} width={4}  height={28} rx={2} fill={s.color} />
            <text
              x={s.x + 14} y={46}
              fontSize="10.5" fontWeight="600" fill="#1E293B"
              fontFamily="Inter, sans-serif"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* ── Core node ── */}
        {/* Second larger pulse ring (slow) */}
        <circle cx={cx} cy={cy} r={65} fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.1">
          <animate attributeName="r"       values="65;78;65" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.02;0.1" dur="5s" repeatCount="indefinite" />
        </circle>
        {/* Outer pulse */}
        <circle cx={cx} cy={cy} r={52} fill="url(#coreGlowGrad)">
          <animate attributeName="r"       values="48;58;48" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.08;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Main circle */}
        <circle
          cx={cx} cy={cy} r={40}
          fill="#0A1628"
          stroke="#2563EB"
          strokeWidth="1.5"
          filter="url(#blueGlowFilter)"
        />
        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={34} fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.35" />
        {/* Label */}
        <text
          x={cx} y={cy - 4}
          textAnchor="middle"
          fontSize="15" fontWeight="900" fill="white"
          fontFamily="Inter, sans-serif"
        >
          ZUUZ
        </text>
        <text
          x={cx} y={cy + 12}
          textAnchor="middle"
          fontSize="7" fill="#60A5FA"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.12em"
        >
          EXECUTION
        </text>

        {/* ── Output chips ── */}
        {outputs.map((o, i) => (
          <g key={`oc${i}`}>
            <rect x={o.x} y={249} width={115} height={28} rx={8} fill="white" stroke={o.color} strokeWidth="1" />
            <text
              x={o.x + 12} y={267}
              fontSize="9.5" fontWeight="700" fill={o.color}
              fontFamily="Inter, sans-serif"
            >
              {o.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default FlowDiagram;
