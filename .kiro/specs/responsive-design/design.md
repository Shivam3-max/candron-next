# Design Document

## Overview

This document describes the technical implementation plan for making the candron-next project fully responsive. The approach uses two complementary layers: `globals.css` owns all layout skeleton media queries, and Tailwind v4 responsive prefix classes own component-level detail. All responsive rules are consolidated to exactly three canonical breakpoints: mobile (≤375 px), tablet (≤768 px), and desktop (≥1280 px, the default).

---

## Architecture

### CSS Strategy

```
globals.css  — layout skeletons, grid collapses, spacing reductions, hardening overrides
              Uses CSS media queries at max-width: 375px and max-width: 768px only.

components/  — component-level detail via Tailwind v4 responsive prefix classes:
              max-sm: (≤375 px)   →  --breakpoint-sm: 375px
              max-md: (≤768 px)   →  --breakpoint-md: 768px
              (no max-lg: used — desktop is the base)
```

### Breakpoint Token Map (Tailwind v4 `@theme`)

| Token | Value | Tailwind prefix | Use |
|---|---|---|---|
| `--breakpoint-sm` | 375 px | `max-sm:` | Mobile portrait phones |
| `--breakpoint-md` | 768 px | `max-md:` | Tablets and large phones |
| *(none)* | 1280 px | base (no prefix) | Desktop — all default rules |

Legacy tokens removed: `--breakpoint-lg: 1024px`, `--breakpoint-tablet: 1024px`.

---

## Component Designs

### 1. globals.css — Breakpoint Standardisation (Req 1, 8, 9)

**Change:** Replace the `@theme` breakpoint tokens and consolidate all media query blocks.

**Before (current):**
```css
@theme {
  --breakpoint-sm:     640px;
  --breakpoint-md:     768px;
  --breakpoint-lg:    1024px;
  --breakpoint-tablet: 1024px;
}
```

**After:**
```css
@theme {
  --breakpoint-sm:  375px;
  --breakpoint-md:  768px;
  --breakpoint-lg: 1280px;
}
```

**Media query consolidation plan:**
- All rules currently at `max-width: 1024px` → merge relevant layout rules into `max-width: 768px`
- All rules at `max-width: 640px` → merge into `max-width: 768px` (or `max-width: 375px` for phone-only rules)
- All rules at `max-width: 390px` and `max-width: 420px` → absorb into `max-width: 375px`
- Remove empty or duplicate blocks after consolidation

**Container and section spacing (Req 8):**
```css
@media (max-width: 768px) {
  .container   { padding: 0 1.5rem; }
  .nav-inner   { padding: 0 1.5rem; }
  .section     { padding: 4rem 0; }
  .section-sm  { padding: 2.5rem 0; }
  .section-lg  { padding: 5rem 0; }
}

@media (max-width: 375px) {
  .container   { padding: 0 1rem; }
  .nav-inner   { padding: 0 1rem; }
  .section     { padding: 3rem 0; }
  .section-sm  { padding: 2rem 0; }
  .section-lg  { padding: 4rem 0; }
}
```

**Responsive hardening (Req 9):**
```css
/* Tablet: inline repeat(4/3) → 2-col */
@media (max-width: 768px) {
  [style*="repeat(4"],
  [style*="repeat(3"] {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
  }
}

/* Mobile: all inline grids → 1-col */
@media (max-width: 375px) {
  [style*="grid-template-columns"]:not(.responsive-override-exempt) {
    grid-template-columns: minmax(0, 1fr) !important;
  }
}
```

Remove existing hardening blocks at 390 px, 420 px, 640 px that duplicate this behaviour.

---

### 2. Navbar — Mobile Navigation (Req 2)

**File:** `components/Navbar.tsx` and `app/globals.css`

**Root cause:** `.ham { display: none }` in globals.css. The hamburger has always existed in JSX but CSS hides it unconditionally.

**CSS fix in globals.css:**
```css
/* Base: hamburger hidden (desktop) */
.ham { display: none; }

@media (max-width: 768px) {
  nav { display: none; }
  .nav-cta { display: none; }   /* hides the Contact Us CTA button alongside nav */
  .ham { display: flex; }        /* makes hamburger visible */
}
```

**No JSX changes required** — the Mobile Nav Drawer (`#mobile-nav`) and all `aria-*` attributes already exist in `Navbar.tsx` and work correctly once the hamburger is visible. The `mobileOpen` state, `setMobileOpen` handler, and close button are all already implemented.

**Touch target (Req 10, criterion 3):**
The `.ham` button needs `min-width: 44px; min-height: 44px` to satisfy the 44×44 px touch target requirement. The current CSS only has `padding: 8px` around 24px content.

```css
.ham {
  min-width: 44px;
  min-height: 44px;
  display: none;          /* hidden at desktop */
  align-items: center;
  justify-content: center;
  /* existing: flex-direction: column; gap: 5px; */
}
```

---

### 3. Home Page — Hero Collapse and Stat Bar (Req 3, 4)

**File:** `app/page.tsx` and `app/globals.css`

#### Hero collapse (Req 3)

The `.hero-inner` grid and `.hero-visual` hiding already exist in globals.css at 1024 px. These rules need to move to 768 px.

**globals.css change:**
```css
@media (max-width: 768px) {
  .hero-inner           { grid-template-columns: 1fr; }
  .hero-visual          { display: none; }
  .hero-stat-float      { display: none; }
  section.hero-home     { min-height: auto; padding: 6rem 0 4rem; }
}
```

#### Stat bar (Req 4) — Tailwind classes in app/page.tsx

The stat bar uses `grid-cols-[1fr_auto_1fr_auto_1fr]`. Add responsive Tailwind prefixes:

```tsx
<div className="home-stat-bar bg-[...] rounded-[20px] py-10 px-4
  grid grid-cols-[1fr_auto_1fr_auto_1fr]
  max-md:grid-cols-3 max-md:px-6
  max-sm:grid-cols-1 max-sm:px-4 max-sm:py-6
  items-center">
```

Stat Dividers (the `div.home-stat-divider` elements) need to be hidden on tablet and shown on desktop:

```tsx
<div className="home-stat-divider w-px h-[90px] bg-white/[.18] max-md:hidden" />
```

For single-column (mobile), each stat item needs a bottom border. Add the class `max-sm:border-b max-sm:border-white/15 max-sm:pb-5` to each stat item `div`, with `max-sm:border-b-0` on the last item.

---

### 4. ProductTypePage — Responsive Layout (Req 5)

**File:** `components/ProductTypePage.tsx`

#### KPI Strip

The inline grid `style={{ gridTemplateColumns: \`repeat(${kpis.length}, 1fr)\` }}` cannot be overridden by CSS class rules directly (inline styles beat stylesheet). The responsive hardening block in globals.css handles this at 768 px (→ 2-col) and 375 px (→ 1-col). Additionally, add a wrapper class `ptype-kpi-grid` to the KPI container div so it can be targeted specifically:

```tsx
<div className="ptype-kpi-grid grid" style={{ gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
```

And in globals.css:
```css
@media (max-width: 768px) {
  .ptype-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 375px) {
  .ptype-kpi-grid { grid-template-columns: minmax(0, 1fr) !important; }
}
```

#### Features & Upgrades

Change `grid-cols-2` to include a tablet override:
```tsx
<div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
```

#### Spec Table

Wrap the existing `<div ... overflow-hidden>` table container in a scroll wrapper:
```tsx
<div className="overflow-x-auto -webkit-overflow-scrolling-touch">
  <div className="rv bg-white border ... rounded-[14px] overflow-hidden ...">
    <table className="w-full min-w-[480px] ...">
```

#### Related Types Grid

Add the class `ptype-related-grid` to the Related Types grid container and override the inline style:
```tsx
<div className="ptype-related-grid grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(relatedTypes.length, 4)}, 1fr)` }}>
```

globals.css:
```css
@media (max-width: 768px) {
  .ptype-related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 375px) {
  .ptype-related-grid { grid-template-columns: minmax(0, 1fr) !important; }
}
```

#### Tab Navigation

The fixed tab bar uses `flex overflow-x-auto [scrollbar-width:none]` — this is already scrollable. The issue is that the container div does not set `overflow-x: auto` explicitly and the `[scrollbar-width:none]` Tailwind utility may not apply the `-webkit-overflow-scrolling: touch` property. Ensure the scroll container has:
```tsx
<div className="flex overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
```

---

### 5. ProcessSection — Responsive Layout (Req 6)

**File:** `components/ProcessSection.tsx`

#### Grid collapse

Change `grid grid-cols-[5fr_7fr] gap-[5rem]` to collapse at tablet:
```tsx
<div className="grid grid-cols-[5fr_7fr] max-md:grid-cols-1 gap-[5rem] max-md:gap-12 items-start">
```

#### Four-pillar card

Change `grid grid-cols-4` to collapse at tablet then mobile:
```tsx
<div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
```

Each pillar currently uses `border-r border-white/[.08]` for only `ci < 3`. On the 2-col layout, the third pillar (index 2) must also lose its border-right. Use CSS instead of conditional JSX:

```tsx
{pillars.map(({ lbl, icon }, ci) => (
  <div key={ci} className={`py-[1.1rem] px-3 text-center border-r border-white/[.08] last:border-r-0 max-md:[&:nth-child(2)]:border-r-0 max-sm:border-r-0 max-sm:border-b max-sm:border-white/[.08] max-sm:last:border-b-0`}>
```

#### GSAP timeline (Req 6 criterion 4 and Req 10 criterion 2)

The GSAP `useGSAP` hook calculates the fill line height based on `getBoundingClientRect()` positions. When the grid collapses to a single column, the timeline panel (right column) shifts to below the left column — the GSAP measurements remain valid because they're based on actual rendered positions, not grid column indices. No GSAP coordinate changes needed.

For `prefers-reduced-motion`, add a guard at the top of `useGSAP`:
```tsx
useGSAP(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Set fill line to full height statically
    if (lineRef.current && trackRef.current) {
      lineRef.current.style.height = trackRef.current.style.height || '100%'
    }
    return
  }
  // ... existing GSAP logic
}, { scope: containerRef })
```

---

### 6. IndustryCarousel — Responsive Behaviour (Req 7)

**File:** `components/IndustryCarousel.tsx` and `app/globals.css`

#### Card width

Cards currently use `w-[clamp(240px,calc(85vw-1.25rem),300px)]`. At ≤768 px this already produces ~80 vw cards (good). The edge spacer governs how much of the next card peeks in. No width change needed for tablet.

At ≤375 px, the cards at `clamp(240px,...)` could be 240 px on a 375 px screen (64% of viewport). To ensure 75–85 vw range at mobile, update the card class:

```tsx
className="ind-carousel-card shrink-0
  w-[clamp(240px,calc(85vw-1.25rem),300px)]
  max-sm:w-[clamp(200px,calc(82vw),260px)]
  ..."
```

#### Edge spacer

globals.css currently has `@media(max-width:640px)` setting `.ind-carousel-edge { width: 1.25rem }`. Move to the canonical ≤375 px breakpoint:

```css
@media (max-width: 768px) {
  .ind-carousel-edge     { width: 1.5rem; }
  .ind-carousel-controls { padding-left: 1.5rem; padding-right: 1.5rem; }
}
@media (max-width: 375px) {
  .ind-carousel-edge     { width: 1rem; }
  .ind-carousel-controls { padding-left: 1rem; padding-right: 1rem; }
}
```

Remove the existing 1024 px and 640 px blocks for these two classes.

#### Scroll snap

The track already uses `[scroll-snap-type:x_mandatory]` in the Tailwind class. Cards use `[scroll-snap-align:start]`. Native touch-swipe is handled by the browser on iOS/Android without any JS changes needed.

#### Controls visibility

The controls row (prev/next buttons + progress bar) is rendered unconditionally at the bottom of the component. It is not hidden at any breakpoint. No change needed.

---

### 7. Reduced-Motion and Accessibility (Req 10)

**File:** `app/globals.css`

The existing `@media (prefers-reduced-motion: reduce)` block covers hero animations. Verify it includes all six animated elements:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-eyebrow,
  .hero-home h1,
  .hero-home .lead,
  .hero-btns,
  .hero-visual,
  .trust-logos {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

The GSAP guard is handled in `ProcessSection.tsx` as described in section 5 above.

The `.ham` touch target fix is described in section 2 above.

---

## File Change Summary

| File | Change Type | Requirements |
|---|---|---|
| `app/globals.css` | Major edit — consolidate breakpoints, media queries, spacing, hardening | Req 1, 2, 3, 7, 8, 9, 10 |
| `app/page.tsx` | Minor edit — stat bar Tailwind responsive prefixes | Req 4 |
| `components/ProductTypePage.tsx` | Minor edit — KPI/related-types class names, feature grid, table scroll wrapper, tab scroll | Req 5 |
| `components/ProcessSection.tsx` | Minor edit — grid collapse classes, pillar card classes, GSAP reduced-motion guard | Req 6, 10 |
| `components/IndustryCarousel.tsx` | Minor edit — card width at mobile breakpoint | Req 7 |

---

## Implementation Notes

1. **Order of operations in globals.css:** Apply the `@theme` token changes first, then consolidate media query blocks from largest to smallest. This prevents accidental duplication when merging 1024 px rules into 768 px.

2. **Inline style overrides:** The `.ptype-kpi-grid` and `.ptype-related-grid` class-level CSS overrides are placed inside their respective breakpoint blocks in globals.css, using `!important` to beat inline `style=` attributes. The global `[style*="grid-template-columns"]` hardening at 375 px provides a catch-all for any missed inline grids.

3. **Tailwind v4 `max-md:` prefix:** In Tailwind v4, `max-md:` applies when the viewport is **at most** `--breakpoint-md` (768 px after the token change). Verify any existing `max-md:` usages in component files are consistent with the new 768 px value after the token change (currently `--breakpoint-md` is 768 px so no breakage expected there).

4. **No new components needed.** All changes are edits to existing files. The responsive behaviour is entirely CSS/class-level — no new React state, hooks, or components are required.

5. **Testing checkpoints:**
   - 375 px width: hamburger visible, hero text-only, stat bar single column, all inline grids single-column
   - 768 px width: hamburger visible, desktop nav hidden, hero collapsed, stat bar 3-col, KPI strip 2-col
   - 1280 px+ width: hamburger hidden, full desktop nav, two-column hero, 5-col stat bar
