# Thinking Challenges

> Problems that are easy to *solve* and surprisingly hard to *specify*.

These are companions to the String Calculator kata. The kata handed you a numbered list of
requirements and asked you to build them one small step at a time. These challenges do
something different — and, honestly, harder.

**Here they mostly *don't* tell you the requirements. Figuring out the requirements is the
exercise.**

## The one idea

School spends years training you to solve **well-posed problems**: here is a precisely
specified task, produce the answer, hidden test cases tell you if you got it right. You've
done thousands of those.

The job is the other way around. Real problems show up **ill-posed**. Someone says "we need
to show who's winning" and walks away. The value you add — the actual work — is turning that
vague sentence into something precise enough to build, *and noticing all the decisions nobody
made yet.*

Here's a demonstration. Look at this table for a second:

| Name | Score |
| ---- | ----- |
| Bob  | 127   |
| Sue  | 289   |
| Jim  | 12    |

Who won? You knew instantly — Sue. Your brain didn't even feel like it did anything.

Now: *write down the exact rule you just used.* Then answer these — what if two people tie
for the top? Is the answer one name, or a list? What if the list is empty? What if there's
one player? Can a score be negative? Suddenly the "obvious" problem has a half-dozen open
questions in it.

That gap — **obvious to a human, underspecified for a computer** — is not a trick. It *is*
the job. These challenges live entirely in that gap.

One more reframe that will pay off for the rest of your career: **a unit test is just a
specification example that happens to be executable.** When you write down "empty list → 0",
you're not "testing," you're *specifying*. TDD isn't a testing technique. It's thinking on
paper, where the paper runs.

## Why we're being this explicit about it

No mystery here, no hidden agenda: you are all smart, and most of you can already write the
code. The thing many CS and SE programs *don't* practice is the decomposition — taking a
fuzzy ask apart, finding the edge cases, and knowing which decisions you're allowed to make
yourself versus which ones you have to go ask about. That last skill is also the antidote to
the "my team uses Kafka and I'm drowning" feeling: the durable skill was never the tool. It's
being able to walk into an unfamiliar problem, break it down, and ask the right questions.
Tools you can learn in an afternoon. This you build with reps.

## How each challenge works

Same rhythm every time. Three phases. **Phase 1 is the point** — do not skip it, do not rush
it, do not open your editor during it.

### Phase 1 — Think. No code.

Produce these, on paper or in a markdown file:

1. **Work one example by hand** and narrate what your brain did. Slow it down until you can
   see the steps you normally skip.
2. **Write 5–8 concrete `input → output` examples.** Be specific. These become your tests
   later, so make them real values, not descriptions.
3. **List every ambiguity and edge case you can find.** Empty input. One item. Ties.
   Duplicates. Negatives. Weird shapes. Then **circle the ones you cannot answer on your
   own** — the ones where you'd have to go ask the person who wanted this. In real life, *that
   circled list is the email you send your lead.*

> A great Phase 1 has **more questions than you thought you needed.** If your list feels a
> little embarrassing in its thoroughness, you're doing it right.

### Phase 2 — Test-drive it.

Now, and only now, open your editor. Take your Phase-1 examples and drive them in one at a
time, smallest and most trivial first, using the same cycle from the kata:

**Red → Green → Refactor → Commit.** One tiny step at a time. Let your examples become your
`[Fact]`s and `[Theory]`s. Watch your specification turn into a passing test suite.

### Phase 3 — Reflect.

Answer honestly: **which edge case did the code force you to deal with that your Phase-1 spec
had missed?** There's almost always one. That's not failure — that's the exact gap these
challenges exist to shrink. Note it. Next time you'll catch it in Phase 1.

## Using your AI here

Same philosophy as the kata: **learn *with* it, don't outsource *to* it.** The highest-value
move on these challenges is to make your AI a sparring partner for your *thinking*, not a
vending machine for your *code*:

> **🤖 The best prompt for these challenges** — do Phase 1 yourself first, then:
> *"Here's my list of edge cases and examples for [problem]. I'm not asking you to solve it —
> I'm trying to find the cases I'm blind to. What am I not thinking of, and why does it
> matter?"*

That one habit — writing your own list first, then asking an AI to attack it — will make you
better at edge cases faster than any amount of getting burned in production. Just remember to
*verify* what it suggests; it will occasionally invent a case that doesn't apply, and noticing
that is part of the skill too.

## The challenges

| # | Challenge | The muscle it trains |
|---|-----------|----------------------|
| 1 | [Who won?](./01-who-won.md) | Turn intuition into a specification; discover edge cases before coding |
| 2 | [Do these two meetings overlap?](./02-do-they-overlap.md) | Boundary thinking — endpoints, containment, zero-length |
| 3 | [Split the bill fairly](./03-split-the-bill.md) | Trace an example by hand and find where naive math betrays you |
| 4 | [Rank the leaderboard](./04-rank-the-leaderboard.md) | Surfacing a genuinely ambiguous requirement instead of guessing |
| 5 | [Tic-tac-toe: who won?](./05-tic-tac-toe-winner.md) | Decompose one big question into small, independently testable ones |

Start with #1. It's the one you already solved in your head — which is exactly why it's the
best place to learn how much you left unsaid. After that the order is yours, though they climb
roughly in that sequence: from "notice the edge cases" (1), to "the edges are the whole game"
(2), to "trace it by hand or miss the bug" (3), to "the ambiguity is hiding in the *normal*
case" (4), to "break one big question into small ones" (5).
