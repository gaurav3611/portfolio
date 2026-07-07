"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/lib/data";
import { Magnetic } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-foreground/8">
      <div className="section-shell flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display font-bold">
            gaurav<span className="text-gradient">.gandhi</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} {site.shortName}. Designed & built
            from scratch — Next.js, Three.js, Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <nav aria-label="Footer" className="flex gap-5 text-sm text-muted">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
          </nav>
          <Magnetic>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex size-11 items-center justify-center rounded-xl border border-foreground/12 text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ArrowUp className="size-4.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
