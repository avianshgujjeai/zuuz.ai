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
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:brightness-[0.96] hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/25",
  secondary:
    "bg-foreground text-background shadow-sm hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-foreground/25",
  ghost:
    "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/20",
  outline:
    "border border-border/70 bg-background text-foreground shadow-xs hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/20",
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
          "rounded-xl transition-all duration-150 ease-out",
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
