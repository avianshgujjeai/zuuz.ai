"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.5,
  className,
  children,
  ...props
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
