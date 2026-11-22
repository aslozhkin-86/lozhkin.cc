import Image from "next/image";

import { HoverTiltIcon } from "@/components/HoverTiltIcon";

import styles from "./HomepageHighlights.module.css";

const strengths = [
  {
    title: "Creating a shared vision",
    description: "Turning user needs and business goals into a product direction teams can work toward",
    icon: "/homepage/highlights/vision-icon.png",
  },
  {
    title: "Scaling quality",
    description: "Establishing common principles and design systems that help teams create a cohesive product",
    icon: "/homepage/highlights/scaling-icon.png",
  },
  {
    title: "Proving the value of design",
    description: "Research and experiments improve not only the user experience but also measurable product outcomes",
    icon: "/homepage/highlights/prove-icon.png",
  },
  {
    title: "Building strong teams",
    description: "Identifying and developing people, building processes, and helping the business grow",
    icon: "/homepage/highlights/team-icon.png",
  },
] as const;

export function HomepageHighlights({ showScope = true }: { showScope?: boolean }) {
  return (
    <>
      <section className={styles.superpowers} aria-labelledby="superpowers-title">
        <div className={styles.strengthsInner}>
          <h2 className={styles.heading} id="superpowers-title">Superpowers</h2>
          <div className={styles.strengthsGrid}>
            {strengths.map((strength) => (
              <div className={styles.strength} key={strength.title}>
                <HoverTiltIcon src={strength.icon} label={strength.title} />
                <div className={styles.strengthCopy}>
                  <h3 className={styles.strengthTitle}>{strength.title}</h3>
                  <p className={styles.strengthDescription}>{strength.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showScope && (
        <section className={styles.scope} aria-labelledby="scope-title">
          <div className={styles.scopeIntro}>
            <h2 className={styles.heading} id="scope-title">Scope &amp; Scale</h2>
            <p className={styles.introduction}>For nearly four years in the Bir ecosystem, I led product, brand, and communication design alongside UX research. I built the teams, processes, and design systems that connected this work to product strategy and business decisions. I stayed hands-on in key projects, from leading design for m10’s launch to shaping Birmarket’s product vision.</p>
          </div>
          <div className={styles.scopeCards}>
            <article className={styles.scopeCard}>
              <p className={styles.cardCaption}>Birmarket’s brand refresh and<br />2027 marketplace vision</p>
              <div className={styles.cardMedia}>
                <Image className={styles.birmarketImage} src="/homepage/highlights/birmarket-scale.png" alt="Birmarket purple app launch screen with the refreshed logo" width={480} height={390} />
              </div>
            </article>
            <article className={styles.scopeCard}>
              <p className={styles.cardCaption}>Led design for the m10 launch, refreshed the branding, assembled a team, and established processes for PashaPay</p>
              <div className={styles.cardMedia}>
                <Image className={styles.pashapayImage} src="/homepage/highlights/m10-scale.png" alt="m10 payment confirmation screen" width={480} height={390} />
              </div>
            </article>
            <article className={styles.scopeCard}>
              <p className={styles.cardCaption}>Led design for the purchase experience at Yandex Market (30M+ monthly users)</p>
              <div className={styles.cardMedia}>
                <Image className={styles.marketImage} src="/homepage/highlights/market-scale.png" alt="Yandex Market purchase journey from cart and checkout to delivery, tracking, and order history" width={2056} height={536} />
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
}
