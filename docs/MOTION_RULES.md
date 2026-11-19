# Motion rules for the portfolio site

This file records the site's established motion behavior for Dev's changes. Read it with `docs/PROJECT_CONTEXT.md`. The external `review-animations` and `animation-performance` skills provide additional review heuristics; they do not replace a deliberate site behavior merely because a generic duration or easing recommendation differs.

## Intent and scope

- Motion should clarify interaction, state, or page entry and feel consistent across the homepage and project pages. Preserve existing behavior outside the requested scope.
- Reuse an existing motion component or interaction hook before creating another implementation. The shared draggable card and icon hooks, `PageCloseLink`, `DotParallax`, and `M10CaseMotion` are documented in `docs/PROJECT_CONTEXT.md`.
- Keep route and hash navigation immediate. Do not add global smooth scrolling. Full document navigation intentionally restarts page-entry motion.
- Prefer explicit animated properties. Existing `filter: brightness()` and `drop-shadow()` feedback is part of the site's visual language; do not substitute `box-shadow`.

## Established site behavior

- The shared dotted background moves upward at 18% of scroll speed. It uses the same tokens and origin on the homepage and project pages. Reduced-motion preference leaves it stationary.
- The m10 and Birmarket overview motion reveals content once as it enters the viewport; scrolling upward does not hide it again. The hero enters and scales gently on scroll. Content remains visible before hydration and when reduced motion is requested.
- The desktop Speaking cards reveal once from their stack and do not restack on upward scroll.
- Desktop cards and enabled icons can be dragged and stay at their dropped coordinates. Mobile card dragging cycles a card to the back; returning motion must not block the next drag. Mobile service and company icons are not draggable.
- Desktop tooltips keep their delay and existing rotation/brightness feedback. Mobile company details use an animated, non-modal tap popover. The close control retains its current opacity hover and focus behavior.
- A 520 ms project-image hover transition and a 936 ms dragged-card return exist today. Review their feel and performance in context instead of treating the external skill's generic sub-300 ms UI guidance as an automatic failure.

## Review checks

1. Check whether the changed motion has a clear purpose and matches nearby components.
2. Test the actual interaction, including repeated activation, quick reversal, dragging, scrolling, and navigation where relevant.
3. Check desktop pointer behavior and mobile touch behavior at the site's 1080 px responsive switch.
4. Check `prefers-reduced-motion: reduce`, focus and keyboard use, and visibility before hydration.
5. Check animated properties and frame work; identify a concrete performance risk before prescribing a different implementation.
6. Report regressions and new inconsistencies with file and line references. Call out an existing behavior separately if it deserves a future design decision.

## External review material

The project copies `review-animations` and `animation-performance` from [emilkowalski/skills](https://github.com/emilkowalski/skills) at commit `2d228630ba1446365f614a108cb8252f1feda202`. Their MIT license is in `.agents/skills/EMILKOWALSKI-LICENSE`. Update these copies intentionally and review upstream changes before adopting them.
