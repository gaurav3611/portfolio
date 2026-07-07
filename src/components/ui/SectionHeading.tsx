"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`mb-14 md:mb-20 ${centered ? "text-center" : ""}`}>
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-sm tracking-[0.25em] text-primary uppercase">
          {!centered && (
            <motion.span
              className="h-px w-8 origin-left bg-primary/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          )}
          <span className={centered ? "w-full" : ""}>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-muted ${
              centered ? "mx-auto" : ""
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
