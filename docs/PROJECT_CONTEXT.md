# Lozhkin PDP Portfolio Website

## Project Identity

- This repository is Alexander Lozhkin's personal portfolio website.
- Use the name **Lozhkin PDP — personal portfolio website** when referring to it in other tasks.
- The local project root is `/Users/alex/Documents/Lozhkin PDP/lozhkin-site`; editable site code is in `source/`.
- Work locally by default. Do not push to GitHub, publish, deploy, or update `lozhkin.cc` unless the user explicitly requests it.
- Update this document and the publishing guide in the same task whenever architecture, directories, dependencies, development commands, build, hosting, or publishing changes. Remove stale instructions.

## Product and Visual Direction

- The site uses a playful whiteboard visual language: warm board background, a generated dot grid, movable cards and icons, and handwritten accents.
- Use the existing design tokens in `styles/portfolio-tokens.css` and `styles/tokens.css`. Do not introduce duplicate hard-coded color or typography systems.
- Use the bundled LORE Alternates Regular font through `var(--font-family-marker)` for handwritten text. Its site asset is `source/public/fonts/LORE-Alternates-Regular.woff2`, copied from the user's supplied font files. Do not add or restore Permanent Marker.
- Use the existing serif title style and Inter body style through the portfolio tokens.
- Keep decorative dots generated in CSS. Do not export dot-pattern backgrounds from Figma.
- Keep `filter: brightness()` and `drop-shadow()` for interaction feedback. Do not replace them with `box-shadow`.
- Reuse supplied assets from `public/` and keep new site assets inside the project.

## Page Sections

Use these names consistently when discussing or editing the page:

- `WhiteboardHeader`: the Hero section with the introduction card stack, service icons, contact links, and the open-to-work sticker.
- `CompanyHistory`: the company-logo section with tooltips.
- `ProjectList`: the project teaser section. Keep the cases in normal document flow so image and text sizes determine each row's height; stack each case in one column on narrow screens. At 800 px and below, use the supplied square mobile teaser images through picture sources; preserve desktop artwork above that breakpoint. The supplied m10-teaser-mobile-1.png is the Birmarket mobile image. Birmarket's image and text links open the public overview directly. The local Birmarket article card links directly to its case; its Vision card remains inert. m10 links directly to its case; unfinished projects remain inert.
- `ProjectCasePage` and `ProjectCaseCard`: the shared internal project-page shell, two-column layout, placeholder-card component, and common SVG/placeholder assets in `source/public/projects/shared/`. Mobile stacks narrative content before cards. Internal pages omit `PortfolioFooter` and use the shared `PageCopyright` line. All project overviews and standalone cases give it 80 px top spacing on desktop, 40 px on mobile, and 24 px bottom page spacing.
- `M10CasePage`: the separate `/projects/m10` page linked from the m10 teaser. It uses a large desktop title, an inline recognition and store-proof row, and a two-column layout with role, results, and mentions on the left and four illustrated case cards on the right: design strategy, digital card, brand refresh, and Love to Pay. All four cards currently remain inert with lock icons; the design-strategy prototype route is retained. `CaseStudyPage` renders the standalone case with the approved title and digital-card artwork. The white panel fades in and rises 24 px over 280 ms; content fades in over 180 ms after a 70 ms delay. Reduced motion disables both animations. The close link returns to `/projects/m10#design-strategy`. The previous card-expansion prototype and restoration notes are archived in `docs/prototypes/`. Mobile starts a new proof line after the App of the Day mark. Figma-supplied visual assets, owner-supplied case images, and the App of the Day mark live in `source/public/projects/m10/`. The store ratings are dated snapshots; company awards must be attributed to PashaPay rather than m10.
- `BirmarketCasePage`: the separate `/projects/birmarket` page linked from the Birmarket teaser. It has two narrative sections, Head of design and Project results, plus two case cards: the local Breaking the inertia card comes first and links directly to its restored article; Marketplace Vision 2027 remains inert. The published site still has both cards inert. Public result figures are hidden and replaced with an invitation to discuss selected results. It has no store-proof row or mentions. The content uses the [current public CV](https://app.notion.com/p/38fe1b36867a8090bc9deeb9e2f71ea6) for the 1.5M MAU scale and team of 7 designers and 2 researchers. Other [Birmarket draft notes](https://app.notion.com/p/3e2e1b36867a8184a56bc8dda36f76f3) contain conflicting conversion figures; do not mix them into this page without owner reconciliation.
- `SpeakingSection`: the conference and meetup card stack.
- `ApproachStatement`: a saved four-card interaction, currently hidden from the homepage. The first-screen Approach card remains; its How I work link is hidden for now.
- `OtherProjects`: six earlier projects before the approach section, using the shared `ProjectCaseCard` in a two-column desktop / one-column mobile grid. An optional `company` label names the company or project; the single main caption contains its description. Categories are optional. Images retain their original proportions through `imageAspect="original"`. Shared content lives in `source/data/otherProjects.ts`. These cards are non-interactive, with no links, status icons, or separate case routes. Company labels use LORE Alternates Bold. Each card has a stable varied tilt within ±2 degrees. Linked cards elsewhere use the supplied `arrow-link.svg`; unfinished case cards retain their lock icons. m10 cards omit the company field.
- `PortfolioFooter`: the final contact section with a hand-drawn divider and Telegram, Email, and LinkedIn links.

## Shared Interaction Architecture

- `PageCloseLink` is the shared close/back control for project overview and standalone case pages. It owns the 40 px hit area, 32 px SVG, icon-only opacity hover, focus outline, and reduced-motion behavior. Page styles only position it; each page supplies its return URL and accessible label.
- Cross-page navigation uses native anchors. The static production host serves prerendered HTML, while vinext client-side `Link` navigation fails on the published site; a full document navigation also restarts the destination page's entrance animation.

- Reuse `DraggableCardStack` and `useCardStack` for card stacks. Do not copy their pointer logic into individual sections.
- Reuse `DraggableIcon` and `useDragCollection` for loose image/icon interactions.
- Use `useLayerOrder` for z-index ordering. The last object manipulated should appear on top.
- Hero and Speaking cards share mobile behavior: dragging a card far enough cycles it to the back and returns it to its original coordinates.
- A returning mobile card must not block the next card from being dragged immediately.
- On desktop, cards and enabled icons are draggable and remain at their dropped coordinates.
- On mobile, service and company icons are not draggable. Their tooltips open on tap. Company details use an animated, non-modal popover above the tapped icon, positioned in document coordinates so it scrolls with the page. Keep the close button and existing dimensions, allow native scrolling and normal keyboard navigation, and clamp to the screen gutters.
- Tooltips appear above all page objects, centered above their icon. Overlap with other content is intentional.
- Preserve the delayed desktop tooltip appearance and existing hover rotation/brightness behavior.
- `SpeakingSection` reveals its desktop cards from a stacked deck once when the section reaches the reveal threshold. Scrolling upward must not restack them.

## Responsive Behavior

- Keep page-to-page navigation and hash targets immediate. Do not set global `scroll-behavior: smooth`; it makes route changes visibly scroll from the previous page position.
- Preserve a practical gap between section titles and their visual content. Prefer additional section height or wrapping over overlapping content.
- Mobile section titles use the shared `--portfolio-mobile-section-title-*` tokens.
- Do not force ordinary content sections to fill the viewport. The Hero is the intentional viewport-height exception.
- Desktop service icons are hidden below the existing 1000 px breakpoint.
- Company logos use fixed 81 × 81 px image boxes on desktop and mobile. Serve their small original PNGs (134–200 px) directly to avoid requesting oversized image variants.
- Keep mobile card decks compact, with the existing 10 px stack offset unless the user requests another value.

## Scope Discipline

- When the user limits a request to content, spacing, or one section, change only that scope. Preserve card coordinates, dragging, hover behavior, and unrelated breakpoints.
- Prefer adapting an existing shared component over building a second implementation of the same interaction.
- Treat Figma as the visual source when the user supplies a node link, but adapt its fonts and colors to the tokens already used by the project.
- Keep unfinished project links inert or absent until the user supplies their destinations.

## Local Development and Verification

- The project uses pnpm and requires Node.js 22.13 or newer.
- Run commands in `source/`:
  - `pnpm run dev`
  - `pnpm run lint`
  - `pnpm test`
- `pnpm test` builds the site and runs `tests/rendered-html.test.mjs`.
- Run `git diff --check` after edits.
- For layout or interaction changes, inspect the local page at the dev server URL at the relevant desktop and mobile sizes.
- Do not restart the local development server when hot reload is sufficient.

## Unpublished Birmarket case drafts (2026-10-07)

- The Breaking the inertia article and route have been restored to the local source tree for continued editing. An unchanged backup, along with the Marketplace Vision 2027 standalone page, remains at `/Users/alex/Documents/Lozhkin PDP/site-unpublished/birmarket/`.
- The overview uses a smaller `hero-preview.png` from the article's Figma hero image for the first, directly linked Breaking card. The Vision card retains `vision-2027.png` and has no link.
- `scripts/publish.sh` now refuses to publish while these draft routes or their local-only components are in the source tree. Move them out before any later approved production release.
- The current article source of truth is the [Figma case frame](https://www.figma.com/design/KbiJRHYNYK6gLfUIiU6ekg?node-id=762-2855), including copy, image order, and visual composition.

## Case page updates (2026-10-06)

- `ProjectCasePage` dots cover the full page on desktop and mobile; bottom padding is 24 px.

- Homepage order: Hero → Company History → Projects → Speaking → Other Projects → Footer. The full Approach section is temporarily hidden. Read the case text links use the shared link color. The footer uses the same CSS dot grid as the board sections.

## Birmarket article content (2026-10-09)

- The local article and its overview card use “How we got a company moving and changed how it builds products.” The case card links directly to the article.
- The article is built from the linked Figma frame. Its mixed-language draft copy is rendered in English while preserving the intended meaning. The article now follows the Figma order: photographic hero; introduction and context; custom current-state and business-goal card; role and timing; audit, sprint, research, planning, rollout, visual direction, competitor comparison, brand transition, and measured results. The final section uses the later Figma node `937:63556`: a note about discussing results privately and a gray lock panel.
- Eleven visual assets are exported from their Figma nodes as 2× PNGs in `source/public/projects/birmarket/inertia/`; the smaller card preview is derived from the hero export. The results lock uses the owner's supplied `zamok.svg`, copied into the same directory as `results-lock.svg`. No temporary Figma URLs are referenced by the site. The Figma frame has no homepage-results diagram, so the earlier local diagram and numerical caption were removed.
- The earlier browser review removed the introduction and Context heading from a different draft; the latest Figma-as-source instruction restores them. Section titles retain semantic H3, and the “Plan the next steps” subheading uses H4.
- Local draft only; the existing publishing guard remains in place.

## Shared link preview (2026-10-07)

- Root metadata supplies the same Open Graph and Twitter large-image card to every route. Image: `source/public/share.jpg`, the owner-supplied 1200 × 630 JPEG, served as `https://lozhkin.cc/share.jpg` after publication.
- Shared title: Lozhkin Alexander — Product Design Lead. Shared description: Product Design Lead with 15+ years of experience across fintech, e-commerce, and data-heavy products
- Page-specific browser titles and regular descriptions remain separate from these shared social fields. Do not add per-page social overrides until requested. Local configuration awaits publication.

## Birmarket article typography review (2026-10-09)

- Figma reference: https://www.figma.com/design/KbiJRHYNYK6gLfUIiU6ekg?node-id=762-2855. Its desktop type styles are section title Inter Bold 40/52, subheading Inter Bold 24/28, body Inter Medium 18/26, introductory body Inter Medium 22/30, and handwritten title 48/60 with −2% letter spacing.
- `CaseStudyPage` exposes an optional `articleVariant="editorial"`. The Birmarket article uses it to scope the new type sizes and gray body color to that case; the m10 case and other pages retain their existing styles. The existing bundled LORE Alternates font remains the project’s handwritten font, even though the Figma frame names Permanent Marker. No font asset or global typography token was replaced.
- Section titles remain semantic H3 per the owner’s earlier request while using the design’s 40/52 visual heading style. The Figma introduction uses the 22/30 lead style, the planning subheading uses 24/28, and reading-time metadata uses the handwritten 17/24 style. The editorial hero is specific to Birmarket; m10 retains its earlier layout.

## Case article constructor (2026-10-09)

- `source/components/CaseArticleBlocks/` contains three composable article blocks: `CaseParagraph` for headings and text in JSX order, `CaseTextImageBlock` for a 600 px column containing ordered paragraphs and `CaseSmallImage`, and `CaseBigImage` for a standalone wide image. The Birmarket article uses these blocks; m10 remains unaffected.
- Blocks follow their JSX order. Top-level blocks, including big images, have 80 px after them on desktop and 48 px on mobile; the last block has no trailing margin. Nested text and small images have 48 px gaps on desktop and 32 px on mobile. Images retain their Figma aspect ratios and descriptive alt text; they do not open on click.
- The Figma-specific Birmarket status and business-goal card is a separate custom block. The Figma photo hero is enabled only through the `editorial` case variant.
- Article-body images, including the bespoke status image, use 40 px rounded squircle corners; the photo hero is unaffected. `CaseArticleReveal` progressively enhances the editorial article with a one-time 24 px slide-up and fade-in for each top-level block as it enters the viewport. Blocks remain visible before hydration and under reduced-motion preferences.
- The editorial hero follows Figma nodes `932:63304` (desktop) and `938:63576` (mobile): the photo is followed by an overlapping white title panel with 40 px left and right padding on desktop. On mobile, its title, reading time, and divider align with the article body's 24 px side gutters. The current title, copy, and typography remain unchanged. The mobile title panel spans the width of the white card, and the close control sits at the top right. On mobile, the Birmarket white panel reaches both viewport edges while retaining its beige top gap; the m10 case keeps its existing gutters.
