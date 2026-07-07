<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Gaurav Gandhi — Portfolio

Single-page personal portfolio, built as a premium interactive product.
Live repo: https://github.com/gaurav3611/portfolio (branch `main`).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `@theme inline` in `src/app/globals.css`
- **Framer Motion 12** — all UI animation (reveals, magnetic buttons, gate overlay)
- **React Three Fiber 9 + drei + three** — all 3D scenes
- **Lenis** — smooth scrolling (`SmoothScroll` provider)
- **lucide-react** — icons (v1: no brand icons; GitHub/LinkedIn are inline SVGs in `ui/BrandIcons.tsx`)

## Architecture

All copy/content lives in **`src/lib/data.ts`** — components only render it.
Edit text, projects, links, metrics there, never in components.

```
src/app/            layout.tsx (fonts, SEO metadata, JSON-LD), page.tsx (assembly),
                    globals.css (tokens + utilities), sitemap.ts, robots.ts
src/lib/data.ts     ALL site content: hero, about, journey, skills, 5 project
                    case studies, experience, education, achievements
src/components/
  providers/        GateProvider (entered state), EntryGate (breakable-core intro),
                    SmoothScroll (Lenis), Aurora (drifting blobs), CursorGlow,
                    CursorTrail (2D-canvas comet trail)
  sections/         Navbar, Hero, About, Journey, Skills, Projects, TechStack,
                    Experience, Education, Achievements, Contact, Footer
  three/            GateScene (lit faceted core + shard explosion, ContactShadows),
                    HeroScene (particle galaxy + wireframe core),
                    FloatingShapes (Journey), ContactScene (points globe)
  ui/               Reveal/RevealGroup, MagneticButton, TiltCard, Counter,
                    SectionHeading, BrandIcons
```

## Key behaviors

- **Entry gate**: `EntryGate` covers the page until the visitor clicks the 3D
  core 3× (shatters via instanced shards). `useGate().entered` drives the
  Navbar/Hero entrance animations and `Counter enabled`. Skip link +
  reduced-motion single-click path included. Content stays in SSR HTML for SEO.
- **Theme**: light only (dark mode was removed deliberately — don't re-add
  without asking). Palette: primary `#3b82f6`, secondary `#06b6d4`, accent
  `#10b981` on near-white `#f7f7f9`. No purple — the original indigo/violet
  palette was explicitly rejected.
- **3D scenes** are `next/dynamic` with `ssr: false`; below-the-fold ones mount
  only when near the viewport (`useInView` once + margin). DPR capped.
- **Projects section** is the centerpiece: each case study renders
  problem/architecture/flow-diagram/challenges/lessons/impact from `data.ts`,
  with an expand/collapse (first project open by default).

## Conventions & gotchas

- **React Compiler lint is strict**: no `Math.random()`/impure calls during
  render — use the seeded `mulberry32` PRNG pattern (see `GateScene.tsx`);
  no setState-in-effect — use `useSyncExternalStore` or event handlers;
  don't mutate `useMemo` results in `useFrame` — use module-scope scratch
  objects (`tmpObject`).
- **Colors**: use semantic tokens (`text-foreground`, `bg-surface`,
  `border-foreground/10`) — never raw `text-white`/`bg-black` except on
  gradient buttons (`text-white`) and project-cover art (deliberately dark).
- **Turbopack caches `@theme` tokens**: after editing `globals.css` tokens,
  restart dev with `rm -rf .next` or changes may not appear.
- Port **3000 is often occupied** by another app on this machine — run dev on
  3001: `npm run dev -- -p 3001`.

## Commands

- `npm run dev -- -p 3001` — dev server
- `npm run build` — production build (must stay clean)
- `npm run lint` — ESLint incl. React Compiler rules (must stay clean)
- Verification pattern: Playwright (installed in the session scratchpad, not
  in this repo) drives localhost and screenshots each section.

## Placeholders still to replace

- `public/resume.pdf` (generated placeholder), portrait photo in About
- Primary GitHub username (`gauravgandhi` — unconfirmed; `gaurav3611` is real)
- LinkedIn URL, production domain (`gauravgandhi.dev` in `data.ts` + metadata)
