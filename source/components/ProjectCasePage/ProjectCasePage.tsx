import type { ReactNode } from "react";
import { DotParallax } from "../../app/DotParallax";
import { M10CaseMotion } from "./M10CaseMotion";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";
import { PageCopyright } from "../PageCopyright/PageCopyright";

import styles from "./ProjectCasePage.module.css";

type ProjectCasePageProps = {
  cards: ReactNode;
  cardsLabel: string;
  children: ReactNode;
  proof?: ReactNode;
  heroImage?: string;
  heroAlt?: string;
  returnHref: string;
  title: string;
  variant?: "m10";
  year: string;
};

export function ProjectCasePage({ cards, cardsLabel, children, heroAlt, heroImage, proof, returnHref, title, variant, year }: ProjectCasePageProps) {
  return (
    <article className={[styles.page, variant === "m10" && styles.m10Page].filter(Boolean).join(" ")} data-m10-page={variant === "m10" ? "" : undefined}>
      {variant === "m10" && <DotParallax />}
      {variant === "m10" && <M10CaseMotion />}
      <header className={styles.header}>
        {heroImage && <div className={styles.heroViewport} role="img" aria-label={heroAlt ?? title}>
          <div className={styles.heroImage} data-m10-hero-image="" style={{ backgroundImage: `url(${heroImage})` }} />
        </div>}
        {variant !== "m10" && <span className={styles.year}>{year}</span>}
        <h1 className={styles.title}>{title}</h1>
        <PageCloseLink className={styles.close} href={returnHref} label="Back to projects" />
        {proof}
      </header>

      <div className={styles.layout}>
        <div className={styles.narrative}>
          {variant === "m10" && <span className={styles.year}>{year}</span>}
          {children}
        </div>
        <section className={styles.projects} aria-label={cardsLabel}>
          <div className={styles.projectGrid}>{cards}</div>
        </section>
      </div>

      <PageCopyright />
    </article>
  );
}
