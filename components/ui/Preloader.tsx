"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** easeOutExpo for a counter that decelerates into 100. */
const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function shouldSkipPreloader() {
  if (typeof window === "undefined") return true;

  if (window.sessionStorage.getItem("az-preloaded")) return true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;

  return reduced || touch || !!saveData;
}

/**
 * First-load curtain (desktop only). Kept short so LCP isn't blocked for long.
 * Touch / reduced-motion / save-data users skip it entirely.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (shouldSkipPreloader()) {
      setSkip(true);
      setDone(true);
      return;
    }

    window.sessionStorage.setItem("az-preloaded", "1");

    let raf = 0;
    const duration = 900;
    const start = performance.now();
    const finish = () => setDone(true);

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round(easeOut(t) * 100));
      if (t >= 1) {
        window.setTimeout(finish, 180);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // Never block longer than 1.2s waiting for the exit animation.
    const maxTimer = window.setTimeout(finish, 1200);
    const onLoad = () => window.setTimeout(finish, 220);
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-5xl text-silver-bright md:text-7xl"
          >
            Andrea Zucca
          </motion.span>

          <div className="mt-10 h-px w-56 overflow-hidden bg-white/10 md:w-72">
            <motion.div
              className="h-full bg-blood-bright"
              style={{ width: `${count}%` }}
            />
          </div>

          <div className="mt-4 flex w-56 justify-between font-mono text-[11px] uppercase tracking-brutal text-silver-dim md:w-72">
            <span>Loading collections</span>
            <span>{String(count).padStart(3, "0")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
