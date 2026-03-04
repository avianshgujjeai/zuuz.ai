"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface DemoClip {
  id: string;
  label: string;
  src: string;
}

const clips: DemoClip[] = [
  { id: "email", label: "Email Copilot", src: "/media/0223-2.mov" },
  { id: "docs", label: "Document Copilot", src: "/media/0223-3.mov" },
  { id: "meetings", label: "Meeting Copilot", src: "/media/0223-4.mov" },
  { id: "search", label: "Evidence Search", src: "/media/0223-8.mov" },
  { id: "insights", label: "Insight Dashboards", src: "/media/0223-8.mov" },
];

export function DemoVideos() {
  const [active, setActive] = useState(clips[0].id);
  const [hasError, setHasError] = useState<Record<string, boolean>>({});
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeClip = clips.find((c) => c.id === active)!;
  const clipHasError = hasError[activeClip.src];

  function switchTab(id: string) {
    if (id === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(id);
      setFading(false);
    }, 200);
  }

  useEffect(() => {
    if (videoRef.current && !clipHasError) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active, clipHasError]);

  return (
    <div>
      {/* Premium pill tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 justify-center p-1 rounded-2xl bg-muted/50 inline-flex mx-auto w-fit">
        {clips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => switchTab(clip.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-[13px] font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active === clip.id
                ? "bg-white text-foreground shadow-sm border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-white/50",
            )}
          >
            {clip.label}
          </button>
        ))}
      </div>

      {/* DeviceFrame */}
      <div className="rounded-2xl border border-border/50 bg-white shadow-elevated overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40 bg-muted/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="ml-3 text-[10px] text-muted-foreground/50 font-mono">{activeClip.label}</span>
        </div>
        <div className={cn("relative aspect-video transition-opacity duration-200", fading && "opacity-0")}>
          {clipHasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-muted/20">
              <Play className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Demo clip coming soon.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              key={activeClip.src + activeClip.id}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onError={() => setHasError((prev) => ({ ...prev, [activeClip.src]: true }))}
            >
              <source src={activeClip.src} type="video/quicktime" />
              <source src={activeClip.src.replace(".mov", ".mp4")} type="video/mp4" />
              <source src={activeClip.src.replace(".mov", ".webm")} type="video/webm" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
