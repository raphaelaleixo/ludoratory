# Per-note OG cards

Every lab note now ships with its own social card. Drop a markdown file in `src/content/lab-notes/`, run `npm run build:og`, and the title gets rendered into a 1200×630 PNG using the same template as the site card.

The PNG generation runs locally — Vercel just serves the static file. The build step on Vercel is pure file shuffling: it clones the root `index.html` into `dist/lab-notes/<slug>/index.html` and rewrites the `og:*` and `twitter:*` meta tags to point at the per-note image. No headless browser at deploy time.

Paste this URL into Slack or post it on Bluesky to confirm the unfurl picks up the right card.
