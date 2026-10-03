# Approach copy update — 2026-10-02

Implemented the owner-approved English copy in the Hero Approach card and all four Approach section cards. The introduction uses the final designer-focused version; Management and Cycle use the accepted lively versions; Design ends with getting behind bold ideas shaped together. Hero contains three matching principles and the “How I work ↓” link.

Source of truth: the copy in `source/components/WhiteboardHeader/WhiteboardHeader.tsx` and `source/components/ApproachStatement/ApproachStatement.tsx` within `/Users/alex/Documents/Lozhkin PDP/lozhkin-site`.

Notion synchronization is pending: both the main PDP page (352e1b36867a80729589ed3970874d5d) and the existing portfolio task (384e1b36867a813ca916e86ae898540c) returned access-related 404 responses again on 2026-10-02. When access is restored, fetch the task again and append a concise result, publication status, and source paths to Owner Notes, preserving existing notes and the broader task status. No full editable copy of the text is needed in Notion.

The site was published to `aslozhkin-86/lozhkin.cc` on 2026-10-02 in commit `2ca2615` (`origin/main`). The live page at `https://lozhkin.cc/` was checked after deployment: each Approach card has three paragraphs with a computed 12 px gap (0.5 of the 24 px body line height).

The four Approach cards now group the approved copy into three semantic paragraphs each. Paragraph spacing is 0.5lh (half the computed line height). Wording is unchanged. Include this formatting update when Notion access is restored.
