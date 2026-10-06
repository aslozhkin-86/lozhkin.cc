import { ProjectCaseCard } from "../ProjectCaseCard/ProjectCaseCard";
import { otherProjects } from "@/data/otherProjects";
import styles from "./OtherProjects.module.css";

export function OtherProjects() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="other-projects-title">
      <div className={styles.content}>
        <h2 className={styles.heading} id="other-projects-title">A few projects from earlier days</h2>
        <div className={styles.grid}>
          {otherProjects.map((project) => (
            <ProjectCaseCard
              key={project.id}
              id={project.id}
              company={project.company}
              title={project.text}
              image={project.image}
              alt={project.alt}
              height={project.height}
              width={1112}
              size="large"
              imageAspect="original"
              className={styles.project}
              showStatusIcon={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
