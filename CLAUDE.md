# CLAUDE.md

## Project Status

The apex landing page for `ludoratory.com`. **Not a multi-device game** — a static studio site.

## Deliberate deviations from `Projects/CLAUDE.md`

- **Bootstrapped from fresh Vite (`npm create vite@latest`), not `_template/`.** The template is built around `react-gameroom`, Firebase, i18next, and room/player routes — none of which a static landing page needs.
- **No `react-gameroom`, no `firebase`, no `i18next`.** English-only, no rooms, no realtime backend.
- **Adds `@mdx-js/rollup` + `@mdx-js/react`.** Set up at bootstrap so future per-game case studies (or a `/notes` section) can author content as MDX. Not used by v1 sections.

## Content authoring

All editable copy lives in **`src/content/site.json`**. Edit that file to change hero copy, game descriptions, house rules, or footer links. The page reflows.

## Visual identity

Mad-scientist workshop: dark canvas, neon accents, tilted "specimen" cards with tape labels and Caveat-font margin scribbles. Spec: `../brainstorms/ludoratory/2026-04-29-landing-page-design.md`.
