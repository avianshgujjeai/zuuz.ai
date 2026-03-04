"use client";

import { cn } from "@/lib/utils";

interface AnimatedStrokeProps {
  className?: string;
}

export function AnimatedStroke({ className }: AnimatedStrokeProps) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      className={cn("w-full h-auto", className)}
      aria-hidden="true"
    >
      {/* Thread path */}
      <path
        d="M20 40 C80 20, 140 60, 200 40 S320 20, 380 40 S500 60, 580 40"
        stroke="url(#thread-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="context-thread"
      />
      {/* Nodes */}
      {[20, 140, 260, 380, 500, 580].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={40} r="4" fill="white" stroke="rgb(0 24 255 / 0.3)" strokeWidth="1" />
          <circle cx={x} cy={40} r="2" fill="rgb(0 24 255 / 0.5)" />
        </g>
      ))}
      {/* Labels */}
      <text x="20" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">Email</text>
      <text x="140" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">Docs</text>
      <text x="260" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">Meetings</text>
      <text x="380" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">CRM/ERP</text>
      <text x="500" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">ITSM</text>
      <text x="580" y="68" className="fill-slate-400 text-[8px]" textAnchor="middle">Write-back</text>
      <defs>
        <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(0 24 255 / 0.1)" />
          <stop offset="50%" stopColor="rgb(0 24 255 / 0.35)" />
          <stop offset="100%" stopColor="rgb(16 185 129 / 0.3)" />
        </linearGradient>
      </defs>
      <style>{`
        .context-thread {
          stroke-dasharray: 8 6;
          animation: thread-flow 3s linear infinite;
        }
        @keyframes thread-flow {
          to { stroke-dashoffset: -28; }
        }
        @media (prefers-reduced-motion: reduce) {
          .context-thread { animation: none; }
        }
      `}</style>
    </svg>
  );
}
