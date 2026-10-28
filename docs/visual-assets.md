# Visual Asset Inventory — "Gaurav Nitesh Gandhi, Vol. 1"

> **Layout v2 (street/underground).** Chapters: 00 Cover · 01 Street Level (front: a sideways gallery of the four builds) · 02 Underground (back: a sideways gallery of each build's data path, plus the FinFactor field log) · 03 Player 1 (character sheet, loadout, full inventory, story so far) · 04 Missions (mission select) · 05 The Next Chapter (contact + mission brief form). A page-wide **Front / Back** toggle drives the cover city and the Player 1 loadout.
>
> Current placements of the assets below:
> - A01 cover city: the cover. Under "Back", the towers dim to 18% and the circuit band turns to paper-on-ink (CSS on `html[data-side]`).
> - A04 desk: the Player 1 sheet, in place of a portrait.
> - A05 code-to-system and A14 glyphs: A14 is used in the Player 1 "Full inventory". A05 was removed in v2 (its file is deleted; recover it from the v1 snapshot if needed).
> - A06 emblems: Player 1 "Story so far" (Ep. 1 PU College, Ep. 2 VIT).
> - A07 field log: the last card of the Underground shelf.
> - A08, A09, A13 project art: Street Level storefront cards and the project pages.
> - A10 cricket art: the project page hero, and the fallback when WebGL is unavailable.
> - A11 diagrams: the project pages (`#architecture`). Underground cards show the same data path as an HTML list.
> - A12 3D swing: the flagship storefront in Street Level, and the cricket project page.
> - A15 skyline: the contact chapter.
> - A16 to A22: unchanged.

Every visual on the site is listed here. All artwork is original, drawn in code
(inline SVG, CSS, or Three.js). There are no photographs, raster stock images,
remote image URLs, franchise characters or portraits. Essential information
(names, headings, project text, skills, contact details, navigation) is always
real HTML text; lettering inside artwork is decorative only.

## Shared art rules

| Rule | Value |
| --- | --- |
| Palette | **Pure monochrome.** Ink `#0b0b0b`, paper `#f3f0e8`, tones `#d9d5cc` / `#a9a49a` / `#5e5a53`. No accent colour: emphasis comes from inversion (ink blocks), heavier strokes, and grey vs. ink contrast (e.g. inactive diagram edges in tone `#5e5a53`, active ones in solid ink). |
| Line weight | Panel borders 3px. Object outer contours 2.5px (in a 0–400 viewBox). Interior detail 1–1.4px. Technical annotations 0.8px. |
| Halftone | Three densities from the shared `<InkDefs>` (`#ht-light` 6px grid / 0.9px dots, `#ht-mid` 5px / 1.4px, `#ht-dark` 4px / 1.7px). |
| Hatching | `#hatch` (45°, 4px spacing), `#xhatch` (crossed), `#hatch-v` (vertical, for walls). |
| Panel gutter | 12px mobile, 16px desktop. Panels may break the grid only on the cover and the flagship project. |
| Lettering | Display: Anton. SFX: Bowlby One. Captions/labels: JetBrains Mono. Body: IBM Plex Sans. All Latin-only (the earlier CJK faces cost ~270 KB of render-blocking @font-face CSS). |
| Shared defs | `src/components/art/InkDefs.tsx` is rendered once in the root layout, hidden. Every illustration references its patterns by id. |

Every illustration's root `<svg>` uses `role="img"` and `aria-label` (meaningful) or `aria-hidden="true"` (decorative). Each component's file is listed under *Implementation*.

---

## A01 · Cover city

- **Location:** Chapter 00 / cover, right half on desktop. On mobile it sits behind and below the title.
- **What the viewer sees:** A dense, stylized technology city drawn as geometric towers. Rooftops become server racks, circuit traces run along the streets as roads, and network paths arc between the towers. The sky is a halftone gradient.
- **Foreground:** A bottom band of circuit-board traces with solder pads and via dots. It reads both as a street plan and as a PCB.
- **Middle ground:** Seven towers of different heights. Two are server towers with vented rack slots and LED dots. One has a lattice antenna. One is a stepped ziggurat with a hex-nut crown. Their right faces are filled with vertical hatching for deep black shadow.
- **Background:** Halftone sky that gets denser toward the top, a thin crescent of network arcs, and three tiny orbiting nodes.
- **Composition:** Slight low angle (horizon at 78% height). The towers lean subtly toward the title side, and the largest negative space faces the headline.
- **Ink:** 2.5px tower contours, cross-hatched alleyways, solid black shadow wedges on the right faces, mid-density halftone sky.
- **Lettering in art:** Only the panel label "PL. 00", centred in the circuit band. (An earlier "RMBL" sound-effect was removed: it read as a watermark.)
- **Animation:** Towers rise from the baseline in a staggered 0.9s ink reveal on load, once. Static after that. Reduced motion: no rise.
- **Responsive:** Desktop: right 55% of the viewport. ≤ 768px: full width, placed after the title block and cropped to its top 70% via `preserveAspectRatio="xMidYMax slice"`.
- **Alt:** "Original monochrome manga illustration of a technological city: geometric towers shaped like server racks, circuit-board streets and network arcs under a halftone sky."
- **Implementation:** SVG, `src/components/art/CoverCity.tsx`.

## A02 · Cover speed lines

- **Location:** Cover background, converging on the title block.
- **What the viewer sees:** About 40 thin black radial strokes of varied length that start at the viewport edges and stop short of the title. They pull the eye to the name.
- **Ink:** 0.6–2px tapered strokes (drawn as thin triangles), 85% ink opacity.
- **Animation:** On load, lines draw inward once (`stroke-dashoffset`) over 0.8s. Static after that. Reduced motion: drawn instantly.
- **Responsive:** Focal point moves from (30%, 45%) on desktop to (50%, 32%) on mobile.
- **Alt:** Decorative (`aria-hidden`).
- **Implementation:** SVG, `src/components/art/SpeedLines.tsx`.

## A03 · Cover 3D geometric core — REMOVED (v3)

Removed in the v3 refinement: a perpetually spinning icosahedron said nothing about the work and competed with the title. The cover city (A01) now carries the cover alone. The original description is kept below for history.

### (historical) A03

- **Location:** Cover, overlapping the city's sky above the tallest tower.
- **What the viewer sees:** A slowly rotating icosahedron rendered as a matte paper-white solid with thick black ink edges. Inside it is a smaller counter-rotating wireframe octahedron, like an object being engineered.
- **Ink:** `MeshToonMaterial` with a 3-step grayscale gradient map (paper / light tone / mid tone), drei `<Edges>` 2px black outlines, no colour.
- **Animation:** 0.12 rad/s rotation. Pointer movement tilts it at most ±0.15 rad. It mounts only while the cover is in view, which stops rendering after scroll. Reduced motion: one static frame (`frameloop="demand"`).
- **Responsive:** Canvas is 220–320px square. DPR capped at 1.75. Hidden below 380px.
- **Fallback:** When WebGL is unavailable, a static SVG icosahedron in the same ink style appears in its place. It is decorative, so no "unavailable" message.
- **Alt:** Decorative (`aria-hidden`). The canvas has no essential content.
- **Implementation:** Three.js / R3F, `src/components/three/CoverCore.tsx`. Fallback is in `src/components/art/Icosahedron.tsx`.

## A04 · Origin panel — The desk

- **Location:** Chapter 01, large left panel.
- **What the viewer sees:** A three-quarter overhead view of a study desk at night. An open laptop shows four short, legible lines of Java (`class Graph {`, `  int[][] adj;`, `  bfs(0);`, `}`). Beside it, an open notebook has a hand-sketched binary tree and the note "O(n log n)". A pencil, a coffee mug with a steam curl, and a sticky note reading "BFS → DFS?" sit on the desk.
- **Foreground:** Desk edge with heavy cross-hatching underneath and the pencil overlapping the panel border, which breaks the frame.
- **Middle ground:** Laptop and notebook.
- **Background:** Wall in light halftone, a pinned system diagram (three boxes and arrows), and the desk lamp's cone of light shown by removing the halftone.
- **Ink:** Rough 2.5px contours with slight wobble, a solid black laptop keyboard well, light halftone on the notebook pages, dark halftone on the wall outside the lamp cone.
- **Animation:** Panel ink-reveal (clip-path wipe), scroll-linked with CSS `animation-timeline: view()` as it enters the viewport. Unsupported browsers show the panel directly.
- **Responsive:** Full-width panel on mobile, 7/12 columns on desktop.
- **Alt:** "Manga-style drawing of a developer's desk at night: a laptop showing a few lines of Java, a notebook with a sketched binary tree, a coffee mug and a pinned system diagram under a desk lamp."
- **Implementation:** SVG, `src/components/art/OriginDesk.tsx`.

## A05 · Origin panel — Code becomes systems

- **Location:** Chapter 01, narrow right panel stacked above the bio text.
- **What the viewer sees:** Real syntax fragments (`{ }`, `=>`, `SELECT`, `@GetMapping`, `<div>`) flowing down the panel on speed-line streaks. They resolve into a clean node diagram at the bottom: client, API, database and device boxes joined by arrows.
- **Ink:** Mono-type fragments in ink, streaks as tapered strokes, diagram boxes with 2px contours, mid halftone drop shadows.
- **Animation:** The arrows draw once when in view (path length).
- **Responsive:** One tall 240×360 viewBox. It scales to the panel width and is capped at 340px tall.
- **Alt:** "Illustration of code fragments streaming downward and resolving into a diagram connecting a client, an API, a database and a device."
- **Implementation:** SVG, `src/components/art/CodeToSystem.tsx`.

## A06 · Timeline emblems

Two small emblems, one per education milestone panel in the vertical timeline. A thin 2px ink spine joins them.

1. **Campus emblem (VIT milestone):** A generic, invented campus silhouette: a wide colonnaded block with a stepped tower and a few trees, over a horizon line, with light halftone sky. It is deliberately not modelled on any real building. Alt: decorative, since the milestone text says everything (`aria-hidden`).
2. **Books emblem (PU College milestone):** A stack of three books with hatched spines, an open notebook on top with a short algorithm fragment ("for i in range(n):"), and a pencil. Decorative (`aria-hidden`).

- **Ink:** 2px contours, hatched shadows to the right, light halftone fill on the covers.
- **Animation:** The spine line draws downward as you scroll (scroll-linked `scaleY`). Reduced motion: fully drawn.
- **Responsive:** Emblems are 96px on mobile and 140px on desktop. The spine stays on the left edge at every size.
- **Implementation:** SVG, `src/components/art/TimelineEmblems.tsx`.

## A07 · Field log — FinFactor workspace

- **Location:** Chapter 02, the main panel of the "mission report".
- **What the viewer sees:** A split technical panel. On the left is a terminal window with legible lines (`$ mvn spring-boot:run`, `Started Application`, `GET /api/v1/accounts 200`). In the middle are three boxes, "FRONTEND · TS", "SERVICE · JAVA / SPRING BOOT" and "DB", with request/response arrows between them. On the right is a wireframe sketch of a web form. Small handwritten-style annotations ("request", "response", "fix #") point at the parts.
- **Foreground:** The terminal, with a solid black bezel and halftone glare.
- **Middle ground:** The service diagram.
- **Background:** Light graph-paper grid and hatching at the panel edges.
- **Ink:** Heavy 3px frame, fine 1px diagram lines, mid halftone shadows under the boxes.
- **Lettering in art:** Labels as described, plus the panel tag "LOG 02-A". The company name is set as page typography outside the art. No logo is drawn.
- **Animation:** The arrows draw once in view.
- **Responsive:** Below 768px a second, portrait viewBox stacks the terminal above the three service boxes. The form sketch is dropped there to keep labels legible.
- **Alt:** "Black-and-white technical panel of a software workspace: a terminal running a Spring Boot service, a diagram linking a TypeScript frontend to a Java service and a database, and a sketched web form."
- **Implementation:** SVG, `src/components/art/FieldLog.tsx`.

## A08 · Project A — Automate Hub

- **Location:** Project archive card, plus the hero of `/projects/automate-hub`.
- **What the viewer sees:** An isometric order-management workstation.
- **Foreground:** A stack of order sheets (ruled lines, "ORDER #" header), and a small taped cardboard package with cross-hatching underneath.
- **Middle ground:** An abstract application window with four labelled buttons: "CREATE", "READ", "UPDATE", "DELETE".
- **Background:** A Java backend module block (labelled "JAVA") linked by a dashed "JDBC" line to a MySQL database cylinder (labelled "MySQL").
- **Ink:** Sharp 2.5px contours, sparse light halftone shadows, clean arrowheads.
- **Interaction:** On card hover or keyboard focus, the JAVA → JDBC → MySQL path thickens and turns seal red (the `.hl` group). Touch devices get an explicit "View Project" link.
- **Responsive:** Fixed 4:3 art box that scales.
- **Alt:** "Monochrome technical illustration of an order-management workflow connecting a Java backend through JDBC to a MySQL database, with order-processing panels in the foreground."
- **Implementation:** SVG, `src/components/art/projects/AutomateHubArt.tsx`.

## A09 · Project B — Decentralized health records

- **Location:** Project archive card, plus the hero of `/projects/ipfs-health-records`.
- **What the viewer sees:** A generic document icon with a medical cross and blank ruled lines (no names, no data) at the centre. Six hexagonal storage nodes surround it, linked by thin lines. Small file fragments (dog-eared squares) drift between nodes. On the left is a stacked "M · E · R · N" application block.
- **Background:** Light screentone dots and fine geometric lines.
- **Ink:** Precise 1.2px technical lines, 2.5px document contour, soft light-halftone shadows.
- **Interaction:** On hover or focus, the path from app to document to node lights up.
- **Alt:** "Original monochrome technical illustration of a generic medical document connected to an application and a network of distributed IPFS storage nodes. No real patient data is shown."
- **Implementation:** SVG, `src/components/art/projects/HealthRecordsArt.tsx`.

## A10 · Project C — Cricket swing (flagship illustration)

- **Location:** Flagship spread in the project archive (spans two columns), plus `/projects/iot-cricket-swing-analyzer`.
- **What the viewer sees:** A cricket bat at a dynamic diagonal, mid-swing. The blade has a wood-grain line pattern and the handle has grip ridges. A small labelled sensor module, "ESP32 + MPU6050", is strapped just below the handle. Three motion arcs trail behind the toe of the bat. A seal-red starburst impact point sits on the sweet spot. Big SFX lettering "SWOOSH!" is set decoratively.
- **Foreground:** The bat and module, contours 3px, the blade back face in solid ink shadow.
- **Middle ground:** Motion arcs and speed lines.
- **Background:** A lightly shaded cricket-ground silhouette (oval boundary line, a sight-screen rectangle, a stump set) in light halftone.
- **Camera:** Low three-quarter angle looking up at the bat.
- **Responsive:** 16:9 on desktop, 4:3 crop on mobile.
- **Alt:** "Monochrome technical illustration of a cricket bat with a sensor module, directional swing arcs, and a companion architecture diagram showing ESP32, MPU6050, Bluetooth streaming, a browser-based 3D visualization, Flask, and Firebase." The diagram is A11, shown beside it.
- **Implementation:** SVG, `src/components/art/projects/CricketArt.tsx`.

## A11 · Interactive architecture diagrams (all four projects)

- **Location:** The "Architecture" section of each project detail page (`/projects/[slug]`). Archive cards use the static highlight paths instead (A08–A13).
- **What the viewer sees:** Ink-boxed nodes joined by arrows on a light grid, captioned "ARCHITECTURE ILLUSTRATION — NOT A LIVE SYSTEM".
  - Automate Hub: Order UI → Java business logic → JDBC → MySQL.
  - Health records: React client → Express/Node API → MongoDB, with API → IPFS network.
  - Cricket: MPU6050 → ESP32 → BLE 4.2 → browser (Web Bluetooth) → Three.js view. Browser → Flask → Firebase (Auth + Firestore).
  - E-commerce: React storefront → JWT auth → Spring Boot services → HDFS cluster, with ZooKeeper coordinating the services.
- **Interaction:** Each node is a real `<button>` positioned over the SVG. Focus, hover or press selects it (pressing never deselects, so hover-then-click keeps the caption): the node and its edges turn seal red and a caption panel (`aria-live="polite"`) shows the node's purpose. A "Trace a request" button animates a dot along the main path once. Reduced motion highlights the path without moving the dot.
- **Responsive:** Desktop uses a landscape layout. Below 640px a portrait layout (separate coordinates) keeps the buttons 44px or taller.
- **Alt:** The SVG is `aria-hidden`. Its meaning is carried by the buttons and the caption, plus an `<ol>` summary of the flow for screen readers.
- **Implementation:** SVG + HTML, `src/components/ui/ArchDiagram.tsx`, with data in `src/lib/data.ts`.

## A12 · 3D cricket swing (v3, the flagship interaction)

- **Location:** The flagship storefront in Street Level, and the "Swing visualization" section of the cricket project page.
- **What the viewer sees:** An inked 3D cricket bat on plain paper, above a single pitch-crease line. It swings once when it first comes into view, then holds its finish until the visitor presses **Replay Swing**.
- **Swing timeline (deterministic, 2.5 s):**
  - Ready, angled behind the crease (0–0.3 s).
  - Smooth backswing, the hands lifting (to 1.0 s).
  - A short hold at the top.
  - Forward swing with quartic in-out easing: peak speed at **contact (1.55 s)**, with the bat vertical and the face square to camera.
  - Follow-through with wrist roll to a balanced high finish (2.0 s), then the smear fades (2.5 s).
- **Pivot:** The bat rotates about the grip at the top of the handle. The hands translate along their own path, which is what makes the arc read as a swing rather than a spin.
- **Ink treatment:**
  - Screen-space halftone shader: paper where lit, ink dots growing into shadow.
  - Inverted-hull silhouette outlines, crisp `Edges` on the blade, solid-ink grip wraps and sensor module.
- **Motion marks, all driven by the same timeline:**
  - **Smear:** a tapered ink ribbon behind the toe, keeping the last 0.14 s of motion and sub-sampled from the deterministic pose, so slow devices draw the same smear.
  - **Speed arcs:** four concentric ink arcs in the swing plane that flash in through the forward swing and vanish just after contact.
  - **Impact frame (A23):** placed by projecting the sweet spot at the exact contact pose.
- **Camera:** A fixed perspective camera, fitted per aspect ratio so every pose stays in frame. There are no zooms, no shake and no orbit control (orbit hijacked touch scrolling).
- **Controls:**
  - "Replay Swing" is disabled with the label "Swinging…" during a swing, so animations can't overlap.
  - If the scene unmounts mid-swing, the control is released.
- **Reduced motion:** A composed still of the contact frame (smear, arcs at 55%, impact frame), with no autoplay or replay and a note saying so.
- **Fallback:** Without WebGL, the A10 illustration shows with "3D preview unavailable — showing the illustrated swing instead."
- **Honesty:** A visible label reads "Illustrative demo — not live sensor data", with the note "No Bluetooth device is connected or requested."
- **Implementation:** `src/components/three/SwingScene.tsx` and `Slots.tsx` (`SwingStage`). The scene mounts only near the viewport and disposes its shader and trail geometry on unmount.

## A23 · Impact frame ("THWACK!")

- **What the viewer sees:** 28 tapered black radial speed rays around a black-backed paper starburst with a 2px ink contour. The bold SFX "THWACK!" sits on it in Bowlby One, rotated −8°, with five small ink drops.
- **Animation:**
  - Appears at full ink on the contact frame (no fade-in).
  - Overshoots to 110% at 12%, settles, then fades out by 560 ms. The drops fly outward over 480 ms.
  - Played with the Web Animations API, and cancelled and restarted on replay.
- **Alt:** Decorative (`aria-hidden`). The canvas label describes the swing.
- **Implementation:** `src/components/three/ImpactBurst.tsx` (seeded geometry, so server and client match).

## A24 · Cover panels for the newer builds

All three use the 400×300 ink system shared with A08–A13: a light halftone ground, 2.5px contours, mid-halftone drop shadows and mono labels. Each depicts the project's real components, taken from its README. Alt text lives in `data.ts` (`alt`).

| Asset | Shows |
|---|---|
| SSwinGG | Bat with an ESP32-C3 + BMI160 board, Bluetooth arcs, a phone with a km/h chart, and a browser dashboard. |
| TRACE | Edge-server nodes in two dashed trust domains, routed requests, one escalated to a cloud, and one cross-domain request crossed out. |
| MINIMAL | Phone with a large clock and a text-only app list, an hourglass "PAUSE", and speed lines. |

- **Implementation:** `src/components/art/projects/Covers.tsx`.

## A13 · Project D — Distributed e-commerce spread

- **Location:** Project archive card, plus the hero of `/projects/distributed-ecommerce`.
- **What the viewer sees:** A comic spread split by a diagonal gutter. The left panel holds a sketched React storefront (product tiles drawn as halftone squares, a cart icon). The right panel holds three Spring Boot service blocks over an HDFS cluster of five cylinder nodes. A ZooKeeper coordination node sits above, with thin lines to each service. A "JWT" seal-stamp symbol (an ink circle with the letters JWT, no real token) sits on the gutter between the panels.
- **Ink:** Bold 3px architectural lines, small mono labels, mid halftone shadows, clear arrow hierarchy.
- **Interaction:** On hover or focus, the request path storefront → JWT → service → HDFS lights up.
- **Alt:** "Monochrome system architecture illustration showing a React storefront connected to Spring Boot services, Hadoop HDFS storage, ZooKeeper coordination, and JWT authentication."
- **Implementation:** SVG, `src/components/art/projects/EcommerceArt.tsx`.

## A14 · Toolkit field-guide glyphs (10)

- **Location:** Chapter 04 "Toolkit". There is one glyph per category page, top right of each field-guide panel.
- **Glyphs:** Languages: `</>` brackets over a quill. Web: a browser window with a route arrow. Databases: stacked cylinders. Distributed systems: a ring of four nodes with a coordinator. IoT/embedded: a chip with pins and a radio arc. Machine learning: a scatter plot with a decision line. Data visualization: a bar chart beside a pie wedge. Mobile: a phone outline with a notch. Tools: a branching git graph. Core CS: a binary tree.
- **Ink:** One 48×48 grid, 2px contours, a light halftone fill on one face, consistent across all ten.
- **Alt:** Decorative (`aria-hidden`). The category heading is real text.
- **Implementation:** SVG, `src/components/art/ToolkitGlyphs.tsx`.

## A15 · Closing page — The next chapter

- **Location:** Chapter 05, contact.
- **What the viewer sees:** A wide, quiet city horizon at dawn along the bottom third, low and calm, with light halftone sky fading to blank paper. In the lower right is an open technical notebook with a pen, its pages showing a small sketched box-and-arrow diagram and "next →". Three long flowing ink lines cross the page from the notebook toward the upper left, where a large empty speech-panel balloon holds the real HTML closing message.
- **Ink:** Thin 1.4px skyline, light halftone only, very little black. It is deliberately the airiest page of the volume.
- **Animation:** The flowing lines draw once in view.
- **Responsive:** Mobile shows the skyline as a bottom strip, with the notebook hidden below 480px.
- **Alt:** "Original monochrome manga closing illustration showing a quiet city skyline, an open technical notebook, delicate ink lines, and an uncluttered speech-panel area for a developer contact message."
- **Implementation:** SVG, `src/components/art/ClosingSkyline.tsx`.

## A16 · 404 — The missing page

- **Location:** `not-found.tsx`. The error boundary reuses it with a different caption.
- **What the viewer sees:** An open manga volume seen from above. The left page has three ordinary hatched panels. The right page has been torn out, leaving a ragged paper edge and an empty frame outline drawn in dashes, with tiny ink drops falling out of the frame. SFX "FWIP" drifts off the page.
- **Ink:** 2.5px contours, dark halftone in the book's gutter shadow, and white (empty paper) for the missing page.
- **Alt:** "Illustration of an open manga volume with its right-hand page torn out, leaving an empty dashed panel."
- **Implementation:** SVG, `src/components/art/MissingPage.tsx`.

## A17 · Loading state — Panel being inked

- **Location:** Shown only while a 3D scene's code chunk is loading (the `next/dynamic` `loading` slot).
- **What the viewer sees:** A small square panel whose border draws itself clockwise, while three hatch strokes fill one corner. The caption reads "Preparing the next page…".
- **Animation:** Loops only while the chunk loads, then unmounts. There is no progress bar. Reduced motion shows the static drawn panel.
- **Alt:** `role="status"` with the caption text.
- **Implementation:** SVG + CSS, `src/components/ui/InkLoader.tsx`.

## A18 · Textures (decorative)

- **Halftone fields:** CSS `radial-gradient` dot grids (`.tone-light`, `.tone-mid`, `.tone-dark`), used for panel backgrounds.
- **Hatching:** CSS `repeating-linear-gradient` (`.hatch`), used for dividers and shadows.
- **Speed lines background:** CSS `repeating-conic-gradient` (`.speed-bg`), used behind chapter-title plates.
- **Paper grain:** An inline SVG `feTurbulence` data-URI on `body` at 6% opacity.
- **Alt:** Decorative CSS backgrounds with no alt.

## A19 · Ink-dot cursor

- **What the viewer sees:** An 8px ink dot that follows the pointer exactly. A 28px outline ring follows with a slight lag. Over elements marked `data-cursor="<label>"` the ring grows to 64px and shows a tiny mono label ("OPEN", "VIEW").
- **Rules:** Only on `(hover: hover) and (pointer: fine)` without reduced motion. `pointer-events: none`. The native cursor stays visible, so selection and clicking are unaffected.
- **Implementation:** React + CSS, `src/components/providers/InkCursor.tsx`.

## A20 · Favicon / app icon

- **What the viewer sees:** A black square panel with a 2px paper inner border, the paper-coloured letters "GG" in a condensed display style, and a seal-red dot in the lower right.
- **Implementation:** SVG, `src/app/icon.svg`.

## A21 · Social share image

- **What the viewer sees:** 1200×630. On a paper background with a 6px ink border: "CHAPTER 00 — THE DEVELOPER" (mono), "GAURAV NITESH GANDHI" (huge condensed), and "I build systems. I turn ideas into software." Radial speed lines sit in the right third, with a seal-red dot.
- **Implementation:** `next/og` ImageResponse, `src/app/opengraph-image.tsx`.

## A22 · Chapter title plates

- **Location:** The top of every chapter.
- **What the viewer sees:** A black plate with the chapter number in huge outlined numerals ("01") and a caption strip "CHAPTER 01 — ORIGIN STORY" set in paper-coloured mono, over a speed-line texture (A18).
- **Alt:** Real HTML heading text, with the numeral `aria-hidden`.
- **Implementation:** CSS + HTML, `src/components/ui/ChapterHeading.tsx`.
