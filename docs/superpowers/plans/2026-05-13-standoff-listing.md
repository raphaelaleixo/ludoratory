# Add "The Standoff" to Specimen Catalog — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new Specimen Catalog entry for *The Standoff* on the ludoratory landing page — one JSON entry plus two image assets — so the card renders correctly and weighs in line with peer assets.

**Architecture:** Content + asset addition only. No source code, type, or component changes — `SpecimenCatalog` and `GameCard` already handle everything based on `site.json` data and the `<picture>` swap convention (`.png` → `.webp`).

**Tech Stack:** Static JSON edit. Image processing via `pngquant` (PNG palette compression) and `cwebp` (Google WebP encoder), matching the toolchain that produced the existing peer OG assets.

**Spec:** `docs/superpowers/specs/2026-05-13-standoff-listing-design.md`

---

## File map

- **Modify:** `src/content/site.json` — append one element to `games[]`
- **Create:** `public/og/standoff.png` — recompressed copy of `../standoff/public/og.png`
- **Create:** `public/og/standoff.webp` — WebP companion at the same dimensions

No source files change. No tests are added — the codebase has no `site.json` content tests, and `vitest` runs with `--passWithNoTests`. Verification is type-check + visual.

---

### Task 1: Verify image tooling is available

**Files:** none — environment check.

- [ ] **Step 1: Check for `pngquant` and `cwebp`**

Run:
```bash
which pngquant cwebp
```

Expected: both paths printed. If either is missing, run:
```bash
brew install pngquant webp
```

The `webp` Homebrew formula provides `cwebp`. These are the same tools that produced the existing peer assets (the May 2026 commit `e1ef423` recompressed `unmatched.png` to a 128-color palette — characteristic of `pngquant` — and added matching `.webp` companions).

- [ ] **Step 2: Confirm source file exists at expected dimensions**

Run:
```bash
file /Users/raphaelavellar/Documents/Projects/standoff/public/og.png
ls -la /Users/raphaelavellar/Documents/Projects/standoff/public/og.png
```

Expected:
```
PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced
... 95974 ...og.png
```

If the source has been changed (different dimensions or much different size), re-check the spec targets — they were calibrated against this exact source file.

---

### Task 2: Generate the optimized `standoff.png`

**Files:**
- Create: `public/og/standoff.png` (in ludoratory)
- Source (read-only): `../standoff/public/og.png`

- [ ] **Step 1: Recompress with `pngquant`**

Run from the ludoratory project root:
```bash
pngquant --quality=70-90 --speed 1 --force \
  --output public/og/standoff.png \
  ../standoff/public/og.png
```

Flags:
- `--quality=70-90` — accept output if it lands in this quality band; reject otherwise (matches the band that produced the peer assets in the 27–65 KB range).
- `--speed 1` — slowest, best compression. Sub-second on a 1200×630 PNG.
- `--force` — overwrite if rerunning.

Expected: command exits 0, no output. If it fails with "image quality too low", widen the band: `--quality=60-90`.

- [ ] **Step 2: Verify byte size and dimensions**

Run:
```bash
file public/og/standoff.png
ls -la public/og/standoff.png
```

Expected:
- Dimensions: `1200 x 630`
- Byte size: **≤ 60 KB** (target ~50 KB; spec allows up to 60 KB to stay in line with `arcanepoker.png` 56 KB and `krimi.png` 65 KB).

If size is over 60 KB, lower the quality band (`--quality=60-85`) and rerun Step 1. If the file is unexpectedly tiny (< 20 KB), inspect it visually — palette quantization may have crushed the dark gradient backgrounds. Open the file in Preview and check the skull and text are still crisp.

---

### Task 3: Generate the `standoff.webp` companion

**Files:**
- Create: `public/og/standoff.webp` (in ludoratory)
- Source (read-only): `../standoff/public/og.png`

The WebP is generated from the **original** source PNG (not the recompressed PNG from Task 2), so it gets full-quality input. This is what `GameCard` actually serves to most browsers via the `<picture>` `<source type="image/webp">` swap.

- [ ] **Step 1: Encode with `cwebp`**

Run from the ludoratory project root:
```bash
cwebp -q 80 \
  ../standoff/public/og.png \
  -o public/og/standoff.webp
```

Expected output ends with a line like:
```
File:      public/og/standoff.webp
Dimension: 1200 x 630
Output:    NNNN bytes ...
```

- [ ] **Step 2: Verify byte size and dimensions**

Run:
```bash
file public/og/standoff.webp
ls -la public/og/standoff.webp
```

Expected:
- Dimensions: `1200 x 630`
- Byte size: **≤ 20 KB** (target ~15 KB; peer `.webp` companions are 9–20 KB).

If over 20 KB, drop quality: `cwebp -q 75 ...` then rerun. If still over, try `-q 70`. If under 8 KB, inspect visually for artifacts (especially around the skull edge and the title text).

---

### Task 4: Append the Standoff entry to `site.json`

**Files:**
- Modify: `src/content/site.json` — append one element to `games[]` (the array that runs from line 17 to line 66 in the current file).

- [ ] **Step 1: Locate the insertion point**

Open `src/content/site.json`. Find the closing of the `arcanepoker` entry — it's the last element of `games[]`, ending with `}` on line 65, followed by `]` on line 66 closing the array. Insert a comma after the `arcanepoker` closing brace, then add the new entry before the array's closing `]`.

- [ ] **Step 2: Apply the edit**

Use the Edit tool to change:

```json
      "note": "rule-bending cards"
    }
  ],
```

to:

```json
      "note": "rule-bending cards"
    },
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
  ],
```

Notes:
- The em-dashes in `description` (`—`) and the en-dash in `players` (`4–6`) are intentional — they match the typography used elsewhere in `site.json` (e.g. `"5–12 players"`, `"web-based word game where great minds mustn't think alike"`).
- `name` is `"The Standoff"` (with article), matching the standoff project's `index.html` `<title>` and the OG image.
- `repoUrl` ends in `react-standoff`, mirroring the `react-unmatched` precedent.

- [ ] **Step 3: Validate JSON syntax**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/site.json', 'utf8')); console.log('OK')"
```

Expected: `OK`. If it errors, the most common cause is a missing or extra comma around the insertion point.

---

### Task 5: Type-check and build

**Files:** none — verification.

- [ ] **Step 1: Run the build**

Run:
```bash
npm run build
```

Expected: exits 0. The build runs `tsc -b && vite build && node scripts/rewrite-og-html.mjs`, so this validates that the new entry conforms to the `SiteContent` / `Game` types in `src/types.ts` (e.g. all required fields present, `status` is one of `"live" | "in-trials" | "original" | "brewing"`).

If `tsc` complains, the new entry is missing a required `Game` field or has a typo. Re-check Task 4 Step 2 against the type defined in `src/types.ts` lines 9–20.

If `rewrite-og-html.mjs` errors, that script is unrelated to the games list (it rewrites OG meta for note pages) — but read the error before continuing.

---

### Task 6: Visual check in the dev server

**Files:** none — manual verification against the spec's acceptance check.

- [ ] **Step 1: Start the dev server**

Run:
```bash
npm run dev
```

Note the URL printed (e.g. `http://localhost:5173/`).

- [ ] **Step 2: Verify the Specimen Catalog now shows 4 cards**

Open the URL in a browser. In the **Specimen Catalog** section (the second section, below the hero), confirm:

1. There are now four cards: Krimi, Colorlition, Unmatched, **The Standoff**.
2. On a desktop-width window (≥ md breakpoint), they form a clean 2×2 grid; The Standoff is bottom-right.
3. The Standoff card image renders the pirate OG (skull + flags + "the standoff" wordmark + tagline + URL).
4. The card title reads **"The Standoff"**.
5. The inspiration line below the title reads `↳ Cash'n Guns (Maublanc, 2005)`.
6. The margin-scribble note (top-right of the card body) reads `bluff & duck` in the Caveat hand-drawn font.
7. The footer shows `4–6 PLAYERS` on the left and `code ↗` on the right.

- [ ] **Step 3: Verify the WebP swap**

Open browser DevTools → Network → filter for "standoff". Reload the page. Confirm the request that loads is `standoff.webp`, not `standoff.png`. (All modern browsers support WebP, so the `<picture>` should always pick it.)

- [ ] **Step 4: Verify links**

Hover the card image — the dark "Play now ↗" overlay chip should fade in. Click it (or open in a new tab) — should navigate to `https://standoff.ludoratory.com`. Click the `code ↗` footer link — should open `https://github.com/raphaelaleixo/react-standoff` in a new tab.

If `standoff.ludoratory.com` is not yet deployed, the navigation will land on a placeholder or 404 — that's expected and not blocking; the link is correct.

- [ ] **Step 5: Stop the dev server**

Ctrl-C in the terminal running `npm run dev`.

---

### Task 7: Commit

**Files:** stage the new and modified files only.

- [ ] **Step 1: Confirm with the user before committing**

Per the project's git safety protocol, ask the user whether to commit before running `git commit`. If approved, proceed to Step 2.

- [ ] **Step 2: Stage the four files**

Run:
```bash
git add public/og/standoff.png public/og/standoff.webp src/content/site.json \
  docs/superpowers/specs/2026-05-13-standoff-listing-design.md \
  docs/superpowers/plans/2026-05-13-standoff-listing.md
```

The two `docs/superpowers/` files are the spec and this plan — both new and worth committing alongside the change.

Run `git status` to confirm only those five files are staged. If anything else has appeared, investigate before committing.

- [ ] **Step 3: Commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat(catalog): add The Standoff specimen

Pirate-themed adaptation of Cash'n Guns. Listed as live; URL points
to standoff.ludoratory.com. OG asset recompressed to match peer
weights (PNG ~50KB, WebP ~15KB).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds. If a pre-commit hook fails (the project doesn't appear to have one, but verify), fix the underlying issue and create a **new** commit — do not `--amend`.

- [ ] **Step 4: Verify post-commit state**

Run:
```bash
git status
git log -1 --stat
```

Expected: clean working tree, the new commit lists exactly the five staged files.
