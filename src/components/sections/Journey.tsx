"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="journey" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Journey"
        title="From first principles to full systems"
        lead="Every stage added a layer: fundamentals, interfaces, hardware, reliability, scale. This is how the stack got built — in me, not just in the projects."
      />

      <ol ref={trackRef} className="relative ml-2 md:ml-10">
        {/* rail + animated progress */}
        <div className="absolute top-1 bottom-1 left-0 w-px bg-foreground/10" />
        <motion.div
          className="absolute top-1 left-0 w-px origin-top bg-linear-to-b from-primary via-secondary to-accent"
          style={{ scaleY: progress, height: "calc(100% - 8px)" }}
        />

        {journey.map((step, i) => (
          <li key={step.year} className="relative pb-12 pl-10 last:pb-0 md:pl-16">
            <span className="absolute top-1.5 -left-[5px] size-[11px] rounded-full border-2 border-background bg-primary shadow-[0_0_12px_rgb(59_130_246/0.8)]" />
            <Reveal delay={Math.min(i * 0.04, 0.2)}>
              <p className="font-mono text-sm tracking-widest text-accent">
                {step.year}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
