import Image from "next/image";
import type { ReactNode } from "react";
import { PageCloseLink } from "../PageCloseLink/PageCloseLink";

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
  children?: ReactNode;
};

export function CaseStudyPage({ title, image, alt, returnHref, returnLabel = "Back to m10 projects", company, imageWidth = 960, imageHeight = 540, imageAspect = "cropped", children }: CaseStudyPageProps) {
  return (
    <main className={styles.page}>
      <article className={styles.panel} data-layout={children ? "article" : "hero"}>
        <PageCloseLink label={returnLabel} className={styles.close} href={returnHref} />
        <div className={styles.hero}>
          <div>
            {company && <p className={styles.company}>{company}</p>}
            <h1 className={styles.title}>{title}</h1>
          </div>
          {image ? <Image alt={alt} className={styles.heroImage} data-image-aspect={imageAspect} src={image} width={imageWidth} height={imageHeight} sizes="(max-width: 760px) calc(100vw - 64px), 46vw" priority /> : <CaseStudyImagePlaceholder label={alt} />}
        </div>
        {children && <div className={styles.articleBody}>{children}</div>}
      </article>
      {children && <p className={styles.copyright}>© Alexander Lozhkin</p>}
    </main>
  );
}

export function CaseStudyImagePlaceholder({ label }: { label: string }) {
  return <div className={styles.imagePlaceholder} role="img" aria-label={label} />;
}
