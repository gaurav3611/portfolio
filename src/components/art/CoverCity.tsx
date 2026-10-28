/** A01: original technological city for the cover. See docs/visual-assets.md. */

type Tower = { x: number; w: number; h: number; kind: "rack" | "lattice" | "step" | "plain" };

const BASE = 600;
const DEPTH = 18;

const TOWERS: Tower[] = [
  { x: 30, w: 72, h: 250, kind: "rack" },
  { x: 118, w: 58, h: 370, kind: "lattice" },
  { x: 192, w: 92, h: 290, kind: "step" },
  { x: 302, w: 78, h: 440, kind: "rack" },
  { x: 398, w: 56, h: 240, kind: "plain" },
  { x: 470, w: 82, h: 330, kind: "rack" },
  { x: 566, w: 40, h: 190, kind: "plain" },
];

function Faces({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  // Right face in solid hatched shadow, top face in light tone.
  return (
    <>
      <polygon
        points={`${x + w},${y} ${x + w + DEPTH},${y - DEPTH * 0.6} ${x + w + DEPTH},${y + h - DEPTH * 0.6} ${x + w},${y + h}`}
        fill="#0b0b0b"
        stroke="#0b0b0b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polygon
        points={`${x},${y} ${x + DEPTH},${y - DEPTH * 0.6} ${x + w + DEPTH},${y - DEPTH * 0.6} ${x + w},${y}`}
        fill="url(#ht-light)"
        stroke="#0b0b0b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x={x} y={y} width={w} height={h} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
    </>
  );
}

function TowerArt({ t }: { t: Tower }) {
  const top = BASE - t.h;
  const rows = Math.floor((t.h - 30) / 22);
  if (t.kind === "step") {
    const tiers = [
      { x: t.x, w: t.w, y: BASE - 150, h: 150 },
      { x: t.x + 12, w: t.w - 24, y: BASE - 230, h: 80 },
      { x: t.x + 24, w: t.w - 48, y: top, h: t.h - 230 },
    ];
    const cx = t.x + t.w / 2 + 6;
    return (
      <g>
        {tiers.map((s, i) => (
          <g key={i}>
            <Faces {...s} />
            {Array.from({ length: Math.floor(s.h / 18) - 1 }, (_, r) => (
              <line key={r} x1={s.x + 8} x2={s.x + s.w - 8} y1={s.y + 14 + r * 18} y2={s.y + 14 + r * 18} stroke="#0b0b0b" strokeWidth="1.2" strokeDasharray="6 4" />
            ))}
          </g>
        ))}
        {/* hex-nut crown */}
        <polygon points={`${cx - 14},${top - 6} ${cx - 7},${top - 18} ${cx + 7},${top - 18} ${cx + 14},${top - 6} ${cx + 7},${top + 6} ${cx - 7},${top + 6}`} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
        <circle cx={cx} cy={top - 6} r="5" fill="#0b0b0b" />
      </g>
    );
  }
  return (
    <g>
      <Faces x={t.x} y={top} w={t.w} h={t.h} />
      {t.kind === "rack" &&
        Array.from({ length: rows }, (_, r) => {
          const y = top + 16 + r * 22;
          return (
            <g key={r}>
              <rect x={t.x + 8} y={y} width={t.w - 16} height="12" fill={r % 3 === 1 ? "url(#ht-mid)" : "none"} stroke="#0b0b0b" strokeWidth="1.2" />
              <line x1={t.x + 14} x2={t.x + t.w - 26} y1={y + 6} y2={y + 6} stroke="#0b0b0b" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={t.x + t.w - 15} cy={y + 6} r="2" fill={r % 4 === 0 ? "#f3f0e8" : "#0b0b0b"} stroke="#0b0b0b" strokeWidth="1" />
            </g>
          );
        })}
      {t.kind === "lattice" && (
        <g>
          {Array.from({ length: rows }, (_, r) => (
            <g key={r}>
              <rect x={t.x + 9} y={top + 14 + r * 22} width="14" height="12" fill={r % 2 ? "#0b0b0b" : "none"} stroke="#0b0b0b" strokeWidth="1.2" />
              <rect x={t.x + t.w - 23} y={top + 14 + r * 22} width="14" height="12" fill={r % 3 === 0 ? "#0b0b0b" : "none"} stroke="#0b0b0b" strokeWidth="1.2" />
            </g>
          ))}
          {/* lattice antenna */}
          <g stroke="#0b0b0b" strokeWidth="1.6" fill="none">
            <path d={`M${t.x + 14} ${top} L${t.x + t.w / 2} ${top - 90} L${t.x + t.w - 14} ${top}`} />
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={t.x + 14 + (t.w / 2 - 14) * (1 - f)} y1={top - 90 * (1 - f)} x2={t.x + t.w - 14 - (t.w / 2 - 14) * (1 - f)} y2={top - 90 * (1 - f)} />
            ))}
            <path d={`M${t.x + 20} ${top - 22} L${t.x + t.w - 20} ${top - 45} M${t.x + t.w - 20} ${top - 22} L${t.x + 20} ${top - 45}`} />
          </g>
          <circle cx={t.x + t.w / 2} cy={top - 94} r="4" fill="#0b0b0b" stroke="#0b0b0b" strokeWidth="1.5" />
        </g>
      )}
      {t.kind === "plain" &&
        Array.from({ length: rows }, (_, r) => (
          <line key={r} x1={t.x + 8} x2={t.x + t.w - 8} y1={top + 18 + r * 22} y2={top + 18 + r * 22} stroke="#0b0b0b" strokeWidth={r % 2 ? 1 : 2.4} />
        ))}
    </g>
  );
}

// Circuit traces for the foreground street band (static, hand-placed).
const TRACES = [
  "M0 625 H120 L140 645 H260",
  "M40 690 V660 H180 L200 640 H330",
  "M260 700 V672 H410 L430 652 H520",
  "M600 618 H480 L460 638 H350 L330 618 H300",
  "M520 700 V680 H600",
  "M90 700 V680",
];
const PADS = [
  [260, 645], [330, 640], [520, 652], [300, 618], [90, 680], [40, 660], [120, 625], [600, 680],
];

export function CoverCity({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 700"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="img"
      aria-label="Original monochrome manga illustration of a technological city: geometric towers shaped like server racks, circuit-board streets and network arcs under a halftone sky."
    >
      <defs>
        <linearGradient id="cc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="cc-sky">
          <rect width="620" height="600" fill="url(#cc-fade)" />
        </mask>
      </defs>

      {/* Background: halftone sky, denser toward the top */}
      <rect width="620" height="600" fill="url(#ht-light)" opacity="0.55" />
      <rect width="620" height="600" fill="url(#ht-mid)" mask="url(#cc-sky)" opacity="0.75" />

      {/* Network arcs + orbiting nodes */}
      <g fill="none" stroke="#0b0b0b" strokeWidth="1.2">
        <path d="M-10 300 Q 300 40 640 220" />
        <path d="M60 360 Q 330 120 620 300" strokeDasharray="5 5" />
        <path d="M150 140 Q 360 30 560 120" strokeWidth="0.8" />
      </g>
      {[[160, 205], [345, 118], [512, 158]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={i === 1 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth="2" />
      ))}

      {/* Middle ground: towers rise once on load. Dimmed when the page shows the "back". */}
      <g className="city-towers">
      {TOWERS.map((t, i) => (
        <g key={i} className="rise" style={{ "--delay": `${0.15 + i * 0.07}s`, "--rise": "60px" } as React.CSSProperties}>
          <TowerArt t={t} />
        </g>
      ))}
      </g>

      {/* Cross-hatched alleys between towers */}
      <rect x="0" y="560" width="620" height="40" fill="url(#xhatch)" opacity="0.5" />

      {/* Foreground: PCB street band */}
      <g className="city-pcb">
      <rect x="0" y="600" width="620" height="100" fill="#f3f0e8" className="pcb-bg" />
      <line x1="0" y1="600" x2="620" y2="600" stroke="#0b0b0b" strokeWidth="5" />
      <g fill="none" stroke="#0b0b0b" strokeWidth="2.2" strokeLinejoin="round" className="pcb-traces">
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {PADS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.2" className="pcb-pad" />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={22 + i * 43} cy={(i * 37) % 2 ? 612 : 694} r="1.8" fill="#0b0b0b" className="pcb-via" />
      ))}
      </g>

      <text x="330" y="692" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#0b0b0b" className="pcb-label">
        PL. 00
      </text>
    </svg>
  );
}
