"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Line/word reveal: splits the provided string into words wrapped in masks
 * and slides each up from below with a stagger when scrolled into view.
 * Lightweight alternative to SplitType when we only need word-level motion.
 */
export default function RevealText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
  wordClassNames,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  // Optional per-word class overrides (indexed by word position).
  wordClassNames?: Array<string | undefined>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");

  const MotionTag = motion.create(Tag as ElementType) as ElementType;

  return (
    <MotionTag className={cn(className)}>
      <span ref={ref} className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className={cn("inline-block", wordClassNames?.[i])}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </MotionTag>
  );
}
