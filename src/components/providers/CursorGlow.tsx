"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/** Soft radial gradient that trails the cursor across the whole page. */
export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-1 hidden size-[600px] rounded-full opacity-40 md:block"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgb(59 130 246 / 0.14), rgb(6 182 212 / 0.05) 45%, transparent 70%)",
      }}
    />
  );
}
