"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getProject } from "@/lib/projects";
import {
  ProjectTopBar,
  MetaStrip,
  CoordinatesTag,
  NextProject,
  RevealImage,
} from "@/components/projects/shared";
import SashikoStitch from "@/components/projects/SashikoStitch";

const project = getProject("chowa-armonia")!;

const LOOKS = [
  {
    n: "01",
    name: "Sashiko De-Construction",
    note: "The red thread runs through the garment like a trace, a scar — a gesture deliberately left visible. Sashiko shifts from a technique of repair into a contemporary language, between construction, deconstruction and asymmetry.",
  },
  {
    n: "02",
    name: "Memory / Gesture",
    note: "A white shirt like a blank page. The handwritten script becomes traces of thought — fragments of memory, signs of the creative process. The red of the archive meets the gesture of Ikebana: body, flower and space in equilibrium.",
  },
  {
    n: "03",
    name: "Equilibrium",
    note: "Full and empty volumes meet. The principle of the kimono converses with Western tailoring, creating a silhouette suspended between fluidity and structure. Equilibrium is not born of symmetry, but of the tension between different elements.",
  },
] as const;

/**
 * A decorative red running stitch at any angle — scattered across the paper
 * board like the seams of the garment, in every direction.
 */
function StitchLine({
  angle = 0,
  width = 240,
  className = "",
  color = "#c1121f",
  delay = 0,
}: {
  angle?: number;
  width?: number;
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute block h-[2px] ${className}`}
      style={{ width, transform: `rotate(${angle}deg)`, transformOrigin: "center" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: delay + 0.9 }}
    >
      <motion.span
        className="block h-full w-full"
        style={{
          background: `repeating-linear-gradient(90deg, ${color} 0 13px, transparent 13px 32px)`,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.5, delay, ease: [0.65, 0, 0.2, 1] }}
      />
    </motion.span>
  );
}

/** Vertical dashed thread (static) — used for the sewn binding and tape. */
function StitchUp({
  className = "",
  color = "#c1121f",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute w-[2px] ${className}`}
      style={{
        background: `repeating-linear-gradient(180deg, ${color} 0 13px, transparent 13px 32px)`,
      }}
    />
  );
}

/** Looping look film. `muted` is force-set via ref for Safari autoplay. */
function LookFilm({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.muted = true;
  }, []);
  return (
    <figure className={`group relative border border-white/15 ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        data-cursor="hover"
        className="aspect-video w-full object-cover"
      />
      <figcaption className="flex items-center justify-between border-t border-white/10 bg-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
        <span>
          <span className="text-thread">●</span> {label}
        </span>
        <span>Film — loop</span>
      </figcaption>
    </figure>
  );
}

/**
 * CHOWA: ARMONIA — Accademia del Lusso × Giuliano Fujiwara.
 * Mood: harmony as a method. Raw paper, red sashiko thread, breath-paced
 * reveals. The site's only light moment: Look 01 lives on a stitched
 * paper board, like a lookbook pinned in the atelier.
 */
export default function ChowaArmonia() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <main
      className="bg-ink"
      style={{ ["--accent" as string]: project.accent } as React.CSSProperties}
    >
      <ProjectTopBar index={project.index} year={project.year} />

      {/* ===================== HERO — harmony, stitched ===================== */}
      <section
        ref={heroRef}
        className="relative grid min-h-[100svh] grid-cols-1 items-center gap-10 overflow-hidden pt-28 md:grid-cols-2 md:pt-0"
      >
        {/* 和 watermark — harmony, behind everything */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[42vw] leading-none text-white/[0.05] md:text-[26vw]"
          style={{ fontFamily: '"Yu Mincho", "Yu Gothic", "Meiryo", serif' }}
        >
          和
        </span>

        {/* Text */}
        <div className="relative z-10 px-5 md:px-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-5 block font-mono text-[11px] uppercase tracking-brutal text-silver-dim"
          >
            {project.subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="display-tight font-display uppercase leading-[0.82] text-silver-bright"
          >
            <span className="block text-[15vw] md:text-[9vw]">Chowa</span>
            <span className="block text-[15vw] md:text-[9vw]">
              <span className="text-metal">Armonia</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-6 max-w-md"
          >
            <SashikoStitch className="w-48 md:w-64" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1 }}
            className="mt-8 max-w-md"
          >
            <p className="font-serif text-2xl font-light uppercase leading-snug tracking-wide text-silver-bright md:text-[1.75rem]">
              L&rsquo;Armonia dell&rsquo;Imperfezione
            </p>
            <p className="mt-1.5 font-serif text-lg font-light italic text-silver-dim md:text-xl">
              In occasione della Milano Fashion Week SS.2027
            </p>
            <p className="mt-5 font-sans text-sm leading-relaxed text-silver md:text-base">
              The result is a new interpretation of the Giuliano Fujiwara
              universe, balancing archive, research, and a contemporary
              vision.
            </p>
          </motion.div>

          <div className="mt-10">
            <CoordinatesTag project={project} />
          </div>
        </div>

        {/* High-key profile — the only bright element on ink */}
        <div className="relative h-[62svh] md:h-[100svh]">
          <motion.div style={{ y: imgY }} className="absolute inset-0">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src="/assets/projects/chowa-armonia/18.jpg"
                alt="Chowa: Armonia — Equilibrium, full look walking the runway"
                fill
                priority
                quality={88}
                sizes="50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <span
            aria-hidden
            className="absolute bottom-6 left-6 z-10 font-mono text-[10px] uppercase tracking-brutal text-silver-dim"
          >
            Look 02 — <span className="text-thread">Memory / Gesture</span>
          </span>
        </div>
      </section>

      {/* ===================== LOOK 01 — the paper board ===================== */}
      <section className="relative py-24 md:py-36">
        <div className="mx-auto w-[90%] max-w-[1280px]">
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-paper p-6 text-ink shadow-[0_48px_120px_-32px_rgba(0,0,0,0.8)] md:p-12"
          >
            {/* tape strips pinning the board */}
            <span
              aria-hidden
              className="absolute -top-3 left-10 h-7 w-28 rotate-[-5deg] bg-white/50 shadow-sm backdrop-blur-[1px]"
            />
            <span
              aria-hidden
              className="absolute -top-3 right-10 h-7 w-28 rotate-[4deg] bg-white/50 shadow-sm backdrop-blur-[1px]"
            />

            {/* sewn binding — the board is stitched, not just pinned */}
            <StitchUp className="inset-y-6 left-2 md:left-3" />

            {/* stitches holding the tapes */}
            <StitchUp className="-top-4 left-[92px] h-12 rotate-[-5deg] opacity-80" />
            <StitchUp className="-top-4 right-[92px] h-12 rotate-[4deg] opacity-80" />

            {/* scattered seams on the empty paper — every direction, like the garment */}
            <StitchLine className="hidden md:block right-32 top-[215px]" angle={-25} width={320} delay={0.1} />
            <StitchLine className="hidden md:block right-28 top-[245px]" angle={62} width={300} delay={0.25} />
            <span
              aria-hidden
              className="pointer-events-none absolute hidden font-mono text-lg leading-none text-thread md:block right-[252px] top-[222px]"
            >
              ✕
            </span>
            <StitchLine className="hidden md:block right-10 bottom-12" angle={38} width={210} delay={0.4} />

            {/* Board header */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/80 pb-5">
              <div>
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-brutal text-ink/60">
                  Look {LOOKS[0].n} / 03
                </span>
                <h2 className="display-tight font-display text-4xl uppercase leading-none md:text-6xl">
                  {LOOKS[0].name}
                </h2>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-brutal text-thread">
                — the seam becomes ornament —
              </span>
            </div>

            <p className="mb-10 max-w-2xl font-sans text-base leading-relaxed text-ink/75 md:text-lg">
              {LOOKS[0].note}
            </p>

            <SashikoStitch className="mb-10" color="#c1121f" />

            {/* Lookbook grid — Look 01 studies */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
              {["03", "01", "02", "04", "05"].map((n, i) => (
                <div key={n} className="group">
                  <RevealImage
                    src={`/assets/projects/chowa-armonia/${n}.jpg`}
                    alt={`Chowa: Armonia — Look 01, Sashiko De-Construction study ${i + 1}`}
                    className="aspect-[3/4] w-full border border-ink/25"
                    imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-ink/55">
                    01.{n} — study
                  </span>
                </div>
              ))}
            </div>

            {/* Look 01 film */}
            <div className="mt-8">
              <LookFilm
                src="/assets/projects/chowa-armonia/look01.mp4"
                poster="/assets/projects/chowa-armonia/05.jpg"
                label="Look 01 — Sashiko De-Construction"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== LOOK 02 — equilibrium on ink ===================== */}
      <section className="relative border-t border-white/10 py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
                Look {LOOKS[1].n} / 03
              </span>
              <h2 className="display-tight font-display text-4xl uppercase leading-none text-silver-bright md:text-6xl">
                {LOOKS[1].name}
              </h2>
            </div>
            <div className="max-w-sm md:mt-7">
              <p className="font-sans text-sm leading-relaxed text-silver-dim md:text-base">
                {LOOKS[1].note}
              </p>
              <span className="mt-3 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Model — <span className="text-thread">Michael Sillence</span>
              </span>
            </div>
          </div>

          <LookFilm
            src="/assets/projects/chowa-armonia/look02.mp4"
            poster="/assets/projects/chowa-armonia/09.jpg"
            label="Look 02 — Equilibrium on the runway"
          />

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {[
              { n: "07", tag: "runway" },
              { n: "10", tag: "runway" },
              { n: "11", tag: "runway" },
              { n: "12", tag: "runway" },
              { n: "21", tag: "backstage" },
              { n: "22", tag: "interview" },
            ].map(({ n, tag }, i) => (
              <div key={n} className="group">
                <RevealImage
                  src={`/assets/projects/chowa-armonia/${n}.jpg`}
                  alt={
                    tag === "backstage"
                      ? "Chowa: Armonia — Look 02, Equilibrium backstage fitting"
                      : tag === "interview"
                      ? "Chowa: Armonia — press interview at the event, Accademia del Lusso × Giuliano Fujiwara"
                      : `Chowa: Armonia — Look 02, Equilibrium runway study ${i + 1}`
                  }
                  className="aspect-[3/4] w-full border border-white/10"
                  imgClassName="transition-transform duration-[1.3s] ease-out group-hover:scale-105"
                />
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                  02.{n} — <span className="text-thread">{tag}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Closing centerpiece — the whoopsee press feature, inserted as provided */}
          <div className="mx-auto mt-5 w-full md:mt-10 md:w-2/5">
            <RevealImage
              src="/assets/projects/chowa-armonia/08.jpg"
              alt="Chowa: Armonia — whoopsee press feature with Look 02 on the runway"
              className="aspect-[1179/2076] w-full border border-white/10"
            />
            <span className="mt-2 block text-center font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              02.23 — <span className="text-thread">press · whoopsee</span>
            </span>
          </div>
        </div>
      </section>

      {/* ===================== LOOK 03 — memory + the space ===================== */}
      <section className="relative border-t border-white/10 bg-ink-900 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-14 md:px-10">
          <div className="md:col-span-4">
            <RevealImage
              src="/assets/projects/chowa-armonia/20.jpg"
              alt="Chowa: Armonia — Look 03, Memory Gesture, sculptural tunic on the runway"
              className="aspect-[2/3] w-full border border-white/10"
            />
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Look 03 — <span className="text-thread">the gesture</span>
            </span>
          </div>

          <div className="flex flex-col justify-center md:col-span-4">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
              Look {LOOKS[2].n} / 03
            </span>
            <h2 className="display-tight mb-6 font-display text-4xl uppercase leading-none text-silver-bright md:text-5xl">
              {LOOKS[2].name}
            </h2>
            <p className="font-sans text-base leading-relaxed text-silver md:text-lg">
              {LOOKS[2].note}
            </p>
            <span className="mt-4 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Model — <span className="text-thread">Andrea Milani</span>
            </span>
            <div className="mt-8">
              <SashikoStitch className="w-40" delay={0.2} />
            </div>
          </div>

          <div className="md:col-span-4">
            <RevealImage
              src="/assets/projects/chowa-armonia/19.jpg"
              alt="Chowa: Armonia — Look 03, Memory Gesture walking the runway"
              className="aspect-[2/3] w-full border border-white/10"
            />
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Look 03 — <span className="text-thread">runway</span>
            </span>
          </div>
        </div>
      </section>

      {/* ===================== RATIONALE + PLACARD ===================== */}
      <section className="relative border-t border-white/10 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
          <div className="md:col-span-5">
            <RevealImage
              src="/assets/projects/chowa-armonia/15.jpg"
              alt="Chowa: Armonia — official placard of the exhibition, Accademia del Lusso × Giuliano Fujiwara"
              className="aspect-[3/4] w-full border border-white/15"
            />
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Official placard — {project.subtitle}
            </span>
            <RevealImage
              src="/assets/projects/chowa-armonia/24.jpg"
              alt="Chowa: Armonia — official show poster, 25 September 2026, Eleven Factory Milano"
              className="mt-8 aspect-[1024/535] w-full border border-white/15"
            />
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Official poster — <span className="text-thread">25.09.2026 · Eleven Factory</span>
            </span>
          </div>
          <div className="flex flex-col justify-center md:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-thread" />
              <span className="font-mono text-[11px] uppercase tracking-brutal text-thread">
                Harmony as a method
              </span>
            </div>
            <div className="space-y-6">
              {project.rationale.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
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
                  className="border border-thread/45 px-4 py-2 font-mono text-[10px] uppercase tracking-brutal text-silver"
                >
                  {m}
                </span>
              ))}
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
