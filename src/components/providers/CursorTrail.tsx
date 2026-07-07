"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#3b82f6", "#06b6d4", "#10b981"];
const LIFE_MS = 550;
const MAX_POINTS = 70;

/**
 * A comet-style trail behind the cursor: recent pointer positions drawn as a
 * tapering polyline that cycles through the brand palette and fades out.
 * Plain 2D canvas — one clear + ~60 line segments per frame, effectively free.
 * Skipped entirely on touch devices and for reduced-motion users.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts: { x: number; y: number; t: number }[] = [];
    const move = (e: PointerEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > MAX_POINTS) pts.shift();
    };
    window.addEventListener("pointermove", move, { passive: true });

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const now = performance.now();
      while (pts.length && now - pts[0].t > LIFE_MS) pts.shift();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (pts.length < 2) return;

      const dark = document.documentElement.dataset.theme === "dark";
      // additive blending makes the trail glow on the dark theme
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const age = (now - p1.t) / LIFE_MS; // 0 = fresh, 1 = expired
        const head = i / pts.length; // 0 = tail, 1 = cursor
        ctx.globalAlpha = Math.max(0, (1 - age) * head * (dark ? 0.55 : 0.6));
        ctx.lineWidth = Math.max(0.5, (1 - age) * head * 7);
        ctx.strokeStyle =
          COLORS[Math.floor(head * (COLORS.length - 0.001))];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
    />
  );
}
