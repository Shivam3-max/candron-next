# Requirements Document

## Introduction

The candron-next project must render correctly and usably across all device sizes — mobile phones, tablets, and desktops. The site currently has several critical layout failures on small screens: the hamburger button is hidden by CSS so mobile navigation is unreachable; the home hero image column has no mobile collapse breakpoint, causing content overflow; the home stat bar uses a hard-coded 5-column inline grid with no responsive fallback; and dozens of sections rely on inconsistent ad-hoc breakpoints (390, 420, 640, 768, 1024 px) that produce fragile, conflicting overrides.

This feature consolidates responsive behaviour to exactly three canonical breakpoints, fixes all navigation and layout failures, and establishes a clear CSS strategy: `globals.css` owns layout skeleton rules, Tailwind responsive utility classes own component-level detail.

## Glossary

- **Breakpoint — Mobile**: Maximum viewport width of 375 px; targets phones in portrait orientation.
- **Breakpoint — Tablet**: Maximum viewport width of 768 px; targets tablets and large phones in landscape orientation.
- **Breakpoint — Desktop**: Minimum viewport width of 1280 px; the default/base layout.
- **Hamburger Button**: The `<button class="ham">` element in `Navbar.tsx` that opens the mobile navigation drawer; currently hidden by `.ham { display: none }`.
- **Mobile Nav Drawer**: The `<div id="mobile-nav">` overlay in `Navbar.tsx` that provides navigation links on small screens.
- **Hero Inner Grid**: The `.hero-inner` CSS class in `globals.css` that renders a two-column `1fr 1.2fr` grid for the home page hero section.
- **Hero Visual Column**: The right-hand column inside `.hero-inner` containing the product image, floating stats, and cert strip.
- **Home Stat Bar**: The `div.home-stat-bar` element in `app/page.tsx` that uses inline Tailwind class `grid-cols-[1fr_auto_1fr_auto_1fr]` to display three key metrics with dividers.
- **Stat Divider**: The `div.home-stat-divider` elements inside the Home Stat Bar that are displayed as visual separators between stat columns.
- **KPI Strip**: The dynamic grid in `ProductTypePage.tsx` that renders KPI values with `style={{ gridTemplateColumns: \`repeat(${kpis.length}, 1fr)\` }}`, applied to the element immediately below the page hero.
- **ProductTypePage**: The shared React component at `components/ProductTypePage.tsx` used as the template for approximately ten product sub-pages.
- **ProcessSection**: The React component at `components/ProcessSection.tsx` that renders a two-column layout: a left panel with text and a four-pillar card, and a right panel with an animated GSAP timeline.
- **IndustryCarousel**: The React component at `components/IndustryCarousel.tsx` that renders a horizontally-scrollable card track with drag and auto-advance behaviour.
- **globals.css**: The primary stylesheet at `app/globals.css`, approximately 6,600 lines, which defines design tokens, component class rules, and all media query overrides.
- **Tailwind Responsive Prefix**: A class prefix such as `max-sm:`, `max-md:`, or `sm:` that applies a Tailwind utility at a specific breakpoint as defined in the `@theme` block.

---

## Requirements

### Requirement 1 — Breakpoint Standardisation

**User Story:** As a developer, I want the project to use exactly three canonical breakpoints so that responsive rules are predictable, non-overlapping, and easy to maintain.

#### Acceptance Criteria

1. THE `globals.css` `@theme` block SHALL define breakpoint tokens at exactly 375 px (mobile), 768 px (tablet), and 1280 px (desktop), replacing the existing scatter of 390, 420, 640, 768, 1024 px values.
2. THE `globals.css` `@theme` block SHALL remove or remap the existing `--breakpoint-sm: 640px`, `--breakpoint-md: 768px`, `--breakpoint-lg: 1024px`, and `--breakpoint-tablet: 1024px` tokens so that no legacy breakpoint values remain active as named tokens.
3. WHEN a Tailwind responsive prefix (such as `max-sm:`, `max-md:`) is used in a component file, THE prefix SHALL correspond to one of the three canonical breakpoint values.
4. THE `globals.css` media queries for layout skeleton rules SHALL use only `max-width: 375px`, `max-width: 768px`, and `min-width: 1280px` as breakpoint thresholds, with all legacy 390 px, 420 px, 640 px, and 1024 px media query blocks consolidated into those three.

---

### Requirement 2 — Mobile Navigation

**User Story:** As a mobile user, I want to be able to open and close the site navigation on a small screen so that I can reach any page without requiring a desktop browser.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE `Navbar` SHALL render the Hamburger Button with `display: flex` (or equivalent visible display value), making it interactable.
2. WHEN the viewport width is 768 px or less, THE `Navbar` SHALL hide the desktop `<nav>` element and the `.nav-cta` link from the layout so they do not consume space or overlap the Hamburger Button.
3. WHEN a user activates the Hamburger Button, THE Mobile Nav Drawer SHALL become visible and cover the full viewport height.
4. WHEN a user activates the close button inside the Mobile Nav Drawer, THE Mobile Nav Drawer SHALL return to a hidden state.
5. WHEN the viewport width is greater than 768 px, THE `Navbar` SHALL hide the Hamburger Button and render the desktop `<nav>` element and `.nav-cta` link.
6. THE Hamburger Button and Mobile Nav Drawer SHALL be accessible via keyboard focus and SHALL include the existing `aria-expanded`, `aria-controls`, and `aria-label` attributes.

---

### Requirement 3 — Home Hero Responsive Collapse

**User Story:** As a mobile user visiting the home page, I want to see the hero heading and call-to-action without horizontal overflow or hidden content so that the page is immediately readable and actionable.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE `.hero-inner` grid SHALL collapse from a two-column layout to a single-column layout, stacking the text content above the Hero Visual Column.
2. WHEN the viewport width is 768 px or less, THE Hero Visual Column (`.hero-visual`) SHALL be hidden from the layout so that only the text-only hero is shown on small screens.
3. WHEN the viewport width is 768 px or less, THE `section.hero-home` SHALL reduce its minimum height to `auto` so that it does not exceed the viewport.
4. WHEN the viewport width is greater than 768 px, THE `.hero-inner` grid SHALL display as `grid-template-columns: 1fr 1.2fr` and THE Hero Visual Column SHALL be visible.
5. WHEN the viewport width is 768 px or less and the Hero Visual Column is hidden, THE `.hero-stat-float` badges SHALL also be hidden to prevent orphaned overlay elements from appearing.

---

### Requirement 4 — Home Stat Bar Responsive Layout

**User Story:** As a mobile or tablet user on the home page, I want the stat bar to display each metric legibly in a stacked or reduced-column layout so that key facts are readable without horizontal scrolling.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE Home Stat Bar SHALL render as a three-column grid (one column per stat item) and the Stat Dividers SHALL be hidden.
2. WHEN the viewport width is 375 px or less, THE Home Stat Bar SHALL render as a single-column stack with each stat item separated by a visible horizontal rule or border.
3. WHEN the viewport width is greater than 768 px, THE Home Stat Bar SHALL render as its existing five-column inline grid (`1fr auto 1fr auto 1fr`) with Stat Dividers visible.
4. THE Home Stat Bar responsive behaviour SHALL be implemented using Tailwind responsive prefix classes on the relevant elements in `app/page.tsx`, consistent with the component-level Tailwind strategy.

---

### Requirement 5 — ProductTypePage Responsive Layout

**User Story:** As a mobile or tablet user browsing product pages, I want every section to display in a readable single- or two-column layout without overflowing or requiring horizontal scrolling.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE KPI Strip inside `ProductTypePage` SHALL collapse from its dynamic `repeat(N, 1fr)` inline grid to a two-column grid wrapping into multiple rows.
2. WHEN the viewport width is 375 px or less, THE KPI Strip SHALL collapse to a single-column layout.
3. WHEN the viewport width is 768 px or less, THE Features & Upgrades section grid (`.grid-cols-2`) inside `ProductTypePage` SHALL collapse to a single-column stack.
4. WHEN the viewport width is 768 px or less, THE Related Types grid inside `ProductTypePage` (which uses an inline `repeat(N, 1fr)` style) SHALL collapse to a two-column grid.
5. WHEN the viewport width is 375 px or less, THE Related Types grid SHALL collapse to a single-column layout.
6. THE specifications table inside `ProductTypePage` SHALL be wrapped in a horizontally scrollable container so that table rows remain intact at any viewport width.
7. WHEN the viewport width is 768 px or less, THE fixed tab navigation bar SHALL remain scrollable horizontally within its container so all tab labels remain reachable without layout overflow.

---

### Requirement 6 — ProcessSection Responsive Layout

**User Story:** As a mobile user, I want the ProcessSection to present its content in a readable stacked layout so that both the left descriptive panel and the right timeline are fully visible.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE `ProcessSection` two-column grid (`grid-cols-[5fr_7fr]`) SHALL collapse to a single-column stack, with the left panel rendered above the right timeline panel.
2. WHEN the viewport width is 768 px or less, THE four-pillar card inside `ProcessSection` (`grid-cols-4`) SHALL collapse to a two-column grid.
3. WHEN the viewport width is 375 px or less, THE four-pillar card SHALL collapse to a single-column stack.
4. THE GSAP-animated timeline in `ProcessSection` SHALL remain functional after the layout collapses, with the animated line positioned correctly relative to the timeline step circles.

---

### Requirement 7 — IndustryCarousel Responsive Behaviour

**User Story:** As a mobile user, I want the IndustryCarousel to display correctly and remain swipeable so that I can browse all industries without layout breakage.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE `IndustryCarousel` card width SHALL use a viewport-relative size (such as `clamp(200px, 80vw, 260px)`) so that one to one-and-a-half cards are visible at a time on small screens.
2. THE `IndustryCarousel` track SHALL support touch-swipe scrolling on mobile devices via native CSS scroll snap without requiring any JavaScript pointer event changes.
3. WHEN the viewport width is 375 px or less, THE carousel edge spacer (`.ind-carousel-edge`) SHALL be reduced to at most `1rem` to maximise visible card area.
4. THE carousel progress bar and navigation controls SHALL remain visible and functional on all three breakpoints.

---

### Requirement 8 — Container and Section Spacing

**User Story:** As a mobile user, I want comfortable horizontal margins and vertical section spacing that make content readable at any screen size without wasteful whitespace or clipping.

#### Acceptance Criteria

1. WHEN the viewport width is 768 px or less, THE `.container` horizontal padding SHALL be `1.5rem` on each side.
2. WHEN the viewport width is 375 px or less, THE `.container` horizontal padding SHALL be `1rem` on each side.
3. WHEN the viewport width is 768 px or less, THE `.section` vertical padding SHALL be reduced to `4rem 0`.
4. WHEN the viewport width is 375 px or less, THE `.section` vertical padding SHALL be reduced to `3rem 0`.
5. THE `.nav-inner` SHALL share the same horizontal padding as `.container` at each breakpoint so that the logo and hamburger button align with page content.

---

### Requirement 9 — Inline Style Grid Override Safety

**User Story:** As a developer, I want inline `style` grid definitions to be safely overridden at small breakpoints so that no component can escape the responsive layout system.

#### Acceptance Criteria

1. WHEN the viewport width is 375 px or less, THE `globals.css` responsive hardening block SHALL override any element carrying a `style` attribute containing `grid-template-columns` to `minmax(0, 1fr)` using `!important`, except for elements explicitly excluded by class.
2. WHEN the viewport width is 768 px or less, THE `globals.css` responsive hardening block SHALL override inline `repeat(4, …)` and `repeat(3, …)` grid definitions to a two-column layout.
3. THE responsive hardening overrides SHALL be scoped to the canonical 375 px and 768 px breakpoints only, removing any existing overrides at 390 px, 420 px, or 640 px that duplicate this behaviour.

---

### Requirement 10 — Reduced-Motion and Accessibility

**User Story:** As a user with a preference for reduced motion, I want animations on all responsive layouts to be suppressed so that no layout-shift or motion-triggered discomfort occurs.

#### Acceptance Criteria

1. WHEN the `prefers-reduced-motion: reduce` media query is active, THE hero entrance animations (`.hero-eyebrow`, `.hero-home h1`, `.hero-home .lead`, `.hero-btns`, `.hero-visual`, `.trust-logos`) SHALL have their `animation` property set to `none` and `opacity` and `transform` reset to their final values.
2. WHEN the `prefers-reduced-motion: reduce` media query is active and the viewport width is 768 px or less, THE GSAP scroll-triggered animation in `ProcessSection` SHALL not play; the animated fill line SHALL be rendered at full height statically.
3. THE Hamburger Button and Mobile Nav Drawer close button SHALL each have a minimum touch target size of 44 × 44 px on mobile viewports.
