"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Architecture } from "@/lib/data";
import { useReducedMotion } from "./hooks";

/* Viewbox sizes match the container aspect ratios so strokes scale uniformly. */
const WIDE = { w: 200, h: 100 };
const TALL = { w: 100, h: 140 };

type Layout = "wide" | "tall";

function pt(a: Architecture, id: string, layout: Layout) {
  const n = a.nodes.find((n) => n.id === id)!;
  const box = layout === "wide" ? WIDE : TALL;
  const [x, y] = n[layout];
  return { x: (x / 100) * box.w, y: (y / 100) * box.h };
}

/** A11: interactive architecture illustration. Nodes are real buttons; the SVG is decoration. */
export function ArchDiagram({ arch, title }: { arch: Architecture; title: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  const tracing = run > 0;
  const traceEdges = new Set(arch.trace.slice(1).map((id, i) => `${arch.trace[i]}>${id}`));
  const active = arch.nodes.find((n) => n.id === selected);

  const edgeOn = (from: string, to: string) =>
    (selected !== null && (from === selected || to === selected)) || (tracing && traceEdges.has(`${from}>${to}`));

  const renderSvg = (layout: Layout, className: string) => {
    const box = layout === "wide" ? WIDE : TALL;
    const dots = arch.trace.map((id) => pt(arch, id, layout));
    return (
      <svg viewBox={`0 0 ${box.w} ${box.h}`} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
        <defs>
          {/* Local markers sized in user units — the shared ones scale with stroke width. */}
          {(["ink", "tone"] as const).map((k) => (
            <marker key={k} id={`ad-${layout}-${k}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" markerUnits="userSpaceOnUse" orient="auto">
              <path d="M0 0L10 5L0 10z" fill={k === "ink" ? "#0b0b0b" : "#5e5a53"} />
            </marker>
          ))}
        </defs>
        <rect width={box.w} height={box.h} fill="url(#grid)" opacity="0.7" />
        {arch.edges.map(([from, to, label]) => {
          const a = pt(arch, from, layout);
          const b = pt(arch, to, layout);
          const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          const on = edgeOn(from, to);
          return (
            <g key={`${from}-${to}`}>
              <polyline
                points={`${a.x},${a.y} ${m.x},${m.y} ${b.x},${b.y}`}
                fill="none"
                stroke={on ? "#0b0b0b" : "#5e5a53"}
                strokeWidth={on ? 1.8 : 0.7}
                strokeDasharray={label === "coord" ? "2 1.5" : undefined}
                markerMid={`url(#ad-${layout}-${on ? "ink" : "tone"})`}
                style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
              />
              {label && (
                <text x={m.x + 2} y={m.y - 2.5} fontSize="3" fontFamily="var(--font-mono)" fontWeight="700" fill="#0b0b0b">
                  {label.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}
        {tracing && !reduced && (
          <motion.circle
            key={run}
            r="2.4"
            fill="#0b0b0b"
            stroke="#f3f0e8"
            strokeWidth="0.9"
            initial={{ cx: dots[0].x, cy: dots[0].y }}
            animate={{ cx: dots.map((d) => d.x), cy: dots.map((d) => d.y) }}
            transition={{ duration: 0.6 * dots.length, ease: "easeInOut" }}
            onAnimationComplete={() => setRun(0)}
          />
        )}
      </svg>
    );
  };

  return (
    <figure className="flex flex-col gap-3">
      <div className="panel relative aspect-[5/7] w-full overflow-hidden sm:aspect-[2/1]">
        {renderSvg("tall", "sm:hidden")}
        {renderSvg("wide", "hidden sm:block")}
        {arch.nodes.map((n) => {
          const on = n.id === selected || (tracing && arch.trace.includes(n.id));
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={n.id === selected}
              onClick={() => setSelected(n.id)}
              onMouseEnter={() => setSelected(n.id)}
              onFocus={() => setSelected(n.id)}
              data-cursor="INSPECT"
              className={`absolute left-[var(--tx)] top-[var(--ty)] flex min-h-11 w-[44%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border-2 px-1.5 py-1 text-center leading-tight transition-colors sm:left-[var(--wx)] sm:top-[var(--wy)] sm:w-[18%] ${
                on ? "border-ink bg-ink text-paper" : "border-ink bg-paper text-ink hover:bg-paper-2"
              }`}
              style={
                {
                  "--tx": `${n.tall[0]}%`,
                  "--ty": `${n.tall[1]}%`,
                  "--wx": `${n.wide[0]}%`,
                  "--wy": `${n.wide[1]}%`,
                  boxShadow: "3px 3px 0 #0b0b0b",
                } as React.CSSProperties
              }
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-wide lg:text-xs">{n.label}</span>
              {n.sub && <span className="hidden text-[11px] opacity-85 lg:block">{n.sub}</span>}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p aria-live="polite" className="min-h-12 flex-1 border-l-4 border-ink pl-3 text-sm">
          {active ? (
            <>
              <strong className="font-mono uppercase">{active.label}</strong> — {active.purpose}
            </>
          ) : (
            "Select a component to see its role."
          )}
        </p>
        <button type="button" className="btn-paper shrink-0" onClick={() => setRun((r) => (reduced ? (r ? 0 : 1) : r + 1))} disabled={tracing && !reduced}>
          Trace a request
        </button>
      </div>
      <figcaption className="caption text-muted">
        Architecture illustration — not a live system · {title}
      </figcaption>
      <ol className="sr-only">
        {arch.trace.map((id) => {
          const n = arch.nodes.find((x) => x.id === id)!;
          return <li key={id}>{`${n.label}: ${n.purpose}`}</li>;
        })}
      </ol>
    </figure>
  );
}
