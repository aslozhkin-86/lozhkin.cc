import type { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./ProjectCaseCard.module.css";

type ProjectCaseCardProps = {
  alt: string;
  category?: string;
  company?: string;
  showStatusIcon?: boolean;
  imageAspect?: "wide" | "original";
  className?: string;
  href?: string;
  onOpen?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  height: number;
  image?: string;
  size: "large" | "small";
  title: string;
  width: number;
};

export function ProjectCaseCard({
  alt,
  category,
  company,
  showStatusIcon = true,
  imageAspect = "wide",
  className,
  href,
  onOpen,
  id,
  height,
  image,
  size,
  title,
  width,
}: ProjectCaseCardProps) {
  const card = (
    <figure id={!href && !onOpen ? id : undefined} className={[styles.card, !href && !onOpen && className].filter(Boolean).join(" ")} data-project-case-card data-size={size} data-image-aspect={imageAspect}>
      {image ? <Image
        alt={alt}
        className={styles.image}
        draggable={false}
        height={height}
        sizes={size === "small" ? "(max-width: 600px) 50vw, 265px" : "(max-width: 760px) calc(100vw - 32px), 550px"}
        src={image}
        width={width}
      /> : <div className={styles.placeholder} role="img" aria-label={alt || "Image placeholder"} />}
      <figcaption className={styles.caption}>
        <span className={styles.info}>
          {company && <span className={styles.company}>{company}</span>}
          <strong className={styles.title}>{title}</strong>
          {category && <small className={styles.category}>{category}</small>}
        </span>
        {showStatusIcon && <Image alt="" className={styles.lock} src={href ? "/projects/shared/arrow-link.svg" : "/projects/shared/lock.svg"} width={24} height={24} />}
      </figcaption>
    </figure>
  );

  if (onOpen) return <button type="button" id={id} className={[styles.link, styles.button, className].filter(Boolean).join(" ")} onClick={onOpen} aria-label={`Unlock case study: ${title}`}>{card}</button>;

  return href ? (
    <Link href={href} id={id} className={[styles.link, className].filter(Boolean).join(" ")} aria-label={`Open case study: ${company ? `${company} — ` : ""}${title}`}>
      {card}
    </Link>
  ) : card;
}
