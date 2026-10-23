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

const project = getProject("fashion-talents")!;

const CREDITS: [string, string][] = [
  ["Model", "@rolando.mele"],
  ["Agency", "Looked Model Management"],
  ["Event", "Fashion & Talents — VIII Edition"],
  ["With", "Accademia del Lusso"],
];

/** Scrolling event ticker — the show's own way of announcing itself. */
function EventTicker() {
  const line =
    "VIII EDITION — ROMA · PIAZZA DI SPAGNA — 16.09.2026 — GIULIANO FUJIWARA × BRAND PROJECT — ";
  return (
    <div className="relative overflow-hidden border-y border-scarlet/40 bg-scarlet/10 py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-[11px] uppercase tracking-brutal text-silver">
        {[0, 1].map((n) => (
          <span key={n} className="pr-2">
            {line}
            <span className="text-scarlet">✦</span> {line}
            <span className="text-scarlet">✦</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * FASHION & TALENTS — Giuliano Fujiwara × Brand Project.
 * Mood: open-air Roman runway at night. Glossed scarlet on asphalt black,
 * duotone poster treatment, event ticker, cinematic spotlight sweep.
 * Signature motion: red spotlight beam travelling the hero, marquee ticker,
 * clip-path reveals with a scarlet flash.
 */
export default function FashionTalents() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <main
      className="bg-ink"
      style={{ ["--accent" as string]: project.accent } as React.CSSProperties}
    >
      <ProjectTopBar index={project.index} year={project.year} />

      {/* ===================== HERO — open-air runway ===================== */}
      <section
        ref={heroRef}
        className="vignette relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
      >
        {/* Piazza di Spagna backdrop, pushed into a red-tinged night */}
        <motion.div style={{ y: bgY }} className="absolute inset-[-8%]">
          <Image
            src="/assets/projects/fashion-talents/02.jpg"
            alt=""
            fill
            priority
            quality={88}
            sizes="100vw"
            className="object-cover [filter:contrast(1.12)_brightness(0.5)_saturate(0.72)]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_38%,rgba(255,45,34,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/55" />

        {/* Travelling spotlight beam */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[38vw] bg-[linear-gradient(90deg,transparent,rgba(255,224,196,0.07),transparent)]"
          animate={{ left: ["-40%", "105%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-5 block font-mono text-[11px] uppercase tracking-brutal text-scarlet"
          >
            {project.subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-tight font-display uppercase leading-[0.82]"
          >
            <span className="block text-[17vw] text-silver-bright md:text-[13vw]">
              Fashion
            </span>
            <span className="block text-[17vw] md:text-[13vw]">
              <span className="text-scarlet">&</span>
              <span className="text-silver-bright"> Talents</span>
            </span>
          </motion.h1>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <CoordinatesTag project={project} />
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="max-w-sm font-serif text-xl font-light italic leading-snug text-silver md:text-2xl"
            >
              “Not the full collection. Just a preview.”
            </motion.p>
          </div>
        </motion.div>
      </section>

      <EventTicker />

      {/* ===================== THE LOOK + RATIONALE ===================== */}
      <section className="relative border-b border-white/5 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
          <div className="md:col-span-5">
            <RevealImage
              src="/assets/projects/fashion-talents/01.jpg"
              alt="Fashion & Talents — the look on the runway"
              className="aspect-[3/4] w-full border border-scarlet/25"
              imgClassName="[filter:contrast(1.1)_saturate(1.05)]"
            />
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Look 01 — <span className="text-scarlet">seen on the runway</span>
            </span>
          </div>

          <div className="flex flex-col justify-center md:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-scarlet" />
              <span className="font-mono text-[11px] uppercase tracking-brutal text-scarlet">
                Design Rationale
              </span>
            </div>
            <div className="relative space-y-4 pl-5 md:pl-6">
              <span
                aria-hidden
                className="absolute bottom-1 left-0 top-1 w-[2px] bg-gradient-to-b from-scarlet via-scarlet/60 to-scarlet/20"
              />
              {project.rationale.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="font-sans text-[clamp(1.1rem,1.25vw,1.7rem)] leading-relaxed text-silver"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {project.materials.map((m) => (
                <span
                  key={m}
                  className="border border-scarlet/40 px-4 py-2 font-mono text-[10px] uppercase tracking-brutal text-silver"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="relative py-12 pb-24 md:py-16 md:pb-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
            <div className="group md:col-span-5">
              <RevealImage
                src="/assets/projects/fashion-talents/01.jpg"
                alt="Fashion & Talents — full-length look walking the runway at night"
                className="aspect-[3/4] w-full border border-white/10"
                imgClassName="transition-transform duration-[1.3s] ease-out group-hover:scale-105 [filter:contrast(1.08)]"
              />
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Fig. 01 — <span className="text-scarlet">the walk</span>
              </span>
            </div>
            <div className="group md:col-span-7">
              <RevealImage
                src="/assets/projects/fashion-talents/02.jpg"
                alt="Fashion & Talents — the open-air runway in Piazza di Spagna"
                className="aspect-[16/10] w-full border border-white/10"
                imgClassName="transition-transform duration-[1.3s] ease-out group-hover:scale-105 [filter:contrast(1.08)]"
              />
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Fig. 02 — <span className="text-scarlet">the square</span>
              </span>
            </div>
            <div className="group md:col-span-5">
              <RevealImage
                src="/assets/projects/fashion-talents/03.jpg"
                alt="Fashion & Talents — walking the look with the fringe clutch"
                className="aspect-[3/4] w-full border border-white/10"
                imgClassName="transition-transform duration-[1.3s] ease-out group-hover:scale-105 [filter:contrast(1.08)]"
              />
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Fig. 03 — <span className="text-scarlet">the clutch</span>
              </span>
            </div>
            <div className="group md:col-span-7">
              <RevealImage
                src="/assets/projects/fashion-talents/05.jpg"
                alt="Fashion & Talents — designers' bow at the end of the show"
                className="aspect-[16/10] w-full border border-white/10"
                imgClassName="transition-transform duration-[1.3s] ease-out group-hover:scale-105 [filter:contrast(1.08)]"
              />
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Fig. 04 — <span className="text-scarlet">the bow</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== POSTER + QUOTE ===================== */}
      <section className="relative py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] items-center grid-cols-1 gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-10">
          <div className="order-2 md:order-1">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1 }}
              className="font-serif text-3xl font-light leading-snug text-silver-bright md:text-[2.6rem]"
            >
              “Un primo look, un primo frammento del progetto Brand.”
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25 }}
              className="mt-6 max-w-md font-sans text-sm leading-relaxed text-silver-dim md:text-base"
            >
              Grazie per questa grande opportunità — a first fragment of the
              Brand Project, between Rome and the Milan fashion week calendar.
            </motion.p>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {CREDITS.map(([k, v]) => (
                <div key={k} className="bg-ink p-5">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                    {k}
                  </span>
                  <span className="font-mono text-sm text-silver-bright">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div
              className="group relative mx-auto max-w-[420px]"
              data-cursor="hover"
            >
              <RevealImage
                src="/assets/projects/fashion-talents/04.jpg"
                alt="Fashion & Talents — official poster of the VIII Edition"
                className="aspect-[3/4] w-full border border-white/15"
                imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-scarlet opacity-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-25"
              />
              <span className="mt-3 block text-center font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Official poster — VIII Edition · Roma
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== META ===================== */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <MetaStrip project={project} />
        </div>
      </section>

      <NextProject current={project.slug} />
    </main>
  );
}
