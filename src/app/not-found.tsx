import Link from "next/link";
import { MissingPage } from "@/components/art/MissingPage";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="caption bg-ink px-2 py-1 text-paper">Error 404 · Missing page</p>
      <MissingPage className="w-full max-w-lg" />
      <h1 className="font-display text-4xl uppercase leading-none tracking-wide sm:text-6xl">This page has gone off-panel</h1>
      <p className="max-w-md">The page you were looking for isn&rsquo;t in this volume. The link may be mistyped or out of date.</p>
      <Link href="/" className="btn-ink">Return to the cover</Link>
    </main>
  );
}
