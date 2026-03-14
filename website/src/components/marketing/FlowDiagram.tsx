"use client";

const SOURCES = [
  { label: "Email",  color: "#0078D4", x: 30  },
  { label: "CRM",    color: "#00A1E0", x: 130 },
  { label: "ERP",    color: "#C74634", x: 230 },
  { label: "Docs",   color: "#0052CC", x: 330 },
  { label: "ITSM",   color: "#62D84E", x: 430 },
];

const OUTPUTS = [
  { label: "AI Agents",      color: "#2457FF", x: 20  },
  { label: "Unified Search", color: "#3B82F6", x: 145 },
  { label: "Workflows",      color: "#7c3aed", x: 290 },
  { label: "Safe Write-back",color: "#10B981", x: 400 },
];

const CORE_X = 270;
const CORE_Y = 160;
const SOURCE_Y = 30;
const OUTPUT_Y = 255;

export function FlowDiagram() {
  return (
    <div style={{ width: "100%", maxWidth: 560 }}>
      <svg
        viewBox="0 0 540 320"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="ZUUZ data flow diagram"
      >
        {/* ── Connector lines: sources → core ── */}
        {SOURCES.map((src, i) => {
          const sx = src.x + 34;
          const sy = SOURCE_Y + 28;
          return (
            <line
              key={`src-line-${i}`}
              x1={sx} y1={sy}
              x2={CORE_X} y2={CORE_Y - 50}
              stroke="rgba(37,99,235,0.2)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* ── Connector lines: core → outputs ── */}
        {OUTPUTS.map((out, i) => {
          const ox = out.x + 55;
          const oy = OUTPUT_Y;
          return (
            <line
              key={`out-line-${i}`}
              x1={CORE_X} y1={CORE_Y + 50}
              x2={ox} y2={oy}
              stroke="rgba(16,185,129,0.2)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* ── Source chips ── */}
        {SOURCES.map((src, i) => (
          <g key={`src-${i}`}>
            <rect
              x={src.x} y={SOURCE_Y}
              width={68} height={28} rx={8}
              fill="#fff" stroke="#DCE3F1"
            />
            <rect
              x={src.x} y={SOURCE_Y}
              width={4} height={28} rx={4}
              fill={src.color}
            />
            <text
              x={src.x + 12} y={SOURCE_Y + 18}
              fontSize={10.5} fontWeight={600}
              fill="#0B1324"
              fontFamily="Inter, sans-serif"
            >
              {src.label}
            </text>
          </g>
        ))}

        {/* ── ZUUZ Core node ── */}
        {/* Outer pulse ring */}
        <circle cx={CORE_X} cy={CORE_Y} r={50} fill="none" stroke="#2457FF" strokeWidth={1} opacity={0.2}>
          <animate attributeName="r" values="50;58;50" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Middle ring */}
        <circle cx={CORE_X} cy={CORE_Y} r={44} fill="#0F1B3D" stroke="#2457FF" strokeWidth={1.5} />
        {/* Inner */}
        <circle cx={CORE_X} cy={CORE_Y} r={34} fill="#0F1B3D" />
        {/* ZUUZ text */}
        <text
          x={CORE_X} y={CORE_Y + 5}
          fontSize={14} fontWeight={800}
          fill="#fff"
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
        >
          ZUUZ
        </text>
        <text
          x={CORE_X} y={CORE_Y + 18}
          fontSize={7.5}
          fill="#60A5FA"
          textAnchor="middle"
          letterSpacing="0.1em"
          fontFamily="Inter, sans-serif"
        >
          EXECUTION
        </text>

        {/* ── Output chips ── */}
        {OUTPUTS.map((out, i) => (
          <g key={`out-${i}`}>
            <rect
              x={out.x} y={OUTPUT_Y}
              width={110} height={28} rx={8}
              fill={out.color + "18"}
              stroke={out.color + "40"}
            />
            <text
              x={out.x + 10} y={OUTPUT_Y + 18}
              fontSize={10} fontWeight={700}
              fill={out.color}
              fontFamily="Inter, sans-serif"
            >
              {out.label}
            </text>
          </g>
        ))}

        {/* ── Animated dots: sources → core ── */}
        {SOURCES.map((src, i) => {
          const sx = src.x + 34;
          const sy = SOURCE_Y + 28;
          return (
            <circle key={`dot-src-${i}`} r={4.5} fill="#2457FF" opacity={0.85}>
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M ${sx} ${sy} L ${CORE_X} ${CORE_Y - 50}`}
              />
            </circle>
          );
        })}

        {/* ── Animated dots: core → outputs ── */}
        {OUTPUTS.map((out, i) => {
          const ox = out.x + 55;
          const oy = OUTPUT_Y;
          return (
            <circle key={`dot-out-${i}`} r={4.5} fill="#10B981" opacity={0.85}>
              <animateMotion
                dur="2.6s"
                repeatCount="indefinite"
                begin={`${0.3 + i * 0.5}s`}
                path={`M ${CORE_X} ${CORE_Y + 50} L ${ox} ${oy}`}
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

export default FlowDiagram;
