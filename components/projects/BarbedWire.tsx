"use client";

import { motion } from "motion/react";

/**
 * Stylised barbed-wire strand drawn as SVG and animated with a stroke-draw.
 * Two twisted sine lines + periodic X-barbs. Used as a decorative divider
 * and hero overlay on the Senza Limiti route.
 */
export default function BarbedWire({
  className,
  color = "#e10600",
}: {
  className?: string;
  color?: string;
}) {
  const width = 1200;
  const height = 40;
  const mid = height / 2;

  // Two intertwined strands
  const strand = (phase: number) => {
    let d = `M 0 ${mid}`;
    for (let x = 0; x <= width; x += 20) {
      // Round to a fixed precision so the server and client serialize the
      // exact same path string (avoids React hydration mismatches).
      const y = (mid + Math.sin(x / 40 + phase) * 7).toFixed(2);
      d += ` L ${x} ${y}`;
    }
    return d;
  };

  // Barbs every ~80px
  const barbs = [];
  for (let x = 40; x < width; x += 80) {
    barbs.push(
      <g key={x} stroke={color} strokeWidth={1.5}>
        <line x1={x} y1={mid - 12} x2={x} y2={mid + 12} />
        <line x1={x - 8} y1={mid - 8} x2={x + 8} y2={mid + 8} />
        <line x1={x - 8} y1={mid + 8} x2={x + 8} y2={mid - 8} />
      </g>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <motion.path
        d={strand(0)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d={strand(Math.PI)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {barbs}
      </motion.g>
    </svg>
  );
}
