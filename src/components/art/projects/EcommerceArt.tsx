/** A13: distributed e-commerce comic spread with a diagonal gutter. */
export function EcommerceArt({ className, label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {/* Two panels split by a diagonal gutter */}
      <polygon points="0,0 170,0 130,300 0,300" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="3" />
      <polygon points="182,0 400,0 400,300 142,300" fill="url(#ht-light)" stroke="#0b0b0b" strokeWidth="3" />

      {/* Left: React storefront */}
      <g stroke="#0b0b0b" strokeWidth="2">
        <rect x="14" y="40" width="118" height="190" fill="#f3f0e8" strokeWidth="2.5" />
        <rect x="14" y="40" width="118" height="16" fill="#0b0b0b" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={22 + (i % 2) * 54} y={66 + Math.floor(i / 2) * 64} width="46" height="40" fill={i === 1 ? "url(#ht-dark)" : "url(#ht-mid)"} />
            <line x1={22 + (i % 2) * 54} x2={56 + (i % 2) * 54} y1={114 + Math.floor(i / 2) * 64} y2={114 + Math.floor(i / 2) * 64} strokeWidth="1.2" />
          </g>
        ))}
        <path d="M40 200 h8 l6 16 h20 l5 -11 h-28" fill="none" strokeWidth="2" />
        <circle cx="57" cy="222" r="2.5" fill="#0b0b0b" />
        <circle cx="72" cy="222" r="2.5" fill="#0b0b0b" />
      </g>
      <text x="20" y="52" fontFamily="var(--font-mono)" fontWeight="800" fontSize="8" fill="#f3f0e8">REACT · STORE</text>

      {/* Right: ZooKeeper coordinates the services */}
      <g stroke="#0b0b0b" strokeWidth="1.2" strokeDasharray="3 3">
        {[230, 290, 350].map((x) => (
          <line key={x} x1="290" y1="44" x2={x} y2="100" />
        ))}
      </g>
      <circle cx="290" cy="34" r="18" fill="#0b0b0b" stroke="#0b0b0b" strokeWidth="2.5" />
      <text x="290" y="38" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="9" fill="#f3f0e8">ZK</text>
      <text x="314" y="30" fontFamily="var(--font-mono)" fontWeight="800" fontSize="8">ZOOKEEPER</text>
      {[230, 290, 350].map((x, i) => (
        <g key={x}>
          <rect x={x - 22 + 4} y="104" width="44" height="40" fill="url(#ht-mid)" />
          <rect x={x - 22} y="100" width="44" height="40" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" className={i === 0 ? "art-hl" : undefined} />
          <text x={x} y="118" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="7.5">SPRING</text>
          <text x={x} y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="800" fontSize="7.5">BOOT</text>
        </g>
      ))}
      {/* HDFS cluster */}
      {[200, 245, 290, 335, 375].map((x, i) => (
        <g key={x} stroke="#0b0b0b" strokeWidth="2">
          <path d={`M${x - 16} 214 V246 A16 5 0 0 0 ${x + 16} 246 V214`} fill={i === 2 ? "url(#ht-dark)" : "#f3f0e8"} />
          <ellipse cx={x} cy="214" rx="16" ry="5" fill="#f3f0e8" />
        </g>
      ))}
      <rect x="180" y="200" width="214" height="62" fill="none" stroke="#0b0b0b" strokeWidth="1.4" strokeDasharray="6 4" />
      <text x="186" y="278" fontFamily="var(--font-mono)" fontWeight="800" fontSize="10">HADOOP HDFS</text>
      <g fill="none" stroke="#0b0b0b" strokeWidth="2" markerEnd="url(#arrow)">
        <path d="M290 142 V196" className="art-hl" />
        <path d="M230 142 V196" />
        <path d="M350 142 V196" />
      </g>

      {/* Request path storefront → JWT → service */}
      <path d="M132 120 H140" fill="none" stroke="#0b0b0b" strokeWidth="2.5" className="art-hl" />
      <path d="M182 120 H204" fill="none" stroke="#0b0b0b" strokeWidth="2.5" markerEnd="url(#arrow)" className="art-hl" />
      <circle cx="160" cy="120" r="21" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="3" />
      <circle cx="160" cy="120" r="16" fill="none" stroke="#0b0b0b" strokeWidth="1.2" strokeDasharray="2 2" />
      <text x="160" y="124" textAnchor="middle" fontFamily="var(--font-sfx)" fontSize="11">JWT</text>
    </svg>
  );
}
