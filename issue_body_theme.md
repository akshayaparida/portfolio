# Task Issue: Setup Tailwind v4 Theme and Typography

## Summary

Establish the foundational styling for the new design by configuring Tailwind CSS v4 variables and integrating the required fonts. This is the prerequisite for all other UI components.

## Current State

- Uses legacy Tailwind v3 config.
- Fonts: Eczar and Grenze.
- Colors: Defined in `globals.css` without the new palette variables.

## Recommendation

- Update `src/app/globals.css` to use Tailwind v4 `@theme` block.
- Define CSS variables for the color palette (Primary: `#10b981`, Backgrounds: `#fafafa`/`#0f172a`).
- Replace current fonts with **Inter** (Sans) and **Space Grotesk** (Display).

## Implementation Steps

1. Import `Inter` and `Space_Grotesk` in `src/app/layout.tsx`.
2. Define `--font-inter` and `--font-space-grotesk` variables.
3. Rewrite `src/app/globals.css` to use the `@theme` directive.

## Priority

High
