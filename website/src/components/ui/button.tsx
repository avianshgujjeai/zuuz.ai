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
    "btn-gradient-primary text-white shadow-soft",
    "hover:-translate-y-px hover:shadow-md",
    "active:translate-y-0 active:shadow-sm",
    "focus-visible:ring-primary/30",
  ].join(" "),
  secondary: [
    "bg-foreground text-background shadow-sm",
    "hover:bg-foreground/90 hover:-translate-y-px hover:shadow-md",
    "active:translate-y-0",
    "focus-visible:ring-foreground/30",
  ].join(" "),
  ghost: [
    "text-muted-foreground",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:ring-ring/20",
  ].join(" "),
  outline: [
    "border border-border bg-background text-foreground shadow-xs",
    "hover:bg-muted hover:border-border hover:-translate-y-px hover:shadow-sm",
    "active:translate-y-0",
    "focus-visible:ring-ring/20",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold",
          "rounded-xl transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
