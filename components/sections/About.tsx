"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import RevealText from "@/components/ui/RevealText";

/**
 * About — the designer statement.
 * A tall portrait with scroll parallax sits beside an editorial bio whose
 * lines reveal on scroll. Quiet, confident, lots of negative space.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-white/5 bg-ink py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-10">
        {/* Portrait */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
              <Image
                src="/assets/stylist/05.jpg"
                alt="Andrea Zucca, fashion designer"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover [filter:grayscale(0.4)_contrast(1.1)]"
              />
            </motion.div>
          </div>
          <span className="mt-3 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
            Andrea Zucca — Milano, IT
          </span>
        </div>

        {/* Statement */}
        <div className="flex flex-col justify-center md:col-span-7">
          <span className="mb-8 font-mono text-[11px] uppercase tracking-brutal text-blood-bright">
            ( About the designer )
          </span>

          <div className="space-y-6 font-serif text-2xl leading-snug text-silver-bright md:text-[2.1rem]">
            <RevealText text="Andrea Zucca builds garments the way one builds a structure — through tension, exposure and restraint." />
            <RevealText
              text="His work reinterprets the body as architecture: skeletons turned inside out, cages that protect and confine, craft traditions melted into brutalist objects."
              delay={0.1}
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 font-sans text-sm text-silver md:max-w-lg">
            <div>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Focus
              </span>
              Wearable anatomy, restraint, brutalist craft.
            </div>
            <div>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-brutal text-silver-dim">
                Based in
              </span>
              Milano — working internationally.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
