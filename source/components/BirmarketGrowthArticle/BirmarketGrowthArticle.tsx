import Image from "next/image";
import { CaseBigImage, CaseParagraph, CaseSmallImage, CaseTextImageBlock } from "../CaseArticleBlocks/CaseArticleBlocks";
import { CaseStudyPage } from "../CaseStudyPage/CaseStudyPage";

import styles from "./BirmarketGrowthArticle.module.css";

export const birmarketGrowthTitle = "How we got a company moving and changed how it builds products";

const asset = (name: string) => `/projects/birmarket/inertia/${name}.png`;

const images = {
  timeline: { src: asset("discovery-timeline"), alt: "Discovery, workshop, planning, and development timeline", width: 1200, height: 446 },
  audit: { src: asset("experience-audit"), alt: "Audit of Birmarket’s mobile shopping journey and field research", width: 2320, height: 1445 },
  sprint: { src: asset("design-sprint"), alt: "Shared design sprint workspace and product team", width: 2320, height: 1445 },
  research: { src: asset("prototype-research"), alt: "Proposed marketplace screens and user research", width: 2320, height: 1360 },
  matrix: { src: asset("impact-effort-matrix"), alt: "Impact–Effort Matrix comparing value and implementation effort", width: 1200, height: 800 },
  rollout: { src: asset("staged-rollout"), alt: "Five stages of the Birmarket homepage redesign", width: 2320, height: 1088 },
  visualDirection: { src: asset("visual-direction"), alt: "New purple Birmarket app design on two phones", width: 2320, height: 1504 },
  comparison: { src: asset("competitor-comparison"), alt: "Birmarket’s updated interface beside competing marketplace apps", width: 1200, height: 826 },
  brandTransition: { src: asset("brand-transition"), alt: "Birmarket icon changing from pink through a gradient to purple", width: 1200, height: 440 },
};

function BirmarketStatusBlock() {
  return (
    <div className={styles.statusBlock} data-case-block="feature">
      <div className={styles.statusCard}>
        <p className={styles.statusTitle}>Birmarket</p>
        <p className={styles.statusSubtitle}>No updates for years<br />Outdated design and experience</p>
        <Image src={asset("original-experience")} alt="Original Birmarket desktop and mobile shopping experience" width={1520} height={880} sizes="(max-width: 760px) calc(100vw - 64px), 760px" />
      </div>
      <div className={styles.goalCard}>
        <p className={styles.goalTitle}>Business goal — fix unit economics</p>
        <p>As sales grew, poor unit economics were leading to bigger losses.</p>
      </div>
    </div>
  );
}

export function BirmarketGrowthArticle() {
  return (
    <CaseStudyPage title={birmarketGrowthTitle} image={asset("hero-photo")} imageWidth={2480} imageHeight={1386} alt="Hand-drawn marketplace wireframes beside a pink highlighter" returnHref="/projects/birmarket#breaking-the-inertia" returnLabel="Back to Birmarket projects" articleVariant="editorial" readingTime="6 min reading">
      <CaseParagraph variant="lead">
        <p>In an experimental project, our small team started from scratch, showed the company how to get results quickly, and changed how teams worked on the product.</p>
      </CaseParagraph>
      <CaseParagraph>
        <h3 id="context">Context</h3>
        <p>New leadership had joined the company. They were under pressure, and the holding company expected visible results quickly. A few managers and I were invited to lead the product transformation.</p>
        <p>The designers worked in separate teams and rarely worked together. There was no shared design team structure or design system, and some user flows were inconsistent.</p>
      </CaseParagraph>

      <BirmarketStatusBlock />

      <CaseParagraph>
        <h3 id="my-role">My role</h3>
        <p>My task was to identify and address UX issues that directly affected the marketplace’s unit economics. My mandate included shaping product team practices, leading research, and drawing on analytics and customer support resources to inform product proposals.</p>
      </CaseParagraph>

      <CaseTextImageBlock>
        <CaseParagraph>
          <h3 id="timing">Timing</h3>
          <p>We agreed with leadership on two months of discovery so we could share our findings in time for Q2 planning.</p>
        </CaseParagraph>
        <CaseSmallImage image={images.timeline} />
      </CaseTextImageBlock>

      <CaseParagraph>
        <h3 id="understand-the-problem">Understand the problem</h3>
        <p>We reviewed the mobile and desktop experience. We combined product data with customer support questions, app reviews, social media complaints, earlier research, and interviews with product teams. Together with the research team, we also looked at how orders were handled at warehouses and pickup points to understand the full purchase experience.</p>
      </CaseParagraph>
      <CaseBigImage image={images.audit} />

      <CaseParagraph>
        <h3 id="find-opportunities">Find opportunities</h3>
        <p>I brought the design team and a product manager together for a two-week design sprint. We turned the audit findings into ideas to test at key steps in the purchase journey. We estimated which metrics each idea could affect and built prototypes for the most important parts.</p>
        <p>We worked in short cycles. A small group of users and customer support colleagues gave us quick feedback as we developed the ideas.</p>
      </CaseParagraph>
      <CaseBigImage image={images.sprint} />

      <CaseParagraph>
        <h3 id="test-the-ideas">Test the ideas</h3>
        <p>We built a prototype to address the problems we had found. We then ran qualitative research sessions with 12 participants to understand what they thought of our solution and what problems we might have missed. These sessions revealed details that the audit alone could not show.</p>
        <p>Next, we tested the updated version with a larger group in a quantitative study that received 600 responses. This gave us stronger evidence about customer problems and our proposed designs for the next round of discussions.</p>
      </CaseParagraph>
      <CaseBigImage image={images.research} />

      <CaseTextImageBlock>
        <CaseParagraph>
          <h3 id="make-trade-offs">Make trade-offs</h3>
          <p>We wrapped up the project in two months and were ready to move into planning. We shared our findings with the wider team and then ran a workshop. We used an Impact–Effort Matrix to compare the value each idea could bring to customers and the business with how much effort it would take to build.</p>
        </CaseParagraph>
        <CaseSmallImage image={images.matrix} />
        <CaseParagraph>
          <h4 id="plan-the-next-steps">Plan the next steps</h4>
          <p>We presented our concept to leadership and gained their support. The team finally had a shared vision of where we were going. We agreed with the product team to introduce the changes in stages. The main sections of the app followed a similar structure. Most of these changes were planned for 2027.</p>
        </CaseParagraph>
      </CaseTextImageBlock>
      <CaseBigImage image={images.rollout} />

      <CaseParagraph>
        <h3 id="my-contribution">My contribution</h3>
        <p>Alongside the research, I took full ownership of the new UI and a modest brand refresh. I worked with the marketing team on this. I proposed a new color that works better in digital and print, and set the direction for the graphic style.</p>
      </CaseParagraph>
      <CaseBigImage image={images.visualDirection} />

      <CaseTextImageBlock>
        <CaseParagraph>
          <p>We prepared the first concepts for testing to see how users perceived them. We wanted to know whether they would recognize the new color. Together with the icon and graphic style, it made Birmarket unmistakable to them.</p>
          <p>The new style helped us guide users’ attention in the app and distinguish the product from competitors, including Temu, AliExpress, and Trendyol.</p>
        </CaseParagraph>
        <CaseSmallImage image={images.comparison} />
      </CaseTextImageBlock>

      <CaseTextImageBlock>
        <CaseParagraph>
          <p>To make the change recognizable, we agreed on a transition period: pink would first appear in a gradient before the brand moved fully to the new color.</p>
        </CaseParagraph>
        <CaseSmallImage image={images.brandTransition} />
      </CaseTextImageBlock>

      <CaseTextImageBlock>
        <CaseParagraph>
          <h3 id="measured-results">Measured results</h3>
          <p>This is a recent project, so I can’t share detailed results publicly yet. I’d be happy to walk you through the numbers in a conversation...</p>
        </CaseParagraph>
        <div className={styles.resultsPlaceholder} role="img" aria-label="Detailed results available in a conversation">
          <Image src="/projects/birmarket/inertia/results-lock.svg" alt="" width={60} height={80} />
        </div>
      </CaseTextImageBlock>
    </CaseStudyPage>
  );
}
