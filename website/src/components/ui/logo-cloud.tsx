"use client";

import { cn } from "@/lib/utils";

interface LogoCloudProps {
  title?: string;
  logos?: string[];
  className?: string;
}

const defaultLogos = [
  "Logo A", "Logo B", "Logo C", "Logo D",
  "Logo E", "Logo F", "Logo G", "Logo H",
];

export function LogoCloud({
  title = "Trusted by leading teams",
  logos = defaultLogos,
  className,
}: LogoCloudProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className={cn("text-center", className)}>
      {title && (
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          {title}
        </p>
      )}
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <div className="flex animate-marquee-left whitespace-nowrap gap-10 w-max hover:[animation-play-state:paused]">
          {doubled.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="flex h-10 items-center justify-center rounded-md border border-dashed border-border px-5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-primary cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
