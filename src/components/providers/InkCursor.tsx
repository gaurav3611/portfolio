"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/components/ui/hooks";

/** A19: ink dot + lagging ring. Fine pointers only; never intercepts events; native cursor stays. */
export function InkCursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        lag.x = pos.x;
        lag.y = pos.y;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const leave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };
    const tick = () => {
      lag.x += (pos.x - lag.x) * 0.22;
      lag.y += (pos.y - lag.y) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={dot} className="absolute left-0 top-0 opacity-0">
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </div>
      <div ref={ring} className="absolute left-0 top-0 opacity-0">
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full border-ink transition-all duration-200 ${
            label ? "h-14 w-14 border-2" : "h-7 w-7 border-[1.5px]"
          }`}
        >
          {label && (
            <span className="absolute left-[80%] top-[80%] bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-paper">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
