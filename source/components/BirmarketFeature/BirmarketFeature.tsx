import Image from "next/image";
import { HoverTiltIcon } from "../HoverTiltIcon";
import { BirmarketComparison } from "./BirmarketComparison";
import { BirmarketIntro } from "./BirmarketIntro";
import { ProductCloud } from "./ProductCloud";

import styles from "./BirmarketFeature.module.css";

export function BirmarketFeature() {
  return (
    <section className={styles.section} id="birmarket" aria-labelledby="birmarket-feature-title">
      <div className={styles.intro}>
        <HoverTiltIcon src="/homepage/project-pins/birmarket-brand.png" label="Birmarket brand" />
        <h2 className={styles.title} id="birmarket-feature-title">Brand refresh for Birmarket</h2>
        <BirmarketIntro />
      </div>
      <div className={styles.gallery}>
        <div className={`${styles.media} ${styles.billboard}`}>
          <Image src="/homepage/birmarket/brand-billboard.jpg" width={1740} height={930} alt="Birmarket winter campaign on a purple outdoor billboard" sizes="(max-width: 1079px) calc(100vw - 48px), 1160px" />
        </div>
        <div className={styles.brandStack}>
          <div className={`${styles.brandCard} ${styles.logoCard}`}>
            <Image src="/homepage/birmarket/new-logo.png" width={920} height={640} alt="Old pink Birmarket icon changing to the new purple icon" sizes="(max-width: 1079px) calc(100vw - 48px), 460px" />
            <p>Logo &amp; main colour update</p>
          </div>
          <div className={`${styles.brandCard} ${styles.contrastCard}`}>
            <Image src="/homepage/birmarket/sale.png" width={920} height={640} alt="Neon green Birmarket sale graphic" sizes="(max-width: 1079px) calc(100vw - 48px), 460px" />
            <p>New<span>toxic green</span>colour</p>
          </div>
        </div>
        <BirmarketComparison />
        <ProductCloud />
      </div>
    </section>
  );
}
