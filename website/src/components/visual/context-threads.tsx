"use client";

export function ContextThreads({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Thread path 1 */}
      <path
        d="M10 60 C80 30, 160 90, 250 60 S400 30, 490 60"
        stroke="#0018FF"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.15"
        className="ctx-thread"
      />
      {/* Thread path 2 */}
      <path
        d="M10 80 C100 50, 180 110, 270 80 S420 50, 490 80"
        stroke="#A3F3FF"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.2"
        className="ctx-thread-alt"
      />
      {/* Nodes */}
      {[50, 150, 250, 350, 450].map((x) => (
        <circle key={x} cx={x} cy={60} r="3" fill="#0018FF" opacity="0.2" />
      ))}
      {/* Moving dot */}
      <circle r="2.5" fill="#0018FF" opacity="0.5">
        <animateMotion dur="5s" repeatCount="indefinite" path="M10 60 C80 30, 160 90, 250 60 S400 30, 490 60" />
      </circle>
      <circle r="2" fill="#A3F3FF" opacity="0.4">
        <animateMotion dur="7s" repeatCount="indefinite" path="M10 80 C100 50, 180 110, 270 80 S420 50, 490 80" />
      </circle>
      <style>{`
        .ctx-thread { stroke-dasharray: 8 10; animation: ctx-flow 4s linear infinite; }
        .ctx-thread-alt { stroke-dasharray: 6 12; animation: ctx-flow 6s linear infinite reverse; }
        @keyframes ctx-flow { to { stroke-dashoffset: -36; } }
        @media (prefers-reduced-motion: reduce) {
          .ctx-thread, .ctx-thread-alt { animation: none; }
          circle animateMotion { display: none; }
        }
      `}</style>
    </svg>
  );
}
