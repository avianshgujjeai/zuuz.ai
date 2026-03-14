"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay lets the new page DOM settle
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<Element>(".sr:not(.in),.sr-x:not(.in),.sr-scale:not(.in)");
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
          }),
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 60);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
