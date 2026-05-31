/**
 * Contact strip shown below featured projects on the home page.
 * Keep links explicit and easy to replace with final handles.
 */
export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-ink py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6 md:mb-14">
          <h2 className="font-script text-4xl italic text-silver-bright md:text-6xl">
            Contact
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
            Direct links
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <a
            href="https://wa.me/393516521573"
            target="_blank"
            rel="noreferrer"
            className="group border border-white/10 px-5 py-6 transition-colors hover:border-blood-bright/60"
          >
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              WhatsApp
            </span>
            <span className="font-sans text-sm text-silver-bright transition-colors group-hover:text-blood-bright">
              +39 351 652 1573
            </span>
          </a>

          <a
            href="https://www.instagram.com/_itsandreh_"
            target="_blank"
            rel="noreferrer"
            className="group border border-white/10 px-5 py-6 transition-colors hover:border-blood-bright/60"
          >
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Instagram
            </span>
            <span className="font-sans text-sm text-silver-bright transition-colors group-hover:text-blood-bright">
              @_itsandreh_
            </span>
          </a>

          <a
            href="mailto:Zuccaandrea1999@outlook.it"
            className="group border border-white/10 px-5 py-6 transition-colors hover:border-blood-bright/60"
          >
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Email
            </span>
            <span className="font-sans text-sm text-silver-bright transition-colors group-hover:text-blood-bright">
              Zuccaandrea1999@outlook.it
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
