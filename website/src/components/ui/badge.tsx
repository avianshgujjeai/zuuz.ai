import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "accent" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-slate-100 text-slate-700",
  primary: "bg-primary/10 text-primary-dark",
  accent: "bg-orange-50 text-orange-700",
  outline: "border border-border text-slate-600 bg-white",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
