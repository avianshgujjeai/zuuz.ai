"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface DemoClip {
  id: string;
  label: string;
  src: string;
}

const allClips: DemoClip[] = [
  { id: "email", label: "Email Copilot", src: "/media/0223-1.mov" },
  { id: "docs", label: "Documents Copilot", src: "/media/0223-2.mov" },
  { id: "meetings", label: "Meetings Copilot", src: "/media/0223-3.mov" },
  { id: "search", label: "Evidence Search", src: "/media/0223-4.mov" },
  { id: "approvals", label: "ApprovalOps", src: "/media/0223-5.mov" },
  { id: "integrations", label: "Integrations", src: "/media/0223-6.mov" },
  { id: "security", label: "Security & Audit", src: "/media/0223-7.mov" },
  { id: "insights", label: "Insights Dashboard", src: "/media/0223-8.mov" },
];

const existingFiles = new Set([
  "/media/0223-2.mov",
  "/media/0223-3.mov",
  "/media/0223-4.mov",
  "/media/0223-8.mov",
]);

const availableClips = allClips.filter((c) => existingFiles.has(c.src));

export function DemoVideos() {
  const [active, setActive] = useState(availableClips[0]?.id ?? "");
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeClip = availableClips.find((c) => c.id === active);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  if (availableClips.length === 0) return null;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {availableClips.map((clip) => (
          <button
            key={clip.id}
            onClick={() => setActive(clip.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active === clip.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80",
            )}
          >
            {clip.label}
          </button>
        ))}
      </div>

      {/* Video */}
      <div className="relative rounded-2xl border border-border overflow-hidden shadow-elevated bg-foreground/5">
        {activeClip ? (
          <video
            ref={videoRef}
            key={activeClip.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto"
          >
            <source src={activeClip.src} type="video/quicktime" />
            <source src={activeClip.src.replace(".mov", ".mp4")} type="video/mp4" />
            <source src={activeClip.src.replace(".mov", ".webm")} type="video/webm" />
            {/* Fallback for browsers that can't play .mov */}
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Play className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Video available in Safari. MP4/WebM versions coming soon.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Run <code className="font-mono">scripts/convert-videos.sh</code> to generate compatible formats.
              </p>
            </div>
          </video>
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-muted-foreground">No video available for this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
