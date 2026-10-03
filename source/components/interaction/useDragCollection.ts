"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type DragOffset = {
  x: number;
  y: number;
};

type DragSession = {
  element: HTMLElement;
  id: string;
  latestX: number;
  latestY: number;
  originX: number;
  originY: number;
  pointerId: number;
  startX: number;
  startY: number;
};

type DragEndDetails = {
  eventType: string;
  finalOffset: DragOffset;
  id: string;
  originOffset: DragOffset;
};

function makeInitialOffsets(ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, { x: 0, y: 0 }])) as Record<
    string,
    DragOffset
  >;
}

export function useDragCollection(
  ids: readonly string[],
  {
    enabled = () => true,
    onDragEnd,
    onDragStart,
  }: {
    enabled?: () => boolean;
    onDragEnd?: (details: DragEndDetails) => void;
    onDragStart?: (id: string) => void;
  } = {},
) {
  const [offsets, setOffsetsState] = useState<Record<string, DragOffset>>(() =>
    makeInitialOffsets(ids),
  );
  const offsetsRef = useRef(offsets);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const sessionRef = useRef<DragSession | null>(null);
  const frameRef = useRef<number | null>(null);

  function applyOffset(element: HTMLElement, offset: DragOffset) {
    element.style.setProperty("--drag-x", `${offset.x}px`);
    element.style.setProperty("--drag-y", `${offset.y}px`);
  }

  function setOffsets(nextOffsets: Record<string, DragOffset>) {
    offsetsRef.current = nextOffsets;
    setOffsetsState(nextOffsets);
  }

  function setOffset(id: string, offset: DragOffset) {
    setOffsets({ ...offsetsRef.current, [id]: offset });
  }

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function beginDrag(event: ReactPointerEvent<HTMLElement>, id: string) {
    if (event.button !== 0 || sessionRef.current || !enabled()) return false;

    event.preventDefault();
    const origin = offsetsRef.current[id] ?? { x: 0, y: 0 };
    sessionRef.current = {
      element: event.currentTarget,
      id,
      latestX: origin.x,
      latestY: origin.y,
      originX: origin.x,
      originY: origin.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    onDragStart?.(id);
    setDraggingId(id);
    return true;
  }

  function moveItem(event: ReactPointerEvent<HTMLElement>, id: string) {
    const session = sessionRef.current;
    if (!session || session.id !== id || session.pointerId !== event.pointerId) return;

    event.preventDefault();
    session.latestX = session.originX + event.clientX - session.startX;
    session.latestY = session.originY + event.clientY - session.startY;

    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      const activeSession = sessionRef.current;
      if (activeSession) {
        applyOffset(activeSession.element, {
          x: activeSession.latestX,
          y: activeSession.latestY,
        });
      }
      frameRef.current = null;
    });
  }

  function endDrag(event: ReactPointerEvent<HTMLElement>, id: string) {
    const session = sessionRef.current;
    if (!session || session.id !== id || session.pointerId !== event.pointerId) return;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const finalOffset = {
      x: session.originX + event.clientX - session.startX,
      y: session.originY + event.clientY - session.startY,
    };
    applyOffset(session.element, finalOffset);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    sessionRef.current = null;
    setDraggingId(null);
    setOffset(id, finalOffset);
    onDragEnd?.({
      eventType: event.type,
      finalOffset,
      id,
      originOffset: { x: session.originX, y: session.originY },
    });
  }

  function moveBy(id: string, x: number, y: number) {
    if (sessionRef.current) return;
    const current = offsetsRef.current[id] ?? { x: 0, y: 0 };
    onDragStart?.(id);
    setOffset(id, { x: current.x + x, y: current.y + y });
  }

  function resetOffsets() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    sessionRef.current = null;
    setDraggingId(null);
    setOffsets(makeInitialOffsets(ids));
  }

  return {
    beginDrag,
    draggingId,
    endDrag,
    moveBy,
    moveItem,
    offsets,
    resetOffsets,
    setOffset,
  };
}
