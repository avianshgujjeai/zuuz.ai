import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-primary text-primary-foreground",
    "shadow-[0_1px_2px_rgb(0_0_0/0.1),0_2px_8px_rgb(0_24_255/0.15)]",
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,transparent_50%,transparent_100%)]",
    "hover:shadow-[0_4px_16px_rgb(0_24_255/0.25)] hover:brightness-105",
    "active:scale-[0.98] active:shadow-[0_1px_4px_rgb(0_24_255/0.15)]",
    "focus-visible:ring-2 focus-visible:ring-primary/25",
  ].join(" "),
  secondary: [
    "bg-foreground text-background shadow-sm",
    "hover:bg-foreground/90 hover:shadow-md",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-foreground/25",
  ].join(" "),
  ghost: [
    "text-muted-foreground",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring/20",
  ].join(" "),
  outline: [
    "border border-border/70 bg-white text-foreground",
    "shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
    "hover:bg-muted/60 hover:border-border hover:shadow-[0_2px_8px_rgb(0_0_0/0.05)]",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-ring/20",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-[44px] px-5 text-sm gap-2",
  lg: "h-[48px] px-7 text-[15px] gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold",
          "rounded-xl transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button, type ButtonProps };
