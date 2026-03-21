"use client";
import { useEffect, useRef, useState } from "react";
const F = "'Montserrat', sans-serif";
const STATS = [
  { value: 2.4,  suffix: "M+", label: "Emails Processed",         desc: "across enterprise inboxes"       },
  { value: 840,  suffix: "K+", label: "Documents Reviewed",        desc: "contracts, SOWs, invoices"       },
  { value: 320,  suffix: "K+", label: "Meeting Outcomes Captured", desc: "decisions logged automatically"  },
  { value: 1.1,  suffix: "M+", label: "Workflows Executed",        desc: "with policy gates & audit trail" },
  { value: 4.8,  suffix: "M+", label: "Audit Log Entries",         desc: "immutable, timestamped"          },
  { value: 2.4,  suffix: "s",  label: "Avg Processing Time",       desc: "signal to executed action"       },
];
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);
  return count;
}
function StatCell({ stat, started, isLast, col }: {
  stat: typeof STATS[0];
  started: boolean;
  isLast: boolean;
  col: number;
}) {
  const count = useCountUp(stat.value, 2000, started);
  const display = stat.value % 1 !== 0
    ? count.toFixed(1)
    : Math.round(count).toLocaleString();
  return (
    <div style={{
      padding: "44px 32px",
      borderRight: col % 3 !== 2 ? "1px solid rgba(255,255,255,0.10)" : "none",
      borderBottom: !isLast ? "1px solid rgba(255,255,255,0.10)" : "none",
    }}>
      <p style={{
        fontFamily: F,
        fontSize: "clamp(36px,4vw,52px)",
        fontWeight: 800,
        color: "#FFFFFF",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        margin: "0 0 10px 0",
      }}>
        {started
          ? display
          : stat.value % 1 !== 0
            ? stat.value.toFixed(1)
            : stat.value.toLocaleString()
        }{stat.suffix}
      </p>
      <p style={{
        fontFamily: F,
        fontSize: 17,
        fontWeight: 700,
        color: "#FFFFFF",
        margin: "0 0 6px 0",
        lineHeight: 1.3,
      }}>
        {stat.label}
      </p>
      <p style={{
        fontFamily: F,
        fontSize: 13,
        color: "rgba(255,255,255,0.80)",
        margin: 0,
        lineHeight: 1.5,
      }}>
        {stat.desc}
      </p>
    </div>
  );
}
export function StatsBanner() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ background: "#000814", padding: "80px 0", width: "100%" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
      }}>
        {STATS.map((stat, i) => (
          <StatCell
            key={stat.label}
            stat={stat}
            started={started}
            isLast={i >= 3}
            col={i}
          />
        ))}
      </div>
    </section>
  );
}
