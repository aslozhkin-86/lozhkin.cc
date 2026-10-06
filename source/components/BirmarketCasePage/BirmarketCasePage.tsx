import { ProjectCaseCard } from "../ProjectCaseCard/ProjectCaseCard";
import { ProjectCasePage } from "../ProjectCasePage/ProjectCasePage";
import styles from "../ProjectCasePage/ProjectCasePage.module.css";

const caseCards = [
  { id: "vision", title: "Marketplace Vision 2027", category: "Product vision" },
  { id: "breaking-the-inertia", title: "Breaking the inertia: turning scattered effort into visible change", category: "Product strategy" },
] as const;

export function BirmarketCasePage() {
  return (
    <ProjectCasePage
      cards={caseCards.map((card) => (
        <ProjectCaseCard
          alt={card.id === "vision" ? "Birmarket Vision 2027 mobile marketplace concept" : "Green What if? sticky note among pink notes"}
          category={card.category}
          className={styles.projectCard}
          height={card.id === "vision" ? 1132 : 540}
          image={card.id === "vision" ? "/projects/birmarket/vision-2027.png" : "/projects/birmarket/shake_birmarket.png"}
          id={card.id}
          key={card.id}
          size="large"
          title={card.title}
          width={card.id === "vision" ? 1744 : 960}
        />
      ))}
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
