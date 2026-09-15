# Challenge 4 — Rank the leaderboard

> **The muscle:** recognizing when a requirement is *genuinely ambiguous* — when two competent
> developers would each build something different, and both would be "right" — and surfacing
> that ambiguity instead of silently guessing. Guessing here isn't a small mistake. It's how
> you build the wrong thing correctly.

Read [the challenges README](./README.md) first if you haven't.

## The setup

A game needs a leaderboard. Here are the players and their scores, already sorted:

| Player | Score |
| ------ | ----- |
| Ada    | 300   |
| Bob    | 250   |
| Sue    | 250   |
| Jim    | 100   |

> Assign each player their **rank**.

Go ahead — write the ranks next to those four names right now, before reading on.

Ada is 1st. Easy. Jim is last. But **Bob and Sue are tied at 250** — so what ranks did you
give them, and what did you give Jim?

- Did you write Bob **2nd**, Sue **2nd**, Jim **4th**? (The tied pair "uses up" two slots —
  this is how the Olympics do it. Two silvers, no bronze.)
- Or Bob **2nd**, Sue **2nd**, Jim **3rd**? (Ranks never skip — this is how a lot of scoreboards
  do it.)
- Or did you break the tie somehow and give Bob 2nd and Sue 3rd?

**All three are real, shipped, correct behaviors.** They even have names — *standard/
competition*, *dense*, and *ordinal* ranking. Nobody told you which one this game wants. And
here's the trap: you probably picked one *without noticing you were choosing*, because your gut
had an opinion and your gut felt like "the answer."

That's the whole lesson. The requirement "assign each player their rank" is **ambiguous**, and
the professional move is not to pick the one you like — it's to *notice that a decision exists*
and go find out which one is wanted.

## Phase 1 — Think. No code. (This is the assignment.)

**1. Write out the leaderboard above three times**, once under each ranking rule, so you can
*see* how the tie ripples down the list differently each way.

**2. Write your `input → output` examples** for the rule you (or your imaginary product owner)
choose. Include a case with a tie, a case with no ties, and a case with *three* people tied,
because that one tends to expose sloppy rules.

**3. List the ambiguities and edge cases — circle the ones with no obvious answer:**

- **Which ranking rule?** This is the circled one. If this were a real ticket, what *exactly*
  would you type into the Slack message to whoever wrote it? Write that message. (Being able to
  ask a precise, well-framed question is a senior skill. Practice it here where it's free.)
- What does a tie at the **very top** do — two 1st places?
- What does a tie at the **very bottom** do?
- What if **everyone** has the same score? What are the ranks then, under each rule?
- Is the input guaranteed **sorted**, or is sorting part of your job? (Decide — and if you
  decide "already sorted," that's an assumption worth writing down, because it *will* be wrong
  someday.)
- Empty list. One player. Two players tied. The usual suspects.

> Notice what happened in this challenge that didn't happen in the earlier ones: the hardest
> part wasn't a weird edge case at the margins. It was a **disagreement hiding inside the
> normal case** — the ordinary, expected input of "some people tied" has three legitimate
> answers. Those are the most dangerous ambiguities, because everything *looks* fine and you'll
> never get an error. You just quietly built a different product than the one that was wanted.

## Phase 2 — Test-drive it.

Open your editor. Pick your ranking rule (and write a comment at the top of your test file
saying which one and why — that comment is you *documenting a decision*, which is half of what
good code is). Then Red → Green → Refactor → Commit, smallest first.

- Start with the no-ties case — one player, then a few players all with different scores. Get
  ranks `1, 2, 3` green.
- *Then* introduce the tie and let it drive your rule into the code. This is the moment your
  Phase-1 choice becomes real and testable.

> **🤖 Ask your AI**
> - "What's the difference between 'standard/competition' ranking, 'dense' ranking, and
>   'ordinal' ranking for handling ties? Give me a tiny example of each so I can see how they
>   differ. Don't write my code — I want to *choose* deliberately."
> - "In C#, if I've grouped players by their score, how would I walk through the groups to
>   assign ranks? Talk me through the shape of the loop before I write it."

Commit the story: `ranks distinct scores 1-2-3`, `ties share the same rank`,
`rank after a tie follows the competition rule`…

## Phase 3 — Reflect.

**Go back to the very start of this file, where I asked you to write the four ranks before
reading on. Which rule did you use — and did you know, at the time, that you were choosing
one?**

If you didn't realize you were making a choice, that's the single most important thing you'll
learn from this whole set of challenges. Most wrong software isn't buggy. It's an unnoticed
choice, made confidently, that nobody thought to question.

> **🤖 Ask your AI** — *after* you're green:
> "Here's my ranking function. It uses [the rule I chose]. If a product manager came to me and
> said 'that's not what I meant,' what's the *other* behavior they most likely wanted, and how
> much would my code have to change to switch? I'm trying to learn how expensive an unspoken
> assumption can be."
