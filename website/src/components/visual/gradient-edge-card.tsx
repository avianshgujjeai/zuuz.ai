import { cn } from "@/lib/utils";

interface GradientEdgeCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientEdgeCard({ children, className }: GradientEdgeCardProps) {
  return (
    <div className={cn("relative rounded-2xl p-px", className)}>
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-70"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, rgba(0,24,255,0.15), rgba(0,24,255,0.04), rgba(0,24,255,0.15))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden="true"
      />
      {/* Inner content */}
      <div className="relative rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgb(0_0_0/0.04),0_8px_24px_rgb(0_0_0/0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0_0_0/0.06)] hover:-translate-y-0.5">
        {children}
      </div>
    </div>
  );
}
