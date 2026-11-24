"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";

import styles from "./ProductCloud.module.css";

/**
 * Figma 1× slots on the 1920 × 620 design canvas (node 1284:49151), adjusted so that
 * no two images touch while they drift at different parallax speeds.
 */
const icons = [
  { name: "medicine", alt: "Medicine and health products", x: 86, y: 140, width: 122, height: 134 },
  { name: "washing_machine", alt: "Washing machine", x: 231, y: 134, width: 129, height: 131 },
  { name: "laptop", alt: "Laptop", x: 70, y: 313, width: 136, height: 131 },
  { name: "chair", alt: "Armchair", x: 532, y: 257, width: 128, height: 140 },
  { name: "teddy_bear", alt: "Teddy bear", x: 360, y: 398, width: 132, height: 163 },
  { name: "drill", alt: "Power drill", x: 742, y: 379, width: 94, height: 113 },
  { name: "shirt", alt: "Clothing", x: 893, y: 228, width: 94, height: 118 },
  { name: "drink", alt: "Food and drinks", x: 974, y: 436, width: 151, height: 161 },
  { name: "makeup", alt: "Cosmetics", x: 1120, y: 273, width: 122, height: 135 },
  { name: "bicycle", alt: "Bicycle", x: 1327, y: 288, width: 246, height: 232 },
  { name: "book", alt: "Book", x: 1690, y: 430, width: 96, height: 120 },
  { name: "tv", alt: "Television", x: 1731, y: 278, width: 136, height: 122 },
] as const;

export const PRODUCT_CLOUD_DEFAULT_MOTION = {
  travel: 320,
  depthSpread: 0.5,
} as const;

export type ProductCloudMotionSettings = {
  /** Left-to-right travel of a mid-sized image across the whole scroll pass, in 1920 px design pixels. */
  travel?: number;
  /** How strongly image size changes speed: larger images read as nearer and move faster. */
  depthSpread?: number;
};

/** Typical image size (square root of its area) that moves at exactly the base speed. */
const MID_SIZE = 130;

const speedFor = (width: number, height: number, depthSpread: number) =>
  Math.min(1.8, Math.max(0.5, 1 + (depthSpread * (Math.sqrt(width * height) - MID_SIZE)) / 26));

export function ProductCloud({
  travel = PRODUCT_CLOUD_DEFAULT_MOTION.travel,
  depthSpread = PRODUCT_CLOUD_DEFAULT_MOTION.depthSpread,
}: ProductCloudMotionSettings = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    // Publishes one scroll progress value; CSS turns it into each image's offset.
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) return;
      const bounds = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
      section.style.setProperty("--cloud-progress", progress.toFixed(4));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.section} ref={sectionRef} style={{ "--cloud-travel": travel } as CSSProperties}>
      <h3>Consistent style and creation rules for 3D product imagery</h3>
      <div className={styles.viewport}>
        {icons.map(({ name, alt, x, y, width, height }) => {
          const speed = speedFor(width, height, depthSpread);
          return (
            <span
              className={styles.icon}
              data-cloud-icon
              data-cloud-name={name}
              key={name}
              style={{
                "--icon-center": x + width / 2,
                "--icon-top": y,
                "--icon-width": width,
                "--icon-height": height,
                "--icon-speed": speed,
                zIndex: Math.round(speed * 10),
              } as CSSProperties}
            >
              <Image src={`/homepage/birmarket/product-cloud/${name}.png`} alt={alt} width={width * 2} height={height * 2} sizes={`${width}px`} draggable={false} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
