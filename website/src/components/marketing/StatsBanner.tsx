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
function AnimatedNumber({
  value,
  suffix,
  started,
}: {
  value: number;
  suffix: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);
  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, value]);
  const formatted =
    value % 1 !== 0
      ? display.toFixed(1)
      : Math.round(display).toLocaleString();
  return (
    <span style={{ color: "#FFFFFF", fontFamily: F }}>
      {formatted}
      {suffix}
    </span>
  );
}
export function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      style={{
        background: "#000814",
        padding: "80px 0",
        width: "100%",
      }}
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
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "40px 32px",
              borderRight:
                i % 3 !== 2
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
              borderBottom:
                i < 3
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
            }}
          >
            <p
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily: F,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                margin: "0 0 10px 0",
              }}
            >
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                started={started}
              />
            </p>
            <p
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: F,
                margin: "0 0 6px 0",
                lineHeight: 1.3,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "rgba(255,255,255,0.72)",
                fontFamily: F,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
