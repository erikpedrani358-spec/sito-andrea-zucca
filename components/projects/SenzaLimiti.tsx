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
  RevealImage,
} from "@/components/projects/shared";
import BarbedWire from "@/components/projects/BarbedWire";

const project = getProject("senza-limiti")!;

/**
 * SENZA LIMITI — Fashion Show 2024.
 * Mood: aggressive, blood-red, barbed wire, distressed runway typography.
 * Signature motion: distortion-filtered titles, barbed-wire stroke-draw,
 * red scanline sweep, clip-path image reveals, RGB-split glitch on hover.
 */
export default function SenzaLimiti() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const stripY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const teaserOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 0.45, 0]);
  const teaserY = useTransform(scrollYProgress, [0, 0.35], ["0%", "-18%"]);

  return (
    <main
      className="bg-ink"
      style={{ ["--accent" as string]: project.accent } as React.CSSProperties}
    >
      <ProjectTopBar index={project.index} year={project.year} />

      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="vignette relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
      >
        {/* Faint runway backdrop */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/projects/senza-limiti/03.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover [filter:contrast(1.15)_brightness(0.78)]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent,rgba(5,5,5,0.72))]" />
        {/* Red scanline sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-blood-bright/10 to-transparent"
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10"
        >
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="distress display-tight font-display text-[19vw] uppercase leading-[0.78] md:text-[16vw]"
            >
              <span className="block text-blood">Senza</span>
              <span className="block text-blood">Limiti</span>
            </motion.h1>

            {/* Barbed wire stretched across the title */}
            <BarbedWire className="absolute left-0 top-[42%] h-12 w-full" />

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="distress-soft mt-2 block font-display text-[7vw] uppercase leading-none text-metal md:text-[5vw]"
            >
              Fashion Show 2024
            </motion.span>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <CoordinatesTag project={project} />
            <motion.p
              style={{ opacity: teaserOpacity, y: teaserY }}
              className="max-w-sm font-sans text-sm text-silver will-reveal md:text-base"
            >
              {project.teaser}
            </motion.p>
          </div>
        </motion.div>

        {/* Hero image strip */}
        <motion.div
          style={{ y: stripY }}
          className="relative z-10 mx-auto mt-12 grid w-full max-w-[1600px] grid-cols-3 gap-3 px-5 md:px-10"
        >
          {["02", "03", "01"].map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.9 }}
              className="relative aspect-[3/4] overflow-hidden border border-blood-deep/40"
            >
              <Image
                src={`/assets/projects/senza-limiti/${n}.jpg`}
                alt="Senza Limiti runway look"
                fill
                sizes="33vw"
                className="object-cover [filter:contrast(1.15)]"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===================== RATIONALE ===================== */}
      <section className="relative border-t border-blood-deep/30 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-blood-deep/40">
              <Image
                src="/assets/projects/senza-limiti/01.jpg"
                alt="Senza Limiti — backstage profile"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover [filter:contrast(1.1)]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center md:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-blood-bright" />
              <span className="font-mono text-[11px] uppercase tracking-brutal text-blood-bright">
                Design Rationale
              </span>
            </div>
            <div className="relative space-y-3 pl-5 md:space-y-4 md:pl-6">
              <span
                aria-hidden
                className="absolute bottom-1 left-0 top-1 w-[2px] bg-gradient-to-b from-blood-bright/90 via-blood-bright/70 to-blood-deep/50"
              />
              {project.rationale.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="font-sans text-[clamp(1.15rem,1.3vw,1.85rem)] leading-relaxed text-silver"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {project.materials.map((m) => (
                <span
                  key={m}
                  className="border border-blood-deep/50 px-4 py-2 font-mono text-[10px] uppercase tracking-brutal text-silver"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <BarbedWire className="mb-12 h-10 w-full" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            {project.gallery.map((img, i) => {
              const layout =
                img.span === "wide"
                  ? "md:col-span-8"
                  : img.span === "square"
                  ? "md:col-span-4"
                  : "md:col-span-4";
              const ratio =
                img.span === "wide" ? "aspect-[16/10]" : "aspect-[3/4]";
              return (
                <div key={`${img.src}-${i}`} className={`group ${layout}`}>
                  <RevealImage
                    src={img.src}
                    alt={img.alt}
                    className={`${ratio} w-full border border-white/5`}
                    imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105 [filter:contrast(1.1)]"
                  />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                    Fig. {String(i + 1).padStart(2, "0")} —{" "}
                    <span className="text-blood-bright">Senza Limiti</span>
                  </span>
                </div>
              );
            })}
          </div>
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
