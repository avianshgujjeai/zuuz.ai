"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Mail, FileText, Mic, Search, ShieldCheck, ArrowRight } from "lucide-react";

interface Capability {
  id: string;
  title: string;
  oneLiner: string;
  icon: typeof Mail;
  metrics: { label: string; target: number; suffix: string }[];
}

const capabilities: Capability[] = [
  {
    id: "email",
    title: "Email Copilot",
    oneLiner: "Triage, summarize, route, and draft responses — then create the next action in the system of record.",
    icon: Mail,
    metrics: [
      { label: "Items processed today", target: 2847, suffix: "" },
      { label: "Avg processing time", target: 1.2, suffix: "s" },
      { label: "Actions executed", target: 1423, suffix: "" },
    ],
  },
  {
    id: "documents",
    title: "Documents Copilot",
    oneLiner: "Extract key terms, highlight risk, and generate structured outputs with citations back to source files.",
    icon: FileText,
    metrics: [
      { label: "Items processed today", target: 892, suffix: "" },
      { label: "Avg processing time", target: 2.4, suffix: "s" },
      { label: "Actions executed", target: 567, suffix: "" },
    ],
  },
  {
    id: "meetings",
    title: "Meetings Copilot",
    oneLiner: "Convert conversations into decisions, action items, and updates — automatically assigned and tracked.",
    icon: Mic,
    metrics: [
      { label: "Items processed today", target: 156, suffix: "" },
      { label: "Avg processing time", target: 3.8, suffix: "s" },
      { label: "Actions executed", target: 412, suffix: "" },
    ],
  },
  {
    id: "search",
    title: "Evidence Search",
    oneLiner: "Ask a question across every tool and get an answer with citations plus the next best action.",
    icon: Search,
    metrics: [
      { label: "Items processed today", target: 5120, suffix: "" },
      { label: "Avg processing time", target: 0.8, suffix: "s" },
      { label: "Actions executed", target: 2048, suffix: "" },
    ],
  },
  {
    id: "writeback",
    title: "Safe Write-Back",
    oneLiner: "Execute updates only after identity, permissions, and approvals are satisfied — every action logged.",
    icon: ShieldCheck,
    metrics: [
      { label: "Items processed today", target: 3640, suffix: "" },
      { label: "Avg processing time", target: 1.1, suffix: "s" },
      { label: "Actions executed", target: 3640, suffix: "" },
    ],
  },
];

const timelineSteps = ["Ingest", "Understand", "Decide", "Execute"];

function useAnimatedNumber(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return value;
}

function MetricCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const value = useAnimatedNumber(target, active);
  const isDecimal = target < 10;
  const display = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString();
  return <span>{display}{suffix}</span>;
}

export function LiveWorkShowcase() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const [dotStep, setDotStep] = useState(0);
  const active = capabilities.find((c) => c.id === activeId)!;

  useEffect(() => {
    setDotStep(0);
    const iv = setInterval(() => {
      setDotStep((s) => (s + 1) % timelineSteps.length);
    }, 1200);
    return () => clearInterval(iv);
  }, [activeId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left: capability tabs */}
      <div className="space-y-1.5">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          const isActive = cap.id === activeId;
          return (
            <button
              key={cap.id}
              onClick={() => setActiveId(cap.id)}
              className={cn(
                "flex items-start gap-3 w-full rounded-xl px-4 py-3 text-left transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary/5 border border-primary/20 shadow-soft"
                  : "hover:bg-muted border border-transparent",
              )}
            >
              <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              <div>
                <span className={cn("block text-sm font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {cap.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: metrics + timeline */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{active.oneLiner}</p>

        {/* Processing timeline */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Processing</p>
          <div className="flex items-center gap-2">
            {timelineSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center justify-center rounded-full h-8 w-8 text-[10px] font-bold transition-colors duration-300",
                  i === dotStep ? "bg-primary text-white" : "bg-muted text-muted-foreground",
                )}>
                  {i + 1}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  i === dotStep ? "text-foreground" : "text-muted-foreground",
                )}>
                  {step}
                </span>
                {i < timelineSteps.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {active.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-background p-4 text-center">
              <p className="text-2xl font-bold text-primary tabular-nums">
                <MetricCounter target={m.target} suffix={m.suffix} active={true} />
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground/60 mt-4 text-right">Live demo (simulated)</p>
      </div>
    </div>
  );
}
