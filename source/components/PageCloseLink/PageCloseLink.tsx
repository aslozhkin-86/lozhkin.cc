"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

import styles from "./PageCloseLink.module.css";

type PageCloseLinkProps = {
  href: string;
  label: string;
  className?: string;
  backToPrevious?: boolean;
};

export function PageCloseLink({ href, label, className, backToPrevious = false }: PageCloseLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!backToPrevious || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const previousUrl = document.referrer;
    if (!previousUrl || window.history.length < 2 || new URL(previousUrl).href === window.location.href) return;

    event.preventDefault();
    window.history.back();
  };

  return (
    <a href={href} aria-label={label} className={[styles.control, className].filter(Boolean).join(" ")} onClick={handleClick}>
      <Image alt="" className={styles.icon} src="/projects/shared/close.svg" width={32} height={32} />
    </a>
  );
}
