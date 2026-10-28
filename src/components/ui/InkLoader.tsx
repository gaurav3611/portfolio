/** A17: a panel inking itself — shown only while a 3D chunk actually loads. */
export function InkLoader({ className = "" }: { className?: string }) {
  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
        <rect x="4" y="4" width="56" height="56" fill="none" stroke="#0b0b0b" strokeWidth="3" className="loader-draw" />
        <path d="M40 60L60 40M48 60L60 48M32 60L60 32" stroke="#0b0b0b" strokeWidth="1.5" />
      </svg>
      <span className="caption">Preparing the next page…</span>
    </div>
  );
}
