import { Reveal } from "./Reveal";

/** A22 chapter title plate: black plate, hollow numeral, caption strip, real heading. */
export function ChapterHeading({
  num,
  chapter,
  title,
  id,
  inverse = false,
}: {
  num: string;
  chapter: string;
  title: string;
  id: string;
  /** Paper plate, for chapters set on a dark page. */
  inverse?: boolean;
}) {
  return (
    <Reveal className={`${inverse ? "panel text-ink shadow-[6px_6px_0_var(--paper)]" : "panel-ink speed-bg ink-shadow"} flex items-stretch overflow-hidden`}>
      <span
        aria-hidden="true"
        data-numeral
        className={`${inverse ? "text-outline-ink border-ink" : "text-outline border-paper/80"} flex shrink-0 items-center border-r-3 px-4 font-display text-6xl leading-none sm:px-6 sm:text-8xl`}
      >
        {num}
      </span>
      <div className="flex min-w-0 flex-col justify-center gap-2 px-4 py-4 sm:px-6 sm:py-6">
        <p className={`caption ${inverse ? "text-muted" : "text-paper/85"}`}>{chapter}</p>
        <h2 id={id} className="font-display text-3xl uppercase leading-[0.95] tracking-wide sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
