# Prefers-reduced-motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Soften Mantle Flex animation and transition utilities under `prefers-reduced-motion: reduce` by capping durations at 150ms and forcing infinite animations to play once.

**Architecture:** Add a dedicated `_reducedmotion.scss` partial that overrides only Mantle Flex utility/named-animation classes inside `@media (prefers-reduced-motion: reduce)`. Import it last in `primeflex.scss` so overrides win. Do not rewrite keyframes or use a global `*` selector.

**Tech Stack:** Sass (Dart Sass via `sass` CLI), existing Mantle Flex utility class generation (`$prefix`, `!important` via `style-class`), Next.js docs site.

**Spec:** `docs/superpowers/specs/2026-07-28-prefers-reduced-motion-design.md`

## Global Constraints

- Soften motion (cap), do not hard-disable
- Cap duration: `150ms` via `$reducedMotionDuration: 150ms !default`
- Scope: Mantle Flex classes only (no universal selector)
- Keep transforms/keyframes unchanged
- Force `animation-iteration-infinite` → `1`
- Overrides must use `!important` to beat existing duration utilities
- No opt-out class in v1
- No interactive reduced-motion demo in v1

---

## File Structure

| File | Responsibility |
|---|---|
| `styles/lib/core/_reducedmotion.scss` | Media-query overrides for duration + infinite iteration |
| `styles/lib/primeflex.scss` | Import `_reducedmotion` after `_animation` |
| `pages/animations/index.js` | Doc intro note about reduced motion |
| `pages/animationduration/index.js` | Doc intro note about duration capping |
| `pages/transitionduration/index.js` | Doc intro note about transition capping |

---

### Task 1: Reduced-motion SCSS overrides

**Files:**
- Create: `styles/lib/core/_reducedmotion.scss`
- Modify: `styles/lib/primeflex.scss`

**Interfaces:**
- Consumes: `$prefix` from `styles/lib/core/_variables.scss` (already imported by `primeflex.scss`)
- Produces: `$reducedMotionDuration` (`150ms` default); media-query rules for duration utilities, named long animations, and infinite iteration

- [ ] **Step 1: Create `_reducedmotion.scss`**

Create `styles/lib/core/_reducedmotion.scss` with this exact content:

```scss
$reducedMotionDuration: 150ms !default;

@media (prefers-reduced-motion: reduce) {
    .#{$prefix}animation-duration-200,
    .#{$prefix}animation-duration-300,
    .#{$prefix}animation-duration-400,
    .#{$prefix}animation-duration-500,
    .#{$prefix}animation-duration-1000,
    .#{$prefix}animation-duration-2000,
    .#{$prefix}animation-duration-3000 {
        animation-duration: $reducedMotionDuration !important;
    }

    .#{$prefix}transition-duration-200,
    .#{$prefix}transition-duration-300,
    .#{$prefix}transition-duration-400,
    .#{$prefix}transition-duration-500,
    .#{$prefix}transition-duration-1000,
    .#{$prefix}transition-duration-2000,
    .#{$prefix}transition-duration-3000 {
        transition-duration: $reducedMotionDuration !important;
    }

    .#{$prefix}slidedown,
    .#{$prefix}slideup,
    .#{$prefix}animate-width {
        animation-duration: $reducedMotionDuration !important;
    }

    .#{$prefix}animation-iteration-infinite {
        animation-iteration-count: 1 !important;
    }
}
```

- [ ] **Step 2: Import the partial last in `primeflex.scss`**

In `styles/lib/primeflex.scss`, after the `_animation` import, add:

```scss
@import './core/_reducedmotion';
```

The end of the import list should look like:

```scss
@import './core/_transition';
@import './core/_transform';
@import './core/_animation';
@import './core/_reducedmotion';
@import './core/_utils';
```

(`_utils` may remain last if it already is — place `_reducedmotion` immediately after `_animation` and before `_utils`.)

- [ ] **Step 3: Build the library CSS**

Run:

```bash
npm run build:sass
```

Expected: exit code 0; writes/updates `dist-lib/primeflex.css` (and minified sibling).

If `dist-lib` is missing or the script fails because of prior steps, run:

```bash
npx sass --update styles/lib/primeflex.scss:dist-lib/primeflex.css --no-source-map
```

Expected: exit code 0.

- [ ] **Step 4: Verify media-query output**

Run (PowerShell):

```powershell
Select-String -Path dist-lib/primeflex.css -Pattern "prefers-reduced-motion" -Context 0,25
```

Expected matches in the output CSS:

- `@media (prefers-reduced-motion: reduce)`
- `.animation-duration-200` (and other capped animation duration classes) with `animation-duration: 150ms !important`
- `.transition-duration-200` (and other capped transition duration classes) with `transition-duration: 150ms !important`
- `.slidedown`, `.slideup`, `.animate-width` with `animation-duration: 150ms !important`
- `.animation-iteration-infinite` with `animation-iteration-count: 1 !important`

Also confirm these are **not** overridden in the media query:

- `.animation-duration-100`
- `.animation-duration-150`
- `.transition-duration-100`
- `.transition-duration-150`

- [ ] **Step 5: Commit**

```bash
git add styles/lib/core/_reducedmotion.scss styles/lib/primeflex.scss
git commit -m "feat: soften animations under prefers-reduced-motion"
```

---

### Task 2: Documentation notes

**Files:**
- Modify: `pages/animations/index.js`
- Modify: `pages/animationduration/index.js`
- Modify: `pages/transitionduration/index.js`

**Interfaces:**
- Consumes: reduced-motion behavior from Task 1 (150ms cap, infinite → once)
- Produces: short intro copy on three doc pages (no new components)

- [ ] **Step 1: Update Animations intro**

In `pages/animations/index.js`, replace the intro paragraph:

```jsx
<p>A variety of animations are available to be used when an element enters or leaves.</p>
```

with:

```jsx
<p>
    A variety of animations are available to be used when an element enters or leaves. When{' '}
    <code>prefers-reduced-motion: reduce</code> is active, Mantle Flex caps animation durations at 150ms and forces
    infinite animations to run once.
</p>
```

- [ ] **Step 2: Update Animation Duration intro**

In `pages/animationduration/index.js`, replace:

```jsx
<p>Defines how long an animation should take to complete.</p>
```

with:

```jsx
<p>
    Defines how long an animation should take to complete. Under{' '}
    <code>prefers-reduced-motion: reduce</code>, utilities above 150ms are capped at 150ms.
</p>
```

- [ ] **Step 3: Update Transition Duration intro**

In `pages/transitionduration/index.js`, replace:

```jsx
<p>Defines how long a transition should take to complete.</p>
```

with:

```jsx
<p>
    Defines how long a transition should take to complete. Under{' '}
    <code>prefers-reduced-motion: reduce</code>, utilities above 150ms are capped at 150ms.
</p>
```

- [ ] **Step 4: Sanity-check docs pages compile**

Run:

```bash
npm run lint
```

Expected: exit code 0 (or no new lint errors in the three edited files).

- [ ] **Step 5: Commit**

```bash
git add pages/animations/index.js pages/animationduration/index.js pages/transitionduration/index.js
git commit -m "docs: note prefers-reduced-motion duration capping"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|---|---|
| Cap animation-duration utilities >150ms | Task 1 |
| Cap transition-duration utilities >150ms | Task 1 |
| Cap slidedown / slideup / animate-width | Task 1 |
| Infinite → once | Task 1 |
| Keep keyframes/transforms | Task 1 (no keyframe edits) |
| `$reducedMotionDuration` !default | Task 1 |
| Import after animation/transition | Task 1 |
| Docs note | Task 2 |
| Build verification | Task 1 Steps 3–4 |
| No `*` selector / no opt-out / no demo | Honored by omission |
