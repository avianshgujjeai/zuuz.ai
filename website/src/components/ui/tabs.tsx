"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  children: (activeTab: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current.get(active);
    const container = containerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
  }, [active]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  function handleChange(id: string) {
    setActive(id);
    onChange?.(id);
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        role="tablist"
        className="relative inline-flex gap-1 rounded-xl bg-muted p-1"
      >
        {/* Animated indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-lg bg-background shadow-sm border border-border transition-all duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
          aria-hidden="true"
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "relative z-10 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6">
        {children(active)}
      </div>
    </div>
  );
}
