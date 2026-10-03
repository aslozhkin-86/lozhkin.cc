"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  DraggableCardStack,
  type DraggableCardStyle,
  useCardStack,
} from "../DraggableCardStack";
import { DraggableIcon } from "../DraggableIcon";
import { useDragCollection } from "../interaction/useDragCollection";
import { useLayerOrder } from "../interaction/useLayerOrder";
import styles from "./WhiteboardHeader.module.css";

const cards = [
  { id: "card-1", label: "Photo of Alexander Lozhkin" },
  { id: "card-2", label: "About" },
  { id: "card-3", label: "Approach" },
] as const;
const cardIds = cards.map(({ id }) => id);
const linkedinUrl = "https://www.linkedin.com/in/alexanderlozhkin/";
const emailUrl = "mailto:a.s.lozhkin@gmail.com";
const headerLinks = [
  { label: "Telegram", href: "https://t.me/Leshey" },
  { label: "Email", href: emailUrl },
  { label: "LinkedIn", href: linkedinUrl },
];

// Coordinates and rotations from the 1280 × 842 desktop Figma frame.
const stickers = [
  { id: "figma", label: "Figma", tooltip: "Flows, drafts, pixel-perfect UI, and animations live here", x: 321.723, y: 304, width: 71.41, height: 90.679, rotation: -14.195 },
  { id: "creative-tool", label: "Hexfield", tooltip: "Exploring visual ideas to see where they take me", x: 152, y: 498.142, width: 100.412, height: 100.412, rotation: 0 },
  { id: "notion", label: "Notion", tooltip: "The knowledge base that gives my AI tools context. Most of my work runs through it now", x: 1187.679, y: 490.028, width: 96.447, height: 96.447, rotation: 0 },
  { id: "vscode", label: "VS Code", tooltip: "Learning to code and getting hands-on with the details", x: 1046.582, y: 306.504, width: 89.305, height: 89.305, rotation: 6.185 },
  { id: "codex", label: "Codex", tooltip: "My AI workspace for research, design, writing, and building", x: 911.543, y: 453.331, width: 90.915, height: 90.915, rotation: -6.277 },
  { id: "open-to-work", label: "Open to work", x: -15.372, y: 212, width: 188.755, height: 184.595, rotation: 8 },
] as const;
const stickerIds = stickers.map(({ id }) => id);
const serviceIconHeight = 81;
type CardId = (typeof cards)[number]["id"];
type DeckMode = "show" | "restack";
type StickerId = (typeof stickers)[number]["id"];
type LayerItemId = CardId | StickerId;
const initialLayerOrder: LayerItemId[] = [
  ...[...cardIds].reverse(),
  ...stickerIds,
];
type ItemStyle = CSSProperties & Record<`--${string}`, string | number>;

function stopCardDrag(event: ReactPointerEvent<HTMLElement>) {
  event.stopPropagation();
}

function CardContent({ id }: { id: CardId }) {
  if (id === "card-1") {
    return (
      <>
        <Image className={styles.portrait} src="/hero/redesign/portrait.jpg"
          alt="Alexander Lozhkin wearing a cap and glasses" fill priority sizes="360px" draggable={false} />
        <span className={styles.swipeHint}>
          <span>swipe right</span>
          <Image className={styles.swipeArrow} src="/hero/redesign/swipe-arrow.svg"
            alt="" width={29} height={19} draggable={false} />
        </span>
      </>
    );
  }

  return (
    <>
      {id === "card-2" ? (
        <>
          <h2 className={`${styles.cardHeading} ${styles.aboutHeading}`}>About</h2>
          <div className={`${styles.cardCopy} ${styles.aboutCopy}`}>
            <p>I worked 15+ years across fintech, e-commerce, and complex data-heavy products.</p>
            <p>Built and scaled multidisciplinary design teams, leading up to 16 people.</p>
            <p>I work at the strategic level and get hands-on when needed</p>
          </div>
          <a className={styles.downloadLink} href="/Alexander-Lozhkin-CV.pdf" download
            onPointerDown={stopCardDrag}>
            <Image src="/hero/redesign/download-cv-arrow.svg" alt="" width={16} height={23} draggable={false} />
            <span>Download CV</span>
          </a>
        </>
      ) : (
        <>
          <h2 className={`${styles.cardHeading} ${styles.approachHeading}`}>Approach</h2>
          <ul className={styles.approachList}>
            <li>I make room for honest conversations and unfinished ideas.</li>
            <li>I start at the whiteboard, where we can get bolder together.</li>
            <li>I discover, build, and learn — and cut what doesn’t help.</li>
          </ul>
          <a className={styles.readMoreLink} href="#approach"
            onPointerDown={stopCardDrag} draggable={false}>
            <span>How I work</span>
            <Image src="/hero/redesign/read-more-underline.svg" alt=""
              width={103.6} height={10.6003} draggable={false} />
          </a>
        </>
      )}
    </>
  );
}

export function WhiteboardHeader() {
  const [expanded, setExpanded] = useState(false);
  const [deckFeedback, setDeckFeedback] = useState<"Boop!" | null>(null);
  const [heldIconMode, setHeldIconMode] = useState<DeckMode | null>(null);
  const feedbackTimer = useRef<number | null>(null);
  const layers = useLayerOrder(initialLayerOrder);
  const stack = useCardStack(cardIds, {
    onCycle: (id) => layers.sendToBack(id as CardId),
  });
  const icons = useDragCollection(stickerIds, {
    enabled: () => window.matchMedia(
      "(min-width: 1000px) and (hover: hover) and (pointer: fine)",
    ).matches,
    onDragStart: (id) => layers.bringToFront(id as StickerId),
  });

  useEffect(() => () => {
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
  }, []);

  function restack() {
    stack.resetStack();
    icons.resetOffsets();
    layers.resetOrder();
    setExpanded(false);
  }

  function expandCards() {
    stack.resetStack();
    for (const id of [...cardIds].reverse()) layers.bringToFront(id);
    setExpanded(true);
  }

  function swipeCard() {
    const frontCard = cardIds.reduce((front, id) =>
      layers.zIndex(id) > layers.zIndex(front) ? id : front,
    );
    layers.sendToBack(frontCard);
  }

  const cardsMoved = cardIds.some((id) => {
    const offset = stack.offsets[id];
    return offset && (offset.x !== 0 || offset.y !== 0);
  });
  const canRestack = expanded || Boolean(stack.draggingId) || cardsMoved;
  const deckMode: DeckMode = canRestack ? "restack" : "show";

  function toggleDesktopCards() {
    if (canRestack) restack();
    else expandCards();

    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    setDeckFeedback("Boop!");
    setHeldIconMode((current) => current ?? deckMode);
    feedbackTimer.current = window.setTimeout(() => {
      setDeckFeedback(null);
      setHeldIconMode(null);
      feedbackTimer.current = null;
    }, 1200);
  }

  return (
    <header className={styles.hero} aria-label="Introduction"
      data-dragging={Boolean(stack.draggingId || icons.draggingId)} data-expanded={expanded}>
      <h1 className={styles.title}>Hi! I am Alex,<br />product design lead</h1>

      <button className={styles.deckToggle} data-mode={heldIconMode ?? deckMode}
        data-feedback={deckFeedback !== null} type="button"
        aria-label={canRestack ? "Restack" : "Show cards"}
        onClick={toggleDesktopCards}>
        <span className={styles.deckToggleIcon} aria-hidden="true">
          <span /><span /><span />
        </span>
        <span>{deckFeedback ?? (canRestack ? "Restack" : "Show cards")}</span>
      </button>
      <button className={`${styles.deckToggle} ${styles.mobileDeckToggle}`}
        data-mode="show" type="button" onClick={swipeCard}>
        <span className={styles.deckToggleIcon} aria-hidden="true">
          <span /><span /><span />
        </span>
        <span>Swipe card</span>
      </button>
      <DraggableCardStack
        ariaLabel="Draggable card stack"
        cards={cards}
        cardClassName={styles.heroCard}
        controller={stack}
        dataKind="card"
        getStyle={(_, cardIndex): DraggableCardStyle => ({
          "--stack-card-width": expanded ? "var(--hero-spread-card-width)" : "var(--hero-card-width)",
          "--stack-card-radius": "min(64px, 12.444vw)",
          "--card-bottom": "calc(var(--footer-bottom) + var(--footer-height) + 48px)",
          "--card-left": "calc(50% - 10px)",
          "--card-anchor-x": "-50%",
          "--stack-x": expanded ? `var(--hero-spread-x-${cardIndex + 1})` : `${cardIndex * 10}px`,
          "--stack-y": expanded ? "0px" : `${cardIndex * -10}px`,
          "--mobile-card-top": "var(--mobile-stack-center)",
          "--mobile-card-left": "calc(50% - 10px)",
          "--mobile-card-anchor-x": "-50%",
          "--mobile-card-anchor-y": "-50%",
          "--mobile-stack-x": `${cardIndex * 10}px`,
          "--mobile-stack-y": `${cardIndex * -10}px`,
        })}
        getZIndex={(id) => layers.zIndex(id as CardId)}
        onBringToFront={(id) => layers.bringToFront(id as CardId)}
        onRestack={restack}
        renderCard={(card) => <CardContent id={card.id} />}
      />

      <div className={styles.stickers} role="group" aria-label="Draggable tool icons">
        {stickers.map((sticker) => {
          const offset = icons.offsets[sticker.id] ?? { x: 0, y: 0 };
          const openToWork = sticker.id === "open-to-work";
          const scale = serviceIconHeight / sticker.height;
          const scaledWidth = sticker.width * scale;
          const style: ItemStyle = {
            "--icon-width": openToWork ? `${sticker.width}px` : `${scaledWidth}px`,
            "--icon-height": openToWork ? `${sticker.height}px` : `${serviceIconHeight}px`,
            "--icon-rotation": `${sticker.rotation}deg`,
            "--icon-z": layers.zIndex(sticker.id),
            "--drag-x": `${offset.x}px`,
            "--drag-y": `${offset.y}px`,
            "--icon-x": openToWork ? `${sticker.x}px` : `calc(${sticker.x / 1280 * 100}% + ${(sticker.width - scaledWidth) / 2}px)`,
            "--icon-y": openToWork ? `${sticker.y / 842 * 100}%` : `calc(${sticker.y / 842 * 100}% + ${(sticker.height - serviceIconHeight) / 2}px)`,
          };
          return (
            <DraggableIcon
              key={sticker.id}
              className={`${styles.sticker} ${openToWork ? styles.openToWork : ""}`}
              dataKind="sticker"
              dragging={icons.draggingId === sticker.id}
              id={sticker.id}
              imageClassName={`${styles.stickerImage} ${styles[sticker.id] ?? ""}`}
              label={sticker.label}
              onBeginDrag={icons.beginDrag}
              onEndDrag={icons.endDrag}
              onMove={icons.moveItem}
              sizes={openToWork ? "189px" : `${serviceIconHeight}px`}
              src={`/hero/redesign/${sticker.id}.png`}
              style={style}
              tooltip={"tooltip" in sticker ? sticker.tooltip : undefined}
            />
          );
        })}
      </div>

      <nav className={styles.headerLinks} aria-label="Contact links">
        {headerLinks.map((link) => (
          <a key={link.label} href={link.href}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
