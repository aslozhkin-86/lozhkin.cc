"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type MouseEvent, type PointerEvent } from "react";

import styles from "./HoverTiltIcon.module.css";

export const HOVER_TILT_ICON_SETTINGS = {
  imageSize: 80,
  maximumTilt: 14,
  perspective: 250,
  responseTime: 220,
  hoverGrowth: 8,
  glareSize: 40,
  glareIntensity: 30,
} as const;

export type HoverTiltIconSettings = Partial<{ [K in keyof typeof HOVER_TILT_ICON_SETTINGS]: number }>;

type HoverTiltIconProps = {
  src: string;
  label: string;
  settings?: HoverTiltIconSettings;
};

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

export function HoverTiltIcon({ src, label, settings }: HoverTiltIconProps) {
  const artwork = useRef<HTMLSpanElement>(null);
  const { imageSize, maximumTilt, perspective, responseTime, hoverGrowth, glareSize, glareIntensity } = {
    ...HOVER_TILT_ICON_SETTINGS,
    ...settings,
  };

  function resetPointer() {
    artwork.current?.style.setProperty("--tilt-x", "0deg");
    artwork.current?.style.setProperty("--tilt-y", "0deg");
    artwork.current?.style.setProperty("--glare-x", "50%");
    artwork.current?.style.setProperty("--glare-y", "50%");
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    if (!window.matchMedia("(min-width: 1080px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = clamp((event.clientX - bounds.left - bounds.width / 2) / ((imageSize + hoverGrowth) / 2));
    const vertical = clamp((event.clientY - bounds.top - bounds.height / 2) / ((imageSize + hoverGrowth) / 2));

    artwork.current?.style.setProperty("--tilt-x", `${-vertical * maximumTilt}deg`);
    artwork.current?.style.setProperty("--tilt-y", `${horizontal * maximumTilt}deg`);
    artwork.current?.style.setProperty("--glare-x", `${50 + horizontal * 50}%`);
    artwork.current?.style.setProperty("--glare-y", `${50 + vertical * 50}%`);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.detail !== 0 && !window.matchMedia("(max-width: 1079px)").matches) return;

    resetPointer();
    artwork.current?.getAnimations().forEach((animation) => animation.cancel());
    artwork.current?.animate([
      { transform: "rotateY(0deg) rotateZ(0deg) scale(1)" },
      { transform: "rotateY(-14deg) rotateZ(-8deg) scale(1.06)", offset: 0.2 },
      { transform: "rotateY(11deg) rotateZ(7deg) scale(1.08)", offset: 0.48 },
      { transform: "rotateY(-6deg) rotateZ(-4deg) scale(1.04)", offset: 0.72 },
      { transform: "rotateY(0deg) rotateZ(0deg) scale(1)" },
    ], { duration: 620, easing: "ease-in-out" });
  }

  return (
    <button className={styles.target} type="button" aria-label={`Animate ${label} icon`}
      style={{ "--icon-size": `${imageSize}px`, perspective } as CSSProperties}
      onPointerEnter={handlePointerMove} onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer} onPointerCancel={resetPointer} onClick={handleClick}>
      <span ref={artwork} className={styles.artwork} style={{
        transitionDuration: `${responseTime}ms`,
        "--hover-scale": (imageSize + hoverGrowth) / imageSize,
        "--glare-size": `${glareSize}px`,
        "--glare-opacity": glareIntensity / 100,
      } as CSSProperties}>
        <Image className={styles.image} src={src} width={imageSize} height={imageSize} alt="" draggable={false} />
        <span className={styles.glare} style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }} aria-hidden="true" />
      </span>
    </button>
  );
}
