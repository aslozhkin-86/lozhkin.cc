import Image from "next/image";
import type { ReactNode } from "react";

import styles from "./CaseArticleBlocks.module.css";

type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

function ImageFigure({ image, size }: { image: CaseImage; size: "small" | "big" }) {
  return (
    <figure className={styles.figure}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={size === "small" ? "(max-width: 1079px) calc(100vw - 48px), 600px" : "(max-width: 1079px) calc(100vw - 48px), 1160px"}
      />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

export function CaseParagraph({ children, variant }: { children: ReactNode; variant?: "lead" }) {
  return <div className={`${styles.block} ${styles.textContent}`} data-case-block="paragraph" data-variant={variant}>{children}</div>;
}

export function CaseTextImageBlock({ children }: { children: ReactNode }) {
  return <div className={`${styles.block} ${styles.textImage}`} data-case-block="text-image">{children}</div>;
}

export function CaseSmallImage({ image }: { image: CaseImage }) {
  return <ImageFigure image={image} size="small" />;
}

export function CaseBigImage({ image }: { image: CaseImage }) {
  return <div className={`${styles.block} ${styles.bigImage}`} data-case-block="big-image"><ImageFigure image={image} size="big" /></div>;
}
