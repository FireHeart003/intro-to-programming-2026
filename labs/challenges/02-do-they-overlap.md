# Challenge 2 — Do these two meetings overlap?

> **The muscle:** boundary thinking. The bugs here don't live in the middle of the problem —
> they live at the exact edges, where one thing ends and another begins. Learning to *feel*
> where the boundaries are is one of the most valuable instincts a developer can build.

Read [the challenges README](./README.md) first if you haven't.

## The setup

You're building a calendar. You need one small, sharp function:

> Given two meetings, each with a start time and an end time, does the second one **conflict**
> with the first? Return `true` if they overlap, `false` if they don't.

That's it. It sounds like a five-minute function. It is a five-minute function — *if* you know
exactly what "overlap" means. And you don't yet. Not precisely. That's the whole challenge.

## Phase 1 — Think. No code. (This is the assignment.)

**1. Draw it.** Seriously — get a number line or just a strip of paper. Draw one meeting as a
bar from its start to its end. Now draw a second bar. Slide it around: far to the left, far to
the right, overlapping halfway, completely inside, exactly on top. For each position, ask "do
these conflict?" You are building intuition you can then try to write down.

**2. Write your `input → output` examples.** Represent a meeting however you like for now —
`(9, 10)` for 9am–10am is fine. Give at least 6 concrete pairs and the `true`/`false` you
expect. Push them toward the edges on purpose.

**3. List the ambiguities and edge cases — and circle the ones with no obvious answer.**

Some provocations to start you off (a good list is longer):

- **The big one:** Meeting A is `9:00–10:00`. Meeting B is `10:00–11:00`. They *touch* at
  10:00. **Do they conflict?** There is no universally correct answer — a calendar app
  probably says "no, back-to-back is fine," but a "reserve the projector" app might say "yes,
  you can't hand it over instantly." *You have to decide, and write down which world you're
  in.* This one boundary is where most real overlap bugs are born.
- What if one meeting is entirely **inside** the other (`9:00–17:00` and `12:00–13:00`)? Your
  gut says "obviously conflict" — does your rule actually catch it? Many first attempts don't.
- What if the two meetings are **identical**?
- What about a **zero-length** meeting (`10:00–10:00`)? Is that even a thing? Can it conflict
  with anything? Can it conflict with *itself*?
- Does the **order** of the arguments matter? Should `Overlaps(a, b)` always equal
  `Overlaps(b, a)`? (If you believe it should, that belief is a test you can write.)
- What if someone hands you a meeting whose **end is before its start** (`11:00–9:00`)? Bad
  data, or something you have to tolerate? Your call — but *make* the call.

> Here's a thinking move worth stealing for the rest of your career: some conditions are far
> easier to define by their **opposite**. "Do they overlap?" is fiddly. "Do they *not*
> overlap?" is almost trivial — one of them ends before the other one starts. Sometimes the
> cleanest path to a specification is to specify the *negation* and flip it. See if that helps
> here. (And notice how the touching-endpoints decision above turns into a single `<` vs `<=`
> — that tiny choice *is* the whole boundary question.)

## Phase 2 — Test-drive it.

Open your editor. xUnit is set up. Bring your examples in as tests, smallest first, Red →
Green → Refactor → Commit.

- A meeting is two values that belong together — a great excuse for a small C# `record`.
- Start with the *clearly* separated case (`9–10` vs `2pm–3pm` → no overlap). Get that green.
  Then add a *clearly* overlapping case. *Then* — deliberately — add the nasty touching-at-the-
  boundary case you decided on in Phase 1, and watch whether your code already agrees with your
  decision or fights you.

> **🤖 Ask your AI**
> - "In C#, how would I model a time range with a start and end? Is there a built-in type like
>   `TimeOnly` or should I just use two `int`s or `DateTime`s for a first pass? What are the
>   tradeoffs of each for a learning exercise?"
> - "I keep getting confused about `<` vs `<=` at the boundaries of a range comparison. Can you
>   help me reason through it with a number line — not by giving me the answer, but by walking
>   me through how to think about the endpoints?"

Each green test is a commit. Your history should show the boundaries you nailed down one by
one: `separate meetings don't conflict`, `overlapping meetings conflict`,
`back-to-back meetings do NOT conflict`, `one meeting inside another conflicts`…

## Phase 3 — Reflect.

**Which boundary case was the one that made you change your comparison operators or your
mental model?** There's usually exactly one that flips a `<` into a `<=` and makes everything
click. Name it.

> **🤖 Ask your AI** — *after* you're green:
> "Here's my `Overlaps` function and tests. I'm confident about the middle cases. Which
> *boundary* case do you think I'm most likely to have gotten subtly wrong, and how would you
> test it?"
