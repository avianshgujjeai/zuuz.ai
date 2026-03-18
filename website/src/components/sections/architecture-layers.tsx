"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const layers = [
  {
    id: "decision",
    label: "Decision",
    color: "#7c3aed",
    details: [
      "Assembles context from email, docs, meetings, CRM, ERP, and ITSM",
      "Builds an evidence-backed Context Pack for every decision",
      "Surfaces risk flags, prior history, and policy requirements",
    ],
  },
  {
    id: "execution",
    label: "Execution",
    color: "#0018FF",
    details: [
      "Routes approvals through policy gates and role-based chains",
      "Enforces SLAs, thresholds, and compliance rules automatically",
      "Tracks every step with timestamps and attribution",
    ],
  },
  {
    id: "workspace",
    label: "AI Workspace",
    color: "#0891b2",
    details: [
      "Persona Copilots for Sales, Procurement, HR, Legal, and Ops",
      "Evidence Search with citations across every connected tool",
      "One workspace for answers and actions — no tool switching",
    ],
  },
];

const writeback = {
  label: "Safe Write-back",
  color: "#10b981",
  details: "Identity verified → Permissions checked → Audit logged → Systems updated",
};

export function ArchitectureLayers() {
  const [active, setActive] = useState<string | null>("decision");
  const prefersReduced = useReducedMotion();

  const activeLayer = layers.find((l) => l.id === active);

  return (
    <section className="py-14 md:py-16">
      <Container>
        <SectionHeading
          badge="Architecture"
          title="Layer by layer"
          description="Click a layer to see how ZUUZ processes decisions end-to-end."
        />

        <div className="mt-10 grid lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Left: layer pills + pipe */}
          <div className="relative">
            <div className="space-y-3">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActive(active === layer.id ? null : layer.id)}
                  className={cn(
                    "w-full text-left rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                    "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active === layer.id
                      ? "bg-white shadow-md border-primary/20 text-foreground"
                      : "bg-muted/50 border-transparent text-muted-foreground hover:bg-white hover:shadow-sm",
                  )}
                  style={active === layer.id ? { borderLeftColor: layer.color, borderLeftWidth: 3 } : {}}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {/* Pipe connector to write-back */}
            <div className="mt-3 flex justify-center">
              <svg width="2" height="32" className="text-border">
                <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className={prefersReduced ? "" : "pipe-dash"} />
              </svg>
            </div>

            {/* Safe Write-back (always visible) */}
            <div
              className="rounded-xl px-4 py-3 text-sm font-semibold border text-white"
              style={{ background: writeback.color, borderColor: `${writeback.color}40` }}
            >
              {writeback.label}
              <p className="mt-1 text-[11px] font-normal text-white/70">{writeback.details}</p>
            </div>
          </div>

          {/* Right: details panel */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeLayer && (
                <motion.div
                  key={activeLayer.id}
                  initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
                  className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4" style={{ color: activeLayer.color }}>
                    {activeLayer.label}
                  </h3>
                  <ul className="space-y-3">
                    {activeLayer.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: activeLayer.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            {!activeLayer && (
              <div className="flex items-center justify-center h-[200px] rounded-2xl border border-dashed border-border/40 text-sm text-muted-foreground">
                Click a layer to explore
              </div>
            )}
          </div>
        </div>
      </Container>

      <style>{`
        .pipe-dash { animation: pipe-flow 2s linear infinite; }
        @keyframes pipe-flow { to { stroke-dashoffset: -12; } }
        @media (prefers-reduced-motion: reduce) { .pipe-dash { animation: none; } }
      `}</style>
    </section>
  );
}
