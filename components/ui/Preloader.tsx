"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** easeOutExpo for a counter that decelerates into 100. */
const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * First-load curtain. Counts 0 → 100 while a thin blood line fills,
 * the "Andrea Zucca" logotype fades in, then the panel wipes up to reveal
 * the page. Runs ONCE per browser session — subsequent navigations and
 * project pages appear instantly (no curtain), so nothing is ever hidden.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  // When true we skip the curtain entirely (already shown this session).
  const [skip, setSkip] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Only the very first page of a session gets the intro.
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("az-preloaded");
    if (seen) {
      setSkip(true);
      setDone(true);
      return;
    }
    window.sessionStorage.setItem("az-preloaded", "1");

    document.body.style.overflow = "hidden";

    let raf = 0;
    const duration = 1700; // total count time (fast, never feels stuck)
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round(easeOut(t) * 100));
      if (t >= 1) {
        // brief beat at 100, then lift the curtain
        window.setTimeout(() => setDone(true), 280);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  // Failsafe: always restore scrolling once we're done.
  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  // Repeat visits within the session: render nothing at all.
  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
