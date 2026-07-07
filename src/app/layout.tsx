import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Software engineer building full-stack products, distributed backends and IoT systems — React, Spring Boot, Three.js, ESP32. M.Tech CS at VIT. Open to roles and freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Software Engineer`,
    template: `%s · ${site.shortName}`,
  },
  description,
  keywords: [
    "Gaurav Gandhi",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Frontend Engineer",
    "Distributed Systems",
    "IoT Developer",
    "VIT",
    "India",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.shortName} — Software Engineer`,
    description,
    siteName: site.shortName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Software Engineer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  jobTitle: "Software Engineer",
  sameAs: [site.github, site.github2, site.linkedin],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vellore Institute of Technology",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Spring Boot",
    "Distributed Systems",
    "IoT",
    "Three.js",
    "Node.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain">
        {/* Apply the stored theme before first paint — no flash on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"||t==="light"?t:"light"}catch(e){document.documentElement.dataset.theme="light"}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
