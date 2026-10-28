"use client";

import { useSide } from "@/components/providers/side";
import { sides } from "@/lib/data";

/** The cover's one-line description of the current Front/Back side. */
export function SideLine() {
  const side = useSide();
  return (
    <p aria-live="polite" className="max-w-md text-sm leading-relaxed">
      <span className="caption mr-2 text-muted">{sides[side].tag}</span>
      {sides[side].line}
    </p>
  );
}
