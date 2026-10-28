/** A08: Automate Hub order-management workstation. `.art-hl` lights up on card hover/focus. */
export function AutomateHubArt({ className, label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="400" height="300" fill="url(#ht-light)" opacity="0.35" />
      {/* Background: Java module — JDBC — MySQL */}
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
        <polygon points="40,40 110,40 124,30 54,30" fill="url(#ht-light)" />
        <polygon points="110,40 124,30 124,82 110,92" fill="#0b0b0b" />
        <rect x="40" y="40" width="70" height="52" fill="#f3f0e8" />
      </g>
      <text x="75" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="13">JAVA</text>
      <text x="75" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8">backend</text>
      <path d="M126 60 C170 60 220 60 288 60" fill="none" stroke="#0b0b0b" strokeWidth="2.5" strokeDasharray="7 5" className="art-hl" />
      <rect x="180" y="50" width="48" height="20" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2" className="art-hl" />
      <text x="204" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="10">JDBC</text>
      <g stroke="#0b0b0b" strokeWidth="2.5">
        <path d="M292 34 V86 A38 11 0 0 0 368 86 V34" fill="#f3f0e8" />
        <path d="M352 40 V92 A38 11 0 0 0 368 86 V34" fill="url(#hatch-v)" strokeWidth="0" />
        <ellipse cx="330" cy="34" rx="38" ry="11" fill="url(#ht-mid)" />
        <path d="M292 52 A38 11 0 0 0 368 52 M292 70 A38 11 0 0 0 368 70" fill="none" strokeWidth="1.4" />
      </g>
      <text x="330" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="12">MySQL</text>

      {/* Middle: application window with CRUD actions */}
      <g stroke="#0b0b0b" strokeWidth="2.5">
        <rect x="126" y="126" width="210" height="112" fill="url(#ht-mid)" strokeWidth="0" transform="translate(6 6)" />
        <rect x="126" y="126" width="210" height="112" fill="#f3f0e8" />
        <rect x="126" y="126" width="210" height="16" fill="#0b0b0b" />
      </g>
      <text x="134" y="138" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9" fill="#f3f0e8">orders</text>
      {["CREATE", "READ", "UPDATE", "DELETE"].map((t, i) => (
        <g key={t}>
          <rect x={138 + (i % 2) * 98} y={154 + Math.floor(i / 2) * 40} width="88" height="28" fill={i === 0 ? "#0b0b0b" : "#f3f0e8"} stroke="#0b0b0b" strokeWidth="2" />
          <text x={182 + (i % 2) * 98} y={172 + Math.floor(i / 2) * 40} textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="10.5" fill={i === 0 ? "#f3f0e8" : "#0b0b0b"}>
            {t}
          </text>
        </g>
      ))}
      <path d="M231 124 V100 H126" fill="none" stroke="#0b0b0b" strokeWidth="1.6" markerEnd="url(#arrow)" className="art-hl" />

      {/* Foreground: order sheets + package */}
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="26" y="178" width="84" height="104" fill="#f3f0e8" transform="rotate(-8 68 230)" />
        <rect x="22" y="172" width="84" height="104" fill="#f3f0e8" transform="rotate(-2 64 224)" />
      </g>
      <g transform="rotate(-2 64 224)" stroke="#0b0b0b">
        <text x="30" y="190" fontFamily="var(--font-mono)" fontWeight="800" fontSize="9" stroke="none">ORDER #</text>
        {[204, 216, 228, 240, 252].map((y) => (
          <line key={y} x1="30" x2={y % 24 ? 96 : 80} y1={y} y2={y} strokeWidth="1" />
        ))}
      </g>
      <rect x="276" y="276" width="100" height="14" fill="url(#xhatch)" />
      <g stroke="#0b0b0b" strokeWidth="2.5" strokeLinejoin="round">
        <polygon points="290,232 350,232 366,220 306,220" fill="url(#ht-light)" />
        <polygon points="350,232 366,220 366,266 350,278" fill="#0b0b0b" />
        <rect x="290" y="232" width="60" height="46" fill="#f3f0e8" />
        <rect x="314" y="232" width="12" height="46" fill="url(#hatch)" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
