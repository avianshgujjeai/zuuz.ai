"use client";

import { forwardRef, cloneElement, Children, isValidElement, type ButtonHTMLAttributes, type ReactNode, type MouseEventHandler } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "nav";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-primary text-primary-foreground shadow-soft",
    "hover:-translate-y-px hover:shadow-md hover:brightness-[0.97]",
    "active:translate-y-0 active:shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-primary/20",
  ].join(" "),
  secondary: [
    "bg-foreground text-background shadow-sm",
    "hover:bg-foreground/90 hover:-translate-y-px",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-foreground/20",
  ].join(" "),
  ghost: [
    "text-muted-foreground",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-ring/20",
  ].join(" "),
  outline: [
    "border border-border/70 bg-white text-foreground shadow-xs",
    "hover:bg-muted hover:-translate-y-px hover:shadow-sm",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-ring/20",
  ].join(" "),
  nav: [
    "bg-primary text-primary-foreground shadow-soft",
    "hover:-translate-y-px hover:shadow-md hover:brightness-[0.97]",
    "active:translate-y-0 active:shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-primary/20",
    "!rounded-[10px]",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-[15px] gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, href, target, rel, children, onClick, ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center font-semibold",
      "rounded-xl transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      variantStyles[variant],
      variant === "nav" ? "h-8 px-4 text-[13px] gap-1.5" : sizeStyles[size],
      className,
    );

    // If href provided, render as Link
    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={baseClass}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        >
          {children}
        </Link>
      );
    }

    // If asChild, apply classes to the single child element
    if (asChild && children) {
      const child = Children.only(children);
      if (isValidElement<{ className?: string }>(child)) {
        return cloneElement(child, {
          className: cn(baseClass, child.props?.className),
        });
      }
    }

    return (
      <button
        ref={ref}
        className={baseClass}
        onClick={onClick}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button, type ButtonProps };
