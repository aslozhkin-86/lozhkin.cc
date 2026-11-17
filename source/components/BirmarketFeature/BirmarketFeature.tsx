import Image from "next/image";
import { BeforeAfter } from "@/components/BeforeAfter";

import styles from "./BirmarketFeature.module.css";

export function BirmarketFeature() {
  return (
    <section className={styles.section} id="birmarket" aria-labelledby="birmarket-feature-title">
      <div className={styles.intro}>
        <h2 className={styles.title} id="birmarket-feature-title">Brand refresh and mobile concept for Birmarket</h2>
        <p className={styles.description}>My team was asked to show where Birmarket could go next. We refreshed its visual identity and created a mobile concept to align the team around a shared product vision and guide future development.</p>
        <a className={styles.link} href="/projects/birmarket/breaking-the-inertia">Read the case</a>
      </div>
      <div className={styles.gallery}>
        <div className={`${styles.media} ${styles.brand}`}>
          <Image src="/homepage/birmarket/brand-update.png" width={864} height={720} alt="Birmarket logo and main colour update" sizes="(max-width: 1079px) calc(100vw - 48px), 576px" />
        </div>
        <BeforeAfter
          className={styles.comparison}
          beforeSrc="/homepage/birmarket/before.png"
          afterSrc="/homepage/birmarket/after.png"
          beforeLabel="Before Birmarket redesign"
          afterLabel="After Birmarket redesign"
          beforeAlt="Birmarket marketplace app before the redesign"
          afterAlt="Birmarket marketplace app after the redesign"
        />
        <div className={styles.info}>
          <p>Marketing wanted to improve Birmarket’s visual identity while keeping it recognizable. We went further, bringing the refresh into the app for the first time.</p>
        </div>
        <div className={`${styles.media} ${styles.billboard}`}>
          <Image src="/homepage/birmarket/billboard.png" width={1740} height={930} alt="Purple Birmarket winter campaign billboard with a lime jacket" sizes="(max-width: 1079px) calc(100vw - 48px), 1160px" />
        </div>
        <div className={styles.media}>
          <Image src="/homepage/birmarket/3d-1.png" width={864} height={612} alt="Birmarket 3D product imagery: medicine, armchair, teddy bear and snacks" sizes="(max-width: 1079px) calc(100vw - 48px), 576px" />
        </div>
        <div className={styles.media}>
          <Image src="/homepage/birmarket/3d-2.png" width={864} height={612} alt="Birmarket 3D product imagery: drill and bicycle beside style guidelines" sizes="(max-width: 1079px) calc(100vw - 48px), 576px" />
        </div>
        <div className={styles.media}>
          <Image src="/homepage/birmarket/new-catalog.png" width={864} height={1236} alt="Birmarket new catalog mobile concept" sizes="(max-width: 1079px) calc(100vw - 48px), 576px" />
        </div>
        <div className={styles.media}>
          <Image src="/homepage/birmarket/listing.png" width={864} height={1236} alt="Birmarket listing with context-aware product cards" sizes="(max-width: 1079px) calc(100vw - 48px), 576px" />
        </div>
        <div className={styles.checkoutRow}>
          <div className={`${styles.media} ${styles.checkoutVideo}`}>
            <video
              src="/homepage/birmarket/checkout-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Birmarket checkout flow demonstration"
            />
          </div>
          <div className={`${styles.media} ${styles.checkoutDetails}`}>
            <Image
              src="/homepage/birmarket/checkout-details.png"
              width={863}
              height={1020}
              alt="Birmarket cart snippets showing three product cards"
              sizes="(max-width: 1079px) calc(100vw - 48px), 576px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
