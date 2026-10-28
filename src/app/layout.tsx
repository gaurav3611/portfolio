import type { Metadata, Viewport } from "next";
import { Anton, Bowlby_One, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InkDefs } from "@/components/art/InkDefs";
import { site } from "@/lib/data";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
// Latin-only faces on purpose: the CJK fonts used before shipped ~370 @font-face rules
// (~270 KB of render-blocking CSS) for the Latin glyphs this site actually uses.
const plex = IBM_Plex_Sans({ variable: "--font-body", weight: ["400", "700"], subsets: ["latin"], display: "swap" });
const bowlby = Bowlby_One({ variable: "--font-sfx-face", weight: "400", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const title = `${site.name} — Full-Stack Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.shortName}` },
  description: site.description,
  keywords: [
    "Gaurav Nitesh Gandhi",
    "Gaurav Gandhi",
    "Full-Stack Developer",
    "Computer Science",
    "VIT Vellore",
    "Java",
    "Spring Boot",
    "TypeScript",
    "IoT",
    "Distributed Systems",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  jobTitle: "Full-Stack Developer",
  sameAs: [site.github, site.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Vellore", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${plex.variable} ${bowlby.variable} ${jetbrains.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="btn-ink fixed left-3 top-3 z-[100] -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <InkDefs />
        {children}
      </body>
    </html>
  );
}
