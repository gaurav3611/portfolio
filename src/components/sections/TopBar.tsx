"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { chapters } from "@/lib/data";

const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
}
/** Live Vellore time (IST). Rendered client-side only to avoid a hydration mismatch. */
function useVelloreTime() {
  return useSyncExternalStore(subscribeMinute, () => fmt.format(new Date()), () => null);
}

/** Header: logo, chapter links, scroll %, local clock; numbered rail on wide screens. */
export function TopBar({ base = "" }: { base?: string }) {
  const [active, setActive] = useState<string>(base ? "street" : "cover");
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const time = useVelloreTime();
  const { scrollYProgress } = useScroll();
  const pct = useTransform(scrollYProgress, (v) => `${String(Math.round(v * 100)).padStart(2, "0")}%`);

  useEffect(() => {
    if (base) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [base]);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* No transform/backdrop-filter here: the fixed mobile menu must stay viewport-relative. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b-3 border-ink bg-paper">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href={`${base}#cover`} className="flex items-center gap-2 font-display text-xl uppercase tracking-wide">
            <span className="bg-ink px-1.5 text-paper">GNG</span>
            <span className="caption hidden sm:inline">Vol. 1</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {[
                { id: "cover", label: "Index" },
                { id: "street", label: "Work" },
                { id: "contact", label: "Contact" },
              ].map((l) => (
                <li key={l.id}>
                  <a href={`${base}#${l.id}`} className="caption px-2 py-2 hover:bg-ink hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <p className="caption hidden items-center gap-2 sm:flex" aria-label="Local time in Vellore">
              <span className="text-muted">Vellore</span>
              <span className="min-w-[3.2rem] bg-ink px-1.5 py-0.5 text-paper tabular-nums">{time ?? "--:--"}</span>
            </p>
            <p className="caption tabular-nums" aria-hidden="true">
              <motion.span>{pct}</motion.span>
            </p>
            <button
              ref={menuBtn}
              type="button"
              className="flex h-11 w-11 items-center justify-center border-3 border-ink bg-paper 2xl:hidden"
              aria-expanded={open}
              aria-controls="chapter-menu"
              aria-label={open ? "Close chapter menu" : "Open chapter menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X strokeWidth={2.5} aria-hidden="true" /> : <Menu strokeWidth={2.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <motion.div aria-hidden="true" className="h-[3px] origin-left bg-ink" style={{ scaleX: scrollYProgress }} />

        {open && (
          <div id="chapter-menu" className="panel-ink speed-bg fixed inset-x-0 bottom-0 top-14 overflow-y-auto border-x-0 2xl:hidden">
            <ol className="flex flex-col gap-2 p-4">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`${base}#${c.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === c.id ? "location" : undefined}
                    className="group flex items-center gap-4 border-2 border-paper/70 bg-ink px-4 py-3 hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink"
                  >
                    <span className="text-outline font-display text-4xl leading-none group-hover:[-webkit-text-stroke-color:var(--ink)] group-focus-visible:[-webkit-text-stroke-color:var(--ink)]">{c.num}</span>
                    <span className="font-display text-2xl uppercase tracking-wide">{c.label}</span>
                    {active === c.id && <span aria-hidden="true" className="ml-auto h-3 w-3 bg-paper" />}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </header>

      {/* Numbered chapter rail — only where the 7xl column leaves room beside it */}
      <nav aria-label="Chapters" className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
        <ol className="flex flex-col border-y-3 border-r-3 border-ink bg-paper">
          {chapters.map((c) => {
            const on = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={`${base}#${c.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`group relative flex h-11 w-12 items-center justify-center font-mono text-xs font-bold ${on ? "bg-ink text-paper" : "hover:bg-paper-2"}`}
                >
                  {c.num}
                  {on && <span aria-hidden="true" className="absolute right-0 top-0 h-full w-[3px] bg-paper" />}
                  <span className="caption pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap border-2 border-ink bg-paper px-2 py-1 text-ink group-hover:block group-focus-visible:block">
                    {c.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
