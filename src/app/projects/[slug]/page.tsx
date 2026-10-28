import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECT_ART } from "@/components/art/projects";
import { InkCursor } from "@/components/providers/InkCursor";
import { TopBar } from "@/components/sections/TopBar";
import { Footer } from "@/components/sections/Footer";
import { SwingStage } from "@/components/three/Slots";
import { ArchDiagram } from "@/components/ui/ArchDiagram";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { PartPanels } from "@/components/ui/ProjectParts";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.tagline}. ${p.highlights.join(" ")}`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.name, url: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const Art = PROJECT_ART[p.slug as keyof typeof PROJECT_ART];
  const earlier = projects.find((x) => x.slug === p.evolvedFrom);
  const later = projects.find((x) => x.evolvedFrom === p.slug);

  return (
    <>
      <InkCursor />
      <TopBar base="/" />
      <main id="main" className="mx-auto max-w-7xl px-4 pb-16 pt-24">
        <Link href="/#street" className="btn-paper mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} /> Back to projects
        </Link>

        <article aria-labelledby="project-title">
          <header className="panel-ink speed-bg ink-shadow grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col justify-center gap-4">
              <p className="caption text-paper/80">Chapter 03 · File {p.index}</p>
              <h1 id="project-title" className="font-display text-5xl uppercase leading-[0.9] tracking-wide sm:text-7xl">
                {p.name}
              </h1>
              <p className="text-lg font-bold">{p.tagline}</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {p.tech.map((t) => (
                  <li key={t} className="stamp border-paper bg-ink text-paper">{t}</li>
                ))}
              </ul>
              <ProjectLinks links={p.links} name={p.name} dark />
            </div>
            <div className="overflow-hidden border-3 border-paper bg-paper">
              <Art className={`${p.flagship ? "aspect-video" : "aspect-[4/3]"} h-auto w-full`} label={p.alt} />
            </div>
          </header>

          {(earlier || later) && (
            <nav aria-label="Project lineage" className="mt-gutter flex flex-wrap items-center gap-3 border-3 border-ink bg-paper px-4 py-3">
              <span className="caption bg-ink px-1.5 py-0.5 text-paper">Lineage</span>
              {earlier && (
                <>
                  <Link href={`/projects/${earlier.slug}`} className="font-bold underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper">
                    {earlier.name}
                  </Link>
                  <span aria-hidden="true" className="font-mono">→</span>
                  <span className="font-bold">{p.name}</span>
                  <span className="text-sm text-muted">This build is a rewrite of the earlier one.</span>
                </>
              )}
              {later && (
                <>
                  <span className="font-bold">{p.name}</span>
                  <span aria-hidden="true" className="font-mono">→</span>
                  <Link href={`/projects/${later.slug}`} className="font-bold underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper">
                    {later.name}
                  </Link>
                  <span className="text-sm text-muted">The next version rebuilds it as separate, tested parts.</span>
                </>
              )}
            </nav>
          )}

          {p.parts && (
            <section aria-labelledby="parts-title" className="mt-10">
              <h2 id="parts-title" className="mb-4 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                The {p.parts.length} parts
              </h2>
              <PartPanels parts={p.parts} />
            </section>
          )}

          <div className="mt-8 grid gap-gutter lg:grid-cols-12">
            <Rise className="panel p-6 lg:col-span-5">
              <h2 className="caption mb-3 border-b-3 border-ink pb-2">The goal</h2>
              <p className="text-lg leading-relaxed">{p.goal}</p>
            </Rise>
            <Rise delay={0.08} className="panel p-6 lg:col-span-7">
              <h2 className="caption mb-3 border-b-3 border-ink pb-2">Implementation</h2>
              <ol className="flex flex-col gap-3">
                {p.points.map((pt, n) => (
                  <li key={pt} className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-muted">{String(n + 1).padStart(2, "0")}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ol>
            </Rise>
          </div>

          {p.note && (
            <p className="mt-gutter border-3 border-ink bg-paper-2 p-4 text-sm">
              <strong className="caption mr-2">Note</strong>
              {p.note}
            </p>
          )}

          <Reveal className="mt-10 scroll-mt-20">
            <h2 id="architecture" className="mb-4 font-display text-3xl uppercase tracking-wide sm:text-4xl">Architecture</h2>
            <ArchDiagram arch={p.architecture} title={p.name} />
          </Reveal>

          {p.flagship && (
            <section aria-labelledby="demo-title" className="mt-12">
              <h2 id="demo-title" className="mb-4 font-display text-3xl uppercase tracking-wide sm:text-4xl">
                Swing visualization
              </h2>
              <SwingStage />
            </section>
          )}
        </article>

        <nav aria-label="Project navigation" className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-3 border-ink pt-6">
          <Link href="/#street" className="btn-paper">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} /> Back to projects
          </Link>
          <Link href={`/projects/${next.slug}`} className="btn-ink" data-cursor="NEXT">
            Next file: {next.name} →
          </Link>
        </nav>
      </main>
      <Footer base="/" />
    </>
  );
}
