import Image from "next/image";

import { DotParallax } from "../../app/DotParallax";
import { M10CaseMotion } from "../ProjectCasePage/M10CaseMotion";
import { ProjectHero } from "../ProjectHero/ProjectHero";
import { featuredProjectMedia } from "../../data/featuredProjectMedia";
import { ProjectStoryCard } from "../ProjectStoryCard/ProjectStoryCard";
import styles from "./M10CasePage.module.css";

const achievements = [
  "Built and led a design org of 16: product designers, UX researchers, graphic designers and UX writer.",
  "Bridged product, brand, and content design teams: built shared processes, consistent UX and positioning across all touchpoints.",
  "Led rebranding for both company products.",
  "Helped grow m10 from launch to 700K monthly active users in 18 months, making it Azerbaijan’s third most popular financial app by MAU.",
];

const results = [
  "Shaped the bill payment experience, contributing to 37% more bill payments, 7% higher activation, and 12% more highly engaged users.",
  "Refreshed the brand’s visual language, improving advertising effectiveness by 22%.",
  "Led cross-functional growth initiatives that doubled user activation from 22% to 48%.",
  "Initiated a program to fix recurring customer problems. In three months, support requests fell 43% and activation rose 17%.",
];

const mentions = [
  {
    title: "Best New E-Wallet Payment Platform — Azerbaijan 2024",
    source: "Global Business Outlook",
    href: "https://pashapay.az/news/m10_best_wallet_2024",
  },
  {
    title: "Digital Transformation of Payment Services Azerbaijan 2024",
    source: "Pan Finance",
    href: "https://panfinance.net/winners/",
  },
  {
    title: "Excellence in Digital Payments",
    source: "FIBA 2025",
    href: "https://pashapay.az/news/eng/six-fold-value-growth",
  },
] as const;

const caseStudies = [
  {
    id: "design-strategy",
    category: "Design strategy",
    title: "Simplicity as a solution",
    description: "How we turned resource scarcity into a strategy that helped us build a market-recognised application.",
    image: "/projects/m10/design-strategy.png",
    alt: "m10 payment confirmation on a phone against a turquoise background",
  },
  {
    id: "digital-card",
    category: "Behance case",
    title: "Card that gives you nothing but fun",
    description: "No cashback. No big rewards. Just convenience and a little fun.",
    image: "/projects/m10/digital-card-case.png",
    alt: "Playful m10 digital card displayed in the wallet app",
  },
  {
    id: "brand-refresh",
    category: "Brand",
    title: "A unified product brand",
    description: "Visual Brand Refresh and the Creation of a Unified Product Brand System.",
    image: "/projects/m10/brand-update.png",
    alt: "Refreshed m10 logo on a dark app icon",
  },
  {
    id: "love-to-pay",
    category: "Design management",
    title: "Customer-critical projects",
    description: "How I Secured Dedicated Engineering Resources for Customer-Critical Projects — and Cut Call Center Contacts by 46%.",
    image: "/projects/m10/love-to-pay.png",
    alt: "Effort and value prioritization matrix for customer projects",
  },
] as const;

function StatementGroup({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <section className={styles.overviewGroup} data-m10-reveal>
      <h3 className={styles.label}>{label}</h3>
      <ul className={styles.statementList}>
        {items.map((item) => <li key={item}>— {item}</li>)}
      </ul>
    </section>
  );
}

export function M10CasePage() {
  return (
    <article className={styles.page} data-m10-page>
      <DotParallax />
      <M10CaseMotion />

      <ProjectHero
        title="Digital wallet m10"
        image={featuredProjectMedia.m10.src}
        imageAlt={featuredProjectMedia.m10.alt}
        returnHref="/#m10"
        returnLabel="Back to projects"
      >
          <div className={styles.storeProof} aria-label="m10 recognition and store ratings">
            <span className={styles.appAward} aria-label="App of the day on the App Store">
              <Image alt="" src="/projects/m10/app-store-award.svg" width={131} height={48} />
            </span>
            <span className={styles.rankProof}>
              <span className={styles.proofBadge}>#1</span>
              <span>Fintech Appstore &amp; Google Play</span>
            </span>
            <div className={styles.storeRatings}>
              <a className={styles.ratingProof} href="https://apps.apple.com/az/app/m10-digital-wallet/id1642308007?platform=iphone&amp;see-all=reviews" target="_blank" rel="noreferrer">
                <span className={styles.proofBadge}>4.9</span><span>App Store</span>
              </a>
              <a className={styles.ratingProof} href="https://play.google.com/store/apps/details?id=com.m10" target="_blank" rel="noreferrer">
                <span className={styles.proofBadge}>4.6</span><span>Google Play</span>
              </a>
            </div>
          </div>
      </ProjectHero>

      <main className={styles.main}>
        <section className={styles.overview} aria-labelledby="m10-role">
          <div className={styles.overviewHeading}>
            <h2 className={styles.overviewTitle} id="m10-role">Head of design</h2>
            <span className={styles.overviewDate}>2022–2025</span>
          </div>
          <div className={styles.overviewColumns}>
            <StatementGroup label="Achievements" items={achievements} />
            <StatementGroup label="Measurable results" items={results} />
            <section className={styles.overviewGroup} data-m10-reveal>
              <h3 className={styles.label}>Mentions</h3>
              <ul className={styles.mentions}>
                {mentions.map((mention) => (
                  <li key={mention.title}>
                    <strong>{mention.title}</strong>
                    <a href={mention.href} target="_blank" rel="noreferrer">{mention.source}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className={styles.relatedCases} aria-label="m10 case studies">
          {caseStudies.map((study) => (
            <ProjectStoryCard key={study.id} {...study} imageWidth={960} imageHeight={540} reveal />
          ))}
        </section>
      </main>

      <footer className={styles.footer}>© Lozhkin</footer>
    </article>
  );
}
