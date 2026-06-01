"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { projects, type Project } from "@/lib/projects";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Fixed "back to index" bar shared by every project route.
 * Accent colour comes from the route theme via the --accent CSS variable.
 */
export function ProjectTopBar({ index, year }: { index: string; year: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[60] md:top-24">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-brutal text-silver hover:text-[var(--accent)]"
          data-cursor="hover"
        >
          <span className="text-[var(--accent)]">←</span> Index
        </Link>
        <span className="pointer-events-auto font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
          {index} / {year}
        </span>
      </div>
    </div>
  );
}

/** A labelled coordinate / metadata strip. */
export function MetaStrip({ project }: { project: Project }) {
  const rows: [string, string][] = [
    ["Location", project.location],
    ["Latitude", project.coordinates.lat],
    ["Longitude", project.coordinates.lng],
    ["Year", project.year],
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
      {rows.map(([k, v]) => (
        <div key={k} className="bg-ink p-5 md:p-6">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
            {k}
          </span>
          <span className="font-mono text-sm text-silver-bright">{v}</span>
        </div>
      ))}
    </div>
  );
}

/** Large pulsing GPS readout used in project heroes. */
export function CoordinatesTag({ project }: { project: Project }) {
  return (
    <div className="font-mono text-[11px] uppercase leading-relaxed tracking-brutal text-silver-dim">
      <span className="text-[var(--accent)]">◉</span> {project.coordinates.lat}
      <br />
      <span className="opacity-0">◉</span> {project.coordinates.lng}
    </div>
  );
}

/** "Next collection" footer link, magnetic and full-bleed. */
export function NextProject({ current }: { current: Project["slug"] }) {
  const idx = projects.findIndex((p) => p.slug === current);
  const next = projects[(idx + 1) % projects.length];
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <span className="mb-6 block text-center font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
          Next collection
        </span>
        <Magnetic strength={0.25}>
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="hover"
            className="group relative mx-auto block w-fit"
          >
            <motion.span
              className="block text-center font-display text-[14vw] uppercase leading-none text-silver-bright transition-colors duration-500 group-hover:text-[var(--accent)] md:text-[9vw]"
              style={{ ["--accent" as string]: next.accent } as React.CSSProperties}
            >
              {next.title}
            </motion.span>
            <span className="mt-4 block text-center font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
              {next.subtitle} →
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

/**
 * Reusable scroll-reveal image with a clip-path wipe.
 * `direction` controls the wipe origin; accent overlay flashes on reveal.
 */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.2, clipPath: "inset(0 0 0% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={`object-cover ${imgClassName ?? ""}`}
      />
    </motion.div>
  );
}
