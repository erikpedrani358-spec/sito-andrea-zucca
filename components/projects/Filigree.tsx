"use client";

import { motion } from "motion/react";

/**
 * Ornamental Sardinian-filigree-inspired line art.
 * Symmetric swirls that self-draw on scroll — an elegant, jewellery-grade
 * counterpoint to the brutalist typography elsewhere on the site.
 */
export default function Filigree({
  className,
  color = "#9a83ff",
}: {
  className?: string;
  color?: string;
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 0.85,
      transition: {
        pathLength: { duration: 2.4, ease: "easeInOut", delay: i * 0.15 },
        opacity: { duration: 0.4, delay: i * 0.15 },
      },
    }),
  } as const;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={1.1}
      aria-hidden
    >
      <motion.g
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.circle cx={200} cy={200} r={120} variants={draw} custom={0} />
        <motion.circle cx={200} cy={200} r={150} variants={draw} custom={1} />
        <motion.path
          d="M200 80 C 260 120, 260 180, 200 200 C 140 180, 140 120, 200 80 Z"
          variants={draw}
          custom={2}
        />
        <motion.path
          d="M200 320 C 260 280, 260 220, 200 200 C 140 220, 140 280, 200 320 Z"
          variants={draw}
          custom={3}
        />
        <motion.path
          d="M80 200 C 120 140, 180 140, 200 200 C 180 260, 120 260, 80 200 Z"
          variants={draw}
          custom={4}
        />
        <motion.path
          d="M320 200 C 280 140, 220 140, 200 200 C 220 260, 280 260, 320 200 Z"
          variants={draw}
          custom={5}
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          // Fixed precision keeps server/client SVG identical (no hydration mismatch).
          const cx = Number((200 + Math.cos(a) * 150).toFixed(2));
          const cy = Number((200 + Math.sin(a) * 150).toFixed(2));
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={4}
              variants={draw}
              custom={6 + i * 0.1}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
