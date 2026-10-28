import { site } from "@/lib/data";

/** Back cover. */
export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10">
      <div className="panel-ink flex flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl uppercase tracking-wide">{site.name}</p>
        <p className="caption text-paper/80">Vol. 1 · Vellore, India · Fin.</p>
        <a href={`${base}#cover`} className="caption inline-flex min-h-11 items-center underline decoration-2 underline-offset-4">Back to cover ↑</a>
      </div>
    </footer>
  );
}
