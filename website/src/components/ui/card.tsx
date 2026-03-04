import { cn } from "@/lib/utils";
import Link from "next/link";

type CardVariant = "default" | "bento" | "hero" | "chip";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
  variant?: CardVariant;
}

const variantBase: Record<CardVariant, string> = {
  hero: [
    "rounded-2xl border border-transparent bg-card p-7",
    "shadow-[0_1px_3px_rgb(0_0_0/0.04),0_8px_24px_rgb(0_0_0/0.03)]",
    "border-t-[1px] border-t-white/80",
  ].join(" "),
  default: "rounded-2xl border border-border/60 bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.03)]",
  bento: "rounded-2xl border border-border/50 bg-gradient-to-br from-card to-muted/20 p-6 shadow-[0_1px_3px_rgb(0_0_0/0.03)]",
  chip: "rounded-xl border border-border/40 bg-muted/40 px-4 py-3",
};

const hoverDefault = "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

const hoverStyles: Record<CardVariant, string> = {
  hero: "hover:shadow-[0_12px_40px_rgb(0_0_0/0.06)] hover:-translate-y-[2px] hover:border-primary/15",
  default: "hover:shadow-[0_4px_16px_rgb(0_0_0/0.05)] hover:border-primary/20 hover:-translate-y-px",
  bento: "hover:shadow-[0_8px_24px_rgb(0_0_0/0.05)] hover:border-primary/15 hover:-translate-y-px",
  chip: "hover:bg-white hover:border-border/60 hover:shadow-xs",
};

export function Card({ children, className, href, hover = true, variant = "default" }: CardProps) {
  const classes = cn(
    variantBase[variant],
    hover && hoverDefault,
    hover && hoverStyles[variant],
    href && "cursor-pointer",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block no-underline")}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-3", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-foreground tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground leading-relaxed", className)}>{children}</p>;
}
