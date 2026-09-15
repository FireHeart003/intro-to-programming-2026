# String Calculator

This kata was created by Roy Osherove. [TDD Kata 1](https://osherove.com/tdd-kata-1)

## What we are *really* practicing

The finished `Calculator` is not the point. You could write it in ten minutes if that
were the goal. The point is the *thought process* that gets you there — the discipline of
taking small steps, letting tests drive your design, and resisting the urge to build things
you don't need yet.

Read that again, because it changes how you should judge yourself here: **the code you
produce is secondary to the way you produce it.** A messy solution reached one honest step
at a time is a *pass*. A gorgeous, complete solution you wrote in one heroic sitting — with
tests bolted on afterward to prove it works — is a *miss*, no matter how clean it looks.

We are practicing *iteration*. The key to this kata is to not "work ahead". Be intentionally
ignorant of the next requirement even if you know what it is. That is what we are practicing.

**Write the simplest thing that can make the current test pass.**

If you have a passing test, and you move on to the next requirement, and the test just
passes *before you change your code*, you have "failed" this kata. Or at least missed the
point.

## The Rhythm

This is the whole cycle. It should start to feel like breathing.

- **Red**: Write a meaningfully failing test that expresses a capability the software needs
  that it doesn't yet have. Run it. Watch it fail. (Yes, actually watch it fail — a test that
  can't fail isn't protecting you from anything.)
- **Green**: Make the test pass. Pretend like you are holding your breath until that test is
  green again. The faster you can make it pass, the better you are doing. This will require
  you to frequently write cringe code. Nobody will critique your swimming style as you fight
  to reach the surface to get your next breath. Just get the test to pass **without any of
  your previous tests failing**.
- **Refactor**: Once you are at the surface, breathing normally, take a deep breath and see
  if there is a better way to do what you just did. The rule on refactoring is that you
  cannot add any new functionality. Often you will find that it takes several rounds of
  red/green before you see some refactoring to do. No problem. It would be neurotic to take
  out the trash every time you toss a single item in the bin. Let it get a little "stinky"
  first.
- **Commit**: Once you are green (and refactored, if you refactored), make a git commit
  before starting the next requirement. This is not busywork. Each commit is a physical
  marker that says *"this much works, and I can always come back to here."* At the end you
  should have a little trail of small commits — that trail **is** the evidence that you took
  small steps. If your whole kata is one giant commit, the story of your thinking is lost.

> A good habit: glance at your commit history when you finish. If the messages read like a
> sensible story — "returns 0 for empty string", "adds two comma-separated numbers",
> "supports newline delimiter" — you did the kata right. If there are two commits and one of
> them is "everything", start over. Seriously. It's a kata; the reps are the reward.

## A second rule

Try not to "anticipate" the next move. Just write the code to make the test pass. If you
have a passing test, and then you move on to the next requirement, write the test, and it
just passes, you missed the point. We are *pretending* we don't know what is coming next,
because that is more like the reality of the job of a software developer.

The more code you write *preemptively*, the greater the likelihood that you will interpret
all future requirements in terms of your existing code base, as opposed to what is actually
needed. Another way to say this: our code has to be quality, but there is also value in
getting code "out there" as quickly as possible. By shipping code we make more money, or
reduce our liability in some way, and — most importantly — we get *feedback* on our design
that is helpful for the next iteration.

---

## Working with your AI: learn *with* it, don't outsource *to* it

You are the first wave of developers who get to do this kata with a genuinely capable AI
sitting right next to you. That is a gift, and it is also a trap, and the difference between
the two is entirely about *how you ask*.

No course, no bootcamp, no degree was ever going to hand you everything you need to know. It
never worked that way for any of us. What is different now is that the gap between "I don't
know how to do this" and "now I understand how to do this" has collapsed from *days in a
library* to *thirty seconds and a good question*. The developers who thrive are not the ones
who avoid AI — they're the ones who use it to learn faster than anyone could before. AI only
makes you dumber if you let it do the part of the job that was making you smarter.

So here is the one distinction that matters for this kata:

**A "do it for me" prompt robs you. A "help me understand" prompt grows you.**

| ❌ This hands over the thinking | ✅ This keeps you the author |
| --- | --- |
| "Solve the string calculator kata in C#." | "In C#, what are the different ways to turn the string `"42"` into an `int`? What are the tradeoffs?" |
| "Write the test and the code for custom delimiters." | "What does `string.Split` return, and what happens if I split an empty string?" |
| "Fix my code." | "Here's my code and the error. Don't fix it — explain what the error is telling me so I can fix it myself." |

Notice the pattern in the good column: every one of those questions is about *the language
and the tools*, not *the puzzle*. You're using AI the way a carpenter uses a more experienced
carpenter in the next stall over — "hey, what's this tool for, and when would you reach for
it?" — not "here, you build my chair."

Three habits that will serve you well here and for the rest of your career:

1. **Ask it to teach, then verify what it teaches.** AI is confidently wrong sometimes. When
   it tells you a method exists or behaves a certain way, *run it* and see. Check the docs.
   The verifying is part of the learning — and it's a skill your senior engineers will
   quietly notice you have.
2. **Widen your view on purpose.** Once you've solved something one way, ask *"what are other
   ways I could have done this, and why might someone choose each?"* You'll collect a mental
   library of approaches far faster than trial and error alone.
3. **Turn it into a rubber duck — but only after you're green.** Do the thinking yourself,
   make the test pass, *then* ask "what edge cases or tradeoffs am I not seeing here? Teach
   me something about this code." Don't let it write your first draft. Let it pressure-test
   your finished one.

Throughout the requirements below you'll see boxes like this:

> **🤖 Ask your AI** — a suggested *learning* question for the concept you're about to hit.

They are on-ramps, not answers. Use them, rephrase them, ignore them, or invent better ones.
The goal is that you finish this kata knowing *more* than when you started — not that you
finish it *faster*.

---

## Requirements

In this project there is a class called `Calculator` with a single public method,
`int Add(string numbers)`. This is the *only* allowed public member on this class. Do not add
more, and do not change the signature of this method.

> **Note**: You do not have to handle invalid input — unless you want to. Don't feel like you
> have to check for `null` or other bad input.

The idea is that `Add`, when given a string, follows some rules to convert that string into an
integer.

> Do *not* read through all of these before beginning. Take them one at a time. Even if
> you've done this dozens of times and know what's coming next, pretend like you don't. Cover
> the list with your hand if you have to.

### 1. An empty string returns 0.

There is already a failing test for this. Make it pass. Notice how little code it takes.
Resist writing anything the test didn't ask for.

*(Green? Commit. `git commit -m "returns 0 for empty string"`.)*

### 2. A string with a single integer in it is converted to an integer and returned.

- `Add("2")` returns `2`.
- Write as many examples of passing integers as you need until you're confident this case
  works. In xUnit, when you want to run the *same test* against *many inputs*, you reach for
  a `[Theory]` instead of a `[Fact]`.

> **🤖 Ask your AI**
> - "In C#, what are the ways to convert a string like `"42"` into an `int`? What's the
>   difference between `int.Parse`, `int.TryParse`, and `Convert.ToInt32`?"
> - "What is an xUnit `[Theory]`, and how does `[InlineData]` work? Show me a tiny example so
>   I can write my own."

### 3. It can take a string with two integers, separated by a comma.

- `Add("1,2")` returns `3`.

> **🤖 Ask your AI**
> - "How do I split a string on a comma in C#? What type does that give me back?"
> - "If I split the string `""` (empty) on a comma, what do I get? I want to understand the
>   edge case before it bites me." *(Your test #1 is watching. Make sure you don't break it.)*

### 4. It can take an arbitrary-length string.

- `Add("1,2") => 3`
- `Add("1,2,3") => 6`
- `Add("1,2,3,4,5,6,7,8,9") => 45`

> **🤖 Ask your AI**
> - "I have an array of number-strings. Without using LINQ, how would I loop over them and add
>   them up? What does a `foreach` loop look like?"
> - *(Later, once your loop works and is green:)* "I've heard C# has something called LINQ
>   with a `Sum` method. How would my loop look using that instead, and what are the
>   tradeoffs of each style?" — This is a great 'widen your view' moment. Get it working your
>   way first; *then* learn the other way.

### 5. We can "mix" delimiters.

Where before you could only separate numbers with a comma, now you can also use a newline. In
C#, a newline is written with the `\n` escape sequence.

- `Add("1\n2") => 3`
- `Add("1\n2,3") => 6`

> **🤖 Ask your AI**
> - "How can I split a string on *more than one* delimiter at once in C#? Is there a version
>   of `Split` that takes several separators?"
> - "What actually *is* the `\n` escape sequence? What character does it represent, and why
>   do we write it with a backslash?"

### 6. Custom delimiters.

Users can specify their own single-character delimiter by passing it in a header line:

- `Add("//#\n1#2#3") => 6`
- All previous delimiters still work, so: `Add("//#\n1#2,3\n1") => 7`

The input now has *structure*: an optional first line that starts with `//` and declares the
delimiter, then a newline, then the numbers.

> **🤖 Ask your AI**
> - "In C#, how do I check whether a string *starts with* a particular sequence of
>   characters?"
> - "How would I split a string into just two parts — a 'header' line and the 'rest' — at the
>   first newline? What tools does C# give me for pulling a string apart?"

### 7. Negative numbers are not allowed.

If any of the numbers is negative, an exception is thrown.

> **🤖 Ask your AI**
> - "How do exceptions work in C#? How do I `throw` one, and what happens to the program when
>   I do?"
> - "How do I write an xUnit test that asserts a method *throws* an exception? What's
>   `Assert.Throws`?"

### 8. The exception message lists the negative numbers.

The thrown exception should have a `Message` that contains a list of all the negative numbers
that were passed.

> **🤖 Ask your AI**
> - "How do I build one string out of a list of numbers in C#, with something between each of
>   them? What is `string.Join`?"

### 9. Numbers bigger than 1000 are silently ignored.

- `Add("2,3,9876") => 5`

> **🤖 Ask your AI**
> - *(Only if you're curious, and only after it's green:)* "Here's how I filtered out numbers
>   over 1000. What are other ways to express 'keep only the items that match a condition' in
>   C#? Teach me about `Where`."

### 10. Custom delimiters can be any length (not just a single character).

- `Add("//[***]\n1***2") => 3` (note the square brackets around the delimiter)

This is the requirement where many people first reach for *regular expressions*. That's a
legitimate tool — and a slightly dangerous one, which makes it a perfect thing to learn about
deliberately rather than by copy-paste.

> **🤖 Ask your AI**
> - "What is a regular expression, in plain terms? When would a professional reach for one,
>   and when would they *avoid* one?"
> - "In C#, what's the difference between `string.Split` and `Regex.Split`? What does the
>   `System.Text.RegularExpressions` namespace give me?"
> - "If I use regex to split on a delimiter that contains characters like `*` or `[`, what's
>   the gotcha? What does 'escaping' a regex mean, and why would I need `Regex.Escape`?" —
>   This is exactly the kind of trap that teaches you something real.

### 11. Multiple custom delimiters can be supplied.

- `Add("//[***, #, !]\n1***2#3\n1!2") => 9`

You are now parsing a header that can declare *several* delimiters, each wrapped in brackets.
Small steps really pay off here — resist trying to handle every shape at once.

> **🤖 Ask your AI**
> - "I have a header like `[***, #, !]` and I need to pull out each delimiter between the
>   brackets. How would I approach parsing that? Don't write my solution — help me think
>   through the *steps* I'd break it into."

---

## When you finish

Before you close the laptop, do two things:

1. **Read your commit history top to bottom.** Does it tell the story of someone who took one
   honest step at a time? That trail is the real artifact of this exercise — not the final
   `Calculator.cs`.
2. **Now** — and only now — you're allowed to ask your AI the big question: *"Here's my
   finished `Calculator` and its tests. I'm not asking you to rewrite it. Critique my design,
   point out edge cases I missed, and show me one thing a senior C# developer might have done
   differently — and explain why."* Read that answer as a colleague's, not a verdict. Argue
   with it. Verify it. That conversation, at the end, is where a surprising amount of the
   learning lives.

You will not leave this kata knowing everything about C#. Nobody knows everything about C#.
You *will* leave it a little better at the thing this whole profession actually rewards:
breaking a scary problem into steps small enough that you're never more than one green test
away from solid ground — and knowing how to teach yourself the next thing you don't know yet.