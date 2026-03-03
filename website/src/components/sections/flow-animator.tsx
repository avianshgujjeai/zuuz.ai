"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const sources = [
  { label: "CRM", color: "bg-blue-500" },
  { label: "ERP", color: "bg-emerald-500" },
  { label: "Email", color: "bg-amber-500" },
  { label: "Docs", color: "bg-violet-500" },
];

const nodes = [
  { id: 0, label: "Discover", sub: "Observe current steps" },
  { id: 1, label: "Map", sub: "Visualize decisions" },
  { id: 2, label: "Automate", sub: "Assign to agents" },
  { id: 3, label: "Govern", sub: "Policies & audit" },
];

const outcomes = [
  { label: "Cycle time ↓", value: "60–80%" },
  { label: "Fewer touches", value: "3–5×" },
  { label: "Compliance", value: "100%" },
];

export function FlowAnimator() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative rounded-2xl border border-border bg-white p-6 sm:p-10 overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[180px_1fr_180px] items-center">
        {/* Sources */}
        <div className="flex flex-row flex-wrap lg:flex-col gap-3 justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-full text-center lg:text-left mb-1">Sources</p>
          {sources.map((s, i) => (
            <motion.div
              key={s.label}
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced ? { duration: 0 } : { delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 shadow-xs"
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", s.color)} />
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Workflow graph */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 hidden sm:block" aria-hidden="true" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
            {nodes.map((node) => {
              const isActive = activeNode === node.id;
              return (
                <motion.button
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onFocus={() => setActiveNode(node.id)}
                  onBlur={() => setActiveNode(null)}
                  initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReduced ? { duration: 0 } : { delay: 0.2 + node.id * 0.12, duration: 0.4 }}
                  className={cn(
                    "relative z-10 flex flex-col items-center rounded-xl border-2 bg-white p-4 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "border-primary shadow-md scale-105"
                      : "border-border shadow-xs hover:border-primary/40",
                  )}
                >
                  <span className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isActive ? "bg-primary text-white" : "bg-primary/10 text-primary",
                  )}>
                    {node.id + 1}
                  </span>
                  <span className="mt-2 text-sm font-semibold text-foreground">{node.label}</span>
                  <span className="mt-0.5 text-xs text-muted-foreground text-center">{node.sub}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div className="flex flex-row flex-wrap lg:flex-col gap-3 justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-full text-center lg:text-right mb-1">Outcomes</p>
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={prefersReduced ? { duration: 0 } : { delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="rounded-lg border border-border bg-white px-3 py-2 shadow-xs text-center"
            >
              <span className="block text-lg font-bold text-primary">{o.value}</span>
              <span className="text-xs text-muted-foreground">{o.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
