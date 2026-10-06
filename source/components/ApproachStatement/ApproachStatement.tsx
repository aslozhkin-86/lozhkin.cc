"use client";

import { useEffect, useRef, useState } from "react";

import { DraggableCardStack, useCardStack, type DraggableCardStyle } from "../DraggableCardStack";
import { useLayerOrder } from "../interaction/useLayerOrder";
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

const deckCards = cards.map(card => ({ ...card, label: card.title }));
const cardIds = cards.map(card => card.id);
type CardId = (typeof cards)[number]["id"];

export function ApproachStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const layers = useLayerOrder([...cardIds].reverse());
  const stack = useCardStack(cardIds, { onCycle: id => layers.sendToBack(id as CardId) });
  useEffect(() => {
    if (sectionRef.current) sectionRef.current.dataset.enhanced = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setRevealed(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  function restack() { stack.resetStack(); layers.resetOrder(); }
  return (
    <section aria-label="Approach" className={styles.section} id="approach" ref={sectionRef} data-revealed={revealed}>
      <div className={styles.deck}>
        <DraggableCardStack
          ariaLabel="Draggable approach cards"
          cards={deckCards}
          controller={stack}
          dataKind="approach-card"
          cardClassName={styles.card}
          surfaceClassName={styles.surface}
          getStyle={(_, index): DraggableCardStyle => ({
            "--index": index,
            "--card-rotation": `${[-2, 1, -1, 2][index]}deg`,
            "--stack-card-width": "min(310px, 24.5vw)",
            "--stack-card-aspect": "3 / 4",
            "--mobile-card-width": "min(360px, calc(100vw - 64px))",
            "--mobile-card-top": "30px",
            "--mobile-card-anchor-y": "0px",
            "--mobile-card-left": "calc(50% - 15px)",
            "--mobile-stack-x": `${index * 10}px`,
            "--mobile-stack-y": `${index * -10}px`,
          })}
          getZIndex={id => layers.zIndex(id as CardId)}
          onBringToFront={id => layers.bringToFront(id as CardId)}
          onRestack={restack}
          renderCard={card => <div data-approach-card={card.id}>
            <h2 className={styles.cardTitle} id={`approach-${card.id}-title`}>{card.title}</h2>
            <div className={styles.copy}>{card.copy.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>}
        />
      </div>
      <button className={styles.restack} onClick={restack} type="button">Restack</button>
    </section>
  );
}
