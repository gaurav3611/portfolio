"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useRef, useState } from "react";
import { site } from "@/lib/data";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { useTheme } from "@/components/providers/ThemeProvider";

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), {
  ssr: false,
});

export function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // mount the globe only once the section is near the viewport
  const inView = useInView(sectionRef, { once: true, margin: "500px" });
  const { theme } = useTheme();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* ambient glow behind the CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.16),rgb(6_182_212/0.06)_50%,transparent_70%)]"
      />
      {/* 3D points globe, vignetted so the CTA stays readable */}
      {inView && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 hidden size-[56rem] -translate-x-1/2 -translate-y-1/2 opacity-60 [mask-image:radial-gradient(circle_at_50%_50%,#000,transparent_72%)] md:block"
        >
          <ContactScene dark={theme === "dark"} />
        </div>
      )}

      <div className="section-shell relative text-center">
        <Reveal>
          <p className="font-mono text-sm tracking-[0.25em] text-primary uppercase">
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Let&apos;s build something{" "}
            <span className="text-gradient">worth shipping.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.availability}. If you&apos;re hiring engineers who own systems
            end to end — or you have a hard problem that spans hardware, backend
            and interface — I&apos;d like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-primary to-secondary px-8 py-4.5 text-lg font-semibold text-white shadow-xl shadow-primary/30 transition-shadow hover:shadow-primary/50"
              >
                <Mail className="size-5" />
                {site.email}
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-2xl border border-foreground/15 px-5 py-4.5 font-semibold transition-colors hover:border-foreground/35 hover:bg-foreground/5"
                aria-label="Copy email address"
              >
                {copied ? (
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 text-success"
                  >
                    <Check className="size-4.5" /> Copied
                  </motion.span>
                ) : (
                  <>
                    <Copy className="size-4.5" /> Copy
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="card group flex items-center justify-center gap-3 p-5"
            >
              <Phone className="size-4.5 text-accent" />
              <span className="text-sm font-medium text-foreground/85">
                {site.phone}
              </span>
            </a>
            <div className="card flex items-center justify-center gap-3 p-5">
              <MapPin className="size-4.5 text-accent" />
              <span className="text-sm font-medium text-foreground/85">
                {site.location} · IST (UTC+5:30)
              </span>
            </div>
            <div className="card flex items-center justify-center gap-3 p-5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <span className="text-sm font-medium text-foreground/85">
                Available for work
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-4">
            {[
              { href: site.github, icon: GithubIcon, label: "GitHub · gauravgandhi" },
              { href: site.github2, icon: GithubIcon, label: "GitHub · gaurav3611" },
              { href: site.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2 rounded-xl border border-foreground/12 px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Icon className="size-4.5" />
                  {label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
