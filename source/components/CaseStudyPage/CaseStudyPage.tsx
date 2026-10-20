import Image from "next/image";
import type { ReactNode } from "react";
import { DotParallax } from "../../app/DotParallax";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";
import { PageCopyright } from "../PageCopyright/PageCopyright";
import { ProjectHero } from "../ProjectHero/ProjectHero";
import { M10CaseMotion } from "../ProjectCasePage/M10CaseMotion";
import { CaseArticleReveal } from "./CaseArticleReveal";

import styles from "./CaseStudyPage.module.css";

type CaseStudyPageProps = {
  title: string;
  image?: string;
  alt: string;
  returnHref: string;
  returnLabel?: string;
  company?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAspect?: "cropped" | "original";
  articleVariant?: "editorial";
  readingTime?: string;
  children?: ReactNode;
};

export function CaseStudyPage({ title, image, alt, returnHref, returnLabel = "Back to m10 projects", company, imageWidth = 960, imageHeight = 540, imageAspect = "cropped", articleVariant, readingTime, children }: CaseStudyPageProps) {
  return (
    <main className={styles.page} data-article-variant={articleVariant} data-m10-page={articleVariant === "editorial" ? "" : undefined}>
      {articleVariant === "editorial" && <DotParallax />}
      {articleVariant === "editorial" && <M10CaseMotion />}
      <article className={styles.panel} data-layout={children ? "article" : "hero"} data-article-variant={articleVariant}>
        {articleVariant !== "editorial" && <PageCloseLink label={returnLabel} className={styles.close} href={returnHref} />}
        {articleVariant === "editorial" && image ? (
          <ProjectHero title={title} image={image} imageAlt={alt} returnHref={returnHref} returnLabel={returnLabel}>
            {readingTime && <p className={styles.markerMeta}><Image src="/projects/shared/reading-time-watch.svg" alt="" width={20} height={20} />{readingTime}</p>}
          </ProjectHero>
        ) : (
          <div className={styles.hero}>
            <div>
              {company && <p className={styles.company}>{company}</p>}
              <h1 className={styles.title}>{title}</h1>
            </div>
            {image ? <Image alt={alt} className={styles.heroImage} data-image-aspect={imageAspect} src={image} width={imageWidth} height={imageHeight} sizes="(max-width: 1079px) calc(100vw - 64px), 46vw" priority /> : <CaseStudyImagePlaceholder label={alt} />}
          </div>
        )}
        {children && (articleVariant === "editorial"
          ? <CaseArticleReveal className={styles.articleBody}>{children}</CaseArticleReveal>
          : <div className={styles.articleBody}>{children}</div>)}
      </article>
      <PageCopyright />
    </main>
  );
}

export function CaseStudyImagePlaceholder({ label }: { label: string }) {
  return <div className={styles.imagePlaceholder} role="img" aria-label={label} />;
}
