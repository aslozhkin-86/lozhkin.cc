import Image from "next/image";

import { ProjectCaseCard } from "../ProjectCaseCard/ProjectCaseCard";
import { ProjectCasePage } from "../ProjectCasePage/ProjectCasePage";
import styles from "../ProjectCasePage/ProjectCasePage.module.css";

const caseCards = [
  {
    id: "design-strategy",
    title: "Simplicity as a Strategy: Turning Limited Resources into a Market-Recognised Product",
    category: "Design strategy",
    image: "/projects/m10/design-strategy.png",
    alt: "m10 payment confirmation on a phone against a turquoise background",
  },
  {
    id: "digital-card",
    title: "Card that gives you nothing but fun",
    category: "Digital card",
    image: "/projects/m10/digital-card-case.png",
    alt: "Playful m10 digital card displayed in the wallet app",
  },
  {
    id: "brand-refresh",
    title: "Visual Brand Refresh and the Creation of a Unified Product Brand System",
    category: "Brand",
    image: "/projects/m10/brand-update.png",
    alt: "Refreshed m10 logo on a dark app icon",
  },
  {
    id: "love-to-pay",
    title: "How I Secured Dedicated Engineering Resources for Customer-Critical Projects — and Cut Call Center Contacts by 46%",
    category: "Love to Pay",
    image: "/projects/m10/love-to-pay.png",
    alt: "Effort and value prioritization matrix for customer projects",
  },
] as const;

const mentions = [
  {
    title: "Best New E-Wallet Payment Platform — Azerbaijan 2024",
    source: "Global Business Outlook · m10",
    href: "https://pashapay.az/news/m10_best_wallet_2024",
  },
  {
    title: "Digital Transformation of Payment Services — Azerbaijan 2024",
    source: "Pan Finance · PashaPay",
    href: "https://panfinance.net/winners/",
  },
  {
    title: "Excellence in Digital Payments",
    source: "FIBA 2025 · PashaPay",
    href: "https://pashapay.az/news/eng/six-fold-value-growth",
  },
] as const;

export function M10CasePage() {
  return (
    <ProjectCasePage
      cards={caseCards.map((card) => (
        <ProjectCaseCard
          alt={card.alt}
          category={card.category}
          className={styles.projectCard}
          id={card.id === "design-strategy" ? "design-strategy" : undefined}
          height={540}
          image={card.image}
          key={card.id}
          size="large"
          title={card.title}
          width={960}
        />
      ))}
      cardsLabel="m10 case studies"
      proof={
        <div className={styles.proofList} aria-label="m10 recognition and store ratings">
          <span className={styles.proofAward} aria-label="App of the Day on the App Store">
            <Image alt="" src="/projects/m10/app-store-award.svg" width={131} height={48} />
          </span>
          <span className={styles.mobileProofBreak} aria-hidden="true" />
          <span className={styles.proofItem}>
            <span className={styles.proofBadge}>#1</span>
            <span>Finance · App Store &amp; Google Play</span>
          </span>
          <a className={styles.proofItem} href="https://apps.apple.com/az/app/m10-digital-wallet/id1642308007?platform=iphone&amp;see-all=reviews" target="_blank" rel="noreferrer">
            <span className={styles.proofBadge}>4.9</span>
            <span>App Store</span>
          </a>
          <a className={styles.proofItem} href="https://play.google.com/store/apps/details?id=com.m10" target="_blank" rel="noreferrer">
            <span className={styles.proofBadge}>4.5</span>
            <span>Google Play</span>
          </a>
          <span className={styles.proofDate}>Ratings checked October 2026</span>
        </div>
      }
      returnHref="/#m10"
      title="Digital wallet m10"
      year="2022–2025"
    >
      <section className={styles.textSection} aria-labelledby="m10-role">
        <h2 id="m10-role">Head of design</h2>
        <ul className={styles.outcomeList}>
          <li>Built and led a 16-person design organization spanning product design, research, graphic design, and UX writing.</li>
          <li>Brought product, brand, and content teams together around shared processes and a consistent experience.</li>
          <li>Led visual refreshes for m10 and MilliÖn.</li>
          <li>Helped grow m10 from launch to 700K monthly active users in 18 months, making it Azerbaijan’s third-largest financial app by MAU.</li>
        </ul>
      </section>

      <section className={styles.textSection} aria-labelledby="m10-results">
        <h2 id="m10-results">Tracked results</h2>
        <ul className={styles.outcomeList}>
          <li>Shaped bill payments, contributing to 37% more payments, 7% higher activation, and 12% more highly engaged users.</li>
          <li>Refreshed the brand’s visual language, improving advertising effectiveness by 22%.</li>
          <li>Led cross-functional growth work that raised activation from 22% to 48%.</li>
          <li>Started a program to fix recurring customer problems. In three months, support requests fell 43% and activation rose 17%.</li>
        </ul>
      </section>

      <section className={styles.textSection} aria-labelledby="m10-mentions">
        <h2 id="m10-mentions">Mentions</h2>
        <ul className={styles.mentions}>
          {mentions.map((mention) => (
            <li key={mention.title}>
              <a href={mention.href} target="_blank" rel="noreferrer">{mention.title}</a>
              <small>{mention.source}</small>
            </li>
          ))}
        </ul>
      </section>
    </ProjectCasePage>
  );
}
