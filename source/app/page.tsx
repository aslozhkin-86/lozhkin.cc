import { CompanyHistory } from "@/components/CompanyHistory";
import { OtherProjects } from "@/components/OtherProjects";
import { PortfolioFooter } from "@/components/PortfolioFooter";
import { ProjectList } from "@/components/ProjectList";
import { SpeakingSection } from "@/components/SpeakingSection";
import { WhiteboardHeader } from "@/components/WhiteboardHeader";
import { HomepageHighlights } from "@/components/HomepageHighlights/HomepageHighlights";
import { DotParallax } from "./DotParallax";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home} data-portfolio-home>
      <DotParallax />
      <main>
        <WhiteboardHeader />
        <HomepageHighlights showScope={false} />
        <ProjectList />
        <CompanyHistory />
        <SpeakingSection />
        <OtherProjects />
      </main>
      <PortfolioFooter />
    </div>
  );
}
