/** A15: the airy closing page — quiet skyline, notebook, flowing lines. */
const SKY = "M0 300 V262 H40 V240 H70 V256 H96 V214 H120 V232 H150 V248 H190 V200 H214 V186 H230 V236 H270 V252 H300 V222 H336 V244 H370 V206 H392 V230 H430 V258 H470 V226 H500 V246 H540 V218 H566 V250 H600 V300 Z";

export function ClosingSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="img"
      aria-label="Original monochrome manga closing illustration showing a quiet city skyline, an open technical notebook, delicate ink lines, and an uncluttered speech-panel area for a developer contact message."
    >
      <defs>
        <linearGradient id="cs-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="cs-mask">
          <rect width="600" height="300" fill="url(#cs-fade)" />
        </mask>
      </defs>
      <rect width="600" height="300" fill="url(#ht-light)" mask="url(#cs-mask)" />
      {/* flowing ink lines from the notebook toward the speech panel (upper left) */}
      <g fill="none" stroke="#0b0b0b" strokeLinecap="round">
        <path d="M470 230 C 380 120, 220 160, 40 40" strokeWidth="1.4" pathLength={1} className="ink-draw" style={{ "--len": 1 } as React.CSSProperties} />
        <path d="M480 220 C 400 90, 260 110, 90 20" strokeWidth="0.8" pathLength={1} className="ink-draw" style={{ "--len": 1, "--delay": "0.2s" } as React.CSSProperties} />
        <path d="M490 236 C 420 160, 300 200, 150 120" strokeWidth="0.8" pathLength={1} className="ink-draw" style={{ "--len": 1, "--delay": "0.4s" } as React.CSSProperties} />
      </g>
      <path d={SKY} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="1.4" strokeLinejoin="round" />
      {[[100, 222], [196, 210], [306, 232], [376, 216], [474, 236], [546, 228]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="6" height="6" fill="#0b0b0b" />
      ))}
      <line x1="0" y1="290" x2="600" y2="290" stroke="#0b0b0b" strokeWidth="2" />
      {/* open notebook with pen — hidden on very small screens via CSS on the parent */}
      <g className="max-[480px]:hidden" transform="rotate(-4 480 250)">
        <path d="M400 244 Q440 236 478 248 Q516 236 556 244 L560 290 Q518 282 478 294 Q438 282 396 290 Z" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2" />
        <line x1="478" y1="248" x2="478" y2="294" stroke="#0b0b0b" strokeWidth="1.4" />
        <rect x="412" y="256" width="18" height="12" fill="none" stroke="#0b0b0b" strokeWidth="1.2" />
        <rect x="444" y="262" width="18" height="12" fill="none" stroke="#0b0b0b" strokeWidth="1.2" />
        <path d="M430 262 H444" stroke="#0b0b0b" strokeWidth="1.2" markerEnd="url(#arrow)" />
        <text x="492" y="272" fontFamily="var(--font-mono)" fontWeight="700" fontSize="11">next →</text>
        <path d="M530 236 L566 210" stroke="#0b0b0b" strokeWidth="4" strokeLinecap="round" />
        <path d="M528 238 L532 234" stroke="#0b0b0b" strokeWidth="2" />
      </g>
    </svg>
  );
}
