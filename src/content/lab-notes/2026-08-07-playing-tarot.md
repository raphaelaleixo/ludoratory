# Playing Tarot

The first time tarot cards show up in the written record, it isn't a prophecy. It's paperwork. A line in the records of a Florentine court, 1440, noting the existence of *carte da trionfi* — cards of triumphs. Somewhere in northern Italy in those years, in Milan or Ferrara or Bologna, somebody took an ordinary four-suit pack and added a row of allegorical cards on top of it: a fool, a magician, a hanged man, a tower coming apart. Death, in the thirteenth position.

They did it to play a game.

<NoteUp>a receipt, not a prophecy</NoteUp>

The game was tarocchi, and it was trick-taking — the same family as Whist, Bridge, Sueca, the games your grandparents played on a kitchen table. The allegorical cards weren't there to be interpreted. They were there to win tricks. Whatever suit was led, a triumph beat it.

## The word is a fossil

*Trionfi* wore down, over centuries and across languages, into a word you already know. **Trump.** Every time somebody at a card table names a suit as trumps, they are using a word this deck put into English.

That's worth sitting with, because it means the Major Arcana are not a mystical system that a card game was later built around. They are the cards that beat other cards, so completely and so memorably that they gave the language its term for the concept.

And it's worth being precise about what a trump actually is, structurally, because the whole of Arcane Poker comes out of this one observation. A trump is not a high card. Its power isn't numeric — it's jurisdictional. The rule says *follow the suit that was led*, and the trump is the card the rule doesn't apply to. It wins from outside the ranking. A trump is an exception with a picture on it.

## 1781

The deck did that job for about three hundred and forty years.

Then, in 1781, a Parisian freemason named Antoine Court de Gébelin published the eighth volume of his encyclopedia *Monde Primitif*, and included an essay on the tarot. He had come across the cards at a friend's house, looked at the pictures, and concluded that he was holding the surviving fragments of an Egyptian book of wisdom, smuggled through the centuries in the disguise of a game.

He had no evidence for this. He couldn't have. Nobody in Europe could read a word of Egyptian in 1781: the Rosetta Stone was still eighteen years from being dug out of the ground, and Champollion, who would eventually decipher it, was nine years from being born. Court de Gébelin looked at a picture of a hanged man, declared it Egyptian wisdom, and published.

<NoteDown>340 years a game, then one bad footnote</NoteDown>

The footnote won anyway. It won so thoroughly that in English the original use of the deck effectively disappeared: say *playing tarot* to an anglophone and it lands as a category error, like saying you played a horoscope. Meanwhile, in France, tarot is a game people play the way people play Bridge — seventy-eight cards, fourteen to a suit, bidding, tricks, a whole competitive scene. The deck kept both jobs. The English-speaking world just inherited the newer one and assumed it was the only one.

I wanted to give it the other job back.

## Trumps that beat rules

Not by reviving tarocchi. By putting the triumphs into a game people already play with a French-suited deck — and by asking what a trump should be in a game that has no tricks to take.

Poker is a strange host for this, and that's the point. Its rules are the most settled in all of cards: a flush beats a straight, everyone knows it, nobody argues. That settledness is exactly what makes poker readable. You can only bluff about a hand if every person at the table agrees what hands are worth. The shared rulebook is the surface the whole game is played on.

So in Arcane Poker, the Arcana don't beat a card. There's nothing to beat. They beat the rulebook.

For one round, the deck reaches up and edits the thing everyone had agreed on. **Strength** inverts every rank — the 2 is suddenly the best card in the deck, the Ace is garbage, and every read you made three seconds ago is now backwards. **The Hermit** deletes the community cards; your two hole cards are the entire hand. **The Emperor** collapses everything to high card, so your flush is just five cards again. **Death** ends the round where it stands, whatever street you're on, and compares whatever happens to be on the table. The trump is still an exception with a picture on it. It's just that the rule it suspends is a bigger one now.

A few things came back on their own once I started building. The suits went home — hearts are cups, spades are swords, clubs are wands, diamonds are pentacles. Each suit runs fourteen cards deep, which is the exact size of the tarot's minor arcana, though I should be honest that I got there by a different road: historical tarot keeps the Knight that the 52-card French deck threw away, while I added a **Page** at value 0. Same count, different card, and mine has a job to do — it's the trigger. A Page turning face-up on the board is what summons an Arcana. It's also worth zero in isolation, but it wraps around underneath the Ace, so Page–A–2–3–4 is a straight.

And then there's the Fool. Arcana 0, the absolute wildcard: it becomes whatever card makes your hand best. I gave it that power because it felt right, and only afterwards learned that in French Tarot the Fool is called the Excuse, and can be played *in lieu of following suit*. It is, and has always been, the card that excuses you from the rule. I hadn't invented anything. I'd just found it again.

## The part that could break it

Making the rulebook a random variable is a solvent, and if you use too much of it there's no game left. A poker player's entire craft is reading a situation; if the situation can be rewritten without warning, reading becomes guessing, and a guessing game with chips in it is a slot machine.

Two things hold it together. First, exactly one Arcana is active per round — later Pages don't stack, don't chain, don't compound. A round can be strange; it can't become a pile-up. Second, and more important: the trigger is public. The Arcana fires off a Page revealed in the community cards, which means it fires at the same instant for everyone, off a card sitting face-up in the middle of the table. Nothing detonates out of a hand you can't see. You can hold a bad hand that desperately wants the rules to change and pay to see one more card. You can fold a good one because a Page is showing and you don't like your odds under a coin-flip rulebook. The chaos is a thing you can bet on, which makes it strategy instead of noise.

> A trump you can't see isn't a rule, it's weather.

The four AI opponents read the active modifier too, and re-evaluate under it — the aggressive one doesn't keep shoving when Strength has quietly made its Aces worthless.

## Both jobs, one table

At showdown, the game gives you a reading. Your hand and the board, laid out as a spread and interpreted back to you.

That's the 1781 layer, and I kept it on purpose — but sitting where it belongs, which is on top. The cards did the actual work first. The interpretation comes afterward, and it's flavor, and flavor is not a lesser thing as long as nobody mistakes it for the machine underneath.

This deck spent three and a half centuries as equipment and has spent two and a half as an oracle. There's no reason it can't be both. I'd only like us to remember which one came in the box.

<GameCard
  name="Arcane Poker"
  image="/og/arcanepoker.png"
  url="https://arcanepoker.ludoratory.com"
  repoUrl="https://github.com/raphaelaleixo/arcanepoker"
  players="solo"
  note="trumps, restored"
>
  Texas Hold'Em played with a 56-card tarot deck, where every Page turned on the board draws a Major Arcana that rewrites the rules of the round.
</GameCard>
