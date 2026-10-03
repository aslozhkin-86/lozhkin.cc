"use client";

import { useEffect, useRef } from "react";

import styles from "./ApproachStatement.module.css";

const cards = [
  {
    id: "intro",
    title: "Approach",
    copy: "I’m a designer, and I like getting my hands into the work. A tricky flow, an interface that won’t come together, a brief that needs questioning.\n\nThe job can stretch from one screen to helping a whole company decide what to build next.\n\nI bring people into that work early, while there’s still room to argue, draw over my idea, and try something bolder. I want to help the team get somewhere we couldn’t have reached on our own.",
  },
  {
    id: "management",
    title: "Management",
    copy: "I want people to bring the half-formed thought. Ask for help. Tell me an idea doesn’t work — including mine.\n\nThat takes trust, and trust comes from how we respond in those moments.\n\nI keep processes simple and make sure we know what we’re trying to do. Then I give people room to work, with help when they need it.",
  },
  {
    id: "design",
    title: "Design",
    copy: "Give me a whiteboard and a problem we haven’t figured out yet.\n\nI like that stage: rough sketches, crossed-out ideas, someone grabbing the marker because it’s easier to draw than explain.\n\nWe can disagree while things are still cheap to change. It’s easier to get behind a bold idea when you’ve had a hand in shaping it.",
  },
  {
    id: "cycle",
    title: "Cycle",
    copy: "Discover, build, learn. Make something real enough to test, see where it falls apart, and try again.\n\nI like getting into the details, but a detail has to earn its place: does it help someone understand what’s happening or get something done?\n\nSometimes that means another iteration. Sometimes it means deleting the thing I spent all afternoon on.",
  },
] as const;

export function ApproachStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-approach-card]"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;

    const update = () => {
      animationFrame = null;
      section.dataset.animated = String(!reducedMotion.matches);
      if (reducedMotion.matches) return;

      const frameHeight = frame.offsetHeight;
      section.style.setProperty("--frame-height", `${frameHeight}px`);
      // On short screens, scroll the outer spacing away before pinning the
      // deck. The cards retain their readable size instead of being cropped.
      const pinTop = Math.min(0, window.innerHeight - frameHeight);
      frame.style.setProperty("--pin-top", `${pinTop}px`);
      const travel = Math.max(1, section.offsetHeight - frameHeight);
      const progress = Math.min(1, Math.max(0,
        (pinTop - section.getBoundingClientRect().top) / travel,
      ));
      const entryDistance = Math.max(frameHeight, elements[0].offsetHeight + (elements.length - 1) * 10);

      elements.forEach((card, index) => {
        // Hold the introduction at the start and Cycle at the end so every card has
        // reading time. The same scroll sequence works in both directions.
        const arrival = index === 0 ? 1 : Math.min(1, Math.max(0,
          progress * (elements.length - 1 + 0.8) - 0.4 - (index - 1),
        ));
        card.style.setProperty("--card-y", `${index * 10 + (1 - arrival) * entryDistance}px`);
      });
    };

    function requestUpdate() {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(update);
    }

    update();
    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(frame);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      delete section.dataset.animated;
    };
  }, []);

  return (
    <section
      aria-label="Approach"
      className={styles.section}
      id="approach"
      ref={sectionRef}
    >
      <div className={styles.frame} ref={frameRef}>
        <div className={styles.deck}>
          {cards.map((card) => (
            <article
              aria-labelledby={`approach-${card.id}-title`}
              className={styles.card}
              data-approach-card={card.id}
              key={card.id}
            >
              <h2 className={styles.cardTitle} id={`approach-${card.id}-title`}>
                {card.title}
              </h2>
              <div className={styles.copy}>
                {card.copy.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
