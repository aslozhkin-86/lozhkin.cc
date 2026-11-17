"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import styles from "./BeforeAfter.module.css";

type BeforeAfterProps = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeMobileSrc?: string;
  afterMobileSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
  className?: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeMobileSrc,
  afterMobileSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeAlt,
  afterAlt,
  initialPosition = 50,
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(() => Math.min(100, Math.max(0, initialPosition)));
  const edgeOffset = position < 5
    ? -34 * (1 - position / 5)
    : position > 95
      ? 34 * ((position - 95) / 5)
      : 0;
  const positionStyle = {
    "--comparison-position": `${position}%`,
    "--comparison-visual-offset": `${edgeOffset}px`,
  } as CSSProperties;

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")} style={positionStyle}>
      <div className={styles.after}>
        {afterSrc && <Image alt={afterAlt ?? afterLabel} className={`${styles.image} ${afterMobileSrc ? styles.desktopImage : ""}`} fill sizes="(max-width: 1160px) 100vw, 1160px" src={afterSrc} />}
        {afterMobileSrc && <Image alt={afterAlt ?? afterLabel} className={`${styles.image} ${styles.mobileImage}`} fill sizes="(max-width: 1079px) calc(100vw - 48px), 1160px" src={afterMobileSrc} />}
      </div>
      <div className={styles.before}>
        {beforeSrc && <Image alt={beforeAlt ?? beforeLabel} className={`${styles.image} ${beforeMobileSrc ? styles.desktopImage : ""}`} fill sizes="(max-width: 1160px) 100vw, 1160px" src={beforeSrc} />}
        {beforeMobileSrc && <Image alt={beforeAlt ?? beforeLabel} className={`${styles.image} ${styles.mobileImage}`} fill sizes="(max-width: 1079px) calc(100vw - 48px), 1160px" src={beforeMobileSrc} />}
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.handle} aria-hidden="true">
        <Image alt="" src="/design-system/before-after-handle.svg" width={68} height={68} />
      </div>
      <input
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        className={styles.range}
        max="100"
        min="0"
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
        type="range"
        value={position}
      />
    </div>
  );
}
