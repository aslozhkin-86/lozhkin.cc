import Image from "next/image";

import { featuredProjectMedia } from "../../data/featuredProjectMedia";
import styles from "./ProjectList.module.css";

const projects = [
  {
    id: "birmarket",
    title: "Birmarket",
    description:
      "Design audit, unit economics, brand update and a mobile app visual concept for a marketplace in Azerbaijan",
    href: "/projects/birmarket",
    media: featuredProjectMedia.birmarket,
    tone: "light",
  },
  {
    id: "m10",
    title: "Digital wallet m10",
    description:
      "Helped launch m10 and scale it to 700K monthly active users and 2M registered users",
    href: "/projects/m10",
    media: featuredProjectMedia.m10,
    tone: "dark",
  },
  {
    id: "yandex-market",
    title: "Yandex Market",
    description:
      "Redesigned the shopping experience, from cart and checkout to delivery and post-purchase",
    href: null,
    media: {
      src: "/projects/whiteboard/yandex-market-teaser.png",
      alt: "Yandex Market cart design on a phone",
    },
    tone: "pending",
  },
] as const;

export function ProjectList() {
  return (
    <section className={styles.section} aria-labelledby="projects-title">
      <div className={styles.content}>
        <h2 className={styles.heading} id="projects-title">
          And here a few cases
        </h2>

        <div className={styles.projects}>
          {projects.map((project) => {
            const cardContent = (
              <>
                <Image
                  alt={project.media.alt}
                  className={styles.projectImage}
                  draggable={false}
                  height={project.id === "yandex-market" ? 1371 : 1920}
                  sizes="(max-width: 1079px) min(712px, calc(100vw - 48px)), (max-width: 1440px) calc(100vw - 160px), 1160px"
                  src={project.media.src}
                  width={project.id === "yandex-market" ? 1448 : 2880}
                />
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <span className={styles.readButton}>{project.href ? "Read" : "Case in progress"}</span>
                </div>
              </>
            );

            return (
              <article className={styles.project} data-tone={project.tone} id={project.id} key={project.id}>
                {project.href ? (
                  <a className={styles.projectLink} href={project.href} aria-label={`Read about ${project.title}`}>
                    {cardContent}
                  </a>
                ) : (
                  <div className={styles.projectLink}>{cardContent}</div>
                )}
              </article>
            );
          })}
        </div>

        <a className={styles.moreProjects} href="#other-projects">
          Show other projects
        </a>
      </div>
    </section>
  );
}
