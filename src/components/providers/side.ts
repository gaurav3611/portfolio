"use client";

import { useSyncExternalStore } from "react";
import type { Side } from "@/lib/data";

/** Page-wide front/back toggle. Mirrored to <html data-side> so CSS can react. */
let side: Side = "front";
const listeners = new Set<() => void>();

export function setSide(next: Side) {
  side = next;
  document.documentElement.dataset.side = next;
  listeners.forEach((l) => l());
}

export function useSide() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => side,
    () => "front" as Side,
  );
}
