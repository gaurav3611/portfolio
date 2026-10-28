import type { ReactNode } from "react";

/**
 * Ink-panel reveal, CSS only (scroll-driven `animation-timeline: view()`).
 * Browsers without support, reduced motion, and no-JS visitors simply see the content.
 * `delay` is kept for call-site compatibility; scroll position drives the timing.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag data-reveal className={`reveal-wipe ${className}`}>
      {children}
    </Tag>
  );
}

/** Small rise for text blocks, same mechanism. */
export function Rise({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Tag data-reveal className={`reveal-rise ${className}`}>
      {children}
    </Tag>
  );
}
