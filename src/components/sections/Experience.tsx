"use client";

import { experience } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Experience"
        title="How I've worked, not just where"
        lead="Industry experience in fintech, plus deep project ownership — real systems, collaboration under pressure, and work that shipped."
      />

      <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.07}>
        {experience.map((exp, i) => (
          <RevealItem key={exp.title} className={i === 0 ? "md:col-span-2" : ""}>
            <div className="card h-full p-7">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">
                {exp.period}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {exp.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{exp.org}</p>
              <ul className="mt-4 space-y-3">
                {exp.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
