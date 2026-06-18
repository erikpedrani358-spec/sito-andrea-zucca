"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bespoke two-layer cursor:
 *  - a small solid dot that tracks the pointer 1:1
 *  - a larger ring that follows with spring lag and grows on interactive targets
 * Uses `mix-blend-difference` so it inverts whatever sits beneath it.
 * Automatically disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    // Pointer + lagged ring position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      // Detect interactive target for the "grow" state.
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        "a, button, [data-cursor='hover'], input, textarea"
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ringRef.current?.classList.toggle("cursor-grow", interactive);
      }
    };

    const render = () => {
      // Spring follow for the ring
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 h-9 w-9 rounded-full border border-white/80 transition-[width,height,background-color] duration-300 ease-out [&.cursor-grow]:h-16 [&.cursor-grow]:w-16 [&.cursor-grow]:bg-white/10"
      />
    </div>
  );
}
