import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "accent" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/8 text-primary border border-primary/10",
  accent: "bg-orange-50 text-orange-700 border border-orange-100",
  outline: "border border-border text-muted-foreground bg-background",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
