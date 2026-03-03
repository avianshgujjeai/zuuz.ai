import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
  variant?: "default" | "bento";
}

export function Card({ children, className, href, hover = true, variant = "default" }: CardProps) {
  const classes = cn(
    "rounded-2xl border bg-card p-6",
    variant === "bento"
      ? "border-border/60 bg-gradient-to-br from-card to-muted/30 shadow-sm"
      : "border-border shadow-xs",
    hover && "transition-all duration-200",
    hover && !href && "hover:shadow-md hover:border-border",
    href && "hover:shadow-md hover:border-primary/20 hover:-translate-y-px cursor-pointer",
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
