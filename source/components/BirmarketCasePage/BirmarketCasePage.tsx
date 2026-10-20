import Image from "next/image";

import { DotParallax } from "../../app/DotParallax";
import { M10CaseMotion } from "../ProjectCasePage/M10CaseMotion";
import { ProjectHero } from "../ProjectHero/ProjectHero";
import { ProjectStoryCard } from "../ProjectStoryCard/ProjectStoryCard";
import { birmarketCaseMedia, featuredProjectMedia } from "../../data/featuredProjectMedia";
import styles from "../M10CasePage/M10CasePage.module.css";
import birmarketStyles from "./BirmarketCasePage.module.css";

const achievements = [
  "Led product design and UX research across buyer, seller, and logistics for a marketplace with 1.5M monthly active users, managing 7 designers and 2 researchers.",
  "Reshaped the design function during a company turnaround and brought the teams together around shared product priorities.",
  "Led customer-journey research using analytics, interviews, and usability tests. Presented the findings to leadership and helped refocus the backlog on the biggest user pain points.",
  "Developed Marketplace Vision 2027 and secured leadership buy-in, giving the buyer, seller, and logistics teams a shared direction.",
];

const caseStudies = [
  {
    id: "breaking-the-inertia",
    category: "Product strategy",
    title: "How design sped up company transformation",
    description: "A focused discovery and design sprint that helped the team align on a staged marketplace redesign.",
    image: birmarketCaseMedia.src,
    alt: birmarketCaseMedia.alt,
    width: 2880,
    height: 1920,
    href: "/projects/birmarket/breaking-the-inertia",
  },
  {
    id: "vision",
    category: "Product vision",
    title: "Marketplace Vision 2027",
    description: "A shared direction for buyer, seller, and logistics experiences.",
    image: "/projects/birmarket/vision-2027.png",
    alt: "Birmarket Vision 2027 mobile marketplace concept",
    width: 1744,
    height: 1132,
    href: null,
  },
] as const;

export function BirmarketCasePage() {
  return (
    <article className={`${styles.page} ${birmarketStyles.page}`} data-m10-page>
      <DotParallax />
      <M10CaseMotion />

      <ProjectHero
        title="Birmarket marketplace"
        image={featuredProjectMedia.birmarket.src}
        imageAlt={featuredProjectMedia.birmarket.alt}
        returnHref="/#birmarket"
        returnLabel="Back to projects"
        imageClassName={birmarketStyles.heroImage}
        foreground="dark"
        hideTitle
      />

      <main className={styles.main}>
        <section className={styles.overview} aria-labelledby="birmarket-role">
          <div className={styles.overviewHeading}>
            <h2 className={styles.overviewTitle} id="birmarket-role">Birmarket, Head of design</h2>
            <span className={styles.overviewDate}>2026</span>
          </div>
          <div className={styles.overviewColumns}>
            <section className={styles.overviewGroup} data-m10-reveal>
              <h3 className={styles.label}>Achievements</h3>
              <ul className={styles.statementList}>
                {achievements.map((achievement) => <li key={achievement}>— {achievement}</li>)}
              </ul>
            </section>
            <section className={styles.overviewGroup} data-m10-reveal>
              <h3 className={styles.label}>Project results</h3>
              <p className={birmarketStyles.resultNote}>I’d be happy to share selected results and discuss the impact of this work in a conversation.</p>
            </section>
            <div className={birmarketStyles.stickerColumn}>
              <Image src="/projects/birmarket/sticker.png" alt="Birmarket is an Azerbaijani marketplace with around 1.5M monthly active users" width={531} height={514} sizes="(max-width: 1079px) 260px, 320px" />
            </div>
          </div>
        </section>

        <section className={styles.relatedCases} aria-label="Birmarket case studies">
          {caseStudies.map((study) => (
            <ProjectStoryCard
              key={study.id}
              id={study.id}
              category={study.category}
              title={study.title}
              description={study.description}
              image={study.image}
              alt={study.alt}
              imageWidth={study.width}
              imageHeight={study.height}
              href={study.href}
              disabledLabel={!study.href ? "soon" : undefined}
              reveal
              fadeTitleOnHover={Boolean(study.href)}
            />
          ))}
        </section>
      </main>

      <footer className={styles.footer}>© Alexander Lozhkin</footer>
    </article>
  );
}
