"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who ask for reduced motion — native scroll for them.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Keyboard scrolling stays native; anchors makes in-page hash links smooth (offset comes from CSS scroll-padding-top).
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
