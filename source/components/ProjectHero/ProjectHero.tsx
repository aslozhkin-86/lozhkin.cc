import type { CSSProperties, ReactNode } from "react";

import { PageCloseLink } from "../PageCloseLink/PageCloseLink";
import styles from "./ProjectHero.module.css";

type ProjectHeroProps = {
  title: string;
  image: string;
  imageAlt: string;
  returnHref: string;
  returnLabel: string;
  mobileImage?: string;
  foreground?: "light" | "dark";
  hideTitle?: boolean;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  children?: ReactNode;
};

type HeroImageStyle = CSSProperties & {
  "--project-hero-image": string;
  "--project-hero-mobile-image": string;
};

export function ProjectHero({
  title,
  image,
  imageAlt,
  returnHref,
  returnLabel,
  mobileImage,
  foreground = "light",
  hideTitle = false,
  className,
  imageClassName,
  contentClassName,
  children,
}: ProjectHeroProps) {
  const imageStyle: HeroImageStyle = {
    "--project-hero-image": `url("${image}")`,
    "--project-hero-mobile-image": `url("${mobileImage ?? image}")`,
  };

  return (
    <header className={[styles.hero, className].filter(Boolean).join(" ")} data-foreground={foreground}>
      <div
        className={[styles.image, imageClassName].filter(Boolean).join(" ")}
        data-m10-hero-image
        role="img"
        aria-label={imageAlt}
        style={imageStyle}
      />
      <div className={[styles.content, contentClassName].filter(Boolean).join(" ")}>
        <nav className={styles.navigation} aria-label="Project navigation">
          <PageCloseLink className={styles.close} href={returnHref} label={returnLabel} />
        </nav>
        <h1 className={[styles.title, hideTitle && styles.visuallyHidden].filter(Boolean).join(" ")}>{title}</h1>
        {children && <div className={styles.meta}>{children}</div>}
      </div>
    </header>
  );
}
