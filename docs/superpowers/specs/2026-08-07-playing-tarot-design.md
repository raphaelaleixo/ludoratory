# Lab Note: "Playing Tarot" — Design

A new Ludoratory lab note about **Arcane Poker** (`../arcanepoker/`), told
through a Ludoratory lens: the tarot deck was built to play a game, kept that
job for ~340 years, then had divination bolted onto it in 1781 — and Arcane
Poker gives the deck its original job back.

## Goal

Not a feature announcement for Arcane Poker. An essay that makes one argument
— *tarot is a game deck; fortune-telling is the later mod* — and then shows
what giving it its job back looks like as a design problem: trumps that
override **rules** rather than cards.

The note ends on the game card, so a reader who buys the argument can go play
the thing.

## Title

**Playing Tarot** (user's own). It reads as a category error in English —
which is precisely the thesis — while being an unremarkable sentence in French
or Italian, which is the other half of the point.

Known cost: the Lab Notes index renders title + date only, so the listing
gives no hint this is about poker or about a game built here. Accepted trade
for the hook; the Ligas do Brasil note's title didn't advertise its simulator
either.

## Spine

A trump is structurally a card that overrides the normal rule. The Major
Arcana *are* the ancestor of trumps — English "trump" descends from *trionfi*.
Poker's rules are the most settled in card games, which is what makes it
readable. So the restoration move is not to beat a card with a trump, but to
beat the **ruleset** for one round.

## Verified historical claims

All of these were checked before drafting. State them plainly in the body with
no citations (house style — the Ligas note does the same).

- Tarot decks were created **1430–1450** in northern Italy (Milan, Ferrara,
  Bologna) by adding allegorical trump cards to a standard four-suit pack.
  Called *carte da trionfi*; the added cards were *trionfi*.
- First documentary evidence: a written statement in **Florence court records,
  1440**.
- *Trionfi* → **"trumps"** in English.
- Decks of that era were made specifically to play the trick-taking game of
  **tarocchi**.
- Divination association begins in the **18th century**. Antoine Court de
  Gébelin, Parisian freemason, publishes volume 8 of *Monde Primitif* in
  **1781** with an article claiming Egyptian origins for the deck.
- Tarot is **still played as a card game** — French Tarot, 78 cards, **14 per
  suit** (Roi, Dame, Cavalier, Valet, 10…1).
- The **Excuse** (the Fool) may be played *in lieu of following suit* — a card
  whose function is exemption from the rule.

### Claims to state carefully, not overclaim

- Arcane Poker's 56-card playing deck is the same size as the tarot minor
  arcana (4 × 14) but is **arrived at differently**: it adds a **Page at value
  0**, where historical tarot keeps the **Knight** that the 52-card French deck
  dropped. Say this honestly; do not imply the Knight was restored.
- The 1781 section is **not** a takedown of divination. The honest observation
  is that the mod won — it became the only thing most anglophone readers know
  the deck for — while the game kept running elsewhere.

## Structure (~1000–1150 words, 6 sections)

1. **Florence, 1440.** A line in a court ledger for *carte da trionfi*. The
   deck people keep next to the crystals was, first, equipment — something
   bought to play with.
   - `<NoteUp>`: *"a receipt, not a prophecy"*
2. **Trionfi → trumps.** The word in a Bridge game is this deck's fossil. The
   Major Arcana weren't symbols to be interpreted; they were the cards that
   beat other cards. Establishes what a trump structurally *is*: a card that
   overrides the normal rule.
3. **1781.** Court de Gébelin invents an Egyptian past out of thin air, and it
   sticks. Meanwhile France and Italy never stop playing. The deck now does two
   jobs, and the anglophone world only knows about one of them.
   - `<NoteDown>`: *"340 years a game, then one bad footnote"*
4. **Trumps that beat rules.** The design move. Poker's rules are settled to
   the point of being furniture, so the Arcana override the ruleset for one
   round rather than beating a card: Strength inverts every rank, the Hermit
   deletes the board, the Emperor collapses hands to high card, Death ends the
   round where it stands. Then the two restoration details from "state
   carefully" above — 14 ranks a suit, and the Fool as absolute wildcard, which
   is what the Excuse always did.
5. **The counterweight.** Rules-as-a-variable is a solvent: enough of it and
   skill stops mattering. What holds it together is that exactly **one** Arcana
   fires per round, and the trigger is a **Page turned face-up on the board** —
   visible, bettable, seen coming.
   - Pull-quote (`blockquote`): **A trump you can't see isn't a rule, it's
     weather.**
6. **Both jobs, one table.** At showdown the game deals a reading of the hand
   just played. The 1781 layer stays — demoted to what it always was: flavor on
   top of equipment. Then the game card.

## Copy decisions

- First person throughout, consistent with existing lab notes.
- Exactly **2** handwritten margin notes (§1, §3). No third.
- Exactly **1** pull-quote, the "weather" line in §5.
- No citations, footnotes, or link-outs in the body.
- Cut from an earlier draft of this design: a section on "why not just rebuild
  tarocchi." The user never considered building the historical trick-taking
  game, so presenting it as a rejected fork would be invented deliberation.

## Authoring mechanics

- File: `src/content/lab-notes/2026-08-07-playing-tarot.md`
- First `# Heading` becomes the title; date comes from the filename.
- OG card generated via `npm run build:og` → `public/og/notes/playing-tarot.png`
- No new image assets: the game card reuses the existing `/og/arcanepoker.png`.
- No component changes. Everything this note needs already exists
  (`<NoteUp>`, `<NoteDown>`, `blockquote`, `<GameCard>`).

## Card data

```
<GameCard
  name="Arcane Poker"
  image="/og/arcanepoker.png"
  url="https://arcanepoker.ludoratory.com"
  repoUrl="https://github.com/raphaelaleixo/arcanepoker"
  players="solo"
  note="trumps, restored"
>
  Texas Hold'Em played with a 56-card tarot deck, where every Page on the board
  draws a Major Arcana that rewrites the rules of the round.
</GameCard>
```

`ctaLabel` is left at its default ("Play now ↗"), which is correct here.
