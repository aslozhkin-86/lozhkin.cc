import Image from "next/image";

import styles from "./OtherProjects.module.css";

const projects = [
  {
    id: "dolfin-portfolio",
    title: "Dolfin — Wealth Management Platform",
    description: "A white-label wealth management platform for the UK market, bringing together portfolio management, CRM, compliance, e-signatures, and financial reporting under MiFID II",
    image: "/projects/other/dolfin-portfolio.png",
    alt: "Dolfin portfolio management interface on a laptop and phone",
    height: 692,
  },
  {
    id: "dolfin-crm",
    title: "Dolfin — Advisor CRM",
    description: "A CRM for UK financial advisors, covering client onboarding, investment accounts, transactions, and annual reporting",
    image: "/projects/other/dolfin-crm.png",
    alt: "Dolfin advisor CRM showing a client account and transactions",
    height: 622,
  },
  {
    id: "bright-view",
    title: "Bright View — Cluster Management",
    description: "A web interface for deploying and managing HPC clusters, redesigned from a complex desktop product and tested with users",
    image: "/projects/other/bright-view.png",
    alt: "Bright View web interface for managing cluster nodes",
    height: 564,
  },
  {
    id: "bright-view-data",
    title: "Bright View — Monitoring",
    description: "Configurable dashboards for exploring cluster performance data and keeping key metrics in view",
    image: "/projects/other/bright-view-data.png",
    alt: "Bright View monitoring dashboard with performance charts",
    height: 622,
  },
  {
    id: "yandex-maps",
    title: "Yandex Maps — Community Editor",
    description: "A crowdsourced map editor where people improve Yandex Maps. I redesigned tools for editing roads, places, and other map data",
    image: "/projects/other/yandex-maps.png",
    alt: "Yandex Maps community editor with road editing tools",
    height: 622,
  },
  {
    id: "dota",
    title: "Dota 2 Twitch Extension",
    description: "An interactive overlay for Dota 2 tournaments that brings live match stats and team comparisons into the stream",
    image: "/projects/other/dota.png",
    alt: "Dota 2 Twitch extension showing team gold and player statistics",
    height: 842,
  },
] as const;

export function OtherProjects() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="other-projects-title">
      <div className={styles.content}>
        <h2 className={styles.heading} id="other-projects-title">
          A few projects from earlier days
        </h2>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article className={styles.project} id={project.id} key={project.id}>
              <Image
                alt={project.alt}
                className={styles.preview}
                draggable={false}
                height={project.height}
                sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 999px) calc(45vw - 12px), (max-width: 1279px) calc(45vw - 20px), 556px"
                src={project.image}
                width={1112}
              />
              <div className={styles.copy}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
