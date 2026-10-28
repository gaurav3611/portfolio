import { OriginDesk } from "@/components/art/OriginDesk";
import { ToolkitGlyph } from "@/components/art/ToolkitGlyphs";
import { BooksEmblem, CampusEmblem } from "@/components/art/TimelineEmblems";
import { ChapterHeading } from "@/components/ui/ChapterHeading";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { education, experience, origin, player, site, skills } from "@/lib/data";
import { Loadout } from "./Loadout";

const [vit, pu] = education;

/** Chapter 03 — character sheet: profile, stats, loadout, and the story so far. */
export function Player() {
  return (
    <section id="player" aria-labelledby="player-title" className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <ChapterHeading num="03" chapter="CHAPTER 03 — PLAYER 1" title={origin.title} id="player-title" />

      <div className="mt-gutter grid gap-gutter lg:grid-cols-12">
        {/* Character card */}
        <Reveal as="article" className="panel ink-shadow flex flex-col lg:col-span-7">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-3 border-ink p-5">
            <div>
              <p className="caption text-muted">Character sheet</p>
              <h3 className="font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl">Player 1</h3>
            </div>
            <p className="caption bg-ink px-2 py-1 text-paper">{site.location}</p>
          </div>
          <div className="grid border-b-3 border-ink sm:grid-cols-[1.1fr_1fr]">
            <div className="border-b-3 border-ink sm:border-b-0 sm:border-r-3">
              <OriginDesk className="h-full w-full" />
            </div>
            <dl className="grid content-start gap-x-4 gap-y-2 p-5 font-mono text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-bold">Name</dt>
              <dd>{site.name}</dd>
              <dt className="font-bold">Class</dt>
              <dd>{site.role}</dd>
              <dt className="font-bold">Status</dt>
              <dd>{player.status}</dd>
            </dl>
          </div>
          <div className="flex flex-col gap-2 border-b-3 border-ink p-5">
            {origin.lines.map((l, i) => (
              <p key={l} className={i === 0 ? "font-display text-2xl uppercase tracking-wide" : "leading-relaxed"}>
                {l}
              </p>
            ))}
          </div>
          <ul className="grid grid-cols-2 border-b-3 border-ink sm:grid-cols-4">
            {player.stats.map((s, i) => (
              <li key={s.label} className={`flex flex-col gap-1 p-4 ${i % 2 ? "" : "border-r-3 border-ink"} ${i < 2 ? "border-b-3 sm:border-b-0" : ""} sm:border-r-3 sm:last:border-r-0`}>
                <span className="font-display text-4xl leading-none">{s.value}</span>
                <span className="caption text-muted">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 p-5">
            <Loadout />
            <details className="group border-3 border-ink">
              <summary className="caption flex min-h-11 cursor-pointer list-none items-center justify-between px-3 hover:bg-paper-2">
                Full inventory · {skills.length} categories
                <span aria-hidden="true" className="font-display text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-px border-t-3 border-ink bg-ink sm:grid-cols-2">
                {skills.map((s) => (
                  <div key={s.id} className="flex flex-col gap-2 bg-paper p-3">
                    <div className="flex items-center gap-2">
                      <ToolkitGlyph id={s.id} className="h-7 w-7 shrink-0" />
                      <h5 className="font-display text-lg uppercase tracking-wide">{s.title}</h5>
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <li key={it} className="stamp text-[11px]">{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </Reveal>

        {/* Story so far */}
        <div className="flex flex-col gap-gutter lg:col-span-5">
          <h3 className="caption inline-block w-fit border-b-3 border-ink pb-1">The story so far</h3>
          <ol className="relative flex flex-col gap-gutter border-l-3 border-ink pl-5">
            <Rise as="li" className="panel p-4">
              <StoryHead step="Ep. 1" date={pu.date} title={pu.school} />
              <div className="mt-2 flex items-start justify-between gap-3">
                <div className="text-sm">
                  <p className="font-bold">{pu.place}</p>
                  <p>{pu.degree}</p>
                  <p className="mt-2 w-fit bg-ink px-2 py-0.5 font-mono font-bold text-paper">{pu.score}</p>
                </div>
                <BooksEmblem className="h-20 w-auto shrink-0" />
              </div>
            </Rise>
            <Rise as="li" delay={0.05} className="panel p-4">
              <StoryHead step="Ep. 2" date={vit.date} title={vit.school} />
              <div className="mt-2 flex items-start justify-between gap-3">
                <div className="text-sm">
                  <p className="font-bold">{vit.place}</p>
                  <p>{vit.degree}</p>
                  <p className="mt-2 w-fit bg-ink px-2 py-0.5 font-mono font-bold text-paper">{vit.score}</p>
                </div>
                <CampusEmblem className="h-20 w-auto shrink-0" />
              </div>
              <p className="caption mt-3 text-muted">Relevant coursework</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {vit.coursework.map((c) => (
                  <li key={c} className="stamp text-[11px]">{c}</li>
                ))}
              </ul>
            </Rise>
            <Rise as="li" delay={0.1} className="panel-ink p-4">
              <StoryHead step="Ep. 3" date={experience.date} title={`${experience.company} · ${experience.role}`} dark />
              <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                {experience.detail.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-paper" />
                    {d}
                  </li>
                ))}
              </ul>
            </Rise>
          </ol>
        </div>
      </div>
    </section>
  );
}

function StoryHead({ step, date, title, dark = false }: { step: string; date: string; title: string; dark?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className={`caption px-1.5 ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>{step}</span>
        <span className="caption">{date}</span>
      </div>
      <h4 className="mt-2 font-display text-2xl uppercase leading-tight tracking-wide">{title}</h4>
    </div>
  );
}
