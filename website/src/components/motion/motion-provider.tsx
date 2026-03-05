"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [force, setForce] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const isForce = url.searchParams.get("motion") === "force";
    setForce(isForce);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (isForce) document.documentElement.dataset.motion = "force";
    else delete document.documentElement.dataset.motion;
  }, []);

  return (
    <MotionConfig reducedMotion={force ? "never" : undefined}>
      {children}
      <div
        style={{
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 999999,
          background: "#000",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        MOTION: {force ? "FORCE" : reduced ? "REDUCED" : "NORMAL"}
      </div>
    </MotionConfig>
  );
}
