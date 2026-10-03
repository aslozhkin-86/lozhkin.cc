"use client";

import { useState } from "react";

export function useLayerOrder<T extends string>(initialOrder: readonly T[]) {
  const [order, setOrder] = useState<T[]>([...initialOrder]);

  function bringToFront(id: T) {
    setOrder((current) => [...current.filter((itemId) => itemId !== id), id]);
  }

  function sendToBack(id: T) {
    setOrder((current) => [id, ...current.filter((itemId) => itemId !== id)]);
  }

  function resetOrder() {
    setOrder([...initialOrder]);
  }

  function zIndex(id: T) {
    return order.indexOf(id) + 1;
  }

  return { bringToFront, order, resetOrder, sendToBack, zIndex };
}
