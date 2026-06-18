"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";

/* Per-character mask reveal for the headline ------------------------- */
const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.2 },
  },
};
const charReveal: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function MaskedWord({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span variants={charReveal} className="inline-block">
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Scroll-linked parallax: background drifts + scales, content fades up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse-driven depth parallax (opposite directions for layers).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const titlePX = useTransform(sx, [-0.5, 0.5], ["-18px", "18px"]);
  const titlePY = useTransform(sy, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={finePointer ? handleMouse : undefined}
      className="vignette relative min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* ---------- Background image layer ---------- */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <div className="absolute -left-[4%] -right-[10%] -top-[20%] bottom-10 translate-x-[14%] translate-y-[8%] md:-top-[16%] md:bottom-12 md:translate-x-[18%] md:translate-y-[10%]">
          <Image
            src="/assets/stylist/01.jpg"
            alt="Andrea Zucca portrait in black leather"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-[40%_18%] opacity-65 [filter:grayscale(0.3)_contrast(1.15)_brightness(0.68)] md:object-[44%_15%]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/15" />
        </div>
      </motion.div>

      {/* Soft blend between left black gutter and image edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[78%] md:w-[62%]"
        style={{
          background:
            "linear-gradient(to right, #050505 0%, #050505 14%, rgba(5,5,5,0.97) 26%, rgba(5,5,5,0.88) 38%, rgba(5,5,5,0.72) 50%, rgba(5,5,5,0.52) 62%, rgba(5,5,5,0.32) 74%, rgba(5,5,5,0.14) 86%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(225,6,0,0.22),transparent_55%)]" />

      {/* ---------- Foreground content ---------- */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pb-12"
      >
        {/* Top meta row — absolute so title/bio stay in place */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute left-5 right-5 top-14 flex items-start justify-between font-mono text-[10px] uppercase tracking-brutal text-silver-dim md:left-10 md:right-10 md:top-[4.75rem] md:text-[11px]"
        >
          <span>
            Fashion Designer
            <br className="md:hidden" /> <span className="text-blood-bright">/</span>{" "}
            Wearable Anatomy
          </span>
          <span className="text-right">
            45.4642° N
            <br />
            9.1900° E
          </span>
        </motion.div>
        <div aria-hidden className="h-[30px] shrink-0" />

        {/* Headline */}
        <motion.div
          style={{
            x: finePointer ? titlePX : 0,
            y: finePointer ? titlePY : 0,
          }}
          className="flex flex-col"
        >
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="show"
            className="display-tight font-display text-[18vw] uppercase leading-[0.82] text-metal md:text-[15vw] lg:text-[13vw]"
          >
            <span className="block">
              <MaskedWord text="Andrea" />
            </span>
            <span className="block text-blood">
              <MaskedWord text="Zucca" />
            </span>
          </motion.h1>
          <p className="sr-only">
            Andrea Zucca — fashion designer portfolio, Milano. Senza Limiti,
            Anatomia della Gabbia, Ear Cuff.
          </p>

          {/* Accent line + vertical biography column.
              Narrow max-width forces the long text to break onto more lines,
              growing the column downward rather than out across the hero. */}
          <div className="mt-8 flex flex-col gap-5 md:max-w-sm">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
              className="h-px w-20 origin-left bg-blood-bright"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="relative space-y-4 border-l border-white/15 pl-4 font-sans text-[13px] leading-[1.65] text-silver md:pl-5 md:text-sm"
            >
              <p className="text-silver-bright">
                Andrea Zucca explores fashion through identity, structure and
                tension.
              </p>
              <p>
                Originally trained in hairstyling, he later studied Fashion
                Product Design at Accademia del Lusso, developing a practice
                rooted in garment construction, digital experimentation and
                visual research.
              </p>
              <p>
                His work moves between raw silhouettes, atmospheric imagery and
                contemporary editorial language.
              </p>
              <p>
                Alongside design, he has worked as a styling assistant on
                editorial shoots and presented his work during the academy
                fashion show in Milan.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom row: scroll cue + signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex items-end justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blood-bright animate-scrollDot" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
              Scroll
            </span>
          </div>
          <span className="font-script text-3xl text-silver-bright/80 md:text-4xl">
            AZ
          </span>
        </motion.div>
      </motion.div>

      {/* ---------- Bottom marquee ticker ---------- */}
      <div className="absolute bottom-0 left-0 z-10 hidden w-full overflow-hidden border-t border-white/5 py-2 md:block md:pb-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-brutal text-silver-dim">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {["Senza Limiti — Fashion Show 2024", "Anatomia della Gabbia", "Ear Cuff — Sardinian Filigree", "Milano"].map(
                (t) => (
                  <span key={t} className="mx-6 flex items-center gap-6">
                    {t} <span className="text-blood-bright">✕</span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
