"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 1800, start: boolean = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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

interface Stat {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  static?: string; // if set, skip count-up
}

interface CountUpBannerProps {
  stats: Stat[];
  bg?: string;
}

function StatCell({ stat, start, delay }: { stat: Stat; start: boolean; delay: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  const count = useCountUp(stat.target, 1800, active && !stat.static);
  const displayNum = stat.static
    ? stat.static
    : active
    ? `${stat.prefix ?? ""}${count.toLocaleString()}${stat.suffix}`
    : `${stat.prefix ?? ""}0${stat.suffix}`;

  return (
    <div
      style={{
        padding: "40px 24px",
        textAlign: "center",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 4vw, 56px)",
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {displayNum}
      </p>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "var(--font-body)",
          marginBottom: stat.sublabel ? 4 : 0,
        }}
      >
        {stat.label}
      </p>
      {stat.sublabel && (
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
          {stat.sublabel}
        </p>
      )}
    </div>
  );
}

export function CountUpBanner({ stats, bg = "#050D1F" }: CountUpBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: bg }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <div className="count-up-banner-grid">
          {stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} start={started} delay={i * 100} />
          ))}
        </div>
      </div>
      <style>{`
        .count-up-banner-grid {
          display: grid;
          grid-template-columns: repeat(${Math.min(stats.length, 4)}, 1fr);
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .count-up-banner-grid > div + div {
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 767px) {
          .count-up-banner-grid { grid-template-columns: repeat(2, 1fr); }
          .count-up-banner-grid > div:nth-child(2n+1) { border-left: none !important; }
          .count-up-banner-grid > div:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.06); }
        }
        @media (max-width: 480px) {
          .count-up-banner-grid { grid-template-columns: 1fr; }
          .count-up-banner-grid > div { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.06); }
          .count-up-banner-grid > div:first-child { border-top: none; }
        }
      `}</style>
    </div>
  );
}
