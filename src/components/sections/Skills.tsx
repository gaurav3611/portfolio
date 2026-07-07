"use client";

import {
  BrainCircuit,
  ChartSpline,
  Cloud,
  Code2,
  Cpu,
  Database,
  LayoutDashboard,
  Network,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  Code2,
  LayoutDashboard,
  Server,
  Database,
  Cloud,
  Cpu,
  BrainCircuit,
  Network,
  ChartSpline,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Technical Skills"
        title="Depth where it matters, range where it helps"
        lead="Not a logo wall — these are the tools I've used to ship the systems below, grouped the way I actually think about them."
      />

      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {skillGroups.map((group) => {
          const Icon = icons[group.icon] ?? Code2;
          return (
            <RevealItem key={group.title}>
              <div className="card group h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-foreground/8 bg-surface-2/60 px-3 py-1.5 text-sm text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-md hover:shadow-primary/10"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
