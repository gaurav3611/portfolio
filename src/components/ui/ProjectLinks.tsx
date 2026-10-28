import { Download, ExternalLink } from "lucide-react";
import type { ProjectLink } from "@/lib/data";
import { GithubIcon } from "./BrandIcons";

const ICON = { repo: GithubIcon, demo: ExternalLink, download: Download } as const;
const VERB = { repo: "source code", demo: "live demo", download: "download" } as const;

/** Verified repo/demo/download links. Renders nothing when a project has none public. */
export function ProjectLinks({ links, name, dark = false }: { links?: ProjectLink[]; name: string; dark?: boolean }) {
  if (!links?.length) return null;
  return (
    // relative z-10 keeps these above a card's stretched "View Project" link
    <ul className="relative z-10 flex flex-wrap gap-2" aria-label={`Links for ${name}`}>
      {links.map((l) => {
        const Icon = ICON[l.kind];
        return (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-9 items-center gap-1.5 border-2 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide transition-colors ${
                l.kind === "demo"
                  ? dark
                    ? "border-paper bg-paper text-ink hover:bg-ink hover:text-paper"
                    : "border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
                  : dark
                    ? "border-paper text-paper hover:bg-paper hover:text-ink"
                    : "border-ink bg-paper text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2.5} />
              {l.label}
              <span className="sr-only">
                {" "}({VERB[l.kind]} for {name}, opens in a new tab)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
