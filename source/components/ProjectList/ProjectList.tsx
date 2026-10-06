import Image from "next/image";

import styles from "./ProjectList.module.css";

const projects = [
  {
    description:
      "Design strategy, brand update and a mobile app visual concept for a marketplace in Azerbaijan",
    height: 914,
    href: "/projects/birmarket",
    id: "birmarket",
    src: "/projects/whiteboard/bm-teaser.png",
    mobileSrc: "/projects/whiteboard/m10-teaser-mobile-1.png",
    width: 965,
  },
  {
    description:
      "Helped launch m10 and scale it to 700K monthly active users and 2M registered users",
    height: 914,
    href: "/projects/m10",
    id: "m10",
    src: "/projects/whiteboard/m10-teaser.png",
    mobileSrc: "/projects/whiteboard/m10-teaser-mobile.png",
    width: 965,
  },
  {
    description:
      "Redesigned the Yandex Market shopping experience, from cart and checkout to delivery and post-purchase",
    height: 914,
    href: null,
    id: "yandex-market",
    src: "/projects/whiteboard/yandex-market-teaser.png",
    mobileSrc: "/projects/whiteboard/yandex-market-teaser-mobile.png",
    width: 965,
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
            const teaser = (
              <picture>
                <source
                  media="(max-width: 800px)"
                  srcSet={project.mobileSrc}
                  width={930}
                  height={930}
                />
                <Image
                  alt={`${project.id} project teaser`}
                  className={styles.teaser}
                  data-project-teaser={project.id}
                  draggable={false}
                  height={project.height}
                  sizes="(max-width: 800px) min(560px, calc(100vw - 32px)), (max-width: 1000px) calc(100vw - 380px), 560px"
                  src={project.src}
                  width={project.width}
                />
              </picture>
            );

            return (
              <article className={styles.project} id={project.id} key={project.id}>
                {project.href ? (
                  <a className={styles.caseLink} href={project.href} aria-label={`Open ${project.id} case study`}>
                    {teaser}
                  </a>
                ) : teaser}

                <div className={styles.details}>
                  <p>{project.description}</p>
                  {project.href ? (
                    <a className={styles.caseLink} href={project.href}>Read the case</a>
                  ) : (
                    <p className={styles.status}>Case in progress</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <a className={styles.moreProjects} href="#other-projects">
          <span>Show other projects</span>
          <Image
            alt=""
            className={styles.moreUnderline}
            draggable={false}
            height={12}
            src="/projects/whiteboard/show-other.svg"
            width={197}
          />
        </a>
      </div>

    </section>
  );
}
