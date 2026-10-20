import Image from "next/image";

import styles from "./ProjectStoryCard.module.css";

type ProjectStoryCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  category?: string;
  href?: string | null;
  showRead?: boolean;
  disabledLabel?: string;
  preserveImage?: boolean;
  reveal?: boolean;
  fadeTitleOnHover?: boolean;
};

export function ProjectStoryCard({
  id,
  title,
  description,
  image,
  alt,
  imageWidth,
  imageHeight,
  category,
  href,
  showRead = true,
  disabledLabel = "soon",
  preserveImage = false,
  reveal = false,
  fadeTitleOnHover = false,
}: ProjectStoryCardProps) {
  const artwork = (
    <Image
      src={image}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      sizes="(max-width: 1079px) min(760px, calc(100vw - 48px)), (max-width: 1440px) 60vw, 850px"
    />
  );

  return (
    <article className={styles.card} id={id} data-m10-reveal={reveal ? "" : undefined} data-title-hover={fadeTitleOnHover ? "fade" : undefined}>
      <div className={styles.content}>
        {category && <p className={styles.label}>{category}</p>}
        <h2 className={styles.title}>
          {href ? <a href={href}>{title}</a> : title}
        </h2>
        <p className={styles.description}>{description}</p>
        {showRead && (href
          ? <a className={styles.readButton} href={href}>Read</a>
          : <span className={[styles.readButton, disabledLabel && styles.comingSoon].filter(Boolean).join(" ")} aria-disabled="true" aria-label={`${title} case study coming soon`}>{disabledLabel ?? "Read"}</span>)}
      </div>
      <div className={styles.media} data-image-fit={preserveImage ? "contain" : "cover"}>
        {href ? <a href={href} aria-label={`View ${title} case study`}>{artwork}</a> : artwork}
      </div>
    </article>
  );
}
