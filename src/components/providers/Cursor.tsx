"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeFinePointer(onChange: () => void) {
  const m = window.matchMedia("(pointer: fine)");
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';

/**
 * Custom cursor: an instant dot and a lagging ring. The ring stretches
 * along its velocity, morphs over interactive elements, dips on press and
 * ripples on click. Native cursor is hidden via CSS on fine pointers only.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // dot tracks almost instantly, ring glides behind
  const dotX = useSpring(x, { stiffness: 1200, damping: 65, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 65, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.6 });

  // velocity-based stretch: the ring elongates along its direction of travel
  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);
  const speed = useTransform([vx, vy], ([a, b]: number[]) => Math.hypot(a, b));
  const stretch = useTransform(speed, [0, 2800], [0, 0.38], { clamp: true });
  const scaleX = useTransform(stretch, (s) => 1 + s);
  const scaleY = useTransform(stretch, (s) => 1 - s * 0.45);
  const angle = useTransform([vx, vy], ([a, b]: number[]) =>
    Math.hypot(a, b) > 20 ? `${(Math.atan2(b, a) * 180) / Math.PI}deg` : "0deg"
  );
  // glow rises with movement speed
  const glow = useTransform(
    speed,
    [0, 2800],
    ["0 0 0px rgb(59 130 246 / 0)", "0 0 22px rgb(59 130 246 / 0.45)"]
  );

  // centering offsets (ring 40px, dot 8px)
  const ringLeft = useTransform(ringX, (v) => v - 20);
  const ringTop = useTransform(ringY, (v) => v - 20);
  const dotLeft = useTransform(dotX, (v) => v - 4);
  const dotTop = useTransform(dotY, (v) => v - 4);

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    if (!fine || reduced) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHovered(!!t?.closest?.(HOVER_SELECTOR));
    };
    const down = (e: PointerEvent) => {
      setPressed(true);
      setRipples((r) => [
        ...r.slice(-3),
        { id: Date.now() + Math.floor(e.clientX), x: e.clientX, y: e.clientY },
      ]);
    };
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-95">
      {/* trailing ring */}
      <motion.div
        className="absolute"
        style={{ left: ringLeft, top: ringTop, rotate: angle }}
      >
        <motion.div
          className="size-10 rounded-full border-[1.5px] border-primary/70"
          style={{ scaleX, scaleY, boxShadow: glow }}
          animate={{
            scale: hovered ? 1.65 : pressed ? 0.8 : 1,
            opacity: visible ? (hovered ? 0.95 : 0.7) : 0,
            borderColor: hovered
              ? "rgb(6 182 212 / 0.9)"
              : "rgb(59 130 246 / 0.7)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        />
      </motion.div>

      {/* dot */}
      <motion.div
        className="absolute size-2 rounded-full bg-foreground"
        style={{ left: dotLeft, top: dotTop }}
        animate={{
          scale: hovered ? 0.45 : pressed ? 1.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 32 }}
      />

      {/* click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border border-secondary/70"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.8 }}
            animate={{
              width: 72,
              height: 72,
              x: -36,
              y: -36,
              opacity: 0,
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((cur) => cur.filter((c) => c.id !== r.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
