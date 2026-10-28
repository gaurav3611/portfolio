"use client";

import Link from "next/link";
import { MissingPage } from "@/components/art/MissingPage";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="caption bg-ink px-2 py-1 text-paper">Printing error</p>
      <MissingPage className="w-full max-w-lg" />
      <h1 className="font-display text-4xl uppercase leading-none tracking-wide sm:text-6xl">This page failed to print</h1>
      <p className="max-w-md">Something went wrong while rendering this page. Try loading it again; if it keeps happening, head back to the cover.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-ink">Try again</button>
        <Link href="/" className="btn-paper">Return to the cover</Link>
      </div>
    </main>
  );
}
