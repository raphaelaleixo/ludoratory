# Lab Note: "The Closed Laboratory" — Design

A new Ludoratory lab note about the **Ligas do Brasil** project
(`../futebol-br/`), told through a Ludoratory lens: football as a designed
system whose rules were quietly edited until the machine that produced the
joy stopped working.

## Goal

Present the *idea* behind Ligas do Brasil — a structural reform of Brazilian
football (six regional leagues + a Champions-League-style Copa dos Campeões)
— not as a full re-argument of the manifesto, but as a short reflective essay
that reframes the reform as a game-design problem. The full argument and data
live on the project's own site; this note is the lens-first companion that
sends readers there.

Audience note: the futebol-br manifesto is entirely in Portuguese. This lab
note is an English piece *about* it.

## Spine

Football's competitive structure is a game — rules, incentives, emergent
behavior. Nobody designed "the machine that forges stars" on purpose; it
emerged. In 2003 someone edited the rules (imported the European
points-corridos format, killed the interstate cups) without noticing they'd
switched the laboratory off. The reform is a rules patch to reopen it.

The title "The Closed Laboratory" is the manifesto's own metaphor
(*"O laboratório fechado"*) and deliberately rhymes with *Ludoratory*.

## Authoring mechanics (established pipeline)

- File: `src/content/lab-notes/2026-07-24-the-closed-laboratory.md`
- First `# Heading` becomes the title; date comes from the filename.
- Post images (if any) live in `public/lab-notes/the-closed-laboratory/`.
- OG card generated via `npm run build:og` → `public/og/notes/`.
- Available MDX components: `<NoteUp>` / `<NoteDown>` (Caveat margin
  scribbles with arrow), styled `blockquote` (Caveat magenta pull-quote),
  wide images (`"wide"` title), `<GameCard>`.

## Structure (~800–900 words, 5 sections)

1. **Cold open — the specimens.** Romário from Olaria, Ronaldo from
   São Cristóvão, Rivaldo from Mogi Mirim. Brazil's greatest players were
   grown in tiny clubs that today have no national stage. Plants the word
   *laboratory* before defining it.
   - `<NoteUp>`: *"forged in clubs that vanish from the calendar by April"*
2. **The system nobody designed on purpose.** The Ludoratory turn: a league
   structure is a game. Nobody engineered the star-forging machine; it
   emerged. Then 2003 edited the rules without playtesting the change.
   - `<NoteDown>`: *"nobody playtested this patch"*
3. **The lab, closed, in numbers.** Two or three beats only (not the full
   table): post-2003 the curves turn — 18 years without a Ballon d'Or,
   average export age dropping to 19. The machine still spins money; it just
   stopped producing the thing it existed for.
   - Pull-quote (`blockquote`): **Population was never the bottleneck. The
     architecture was.** (from *"População nunca foi o gargalo; a
     arquitetura era."*)
4. **The redesign.** The proposal in one breath: six regional leagues (each
   the population of a European country) + a Champions-League-style Copa dos
   Campeões. Framed as a rules patch to reopen the lab — not more money,
   better distribution. The "continental-scale competition" idea lives in
   body prose here (not a margin note).
5. **Close + the lab card.** Tie back to "understand fun by building it": I
   tried to understand a system by proposing how to rebuild it — and built a
   simulator to check the new rules hold (216 clubs, a full season, 47 weeks
   that close). Then the project card.

## Copy decisions

- **Translate *craque* → *star*** in prose (no untranslated loanword).
- Exactly **2 handwritten notes** (§1, §2). No third.
- One pull-quote, the "architecture" thesis line above.

## Component change: `GameCard` gets a `ctaLabel` prop

The card at §5 features Ligas do Brasil, but `GameCard`'s image overlay
hardcodes **"Play now ↗"**, which is wrong for a manifesto/simulator. This is
Ludoratory's own component (not `react-gameroom`), so we extend it:

- Add optional `ctaLabel?: string` to `GameCardProps`, default `"Play now ↗"`.
- The overlay chip renders `ctaLabel` instead of the hardcoded string.
- In this note, pass `ctaLabel="Read the manifesto ↗"`.
- The `players` field is already optional and will be omitted for this card.
- `repoUrl` points at the futebol-br repo for the "code ↗" footer link.

No other call sites change (existing cards fall through to the default).

## Card data

```
<GameCard
  name="Ligas do Brasil"
  image="/lab-notes/the-closed-laboratory/ligas-do-brasil.png"
  url="https://raphaelaleixo.github.io/ligas-do-brasil/"
  ctaLabel="Read the manifesto ↗"
  note="reopen the lab"
>
  A manifesto — and the season simulator that backs it — for restructuring
  Brazilian football into six regional leagues and one open national cup.
</GameCard>
```

Card image: reuse/adapt the project's existing OG card (`assets/img/og.png`
in futebol-br) at 1200×630, placed in the post's public image folder. Provide
**both** `ligas-do-brasil.png` and `ligas-do-brasil.webp` — `GameCard` emits a
`<source>` for the `.webp` sibling.

## Out of scope

- No specimen-card component (considered, deferred — option B).
- No re-argument of the full manifesto; link out instead.
- No Portuguese version.
