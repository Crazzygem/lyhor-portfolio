# Task Context: Architecture Refactor — Lyhor Portfolio

Session ID: 2026-06-13-architecture-refactor
Created: 2026-06-13T23:59:00Z
Status: in_progress

## Current Request
Refactor the portfolio codebase to address 3 architecture candidates:
1. Consolidate 3 separate animation systems into one module
2. Externalize hardcoded content data into JSON files
3. Clean up dead code, extract CSS utilities, split Contact/Footer

## Context Files (Standards to Follow)
None — no .opencode/context/ exists in this project.

## Reference Files (Source Material to Look At)
- src/components/Hero.astro
- src/components/Navbar.astro
- src/components/About.astro
- src/components/Skills.astro
- src/components/Work.astro
- src/components/Experience.astro
- src/components/Contact.astro
- src/layouts/Layout.astro
- src/pages/index.astro
- src/styles/global.css

## External Docs Fetched
None needed.

## Components
### Candidate A: Animation Consolidation
- Create src/scripts/animations.js with a single IntersectionObserver for scroll fade-ins, nav link highlighting, and prefers-reduced-motion respect
- Remove inline scripts from Hero.astro, Navbar.astro, and index.astro
- Load animatons.js once in Layout.astro

### Candidate B: Content Externalization
- Create src/data/skills.json, src/data/projects.json, src/data/experience.json, src/data/nav.json
- Import in respective components instead of inline arrays
- Add descriptive alt text to projects

### Candidate C: Dead Code + CSS Cleanup
- Remove unused .text-muted class from global.css
- Extract .body-text utility for repeated paragraph pattern
- Split footer from Contact.astro into standalone Footer.astro
- Update Contact.astro to remove footer section

## Constraints
- Must remain 100% static (no SSR)
- Must build successfully with `npm run build`
- No new npm dependencies
- Must preserve all visual appearance and behavior
- Animations must continue working exactly as before

## Exit Criteria
- [ ] `npm run build` succeeds
- [ ] All 3 animation systems consolidated into one module, behavior identical
- [ ] Content data externalized to JSON files
- [ ] Dead code removed, CSS utilities extracted, Contact/Footer separated
- [ ] All changes committed and pushed
