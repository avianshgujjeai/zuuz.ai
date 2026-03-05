"use client";

import { useEffect } from "react";

export function MotionOverride() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("motion") === "force") {
      document.documentElement.dataset.motion = "force";
    }
  }, []);

  return null;
}
