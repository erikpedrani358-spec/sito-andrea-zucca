"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { projects } from "@/lib/projects";

/**
 * Editorial index of the three collections.
 * Hovering a row reveals a floating cover preview that trails the cursor
 * (a hallmark of high-fashion portfolios) and tints the row in the
 * project's own accent colour.
 */
export default function FeaturedProjects() {
  const [active, setActive] = useState<number | null>(null);

  // Floating preview position (cursor trail with spring lag).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });
  const wrapRef = useRef<HTMLUListElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section
      id="work"
      className="relative bg-ink py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Section header */}
        <div className="mb-14 flex items-end justify-between border-b border-white/10 pb-6 md:mb-20">
          <h2 className="font-script text-4xl italic text-silver-bright md:text-6xl">
            <span className="font-script not-italic">Selected</span> Works
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
            (03) — 2024 / 2025
          </span>
        </div>

        {/* Project rows */}
        <ul className="relative" ref={wrapRef} onMouseMove={handleMove}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex items-center justify-between gap-6 border-b border-white/10 py-7 transition-colors md:py-10"
                style={
                  active === i
                    ? ({ ["--accent" as string]: p.accent } as React.CSSProperties)
                    : undefined
                }
              >
                {/* Index */}
                <span className="font-mono text-xs text-silver-dim transition-colors group-hover:text-[var(--accent)] md:text-sm">
                  {p.index}
                </span>

                {/* Title */}
                <span className="flex-1">
                  <span
                    className="block font-display text-[10vw] uppercase leading-none text-silver-bright transition-all duration-500 group-hover:translate-x-3 group-hover:text-[var(--accent)] md:text-[6.5vw]"
                    style={{ WebkitTextStroke: active === i ? "0" : undefined }}
                  >
                    {p.title}
                  </span>
                  <span className="mt-2 block max-w-md font-sans text-xs text-silver-dim opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-sm">
                    {p.teaser}
                  </span>
                </span>

                {/* Year + arrow */}
                <span className="hidden items-center gap-6 font-mono text-xs uppercase tracking-brutal text-silver-dim md:flex">
                  {p.subtitle}
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}

          {/* Floating cursor-trailing preview */}
          <motion.div
            style={{ left: sx, top: sy }}
            className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className="absolute left-0 top-0 translate-x-0 -translate-y-1/2"
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-72 w-56 overflow-hidden"
                >
                  <Image
                    src={
                      p.slug === "senza-limiti"
                        ? "/assets/projects/senza-limiti/03.jpg"
                        : p.slug === "anatomia-della-gabbia"
                        ? "/assets/projects/anatomia-della-gabbia/09.jpg"
                        : p.cover
                    }
                    alt={p.title}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-color"
                    style={{ background: p.accent, opacity: 0.18 }}
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </ul>
      </div>
    </section>
  );
}
