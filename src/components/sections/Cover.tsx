import { ArrowDown, Mail } from "lucide-react";
import { CoverCity } from "@/components/art/CoverCity";
import { SpeedLines } from "@/components/art/SpeedLines";
import { SideToggle } from "@/components/ui/SideToggle";
import { cover, site } from "@/lib/data";
import { SideLine } from "./SideLine";

const NAME = site.name.split(" ");
// CSS-only entrance: starts on first paint, so the title never waits for JavaScript.
const step = (i: number) => ({
  "data-reveal": true,
  style: { "--delay": `${(0.15 + i * 0.08).toFixed(2)}s`, "--rise": "24px" } as React.CSSProperties,
});

/** Scene 1: the cover. */
export function Cover() {
  return (
    <section id="cover" aria-labelledby="cover-title" className="relative overflow-hidden bg-paper pt-14">
      <div className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-7xl border-x-3 border-ink md:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
        <SpeedLines />

        {/* Title block */}
        <div className="relative z-10 flex flex-col justify-center gap-5 px-5 py-10 sm:px-8 md:py-16">
          <p {...step(0)} className="rise caption inline-flex w-fit bg-ink px-2 py-1 text-paper">
            {cover.chapter}
          </p>
          <h1 id="cover-title" className="font-display uppercase leading-[0.86] tracking-wide">
            {NAME.map((w, i) => (
              <span
                key={w}
                {...step(i + 1)}
                className={`rise-solid block text-[clamp(3.4rem,13vw,8.5rem)] md:text-[clamp(4rem,8.4vw,8.5rem)] ${i === 1 ? "text-outline-ink" : ""}`}
              >
                {w}
              </span>
            ))}
          </h1>
          <div {...step(4)} className="rise relative w-fit max-w-md border-3 border-ink bg-paper px-4 py-3 ink-shadow">
            {cover.headline.map((l) => (
              <p key={l} className="font-display text-xl uppercase leading-tight tracking-wide sm:text-2xl">
                {l}
              </p>
            ))}
            {/* speech-balloon tail */}
            <span aria-hidden="true" className="absolute -bottom-[15px] left-8 h-0 w-0 border-x-[10px] border-t-[14px] border-x-transparent border-t-ink" />
          </div>
          <p {...step(5)} className="rise pt-2 font-mono text-sm font-bold">
            {cover.role}
          </p>
          <div {...step(6)} className="rise flex flex-col gap-3 border-l-4 border-ink pl-4">
            <SideToggle className="w-fit" />
            <SideLine />
          </div>
          <div {...step(7)} className="rise flex flex-wrap gap-3">
            <a href="#street" className="btn-ink" data-cursor="OPEN">
              Explore My Work <ArrowDown className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
            </a>
            <a href="#contact" className="btn-paper">
              Contact Me <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative min-h-[46svh] border-t-3 border-ink md:min-h-0 md:border-l-3 md:border-t-0">
          <CoverCity className="absolute inset-0 h-full w-full" />
          <a href="#street" className="caption absolute bottom-4 left-4 z-10 hidden bg-ink px-2 py-1 text-paper md:block">
            Scroll down ↓
          </a>
        </div>

        {/* Ink-panel reveal: a black page lifts away once on load (CSS) */}
        <div aria-hidden="true" className="ink-lift pointer-events-none absolute inset-0 z-20 bg-ink motion-reduce:hidden" />
      </div>
    </section>
  );
}
