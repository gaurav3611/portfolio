"use client";

import { ArrowRight, Check, Copy, Mail, Phone, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ClosingSkyline } from "@/components/art/ClosingSkyline";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ChapterHeading } from "@/components/ui/ChapterHeading";
import { Reveal, Rise } from "@/components/ui/Reveal";
import { experience, missions, projects, site } from "@/lib/data";

/** Chapters 04 + 05: pick a mission, then brief it. One component so the choice carries over. */
export function MissionControl() {
  const [active, setActive] = useState(missions[0].id);
  const [chosen, setChosen] = useState("");
  const [copy, setCopy] = useState<"idle" | "ok" | "fail">("idle");
  const [error, setError] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const m = missions.find((x) => x.id === active)!;
  const builds = projects.filter((p) => m.builds.includes(p.slug));

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + missions.length) % missions.length;
    setActive(missions[n].id);
    tabs.current[n]?.focus();
  };

  const choose = () => {
    setChosen(m.id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    // Focus after the scroll starts so the field is ready to type into.
    setTimeout(() => messageRef.current?.focus({ preventScroll: true }), 600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopy("ok");
    } catch {
      setCopy("fail");
    }
  };

  // No server: the brief is handed to the visitor's own email app via mailto.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const mission = missions.find((x) => x.id === f.get("mission"));
    if (!message) {
      setError("Write a short message so there's something to reply to.");
      messageRef.current?.focus();
      return;
    }
    setError("");
    const subject = `${mission ? `[${mission.name}] ` : ""}Project enquiry${name ? ` from ${name}` : ""}`;
    const body = `${message}${name ? `\n\n— ${name}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section id="missions" aria-labelledby="missions-title" className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <ChapterHeading num="04" chapter="CHAPTER 04 — MISSIONS" title="Select your mission." id="missions-title" />

        <div className="mt-gutter grid gap-gutter lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div role="tablist" aria-label="Missions" aria-orientation="vertical" className="flex flex-col gap-gutter">
            {missions.map((x, i) => {
              const on = x.id === active;
              return (
                <button
                  key={x.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${x.id}`}
                  aria-selected={on}
                  aria-controls="mission-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(x.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  data-cursor="SELECT"
                  className={`group flex items-center gap-4 border-3 border-ink px-4 py-4 text-left transition-transform ${
                    on ? "translate-x-2 bg-ink text-paper shadow-[6px_6px_0_var(--tone-3)]" : "bg-paper hover:translate-x-1 hover:bg-paper-2"
                  }`}
                >
                  <span className={`font-display text-4xl leading-none ${on ? "text-outline" : "text-outline-ink"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl uppercase leading-tight tracking-wide">{x.name}</span>
                  {on && <span aria-hidden="true" className="ml-auto font-mono text-xl">▶</span>}
                </button>
              );
            })}
          </div>

          <div id="mission-panel" role="tabpanel" aria-labelledby={`tab-${m.id}`} className="panel ink-shadow flex flex-col">
            <div className="tone-light flex items-center justify-between border-b-3 border-ink px-5 py-3">
              <p className="caption bg-paper px-1.5">Mission briefing</p>
              <p className="caption bg-paper px-1.5">{m.name}</p>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
              <p className="text-lg leading-relaxed">{m.brief}</p>
              <div>
                <h3 className="caption mb-2">Loadout</h3>
                <ul className="flex flex-wrap gap-2">
                  {m.loadout.map((t) => (
                    <li key={t} className="stamp">{t}</li>
                  ))}
                </ul>
              </div>
              {(builds.length > 0 || m.experience) && (
                <div>
                  <h3 className="caption mb-2">Done before</h3>
                  <ul className="flex flex-col gap-2">
                    {builds.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`} className="flex items-center justify-between gap-3 border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper">
                          <span>
                            <span className="caption mr-2">{p.index}</span>
                            <span className="font-bold">{p.name}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                        </Link>
                      </li>
                    ))}
                    {m.experience && (
                      <li className="border-2 border-dashed border-ink px-3 py-2">
                        <span className="caption mr-2">Field log</span>
                        <span className="font-bold">{experience.role}, {experience.company}</span>
                        <span className="text-sm"> · Java/Spring Boot backend and TypeScript frontend work</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              <button type="button" onClick={choose} className="btn-ink mt-auto w-fit" data-cursor="GO">
                Choose this mission <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:pt-24">
        <ChapterHeading num="05" chapter="CHAPTER 05 — THE NEXT CHAPTER" title="Have a project in mind?" id="contact-title" />

        <div className="panel relative mt-gutter overflow-hidden">
          <div className="relative z-10 grid gap-8 p-5 pb-44 sm:p-10 sm:pb-72 lg:grid-cols-[1fr_1fr] [&>*]:min-w-0">
            <Rise className="flex flex-col gap-6">
              <div className="relative h-fit border-3 border-ink bg-paper px-6 py-6 ink-shadow [border-radius:48%_52%_46%_54%/40%_42%_58%_60%]">
                <p className="text-center font-display text-3xl uppercase leading-tight tracking-wide sm:text-4xl">Let&rsquo;s build something meaningful.</p>
                <span aria-hidden="true" className="absolute -bottom-6 right-[30%] h-0 w-0 border-l-[14px] border-r-[6px] border-t-[26px] border-l-transparent border-r-transparent border-t-ink" />
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <a href={`mailto:${site.email}`} className="btn-ink w-fit">
                  <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} /> Send an Email
                </a>
                <div className="flex flex-col gap-1">
                  <p className="caption text-muted">Email</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`mailto:${site.email}`} className="inline-block break-all py-1 font-mono text-[13px] font-bold underline decoration-2 underline-offset-4 min-[360px]:text-base">
                      {site.email}
                    </a>
                    <button type="button" onClick={copyEmail} className="btn-paper px-3 py-1.5" aria-label="Copy email address">
                      {copy === "ok" ? <Check className="h-4 w-4" aria-hidden="true" /> : copy === "fail" ? <X className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                      Copy
                    </button>
                  </div>
                  <p role="status" className="min-h-5 font-mono text-xs font-bold">
                    {copy === "ok" && "Copied to clipboard."}
                    {copy === "fail" && "Couldn't copy — your browser blocked clipboard access. Select the address above instead."}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="caption text-muted">Phone</p>
                  <a href={site.phoneHref} className="flex w-fit items-center gap-2 font-mono text-lg font-bold underline decoration-2 underline-offset-4">
                    <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} /> {site.phone}
                  </a>
                </div>
                <ul className="flex flex-wrap gap-3">
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn-paper">
                      <LinkedinIcon className="h-4 w-4" /> LinkedIn <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                  <li>
                    <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-paper">
                      <GithubIcon className="h-4 w-4" /> GitHub <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Rise>

            <Rise delay={0.1}>
              <form onSubmit={submit} noValidate className="flex flex-col gap-4 border-3 border-ink bg-paper p-5 ink-shadow">
                <h3 className="font-display text-2xl uppercase tracking-wide">Mission brief</h3>
                <label className="flex flex-col gap-1">
                  <span className="caption">Mission</span>
                  <select
                    name="mission"
                    value={chosen}
                    onChange={(e) => setChosen(e.target.value)}
                    className="min-h-11 border-3 border-ink bg-paper px-3 font-mono text-sm font-bold"
                  >
                    <option value="">Not sure yet</option>
                    {missions.map((x) => (
                      <option key={x.id} value={x.id}>{x.name}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="caption">Your name (optional)</span>
                  <input name="name" autoComplete="name" className="min-h-11 border-3 border-ink bg-paper px-3" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="caption">Message</span>
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows={5}
                    aria-invalid={error ? true : undefined}
                    aria-describedby="brief-help brief-error"
                    className="border-3 border-ink bg-paper px-3 py-2"
                  />
                </label>
                <p id="brief-error" role="alert" className="min-h-5 font-mono text-xs font-bold">
                  {error && <span className="bg-ink px-1.5 py-0.5 text-paper">! {error}</span>}
                </p>
                <button type="submit" className="btn-ink w-fit" data-cursor="WRITE">
                  <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} /> Open in my email app
                </button>
                <p id="brief-help" className="text-xs text-muted">
                  This opens your own email app with the brief filled in. Nothing is sent from this page.
                </p>
              </form>
            </Rise>
          </div>
          <Reveal className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64">
            <ClosingSkyline className="h-full w-full" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
