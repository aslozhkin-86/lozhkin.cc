# Lozhkin PDP Portfolio Website

## Project Identity

- This repository is Alexander Lozhkin's personal portfolio website.
- Use the name **Lozhkin PDP — personal portfolio website** when referring to it in other tasks.
- The local project root is `/Users/alex/Documents/Lozhkin PDP/lozhkin-site`; editable site code is in `source/`.
- Publish completed site changes to GitHub and `lozhkin.cc` as part of the task unless the user asks to keep them local or as a draft. Keep local source and GitHub in sync after publication.
- Update this document and the publishing guide in the same task whenever architecture, directories, dependencies, development commands, build, hosting, or publishing changes. Remove stale instructions.

## Product and Visual Direction

- The site uses a playful whiteboard visual language: warm board background, a generated dot grid, movable cards and icons, and handwritten accents.
- Use the existing design tokens in `styles/portfolio-tokens.css` and `styles/tokens.css`. Do not introduce duplicate hard-coded color or typography systems.
- Use the bundled LORE font through `var(--font-family-marker)` for handwritten text. Do not add or restore Permanent Marker.
- Use the existing serif title style and Inter body style through the portfolio tokens.
- Keep decorative dots generated in CSS. Do not export dot-pattern backgrounds from Figma.
- Keep `filter: brightness()` and `drop-shadow()` for interaction feedback. Do not replace them with `box-shadow`.
- Reuse supplied assets from `public/` and keep new site assets inside the project.

## Page Sections

Use these names consistently when discussing or editing the page:

- `WhiteboardHeader`: the Hero section with the introduction card stack, service icons, contact links, and the open-to-work sticker.
- `CompanyHistory`: the company-logo section with tooltips.
- `ProjectList`: the static project teaser section. Keep the cases in normal document flow so image and text sizes determine each row's height; stack each case in one column on narrow screens. At 800 px and below, use the supplied square mobile teaser images through picture sources; preserve desktop artwork above that breakpoint. The supplied m10-teaser-mobile-1.png is the Birmarket mobile image.
- `SpeakingSection`: the conference and meetup card stack.
- `ApproachStatement`: the scroll-linked Approach introduction, Management, Design, and Cycle card stack on the dotted board background, with no separate section heading. Cards arrive one at a time and finish with 10 px vertical offsets, using the same behavior on desktop and mobile. Reduced motion and no-JavaScript visitors see all four cards in normal reading order. This scroll-only section preserves native touch scrolling and does not use the draggable card controller.
- `OtherProjects`: six supplied earlier projects after the approach section, with their own images, titles, and descriptions.
- `PortfolioFooter`: the final contact section with a hand-drawn divider and Telegram, Email, and LinkedIn links.

## Shared Interaction Architecture

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
