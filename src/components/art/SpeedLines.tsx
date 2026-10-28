import { mulberry32 } from "./prng";

/** A02: radial speed lines converging on the title. Decorative. */
function lines(fx: number, fy: number, seed: number) {
  const rand = mulberry32(seed);
  return Array.from({ length: 42 }, (_, i) => {
    const a = (i / 42) * Math.PI * 2 + rand() * 0.08;
    const outer = 900;
    const inner = 420 + rand() * 200;
    return {
      x1: +(fx + Math.cos(a) * outer).toFixed(1),
      y1: +(fy + Math.sin(a) * outer).toFixed(1),
      x2: +(fx + Math.cos(a) * inner).toFixed(1),
      y2: +(fy + Math.sin(a) * inner).toFixed(1),
      w: +(0.6 + rand() * 1.6).toFixed(2),
      d: +(rand() * 0.35).toFixed(2),
    };
  });
}

const DESKTOP = lines(300, 330, 7);
const MOBILE = lines(500, 230, 11);

function Set({ data, className }: { data: ReturnType<typeof lines>; className: string }) {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      {data.map((l, i) => (
        <line
          key={i}
          {...{ x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2 }}
          stroke="#0b0b0b"
          strokeOpacity="0.85"
          strokeWidth={l.w}
          strokeLinecap="round"
          pathLength={1}
          className="ink-draw"
          style={{ "--len": 1, "--delay": `${0.25 + l.d}s` } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export function SpeedLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Set data={DESKTOP} className="absolute inset-0 hidden h-full w-full md:block" />
      <Set data={MOBILE} className="absolute inset-0 h-full w-full md:hidden" />
    </div>
  );
}
