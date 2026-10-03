"use client";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */

import type { CSSProperties, ReactNode } from "react";

import type { CardStackController } from "./useCardStack";
import styles from "./DraggableCardStack.module.css";

export type DraggableCardItem = {
  id: string;
  label: string;
};

export type DraggableCardStyle = CSSProperties &
  Record<`--${string}`, string | number>;

type DraggableCardStackProps<T extends DraggableCardItem> = {
  ariaLabel: string;
  cardClassName?: string;
  cards: readonly T[];
  controller: CardStackController;
  dataKind: string;
  getStyle: (card: T, index: number) => DraggableCardStyle;
  getZIndex: (id: string) => number;
  onBringToFront: (id: string) => void;
  onRestack?: () => void;
  renderCard: (card: T) => ReactNode;
  surfaceClassName?: string;
};

export function DraggableCardStack<T extends DraggableCardItem>({
  ariaLabel,
  cardClassName,
  cards,
  controller,
  dataKind,
  getStyle,
  getZIndex,
  onBringToFront,
  onRestack,
  renderCard,
  surfaceClassName,
}: DraggableCardStackProps<T>) {
  return (
    <div
      className={styles.stack}
      data-dragging={Boolean(controller.draggingId)}
      role="group"
      aria-label={ariaLabel}
    >
      {cards.map((card, index) => {
        const offset = controller.offsets[card.id] ?? { x: 0, y: 0 };
        const style: DraggableCardStyle = {
          ...getStyle(card, index),
          "--card-z": getZIndex(card.id),
          "--drag-x": `${offset.x}px`,
          "--drag-y": `${offset.y}px`,
        };
        const dataAttribute = { [`data-${dataKind}-id`]: card.id };

        return (
          <article
            {...dataAttribute}
            aria-label={`${card.label} — draggable card`}
            className={`${styles.card} ${cardClassName ?? ""}`}
            data-dragging={controller.draggingId === card.id}
            data-returning={controller.returningIds.has(card.id)}
            key={card.id}
            style={style}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              const step = event.shiftKey ? 40 : 10;
              const directions: Record<string, [number, number]> = {
                ArrowLeft: [-step, 0],
                ArrowRight: [step, 0],
                ArrowUp: [0, -step],
                ArrowDown: [0, step],
              };

              if (event.key === "Home" && onRestack) {
                event.preventDefault();
                onRestack();
              }

              const direction = directions[event.key];
              if (direction) {
                event.preventDefault();
                onBringToFront(card.id);
                controller.moveBy(card.id, ...direction);
              }
            }}
            onPointerDown={(event) => {
              if (controller.beginDrag(event, card.id)) onBringToFront(card.id);
            }}
            onPointerMove={(event) => controller.moveCard(event, card.id)}
            onPointerUp={(event) => controller.endDrag(event, card.id)}
            onPointerCancel={(event) => controller.endDrag(event, card.id)}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === "transform"
              ) {
                controller.finishReturn(card.id);
              }
            }}
          >
            <div className={`${styles.surface} ${surfaceClassName ?? ""}`}>
              {renderCard(card)}
            </div>
          </article>
        );
      })}
    </div>
  );
}
