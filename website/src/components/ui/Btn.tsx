"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface BtnProps {
  variant?: "primary" | "secondary" | "ghost" | "dark-outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<BtnProps["variant"]>, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow hover:-translate-y-0.5",
  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300",
  "dark-outline":
    "bg-transparent hover:bg-white/10 text-white/80 hover:text-white border border-white/15 hover:border-white/30",
};

const sizes: Record<NonNullable<BtnProps["size"]>, string> = {
  sm: "text-sm px-4 py-2 rounded-xl",
  md: "text-[15px] px-6 py-3 rounded-xl",
  lg: "text-base px-8 py-4 rounded-2xl",
};

export function Btn({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  external = false,
  type = "button",
  disabled,
}: BtnProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

export default Btn;
