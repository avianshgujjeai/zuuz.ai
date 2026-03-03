"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeroMediaProps {
  src?: string;
  poster?: string;
  type?: "video" | "image";
  alt?: string;
  className?: string;
}

export function HeroMedia({
  src = "/media/hero.mp4",
  poster,
  type = "video",
  alt = "Product preview",
  className,
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      videoRef.current.pause();
    }
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) videoRef.current?.pause();
      else videoRef.current?.play();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [type]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 shadow-elevated",
        "bg-muted",
        className,
      )}
    >
      {/* Glass highlight bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true" />

      {type === "video" ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        >
          <source src={src.replace(".mp4", ".webm")} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      )}
    </div>
  );
}
