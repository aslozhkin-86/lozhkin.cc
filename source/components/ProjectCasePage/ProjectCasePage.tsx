import type { ReactNode } from "react";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";

import styles from "./ProjectCasePage.module.css";

type ProjectCasePageProps = {
  cards: ReactNode;
  cardsLabel: string;
  children: ReactNode;
  proof?: ReactNode;
  returnHref: string;
  title: string;
  year: string;
};

export function ProjectCasePage({ cards, cardsLabel, children, proof, returnHref, title, year }: ProjectCasePageProps) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <span className={styles.year}>{year}</span>
        <h1 className={styles.title}>{title}</h1>
        <PageCloseLink className={styles.close} href={returnHref} label="Back to projects" />
        {proof}
      </header>

      <div className={styles.layout}>
        <div className={styles.narrative}>{children}</div>
        <section className={styles.projects} aria-label={cardsLabel}>
          <div className={styles.projectGrid}>{cards}</div>
        </section>
      </div>

      <p className={styles.copyright}>© Alexander Lozhkin</p>
    </article>
  );
}
