"use client";

import { useSide } from "@/components/providers/side";
import { SideToggle } from "@/components/ui/SideToggle";
import { sides } from "@/lib/data";

/** Equipped loadout — swaps with the page-wide front/back toggle. */
export function Loadout() {
  const side = useSide();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="caption">Equipped loadout · {sides[side].tag}</h4>
        <SideToggle />
      </div>
      <ul aria-live="polite" className="flex flex-wrap gap-2">
        {sides[side].loadout.map((s) => (
          <li key={s} className="stamp">{s}</li>
        ))}
      </ul>
    </div>
  );
}
