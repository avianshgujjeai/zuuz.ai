"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const lines = [
  { prefix: "→", text: "Connected: Salesforce, Outlook, Jira, SharePoint", color: "text-slate-400" },
  { prefix: "⬡", text: "Ingesting signals from 4 sources...", color: "text-blue-400" },
  { prefix: "◈", text: "Context Pack assembled: policy + budget + risk flags", color: "text-purple-400" },
  { prefix: "△", text: "Approval routed to: Finance Manager (Tier 2)", color: "text-amber-400" },
  { prefix: "✓", text: "Write-back: Salesforce opportunity updated", color: "text-emerald-400" },
  { prefix: "◎", text: "Audit trail logged — evidence ID: ctx-28a4f", color: "text-slate-500" },
];

export function ActivityConsole({ className }: { className?: string }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(lines.length);
      return;
    }
    const iv = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= lines.length) { clearInterval(iv); return c; }
        return c + 1;
      });
    }, 600);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className={cn("rounded-xl border border-border/50 bg-[#0a0a14] overflow-hidden shadow-sm font-mono", className)}>
      <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
        <span className="ml-2 text-[10px] text-white/30">zuuz — activity</span>
      </div>
      <div className="p-4 space-y-1.5 min-h-[180px]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={cn("text-[12px] leading-relaxed transition-opacity duration-300", line.color)}>
            <span className="opacity-40 mr-2">{line.prefix}</span>
            {line.text}
          </div>
        ))}
        {visibleCount < lines.length && (
          <span className="inline-block w-2 h-3.5 bg-white/40 animate-pulse" />
        )}
      </div>
    </div>
  );
}
