"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className: string };

export function CaseArticleReveal({ children, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blocks = Array.from(root.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && child.hasAttribute("data-case-block"),
    );

    // Content starts visible in the server response. Keep blocks already on screen
    // visible when JavaScript enhances the article, so hydration cannot flash them away.
    for (const block of blocks) {
      const bounds = block.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.95 && bounds.bottom > 0) block.dataset.revealed = "true";
    }
    root.dataset.revealReady = "true";

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });

    for (const block of blocks) {
      if (!block.dataset.revealed) observer.observe(block);
    }

    return () => observer.disconnect();
  }, []);

  return <div className={className} ref={rootRef}>{children}</div>;
}
