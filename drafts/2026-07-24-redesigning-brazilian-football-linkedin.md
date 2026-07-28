# LinkedIn draft — Redesigning Brazilian Football

Short version of `src/content/lab-notes/2026-07-24-redesigning-brazilian-football.md`,
cut for LinkedIn. Not a lab note — lives outside `src/content/lab-notes/` on purpose,
since that folder is eagerly globbed into the bundle.

**Length:** ~2,080 characters (LinkedIn's sweet spot is 1,300–2,000; hard cap 3,000).
**Truncation:** LinkedIn collapses after ~200 characters behind "…see more" — the first
three lines below are written to survive that cut on their own.
**Formatting:** LinkedIn renders no markdown. Paste as plain text; the blank lines
between paragraphs are doing all the visual work, so keep them.

---

In 2003, Brazilian football shipped a balance patch. Nobody tested it.

The change looked like modernization: swap a chaotic national championship for a clean European league table. And it worked. Brazil finally had a table you could read and a champion nobody disputed.

But a full home-and-away league is long and rigid. It ate the year end to end, and three interstate tournaments — the competitions that gave small clubs meaningful games — stopped fitting in the schedule.

Nobody voted to remove them. They were squeezed out by the geometry.

Here's the part that should stop any designer cold.

Every previous reform in Brazilian football had added a layer without touching what sat underneath. 1959, 1971, 1989 — each one added. None subtracted. 2003 was the first time the answer to a structural problem was to take something out.

What came out was the middle tier.

Today Brazil has over 700 professional clubs. 128 play in a national division of any kind. Forty have a calendar that fills a year. The rest live on a state championship worth up to 70% of their annual revenue, then go dark for months.

Ronaldo failed a Flamengo trial at fourteen and deliberately picked a small club, because there he'd face the giants in front of a whole state. That route still technically exists. The giants field their B teams now.

2003 optimized what it could measure: a legible table, a readable season, an uncontested champion. It got all three. What it couldn't see was that the redundant, inefficient middle layer was where teenagers got found.

You can't playtest for a property you never knew the system had.

I've been arguing for a redesign — six regional leagues, one open national cup. But a manifesto is also an untested patch. So I wrote a simulator to ask it one question: does a whole season actually fit inside a year? 216 clubs, 34 rounds, 47 usable weeks, every draw and every continental place.

It fits.

Manifesto (in Portuguese): https://raphaelaleixo.github.io/ligas-do-brasil/
The longer write-up: https://ludoratory.com/lab-notes/redesigning-brazilian-football

---

## Optional tail

Hashtags, if you want them — LinkedIn's reach benefit is marginal now, and three
beats ten:

`#systemsdesign #gamedesign #futebol`

## Alternate opening

If the balance-patch framing reads too inside-baseball for your feed, lead with the
story instead and let the design point land second:

> A fourteen-year-old failed a trial at Flamengo. Too much competition. So he read the
> structure and routed around it — picked a small club on purpose, because there he'd
> face the giants in front of a whole state.
>
> It worked. His name is Ronaldo.
>
> That route is mostly gone now, and it wasn't closed on purpose.
