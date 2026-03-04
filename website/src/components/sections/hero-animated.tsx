"use client";

import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroAnimated({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div>{children}</div>;
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className}>{children}</div>;
  return <motion.div variants={itemVariants} className={className}>{children}</motion.div>;
}

export function HeroBlobs() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Large primary blob — top left */}
      <div
        className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,24,255,0.06) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: prefersReduced ? "none" : "float 7s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      {/* Secondary blob — right side, offset down */}
      <div
        className="absolute -top-20 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(77,93,255,0.04) 0%, transparent 60%)",
          filter: "blur(120px)",
          animation: prefersReduced ? "none" : "float 9s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />
      {/* Center focal glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,24,255,0.045) 0%, transparent 55%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

export function ShimmerSpan() {
  return (
    <span
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
      aria-hidden="true"
    />
  );
}
