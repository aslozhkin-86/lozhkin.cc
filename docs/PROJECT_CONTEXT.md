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
- `ProjectList`: the project teaser section. Keep the cases in normal document flow so image and text sizes determine each row's height; stack each case in one column on narrow screens. At 800 px and below, use the supplied square mobile teaser images through picture sources; preserve desktop artwork above that breakpoint. The supplied m10-teaser-mobile-1.png is the Birmarket mobile image. Birmarket's image and text links open the public overview directly. Its two internal case cards remain inert. m10 links directly to its case; unfinished projects remain inert.
- `ProjectCasePage` and `ProjectCaseCard`: the shared internal project-page shell, two-column layout, placeholder-card component, and common SVG/placeholder assets in `source/public/projects/shared/`. Mobile stacks narrative content before cards. Internal pages omit `PortfolioFooter` and retain the copyright line.
- `M10CasePage`: the separate `/projects/m10` page linked from the m10 teaser. It uses a large desktop title, an inline recognition and store-proof row, and a two-column layout with role, results, and mentions on the left and four illustrated case cards on the right: design strategy, digital card, brand refresh, and Love to Pay. All four cards currently remain inert with lock icons; the design-strategy prototype route is retained. `CaseStudyPage` renders the standalone case with the approved title and digital-card artwork. The white panel fades in and rises 24 px over 280 ms; content fades in over 180 ms after a 70 ms delay. Reduced motion disables both animations. The close link returns to `/projects/m10#design-strategy`. The previous card-expansion prototype and restoration notes are archived in `docs/prototypes/`. Mobile starts a new proof line after the App of the Day mark. Figma-supplied visual assets, owner-supplied case images, and the App of the Day mark live in `source/public/projects/m10/`. The store ratings are dated snapshots; company awards must be attributed to PashaPay rather than m10.
- `BirmarketCasePage`: the separate `/projects/birmarket` page linked from the Birmarket teaser. It has two narrative sections, Head of design and Project results, plus two visible but inert locked case cards: Marketplace Vision 2027 (supplied artwork) and Breaking the inertia. Their standalone pages and client-side password prompt are excluded from the published repository; local drafts are preserved at `/Users/alex/Documents/Lozhkin PDP/site-unpublished/birmarket/`. Public result figures are hidden and replaced with an invitation to discuss selected results. It has no store-proof row or mentions. The content uses the [current public CV](https://app.notion.com/p/38fe1b36867a8090bc9deeb9e2f71ea6) for the 1.5M MAU scale and team of 7 designers and 2 researchers. Other [Birmarket draft notes](https://app.notion.com/p/3e2e1b36867a8184a56bc8dda36f76f3) contain conflicting conversion figures; do not mix them into this page without owner reconciliation.
- `SpeakingSection`: the conference and meetup card stack.
- `ApproachStatement`: a saved four-card interaction, currently hidden from the homepage. The first-screen Approach card remains; its How I work link is hidden for now.
- `OtherProjects`: six earlier projects before the approach section, using the shared `ProjectCaseCard` in a two-column desktop / one-column mobile grid. An optional `company` label names the company or project; the single main caption contains its description. Categories are optional. Images retain their original proportions through `imageAspect="original"`. Shared content lives in `source/data/otherProjects.ts`. These cards are non-interactive, with no links, status icons, or separate case routes. Company labels use LORE Alternates Bold. Each card has a stable varied tilt within ±2 degrees. Linked cards elsewhere use the supplied `arrow-link.svg`; unfinished case cards retain their lock icons. m10 cards omit the company field.
- `PortfolioFooter`: the final contact section with a hand-drawn divider and Telegram, Email, and LinkedIn links.

## Shared Interaction Architecture

- `PageCloseLink` is the shared close/back control for project overview and standalone case pages. It owns the 40 px hit area, 32 px SVG, icon-only opacity hover, focus outline, and reduced-motion behavior. Page styles only position it; each page supplies its return URL and accessible label.

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

## Unpublished Birmarket case drafts (2026-10-06)

- The Breaking the inertia article and Marketplace Vision 2027 standalone page remain local at `/Users/alex/Documents/Lozhkin PDP/site-unpublished/birmarket/`. Do not add them to this public repository until they have an appropriate publishing decision or server-side access control.
- The overview retains the supplied `shake_birmarket.png` and `vision-2027.png` card artwork. Its two cards have lock icons but no link or password prompt.
- Structure reference for the unpublished article: [Figma draft](https://www.figma.com/design/KbiJRHYNYK6gLfUIiU6ekg?node-id=762-2855). Content source: [Birmarket reframed draft](https://app.notion.com/p/3f0e1b36867a813483cedf885eed596d), fetched on 2026-10-05.

## Case page updates (2026-10-06)

- `ProjectCasePage` dots cover the full page on desktop and mobile; bottom padding is 24 px.

- Homepage order: Hero → Company History → Projects → Speaking → Other Projects → Footer. The full Approach section is temporarily hidden. Read the case text links use the shared link color. The footer uses the same CSS dot grid as the board sections.
