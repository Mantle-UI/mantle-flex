# Prefers-reduced-motion design

**Issue:** [Mantle-UI/mantle-flex#44](https://github.com/Mantle-UI/mantle-flex/issues/44)  
**Date:** 2026-07-28  
**Status:** Approved for implementation planning

## Goal

Respect the CSS media feature `prefers-reduced-motion: reduce` for Mantle Flex animation and transition utilities by **softening** motion (shorter duration, no infinite loops) rather than hard-disabling it.

## Decisions

| Topic | Choice |
|---|---|
| Strategy | Soften (cap duration), do not disable |
| Duration cap | `150ms` |
| Transforms / keyframes | Unchanged |
| Infinite animations | Force play once |
| Scope | Mantle Flex utility classes only |
| Transitions | Cap durations above 150ms at 150ms |
| Opt-out class | Out of scope for v1 |

## Behavior

When `@media (prefers-reduced-motion: reduce)` matches:

1. **Animation duration utilities** above 150ms (`animation-duration-200` … `animation-duration-3000`) resolve to `150ms`. Classes already ≤150ms (`*-100`, `*-150`) stay as-is.
2. **Transition duration utilities** above 150ms (`transition-duration-200` … `transition-duration-3000`) resolve to `150ms`. Same rule for ≤150ms classes.
3. **Named animation classes** whose default duration exceeds the cap are capped:
   - `slidedown` / `slideup` (`.45s`) → `150ms`
   - `animate-width` (`1000ms`) → `150ms`
   - Named animations already at `.15s` need no change.
4. **`animation-iteration-infinite`** → `animation-iteration-count: 1`.
5. Keyframes and transforms are **not** rewritten.

## Non-goals (v1)

- Global `*` / universal selector overrides
- Rewriting keyframes to opacity-only fades
- Opt-out utility (e.g. `motion-safe`)
- Changing delay utilities
- Interactive docs demo of reduced motion

## Implementation

### File layout

- Add `styles/lib/core/_reducedmotion.scss`
- Import it last in `styles/lib/primeflex.scss` (after `_animation` and `_transition`) so overrides win cascade order

### Override rules

Redeclare only affected prefixed classes inside the media query. Use `!important` to match existing `style-class` duration utilities:

```scss
$reducedMotionDuration: 150ms !default;

@media (prefers-reduced-motion: reduce) {
  // animation-duration-* and transition-duration-* above the cap → $reducedMotionDuration
  // .slidedown, .slideup, .animate-width → animation-duration: $reducedMotionDuration
  // .animation-iteration-infinite → animation-iteration-count: 1
}
```

### Sass configurability

Expose `$reducedMotionDuration: 150ms !default` so Sass consumers can retune the cap when compiling from source.

### Documentation

Add a short note on the Animations and/or Transition Duration doc pages describing that under `prefers-reduced-motion: reduce`, Mantle Flex caps utility durations at 150ms and forces infinite animations to run once.

### Verification

- `npm run build:lib` (or equivalent Sass build) succeeds
- Built `dist-lib/primeflex.css` contains the media query and expected selectors

## Edge cases

- Duration utilities already emit `!important`; reduced-motion overrides must also use `!important` to win.
- When a named animation class is combined with `animation-duration-*`, the capped utility value applies under reduce.
- App-owned CSS, inline styles, and non-Mantle classes are unaffected.
