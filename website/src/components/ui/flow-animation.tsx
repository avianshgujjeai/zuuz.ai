"use client";

import { cn } from "@/lib/utils";

interface FlowAnimationProps {
  className?: string;
}

export function FlowAnimation({ className }: FlowAnimationProps) {
  const nodes = [
    { x: 60, y: 80, label: "Email" },
    { x: 200, y: 40, label: "CRM" },
    { x: 340, y: 80, label: "Context" },
    { x: 480, y: 40, label: "Approve" },
    { x: 620, y: 80, label: "Execute" },
  ];

  const pathD = `M ${nodes.map((n) => `${n.x} ${n.y}`).join(" L ")}`;

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 680 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Workflow flow animation"
      >
        {/* Static path */}
        <path
          d={pathD}
          stroke="rgb(var(--color-border))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated dashed path */}
        <path
          d={pathD}
          stroke="rgb(var(--color-primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 14"
          className="animate-flow-dash motion-reduce:animate-none"
        />

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r="18"
              fill="rgb(var(--color-background))"
              stroke="rgb(var(--color-border))"
              strokeWidth="1.5"
              className="transition-colors hover:stroke-[rgb(var(--color-primary))]"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill="rgb(var(--color-primary))"
              opacity="0.6"
            />
            <text
              x={node.x}
              y={node.y + 32}
              textAnchor="middle"
              className="fill-[rgb(var(--color-muted-foreground))] text-[10px] font-medium"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Moving dot */}
        <circle r="4" fill="rgb(var(--color-primary))" opacity="0.9">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={pathD}
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </circle>
        <path id="flowPath" d={pathD} fill="none" className="hidden" />
      </svg>
    </div>
  );
}
