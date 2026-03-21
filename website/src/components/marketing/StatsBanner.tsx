"use client";
import { useEffect, useRef, useState } from "react";
const F = "'Montserrat', sans-serif";
const STATS = [
  { end: 2.4,  dec: 1, suffix: "M+", label: "Emails Processed",         desc: "across enterprise inboxes"       },
  { end: 840,  dec: 0, suffix: "K+", label: "Documents Reviewed",        desc: "contracts, SOWs, invoices"       },
  { end: 320,  dec: 0, suffix: "K+", label: "Meeting Outcomes Captured", desc: "decisions logged automatically"  },
  { end: 1.1,  dec: 1, suffix: "M+", label: "Workflows Executed",        desc: "with policy gates & audit trail" },
  { end: 4.8,  dec: 1, suffix: "M+", label: "Audit Log Entries",         desc: "immutable, timestamped"          },
  { end: 2.4,  dec: 1, suffix: "s",  label: "Avg Processing Time",       desc: "signal to executed action"       },
];
export function StatsBanner() {
  const ref = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(STATS.map(s => s.end));
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setCounts(STATS.map(() => 0));
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          io.disconnect();
          const dur = 2400;
          const startTs = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTs;
            const t = Math.min(elapsed / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCounts(STATS.map(s => s.end * ease));
            if (t < 1) requestAnimationFrame(tick);
            else setCounts(STATS.map(s => s.end));
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className="stats-banner"
      style={{ background: "#000814", padding: "80px 0", width: "100%" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "44px 32px",
              borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.10)" : "none",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none",
            }}
          >
            <p
              suppressHydrationWarning
              style={{
                fontFamily: F,
                fontSize: "clamp(36px,4vw,52px)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                margin: "0 0 10px 0",
              }}
            >
              {counts[i].toFixed(s.dec)}{s.suffix}
            </p>
            <p style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#FFFFFF", margin: "0 0 6px 0", lineHeight: 1.3 }}>
              {s.label}
            </p>
            <p style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.80)", margin: 0, lineHeight: 1.5 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
