import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export function Glow({
  className,
  size = 500,
  opacity = 0.06,
  color = "0 24 255",
}: GlowProps) {
  return (
    <div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 65%)`,
        filter: "blur(80px)",
      }}
      aria-hidden="true"
    />
  );
}
