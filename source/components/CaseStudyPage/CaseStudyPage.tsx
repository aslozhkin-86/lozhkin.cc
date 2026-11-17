import Image from "next/image";
import type { ReactNode } from "react";
import { DotParallax } from "../../app/DotParallax";
import { PageCopyright } from "../PageCopyright/PageCopyright";
import { ProjectHero } from "../ProjectHero/ProjectHero";
import { M10CaseMotion } from "../M10CaseMotion/M10CaseMotion";
import { CaseArticleReveal } from "./CaseArticleReveal";

import styles from "./CaseStudyPage.module.css";

type CaseStudyPageProps = {
  title: string;
  image: string;
  alt: string;
  returnHref: string;
  returnLabel?: string;
  backToPrevious?: boolean;
  readingTime?: string;
  children?: ReactNode;
};

export function CaseStudyPage({ title, image, alt, returnHref, returnLabel = "Back to m10 projects", backToPrevious, readingTime, children }: CaseStudyPageProps) {
  return (
    <main className={styles.page} data-m10-page="">
      <DotParallax />
      <M10CaseMotion />
      <article className={styles.panel}>
        <ProjectHero title={title} image={image} imageAlt={alt} returnHref={returnHref} returnLabel={returnLabel} backToPrevious={backToPrevious}>
          {readingTime && <p className={styles.markerMeta}><Image src="/projects/shared/reading-time-watch.svg" alt="" width={20} height={20} />{readingTime}</p>}
        </ProjectHero>
        {children && <CaseArticleReveal className={styles.articleBody}>{children}</CaseArticleReveal>}
      </article>
      <PageCopyright />
    </main>
  );
}
