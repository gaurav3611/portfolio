import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FieldLog } from "@/components/art/FieldLog";
import { ChapterHeading } from "@/components/ui/ChapterHeading";
import { HorizontalShelf } from "@/components/ui/HorizontalShelf";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { experience, projects, type Project } from "@/lib/data";

/** An engine card: the main data path of a build, top to bottom. */
function Engine({ p }: { p: Project }) {
  const chain = p.architecture.trace.map((id) => p.architecture.nodes.find((n) => n.id === id)!);
  const repos = p.links?.filter((l) => l.kind === "repo") ?? [];
  return (
    <article data-shelf-item className="flex w-[80vw] snap-start flex-col border-3 border-paper bg-ink text-paper sm:w-[340px] md:w-[min(360px,30vw)]">
      <div className="flex items-center justify-between border-b-3 border-paper/70 px-4 py-2">
        <p className="caption">Engine {p.index}</p>
        <p className="caption text-paper/70">Architecture</p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="font-display text-2xl uppercase leading-none tracking-wide">{p.name}</h3>
        <ol className="tone-dark flex flex-col items-stretch border-2 border-paper/60 p-3" aria-label="Main data path">
          {chain.map((n, i) => (
            <li key={n.id} className="flex flex-col items-center">
              {i > 0 && <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2.5} />}
              {/* label and sub on one line keeps long paths (6 nodes) inside a pinned card */}
              <span className="flex w-full items-baseline justify-between gap-2 border-2 border-paper bg-ink px-2 py-1 font-mono text-xs font-bold uppercase">
                {n.label}
                {n.sub && <span className="truncate text-[11px] font-normal normal-case text-paper/80">{n.sub}</span>}
              </span>
            </li>
          ))}
        </ol>
        {repos.length > 1 ? (
          // Multi-repo builds: one line here; the Street card and project page list each repo.
          <p className="caption flex min-h-9 items-center gap-2 text-paper/85">
            <span className="bg-paper px-1.5 py-0.5 text-ink">{repos.length}</span> repositories · listed on the project page
          </p>
        ) : (
          <ProjectLinks links={repos} name={p.name} dark />
        )}
        <div className="relative mt-auto">
          <Link
            href={`/projects/${p.slug}#architecture`}
            className="btn-paper after:absolute after:inset-0 after:content-['']"
            aria-label={`Inspect the architecture of ${p.name}`}
          >
            Inspect <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Chapter 02 — the back: the systems underneath, plus the FinFactor field log. */
export function Underground() {
  return (
    <section id="underground" aria-labelledby="underground-title" className="border-y-3 border-ink bg-ink py-16 text-paper sm:py-20 md:py-0">
      <HorizontalShelf
        regionLabel="Architecture gallery, scroll sideways"
        unit="engines"
        dark
        header={
          <>
            <ChapterHeading num="02" chapter="CHAPTER 02 — UNDERGROUND" title="Below the street, the machinery." id="underground-title" inverse />
            <p data-intro className="max-w-2xl border-l-4 border-paper bg-ink/80 py-1 pl-4 text-paper">
              Every front needs a back: services, databases, protocols and storage. These are the main data paths behind each build, and the backend work from the FinFactor internship.
            </p>
          </>
        }
      >
        {projects.map((p) => (
          <Engine key={p.slug} p={p} />
        ))}
        <article data-shelf-item className="panel flex w-[86vw] snap-start flex-col text-ink sm:w-[520px] md:w-[min(600px,48vw)]">
          <div className="flex items-center justify-between border-b-3 border-ink px-4 py-2">
            <p className="caption">Field log · 02-A</p>
            <p className="caption bg-ink px-1.5 text-paper">{experience.date}</p>
          </div>
          <div className="tone-light border-b-3 border-ink">
            <FieldLog className="h-auto w-full" />
          </div>
          <div className="flex flex-col gap-2 p-4 sm:p-5">
            <h3 className="font-display text-2xl uppercase leading-none tracking-wide">
              {experience.role} · {experience.company}
            </h3>
            <ul className="grid gap-1 text-sm sm:grid-cols-2">
              {experience.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-ink" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </HorizontalShelf>
    </section>
  );
}
