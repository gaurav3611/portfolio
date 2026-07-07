"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGate } from "./GateProvider";

const GateScene = dynamic(() => import("@/components/three/GateScene"), {
  ssr: false,
});

const HITS_NEEDED = 3;

const hints = [
  "Click the core to break in",
  "It's cracking — hit it again",
  "One more.",
];

/**
 * Full-screen gate over the portfolio: a 3D core the visitor has to smash
 * three times to enter. Click/tap/Enter all count; a skip link is always
 * available, and reduced-motion visitors get a single-click entry.
 */
export function EntryGate() {
  const { entered, enter } = useGate();
  const [hits, setHits] = useState(0);
  const [exploding, setExploding] = useState(false);
  const reduced = useReducedMotion();
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // no scrolling the portfolio while it's still locked
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

  const smash = useCallback(() => {
    if (exploding || entered) return;
    if (reduced) {
      enter();
      return;
    }
    setHits((h) => {
      const next = h + 1;
      if (next >= HITS_NEEDED) {
        setExploding(true);
        finishTimer.current = setTimeout(enter, 900);
      }
      return next;
    });
  }, [exploding, entered, reduced, enter]);

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Break the core to enter the portfolio"
          onClick={smash}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              smash();
            }
          }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-80 flex cursor-pointer flex-col items-center justify-between bg-background select-none"
        >
          {/* 3D core */}
          <div className="absolute inset-0">
            <GateScene hits={hits} exploding={exploding} />
          </div>

          {/* pulse ring on every hit */}
          <AnimatePresence>
            {hits > 0 && !exploding && (
              <motion.div
                key={hits}
                aria-hidden
                className="absolute top-1/2 left-1/2 rounded-full border-2 border-secondary/60"
                initial={{ width: 160, height: 160, x: "-50%", y: "-50%", opacity: 0.9 }}
                animate={{ width: 560, height: 560, x: "-50%", y: "-50%", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          {/* white flash when it breaks */}
          {exploding && (
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-primary"
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
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
              {Array.from({ length: HITS_NEEDED }).map((_, i) => (
                <motion.span
                  key={i}
                  className="size-2 rounded-full"
                  animate={{
                    backgroundColor:
                      i < hits
                        ? ["#3b82f6", "#06b6d4", "#10b981"][i]
                        : "color-mix(in srgb, var(--color-foreground) 18%, transparent)",
                    scale: i === hits - 1 ? [1, 1.6, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={exploding ? "in" : hits}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-xl font-semibold tracking-tight md:text-2xl"
              >
                {exploding ? "In we go." : hints[Math.min(hits, hints.length - 1)]}
              </motion.p>
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation();
                enter();
              }}
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
