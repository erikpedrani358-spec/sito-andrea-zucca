"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getProject } from "@/lib/projects";
import {
  ProjectTopBar,
  MetaStrip,
  CoordinatesTag,
  NextProject,
} from "@/components/projects/shared";

const project = getProject("anatomia-della-gabbia")!;

function GalleryFigure({
  img,
  index,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  img: (typeof project.gallery)[number];
  index: number;
  sizes?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-white/5"
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={800}
        height={1100}
        sizes={sizes}
        className="h-auto w-full object-cover grayscale transition-all duration-[1.4s] ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
      />
      <figcaption className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-ink to-transparent p-4 font-mono text-[10px] uppercase tracking-brutal text-silver transition-transform duration-500 group-hover:translate-y-0">
        Fig. {String(index + 1).padStart(2, "0")}
      </figcaption>
    </motion.figure>
  );
}

/** Decorative vertical "cage bars" that retract to reveal content. */
function CageBars({ count = 9 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex justify-between">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-px bg-white/20"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true }}
          style={{ transformOrigin: i % 2 ? "top" : "bottom" }}
          transition={{
            duration: 1.2,
            delay: i * 0.06,
            ease: [0.7, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
}

/**
 * ANATOMIA DELLA GABBIA — thesis collection.
 * Mood: monochrome, industrial, tense and suspended. Hysteria & restraint.
 * Signature motion: cage bars that retract to expose imagery, slow grayscale
 * parallax, exposed-lace dividers, breath-paced reveals.
 */
export default function AnatomiaGabbia() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <main
      className="bg-ink"
      style={{ ["--accent" as string]: project.accent } as React.CSSProperties}
    >
      <ProjectTopBar index={project.index} year={project.year} />

      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="vignette relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%]">
          <Image
            src="/assets/projects/anatomia-della-gabbia/01.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale [filter:grayscale(1)_contrast(1.25)_brightness(0.55)]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/40" />
        <CageBars count={11} />

        <motion.div
          style={{ y: titleY }}
          className="relative z-30 mx-auto w-full max-w-[1600px] px-5 text-center md:px-10"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim md:text-xs"
          >
            {project.subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="distress-soft display-tight font-display text-[14vw] uppercase leading-[0.82] text-silver-bright md:text-[11vw]"
          >
            Anatomia
            <br />
            Della Gabbia
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <CoordinatesTag project={project} />
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
          <span className="flex h-10 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-scrollDot" />
          </span>
        </div>
      </section>

      {/* ===================== RATIONALE ===================== */}
      <section className="relative border-t border-white/10 py-24 md:py-36">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
          <span className="mb-10 inline-block font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
            ( The body as protection and restraint )
          </span>
          <div className="space-y-8">
            {project.rationale.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.9, delay: i * 0.06 }}
                className="font-serif text-2xl font-light leading-relaxed text-silver-bright md:text-3xl"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-[1600px] columns-1 gap-4 px-5 sm:columns-2 md:columns-3 md:px-10">
          {project.gallery.map((img, i) => (
            <div key={`${img.src}-${i}`} className="mb-4 break-inside-avoid">
              <GalleryFigure img={img} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== META ===================== */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <MetaStrip project={project} />
        </div>
      </section>

      <NextProject current={project.slug} />
    </main>
  );
}
