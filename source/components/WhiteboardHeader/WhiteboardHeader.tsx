import { GazePortrait } from "./GazePortrait";
import styles from "./WhiteboardHeader.module.css";

export function WhiteboardHeader() {
  return (
    <header className={styles.hero} aria-label="Introduction">
      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="/contact">Contact</a>
        <a href="https://www.linkedin.com/in/alexanderlozhkin/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className={styles.agentsLink} href="/work">For agents</a>
        <span className={styles.location}>Georgia <span className={styles.timezone}>GMT +4</span></span>
      </nav>
      <div className={styles.introduction}>
        <GazePortrait />
        <div className={styles.introCopy}>
          <h1>Hi! I am Alex,<br />product design lead</h1>
          <p>I create products and scale them through design systems and teams that strengthen the business</p>
        </div>
      </div>
      <div className={styles.experience} aria-label="Experience">
        <p>15 years in design</p>
        <p>6 years leading teams</p>
      </div>
    </header>
  );
}
