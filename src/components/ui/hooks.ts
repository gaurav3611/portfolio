"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

let webglCache: boolean | null = null;
function detectWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}
const noop = () => () => {};

/** null on the server / first paint, then true|false once known. */
export function useWebGL(): boolean | null {
  return useSyncExternalStore(noop, detectWebGL, () => null);
}

function mq(query: string) {
  return {
    subscribe: (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(query).matches,
  };
}

export function useMediaQuery(query: string, serverValue = false) {
  const { subscribe, get } = mq(query);
  return useSyncExternalStore(subscribe, get, () => serverValue);
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** True while the element is near the viewport — used to mount/unmount 3D scenes. */
export function useNearViewport<T extends Element>(margin = "200px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, near] as const;
}
