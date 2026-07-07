"use client";

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGate } from "./GateProvider";
import { SlashCanvas, type SlashHandle } from "./SlashCanvas";

const GateScene = dynamic(() => import("@/components/three/GateScene"), {
  ssr: false,
});

const SLICES_NEEDED = 3;

const hints = [
  "Slash the watermelon to break in",
  "Clean cut — keep slicing",
  "One more slice.",
];

/**
 * Full-screen gate: a watermelon the visitor slices open, Fruit Ninja
 * style. Press–drag–release across the melon registers a cut: the blade
 * streak follows the pointer, juice sprays at the point of contact, a
 * wedge falls away showing red flesh / black seeds / white rind, and the
 * screen kicks. The third slice blows the rest apart, then the gate lifts.
 */
export function EntryGate() {
  const { entered, enter } = useGate();
  const [slices, setSlices] = useState(0);
  const [exploding, setExploding] = useState(false);
  const [tapped, setTapped] = useState(false); // clicked without dragging
  const reduced = useReducedMotion();
  const shake = useAnimationControls();
  const slash = useRef<SlashHandle | null>(null);
  const drag = useRef({
    active: false,
    sliced: false,
    sx: 0,
    sy: 0,
    lx: 0,
    ly: 0,
    len: 0,
  });
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // no scrolling the portfolio while it's still sealed
  useEffect(() => {
    if (entered) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [entered]);

  useEffect(
    () => () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
    },
    []
  );

  const registerSlice = useCallback(
    (angle: number, x: number, y: number) => {
      if (exploding || entered) return;
      slash.current?.burst(x, y, angle);
      const next = slices + 1;
      setSlices(next);
      if (next >= SLICES_NEEDED) {
        setExploding(true);
        shake.start({
          x: [0, -16, 13, -8, 5, -2, 0],
          y: [0, 9, -12, 6, -3, 1, 0],
          transition: { duration: 0.6, ease: "easeOut" },
        });
        finishTimer.current = setTimeout(enter, 1100);
      } else {
        shake.start({
          x: [0, -9, 7, -3, 0],
          y: [0, 5, -6, 2, 0],
          transition: { duration: 0.35, ease: "easeOut" },
        });
      }
    },
    [slices, exploding, entered, enter, shake]
  );

  function onPointerDown(e: React.PointerEvent) {
    if (exploding) return;
    if (reduced) {
      enter();
      return;
    }
    drag.current = {
      active: true,
      sliced: false,
      sx: e.clientX,
      sy: e.clientY,
      lx: e.clientX,
      ly: e.clientY,
      len: 0,
    };
    slash.current?.begin(e.clientX, e.clientY);
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active || exploding) return;
    slash.current?.extend(e.clientX, e.clientY);
    d.len += Math.hypot(e.clientX - d.lx, e.clientY - d.ly);

    // does this stroke pass through the core's screen-space circle?
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.46;
    const r = Math.min(window.innerWidth, window.innerHeight) * 0.24;
    const inside = Math.hypot(e.clientX - cx, e.clientY - cy) < r;
    if (!d.sliced && d.len > 70 && inside) {
      d.sliced = true;
      const angle = Math.atan2(e.clientY - d.sy, e.clientX - d.sx);
      registerSlice(angle, e.clientX, e.clientY);
    }
    d.lx = e.clientX;
    d.ly = e.clientY;
  }

  function onPointerUp() {
    const d = drag.current;
    if (d.active && !d.sliced && d.len < 14) setTapped(true);
    d.active = false;
    slash.current?.end();
  }

  const hint = exploding
    ? "In we go."
    : tapped && slices === 0
      ? "Don't tap — hold, drag, slash through it"
      : hints[Math.min(slices, hints.length - 1)];

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Slash the watermelon to enter the portfolio"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              registerSlice(
                Math.PI / 5,
                window.innerWidth / 2,
                window.innerHeight * 0.46
              );
            }
          }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-80 flex touch-none flex-col items-center justify-between bg-background select-none"
        >
          {/* 3D core with screen shake */}
          <motion.div animate={shake} className="absolute inset-0">
            <GateScene slices={slices} exploding={exploding} />
          </motion.div>

          {/* blade streak + sparks */}
          <SlashCanvas ref={slash} />

          {/* pulse ring on every cut */}
          <AnimatePresence>
            {slices > 0 && !exploding && (
              <motion.div
                key={slices}
                aria-hidden
                className="absolute top-[46%] left-1/2 rounded-full border-2 border-[#f43f5e]/50"
                initial={{ width: 180, height: 180, x: "-50%", y: "-50%", opacity: 0.9 }}
                animate={{ width: 600, height: 600, x: "-50%", y: "-50%", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* detonation: hot flash + expanding glow burst */}
          {exploding && (
            <>
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-[#f43f5e]"
                initial={{ opacity: 0.22 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
              />
              <motion.div
                aria-hidden
                className="absolute top-[46%] left-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgb(255 255 255 / 0.9), rgb(244 63 94 / 0.45) 35%, transparent 70%)",
                }}
                initial={{ width: 120, height: 120, x: "-50%", y: "-50%", opacity: 1 }}
                animate={{ width: 1400, height: 1400, x: "-50%", y: "-50%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </>
          )}

          {/* header */}
          <header className="relative z-10 flex w-full items-center justify-between px-6 py-6 md:px-10">
            <span className="font-display text-lg font-bold tracking-tight">
              gaurav<span className="text-gradient">.gandhi</span>
            </span>
            <span className="hidden font-mono text-xs tracking-[0.25em] text-muted uppercase sm:block">
              Portfolio — sealed
            </span>
          </header>

          {/* footer: hint + progress + skip */}
          <footer className="relative z-10 flex w-full flex-col items-center gap-5 px-6 pb-10">
            <div className="flex items-center gap-2.5" aria-hidden>
              {Array.from({ length: SLICES_NEEDED }).map((_, i) => (
                <motion.span
                  key={i}
                  className="size-2 rounded-full"
                  animate={{
                    backgroundColor:
                      i < slices
                        ? ["#3b82f6", "#06b6d4", "#10b981"][i]
                        : "color-mix(in srgb, var(--color-foreground) 18%, transparent)",
                    scale: i === slices - 1 ? [1, 1.6, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={hint}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-xl font-semibold tracking-tight md:text-2xl"
              >
                {hint}
              </motion.p>
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation();
                enter();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="rounded-lg px-3 py-1.5 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Skip intro
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
