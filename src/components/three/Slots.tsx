"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useRef, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { CricketArt } from "@/components/art/projects/CricketArt";
import { InkLoader } from "@/components/ui/InkLoader";
import { useNearViewport, useReducedMotion, useWebGL } from "@/components/ui/hooks";
import { ImpactBurst } from "./ImpactBurst";

const SwingScene = dynamic(() => import("./SwingScene"), {
  ssr: false,
  loading: () => <InkLoader className="absolute inset-0" />,
});

/** Falls back to the static illustration if WebGL throws after detection. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** A12 stage: the swing demo, its impact overlay, the replay control and the honesty label. */
export function SwingStage({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const webgl = useWebGL();
  const still = useReducedMotion();
  const [replay, setReplay] = useState(0);
  const [swinging, setSwinging] = useState(false);
  const [played, setPlayed] = useState(false);
  const burst = useRef<HTMLDivElement>(null);
  const [ref, near] = useNearViewport<HTMLDivElement>("100px");
  const onStart = useCallback(() => {
    setSwinging(true);
    setPlayed(true);
  }, []);
  const onEnd = useCallback(() => setSwinging(false), []);
  const fallback = (
    <div className="absolute inset-0 flex flex-col">
      <CricketArt className="h-full w-full" />
      <p role="status" className="caption absolute inset-x-0 bottom-0 bg-ink px-3 py-2 text-paper">
        3D preview unavailable — showing the illustrated swing instead.
      </p>
    </div>
  );
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div
        ref={ref}
        className={`panel relative w-full overflow-hidden ${compact ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/10]"}`}
      >
        {webgl === false && fallback}
        {webgl && near && (
          <SceneBoundary fallback={fallback}>
            <SwingScene replay={replay} autoplay={!played} still={still} burst={burst} onStart={onStart} onEnd={onEnd} />
          </SceneBoundary>
        )}
        {/* Impact frame: positioned and played by the scene at the exact contact frame */}
        <div
          ref={burst}
          aria-hidden="true"
          style={{ transform: "translate(-50%,-50%)" }}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[46%] max-w-[260px] opacity-0"
        >
          <ImpactBurst className="h-auto w-full" />
        </div>
        <span className="caption pointer-events-none absolute left-0 top-0 bg-paper px-2 py-1 outline-2 outline-ink">
          Illustrative demo — not live sensor data
        </span>
      </div>
      {webgl !== false && (
        <div className={compact ? "contents" : "flex flex-wrap items-center justify-between gap-3"}>
          {still ? (
            <p className="text-sm text-muted">Reduced motion is on — showing the contact frame as a still.</p>
          ) : (
            <button
              type="button"
              // compact (card) stage: the control sits on the stage to keep the card short
              className={`btn-ink disabled:cursor-wait disabled:opacity-60 ${compact ? "-mt-14 ml-2 w-fit self-start" : ""} relative z-10`}
              onClick={() => setReplay((r) => r + 1)}
              disabled={swinging}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
              {swinging ? "Swinging…" : "Replay Swing"}
            </button>
          )}
          {!compact && <p className="text-sm text-muted">No Bluetooth device is connected or requested.</p>}
        </div>
      )}
    </div>
  );
}
