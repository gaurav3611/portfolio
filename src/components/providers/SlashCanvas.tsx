"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type SlashHandle = {
  begin(x: number, y: number): void;
  extend(x: number, y: number): void;
  end(): void;
  /** Spark burst where a slash connects with the core. */
  burst(x: number, y: number, angle: number): void;
};

type Point = { x: number; y: number; t: number };
type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
};

const SPARK_COLORS = ["#f43f5e", "#fb7185", "#16a34a", "#fecdd3"];
const BLADE_LIFE = 170; // ms a blade point stays visible

/**
 * The "blade": a hot white streak with a cyan glow following the pointer
 * while slashing, plus physical spark bursts when a cut lands.
 * Pure canvas + refs — no React state, nothing re-renders per frame.
 */
export const SlashCanvas = forwardRef<SlashHandle>(function SlashCanvas(
  _props,
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<{ pts: Point[]; active: boolean; sparks: Spark[] }>({
    pts: [],
    active: false,
    sparks: [],
  });

  useImperativeHandle(
    ref,
    () => ({
      begin(x, y) {
        state.current.active = true;
        state.current.pts = [{ x, y, t: performance.now() }];
      },
      extend(x, y) {
        if (!state.current.active) return;
        const pts = state.current.pts;
        pts.push({ x, y, t: performance.now() });
        if (pts.length > 40) pts.shift();
      },
      end() {
        state.current.active = false;
      },
      burst(x, y, angle) {
        const sparks = state.current.sparks;
        for (let i = 0; i < 30; i++) {
          // sparks fly out roughly perpendicular to the cut, both sides
          const side = i % 2 === 0 ? 1 : -1;
          const a =
            angle + side * (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
          const speed = 180 + Math.random() * 620;
          sparks.push({
            x,
            y,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            life: 0,
            max: 0.4 + Math.random() * 0.45,
            color: SPARK_COLORS[i % SPARK_COLORS.length],
          });
        }
      },
    }),
    []
  );

  useEffect(() => {
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

    let raf = 0;
    let last = performance.now();
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const s = state.current;
      // expire old blade points even while holding still
      while (s.pts.length && now - s.pts[0].t > BLADE_LIFE) s.pts.shift();

      // ── blade streak: glow pass then hot core ──
      if (s.pts.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (const pass of [0, 1] as const) {
          for (let i = 1; i < s.pts.length; i++) {
            const p0 = s.pts[i - 1];
            const p1 = s.pts[i];
            const age = (now - p1.t) / BLADE_LIFE;
            const head = i / s.pts.length;
            const fade = Math.max(0, 1 - age) * head;
            if (pass === 0) {
              ctx.strokeStyle = "#f43f5e";
              ctx.globalAlpha = fade * 0.35;
              ctx.lineWidth = 3 + fade * 16;
            } else {
              ctx.strokeStyle = "#ffffff";
              ctx.globalAlpha = fade * 0.95;
              ctx.lineWidth = 1 + fade * 6;
            }
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      // ── sparks: tiny glowing streaks with gravity & drag ──
      if (s.sparks.length) {
        for (let i = s.sparks.length - 1; i >= 0; i--) {
          const sp = s.sparks[i];
          sp.life += dt;
          if (sp.life >= sp.max) {
            s.sparks.splice(i, 1);
            continue;
          }
          sp.vy += 700 * dt; // gravity
          sp.vx *= 1 - 1.6 * dt; // drag
          sp.vy *= 1 - 0.4 * dt;
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          const k = 1 - sp.life / sp.max;
          ctx.strokeStyle = sp.color;
          ctx.globalAlpha = k;
          ctx.lineWidth = 1 + k * 1.6;
          ctx.beginPath();
          ctx.moveTo(sp.x, sp.y);
          ctx.lineTo(sp.x - sp.vx * 0.02, sp.y - sp.vy * 0.02);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-5"
    />
  );
});
