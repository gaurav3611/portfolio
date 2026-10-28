"use client";

import { setSide, useSide } from "@/components/providers/side";
import { sides, type Side } from "@/lib/data";

/** FRONT ⇄ BACK switch, styled as two stamped tabs. Shared state across the page. */
export function SideToggle({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const side = useSide();
  return (
    <div role="radiogroup" aria-label="Show the front or the back" className={`inline-flex border-3 ${dark ? "border-paper" : "border-ink"} ${className}`}>
      {(Object.keys(sides) as Side[]).map((k) => {
        const on = side === k;
        return (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setSide(k)}
            className={`min-h-11 px-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
              on ? (dark ? "bg-paper text-ink" : "bg-ink text-paper") : dark ? "text-paper hover:bg-paper/15" : "text-ink hover:bg-paper-2"
            }`}
          >
            {on && <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 bg-current align-middle" />}
            {sides[k].label}
          </button>
        );
      })}
    </div>
  );
}
