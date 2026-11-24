import Image from "next/image";
import { HoverTiltIcon } from "../HoverTiltIcon";

import { VisionHeroVideo } from "./VisionHeroVideo";
import { VisionVideo } from "./VisionVideo";
import styles from "./BirmarketVision.module.css";

export function BirmarketVision() {
  return (
    <article className={styles.project} id="birmarket-2027" aria-labelledby="birmarket-2027-title">
      <div className={styles.content}>
        <div className={styles.intro}>
          <HoverTiltIcon src="/homepage/project-pins/birmarket-concept.png" label="Birmarket concept" />
          <h2 className={styles.title} id="birmarket-2027-title">Rethinking Birmarket for 2027</h2>
          <p className={styles.description}>Based on our audit and user research, the mobile concept explores solutions to long-standing user problems. It gives stakeholders a shared vision and the product team a basis for rethinking the roadmap.</p>
        </div>
        <div className={styles.grid}>
          <VisionHeroVideo />
          <div className={styles.pair}>
            <div className={`${styles.placeholder} ${styles.tall}`}>
              <h3 className={styles.cardTitle}>New catalog</h3>
              <p className={styles.cardCaption}>20% less time to find a category</p>
              <Image alt="Birmarket concept catalog screen with product categories" className={styles.catalogImage} src="/homepage/birmarket/vision-2027/catalog.png" width={732} height={1305} sizes="(max-width: 1079px) 63vw, 363px" />
            </div>
            <div className={`${styles.placeholder} ${styles.tall} ${styles.videoCard}`}>
              <VisionVideo src="/homepage/birmarket/vision-2027/listing-promo.mp4" label="Birmarket concept product listing animation" />
            </div>
          </div>
          <div className={styles.pair}>
            <div className={`${styles.placeholder} ${styles.purchase} ${styles.videoCard}`}>
              <VisionVideo src="/homepage/birmarket/checkout-demo.mp4" label="Birmarket concept purchase experience animation" />
            </div>
            <div className={`${styles.placeholder} ${styles.cart}`}>
              <p className={styles.cardCaption}>The same product card structure carries through from listings to the cart</p>
              <Image alt="Three Birmarket product cards in the concept cart" className={styles.cartImage} src="/homepage/birmarket/vision-2027/cart-snippets.png" width={680} height={955} sizes="(max-width: 1079px) 70vw, 340px" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
