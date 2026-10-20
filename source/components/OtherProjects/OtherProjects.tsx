import { ProjectStoryCard } from "../ProjectStoryCard/ProjectStoryCard";
import { otherProjects } from "@/data/otherProjects";
import styles from "./OtherProjects.module.css";

export function OtherProjects() {
  return (
    <section className={styles.section} id="other-projects" aria-labelledby="other-projects-title">
      <div className={styles.content}>
        <h2 className={styles.heading} id="other-projects-title">A few projects from earlier days</h2>
        <div className={styles.grid}>
          {otherProjects.map((project) => (
            <ProjectStoryCard
              key={project.id}
              id={project.id}
              title={project.company}
              description={project.text}
              image={project.image}
              alt={project.alt}
              imageHeight={project.height}
              imageWidth={project.width}
              showRead={false}
              preserveImage={project.id !== "dota"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
