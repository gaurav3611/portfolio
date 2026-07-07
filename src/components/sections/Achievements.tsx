"use client";

import {
  ArrowUpRight,
  BookOpenCheck,
  GitBranch,
  Rocket,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { achievements, site } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  GitBranch,
  Trophy,
  BookOpenCheck,
  Rocket,
};

export function Achievements() {
  return (
    <section id="achievements" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Achievements & Activity"
        title="Proof of work"
      />

      {/* counters band */}
      <Reveal>
        <div className="card grid grid-cols-2 gap-y-10 p-8 md:grid-cols-4 md:p-12">
          {achievements.counters.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display text-4xl font-bold md:text-5xl">
                <Counter value={c.value} suffix={c.suffix} className="text-gradient" />
              </p>
              <p className="mx-auto mt-2 max-w-36 text-sm leading-snug text-muted">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {achievements.cards.map((cardItem) => {
          const Icon = icons[cardItem.icon] ?? Trophy;
          const inner = (
            <div className="card group h-full p-6">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Icon className="size-5" />
                </span>
                {cardItem.link && (
                  <ArrowUpRight className="size-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                )}
              </div>
              <h3 className="mt-4 font-display font-semibold">
                {cardItem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {cardItem.body}
              </p>
            </div>
          );
          return (
            <RevealItem key={cardItem.title}>
              {cardItem.link ? (
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
