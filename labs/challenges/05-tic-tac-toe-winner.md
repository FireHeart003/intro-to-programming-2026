# Challenge 5 — Tic-tac-toe: who won?

> **The muscle:** decomposition. Taking one big, slightly-overwhelming question — "did anybody
> win?" — and breaking it into a handful of small, boring, *independently testable* questions.
> The ability to turn one hard problem into eight easy ones is most of what senior developers
> are actually doing when they look like they're "just thinking."

Read [the challenges README](./README.md) first if you haven't.

## The setup

Here's a tic-tac-toe board:

```
 X | O | X
-----------
 O | X | O
-----------
   |   | X
```

> Did anybody win? If so, who?

You saw it instantly: X, down the diagonal. Now the task:

> Write a function that takes a board and returns the winner — `X`, `O`, or nobody.

The word "takes a board" is doing a *lot* of quiet work in that sentence, and the phrase "did
anybody win" is hiding at least eight separate questions inside it. Let's dig them out.

## Phase 1 — Think. No code. (This is the assignment.)

**1. Notice you have to invent the input.** Before you can check a board, you have to *decide
what a board even is* in code. A 3×3 grid of characters? A single string of 9 characters? A
list of lists? This is a genuine design decision, and different choices make the rest of the
problem easier or harder. Write down two possible representations and a sentence on the
tradeoffs of each. (This step — "how do I even represent the thing?" — is one your schooling
probably skipped, and it's half the job.)

**2. Decompose the win check.** "Did anybody win" feels big. Break it down: *how many distinct
lines can win?* Count them out loud — the rows, the columns, the diagonals. Write down all of
them. Suddenly the scary question is just "check these N lines, is any of them three-of-a-kind?"
You just turned one hard problem into N tiny identical ones. **That move is the entire skill.**

**3. Write your `input → output` examples, and list the edge cases — circle the hard ones:**

- A board X wins on a **row**. On a **column**. On **each diagonal**. (These are your happy
  paths — one per line you listed in step 2.)
- A **full board with no winner** — a draw. Is "draw" the same answer as "nobody's won yet,"
  or a *different* answer? (Ooh. Decide.)
- A board that's only **half played** — game still in progress. What do you return?
- An **empty** board.
- **The sneaky one:** a board where *both* X and O somehow have three in a row. That's an
  illegal position — it can't happen in a real game. Does your function *detect* that and
  complain, or does it just return whichever it happens to find first? Neither answer is
  automatically wrong, but *picking without noticing* is. (This is the tic-tac-toe version of
  the leaderboard's hidden choice.)
- What if the input isn't a valid board at all — wrong size, weird characters? In or out of
  scope? Your call — write it down.

> The step that matters most here is step 2. Every time you feel that "ugh, this is a lot"
> flush at the start of a problem, the move is the same: stop trying to hold the whole thing in
> your head, and start listing the small pieces until each one is boring. Eight boring checks
> beat one overwhelming one every single time.

## Phase 2 — Test-drive it.

Open your editor. Pick your board representation (you decided in Phase 1). Red → Green →
Refactor → Commit, smallest first.

- Do *not* start by trying to detect all eight lines. Start with **one**: a board where X has
  the top row. Get that single case green. Then the second row. You'll notice the rows are all
  the same shape — that's your first refactor, and it'll probably suggest how to handle columns
  and diagonals too. Let the duplication show up before you abstract it (kata rule: let it get
  a little stinky first).
- Keep "nobody has won" as a first-class answer from early on, so you're never pretending every
  board has a winner.

> **🤖 Ask your AI**
> - "I'm deciding how to represent a tic-tac-toe board in C#. What are a couple of common ways —
>   a 2D array, a jagged array, a flat string of 9 chars — and what are the tradeoffs for
>   *checking rows, columns, and diagonals*? Help me choose, don't choose for me."
> - "Once I have my board, how would I pull out 'the three cells in the middle column' or 'the
>   main diagonal'? Show me the indexing on a small example so I understand it."
> - *(After your rows work and you see the duplication:)* "Here are my three near-identical row
>   checks. What would it look like to describe all eight winning lines as *data* — a list of
>   cell positions — and check them in one loop? Explain the idea; I'll write it."

Commit the decomposition as it happens: `detects a win on the top row`, `detects a win on any
row`, `detects a win on a column`, `detects both diagonals`, `reports a full board with no
line as a draw`…

## Phase 3 — Reflect.

**How many lines did your final solution check, and did you end up writing eight separate
checks or describing the lines as data and looping once?** Either is fine — but notice the
journey: you almost certainly started with one concrete row check and let the *repetition* show
you the general shape. That's not a failure to see the elegant solution up front. That's
exactly how you're *supposed* to find it.

> **🤖 Ask your AI** — *after* you're green:
> "Here's my tic-tac-toe winner function and tests. I decomposed the win check into
> rows/columns/diagonals. Is there a line, or a weird board state, that my decomposition
> doesn't cover? And if you were teaching a new dev, how would you describe the *way* I broke
> this problem down?"
