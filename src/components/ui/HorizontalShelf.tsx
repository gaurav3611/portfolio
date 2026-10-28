"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "./hooks";

/**
 * Sideways gallery. Desktop + motion allowed: the section pins and vertical scroll
 * drives the track sideways. Otherwise: a native horizontal scroller with snap points.
 */
export function HorizontalShelf({
  header,
  children,
  unit,
  regionLabel,
  dark = false,
}: {
  header: ReactNode;
  children: ReactNode;
  unit: string;
  /** Distinct from the section heading so the two landmarks don't share a name. */
  regionLabel: string;
  /** Light-on-ink controls for chapters set on a dark page. */
  dark?: boolean;
}) {
  // Pinning needs vertical room for the chapter header plus the tallest card; short
  // screens get the native sideways scroller instead.
  const pinned = useMediaQuery("(min-width: 768px) and (min-height: 860px) and (prefers-reduced-motion: no-preference)");
  const count = Children.count(children);
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const el = track.current;
    if (!pinned || !el) return;
    const ro = new ResizeObserver(() => setOverflow(Math.max(0, el.scrollWidth - el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * overflow);
  useMotionValueEvent(scrollYProgress, "change", (p) => setIndex(Math.min(count, Math.round(p * (count - 1)) + 1)));

  // Keyboard: when focus lands on an off-screen card, scroll the page to reveal it.
  const onFocus = (e: React.FocusEvent) => {
    if (!pinned || !outer.current || !track.current) return;
    // Focusing scrolls the overflow-hidden stage natively (sometimes after this handler);
    // undo it now and on the next frame so only our translate applies.
    const el = stage.current;
    if (el) {
      el.scrollLeft = 0;
      el.scrollTop = 0;
      requestAnimationFrame(() => {
        el.scrollLeft = 0;
        el.scrollTop = 0;
      });
    }
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-shelf-item]");
    if (!card) return;
    const want = Math.min(overflow, Math.max(0, card.offsetLeft - 40));
    const top = outer.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + want, behavior: "instant" });
  };

  const counter = (
    <p className={`caption tabular-nums ${dark ? "bg-ink px-1 text-paper" : ""}`} aria-hidden="true">
      <span className={`px-1.5 py-0.5 ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
        {pinned ? String(index).padStart(2, "0") : count}
      </span>
      {pinned ? ` / ${String(count).padStart(2, "0")} ${unit}` : ` ${unit}`}
    </p>
  );

  if (!pinned) {
    return (
      <div>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4">
          {header}
          <div className="flex items-center justify-between">
            {counter}
            <p className={`caption ${dark ? "bg-ink px-1 text-paper" : "text-muted"}`}>Scroll sideways →</p>
          </div>
        </div>
        <div
          ref={track}
          role="region"
          aria-label={regionLabel}
          tabIndex={0}
          className="mt-6 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:thin] [&>*]:shrink-0"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={outer} style={{ height: `calc(100svh - 3.5rem + ${overflow}px)` }} className="relative">
      <div ref={stage} className="shelf-pinned sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col justify-center gap-4 overflow-hidden py-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4">
          {header}
          <div className="flex items-center justify-between gap-4">
            {counter}
            <div aria-hidden="true" className={`relative h-[3px] max-w-xs flex-1 ${dark ? "bg-tone-3" : "bg-tone-1"}`}>
              <motion.div className={`absolute inset-0 origin-left ${dark ? "bg-paper" : "bg-ink"}`} style={{ scaleX: scrollYProgress }} />
            </div>
            <p className={`caption ${dark ? "bg-ink px-1 text-paper" : "text-muted"}`}>Keep scrolling →</p>
          </div>
        </div>
        <motion.div
          ref={track}
          role="region"
          aria-label={regionLabel}
          onFocusCapture={onFocus}
          style={{ x }}
          className="flex gap-6 px-4 [&>*]:shrink-0"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
