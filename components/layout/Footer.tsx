/**
 * Minimal footer: signature, year, credit, and a back-to-top anchor.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink px-5 py-10 md:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <div className="contact-red-glow footer-red-origin" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-script text-3xl text-silver-bright">
          Andrea Zucca
        </span>
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-brutal text-silver-dim md:items-end">
          <span>© {year} Andrea Zucca — All rights reserved</span>
          <span>Milano · 45.4642° N 9.1900° E</span>
        </div>
      </div>
    </footer>
  );
}
