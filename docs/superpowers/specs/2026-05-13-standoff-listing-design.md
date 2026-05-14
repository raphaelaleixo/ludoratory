# Spec: Add "The Standoff" to the Specimen Catalog

## Goal

Surface **The Standoff** — a digital adaptation of *Cash'n Guns* — on the ludoratory landing page as a regular Specimen Catalog entry. The game has a public URL planned at `standoff.ludoratory.com`, a finished pirate-themed OG image, and is being treated as live (not "brewing").

## Scope

Pure content + asset addition. No code changes, no type changes, no UI affordances.

The existing pieces already cover everything needed:

- `SpecimenCatalog` filters `games` where `status !== "original"` and renders them via `GameCard`.
- `GameCard` already auto-references a `.webp` companion via `image.replace(/\.png$/, ".webp")`.
- `GameStatus` type already includes `"live"`.

## Files changed

1. **`src/content/site.json`** — append one entry to `games[]` (see "Entry shape" below).
2. **`public/og/standoff.png`** — new, copied from `../standoff/public/og.png` and recompressed.
3. **`public/og/standoff.webp`** — new, generated from the same source.

## Entry shape

Append as the **last** element of `games[]` (after `arcanepoker`). Reads as the newest specimen on the bench; in the Specimen Catalog grid (which filters out `arcanepoker`), it lands in the bottom-right of a clean 2×2 layout.

```json
{
  "id": "standoff",
  "name": "The Standoff",
  "inspiration": "Cash'n Guns (Maublanc, 2005)",
  "description": "Aim, bluff, duck — split the captain's hoard among the brave. A real-time standoff played on a shared screen, with your phone as the flintlock you point at your crewmates.",
  "players": "4–6 players",
  "status": "live",
  "url": "https://standoff.ludoratory.com",
  "repoUrl": "https://github.com/raphaelaleixo/react-standoff",
  "ogImage": "/og/standoff.png",
  "note": "bluff & duck"
}
```

Notes on the field choices:

- `name`: `"The Standoff"` — matches the public branding (OG image and `index.html` `<title>` in the standoff project both say "The Standoff"; bare "Standoff" is internal-only vocab).
- `inspiration`: matches existing convention — `Designer (Year)`.
- `repoUrl`: the standoff repo is `react-standoff` on GitHub, mirroring the `react-unmatched` precedent.
- `note`: short margin scribble in the same one-to-three-word register as the others (`"hidden roles"`, `"push your luck"`, `"co-op wordplay"`, `"rule-bending cards"`).

## Image processing

The source `standoff/public/og.png` is **1200×630, 96 KB** — heaviest among current OG assets. Targets for the ludoratory copy:

- **`standoff.png`** — keep 1200×630, recompress to land at **~50 KB** (in line with `arcanepoker.png` 56 KB, `krimi.png` 65 KB, `unmatched.png` 47 KB).
- **`standoff.webp`** — same dimensions, target **~15 KB** (in line with peer `.webp` companions: 9–20 KB).

Keeping the 1200×630 dimensions preserves dual-purpose use (the file remains a valid OG share image at OG spec aspect). The original `og.png` in the standoff project itself is **not** modified — that's authoritative for that project's social shares.

Tool choice is left to implementation. Neither `cwebp` nor `pngquant` is currently in `PATH` on this machine, so the implementation step may need to install one of:

- `brew install webp pngquant` — standard CLI path, matches what produced the existing peer assets (the May 2026 batch was a 128-color palette recompression, characteristic of `pngquant`).
- A one-shot `npx`-able tool with no install footprint, if equivalent quality is achievable.

Verify final byte sizes against the targets above before committing.

## Out of scope

- Any UI treatment for non-`live` statuses (`"in-trials"`, `"brewing"`). The `GameStatus` type already lists them, but they remain unused; wiring them up is a separate design.
- Any change to `LabOriginals` (Standoff is an adaptation, not a Lab Original).
- Any change to the standoff project itself.
- Updating ludoratory's own OG meta image, hero copy, or thesis text to reference Standoff. (The thesis already covers "some build on existing games" — Standoff fits without rewording.)

## Acceptance check

Once shipped:

1. `site.json` validates against `SiteContent` (tsc passes).
2. Specimen Catalog renders Standoff as the fourth card, in bottom-right on desktop.
3. Card image swaps to `standoff.webp` on WebP-capable browsers; falls back to `standoff.png` otherwise.
4. Hover shows the "Play now ↗" overlay; click opens `standoff.ludoratory.com` in a new tab.
5. The "code ↗" link goes to `github.com/raphaelaleixo/react-standoff`.
6. New asset weights: `standoff.png` ≤ ~60 KB, `standoff.webp` ≤ ~20 KB.
