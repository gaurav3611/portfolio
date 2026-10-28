import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PROJECT_ART } from "@/components/art/projects";
import { SwingStage } from "@/components/three/Slots";
import { ChapterHeading } from "@/components/ui/ChapterHeading";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { PartTiles } from "@/components/ui/ProjectParts";
import { HorizontalShelf } from "@/components/ui/HorizontalShelf";
import { projects, type Project } from "@/lib/data";

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="stamp text-[11px]">{t}</li>
      ))}
    </ul>
  );
}

/** One storefront in the street: the build as people meet it. */
function Storefront({ p }: { p: Project }) {
  const Art = PROJECT_ART[p.slug as keyof typeof PROJECT_ART];
  const body = (
    <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
      <h3 className="font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">{p.name}</h3>
      <p className="text-sm font-bold">{p.tagline}</p>
      {/* Multi-part builds show their parts (each linking to its repo) instead of a tag wall */}
      {p.parts ? <PartTiles parts={p.parts} project={p.name} /> : <Tech items={p.tech} />}
      {p.flagship && (
        <ul className="flex flex-col gap-1 text-sm">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-ink" />
              {h}
            </li>
          ))}
        </ul>
      )}
      <ProjectLinks links={p.parts ? p.links?.filter((l) => l.kind !== "repo") : p.links} name={p.name} />
      <div className="relative mt-auto pt-1">
        <Link href={`/projects/${p.slug}`} className="btn-ink whitespace-nowrap after:absolute after:inset-0 after:content-['']" aria-label={`View project: ${p.name}`}>
          View Project <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
  return (
    <article
      data-shelf-item
      className={`group panel ink-shadow flex snap-start flex-col ${p.flagship ? "w-[88vw] md:w-[min(820px,64vw)]" : "w-[80vw] sm:w-[380px] md:w-[min(420px,34vw)]"}`}
    >
      <div className="flex items-center justify-between border-b-3 border-ink px-4 py-2">
        <p className="caption">File {p.index}</p>
        {p.flagship && <p className="caption bg-ink px-1.5 text-paper">Flagship</p>}
      </div>
      {p.flagship ? (
        // Stage beside the text on wide screens so the card fits the pinned viewport.
        <div className="flex flex-1 flex-col md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="border-b-3 border-ink p-3 md:border-b-0 md:border-r-3">
            <SwingStage compact />
          </div>
          {body}
        </div>
      ) : (
        <>
          <div data-cursor="VIEW" data-shelf-art className="overflow-hidden border-b-3 border-ink">
            <Art className="aspect-[16/10] h-auto w-full" label={p.alt} />
          </div>
          {body}
        </>
      )}
    </article>
  );
}

/** Chapter 01 — the front: a sideways walk past every build. */
export function Street() {
  return (
    <section id="street" aria-labelledby="street-title" className="py-16 sm:py-20 md:py-0">
      <HorizontalShelf
        regionLabel="Project gallery, scroll sideways"
        unit="built"
        header={
          <>
            <ChapterHeading num="01" chapter="CHAPTER 01 — STREET LEVEL" title="The front is what people see." id="street-title" />
            <p data-intro className="max-w-2xl border-l-4 border-ink pl-4">
              {projects.length} builds, from bat sensors and Android apps to a research simulator. Walk past each one, then open it to see the problem, architecture and implementation.
            </p>
          </>
        }
      >
        {projects.map((p) => (
          <Storefront key={p.slug} p={p} />
        ))}
      </HorizontalShelf>
    </section>
  );
}
