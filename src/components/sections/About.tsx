"use client";

import { Compass, Gauge, Layers, Rocket } from "lucide-react";
import { about, site } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const pillarIcons = [Compass, Gauge, Layers, Rocket];

export function About() {
  return (
    <section id="about" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="About"
        title="Engineer first. Curious always."
      />

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Portrait card */}
        <Reveal className="lg:sticky lg:top-28">
          <TiltCard className="group">
            <div className="card overflow-hidden p-2">
              <div className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary/45 via-secondary/15 to-accent/35">
                {/* Photo placeholder — drop /public/portrait.jpg and swap this block for an <Image> */}
                <span className="font-display text-8xl font-bold text-foreground/15 select-none">
                  GG
                </span>
                <div className="absolute inset-x-4 bottom-4 rounded-xl p-4 glass">
                  <p className="font-display font-semibold">{site.shortName}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {site.role} · {site.location}
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Story */}
        <div>
          <Reveal>
            <p className="text-2xl leading-snug font-medium text-foreground md:text-[1.7rem]">
              {about.intro}
            </p>
          </Reveal>
          <div className="mt-8 space-y-6">
            {about.story.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {about.philosophy.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <RevealItem key={p.title}>
                  <div className="card h-full p-6">
                    <Icon className="size-5 text-primary" />
                    <h3 className="mt-4 font-display font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
