"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-ink antialiased">
        <main className="mx-auto flex min-h-screen max-w-[900px] flex-col items-start justify-center gap-6 px-5 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-brutal text-blood-bright">
            Fatal error
          </p>
          <h1 className="font-serif text-4xl leading-tight text-silver-bright md:text-5xl">
            The app crashed while rendering.
          </h1>
          <p className="max-w-[65ch] text-sm text-silver-dim">
            A full refresh usually recovers. If the problem persists, check the server logs for the original exception.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="border border-blood-deep/60 px-5 py-3 font-mono text-[11px] uppercase tracking-brutal text-silver hover:text-blood-bright"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
