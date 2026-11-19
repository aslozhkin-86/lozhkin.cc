import Image from "next/image";

import { ProjectPreviewVideo } from "./ProjectPreviewVideo";
import { BirmarketVision } from "../BirmarketVision/BirmarketVision";
import { BirmarketFeature } from "../BirmarketFeature/BirmarketFeature";
import { BirmarketAudit } from "../BirmarketAudit/BirmarketAudit";
import { StoreProof } from "../StoreProof/StoreProof";
import { YandexDeliveryVideo } from "./YandexDeliveryVideo";
import { YandexJourney } from "./YandexJourney";
import styles from "./ProjectList.module.css";

export function ProjectList() {
  return (
    <section className={styles.section} aria-label="Featured projects">
      <div className={styles.projects}>
        <BirmarketVision />
        <BirmarketFeature />
        <BirmarketAudit />
        <div className={styles.projectItems}>
          <div className={styles.content}>
            <article className={styles.project} id="m10">
              <div className={styles.projectInfo}>
                <h2 className={styles.projectTitle}>Digital wallet m10</h2>
                <p className={styles.description}>I led m10’s design from day one, shaping its core flows, design system and visual language. The wallet reached 700K monthly active users in 18 months and later grew to 2M registered users.</p>
                <a className={styles.projectLink} href="/projects/m10">About the project</a>
              </div>
              <StoreProof
                ariaLabel="m10 store recognition and ratings"
                variant="homepage"
                awardSrc="/projects/m10/app-store-award.svg"
                awardWidth={131}
                rank={{ value: "#1", text: "Finance Appstore & Google Play" }}
                ratings={[{ value: "4.9", store: "App Store" }, { value: "4.6", store: "Google Play" }]}
              />
              <div className={styles.m10MediaGrid}>
                <div className={styles.projectMedia}>
                  <ProjectPreviewVideo />
                </div>
                <div className={styles.projectMedia}>
                  <Image
                    alt="Illustration of a hand holding m10 banknotes"
                    className={styles.projectImage}
                    draggable={false}
                    height={1224}
                    sizes="(max-width: 1079px) calc(100vw - 48px), 576px"
                    src="/homepage/m10/money.png"
                    width={1152}
                  />
                </div>
              </div>
            </article>

            <article className={styles.project} id="yandex-market">
              <div className={styles.projectInfo}>
                <h2 className={styles.projectTitle}>Yandex Market</h2>
                <p className={styles.description}>I led the end-to-end purchase experience, from cart and checkout through delivery, tracking and returns. I created shared patterns that helped more than 10 product teams keep the journey consistent.</p>
              </div>
              <StoreProof
                ariaLabel="Yandex Market store recognition and ratings"
                variant="homepage"
                awardSrc="/projects/m10/app-store-award.svg"
                awardWidth={131}
                ratings={[{ value: "4.9", store: "App Store" }, { value: "4.4", store: "Google Play" }]}
              />
              <div className={styles.yandexContent}>
                <div className={styles.yandexTeaser}>
                  <Image alt="Yandex Market cart designs on desktop and mobile" className={styles.projectImage} src="/homepage/yandex/teaser.png" width={1740} height={1110} sizes="(max-width: 1079px) calc(100vw - 48px), 1160px" />
                </div>
                <YandexJourney />
                <YandexDeliveryVideo />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
