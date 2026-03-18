"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Count-up hook ──────────────────────────────────────── */
function useCountUp(end: number, duration = 2200, active = false): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || end === 0) return;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(Math.floor(ease * end));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setVal(end);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, end, duration]);
  return val;
}

function fmt(n: number, suffix = ""): string {
  if (n >= 1_000_000) {
    const m = (n / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return m + "M" + suffix;
  }
  if (n >= 1_000) return n.toLocaleString() + suffix;
  return String(n) + suffix;
}

/* ─── Data ───────────────────────────────────────────────── */
interface StatDef {
  end: number;
  suffix?: string;
  fixed?: string;
  label: string;
  sub: string;
}

const STATS: StatDef[] = [
  { end: 2_400_000, suffix: "+", label: "Emails Processed",          sub: "across enterprise inboxes" },
  { end: 840_000,   suffix: "+", label: "Documents Reviewed",         sub: "contracts, SOWs, invoices" },
  { end: 320_000,   suffix: "+", label: "Meeting Outcomes Captured",  sub: "decisions logged automatically" },
  { end: 1_100_000, suffix: "+", label: "Workflows Executed",         sub: "with policy gates & audit trail" },
  { end: 4_800_000, suffix: "+", label: "Audit Log Entries",          sub: "immutable, timestamped" },
  { end: 0, fixed: "2.4s",       label: "Avg Processing Time",        sub: "signal to executed action" },
];

/* ─── Sub-component to keep hooks out of .map() ─────────── */
function StatItem({
  stat,
  active,
  index,
}: {
  stat: StatDef;
  active: boolean;
  index: number;
}) {
  const count = useCountUp(stat.end, 2200, active);
  const display = stat.fixed ?? fmt(count, stat.suffix);
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <div
      style={{
        padding: "28px 32px",
        borderRight: col !== 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
        borderBottom: row === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(12px)",
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
      }}
    >
      <p
        style={{
          fontSize: "clamp(34px, 4vw, 54px)",
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {display}
      </p>
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "Montserrat, sans-serif",
          marginBottom: 3,
        }}
      >
        {stat.label}
      </p>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", fontFamily: "Montserrat, sans-serif" }}>
        {stat.sub}
      </p>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#0C111D",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer gradient top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #0018FF 35%, #7C3AED 60%, #059669 85%, transparent 100%)",
          opacity: 0.65,
        }}
      />
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "56px 0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
            className="stats-banner-grid"
          >
            {STATS.map((s, i) => (
              <StatItem key={s.label} stat={s} active={active} index={i} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .stats-banner-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 479px) {
          .stats-banner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default StatsBanner;
