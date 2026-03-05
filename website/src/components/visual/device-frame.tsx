"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  src?: string;
  type?: "video" | "image" | "children";
  children?: React.ReactNode;
  className?: string;
}

export function DeviceFrame({ src, type = "video", children, className }: DeviceFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) videoRef.current.pause();
  }, [type]);

  return (
    <div className={cn("rounded-2xl border border-border/50 bg-white shadow-elevated overflow-hidden", className)}>
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40 bg-muted/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-border/30 max-w-[200px]" />
      </div>
      {/* Content — full-bleed */}
      <div className="relative aspect-[16/10]">
        {type === "video" && src && (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={src} type="video/quicktime" />
            <source src={src.replace(".mov", ".mp4")} type="video/mp4" />
          </video>
        )}
        {type === "children" && children}
      </div>
    </div>
  );
}
