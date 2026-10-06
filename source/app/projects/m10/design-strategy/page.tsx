import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/CaseStudyPage/CaseStudyPage";

const title = "Simplicity as a Strategy: Turning Limited Resources into a Market-Recognised Product";

export const metadata: Metadata = {
  title: "m10 design strategy — Alexander Lozhkin",
  description: title,
};

export default function DesignStrategyPage() {
  return <CaseStudyPage title={title} image="/projects/m10/digital-card-case.png" alt="Playful m10 digital card displayed in the wallet app" returnHref="/projects/m10#design-strategy" />;
}
