"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [force, setForce] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const isForce = url.searchParams.get("motion") === "force";
    setForce(isForce);
    if (isForce) document.documentElement.dataset.motion = "force";
    else delete document.documentElement.dataset.motion;
  }, []);

  return (
    <MotionConfig reducedMotion={force ? "never" : undefined}>
      {children}
    </MotionConfig>
  );
}
