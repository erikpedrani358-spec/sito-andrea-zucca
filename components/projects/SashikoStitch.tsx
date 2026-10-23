"use client";

import { motion } from "motion/react";

/**
 * Sashiko running-stitch divider for CHOWA: ARMONIA.
 * A dashed thread that "sews" itself across the page from left to right,
 * with small cross-stitches marking the rhythm. The needle passes once —
 * the line stays stitched (viewport once).
 */
export default function SashikoStitch({
  className = "",
  color = "#c1121f",
  delay = 0,
  crosses = true,
}: {
  className?: string;
  color?: string;
  delay?: number;
  crosses?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`relative h-3 w-full ${className}`}
    >
      {/* the running stitch */}
      <motion.span
        className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2"
        style={{
          background: `repeating-linear-gradient(90deg, ${color} 0 13px, transparent 13px 32px)`,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.2, 1] }}
      />
      {/* sparse cross-stitches along the seam */}
      {crosses && (
        <motion.span
          className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, delay: delay + 1.1 }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[11px] leading-none"
              style={{ color, opacity: i % 2 ? 0.45 : 0.9 }}
            >
              ✕
            </span>
          ))}
        </motion.span>
      )}
    </div>
  );
}
