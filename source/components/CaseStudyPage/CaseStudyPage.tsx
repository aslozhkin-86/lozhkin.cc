import Image from "next/image";
import type { ReactNode } from "react";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";
import { PageCopyright } from "../PageCopyright/PageCopyright";
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
    <main className={styles.page} data-article-variant={articleVariant}>
      <article className={styles.panel} data-layout={children ? "article" : "hero"} data-article-variant={articleVariant}>
        <PageCloseLink label={returnLabel} className={styles.close} href={returnHref} />
        {articleVariant === "editorial" && image ? (
          <div className={styles.editorialHero}>
            <Image alt={alt} className={styles.editorialHeroImage} src={image} width={imageWidth} height={imageHeight} sizes="(max-width: 760px) 100vw, (max-width: 1288px) calc(100vw - 48px), 1240px" priority />
            <div className={styles.editorialHeroCaption}>
              <div className={styles.editorialHeroText}>
                <h1 className={styles.title}>{title}</h1>
                {readingTime && <p className={styles.markerMeta}>{readingTime}</p>}
                <span className={styles.editorialHeroDivider} aria-hidden="true" />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.hero}>
            <div>
              {company && <p className={styles.company}>{company}</p>}
              <h1 className={styles.title}>{title}</h1>
            </div>
            {image ? <Image alt={alt} className={styles.heroImage} data-image-aspect={imageAspect} src={image} width={imageWidth} height={imageHeight} sizes="(max-width: 760px) calc(100vw - 64px), 46vw" priority /> : <CaseStudyImagePlaceholder label={alt} />}
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
