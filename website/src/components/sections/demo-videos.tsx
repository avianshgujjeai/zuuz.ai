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
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeClip = clips.find((c) => c.id === active)!;
  const clipHasError = hasError[activeClip.src];

  useEffect(() => {
    if (videoRef.current && !clipHasError) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active, clipHasError]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {clips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => setActive(clip.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active === clip.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80",
            )}
          >
            {clip.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-border overflow-hidden shadow-elevated bg-foreground/5 aspect-video">
        {clipHasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
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
  );
}
