import { ApproachStatement } from "@/components/ApproachStatement";
import { CompanyHistory } from "@/components/CompanyHistory";
import { OtherProjects } from "@/components/OtherProjects";
import { PortfolioFooter } from "@/components/PortfolioFooter";
import { ProjectList } from "@/components/ProjectList";
import { SpeakingSection } from "@/components/SpeakingSection";
import { WhiteboardHeader } from "@/components/WhiteboardHeader";

export default function Home() {
  return (
    <>
      <main>
        <WhiteboardHeader />
        <CompanyHistory />
        <ProjectList />
        <SpeakingSection />
        <ApproachStatement />
        <OtherProjects />
      </main>
      <PortfolioFooter />
    </>
  );
}
