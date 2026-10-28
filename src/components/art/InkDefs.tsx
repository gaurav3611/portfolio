/**
 * Shared SVG patterns, rendered once (hidden) in the root layout.
 * Every illustration references these ids — see docs/visual-assets.md.
 */
export function InkDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <pattern id="ht-light" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill="#0b0b0b" />
        </pattern>
        <pattern id="ht-mid" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.4" fill="#0b0b0b" />
        </pattern>
        <pattern id="ht-dark" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#0b0b0b" />
          <circle cx="2" cy="2" r="0.8" fill="#f3f0e8" />
        </pattern>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#0b0b0b" strokeWidth="1" />
        </pattern>
        <pattern id="xhatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V4M0 0H4" stroke="#0b0b0b" strokeWidth="0.9" />
        </pattern>
        <pattern id="hatch-v" width="3" height="3" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="3" stroke="#0b0b0b" strokeWidth="1" />
        </pattern>
        <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#a9a49a" strokeWidth="0.5" />
        </pattern>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#0b0b0b" />
        </marker>
      </defs>
    </svg>
  );
}
