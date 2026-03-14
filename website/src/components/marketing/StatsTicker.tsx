"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Count-up Hook ──────────────────────────────────────── */
function useCountUp(target: number, duration: number = 2200, start: boolean = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);
  return count;
}

function formatNum(count: number, target: number): string {
  if (target >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M+`;
  if (target >= 1_000) return count.toLocaleString() + "+";
  return String(count);
}

/* ─── Stat Data ──────────────────────────────────────────── */
interface StatDef {
  target: number;
  label: string;
  sublabel: string;
  display?: string;
  delay: number;
}

const STATS: StatDef[] = [
  { target: 2_400_000, label: "emails processed",          sublabel: "across enterprise inboxes",        delay: 0   },
  { target: 840_000,   label: "documents reviewed",        sublabel: "contracts, SOWs, invoices",        delay: 150 },
  { target: 320_000,   label: "meeting outcomes captured", sublabel: "decisions logged automatically",   delay: 300 },
  { target: 1_100_000, label: "workflows executed",        sublabel: "with policy gates & audit trail",  delay: 450 },
  { target: 4_800_000, label: "audit log entries",         sublabel: "immutable, timestamped",           delay: 600 },
  { target: 0,         label: "avg processing time",       sublabel: "signal to executed action",        display: "2.4s", delay: 750 },
];

/* ─── Single Stat Card ───────────────────────────────────── */
function StatItem({ stat, globalStart }: { stat: StatDef; globalStart: boolean }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!globalStart) return;
    const t = setTimeout(() => setStarted(true), stat.delay);
    return () => clearTimeout(t);
  }, [globalStart, stat.delay]);

  const count = useCountUp(stat.target, 2200, started && !stat.display);
  const displayValue = stat.display
    ? stat.display
    : started
    ? formatNum(count, stat.target)
    : formatNum(0, stat.target);

  return (
    <div
      style={{
        padding: "36px 40px",
        textAlign: "center",
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {displayValue}
      </p>
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.01em",
          marginBottom: 4,
          fontFamily: "var(--font-body)",
        }}
      >
        {stat.label}
      </p>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
        {stat.sublabel}
      </p>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export function StatsTicker() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#050D1F", position: "relative" }}>
      {/* Animated shimmer top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #2563EB 30%, #7C3AED 55%, #10B981 80%, transparent)",
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
        }}
      />
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "56px 0",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="stats-ticker-grid">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} globalStart={started} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .stats-ticker-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .stats-ticker-grid > div {
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .stats-ticker-grid > div:nth-child(3n) {
          border-right: none;
        }
        .stats-ticker-grid > div:nth-child(n+4) {
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        @media (max-width: 767px) {
          .stats-ticker-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-ticker-grid > div { border-right: 1px solid rgba(255,255,255,0.07); }
          .stats-ticker-grid > div:nth-child(2n) { border-right: none; }
          .stats-ticker-grid > div:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.07); }
        }
        @media (max-width: 480px) {
          .stats-ticker-grid { grid-template-columns: 1fr; }
          .stats-ticker-grid > div { border-right: none !important; }
          .stats-ticker-grid > div + div { border-top: 1px solid rgba(255,255,255,0.07); }
        }
      `}</style>
    </section>
  );
}
