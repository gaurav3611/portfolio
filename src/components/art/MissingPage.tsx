/** A16: an open manga volume with its right-hand page torn out. */
export function MissingPage({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 300" className={className} role="img" aria-label="Illustration of an open manga volume with its right-hand page torn out, leaving an empty dashed panel.">
      <rect x="40" y="276" width="400" height="14" fill="url(#xhatch)" />
      {/* left page with ordinary panels */}
      <path d="M40 30 Q140 18 240 34 V276 Q140 262 40 274 Z" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
      <g stroke="#0b0b0b" strokeWidth="2">
        <rect x="58" y="48" width="78" height="90" fill="url(#hatch)" />
        <rect x="144" y="50" width="80" height="90" fill="url(#ht-light)" />
        <rect x="58" y="148" width="166" height="110" fill="#f3f0e8" />
        <path d="M70 240 L120 170 L150 210 L180 180 L214 240 Z" fill="url(#ht-mid)" strokeWidth="1.6" />
      </g>
      {/* gutter shadow */}
      <rect x="228" y="34" width="24" height="242" fill="url(#ht-dark)" />
      {/* torn right page: ragged stub + empty dashed frame */}
      <path d="M240 34 L262 32 L256 60 L266 88 L254 120 L268 150 L256 182 L266 214 L254 246 L262 276 L240 276 Z" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="282" y="48" width="150" height="210" fill="none" stroke="#0b0b0b" strokeWidth="2" strokeDasharray="8 6" />
      {[[372, 270, 4], [390, 286, 3], [356, 292, 2.5]].map(([x, y, r], i) => (
        <path key={i} d={`M${x} ${y - r * 2} Q${x + r} ${y} ${x} ${y + r} Q${x - r} ${y} ${x} ${y - r * 2} Z`} fill="#0b0b0b" />
      ))}
      <text x="360" y="150" textAnchor="middle" transform="rotate(-12 360 150)" fontFamily="var(--font-sfx)" fontSize="40" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2" paintOrder="stroke">
        FWIP
      </text>
    </svg>
  );
}
