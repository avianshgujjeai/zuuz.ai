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

  if (prefersReduced) {
    return <div>{children}</div>;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroBlobs() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,24,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: prefersReduced ? "none" : "float 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,24,255,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: prefersReduced ? "none" : "float 8s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,24,255,0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
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
