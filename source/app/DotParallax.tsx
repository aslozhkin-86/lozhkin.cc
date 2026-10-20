"use client";

import { useEffect, useRef } from "react";

import styles from "./page.module.css";

const dotSpacing = 110;
const scrollRatio = 0.18;

export function DotParallax() {
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = dots.current;
    if (!layer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = reducedMotion.matches ? 0 : (window.scrollY * scrollRatio) % dotSpacing;
      layer.style.transform = `translate3d(0, -${offset}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className={styles.dotGrid} ref={dots} />;
}
