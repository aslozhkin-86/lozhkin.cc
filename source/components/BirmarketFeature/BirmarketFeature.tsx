import Image from "next/image";
import { BirmarketComparison } from "./BirmarketComparison";
import { BirmarketIntro } from "./BirmarketIntro";

import styles from "./BirmarketFeature.module.css";

const imageryTiles = [
  { name: "toys", alt: "Teddy bear" },
  { name: "med", alt: "Medicine and health products" },
  { name: "tools", alt: "Power drill" },
  { name: "bike", alt: "Bicycle" },
  { name: "food", alt: "Food and drinks" },
  { name: "home", alt: "Armchair" },
  { name: "wear", alt: "Clothing" },
  { name: "cosm", alt: "Cosmetics" },
  { name: "wash", alt: "Washing machine" },
  { name: "comp", alt: "Laptop" },
] as const;

export function BirmarketFeature() {
  return (
    <section className={styles.section} id="birmarket" aria-labelledby="birmarket-feature-title">
      <div className={styles.intro}>
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
        <div className={styles.imagerySection}>
          <h3>Consistent style and creation rules for 3D product imagery</h3>
          <div className={styles.imageryTiles}>
            {imageryTiles.map(({ name, alt }) => (
              <div className={styles.imageryTile} key={name}>
                <Image src={`/homepage/birmarket/${name}.png`} width={568} height={388} alt={alt} sizes="(max-width: 1079px) calc((100vw - 56px) / 2), 284px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
