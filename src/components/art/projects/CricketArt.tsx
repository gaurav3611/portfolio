/** A10: flagship cricket-swing illustration. Bat drawn upright, then rotated mid-swing. */
const star = (r1: number, r2: number, n = 12) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI / n) * i;
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");

export function CricketArt({ className, label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {/* Background: ground silhouette in light tone */}
      <rect width="640" height="360" fill="#f3f0e8" />
      <rect width="640" height="230" fill="url(#ht-light)" opacity="0.55" />
      <ellipse cx="320" cy="370" rx="420" ry="120" fill="url(#ht-light)" stroke="#0b0b0b" strokeWidth="1.5" />
      <rect x="520" y="150" width="90" height="70" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="1.5" />
      <rect x="520" y="150" width="90" height="10" fill="url(#hatch)" />
      <g stroke="#0b0b0b" strokeWidth="2">
        <path d="M86 300 V230 M96 300 V230 M106 300 V230" />
        <path d="M84 229 H97 M95 229 H108" strokeWidth="2.5" />
      </g>

      {/* Middle: speed lines + swing arcs trailing the toe */}
      <g stroke="#0b0b0b" strokeLinecap="round">
        {[40, 70, 100, 330, 350].map((y, i) => (
          <line key={y} x1={i < 3 ? 380 : 0} x2={i < 3 ? 640 : 230} y1={y} y2={y - 6} strokeWidth={i % 2 ? 0.8 : 1.6} />
        ))}
      </g>
      <g fill="none" stroke="#0b0b0b" strokeLinecap="round">
        <path d="M150 210 Q 260 330 444 288" strokeWidth="5" />
        <path d="M170 180 Q 280 300 432 262" strokeWidth="2.5" />
        <path d="M200 150 Q 300 262 420 236" strokeWidth="1.2" strokeDasharray="10 6" />
      </g>

      {/* Foreground: the bat, rotated mid-swing */}
      <g transform="translate(330 190) rotate(-50)" strokeLinejoin="round">
        {/* handle with grip ridges */}
        <rect x="-8" y="-172" width="16" height="104" rx="6" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="3" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="-8" x2="8" y1={-164 + i * 7} y2={-160 + i * 7} stroke="#0b0b0b" strokeWidth="1.4" />
        ))}
        {/* sensor module strapped below the grip */}
        <rect x="-15" y="-112" width="30" height="34" rx="3" fill="#0b0b0b" stroke="#0b0b0b" strokeWidth="2.5" />
        <rect x="-10" y="-106" width="20" height="10" fill="#f3f0e8" />
        <circle cx="0" cy="-86" r="3" fill="#f3f0e8" />
        <path d="M-17 -114 H17 M-17 -76 H17" stroke="#0b0b0b" strokeWidth="3" />
        {/* shoulders + blade */}
        <path d="M-8 -70 Q-30 -64 -30 -40 V140 Q-30 156 0 158 Q30 156 30 140 V-40 Q30 -64 8 -70 Z" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="3" />
        <path d="M18 -48 Q30 -40 30 -30 V140 Q30 156 10 158 L18 150 Z" fill="#0b0b0b" />
        {/* wood grain */}
        {[-20, -10, 0, 9].map((x) => (
          <path key={x} d={`M${x} -40 Q${x + 2} 50 ${x} 140`} fill="none" stroke="#0b0b0b" strokeWidth="0.9" />
        ))}
        <rect x="-30" y="100" width="48" height="40" fill="url(#ht-light)" opacity="0.6" />
        {/* impact at the sweet spot */}
        <g transform="translate(-4 92)">
          <polygon points={star(32, 14)} fill="#0b0b0b" />
          <polygon points={star(24, 11)} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="1.5" />
        </g>
      </g>

      {/* Sensor callout */}
      <path d="M250 124 L190 64 H120" fill="none" stroke="#0b0b0b" strokeWidth="1.5" />
      <rect x="20" y="48" width="172" height="30" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
      <text x="106" y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="12">ESP32 + MPU6050</text>

      {/* Decorative SFX */}
      <text x="625" y="92" textAnchor="end" transform="rotate(-8 625 92)" fontFamily="var(--font-sfx)" fontSize="44" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" paintOrder="stroke" letterSpacing="2">
        SWOOSH!
      </text>
    </svg>
  );
}
