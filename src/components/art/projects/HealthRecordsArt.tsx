/** A09: generic medical document + IPFS node network. No patient data. */
const NODES = [
  [300, 60], [360, 140], [330, 236], [220, 262], [150, 40], [240, 30],
];
const hex = (cx: number, cy: number, r = 18) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");

export function HealthRecordsArt({ className, label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="400" height="300" fill="url(#ht-light)" opacity="0.4" />
      <g stroke="#0b0b0b" strokeWidth="0.6" opacity="0.5">
        <path d="M0 220 L400 120 M0 80 L400 280 M120 0 L260 300" />
      </g>
      {/* Network links */}
      <g stroke="#0b0b0b" strokeWidth="1.2" fill="none">
        {NODES.map(([x, y], i) => {
          const [nx, ny] = NODES[(i + 1) % NODES.length];
          return <line key={i} x1={x} y1={y} x2={nx} y2={ny} />;
        })}
        {NODES.map(([x, y], i) => (
          <line key={`c${i}`} x1="250" y1="150" x2={x} y2={y} strokeDasharray="3 3" className={i === 1 ? "art-hl" : undefined} />
        ))}
      </g>
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <polygon points={hex(x + 3, y + 3)} fill="url(#ht-mid)" />
          <polygon points={hex(x, y)} fill={i === 1 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth="2" />
          <circle cx={x} cy={y} r="4" fill={i === 1 ? "#f3f0e8" : "#0b0b0b"} />
        </g>
      ))}
      {/* File fragments drifting between nodes */}
      {[[330, 98], [200, 220], [190, 74], [290, 200]].map(([x, y], i) => (
        <g key={i} transform={`rotate(${i * 17 - 20} ${x} ${y})`}>
          <path d={`M${x - 8} ${y - 8} H${x + 4} L${x + 8} ${y - 4} V${y + 8} H${x - 8} Z`} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="1.4" />
          <path d={`M${x + 4} ${y - 8} V${y - 4} H${x + 8}`} fill="none" stroke="#0b0b0b" strokeWidth="1.2" />
        </g>
      ))}
      {/* Central generic document — blank lines only */}
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M222 106 H268 L284 122 V196 H222 Z" fill="url(#ht-mid)" strokeWidth="0" transform="translate(5 5)" />
        <path d="M222 106 H268 L284 122 V196 H222 Z" fill="#f3f0e8" />
        <path d="M268 106 V122 H284" fill="none" />
        <rect x="240" y="126" width="20" height="20" fill="#0b0b0b" strokeWidth="0" />
        <path d="M250 129 V143 M243 136 H257" stroke="#f3f0e8" strokeWidth="4" />
        <path d="M232 160 H274 M232 170 H274 M232 180 H260" strokeWidth="1.2" />
      </g>
      {/* MERN application block */}
      <g stroke="#0b0b0b" strokeWidth="2.2">
        {["M", "E", "R", "N"].map((l, i) => (
          <g key={l}>
            <rect x="34" y={84 + i * 34} width="70" height="28" fill={i === 2 ? "#0b0b0b" : "#f3f0e8"} />
            <text x="69" y={103 + i * 34} textAnchor="middle" stroke="none" fill={i === 2 ? "#f3f0e8" : "#0b0b0b"} fontFamily="var(--font-mono)" fontWeight="800" fontSize="13">
              {l}
            </text>
          </g>
        ))}
      </g>
      <text x="69" y="74" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="9">APP</text>
      <path d="M106 150 H216" fill="none" stroke="#0b0b0b" strokeWidth="2.2" markerEnd="url(#arrow)" className="art-hl" />
      <text x="300" y="290" fontFamily="var(--font-mono)" fontWeight="800" fontSize="10">IPFS NODES</text>
    </svg>
  );
}
