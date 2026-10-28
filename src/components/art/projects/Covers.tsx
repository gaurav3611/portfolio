/** A24: cover panels for the newer builds. Same 400×300 ink system as A08–A13. */

type ArtProps = { className?: string; label?: string };
const a11y = (label?: string) => (label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const });
const mono = { fontFamily: "var(--font-mono)", fontWeight: 800 } as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect width="400" height="300" fill="#f3f0e8" />
      <rect width="400" height="300" fill="url(#ht-light)" opacity="0.4" />
      {children}
    </>
  );
}

/** SSwinGG: bat sensor → phone + browser over Bluetooth arcs. */
export function SswinggArt({ className, label }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} {...a11y(label)}>
      <Frame>
        {/* bat, diagonal, with sensor board */}
        <g transform="translate(110 160) rotate(-35)" stroke="#0b0b0b" strokeLinejoin="round">
          <rect x="-6" y="-120" width="12" height="70" rx="5" fill="#f3f0e8" strokeWidth="2.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="-6" x2="6" y1={-112 + i * 9} y2={-108 + i * 9} strokeWidth="1.2" />
          ))}
          <path d="M-6 -50 Q-22 -46 -22 -30 V96 Q-22 108 0 110 Q22 108 22 96 V-30 Q22 -46 6 -50 Z" fill="#f3f0e8" strokeWidth="2.5" />
          <path d="M12 -36 Q22 -30 22 -22 V96 Q22 108 6 110 L12 104 Z" fill="#0b0b0b" />
          <rect x="-12" y="-76" width="24" height="22" fill="#0b0b0b" strokeWidth="2" />
          <rect x="-7" y="-71" width="14" height="6" fill="#f3f0e8" strokeWidth="0" />
        </g>
        {/* Bluetooth arcs */}
        <g fill="none" stroke="#0b0b0b" strokeLinecap="round">
          {[22, 38, 54].map((r, i) => (
            <path key={r} d={`M${168 + r * 0.5} ${100 - r * 0.6} A${r} ${r} 0 0 1 ${168 + r * 0.5} ${100 + r * 0.6}`} strokeWidth={3 - i * 0.7} />
          ))}
        </g>
        {/* phone with speed chart */}
        <g stroke="#0b0b0b" strokeWidth="2.5">
          <rect x="246" y="40" width="70" height="128" rx="8" fill="url(#ht-mid)" strokeWidth="0" transform="translate(5 5)" />
          <rect x="246" y="40" width="70" height="128" rx="8" fill="#f3f0e8" />
          <rect x="268" y="44" width="26" height="5" rx="2" fill="#0b0b0b" strokeWidth="0" />
          <polyline points="256,140 266,124 276,130 286,96 296,108 306,84" fill="none" strokeWidth="2" />
          <line x1="256" y1="148" x2="306" y2="148" strokeWidth="1.2" />
        </g>
        <text x="281" y="72" textAnchor="middle" {...mono} fontSize="13">km/h</text>
        {/* browser window */}
        <g stroke="#0b0b0b" strokeWidth="2.5">
          <rect x="214" y="190" width="166" height="92" fill="#f3f0e8" />
          <rect x="214" y="190" width="166" height="14" fill="#0b0b0b" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={226 + i * 50} y={218} width="40" height="50" fill={i === 1 ? "url(#ht-dark)" : "url(#ht-light)"} strokeWidth="1.6" />
          ))}
        </g>
        <path d="M230 168 Q220 180 236 190" fill="none" stroke="#0b0b0b" strokeWidth="1.4" markerEnd="url(#arrow)" />
        <text x="20" y="284" {...mono} fontSize="10">ESP32-C3 + BMI160</text>
      </Frame>
    </svg>
  );
}

/** TRACE: edge nodes inside dashed trust domains, routed requests, one to the cloud. */
export function TraceArt({ className, label }: ArtProps) {
  const nodes: [number, number][] = [
    [70, 190], [130, 240], [150, 160],
    [250, 200], [310, 250], [330, 170],
  ];
  return (
    <svg viewBox="0 0 400 300" className={className} {...a11y(label)}>
      <Frame>
        {/* cloud */}
        <path d="M150 70 Q150 40 180 42 Q194 18 222 30 Q252 22 258 52 Q284 56 280 80 Q278 96 254 96 H168 Q146 96 150 70 Z" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
        <path d="M168 96 H254 Q278 96 280 80" fill="none" stroke="#0b0b0b" strokeWidth="6" opacity="0.15" />
        <text x="214" y="74" textAnchor="middle" {...mono} fontSize="12">CLOUD</text>
        {/* trust domains */}
        <ellipse cx="112" cy="200" rx="88" ry="64" fill="url(#ht-light)" stroke="#0b0b0b" strokeWidth="1.6" strokeDasharray="7 5" />
        <ellipse cx="292" cy="210" rx="88" ry="64" fill="none" stroke="#0b0b0b" strokeWidth="1.6" strokeDasharray="7 5" />
        <text x="40" y="128" {...mono} fontSize="9">TRUST DOMAIN A</text>
        <text x="300" y="138" {...mono} fontSize="9">DOMAIN B</text>
        {/* routed requests: inside A, and one escalated to the cloud */}
        <g fill="none" stroke="#0b0b0b" strokeWidth="2" markerEnd="url(#arrow)">
          <path d="M84 182 L136 166" />
          <path d="M140 228 L150 176" />
          <path d="M160 148 Q170 120 190 100" strokeWidth="2.6" />
          <path d="M262 192 L318 176" />
        </g>
        <path d="M168 168 L236 196" stroke="#0b0b0b" strokeWidth="2" strokeDasharray="3 4" />
        <g stroke="#0b0b0b" strokeWidth="3">
          <line x1="196" y1="176" x2="210" y2="190" />
          <line x1="210" y1="176" x2="196" y2="190" />
        </g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 15 + 4} y={y - 12 + 4} width="30" height="24" fill="url(#ht-mid)" />
            <rect x={x - 15} y={y - 12} width="30" height="24" fill={i === 2 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth="2.2" />
            <line x1={x - 9} x2={x + 9} y1={y - 3} y2={y - 3} stroke={i === 2 ? "#f3f0e8" : "#0b0b0b"} strokeWidth="1.2" />
            <line x1={x - 9} x2={x + 3} y1={y + 4} y2={y + 4} stroke={i === 2 ? "#f3f0e8" : "#0b0b0b"} strokeWidth="1.2" />
          </g>
        ))}
        <text x="20" y="288" {...mono} fontSize="10">EDGE SERVERS · ROUTING POLICY</text>
      </Frame>
    </svg>
  );
}

/** MINIMAL: phone with a big clock and a short text app list; an hourglass pause. */
export function MinimalArt({ className, label }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" className={className} {...a11y(label)}>
      <Frame>
        <g stroke="#0b0b0b" strokeWidth="3">
          <rect x="128" y="24" width="144" height="262" rx="18" fill="url(#ht-mid)" strokeWidth="0" transform="translate(7 7)" />
          <rect x="128" y="24" width="144" height="262" rx="18" fill="#0b0b0b" />
          <rect x="138" y="40" width="124" height="234" rx="8" fill="#f3f0e8" strokeWidth="0" />
        </g>
        <text x="200" y="104" textAnchor="middle" fontFamily="var(--font-display)" fontSize="52">09:41</text>
        <text x="200" y="124" textAnchor="middle" {...mono} fontSize="9">THU · 29 OCT</text>
        {["PHONE", "CAMERA", "NOTES", "MAPS"].map((t, i) => (
          <text key={t} x="156" y={160 + i * 22} {...mono} fontSize="12">
            {t}
          </text>
        ))}
        <text x="156" y="258" {...mono} fontSize="9">↑ APPS</text>
        {/* hourglass pause */}
        <g transform="translate(320 150)" stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M-22 -40 H22 M-22 40 H22" strokeWidth="4" />
          <path d="M-16 -40 Q-16 -8 0 0 Q16 -8 16 -40 Z" fill="#f3f0e8" />
          <path d="M-16 40 Q-16 8 0 0 Q16 8 16 40 Z" fill="#f3f0e8" />
          <path d="M-12 40 Q0 22 12 40 Z" fill="#0b0b0b" strokeWidth="0" />
          <path d="M-8 -30 Q0 -14 8 -30 Z" fill="#0b0b0b" strokeWidth="0" />
        </g>
        <text x="320" y="216" textAnchor="middle" {...mono} fontSize="10">PAUSE</text>
        {/* speed lines left */}
        <g stroke="#0b0b0b" strokeLinecap="round">
          {[70, 110, 150, 190, 230].map((y, i) => (
            <line key={y} x1="20" x2={i % 2 ? 90 : 110} y1={y} y2={y} strokeWidth={i % 2 ? 0.8 : 1.8} />
          ))}
        </g>
      </Frame>
    </svg>
  );
}
