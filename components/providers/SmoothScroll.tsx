"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery momentum scrolling via Lenis.
 * A single instance drives the whole document and re-emits a `lenis-scroll`
 * event so other components (parallax, navbar) can subscribe cheaply.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Honour users who prefer reduced motion: skip smooth scrolling entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose for programmatic scrolling (anchor links in the navbar).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
