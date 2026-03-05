"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const child = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;
  return <motion.div variants={child} className={cn(className)}>{children}</motion.div>;
}
