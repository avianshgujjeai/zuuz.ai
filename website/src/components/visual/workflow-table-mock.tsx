"use client";

import { cn } from "@/lib/utils";

const rows = [
  { id: "REQ-2841", step: "Request Submitted", status: "complete", color: "bg-emerald-500" },
  { id: "REQ-2841", step: "Evidence Pack Assembled", status: "complete", color: "bg-emerald-500" },
  { id: "REQ-2841", step: "Approval Routed", status: "active", color: "bg-primary" },
  { id: "REQ-2841", step: "Safe Write-back", status: "pending", color: "bg-border" },
];

export function WorkflowTableMock({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-white overflow-hidden shadow-sm", className)}>
      <div className="px-4 py-2.5 border-b border-border/40 bg-muted/30 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Workflow — Live</span>
      </div>
      <div className="divide-y divide-border/30">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className="font-mono text-[11px] text-muted-foreground/60 w-16">{row.id}</span>
            <span className="flex-1 text-foreground/80 text-[13px]">{row.step}</span>
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              row.status === "complete" && "bg-emerald-50 text-emerald-700",
              row.status === "active" && "bg-primary/10 text-primary workflow-pulse",
              row.status === "pending" && "bg-muted text-muted-foreground",
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", row.color)} />
              {row.status === "complete" ? "Done" : row.status === "active" ? "In Progress" : "Pending"}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .workflow-pulse { animation: wf-pulse 2s ease-in-out infinite; }
        @keyframes wf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) { .workflow-pulse { animation: none; } }
      `}</style>
    </div>
  );
}
