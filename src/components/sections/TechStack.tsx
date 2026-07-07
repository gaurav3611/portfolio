"use client";

import { techStack } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const dotColors = ["bg-primary", "bg-secondary", "bg-accent"];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // duplicated list = seamless loop at -50% translate
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className={`flex w-max gap-3 py-2 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-2.5 rounded-xl border border-foreground/8 bg-surface px-5 py-3 font-mono text-sm whitespace-nowrap text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <span
              className={`size-1.5 rounded-full ${dotColors[i % dotColors.length]}`}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Tech Stack"
          title="The toolbox"
          lead="Everything here has shipped in at least one real project — no résumé keywords, no drive-by tutorials."
        />
      </div>
      <Reveal>
        <div
          className="space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        >
          <MarqueeRow items={techStack[0]} />
          <MarqueeRow items={techStack[1]} reverse />
        </div>
      </Reveal>
    </section>
  );
}
