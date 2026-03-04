"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DeviceFrame } from "./device-frame";

const microCards = [
  { label: "Decision", x: -20, y: 30, delay: 0.6 },
  { label: "Execution", x: 10, y: -15, delay: 0.8 },
  { label: "AI Workspace", x: -10, y: 80, delay: 1.0 },
];

export function HeroProductFrame() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative">
      {/* Connector SVG behind frame */}
      <svg
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-[calc(100%+64px)] h-32 pointer-events-none"
        viewBox="0 0 400 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 50 C60 20, 120 80, 200 50 S340 20, 390 50"
          stroke="url(#hero-connector-grad)"
          strokeWidth="1"
          strokeLinecap="round"
          className="hero-connector-line"
          opacity="0.3"
        />
        <circle r="3" fill="rgba(124,58,237,0.6)" opacity="0.5">
          <animateMotion dur="4s" repeatCount="indefinite" path="M10 50 C60 20, 120 80, 200 50 S340 20, 390 50" />
        </circle>
        <defs>
          <linearGradient id="hero-connector-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.1)" />
            <stop offset="50%" stopColor="rgba(124,58,237,0.4)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.3)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Video frame */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, x: 30, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <DeviceFrame src="/media/0223-8.mov" type="video" className="relative z-10" />
      </motion.div>

      {/* Floating micro-cards */}
      {microCards.map((card) => (
        <motion.div
          key={card.label}
          className="absolute z-20 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold text-white/70 shadow-lg"
          style={{
            left: `calc(50% + ${card.x}px)`,
            top: card.y < 0 ? `${12 + card.y}px` : undefined,
            bottom: card.y >= 0 ? `${card.y}px` : undefined,
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : {
            opacity: 1,
            y: [0, -8, 0],
            transition: {
              opacity: { duration: 0.5, delay: card.delay },
              y: { duration: 5, delay: card.delay + 0.5, repeat: Infinity, ease: "easeInOut" },
            },
          }}
        >
          {card.label}
        </motion.div>
      ))}

      <style>{`
        .hero-connector-line {
          stroke-dasharray: 6 8;
          animation: hero-thread 3s linear infinite;
        }
        @keyframes hero-thread { to { stroke-dashoffset: -28; } }
        @media (prefers-reduced-motion: reduce) {
          .hero-connector-line { animation: none; }
        }
      `}</style>
    </div>
  );
}
