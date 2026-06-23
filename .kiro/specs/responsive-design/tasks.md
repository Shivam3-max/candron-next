# Implementation Plan: Responsive Design

## Overview

All changes are edits to five existing files. `globals.css` is the foundation — it owns breakpoint tokens, layout skeleton media queries, hamburger fix, hero collapse, spacing, and hardening overrides. Component files (page.tsx, ProductTypePage.tsx, ProcessSection.tsx, IndustryCarousel.tsx) add Tailwind responsive prefix classes or minor JSX wiring on top of the CSS foundation.

Implementation order: globals.css first, then all component edits in parallel.

---

## Tasks

- [x] 1. Update `globals.css` — breakpoint tokens, media query consolidation, and layout skeleton rules
  - [x] 1.1 Replace `@theme` breakpoint tokens with canonical values
    - Change `--breakpoint-sm` to `375px`, `--breakpoint-md` to `768px`, `--breakpoint-lg` to `1280px`
    - Remove `--breakpoint-tablet: 1024px`
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Fix hamburger display and desktop nav hide at ≤768 px
    - Update `.ham` base rule: add `min-width: 44px; min-height: 44px; align-items: center; justify-content: center;` (keep `display: none` at base)
    - Add `@media (max-width: 768px)` block: `nav { display: none }`, `.nav-cta { display: none }`, `.ham { display: flex }`
    - _Requirements: 2.1, 2.2, 2.5, 10.3_

  - [x] 1.3 Add hero collapse rules at ≤768 px
    - Inside `@media (max-width: 768px)`: set `.hero-inner { grid-template-columns: 1fr }`, `.hero-visual { display: none }`, `.hero-stat-float { display: none }`, `section.hero-home { min-height: auto; padding: 6rem 0 4rem }`
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [x] 1.4 Add container and section spacing reductions
    - `@media (max-width: 768px)`: `.container { padding: 0 1.5rem }`, `.nav-inner { padding: 0 1.5rem }`, `.section { padding: 4rem 0 }`, `.section-sm { padding: 2.5rem 0 }`, `.section-lg { padding: 5rem 0 }`
    - `@media (max-width: 375px)`: `.container { padding: 0 1rem }`, `.nav-inner { padding: 0 1rem }`, `.section { padding: 3rem 0 }`, `.section-sm { padding: 2rem 0 }`, `.section-lg { padding: 4rem 0 }`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 1.5 Add `ptype-kpi-grid` and `ptype-related-grid` targeted overrides
    - `@media (max-width: 768px)`: `.ptype-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important }`, `.ptype-related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important }`
    - `@media (max-width: 375px)`: `.ptype-kpi-grid { grid-template-columns: minmax(0, 1fr) !important }`, `.ptype-related-grid { grid-template-columns: minmax(0, 1fr) !important }`
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

  - [x] 1.6 Add global inline-style grid hardening overrides
    - `@media (max-width: 768px)`: `[style*="repeat(4"], [style*="repeat(3"] { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important }`
    - `@media (max-width: 375px)`: `[style*="grid-template-columns"]:not(.responsive-override-exempt) { grid-template-columns: minmax(0, 1fr) !important }`
    - Remove any existing overrides at 390 px, 420 px, or 640 px that duplicate this behaviour
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 1.7 Consolidate IndustryCarousel edge spacer breakpoints
    - Replace existing `@media(max-width:1024px)` and `@media(max-width:640px)` blocks for `.ind-carousel-edge` and `.ind-carousel-controls` with:
      - `@media (max-width: 768px)`: edge `1.5rem`, controls padding `1.5rem`
      - `@media (max-width: 375px)`: edge `1rem`, controls padding `1rem`
    - _Requirements: 7.3, 1.4_

  - [x] 1.8 Verify `prefers-reduced-motion` block covers all six hero animation classes
    - Confirm the existing block includes `.hero-eyebrow, .hero-home h1, .hero-home .lead, .hero-btns, .hero-visual, .trust-logos` with `animation: none; opacity: 1; transform: none`
    - Add any missing selectors
    - _Requirements: 10.1_

- [x] 2. Checkpoint — verify globals.css foundation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Update `app/page.tsx` — stat bar Tailwind responsive classes
  - [x] 3.1 Add responsive grid and padding classes to `div.home-stat-bar`
    - Change the grid class from `grid-cols-[1fr_auto_1fr_auto_1fr]` to include `max-md:grid-cols-3 max-md:px-6 max-sm:grid-cols-1 max-sm:px-4 max-sm:py-6`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 3.2 Hide stat dividers at tablet, add per-item mobile border
    - Add `max-md:hidden` to both `div.home-stat-divider` elements
    - Add `max-sm:border-b max-sm:border-white/15 max-sm:pb-5` to each stat item `div`; add `max-sm:border-b-0` to the last stat item
    - _Requirements: 4.1, 4.2_

- [x] 4. Update `components/ProductTypePage.tsx` — responsive classes and scroll wrappers
  - [x] 4.1 Add `ptype-kpi-grid` class to the KPI strip container
    - Change `<div className="grid" style={{ gridTemplateColumns: ... }}>` to `<div className="ptype-kpi-grid grid" style={{ gridTemplateColumns: ... }}>`
    - _Requirements: 5.1, 5.2_

  - [x] 4.2 Collapse Features & Upgrades grid to single column at tablet
    - Change `<div className="grid grid-cols-2 gap-8">` to `<div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">`
    - _Requirements: 5.3_

  - [x] 4.3 Wrap the spec table in a horizontal scroll container
    - Wrap the existing `<div className="rv bg-white border ...">` table container in `<div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">...</div>`
    - _Requirements: 5.6_

  - [x] 4.4 Add `ptype-related-grid` class to the Related Types grid container
    - Change `<div className="grid gap-4" style={{ gridTemplateColumns: ... }}>` to `<div className="ptype-related-grid grid gap-4" style={{ gridTemplateColumns: ... }}>`
    - _Requirements: 5.4, 5.5_

  - [x] 4.5 Ensure tab scroll container has `-webkit-overflow-scrolling:touch`
    - Change `<div className="flex overflow-x-auto [scrollbar-width:none]">` to `<div className="flex overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">`
    - _Requirements: 5.7_

- [x] 5. Update `components/ProcessSection.tsx` — grid collapse and GSAP reduced-motion guard
  - [x] 5.1 Collapse the two-column outer grid at tablet
    - Change `<div className="grid grid-cols-[5fr_7fr] gap-[5rem] items-start">` to `<div className="grid grid-cols-[5fr_7fr] max-md:grid-cols-1 gap-[5rem] max-md:gap-12 items-start">`
    - _Requirements: 6.1_

  - [x] 5.2 Collapse the four-pillar card grid at tablet and mobile
    - Change `<div className="grid grid-cols-4">` to `<div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">`
    - Update each pillar `div` className to replace the conditional `ci < 3` border-right with: `border-r border-white/[.08] last:border-r-0 max-md:[&:nth-child(2)]:border-r-0 max-sm:border-r-0 max-sm:border-b max-sm:border-white/[.08] max-sm:last:border-b-0`
    - _Requirements: 6.2, 6.3_

  - [x] 5.3 Add `prefers-reduced-motion` guard at the top of the `useGSAP` callback
    - At the start of the `useGSAP` callback (before any GSAP calls), check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
    - If true: set `lineRef.current.style.height` to match `trackRef.current.style.height` (or `'100%'`) and return early
    - _Requirements: 10.2_

- [x] 6. Update `components/IndustryCarousel.tsx` — card width at mobile
  - [x] 6.1 Add `max-sm:` card width override for ≤375 px
    - Add `max-sm:w-[clamp(200px,calc(82vw),260px)]` to the carousel card `className` alongside the existing `w-[clamp(240px,calc(85vw-1.25rem),300px)]`
    - _Requirements: 7.1_

- [x] 7. Final checkpoint — verify full responsive behaviour
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP (none in this plan — no PBT tasks apply to a pure CSS/layout feature)
- Task 1 (globals.css) is the foundation; Tasks 3–6 depend on it being complete first
- Tasks 3, 4, 5, and 6 are independent of each other and can run in parallel after Task 1
- The `.ptype-kpi-grid` and `.ptype-related-grid` CSS rules (Task 1.5) and JSX class additions (Tasks 4.1, 4.4) must both be applied — neither alone is sufficient to override inline styles
- The GSAP guard (Task 5.3) fires at runtime via `window.matchMedia`; no SSR concerns because `ProcessSection` is a `'use client'` component
- Verify at three widths after implementation: 375 px (hamburger, 1-col hero, 1-col stat bar), 768 px (hamburger, 3-col stat bar, 2-col KPI), 1280 px+ (desktop nav, 2-col hero, 5-col stat bar)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"] },
    { "id": 1, "tasks": ["3.1", "3.2", "4.1", "4.2", "4.3", "4.4", "4.5", "5.1", "5.2", "5.3", "6.1"] }
  ]
}
```
