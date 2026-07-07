"use client";

import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Education"
        title="Studying systems while building them"
      />

      <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.08}>
        {education.map((ed) => (
          <RevealItem key={ed.degree}>
            <div
              className={`card relative h-full overflow-hidden p-7 ${
                ed.current ? "border-primary/30" : ""
              }`}
            >
              {ed.current && (
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
              )}
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="size-5" />
                </span>
                {ed.current && (
                  <span className="rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    In progress
                  </span>
                )}
              </div>
              <p className="mt-5 font-mono text-xs tracking-widest text-accent uppercase">
                {ed.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {ed.degree}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {ed.school}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {ed.detail}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
