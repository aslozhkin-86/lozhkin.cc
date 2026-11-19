import Image from "next/image";

import styles from "./BirmarketAudit.module.css";

export function BirmarketAudit() {
  return (
    <section className={styles.section} aria-labelledby="birmarket-audit-title">
      <div className={styles.intro}>
        <h2 className={styles.title} id="birmarket-audit-title">Birmarket: from audit to action</h2>
        <p className={styles.description}>We audited the main shopping journeys to see where people got stuck. Then we rebuilt the product roadmap, putting the problems most likely to affect unit economics first.</p>
        <a className={styles.link} href="/projects/birmarket/breaking-the-inertia">Read the case</a>
      </div>
      <div className={styles.media}>
        <Image
          src="/homepage/birmarket/audit-teaser.png"
          width={1740}
          height={1085}
          alt="Birmarket design audit workspace, research team, and shopping journey sketches"
          sizes="(max-width: 1079px) calc(100vw - 48px), 1160px"
        />
      </div>
    </section>
  );
}
