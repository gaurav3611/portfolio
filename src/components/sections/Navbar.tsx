"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import { Magnetic } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(
    () => scrollY.on("change", (y) => setScrolled(y > 40)),
    [scrollY]
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={`mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 md:px-6 ${
            scrolled ? "glass mx-4 shadow-2xl shadow-black/20 md:mx-auto" : ""
          }`}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight"
          >
            gaurav<span className="text-gradient">.gandhi</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3.5 py-2 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden lg:block">
              <a
                href={site.resumeUrl}
                download
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-primary/40"
              >
                <Download className="size-4" /> Resume
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <span className="font-display text-lg font-bold">
                gaurav<span className="text-gradient">.gandhi</span>
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2"
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>
              </div>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-4xl font-bold tracking-tight text-foreground/90 transition-colors hover:text-gradient"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-8 pb-12">
              <a
                href={site.resumeUrl}
                download
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary px-4 py-4 font-semibold text-white"
              >
                <Download className="size-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
