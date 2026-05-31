"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Avoid browser restoring arbitrary offsets between route transitions.
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    // Keep hash navigation intact (/#work, /#contact, ...).
    if (window.location.hash) return;

    // Force route openings from top, including when returning from project pages.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).lenis;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, searchParams]);

  useEffect(() => {
    // Honour users who prefer reduced motion: skip smooth scrolling entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (prefersReduced || isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
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
