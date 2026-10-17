import { ProjectCaseCard } from "../ProjectCaseCard/ProjectCaseCard";
import { ProjectCasePage } from "../ProjectCasePage/ProjectCasePage";
import styles from "../ProjectCasePage/ProjectCasePage.module.css";

const caseCards = [
  { id: "breaking-the-inertia", title: "How we got a company moving and changed how it builds products", category: "Product strategy" },
  { id: "vision", title: "Marketplace Vision 2027", category: "Product vision" },
] as const;

export function BirmarketCasePage() {
  return (
    <ProjectCasePage
      cards={caseCards.map((card) => {
        const props = {
          alt: card.id === "vision" ? "Birmarket Vision 2027 mobile marketplace concept" : "Hand-drawn marketplace wireframes beside a pink highlighter",
          category: card.category,
          className: styles.projectCard,
          height: card.id === "vision" ? 1132 : 804,
          image: card.id === "vision" ? "/projects/birmarket/vision-2027.png" : "/projects/birmarket/inertia/hero-preview.png",
          id: card.id,
          size: "large" as const,
          title: card.title,
          width: card.id === "vision" ? 1744 : 1440,
        };
        return <ProjectCaseCard {...props} href={card.id === "breaking-the-inertia" ? "/projects/birmarket/breaking-the-inertia" : undefined} key={card.id} />;
      })}
      cardsLabel="Birmarket case studies"
      returnHref="/#birmarket"
      title="Birmarket marketplace"
      year="2025–2026"
    >
      <section className={styles.textSection} aria-labelledby="birmarket-role">
        <h2 id="birmarket-role">Head of design</h2>
        <ul className={styles.outcomeList}>
          <li>Led product design and UX research across buyer, seller, and logistics for a marketplace with 1.5M monthly active users, managing 7 designers and 2 researchers.</li>
          <li>Reshaped the design function during a company turnaround and brought the teams together around shared product priorities.</li>
          <li>Led customer-journey research using analytics, interviews, and usability tests. Presented the findings to leadership and helped refocus the backlog on the biggest user pain points.</li>
          <li>Developed Marketplace Vision 2027 and secured leadership buy-in, giving the buyer, seller, and logistics teams a shared direction.</li>
        </ul>
      </section>

      <section className={styles.textSection} aria-labelledby="birmarket-results">
        <h2 id="birmarket-results">Project results</h2>
        <p>I’d be happy to share selected results and discuss the impact of this work in a conversation.</p>
      </section>
    </ProjectCasePage>
  );
}
