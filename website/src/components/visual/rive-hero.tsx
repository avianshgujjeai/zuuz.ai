"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RiveHeroProps {
  className?: string;
}

export function RiveHero({ className }: RiveHeroProps) {
  const [RiveComponent, setRiveComponent] = useState<React.ComponentType<{ src: string; stateMachines?: string; className?: string }> | null>(null);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    fetch("/rive/zuuz-hero.riv", { method: "HEAD" })
      .then((r) => { if (r.ok) setHasFile(true); })
      .catch(() => {});

    import("@rive-app/react-canvas")
      .then((mod) => {
        if (mod.default) setRiveComponent(() => mod.default);
      })
      .catch(() => {});
  }, []);

  if (!hasFile || !RiveComponent) {
    return (
      <div className={cn("absolute inset-0 pointer-events-none opacity-10", className)} aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgb(0 24 255 / 0.1)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="rgb(0 24 255 / 0.06)" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none opacity-20", className)} aria-hidden="true">
      <RiveComponent src="/rive/zuuz-hero.riv" stateMachines="Main" className="w-full h-full" />
    </div>
  );
}
