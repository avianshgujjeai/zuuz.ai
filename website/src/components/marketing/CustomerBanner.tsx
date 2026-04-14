"use client";
import { useRef, useState } from "react";
import Link from "next/link";

const CUSTOMERS = [
  { name: "Western International Group", logo: "/logos/western-international.png", tag: "Distribution & Trading · UAE" },
  { name: "Nesto Group",                 logo: "/logos/nesto-group.png",           tag: "Retail & Distribution · UAE" },
  { name: "RA Technologies LLC",         logo: "/logos/ra-technologies.png",       tag: "IT Services · USA"           },
  { name: "Cloud Box Technologies",      logo: "/logos/cloud-box.png",             tag: "IT Services & Cloud · UAE"   },
];

const F = "'Montserrat',sans-serif";

export function CustomerBanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate items for seamless infinite scroll
  const items = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

  return (
    <div style={{
      width: "100%",
      background: "#fff",
      borderTop: "1px solid #EEEEF5",
      borderBottom: "1px solid #EEEEF5",
      padding: "0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Label */}
      <p style={{
        textAlign: "center",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.11em",
        textTransform: "uppercase",
        color: "#888",
        fontFamily: F,
        padding: "14px 0 10px",
      }}>
        Trusted by enterprise teams
      </p>

      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: "flex",
          gap: 0,
          alignItems: "center",
          width: "max-content",
          animation: `customer-scroll 28s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          paddingBottom: 14,
        }}
      >
        {items.map((c, i) => (
          <Link
            key={i}
            href="/customers"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 40px",
              textDecoration: "none",
              borderRight: "1px solid #EEEEF5",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={c.name}
              style={{
                height: 32,
                maxWidth: 140,
                objectFit: "contain",
                display: "block",
                filter: "grayscale(20%)",
                transition: "filter 0.2s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(20%)"; }}
              onError={e => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const span = el.nextElementSibling as HTMLElement;
                if (span) span.style.display = "block";
              }}
            />
            <span style={{ display: "none", fontSize: 13, fontWeight: 700, color: "#333", fontFamily: F }}>{c.name}</span>
            <span style={{ fontSize: 10, color: "#999", fontFamily: F, letterSpacing: "0.04em" }}>{c.tag}</span>
          </Link>
        ))}
      </div>

      {/* Keyframe injected inline */}
      <style>{`
        @keyframes customer-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
