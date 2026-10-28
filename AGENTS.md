<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Gaurav Gandhi — Portfolio ("Vol. 1", a manga volume)

Single-page portfolio plus four static project pages, art-directed as one
original black-and-white manga. Repo: https://github.com/gaurav3611/portfolio (`main`).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**: tokens and `@utility` classes (`panel`, `tone-*`, `hatch`, `btn-ink`, `stamp`…) in `src/app/globals.css`
- **Framer Motion 12**: only the scroll-linked shelf, the header progress bar and the diagram trace. Reveals and the cover entrance are **pure CSS** (see Gotchas).
- **React Three Fiber 9 + drei + three**: one scene only, the cricket swing (`three/SwingScene`). The decorative cover core was removed on purpose; don't add decorative 3D back.
- **Lenis**: smooth wheel scroll; native keyboard scroll; disabled for reduced motion
- **lucide-react**: UI icons (v1 has no brand icons; GitHub/LinkedIn are in `ui/BrandIcons.tsx`)

## Architecture

- `src/lib/data.ts`: **all content**. Only facts Gaurav supplied, or facts read from the project's own README. Never invent metrics, links, results or repo URLs.
- `Project.parts` (multi-part builds, e.g. SSwinGG) replace the tag wall on cards with linked part tiles and add a "parts" section to the project page. Each part carries its own honest `status`. `Project.evolvedFrom` links a rewrite to its earlier build in both directions.
- `Project.links`: only URLs checked to load publicly (repo, live demo, download). Private or unpublished projects get no links, and their `note` says so. `Autopats-Hub` is deliberately **not** linked to Automate Hub, because its description doesn't match; confirm with Gaurav before linking.
- `src/app/`: `page.tsx` (home), `projects/[slug]/page.tsx` (SSG), `not-found.tsx`, `error.tsx`, `icon.svg`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`
- `src/components/art/`: every illustration, as inline SVG. `InkDefs` (in the root layout) holds the shared patterns `#ht-light/#ht-mid/#ht-dark/#hatch/#xhatch/#grid/#arrow`.
- `src/components/sections/`: TopBar (links, scroll %, live Vellore clock, mobile menu, 2xl chapter rail), Cover, Street (front: pinned sideways shelf of builds), Underground (back: data-path cards + FinFactor log), Player (character sheet + Loadout), MissionControl (mission tabs + contact/mailto brief form), Footer
- `src/components/providers/side.ts`: page-wide Front/Back store, mirrored to `<html data-side>`
- `src/components/ui/HorizontalShelf.tsx`: pinned horizontal scroll on md+ with motion allowed; otherwise a native snap scroller. Focusing an off-screen card scrolls the page to it.
- `src/components/three/`: scenes plus `Slots.tsx` (WebGL detection, mount-near-viewport, error boundary, static fallbacks)
- `src/components/ui/`: Reveal/Rise, ChapterHeading, ArchDiagram (interactive architecture), InkLoader, hooks
- `docs/visual-assets.md`: **required** inventory of every visual. Update it whenever you add or change art.

## Design rules

- Pure monochrome: ink `#0b0b0b` on paper `#f3f0e8`, grayscale tones. **No accent colour.** Show emphasis with inversion, stroke weight and ink-vs-grey contrast.
- No photos, stock art, gradients-as-decoration, glassmorphism, portraits or franchise characters.
- Essential text is always HTML, never baked into art.
- Light theme only.

## Gotchas

- **Reveals are CSS-only.** `ui/Reveal.tsx` renders plain elements with `.reveal-wipe` or `.reveal-rise`, driven by `animation-timeline: view()` inside `@supports`. Unsupported browsers, reduced motion and no-JS all just show content. Don't move reveals back to JS: Framer reveals cost about 2.2s of blocking time on mobile and hid content until hydration.
- **Cover name uses `.rise-solid`** (transform only, never `opacity: 0`) so it can be the LCP at first paint.
- **Fonts must be Latin-only.** CJK Google fonts (Zen Kaku, Dela Gothic) generate hundreds of `@font-face` rules plus preloads. That was ~270 KB of render-blocking CSS and ~120 preloaded files, and it took mobile LCP to 14s. Current faces: Anton, IBM Plex Sans, Bowlby One, JetBrains Mono.
- Native shelf children need `shrink-0`, or every card squashes to its minimum width.
- The contact form has no backend. It builds a `mailto:` URL and says so. Never show a "sent" state.
- Never put `backdrop-filter`/`transform` on the fixed header: it becomes the containing block and breaks the fixed mobile menu.
- Grid items holding canvases or SVGs need `min-w-0`, or mobile layout widens.
- React Compiler lint: no impure calls in render (use `art/prng.ts`), `useMemo(() => fn())` with an inline function, no setState in effects except subscriptions.
- The THREE.Clock deprecation warning comes from R3F internals, not app code.
- Port 3000/3001 are often busy on this machine: `npm run dev -- -p 3002`.

## Commands

- `npm run dev -- -p 3002`, `npm run build`, `npm run lint` (build and lint must stay clean)
- Verification (Playwright, axe-core and Lighthouse, all installed in the session scratchpad, not the repo):
  - The layout audit checks text clipping, children escaping cards, targets under 24px, text under 11px and horizontal scroll, at 8 widths.
  - axe runs WCAG 2.2 AA plus best-practice rules.
  - Lighthouse runs mobile and desktop.
  - The swing is checked frame by frame on Playwright's virtual clock.

## Swing scene rules

- The timeline is deterministic (`poseAt(t)`). Everything (smear, arcs, impact frame) is derived from it, never animated independently.
- The frame loop mutates Three objects and DOM through refs. Never set React state per frame (the only state updates are `onStart` and `onEnd`, once per swing).
- `frameloop="demand"`: the scene renders only while a swing runs.

## Open items

- Domain: `site.url` defaults to https://gauravgandhi.dev (the homepage set on this repo); `NEXT_PUBLIC_SITE_URL` overrides it.
- Automate Hub has no confirmed repository.
