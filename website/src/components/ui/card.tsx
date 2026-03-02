import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({ children, className, href, hover = true }: CardProps) {
  const classes = cn(
    "rounded-xl border border-border bg-white p-6",
    hover && "transition-all duration-200",
    hover && !href && "hover:shadow-md",
    href && "hover:shadow-md hover:border-primary/20 cursor-pointer",
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
  return <h3 className={cn("text-lg font-semibold text-slate-900", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-slate-500 leading-relaxed", className)}>{children}</p>;
}
