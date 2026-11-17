"use client";

import { useEffect } from "react";

export function M10CaseMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-m10-page]");
    if (!page) return;

    const hero = page.querySelector<HTMLElement>("[data-m10-hero-image]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !window.IntersectionObserver) return;

    const blocks = Array.from(page.querySelectorAll<HTMLElement>("[data-m10-reveal]"));

    // The server renders every block visible. Hide only the ones still below
    // the viewport once the observer is ready, so hydration cannot flash text.
    for (const block of blocks) {
      if (block.getBoundingClientRect().top < window.innerHeight * 0.92) {
        block.dataset.revealed = "true";
      }
    }
    page.dataset.motionReady = "true";

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    for (const block of blocks) {
      if (!block.dataset.revealed) observer.observe(block);
    }

    let frame = 0;
    const updateHero = () => {
      frame = 0;
      // A fast page jump can skip an IntersectionObserver threshold. Reveal
      // every block the reader has already passed before updating the hero.
      for (const block of blocks) {
        if (!block.dataset.revealed && block.getBoundingClientRect().top < window.innerHeight * 0.92) {
          block.dataset.revealed = "true";
          observer.unobserve(block);
        }
      }
      if (!hero) return;
      const heroHeight = hero.parentElement?.offsetHeight ?? 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / (heroHeight * 1.2)));
      hero.style.setProperty("--m10-hero-scale", (1.02 - progress * 0.02).toFixed(3));
    };
    const scheduleHeroUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeroUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleHeroUpdate);
      window.removeEventListener("resize", scheduleHeroUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      delete page.dataset.motionReady;
    };
  }, []);

  return null;
}
