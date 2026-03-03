"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, ExternalLink, Zap } from "lucide-react";

interface QueryExample {
  query: string;
  answer: string;
  sources: string[];
  actions: string[];
}

const examples: QueryExample[] = [
  {
    query: "What's the renewal status for Acme Corp?",
    answer: "Acme Corp's contract renews on March 15. Current ARR is $240K. Last QBR was positive—NPS score 62. No open support escalations.",
    sources: ["CRM: Acme Corp deal record", "Email: QBR follow-up thread", "Support: Ticket history"],
    actions: ["Open renewal workflow", "Draft renewal proposal"],
  },
  {
    query: "Who approved the Q3 marketing budget?",
    answer: "CFO approved on Aug 12 via the budget approval workflow. Total approved: $1.2M. Finance attached the signed approval memo.",
    sources: ["ERP: Budget approval record", "Docs: Signed approval memo", "Workflow: Approval audit trail"],
    actions: ["View approval chain", "Open budget tracker"],
  },
  {
    query: "Find the latest SOW for Project Atlas",
    answer: "Latest SOW v3.2 was uploaded Sept 5 by Legal. Key changes: scope expanded to include Phase 2, budget increased by 15%.",
    sources: ["SharePoint: Project Atlas folder", "CLM: SOW version history", "Email: Legal review thread"],
    actions: ["Open document", "Compare versions", "Start review workflow"],
  },
  {
    query: "What's our shipping SLA compliance this month?",
    answer: "Current month SLA compliance is 94.2%. Three exceptions flagged: two weather delays (Southeast), one customs hold (EU).",
    sources: ["TMS: Shipment dashboard", "Carrier API: Exception log", "ERP: SLA tracker"],
    actions: ["View exceptions", "Open claims workflow"],
  },
  {
    query: "What PTO policy applies to employees in Germany?",
    answer: "Germany-based employees get 30 days annual leave per BUrlG. Additional 2 company days. Carry-over limited to March 31 of the following year.",
    sources: ["HR Knowledge Base: Germany PTO Policy", "HRIS: Country config", "Legal: Employment law summary"],
    actions: ["Submit leave request", "Contact HR"],
  },
];

export function EvidenceAnswerMock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = examples[activeIndex];
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Query list */}
      <div className="space-y-2">
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "w-full text-left rounded-lg px-4 py-3 text-sm transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              i === activeIndex
                ? "bg-primary/5 border border-primary/20 text-foreground font-medium"
                : "border border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Search className="inline h-3.5 w-3.5 mr-2 text-muted-foreground" />
            {ex.query}
          </button>
        ))}
      </div>

      {/* Answer panel */}
      <motion.div
        key={activeIndex}
        initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
        className="rounded-xl border border-border bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          Query
        </div>
        <p className="text-base font-medium text-foreground mb-6">{active.query}</p>

        <div className="mb-6 rounded-lg bg-muted/40 p-4">
          <p className="text-sm leading-relaxed text-foreground">{active.answer}</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sources</p>
          <div className="space-y-1.5">
            {active.sources.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            {active.actions.map((a, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                <Zap className="h-3 w-3" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
