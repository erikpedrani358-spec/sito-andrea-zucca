"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "@/components/ui/Magnetic";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Fixed navigation.
 * - Transparent over the hero, then frosts to opaque black after scroll.
 * - "Projects" opens an animated dropdown listing the three collections.
 * - Logotype scrolls smoothly to the top via the shared Lenis instance.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = (e: React.MouseEvent) => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo(0);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
        scrolled
          ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        {/* Logotype */}
        <Link
          href="/"
          onClick={scrollTop}
          data-cursor="hover"
          className="font-script text-2xl leading-none text-silver-bright md:text-[2rem]"
        >
          Andrea Zucca
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <Magnetic key={l.href}>
              <Link
                href={l.href}
                className="link-underline font-mono text-xs uppercase tracking-brutal text-silver hover:text-silver-bright"
              >
                {l.label}
              </Link>
            </Magnetic>
          ))}

          {/* Projects dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenProjects(true)}
            onMouseLeave={() => setOpenProjects(false)}
          >
            <button
              className="font-mono text-xs uppercase tracking-brutal text-silver hover:text-silver-bright"
              data-cursor="hover"
            >
              Projects
              <span className="ml-1 inline-block text-blood-bright">▾</span>
            </button>

            <AnimatePresence>
              {openProjects && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full w-72 border border-white/10 bg-ink-900/95 p-2 backdrop-blur-xl"
                >
                  {projects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group flex items-baseline justify-between gap-4 px-3 py-3 transition-colors hover:bg-white/5"
                    >
                      <span className="font-serif text-lg text-silver-bright">
                        {p.title}
                      </span>
                      <span className="font-mono text-[10px] tracking-brutal text-silver-dim group-hover:text-blood-bright">
                        {p.index}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 flex-col items-end justify-center gap-1.5 md:hidden"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={cn(
              "h-px bg-silver-bright transition-all duration-300",
              mobileOpen ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
            )}
          />
          <span
            className={cn(
              "h-px bg-silver-bright transition-all duration-300",
              mobileOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
            )}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-baseline justify-between border-b border-white/5 py-4"
                >
                  <span className="font-serif text-2xl text-silver-bright">
                    {p.title}
                  </span>
                  <span className="font-mono text-[10px] tracking-brutal text-blood-bright">
                    {p.index}
                  </span>
                </Link>
              ))}
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 font-mono text-xs uppercase tracking-brutal text-silver"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
