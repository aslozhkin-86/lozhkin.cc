"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  DraggableCardStack,
  type DraggableCardStyle,
  useCardStack,
} from "../DraggableCardStack";
import { useLayerOrder } from "../interaction/useLayerOrder";
import styles from "./SpeakingSection.module.css";

const cards = [
  { id: "speaking-card-1", image: "/speaking/1.jpg", label: "Alexander speaking at a presentation", x: 65, y: 84, rotation: -8 },
  { id: "speaking-card-2", image: "/speaking/2.jpg", label: "Conference participants", x: 300, y: 92, rotation: 1 },
  { id: "speaking-card-3", image: "/speaking/3.jpg", label: "Alexander speaking at a conference", x: 486, y: 122, rotation: 11 },
  { id: "speaking-card-4", image: "/speaking/4.jpg", label: "Alexander presenting on stage", x: 708, y: 113, rotation: -5 },
  { id: "speaking-card-5", image: "/speaking/5.jpg", label: "Portrait of Alexander", x: 932, y: 68, rotation: -14 },
] as const;

const cardIds = cards.map(({ id }) => id);
type CardId = (typeof cards)[number]["id"];
const DESKTOP_QUERY = "(min-width: 761px)";
const REVEAL_DURATION = 900;
const REVEAL_STAGGER = 70;

export function SpeakingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredReveal = useRef(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isRevealAnimating, setIsRevealAnimating] = useState(false);
  const layers = useLayerOrder([...cardIds].reverse());
  const stack = useCardStack(cardIds, {
    onCycle: (id) => layers.sendToBack(id as CardId),
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    let revealTimer: number | null = null;

    function reveal() {
      if (hasTriggeredReveal.current || !desktopQuery.matches) return;
      hasTriggeredReveal.current = true;
      setIsRevealAnimating(true);
      setHasRevealed(true);
      observer.disconnect();
      revealTimer = window.setTimeout(() => {
        setIsRevealAnimating(false);
      }, REVEAL_DURATION + REVEAL_STAGGER * (cards.length - 1));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (!event.matches || !section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    }

    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => {
      observer.disconnect();
      desktopQuery.removeEventListener("change", handleDesktopChange);
      if (revealTimer !== null) window.clearTimeout(revealTimer);
    };
  }, []);

  function restack() {
    stack.resetStack();
    layers.resetOrder();
  }

  return (
    <section
      aria-labelledby="speaking-title"
      className={styles.section}
      data-dragging={Boolean(stack.draggingId)}
      data-revealed={hasRevealed}
      id="speaking"
      ref={sectionRef}
    >
      <h2 className={styles.title} id="speaking-title">
        I speak at conferences and meetups. Right now, I’m exploring how AI changes product work and how branding becomes part of the product experience. Looking for a speaker? Let’s talk.
      </h2>

      <div className={styles.gallery}>
        <button className={styles.restack} type="button" onClick={restack}>
          Restack
        </button>

        <DraggableCardStack
          ariaLabel="Draggable conference cards"
          cards={cards}
          cardClassName={styles.speakingCard}
          controller={stack}
          dataKind="speaking-card"
          getStyle={(card, cardIndex): DraggableCardStyle => ({
            "--stack-card-width": "min(280px, 22vw)",
            "--stack-card-radius": "32px",
            "--card-left": `${card.x / 1280 * 100}%`,
            "--card-top": `${card.y - 45}px`,
            "--card-rotation": hasRevealed ? `${card.rotation}deg` : "0deg",
            "--stack-x": hasRevealed
              ? "0px"
              : `calc(50vw - ${card.x / 1280 * 100}vw - min(140px, 11vw) + ${cardIndex * 10}px)`,
            "--stack-y": hasRevealed
              ? "0px"
              : `${225 - card.y - cardIndex * 10}px`,
            "--reveal-duration": isRevealAnimating ? `${REVEAL_DURATION}ms` : "220ms",
            "--reveal-delay": isRevealAnimating ? `${cardIndex * REVEAL_STAGGER}ms` : "0ms",
            "--mobile-card-width": "min(360px, 70vw)",
            "--mobile-card-top": "50%",
            "--mobile-card-left": "calc(50% - 10px)",
            "--mobile-card-anchor-x": "-50%",
            "--mobile-card-anchor-y": "-50%",
            "--mobile-card-radius": "min(64px, 12.444vw)",
            "--mobile-card-rotation": "0deg",
            "--mobile-stack-x": `${cardIndex * 10}px`,
            "--mobile-stack-y": `${cardIndex * -10}px`,
          })}
          getZIndex={(id) => layers.zIndex(id as CardId)}
          onBringToFront={(id) => layers.bringToFront(id as CardId)}
          onRestack={restack}
          renderCard={(card) => (
            <Image
              alt={card.label}
              className={styles.cardImage}
              draggable={false}
              fill
              sizes="(max-width: 760px) 70vw, 22vw"
              src={card.image}
            />
          )}
          surfaceClassName={styles.cardSurface}
        />
      </div>

      <a
        aria-label="Watch my talk about brand in product"
        className={styles.talkLink}
        href="https://www.youtube.com/live/O_4V_bdwSB8?si=ZYEeleple7Oya2kz&t=3285"
        rel="noreferrer"
        target="_blank"
      >
        Watch{" "}
        <span className={styles.talkLinkAccent}>
          my talk
          <Image
            alt=""
            className={styles.talkUnderline}
            draggable={false}
            height={6}
            src="/speaking/talk-underline.svg"
            width={94}
          />
        </span>{" "}
        about brand in product
      </a>
    </section>
  );
}
