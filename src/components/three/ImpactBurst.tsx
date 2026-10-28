import { mulberry32 } from "@/components/art/prng";

/** Manga impact frame for the swing's contact moment: radial speed lines, inked star, SFX, ink drops. */
const rand = mulberry32(42);
const RAYS = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2 + rand() * 0.1;
  const r0 = 62 + rand() * 10;
  const r1 = 96 + rand() * 22;
  const w = 0.025 + rand() * 0.03;
  const p = (r: number, da: number) => `${(120 + Math.cos(a + da) * r).toFixed(1)},${(120 + Math.sin(a + da) * r).toFixed(1)}`;
  return `${p(r0, -w)} ${p(r1, 0)} ${p(r0, w)}`;
});
const star = (r1: number, r2: number, n: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? r2 : r1 + (i % 4 === 0 ? 6 : 0);
    const a = (Math.PI / n) * i - Math.PI / 2;
    return `${(120 + Math.cos(a) * r).toFixed(1)},${(120 + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");
const DROPS: [number, number, number, number, number][] = [
  [150, 92, 3.5, 34, -26],
  [158, 136, 2.5, 40, 18],
  [92, 150, 3, -30, 30],
  [86, 98, 2, -36, -20],
  [128, 160, 2.2, 6, 38],
];

export function ImpactBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      {RAYS.map((pts, i) => (
        <polygon key={i} points={pts} fill="#0b0b0b" />
      ))}
      <polygon points={star(58, 34, 11)} fill="#0b0b0b" />
      <polygon points={star(50, 30, 11)} fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2" strokeLinejoin="miter" />
      <text x="120" y="129" textAnchor="middle" fontFamily="var(--font-sfx)" fontSize="25" fill="#0b0b0b" transform="rotate(-8 120 120)">
        THWACK!
      </text>
      {DROPS.map(([x, y, r, dx, dy], i) => (
        <g key={i} data-drop={`${dx},${dy}`}>
          <circle cx={x} cy={y} r={r} fill="#0b0b0b" />
        </g>
      ))}
    </svg>
  );
}
