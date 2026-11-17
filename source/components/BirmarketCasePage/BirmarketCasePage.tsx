import Image from "next/image";

import { DotParallax } from "../../app/DotParallax";
import { M10CaseMotion } from "../M10CaseMotion/M10CaseMotion";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";
import styles from "../M10CasePage/M10CasePage.module.css";
import birmarketStyles from "./BirmarketCasePage.module.css";

const achievements = [
  "Led product design and UX research across buyer, seller, and logistics for a marketplace with 1.5M monthly active users, managing 7 designers and 2 researchers.",
  "Reshaped the design function during a company turnaround and brought the teams together around shared product priorities.",
  "Led customer-journey research using analytics, interviews, and usability tests. Presented the findings to leadership and helped refocus the backlog on the biggest user pain points.",
  "Developed Marketplace Vision 2027 and secured leadership buy-in, giving the buyer, seller, and logistics teams a shared direction.",
];

export function BirmarketCasePage() {
  return (
    <article className={styles.page} data-m10-page>
      <DotParallax />
      <M10CaseMotion />

      <header className={birmarketStyles.header}>
        <PageCloseLink className={birmarketStyles.close} href="/#birmarket" label="Back to Birmarket on the homepage" />
      </header>

      <main className={styles.main}>
        <section className={styles.overview} aria-labelledby="birmarket-role">
          <div className={styles.overviewHeading}>
            <h1 className={styles.overviewTitle} id="birmarket-role">Birmarket, Head of design</h1>
            <span className={styles.overviewDate}>2026</span>
          </div>
          <div className={styles.overviewColumns}>
            <section className={styles.overviewGroup} data-m10-reveal>
              <h2 className={styles.label}>Achievements</h2>
              <ul className={styles.statementList}>
                {achievements.map((achievement) => <li key={achievement}>— {achievement}</li>)}
              </ul>
            </section>
            <section className={styles.overviewGroup} data-m10-reveal>
              <h2 className={styles.label}>Project results</h2>
              <p className={birmarketStyles.resultNote}>I’d be happy to share selected results and discuss the impact of this work in a conversation.</p>
            </section>
            <div className={birmarketStyles.stickerColumn}>
              <Image src="/projects/birmarket/sticker.png" alt="Birmarket is an Azerbaijani marketplace with around 1.5M monthly active users" width={531} height={514} sizes="(max-width: 1079px) 260px, 320px" />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>© Alexander Lozhkin</footer>
    </article>
  );
}
