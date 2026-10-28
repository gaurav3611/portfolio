import { ArrowUpRight, Cpu, Monitor, Server, Smartphone } from "lucide-react";
import type { ProjectPart } from "@/lib/data";
import { GithubIcon } from "./BrandIcons";

const ICON = { web: Monitor, api: Server, mobile: Smartphone, hardware: Cpu } as const;

/** Card variant: a 2×2 grid of parts, each tile linking to its own repository. */
export function PartTiles({ parts, project }: { parts: ProjectPart[]; project: string }) {
  return (
    // relative z-10 keeps the tiles above the card's stretched "View Project" link
    <ul className="relative z-10 grid grid-cols-2 gap-2" aria-label={`Parts of ${project}`}>
      {parts.map((p) => {
        const Icon = ICON[p.kind];
        const body = (
          <>
            <span className="flex items-center justify-between gap-2">
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2.25} />
              {p.url && <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover/tile:opacity-100" aria-hidden="true" />}
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wide">{p.name}</span>
            <span className="text-[11px] leading-snug text-muted group-hover/tile:text-paper/80">{p.stack.slice(0, 2).join(" · ")}</span>
          </>
        );
        const cls = "group/tile flex h-full min-h-11 flex-col gap-1 border-2 border-ink bg-paper p-2 transition-colors";
        return (
          <li key={p.name}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-ink hover:text-paper`}>
                {body}
                <span className="sr-only"> (source code for the {p.name}, opens in a new tab)</span>
              </a>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Page variant: one manga panel per part, with its stack, job and honest status. */
export function PartPanels({ parts }: { parts: ProjectPart[] }) {
  return (
    <ol className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-4">
      {parts.map((p, i) => {
        const Icon = ICON[p.kind];
        return (
          <li key={p.name} className="panel ink-shadow flex flex-col">
            <div className="flex items-center justify-between border-b-3 border-ink px-4 py-3">
              <span aria-hidden="true" className="text-outline-ink font-display text-4xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-paper">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={2.25} />
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wide">{p.name}</h3>
              <ul className="flex flex-wrap gap-1.5" aria-label={`${p.name} stack`}>
                {p.stack.map((t) => (
                  <li key={t} className="stamp text-[11px]">{t}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed">{p.does}</p>
              <p className="mt-auto border-l-4 border-ink bg-paper-2 py-1.5 pl-2.5 pr-2 text-xs">
                <span className="caption mr-1.5">Status</span>
                {p.status}
              </p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 w-fit items-center gap-1.5 border-2 border-ink px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide hover:bg-ink hover:text-paper"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> Repository
                  <span className="sr-only"> for the {p.name} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
