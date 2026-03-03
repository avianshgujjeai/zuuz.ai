"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plug, Download, Package, UserCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: Plug, title: "Connect Systems", description: "ERP, CRM, Email, Docs, Calendar", color: "bg-blue-500" },
  { icon: Download, title: "Ingest & Normalize", description: "Events, documents, approval chains", color: "bg-violet-500" },
  { icon: Package, title: "Build Context Pack", description: "Policy, budget, risk, history, compliance", color: "bg-primary" },
  { icon: UserCheck, title: "Human-in-the-loop Approval", description: "Policy gating, role-based routing", color: "bg-amber-500" },
  { icon: ShieldCheck, title: "Safe Write-back + Audit", description: "Identity verified, permissions checked, trail logged", color: "bg-emerald-500" },
];

export function WorkflowTimeline() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative">
      {/* Horizontal connector (desktop) */}
      <div className="hidden sm:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-border" aria-hidden="true">
        {!prefersReduced && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-md"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReduced ? { duration: 0 } : { delay: i * 0.12, duration: 0.4 }}
            className="flex flex-col items-center text-center relative z-10"
          >
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md", step.color)}>
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
