/** A06: decorative timeline emblems. Generic and invented — not any real building. */
export function CampusEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
      <rect width="140" height="80" fill="url(#ht-light)" opacity="0.6" />
      <g stroke="#0b0b0b" strokeWidth="2" strokeLinejoin="round">
        <rect x="58" y="14" width="24" height="40" fill="#f3f0e8" />
        <polygon points="54,14 70,2 86,14" fill="#0b0b0b" />
        <rect x="64" y="22" width="12" height="10" fill="url(#hatch)" />
        <rect x="16" y="46" width="108" height="38" fill="#f3f0e8" />
        <rect x="16" y="40" width="108" height="6" fill="#0b0b0b" />
        {[26, 40, 54, 80, 94, 108].map((x) => (
          <line key={x} x1={x} y1="48" x2={x} y2="84" strokeWidth="2.4" />
        ))}
        <rect x="62" y="62" width="16" height="22" fill="#0b0b0b" />
        <rect x="124" y="46" width="6" height="38" fill="#0b0b0b" />
        <circle cx="8" cy="66" r="9" fill="url(#hatch)" />
        <line x1="8" y1="75" x2="8" y2="86" />
        <circle cx="134" cy="62" r="7" fill="url(#xhatch)" />
      </g>
      <line x1="0" y1="86" x2="140" y2="86" stroke="#0b0b0b" strokeWidth="3" />
      <rect x="0" y="88" width="140" height="22" fill="url(#hatch)" opacity="0.5" />
    </svg>
  );
}

export function BooksEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
      <g stroke="#0b0b0b" strokeWidth="2" strokeLinejoin="round">
        <rect x="14" y="80" width="112" height="18" fill="url(#ht-light)" />
        <rect x="118" y="80" width="8" height="18" fill="url(#hatch)" />
        <rect x="22" y="62" width="100" height="18" fill="#f3f0e8" />
        <rect x="22" y="62" width="10" height="18" fill="#0b0b0b" />
        <rect x="10" y="44" width="108" height="18" fill="url(#ht-mid)" />
        <rect x="110" y="44" width="8" height="18" fill="url(#xhatch)" />
        <polygon points="20,44 70,34 120,44 70,40" fill="#f3f0e8" />
        <polygon points="24,42 70,12 70,36" fill="#f3f0e8" />
        <polygon points="116,42 70,12 70,36" fill="#f3f0e8" />
      </g>
      <text x="34" y="34" transform="rotate(-33 34 34)" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="700">for i in range(n):</text>
      <g transform="rotate(25 100 20)">
        <rect x="84" y="16" width="44" height="6" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="1.6" />
        <polygon points="128,16 136,19 128,22" fill="#0b0b0b" />
      </g>
      <line x1="0" y1="100" x2="140" y2="100" stroke="#0b0b0b" strokeWidth="3" />
    </svg>
  );
}
