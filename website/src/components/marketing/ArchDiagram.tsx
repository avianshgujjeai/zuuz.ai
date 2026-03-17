"use client";

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
  { label: "Email Agent",    color: "#EA4335" },
  { label: "Doc Agent",      color: "#4285F4" },
  { label: "Meeting Agent",  color: "#0891B2" },
  { label: "Decision Made",  color: BLUE      },
  { label: "Safe Execute",   color: "#059669" },
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

export function ArchDiagram() {
  const W = 900;
  const H = 520;

  // Tier Y positions
  const t1Y = 30;   // source boxes top
  const t2Y = 220;  // engine box top
  const t3Y = 390;  // output boxes top

  const boxH1 = 64;
  const boxH2 = 110;
  const boxH3 = 80;

  // Source box layout: 5 boxes, 140px wide, 16px gap → total 5*140+4*16 = 764; centered in 900
  const srcW = 140;
  const srcGap = 16;
  const srcTotal = SOURCES.length * srcW + (SOURCES.length - 1) * srcGap;
  const srcStartX = (W - srcTotal) / 2; // 68
  const srcXs = SOURCES.map((_, i) => srcStartX + i * (srcW + srcGap));
  const srcCenter = (i: number) => srcXs[i] + srcW / 2;

  // Engine box: spans 700px, centered
  const engW = 700;
  const engX = (W - engW) / 2; // 100
  const engMidY = t2Y + boxH2 / 2;

  // Output box layout: 5 boxes, 148px wide, 14px gap → total 5*148+4*14 = 796; centered
  const outW = 148;
  const outGap = 13;
  const outTotal = OUTPUTS.length * outW + (OUTPUTS.length - 1) * outGap;
  const outStartX = (W - outTotal) / 2; // 52
  const outXs = OUTPUTS.map((_, i) => outStartX + i * (outW + outGap));
  const outCenter = (i: number) => outXs[i] + outW / 2;

  const line = (x1: number, y1: number, x2: number, y2: number) =>
    `M ${x1},${y1} L ${x2},${y2}`;

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", userSelect: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", overflow: "visible" }}
        aria-label="ZUUZ architecture diagram"
      >
        <defs>
          {SOURCES.map((s, i) => (
            <marker key={`ma${i}`} id={`arr-s${i}`} markerWidth="6" markerHeight="6"
              refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={s.color} opacity="0.5" />
            </marker>
          ))}
          {OUTPUTS.map((o, i) => (
            <marker key={`mb${i}`} id={`arr-o${i}`} markerWidth="6" markerHeight="6"
              refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={o.color} opacity="0.5" />
            </marker>
          ))}
        </defs>

        {/* ── TIER 1 CONNECTOR LINES: sources → engine ── */}
        {SOURCES.map((s, i) => (
          <line key={`sl${i}`}
            x1={srcCenter(i)} y1={t1Y + boxH1}
            x2={srcCenter(i)} y2={t2Y}
            stroke={s.color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"
            markerEnd={`url(#arr-s${i})`}
          />
        ))}

        {/* ── TIER 2 CONNECTOR LINES: engine → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <line key={`ol${i}`}
            x1={outCenter(i)} y1={t2Y + boxH2}
            x2={outCenter(i)} y2={t3Y}
            stroke={o.color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"
            markerEnd={`url(#arr-o${i})`}
          />
        ))}

        {/* ── ANIMATED DOTS: sources → engine ── */}
        {SOURCES.map((s, i) => (
          <AnimDot
            key={`ad${i}`}
            path={line(srcCenter(i), t1Y + boxH1, srcCenter(i), t2Y)}
            dur={`${1.6 + i * 0.18}s`}
            delay={`${i * 0.32}s`}
            color={s.color}
          />
        ))}

        {/* ── ANIMATED DOTS: engine → outputs ── */}
        {OUTPUTS.map((o, i) => (
          <AnimDot
            key={`od${i}`}
            path={line(outCenter(i), t2Y + boxH2, outCenter(i), t3Y)}
            dur={`${1.5 + i * 0.2}s`}
            delay={`${0.6 + i * 0.28}s`}
            color={o.color}
          />
        ))}

        {/* ── TIER 1: SOURCE BOXES ── */}
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

        {/* ── TIER 2: ZUUZ ENGINE BOX ── */}
        <rect x={engX} y={t2Y} width={engW} height={boxH2} rx={14}
          fill="#000814"
          style={{ filter: "drop-shadow(0 4px 20px rgba(0,24,255,0.18))" }} />

        {/* Engine glow border */}
        <rect x={engX} y={t2Y} width={engW} height={boxH2} rx={14}
          fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.6" />

        {/* ZUUZ Engine label */}
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

        {/* ── TIER 3: OUTPUT BOXES ── */}
        {OUTPUTS.map((o, i) => (
          <g key={`ob${i}`}>
            <rect x={outXs[i]} y={t3Y} width={outW} height={boxH3} rx={10}
              fill="white" stroke={o.color} strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.08))" }} />
            {/* Left color accent */}
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
    </div>
  );
}

export default ArchDiagram;
