# A record is a contract

You're back in the Shows API — the one you explored, the one you didn't write. Today you
change some of its types, and the point is not the syntax of changing them. The point is
what a type in an API actually *is*.

When your code is graded and thrown away, a type is a convenience for you. When your code is
inherited and called by other people's code, some of your types are **promises**. Every
program that talks to this API has agreed to send and receive certain shapes. Change one of
those shapes and you've changed the promise — for people you'll never meet, whose code you
can't see, who did nothing wrong.

A few things before you start:

- The types we care about live in `Shows.Api/Shows/ShowContracts.cs`: `ShowSummary`,
  `ShowDetails`, `ShowCreateRequest`.
- There's also `ShowEntity` in `Shows.Api/Shows/ShowEntity.cs`. Keep it in the corner of
  your eye — one of the steps is about it.
- **Builds on:** the Shows API from the exploration lab. You need it running and you need
  Docker up. `dotnet run --project AppHost`.

## Which of these can hurt someone?

Open `Shows.Api/Shows/ShowContracts.cs`. Three types. Then open `ShowEntity.cs`. That's four
types, and they look awfully similar — all of them are basically "a show."

Before any code, sort them into two piles:

- **A caller of the API can see this shape.** Changing it could break someone outside this
  codebase.
- **Only this codebase ever sees this shape.** Changing it is my business alone.

Write down which pile each of the four goes in, and *why*. This is the whole lab in
miniature; the rest is you finding out whether you were right.

<details>
<summary>The one that's easy to get wrong</summary>

`ShowEntity` looks exactly like the others, but no caller ever receives it — it's what gets
stored in the database. `ShowsData` translates between it and the contract types. So it's in
the second pile: you can rename its fields all day and no caller notices. That it *looks*
like a contract is exactly the trap. Similarity of shape is not similarity of role.

</details>

## Break a promise, and watch your build not care

Pick `ShowSummary`. Rename its `Title` to `Name` — just the one field, everywhere the
compiler makes you.

First, before you build: predict who's going to complain. The compiler? The tests? Something
else?

Now:

1. Build it. `dotnet build`.
2. Run the tests. `dotnet test Shows.Tests` (or your Test Explorer).
3. Start the app and `GET /shows` from `requests.md`. Look at the JSON that comes back.

<details>
<summary>What you should be seeing — and why it's the scary part</summary>

Green build. Green tests. And the JSON now says `"name"` where it used to say `"title"`.

Nothing in *your* world broke. But every program out there that reads `title` off this
response just stopped working, and you got no warning at all. Your tests didn't catch it
because your tests use `ShowSummary` too — you renamed both sides at once, so they still
agree with each other. They were never checking the promise to *outsiders*; they were
checking that you agree with yourself.

That's the thing to carry out of this lab: **the compiler protects you from breaking
yourself. It does nothing to stop you breaking them.** The green checkmark is not the same as
"safe to change."

</details>

Put `Title` back before you move on.

## The seam that lets you off the hook

Now the other pile. Open `ShowEntity.cs` and rename its `Genre` field to `Category`. Follow
the compiler until it builds — you'll end up touching `ShowsData.cs`, where the translation
happens.

Build, test, and `GET` a show again. What did the JSON do this time?

<details>
<summary>What changed, and what didn't</summary>

Nothing changed for the caller. The response still says `"genre"`, because `ShowDetails` —
the contract — still says `Genre`. You changed how it's *stored*, and the translation in
`ShowsData` absorbed it.

This is why `ShowEntity` and `ShowDetails` are two types instead of one. It looks like
duplication. It's a seam: it means the database can change without breaking callers, and the
API can change without a database migration. The cost is the translation code in the middle.
That's a trade someone made on purpose — now you've felt both sides of it.

</details>

Put `Genre` back.

## A `?` is part of the promise too

Look at `ShowCreateRequest`. `Title` is `required`. `Genre` is `string?` — nullable, optional.

Those aren't just C# keywords; they're clauses in the contract. `required` says *you must send
a title.* `string?` says *genre is optional, and you might get nothing.*

Don't change anything yet — just answer:

- If you made `Genre` **required**, whose code has to change? (Think about the callers who are
  happily not sending it right now.)
- If you made `Title` **optional**, what would the API have to do that it doesn't do today?

You've now looked at three different tools — `required`, `init`, `?` — and the interesting
part was never what they *do*. It was that each one is a decision about what you're promising
and what you're demanding. There are more ways to shape these types than this lab touches;
if you want them, there's a written prompt at the end.

## Write the venue note

You know something now about how this codebase separates "what we store" from "what we
promise." Add it to `venues/persistence.md` or `venues/http.md`, in your own words — the way
those notes are written, aimed at the next person who'll wonder why there are two types for
one show.

## Two questions

1. You renamed a response field and every check you had stayed green. If tests can't catch
   that, what *could*? What would have to exist to warn you before an outside caller found out
   the hard way?
2. Which of the four types would you be most nervous to change in a real system, and least
   nervous? What makes the difference — and is it the same thing that decides the pile it's in?

## What this generalizes to

A type that other code depends on is a contract, whether or not anyone called it that. The
skill this lab is starting is telling *which* of your types are contracts — the ones with
readers you can't see — and treating a change to those as a change to a promise, not just a
change to code. The compiler is a great partner for keeping you consistent with yourself. It
is silent on your obligations to everyone else, and most of the expensive mistakes in a long
codebase's life live in that silence.

If you want to go further on the type choices themselves — records versus classes versus
structs, and when the difference actually bites — ask your AI partner this, and notice it
carries the ideas you already have rather than handing you a fresh list:

> *I've been working with C# records as the request and response types on an HTTP API, and I
> understand they're contracts — other people depend on their shape. What do I gain or lose by
> making one a `class` instead, or a `struct`? I care specifically about equality, mutation,
> and what happens when the shape has to change over time.*
