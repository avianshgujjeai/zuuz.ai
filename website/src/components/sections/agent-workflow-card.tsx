"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { AgentWorkflow } from "@/content/agents";

interface AgentWorkflowCardProps {
  workflow: AgentWorkflow;
  index: number;
}

export function AgentWorkflowCard({ workflow, index }: AgentWorkflowCardProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReduced ? { duration: 0 } : { delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
    >
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Trigger</span>
        <p className="mt-1 text-sm font-medium text-foreground">{workflow.trigger}</p>
      </div>

      <div className="mb-4 space-y-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Steps</span>
        <div className="mt-2 space-y-1">
          {workflow.steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-2"
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="flex flex-col items-center mt-0.5">
                <div className={cn(
                  "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-200",
                  hoveredStep === i ? "bg-primary text-white" : "bg-primary/10 text-primary",
                )}>
                  {i + 1}
                </div>
                {i < workflow.steps.length - 1 && (
                  <div className={cn(
                    "w-px h-4 transition-colors duration-200",
                    hoveredStep === i || hoveredStep === i + 1 ? "bg-primary" : "bg-border",
                  )} />
                )}
              </div>
              <span className={cn(
                "text-sm leading-relaxed transition-colors duration-200 pt-0.5",
                hoveredStep === i ? "text-foreground font-medium" : "text-muted-foreground",
              )}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Output</span>
          <p className="mt-0.5 text-sm text-foreground">{workflow.output}</p>
        </div>
      </div>
    </motion.div>
  );
}
