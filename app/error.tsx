"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[900px] flex-col items-start justify-center gap-6 px-5 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-brutal text-blood-bright">
        Runtime error
      </p>
      <h1 className="font-serif text-4xl leading-tight text-silver-bright md:text-5xl">
        Something went wrong.
      </h1>
      <button
        type="button"
        onClick={() => reset()}
        className="border border-blood-deep/60 px-5 py-3 font-mono text-[11px] uppercase tracking-brutal text-silver hover:text-blood-bright"
      >
        Retry
      </button>
    </main>
  );
}
