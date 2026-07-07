"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  suffix = "",
  duration = 1.6,
  className,
  enabled = true,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Hold the count-up until e.g. the entry gate has opened. */
  enabled?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !enabled || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, enabled, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
