/** A07: FinFactor field-log workspace. No company logo — the name is page typography. */
const draw = (delay: number) => ({ "--len": 1, "--delay": `${delay}s` }) as React.CSSProperties;

function Terminal({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="6" y="6" width="200" height="150" fill="url(#ht-mid)" />
      <rect width="200" height="150" fill="#0b0b0b" stroke="#0b0b0b" strokeWidth="3" />
      <rect x="10" y="22" width="180" height="118" fill="#f3f0e8" />
      {[14, 26, 38].map((cx) => (
        <circle key={cx} cx={cx} cy="11" r="3.2" fill="#f3f0e8" />
      ))}
      <g fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" fill="#0b0b0b">
        <text x="18" y="42">$ mvn spring-boot:run</text>
        <text x="18" y="60">Started Application</text>
        <text x="18" y="78">GET /api/v1/accounts 200</text>
        <text x="18" y="96">$ npm run build</text>
        <text x="18" y="114">✓ compiled</text>
      </g>
      <rect x="18" y="122" width="7" height="11" fill="#0b0b0b" />
      <polygon points="150,22 190,22 190,70" fill="url(#ht-light)" opacity="0.7" />
    </g>
  );
}

function Box({ x, y, w, label, sub }: { x: number; y: number; w: number; label: string; sub: string }) {
  return (
    <g>
      <rect x={x + 5} y={y + 5} width={w} height="48" fill="url(#ht-mid)" />
      <rect x={x} y={y} width={w} height="48" fill="#f3f0e8" stroke="#0b0b0b" strokeWidth="2.5" />
      <text x={x + w / 2} y={y + 21} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="800">
        {label}
      </text>
      <text x={x + w / 2} y={y + 37} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="700" fill="#3d3a35">
        {sub}
      </text>
    </g>
  );
}

function FormSketch({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#0b0b0b" fill="none">
      <rect width="130" height="150" fill="#f3f0e8" strokeWidth="2.5" />
      <rect width="130" height="16" fill="#0b0b0b" />
      <g strokeWidth="1.2">
        <line x1="12" y1="34" x2="60" y2="34" />
        <rect x="12" y="40" width="106" height="16" />
        <line x1="12" y1="70" x2="50" y2="70" />
        <rect x="12" y="76" width="106" height="16" />
      </g>
      <rect x="12" y="108" width="54" height="22" fill="#0b0b0b" />
      <rect x="72" y="108" width="46" height="22" fill="url(#hatch)" strokeWidth="1.2" />
    </g>
  );
}

const note = { fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, fontStyle: "italic" } as const;

export function FieldLog({ className }: { className?: string }) {
  const label =
    "Black-and-white technical panel of a software workspace: a terminal running a Spring Boot service, a diagram linking a TypeScript frontend to a Java service and a database, and a sketched web form.";
  return (
    <>
      {/* Landscape composition */}
      <svg viewBox="0 0 720 300" className={`hidden md:block ${className ?? ""}`} role="img" aria-label={label}>
        <rect width="720" height="300" fill="url(#grid)" />
        <rect width="720" height="300" fill="none" stroke="#0b0b0b" strokeWidth="6" />
        <rect x="0" y="0" width="720" height="14" fill="url(#hatch)" />
        <Terminal x={24} y={70} />
        <Box x={268} y={50} w={180} label="FRONTEND · TS" sub="UI features" />
        <Box x={268} y={130} w={180} label="SERVICE · JAVA" sub="Spring Boot" />
        <Box x={268} y={210} w={180} label="DB" sub="persistence" />
        <g fill="none" stroke="#0b0b0b" strokeWidth="2" markerEnd="url(#arrow)">
          <path d="M330 100 V128" pathLength={1} className="ink-draw" style={draw(0.1)} />
          <path d="M386 128 V100" pathLength={1} className="ink-draw" style={draw(0.3)} />
          <path d="M358 180 V208" pathLength={1} className="ink-draw" style={draw(0.5)} />
          <path d="M226 150 H264" pathLength={1} className="ink-draw" style={draw(0.7)} />
        </g>
        <text x="282" y="118" {...note}>request</text>
        <text x="392" y="118" {...note}>response</text>
        <text x="230" y="143" {...note}>logs</text>
        <FormSketch x={540} y={70} />
        <path d="M470 74 Q505 60 536 86" fill="none" stroke="#0b0b0b" strokeWidth="1.4" markerEnd="url(#arrow)" />
        <text x="470" y="56" {...note}>fix #</text>
        <text x="700" y="290" textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fontWeight="800">LOG 02-A</text>
      </svg>
      {/* Portrait composition for small screens */}
      <svg viewBox="0 0 300 520" className={`md:hidden ${className ?? ""}`} role="img" aria-label={label}>
        <rect width="300" height="520" fill="url(#grid)" />
        <rect width="300" height="520" fill="none" stroke="#0b0b0b" strokeWidth="6" />
        <Terminal x={46} y={20} />
        <Box x={60} y={200} w={180} label="FRONTEND · TS" sub="UI features" />
        <Box x={60} y={286} w={180} label="SERVICE · JAVA" sub="Spring Boot" />
        <Box x={60} y={372} w={180} label="DB" sub="persistence" />
        <g fill="none" stroke="#0b0b0b" strokeWidth="2" markerEnd="url(#arrow)">
          <path d="M150 176 V196" />
          <path d="M120 250 V282" />
          <path d="M180 282 V250" />
          <path d="M150 336 V368" />
        </g>
        <text x="72" y="270" {...note}>req</text>
        <text x="190" y="270" {...note}>res</text>
        <text x="282" y="506" textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fontWeight="800">LOG 02-A</text>
      </svg>
    </>
  );
}
