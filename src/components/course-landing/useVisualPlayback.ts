import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Shared playback rule for the hero visuals:
 *   desktop (>= lg)   starts on every page load / reload
 *   mobile / tablet   starts only once the visual is scrolled into view
 * Reduced-motion users get the finished state immediately.
 */
export function useVisualPlayback() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduce) {
      setStarted(true);
      return;
    }
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const t = setTimeout(() => setStarted(true), 250);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return { ref, started, reduce };
}

/** Cycles 0..count-1 while started. Reduced motion pins the final stage. */
export function useStageCycle(started: boolean, reduce: boolean, count: number, ms: number) {
  const [stage, setStage] = useState(reduce ? count - 1 : 0);

  useEffect(() => {
    if (reduce) {
      setStage(count - 1);
      return;
    }
    if (!started) return;
    const t = setInterval(() => setStage((s) => (s + 1) % count), ms);
    return () => clearInterval(t);
  }, [started, reduce, count, ms]);

  return stage;
}
