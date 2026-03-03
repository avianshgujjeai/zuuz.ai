"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const sources = ["Email", "Docs", "Calendar", "CRM", "ERP"];
const outputs = ["Safe Write-back", "Audit Log"];

export function SolutionsFlowHero() {
  const prefersReduced = useReducedMotion();

  const nodeVariant = (delay: number) => ({
    initial: prefersReduced ? {} : { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: prefersReduced ? { duration: 0 } : { delay, duration: 0.4 },
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-12" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Sources */}
        <div className="flex flex-col gap-1.5 shrink-0">
          {sources.map((s, i) => (
            <motion.div
              key={s}
              {...nodeVariant(i * 0.08)}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-[10px] sm:text-xs font-medium text-muted-foreground shadow-xs whitespace-nowrap"
            >
              {s}
            </motion.div>
          ))}
        </div>

        {/* Connector line with moving dot */}
        <div className="relative flex-1 h-px bg-border mx-1 sm:mx-3">
          {!prefersReduced && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Context Pack */}
        <motion.div
          {...nodeVariant(0.5)}
          className="shrink-0 rounded-lg border-2 border-primary/30 bg-primary/5 px-3 py-2 sm:px-4 sm:py-3 text-center"
        >
          <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Context Pack</p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">Evidence bundle</p>
        </motion.div>

        {/* Connector */}
        <div className="relative flex-1 h-px bg-border mx-1 sm:mx-3">
          {!prefersReduced && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Approver */}
        <motion.div
          {...nodeVariant(0.7)}
          className="shrink-0 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-center"
        >
          <p className="text-[10px] sm:text-xs font-bold text-amber-700">Approver</p>
          <p className="text-[9px] sm:text-[10px] text-amber-600 mt-0.5">Human-in-the-loop</p>
        </motion.div>

        {/* Connector */}
        <div className="relative flex-1 h-px bg-border mx-1 sm:mx-3">
          {!prefersReduced && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-emerald-500"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Outputs */}
        <div className="flex flex-col gap-1.5 shrink-0">
          {outputs.map((o, i) => (
            <motion.div
              key={o}
              {...nodeVariant(0.9 + i * 0.1)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[10px] sm:text-xs font-medium shadow-xs whitespace-nowrap",
                i === 0
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-600",
              )}
            >
              {o}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
