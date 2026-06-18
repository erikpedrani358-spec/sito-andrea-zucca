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
import Filigree from "@/components/projects/Filigree";

const project = getProject("ear-cuff")!;

/**
 * EAR CUFF — Sardinian filigree object.
 * Mood: refined, couture, jewellery-grade. Purple satin & silver on black.
 * Signature motion: self-drawing filigree line art, slow letter-spacing
 * settle on an elegant serif title, soft purple glow, smooth mask reveals.
 */
export default function EarCuff() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <main
      className="bg-ink"
      style={{ ["--accent" as string]: project.accent } as React.CSSProperties}
    >
      <ProjectTopBar index={project.index} year={project.year} />

      {/* Soft purple glow wash */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_60%_at_20%_30%,rgba(122,92,255,0.12),transparent_60%)]" />

      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-28 md:grid-cols-2 md:pt-0"
      >
        {/* Portrait */}
        <div className="relative h-[60svh] md:h-[100svh]">
          <motion.div style={{ y: imgY }} className="absolute inset-0">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src="/assets/projects/ear-cuff/01.jpg"
                alt="Ear Cuff — close portrait with filigree earring"
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          {/* Filigree overlay */}
          <Filigree className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 opacity-60 md:h-96 md:w-96" />
        </div>

        {/* Text */}
        <div className="relative z-10 px-5 md:px-12">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.04em" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[16vw] font-light uppercase leading-none text-silver-bright md:text-[8vw]"
          >
            Ear Cuff
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 block font-mono text-[11px] uppercase tracking-brutal"
            style={{ color: project.accent }}
          >
            {project.subtitle}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-8 max-w-md font-serif text-xl font-light leading-relaxed text-silver md:text-2xl"
          >
            {project.rationale[0]}
          </motion.p>

          <div className="mt-10">
            <CoordinatesTag project={project} />
          </div>
        </div>
      </section>

      {/* ===================== RATIONALE ===================== */}
      <section className="relative z-10 border-t border-white/10 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
          <div className="md:col-span-6">
            <div className="mb-8 flex items-center gap-4">
              <span
                className="h-px w-12"
                style={{ background: project.accent }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-brutal"
                style={{ color: project.accent }}
              >
                Memory, decay, form
              </span>
            </div>
            <div className="space-y-6">
              {project.rationale.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="font-serif text-xl font-light leading-relaxed text-silver-bright md:text-2xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {project.materials.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-brutal text-silver"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <RevealImage
              src="/assets/projects/ear-cuff/03.jpg"
              alt="Ear Cuff — purple satin headscarf profile"
              className="aspect-[3/4] w-full"
            />
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {project.gallery.slice(1, 5).map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className={`group ${i % 3 === 0 ? "md:row-span-2" : ""}`}
              >
                <RevealImage
                  src={img.src}
                  alt={img.alt}
                  className={`w-full ${
                    i % 3 === 0 ? "aspect-[3/5]" : "aspect-[3/4]"
                  }`}
                  imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-4 md:gap-5">
            <div className="group md:col-start-2">
              <RevealImage
                src="/assets/projects/ear-cuff/07.jpg"
                alt="Ear Cuff — tin texture"
                className="aspect-[3/4] w-full"
                imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="group md:col-start-3">
              <RevealImage
                src="/assets/projects/ear-cuff/08.jpg"
                alt="Ear Cuff — editorial"
                className="aspect-[3/4] w-full"
                imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-2">
              <div className="group w-1/2">
                <RevealImage
                  src="/assets/projects/ear-cuff/09.jpg"
                  alt="Ear Cuff — final object"
                  className="aspect-[3/4] w-full"
                  imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== META ===================== */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <MetaStrip project={project} />
        </div>
      </section>

      <NextProject current={project.slug} />
    </main>
  );
}
