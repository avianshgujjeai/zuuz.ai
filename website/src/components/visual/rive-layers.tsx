"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RiveLayersProps {
  className?: string;
}

export function RiveLayers({ className }: RiveLayersProps) {
  const [RiveComponent, setRiveComponent] = useState<React.ComponentType<{ src: string; stateMachines?: string; className?: string }> | null>(null);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    fetch("/rive/zuuz-layers.riv", { method: "HEAD" })
      .then((r) => { if (r.ok) setHasFile(true); })
      .catch(() => {});

    import("@rive-app/react-canvas")
      .then((mod) => {
        if (mod.default) setRiveComponent(() => mod.default);
      })
      .catch(() => {});
  }, []);

  if (!hasFile || !RiveComponent) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none opacity-15", className)} aria-hidden="true">
      <RiveComponent src="/rive/zuuz-layers.riv" stateMachines="Main" className="w-full h-full" />
    </div>
  );
}
