"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Crosshair,
  Hammer,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { projects, type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

/* ── Abstract line-art covers, one motif per project ─────────── */

function CoverArt({ kind }: { kind: Project["cover"] }) {
  const stroke = "rgb(255 255 255 / 0.35)";
  const strokeFaint = "rgb(255 255 255 / 0.14)";
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      {kind === "swing" && (
        <>
          {/* swing-path ribbons */}
          <path d="M40 200 Q 140 40 360 60" stroke={stroke} strokeWidth="2" />
          <path d="M40 210 Q 150 70 360 90" stroke={strokeFaint} strokeWidth="2" />
          <path d="M40 220 Q 160 100 360 120" stroke={strokeFaint} strokeWidth="2" />
          <circle cx="308" cy="66" r="5" fill="#fff" fillOpacity="0.7" />
          <circle cx="308" cy="66" r="14" stroke={stroke} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="70" cy="185" r={10 + i * 9} stroke={strokeFaint} />
          ))}
        </>
      )}
      {kind === "distributed" && (
        <>
          {/* node mesh */}
          {[
            [80, 60], [200, 40], [320, 70], [120, 160], [250, 180], [340, 150],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#fff" fillOpacity="0.55" />
              <circle cx={x} cy={y} r="16" stroke={strokeFaint} />
            </g>
          ))}
          {[
            [80, 60, 200, 40], [200, 40, 320, 70], [80, 60, 120, 160],
            [200, 40, 250, 180], [320, 70, 340, 150], [120, 160, 250, 180],
            [250, 180, 340, 150], [200, 40, 120, 160],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeFaint} />
          ))}
        </>
      )}
      {kind === "health" && (
        <>
          {/* heartbeat + content-addressed blocks */}
          <path
            d="M20 130 H120 L145 80 L175 175 L200 110 L215 130 H380"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {[250, 288, 326].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={40}
              width="28"
              height="28"
              rx="6"
              stroke={i === 1 ? stroke : strokeFaint}
            />
          ))}
          <path d="M264 68 v14 M302 68 v14 M340 68 v14" stroke={strokeFaint} />
        </>
      )}
      {kind === "iot" && (
        <>
          {/* radiating alert waves */}
          {[24, 48, 76, 108].map((r, i) => (
            <circle key={i} cx="110" cy="150" r={r} stroke={i < 2 ? stroke : strokeFaint} />
          ))}
          <circle cx="110" cy="150" r="8" fill="#fff" fillOpacity="0.7" />
          <path d="M230 70 l14 -28 l14 28 z" stroke={stroke} />
          <path d="M300 180 q 20 -40 0 -80 M330 190 q 28 -50 0 -100" stroke={strokeFaint} />
        </>
      )}
      {kind === "automation" && (
        <>
          {/* step chain */}
          {[40, 130, 220, 310].map((x, i) => (
            <rect key={i} x={x} y={i % 2 ? 130 : 80} width="52" height="36" rx="9"
              stroke={i === 3 ? stroke : strokeFaint} />
          ))}
          <path d="M92 98 H118 M130 130 l-12 -14 M182 148 H208 M220 130 l-12 14 M272 116 l26 -14"
            stroke={stroke} />
          <circle cx="66" cy="60" r="3" fill="#fff" fillOpacity="0.6" />
          <circle cx="66" cy="98" r="0" />
        </>
      )}
    </svg>
  );
}

/* ── Shared bits for the case-study body ──────────────────────── */

function Label({
  icon: Icon,
  children,
}: {
  icon?: typeof Target;
  children: React.ReactNode;
}) {
  return (
    <h4 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
      {Icon && <Icon className="size-3.5" />} {children}
    </h4>
  );
}

const blockStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const blockItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/* ── Architecture flow: chips joined by arrows ────────────────── */

function FlowDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {nodes.map((node, i) => (
        <span key={node} className="flex items-center">
          <span className="rounded-lg border border-foreground/12 bg-surface-2/70 px-3 py-1.5 font-mono text-xs text-foreground/85">
            {node}
          </span>
          {i < nodes.length - 1 && (
            <ArrowRight className="mx-1.5 size-3.5 shrink-0 text-primary/70" />
          )}
        </span>
      ))}
    </div>
  );
}

/* ── One full case study ──────────────────────────────────────── */

function CaseStudy({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Reveal>
      <article className="card overflow-hidden p-6 md:p-10">
        {/* header */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-bold text-foreground/10 md:text-6xl">
                {project.index}
              </span>
              <div>
                {project.flagship && (
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                    <Sparkles className="size-3" /> Flagship project
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
                  {project.title}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {project.tagline}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-foreground/10 px-2.5 py-1 font-mono text-xs text-foreground/70"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* cover */}
          <TiltCard className="group w-full">
            <div
              className={`relative aspect-5/3 overflow-hidden rounded-2xl bg-linear-to-br ${project.gradient} opacity-90`}
            >
              <div className="absolute inset-0 bg-black/50" />
              <CoverArt kind={project.cover} />
              <span className="absolute top-4 left-4 font-mono text-xs tracking-widest text-white/70">
                {project.year}
              </span>
            </div>
            {/* metrics under the cover */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-foreground/8 bg-surface-2/50 p-3 text-center"
                >
                  <p className="font-display text-base font-bold text-foreground md:text-lg">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* problem — always visible */}
        <div className="mt-8 border-t border-foreground/8 pt-8">
          <h4 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            <Target className="size-3.5" /> The problem
          </h4>
          <p className="mt-3 max-w-3xl leading-relaxed text-foreground/85">
            {project.problem}
          </p>
        </div>

        {/* expandable full case study */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <motion.div
                className="mt-8 space-y-12"
                variants={blockStagger}
                initial="hidden"
                animate="visible"
              >
                {/* goal + key features */}
                <motion.section
                  variants={blockItem}
                  className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                >
                  <div className="rounded-2xl border-l-2 border-primary bg-primary/5 p-6">
                    <Label icon={Crosshair}>The goal</Label>
                    <p className="mt-3 leading-relaxed text-foreground/85">
                      {project.goal}
                    </p>
                  </div>
                  <div className="pt-1">
                    <Label>Key features</Label>
                    <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.section>

                {/* architecture */}
                <motion.section variants={blockItem}>
                  <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    Architecture
                  </h4>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {project.architecture.map((a, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-foreground/8 bg-surface-2/40 p-5"
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-foreground/8 bg-background/60 p-4">
                    <p className="mb-3 font-mono text-[11px] tracking-widest text-muted uppercase">
                      Data flow
                    </p>
                    <FlowDiagram nodes={project.flow} />
                  </div>
                </motion.section>

                {/* development process */}
                <motion.section variants={blockItem}>
                  <Label icon={Hammer}>How it was built</Label>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {project.process.map((step, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-foreground/8 bg-surface-2/40 p-5"
                      >
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </motion.section>

                {/* challenges */}
                <motion.section variants={blockItem}>
                  <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    Challenges → solutions
                  </h4>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {project.challenges.map((c) => (
                      <div
                        key={c.title}
                        className="rounded-xl border border-foreground/8 bg-surface-2/40 p-5"
                      >
                        <h5 className="font-display text-sm font-semibold text-foreground">
                          {c.title}
                        </h5>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {c.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* lessons + results & impact */}
                <motion.section
                  variants={blockItem}
                  className="grid gap-6 lg:grid-cols-2"
                >
                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
                      <Lightbulb className="size-3.5" /> What it taught me
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {project.lessons.map((l, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
                      <TrendingUp className="size-3.5" /> Results & impact
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {project.results.map((r, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-sm leading-relaxed text-foreground/85"
                        >
                          <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-foreground/8 pt-4 text-sm leading-relaxed text-muted">
                      {project.impact}
                    </p>
                    {project.future && (
                      <>
                        <p className="mt-5 font-mono text-[11px] tracking-widest text-muted uppercase">
                          Next up
                        </p>
                        <ul className="mt-2 space-y-2">
                          {project.future.map((f, i) => (
                            <li key={i} className="flex gap-3 text-sm text-muted">
                              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </motion.section>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-8 flex items-center gap-2 rounded-xl border border-foreground/12 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-primary/10"
          aria-expanded={open}
        >
          {open ? "Collapse case study" : "Read the full case study"}
          <ChevronDown
            className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-shell py-28 md:py-36">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects, treated as products"
        lead="Five systems, built end to end. Each one is documented the way I built it: the problem, the architecture, the parts that fought back, and what shipped."
      />
      <div className="space-y-8 md:space-y-12">
        {projects.map((p, i) => (
          <CaseStudy key={p.id} project={p} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}
