"use client";

import { useEffect, useRef, useState } from "react";

import { useDragCollection } from "../interaction/useDragCollection";

const MOBILE_STACK_QUERY = "(max-width: 760px)";
const MOBILE_CYCLE_DISTANCE = 100;

export function useCardStack(
  cardIds: readonly string[],
  { onCycle }: { onCycle?: (id: string) => void } = {},
) {
  const [returningIds, setReturningIds] = useState<Set<string>>(
    () => new Set(),
  );
  const returnFrameRefs = useRef(new Map<string, number>());

  function cancelReturnFrame(id: string) {
    const frame = returnFrameRefs.current.get(id);
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    returnFrameRefs.current.delete(id);
  }

  const drag = useDragCollection(cardIds, {
    onDragStart: (id) => {
      cancelReturnFrame(id);
      setReturningIds((current) => {
        if (!current.has(id)) return current;
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    },
    onDragEnd: ({ eventType, finalOffset, id, originOffset }) => {
      if (!window.matchMedia(MOBILE_STACK_QUERY).matches) return;

      const distance = Math.hypot(
        finalOffset.x - originOffset.x,
        finalOffset.y - originOffset.y,
      );
      const shouldCycle =
        eventType === "pointerup" && distance >= MOBILE_CYCLE_DISTANCE;

      if (!shouldCycle) {
        drag.setOffset(id, originOffset);
        return;
      }

      onCycle?.(id);
      setReturningIds((current) => new Set(current).add(id));
      cancelReturnFrame(id);
      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          drag.setOffset(id, { x: 0, y: 0 });
          returnFrameRefs.current.delete(id);
        });
        returnFrameRefs.current.set(id, secondFrame);
      });
      returnFrameRefs.current.set(id, firstFrame);
    },
  });

  useEffect(() => {
    const frames = returnFrameRefs.current;
    return () => {
      frames.forEach((frame) => {
        window.cancelAnimationFrame(frame);
      });
      frames.clear();
    };
  }, []);

  function finishReturn(id: string) {
    setReturningIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  function resetStack() {
    returnFrameRefs.current.forEach((frame) => {
      window.cancelAnimationFrame(frame);
    });
    returnFrameRefs.current.clear();
    setReturningIds(new Set());
    drag.resetOffsets();
  }

  return {
    beginDrag: drag.beginDrag,
    draggingId: drag.draggingId,
    endDrag: drag.endDrag,
    finishReturn,
    moveBy: drag.moveBy,
    moveCard: drag.moveItem,
    offsets: drag.offsets,
    resetStack,
    returningIds,
  };
}

export type CardStackController = ReturnType<typeof useCardStack>;
