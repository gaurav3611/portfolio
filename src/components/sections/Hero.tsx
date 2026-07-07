"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Magnetic } from "@/components/ui/MagneticButton";
import { useGate } from "@/components/providers/GateProvider";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

/** Word-by-word headline reveal — plays once the entry gate opens. */
function Headline({ entered }: { entered: boolean }) {
  return (
    <h1 className="font-display text-5xl leading-[1.04] font-bold tracking-tight text-balance sm:text-6xl md:text-7xl xl:text-[5.25rem]">
      {hero.headline.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-1">
          {line.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              className={`inline-block ${
                li === 1 ? "text-gradient" : "text-foreground"
              }`}
              initial={{ y: "110%", rotate: 3 }}
              animate={entered ? { y: 0, rotate: 0 } : { y: "110%", rotate: 3 }}
              transition={{
                duration: 0.85,
                delay: entered ? 0.35 + li * 0.15 + wi * 0.06 : 0,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {word}
              {" "}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/** Cycles through role titles under the headline. */
function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-6 items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-medium whitespace-nowrap text-accent"
        >
          {hero.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { entered } = useGate();
  const sectionRef = useRef<HTMLElement>(null);
  // scene recedes as you scroll past the hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      duration: 0.7,
      delay: entered ? delay : 0,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* 3D background */}
      <motion.div
        style={{ opacity: bgOpacity, scale: bgScale }}
        className="absolute inset-0"
      >
        <HeroScene />
        {/* vignette so text always sits on solid contrast */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_35%_45%,transparent_30%,var(--color-background)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
      </motion.div>

      <div className="section-shell relative z-10 w-full pt-28 pb-16">
        <motion.p
          {...fadeUp(0.2)}
          className="mb-6 flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-muted uppercase"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {hero.eyebrow}
        </motion.p>

        <Headline entered={entered} />

        <motion.p
          {...fadeUp(1.1)}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.p {...fadeUp(1.25)} className="mt-4 text-base text-muted">
          <span className="text-foreground/70">Currently operating as a</span>{" "}
          <RoleTicker />
        </motion.p>

        <motion.div
          {...fadeUp(1.4)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href={site.resumeUrl}
              download
              className="group flex items-center gap-2.5 rounded-2xl bg-linear-to-r from-primary to-secondary px-7 py-4 font-semibold text-white shadow-xl shadow-primary/30 transition-shadow hover:shadow-primary/50"
            >
              <Download className="size-4.5 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#projects"
              className="group flex items-center gap-2.5 rounded-2xl border border-foreground/15 px-7 py-4 font-semibold text-foreground transition-colors hover:border-foreground/35 hover:bg-foreground/5"
            >
              View Projects
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-2.5 rounded-2xl px-5 py-4 font-semibold text-muted transition-colors hover:text-foreground"
            >
              <Mail className="size-4.5" />
              Contact Me
            </a>
          </Magnetic>
        </motion.div>

        {/* stats */}
        <motion.dl
          {...fadeUp(1.6)}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4"
        >
          {hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-bold md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} enabled={entered} />
              </dd>
              <dd className="mt-1.5 text-sm leading-snug text-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: entered ? 2 : 0, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-muted"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
