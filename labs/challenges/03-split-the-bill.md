# Challenge 3 — Split the bill fairly

> **The muscle:** trace a concrete example by hand, all the way to the last digit, and catch
> the moment the naive math quietly betrays you. Some bugs you cannot see by staring at code.
> You can only see them by *doing the arithmetic a real user would do* and noticing it doesn't
> add up.

Read [the challenges README](./README.md) first if you haven't.

## The setup

Dinner's over. The table wants to split the check.

> Given a bill total and a number of people, figure out how much each person pays so the group
> can split it evenly.

You've done this at a restaurant a hundred times. Easy. Divide and go.

So try it — right now, on paper, no code: a **\$100** bill, **3** people. How much does each
person pay?

`$100 / 3 = $33.333…` — so, \$33.33 each. Three people times \$33.33 is… **\$99.99.**

Where's the last penny? Someone has to pay it. The math you trusted just left a coin on the
table, and *nobody in your code is holding it.* That missing penny is this entire challenge.

## Phase 1 — Think. No code. (This is the assignment.)

**1. Do the arithmetic by hand for a few splits** and watch for the leftover. \$100 / 3.
\$10 / 3. \$0.05 / 2. Feel where the money stops adding up.

**2. Write your `input → output` examples** — total, number of people, and *what each person
pays.* If your outputs don't sum back to the original total, that's not a mistake in your
examples. That's the specification asking you a question.

**3. List the ambiguities and edge cases — circle the ones with no obvious answer:**

- **The penny.** \$100 across 3 people. Does one person pay \$33.34 and the others \$33.33? Do
  you round each share and let the total drift? Do you tell everyone \$33.33 and eat the
  penny? There is no single right answer — but "the shares must sum *exactly* back to the
  total" is a property a good solution can *guarantee*, and a naive one silently won't.
- **What does a "share" even look like?** One number for everyone, or a *list* of what each
  person owes (which lets the unlucky penny-holder be explicit)? Notice this decision changes
  your function's return type before you've written a line.
- **Splitting by zero people.** What happens? (You know what dividing by zero does. So decide
  what *your* function does about it.)
- Negative total? A total of exactly \$0.00? One person (do they just pay the whole thing)?
- **Tip and tax.** The moment you add "18% tip," a new question appears: tip on the pre-tax
  amount or the post-tax amount? Those give different numbers, and *both are things real
  restaurants actually do.* (You're not building this yet — the kata's don't-work-ahead rule
  still holds — but notice it's lurking, and notice your design shouldn't make it painful.)

> Here's the one that trips up experienced developers, so meet it now on purpose: **money is
> not a good job for `double`.** Ask your computer to hold `0.1 + 0.2` as a `double` and it
> will tell you `0.30000000000000004`. That's not a bug in your machine; it's how binary
> floating-point works, and it is *exactly* the wrong property for currency. Part of this
> challenge is discovering the tool that *is* right for money. (Hint in the AI prompt below —
> but try to feel the problem before you reach for the fix.)

## Phase 2 — Test-drive it.

Open your editor. xUnit is ready. Examples become tests, smallest first, Red → Green →
Refactor → Commit.

- Start with a split that *does* come out even — \$100 across 4 people, \$25 each. Get the easy,
  honest case green first.
- *Then* write the test for \$100 across 3 people — the one with the penny in it — and let it
  drive you to actually decide what your Phase-1 self said should happen. Watch a good example
  force a real decision into your code.
- A strong test to reach for: whatever your function returns, **the pieces sum back to the
  original total.** That single property will catch the penny every time.

> **🤖 Ask your AI**
> - "Why is `double` a bad choice for representing money in C#? What should I use instead, and
>   why is it better? I want to understand the *reason*, not just the name of the type."
> - "Some people say to do all money math in whole cents as integers instead of dollars. Why
>   would anyone do that, and what does it buy me?"
> - "How do I round a number to two decimal places in C#, and what are the different *rounding
>   rules* (like round-half-up vs round-half-to-even)? Why would a bank care which one I pick?"

Commit as you go: `splits evenly when it divides cleanly`, `shares sum back to the total`,
`assigns the leftover cent to one person`…

## Phase 3 — Reflect.

**When you traced \$100 / 3 by hand in Phase 1, did your first instinct for the code produce
\$99.99 or \$100.00?** If \$99.99 — congratulations, you just felt the exact class of bug that
has shipped in real payroll, invoicing, and payment systems. It's not an exotic edge case.
It's Tuesday.

> **🤖 Ask your AI** — *after* you're green:
> "Here's my bill-splitting function and tests. Where might rounding still bite me — is there a
> combination of total and number-of-people where my shares *don't* sum back to the total? Try
> to find one."
