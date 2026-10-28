/** A04: developer's desk at night. See docs/visual-assets.md. */
export function OriginDesk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 420"
      className={className}
      role="img"
      aria-label="Manga-style drawing of a developer's desk at night: a laptop showing a few lines of Java, a notebook with a sketched binary tree, a coffee mug and a pinned system diagram under a desk lamp."
    >
      <defs>
        <clipPath id="od-wall">
          <rect width="600" height="270" />
        </clipPath>
      </defs>

      {/* Background wall: dark tone, with the lamp's light cone left as paper */}
      <g clipPath="url(#od-wall)">
        <rect width="600" height="270" fill="url(#ht-dark)" />
        <polygon points="470,20 210,270 600,270 600,120" fill="#f3f0e8" />
        <polygon points="470,20 210,270 600,270 600,120" fill="url(#ht-light)" opacity="0.6" />
      </g>
      {/* Lamp */}
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round" fill="#f3f0e8">
        <path d="M560 270 L540 120 L480 50" fill="none" strokeWidth="4" />
        <polygon points="445,40 500,22 512,48 470,68" />
        <circle cx="540" cy="120" r="6" fill="#0b0b0b" />
      </g>
      {/* Pinned system diagram */}
      <g transform="rotate(-3 320 90)">
        <rect x="250" y="40" width="150" height="100" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
        <circle cx="325" cy="46" r="4" fill="#0b0b0b" stroke="#0b0b0b" strokeWidth="1.5" />
        <g fill="none" stroke="#0b0b0b" strokeWidth="1.4">
          <rect x="262" y="62" width="36" height="22" />
          <rect x="352" y="62" width="36" height="22" />
          <rect x="307" y="106" width="36" height="22" />
          <path d="M298 73 H352 M280 84 L315 106 M370 84 L335 106" markerEnd="url(#arrow)" />
        </g>
        <text x="266" y="77" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700">UI</text>
        <text x="356" y="77" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700">API</text>
        <text x="314" y="121" fontFamily="var(--font-mono)" fontSize="8" fontWeight="700">DB</text>
      </g>

      {/* Desk surface */}
      <polygon points="0,270 600,270 600,350 0,350" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="3" />
      <line x1="0" y1="350" x2="600" y2="350" stroke="#0b0b0b" strokeWidth="5" />
      {/* Cross-hatching under the desk */}
      <rect x="0" y="352" width="600" height="68" fill="url(#xhatch)" />
      <rect x="0" y="390" width="600" height="30" fill="#0b0b0b" />

      {/* Laptop */}
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
        <polygon points="70,140 250,140 250,262 70,262" fill="#0b0b0b" />
        <rect x="80" y="150" width="160" height="104" fill="#f3f0e8" />
        <polygon points="50,262 270,262 292,300 28,300" fill="#f3f0e8" />
        <polygon points="70,268 250,268 262,290 58,290" fill="url(#ht-dark)" strokeWidth="1.2" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#0b0b0b">
        <text x="90" y="172">class Graph {"{"}</text>
        <text x="106" y="192">int[][] adj;</text>
        <text x="106" y="212">bfs(0);</text>
        <text x="90" y="232">{"}"}</text>
      </g>
      <rect x="150" y="224" width="7" height="11" fill="#0b0b0b" />

      {/* Notebook with binary tree */}
      <g transform="rotate(4 400 300)">
        <polygon points="310,272 520,272 532,334 298,334" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="415" y1="272" x2="415" y2="334" stroke="#0b0b0b" strokeWidth="2" />
        <rect x="322" y="280" width="84" height="46" fill="url(#ht-light)" opacity="0.5" />
        <g stroke="#0b0b0b" strokeWidth="1.4" fill="#f3f0e8">
          <path d="M362 288 L344 304 M362 288 L380 304 M344 304 L334 320 M344 304 L352 320" fill="none" />
          <circle cx="362" cy="288" r="5" />
          <circle cx="344" cy="304" r="5" />
          <circle cx="380" cy="304" r="5" />
          <circle cx="334" cy="320" r="4" />
          <circle cx="352" cy="320" r="4" />
        </g>
        <text x="428" y="296" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700">O(n log n)</text>
        <path d="M428 306 H505 M428 316 H490" stroke="#0b0b0b" strokeWidth="1" />
      </g>

      {/* Sticky note */}
      <g transform="rotate(-6 300 205)">
        <rect x="262" y="180" width="78" height="56" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2" />
        <polygon points="322,236 340,218 340,236" fill="#0b0b0b" />
        <text x="270" y="204" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700">BFS →</text>
        <text x="270" y="222" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700">DFS?</text>
      </g>

      {/* Mug with steam */}
      <g stroke="#0b0b0b" strokeWidth="2.5">
        <path d="M545 250 V300 Q545 312 557 312 H579 Q591 312 591 300 V250 Z" fill="#f3f0e8" />
        <path d="M545 262 V300 Q545 312 557 312 H562 V262 Z" fill="url(#hatch)" strokeWidth="0" />
        <path d="M591 262 Q604 262 604 278 Q604 292 591 292" fill="none" />
        <ellipse cx="568" cy="250" rx="23" ry="5" fill="#0b0b0b" />
        <path d="M560 238 Q552 226 562 214 Q572 202 564 190" fill="none" strokeWidth="1.6" />
      </g>

      {/* Pencil breaking the panel frame (foreground) */}
      <g transform="rotate(-18 180 360)">
        <rect x="120" y="345" width="190" height="16" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
        <rect x="120" y="345" width="190" height="5" fill="url(#hatch)" />
        <polygon points="310,345 334,353 310,361" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="326,350 334,353 326,356" fill="#0b0b0b" />
        <rect x="104" y="345" width="16" height="16" fill="#0b0b0b" />
      </g>
    </svg>
  );
}
