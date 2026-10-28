import type { SkillId } from "@/lib/data";

/** A14: field-guide glyphs on one 48×48 grid, 2px contours, one toned face. Decorative. */
const S = { fill: "none", stroke: "#0b0b0b", strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const GLYPHS: Record<SkillId, React.ReactNode> = {
  languages: (
    <>
      <path d="M16 14 L6 24 L16 34 M32 14 L42 24 L32 34" {...S} strokeWidth={3} />
      <path d="M28 8 L20 40" {...S} />
      <path d="M22 30 L26 40 L30 30 Z" fill="url(#ht-mid)" stroke="#0b0b0b" strokeWidth={1.5} />
    </>
  ),
  web: (
    <>
      <rect x="5" y="9" width="38" height="30" fill="url(#ht-light)" {...{ stroke: "#0b0b0b", strokeWidth: 2 }} />
      <rect x="5" y="9" width="38" height="7" fill="#0b0b0b" />
      <path d="M14 30 H30 M26 25 L31 30 L26 35" {...S} />
    </>
  ),
  databases: (
    <>
      <path d="M10 12 V36 A14 5 0 0 0 38 36 V12" fill="url(#ht-light)" stroke="#0b0b0b" strokeWidth={2} />
      <ellipse cx="24" cy="12" rx="14" ry="5" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth={2} />
      <path d="M10 20 A14 5 0 0 0 38 20 M10 28 A14 5 0 0 0 38 28" {...S} />
    </>
  ),
  distributed: (
    <>
      <path d="M24 24 L10 10 M24 24 L38 10 M24 24 L10 38 M24 24 L38 38 M10 10 H38 V38 H10 Z" {...S} strokeWidth={1.4} strokeDasharray="3 2" />
      {[[10, 10], [38, 10], [10, 38], [38, 38]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth={2} />
      ))}
      <circle cx="24" cy="24" r="6" fill="#0b0b0b" />
    </>
  ),
  iot: (
    <>
      <rect x="12" y="18" width="20" height="20" fill="url(#ht-mid)" stroke="#0b0b0b" strokeWidth={2} />
      <path d="M16 18 V14 M22 18 V14 M28 18 V14 M16 38 V42 M22 38 V42 M28 38 V42 M12 24 H8 M12 32 H8 M32 24 H36 M32 32 H36" {...S} />
      <path d="M34 12 A8 8 0 0 1 42 4 M34 16 A12 12 0 0 1 46 4" {...S} transform="translate(-2 4)" />
    </>
  ),
  ml: (
    <>
      <path d="M6 6 V42 H42" {...S} />
      {[[14, 32], [18, 26], [12, 22], [22, 34], [30, 16], [36, 20], [32, 12], [38, 26]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={i < 4 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth={1.4} />
      ))}
      <path d="M10 40 L40 8" {...S} strokeDasharray="4 3" />
    </>
  ),
  dataviz: (
    <>
      <path d="M6 42 H28" {...S} />
      <rect x="8" y="26" width="5" height="16" fill="#0b0b0b" />
      <rect x="15" y="16" width="5" height="26" fill="url(#ht-mid)" stroke="#0b0b0b" strokeWidth={1.5} />
      <rect x="22" y="30" width="5" height="12" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth={1.5} />
      <path d="M36 14 V24 H46 A10 10 0 1 1 36 14 Z" fill="url(#hatch)" stroke="#0b0b0b" strokeWidth={2} transform="translate(-4 0)" />
    </>
  ),
  mobile: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="3" fill="url(#ht-light)" stroke="#0b0b0b" strokeWidth={2} />
      <rect x="20" y="4" width="8" height="3" fill="#0b0b0b" />
      <path d="M21 39 H27" {...S} />
    </>
  ),
  tools: (
    <>
      <path d="M12 6 V42 M12 18 Q12 26 26 26 H30 M12 30 Q12 36 22 36" {...S} />
      {[[12, 10], [12, 42], [34, 26], [26, 36]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 2 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth={2} />
      ))}
    </>
  ),
  core: (
    <>
      <path d="M24 10 L13 24 M24 10 L35 24 M13 24 L7 38 M13 24 L19 38 M35 24 L41 38" {...S} />
      {[[24, 10], [13, 24], [35, 24], [7, 38], [19, 38], [41, 38]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 0 ? "#0b0b0b" : i === 2 ? "url(#ht-mid)" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth={2} />
      ))}
    </>
  ),
};

export function ToolkitGlyph({ id, className }: { id: SkillId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {GLYPHS[id]}
    </svg>
  );
}
