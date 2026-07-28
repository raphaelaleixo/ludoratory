# Redesigning Brazilian Football

In the early nineties, a fourteen-year-old failed a trial at Flamengo. Not for lack of talent — for lack of room. "The competition was gigantic," he said later. So he did something a fourteen-year-old should not be able to do: he read the structure and routed around it. He went looking, on purpose, for a club small enough to give him space, and settled on São Cristóvão, a modest side in Rio, on a very specific piece of reasoning — there he would face the big clubs in the state championship, in front of the whole state.

<NoteUp>fourteen, and already reading the map</NoteUp>

It worked. São Cristóvão to Cruzeiro in 1993, Cruzeiro to the world. His name is Ronaldo.

Romário first surfaced at Olaria. Rivaldo at Santa Cruz, then Mogi Mirim. The squads that won Brazil its last two World Cups were dotted with players who arrived the same way — through clubs so small they have no national stage today.

That's the part that stayed with me. Not the trophies — the soil. A country the size of a continent, covered in hundreds of small clubs, each one a place where a teenager might be spotted and grow into something. Nobody designed that as a talent pipeline. It simply worked as one. And because nobody designed it, nobody was watching it either.

## A league is a game

Here's what I keep coming back to: a football league is a game. Not the ninety minutes on the pitch — the *structure* around them. How many clubs there are, who plays whom, who gets promoted, who spends months with no match at all. Those are rules, and rules have consequences nobody votes on.

In 2002, three competitions were played for the last time. The Rio–São Paulo tournament, in its twenty-fifth year. The Copa Sul-Minas. The Copa dos Campeões, which gathered the regional winners and handed out a Libertadores place. Nobody in those stadiums knew they were watching the last one. An entire layer of Brazilian football ended inside a single year, and it barely registered, because everyone was looking at what came next.

What came next was *pontos corridos*. In 2003 the national championship became one long league table — everyone plays everyone, most points wins. And it worked. Brazil had spent thirty years with a format that changed every season, ninety-four clubs in 1979, titles settled by rules invented on the fly. The European model gave Brazilian football something it had never had: a table you can read, a season you can follow, a champion nobody disputes. Those are real gains, and skipping past them would be dishonest.

But look at how the interstate cups actually died. They weren't abolished. Nobody voted them out. A full home-and-away league is long and rigid — the fixtures eat half the year end to end, without the gaps the old knockout formats left lying around. So the regional tournaments were squeezed out. **They didn't fit.**

<NoteDown>nobody playtested this patch</NoteDown>

And here's the part that should stop any designer cold. Every previous reform in Brazilian football had *added* a layer without touching what sat underneath. The Taça Brasil in 1959 was a knockout between state champions — it depended entirely on the regional filter to exist at all. The national championship of 1971 was built on top of the state leagues. The Copa do Brasil in 1989 was bolted on beside them. Each one added. None subtracted. 2003 was the first time Brazilian football answered a structural problem by taking something out — and what it took out was the middle tier, the one connecting each state to the national game. Two tiers were left, and nothing ran between them.

The state championships survived. What they lost wasn't prestige, it was function. Before, a state championship was a route — the way into the competitions that mattered. Afterwards it led nowhere. It sat beside the national league instead of being a step toward it: a node still on the board, connected to nothing.

## What the table couldn't see

Something bends right after 2003, and it bends in four places at once.

Brazil's average World Cup finish drops from 3.75th to 6.50th. Its record against European teams in World Cup knockouts — five finals won, every title in Brazilian history taken off a European side — goes to zero: six World Cups since 2002, six eliminations, all six by European teams, the last of them Norway in the round of 16 this year. The Ballon d'Or, which went to a Brazilian five times between 1997 and 2007 — Ronaldo twice, Rivaldo, Ronaldinho, Kaká — hasn't gone to one since. Eighteen straight years. And the average age at which Brazil sells its biggest exports abroad slid from twenty-two to nineteen.

Take any one of those alone and it has a defense. Knockout football is a coin toss. The Ballon d'Or drought has two names on it, Messi and Cristiano. Early transfers are just globalization doing what globalization does. Every one of those objections is reasonable, and the honest move is to grant them all. What doesn't survive is the coincidence — four different metrics, from four different sources, measuring four different things, all breaking at the same turn of the decade.

Underneath them sits a number that explains more than any of them. Brazil has over seven hundred professional clubs. A hundred and twenty-eight play in a national division of any kind. **Forty** — the twenty in the top flight and the twenty below it — have a calendar that fills a year. The remaining six hundred-odd depend on a state championship and nothing else: a season that lasts a quarter of the year, followed by months with no competition, no gate, no revenue. For many of them, the prize money from that one short tournament is up to seventy percent of everything they earn.

Now put a fourteen-year-old back into that structure. The stage Ronaldo picked out for himself — small club against giant, in front of a whole state — still technically exists, except the giants field their B teams now and almost nobody watches. And the club that would have housed him can no longer afford to wait. One that plays all year can hold a talent two or three more seasons and sell him finished, for more. One that plays three months and sits still for the rest cannot. It sells the boy at sixteen not because it wants to, but because it can't afford not to. Endrick's move to Real Madrid was agreed when he was sixteen; Estêvão's to Chelsea at seventeen. The country stopped forging stars and started shipping raw material.

The same design starves the bottom and drowns the top: in 2024 Botafogo played seventy-five matches, more than any club on earth, while Real Madrid won the Champions League on fifty-seven.

None of this is what 2003 set out to do. It was optimizing something real and visible — a legible table, a season that reads, a champion nobody argues about — and it got all three. What it couldn't see was the thing nobody had ever needed to measure, because nobody had ever built it on purpose: that the redundant, inefficient, unglamorous middle layer was where teenagers got found. You can't playtest for a property you never knew the system had.

> Population was never the bottleneck. The architecture was.

## The patch, and the playtest

So you look at the rules again — on purpose this time.

*Ligas do Brasil* is a redesign rather than a tweak. Twenty elite places for two hundred million people — Portugal offers eighteen for ten million — becomes **six regional leagues**, each roughly the population of a European country. The smallest, the Amazon league, is the size of the Netherlands. Above them sits one **open, Champions-League-style national cup** that any club can reach, deciding the Brazilian champion in a concentrated national knockout. Forty clubs with a real season becomes two hundred and sixteen, and that's the floor, not the ceiling.

It doesn't ask for more money. Brazilian football has never earned more — and has never owed more, with five clubs holding half the revenue and a combined debt larger than a full year's income. Record revenue and record debt on the same balance sheet isn't health; it's a machine turning over more and more money on a thinner and thinner margin. The reform redistributes what already exists: more clubs with real calendars, fewer flights, more local derbies, and hundreds of small clubs playing matches that count for most of the year instead of a quarter of it.

Which is where I have to be careful, because a manifesto is also an untested patch. Anyone with a free afternoon can write "six regional leagues would work." It costs nothing to assert, and the entire complaint of this note is about rules shipped without checking.

So I checked. I wrote a simulator that builds whole seasons under the proposed rules, and gave it exactly one question — not who wins, not what it earns, just: *does it fit?* Two hundred and sixteen clubs. Thirty-four rounds. Every draw, every bracket, every continental place. Forty-seven usable weeks, five of them reserved for international dates, and an automated test that walks the calendar week by week counting each club's matches, to confirm the season it produces is the season the argument claims.

It fits.

I can't ship this patch. Nobody hands the rules of Brazilian football to a game designer with a side project. But I could take the system apart, argue for a different architecture, and test it before asking anyone else to believe it — which is more than the last patch got.

The manifesto goes much further than this note: the data, the money, the objections I've skipped past here. It's in Portuguese. If this is the kind of system you like to take apart, go read it.

<GameCard
  name="Ligas do Brasil"
  image="/lab-notes/redesigning-brazilian-football/ligas-do-brasil.png"
  url="https://raphaelaleixo.github.io/ligas-do-brasil/"
  repoUrl="https://github.com/raphaelaleixo/ligas-do-brasil"
  ctaLabel="Read the manifesto ↗"
  note="Brazil's big!"
>
  A manifesto — and the season simulator that backs it — for restructuring Brazilian football into six regional leagues and one open, Champions-League-style national cup.
</GameCard>
