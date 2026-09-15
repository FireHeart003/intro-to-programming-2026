# Challenge 1 — Who won?

> **The muscle:** turning an instant human intuition into a precise specification — and
> discovering, before you write any code, all the questions hiding inside an "obvious"
> problem.

Read [the challenges README](./README.md) first if you haven't. Especially the part about
Phase 1. This challenge lives or dies on Phase 1.

## The setup

Here are the final scores from a game of bowling:

| Name | Score |
| ---- | ----- |
| Bob  | 127   |
| Sue  | 289   |
| Jim  | 12    |
| Ada  | 201   |
| Lin  | 88    |
| Rex  | 176   |

(High score wins, if you don't know the game.)

**Who won? Who came in last?**

You answered both before you finished reading the sentence. Sue won, Jim lost. Your brain did
it effortlessly and didn't show its work.

That effortlessness is the enemy. Because now the real task:

> Write a function that, given an arbitrary list of players and scores, returns the winner.

And suddenly it's not effortless at all. Good. That feeling — "wait, but what about…" — is the
sound of a specification being born.

## Phase 1 — Think. No code. (This is the assignment.)

Do not open your editor yet. Produce the three Phase-1 deliverables from the README:

**1. Work the example by hand and narrate it.** How *did* you find Sue? Did you scan for the
biggest number? Track a "best so far" as your eye moved down the list? Write down the actual
procedure. You'll be surprised how much your brain hid from you.

**2. Write your `input → output` examples.** At least 5–8, with real values. Start with the
table above. Then start bending it.

**3. List every ambiguity and edge case — and circle the ones you can't decide alone.**

To get you started (and *only* started — a good list is much longer than this), here are some
questions worth sitting with. Notice that several of them have no "correct" answer. That's not
a bug in the challenge. That's the lesson:

- What does "the winner" even *return* — a name? The name and the score? The whole row?
- **What if two people tie for the highest score?** Is the answer one winner or several? Does
  the function signature you were picturing even *allow* returning more than one? (Feel that?
  An edge case just reached back and changed your design.)
- What if the list is **empty**? Is that a `0`, a `null`, an exception, a "no winner"? Who
  gets to decide — you, or the person who asked for this?
- What if there's exactly **one** player? Did they win?
- Can a score be **negative**? Zero? Is that even legal bowling? Does it matter for your code?
- Are names **unique**? What if two rows both say "Bob"?
- The prompt said "who won." Someone will *absolutely* ask for "who lost" next. (You are not
  allowed to build it yet — this is still the kata's rule — but you're allowed to *notice*
  that your design should not make it painful.)

> When you hit a question with no obvious answer — like ties, or empty input — resist the urge
> to silently pick one and move on. **Write it down as a decision that needs making.** In this
> exercise, you get to make the call yourself and note *why*. On the job, half of these become
> a two-line message to your product owner. Learning to *see* them is the whole skill.

Only when your list feels a little embarrassingly thorough should you move on.

## Phase 2 — Test-drive it.

Now open your editor. You have a project with xUnit already set up. Bring your Phase-1
examples in as tests, **smallest first**, and grow the solution one Red → Green → Refactor →
Commit cycle at a time — exactly like the kata.

A few nudges (not answers):

- What is the *simplest* case you could possibly test first? Probably not the six-row table.
  Maybe one player. Maybe an empty list, if you decided what that does. Start smaller than
  feels worth it.
- You'll need a way to represent "a player and a score." In C#, a `record` is a lovely,
  low-ceremony way to bundle two values together. If you haven't met records:

> **🤖 Ask your AI**
> - "In C#, what's a `record`, and how is it different from a class? Show me the smallest
>   possible example of one holding a name and an int."
> - "How do I find the item with the maximum value in a list in C#? Show me both a plain
>   `foreach` loop version and a LINQ version, and tell me the tradeoffs." *(Do the loop
>   first. Learn the LINQ second. Same as the kata.)*

- Each time a test goes green, **commit.** Your history should read like the story of your
  thinking: `handles single player`, `picks higher of two scores`, `returns both on a tie`…

## Phase 3 — Reflect.

Before you're done, answer this in a sentence or two:

**Which edge case did writing the code force you to confront that your Phase-1 list had
missed?**

Maybe the tie broke a signature you were sure about. Maybe the empty list did. Maybe nothing
did, because your Phase 1 was genuinely thorough — in which case, notice *that*, because it
means the muscle is working.

Then, if you want the senior-developer version of the exercise:

> **🤖 Ask your AI** — *after* you're green:
> "Here's my finished `Winner` function and its tests. I'm not asking you to rewrite it. What
> edge cases might my tests still not cover, and if you were reviewing this in a PR, what one
> question would you ask me?"

That question — *what would a reviewer ask me?* — is one you can start asking yourself before
anyone else has to. That's the whole game.
