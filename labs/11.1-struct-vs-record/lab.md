# Records, structs, and where the difference bites

**What this is for:** you've been using `record` for the API's contract types. C# also has
`struct`, and `record struct`, and plain `class`, and it's easy to treat the choice as style.
It isn't. This lab is fifteen minutes on the one axis that actually separates them — *is this
thing copied, or shared, when you pass it around* — and the couple of places that difference
turns into a real bug. Do it if you've ever been fuzzy on value vs. reference types, or
wondered why `record` even exists when there's already `class`.

You can run these snippets anywhere you like — a throwaway `dotnet new console`, or a scratch
test method in a project you already have. The Asserts are written so a wrong prediction shows
up as a failing test.

## First, kill the myth about equality

Most people leave school believing "classes compare by reference, structs compare by value."
Predict the result of each Assert before you run it.

```csharp
public record ShowSummary(Guid Id, string Title);

var a = new ShowSummary(Guid.Empty, "Severance");
var b = new ShowSummary(Guid.Empty, "Severance");

Assert.True(a == b);          // ?
Assert.False(ReferenceEquals(a, b));  // ?
```

<details>
<summary>What actually happens</summary>

Both pass. `a == b` is **true** even though they're two different objects — because `record`
generates value equality for you. And `ReferenceEquals` is **false** — they really are two
separate objects on the heap.

So the myth is wrong: a `record` is a reference type (a class), but it compares by *value*.
That's most of the reason records exist — reference types that behave sensibly when what you
care about is the data, not the identity. Equality is *not* the thing that separates record
from record struct. The next step is.

</details>

## The axis that actually matters: copied or shared?

Now compare a `record` (reference type) with a `record struct` (value type). Same fields, one
keyword different. Predict both Asserts.

```csharp
public record ReferenceShow(string Title);
public record struct ValueShow(string Title);

// reference type: assignment copies the *reference* — one object, two names
var r1 = new ReferenceShow("Dark");
var r2 = r1 with { }; // a real copy; plain "= r1" would share
Assert.True(ReferenceEquals(r1, r2) == false);

// value type: assignment copies the *data* — two independent values
var v1 = new ValueShow("Dark");
var v2 = v1;
v2 = v2 with { Title = "Devs" };
Assert.Equal("Dark", v1.Title);   // did v1 change when you changed v2?
```

<details>
<summary>What actually happens, and why it matters</summary>

`v1.Title` is still `"Dark"`. When you assigned `v2 = v1`, the value type got *copied* — `v2`
is a separate value, and changing it can't touch `v1`. A reference type would have shared:
`x = someObject` gives you a second name for the *same* object, and a change through one name
is visible through the other.

That's the axis. Not equality — **copy-vs-share on assignment and when passed to methods.**
It's the same idea behind every "why did my list change when I only modified this other
variable?" bug you'll ever hit. Reference types share by default; value types copy.

</details>

## The footgun, so you recognize it later

Value types get copied when you read them out of a collection, too. Predict whether this even
compiles, and if it does, what it prints.

```csharp
public record struct Counter(int Value);

var list = new List<Counter> { new(1) };
list[0].Value = 99;   // <-- what happens here?
```

<details>
<summary>What happens</summary>

It doesn't compile. `list[0]` returns a *copy* of the value, so assigning to its field would
change a copy that's thrown away instantly — and the compiler stops you rather than let you
write a line that does nothing. With a reference type (`record`/`class`), `list[0].Value = 99`
*would* compile and *would* stick, because `list[0]` hands back the shared object.

This is the classic mutable-value-type trap. It's the main reason the advice is "keep structs
small and immutable": a value type you expected to mutate in place will quietly copy instead,
and half the time the compiler can't even warn you. When a struct is small and you treat it as
an immutable value, it's great — and cheap. When you want to reach into a collection and change
one in place, you wanted a reference type.

</details>

## When you'd actually reach for each

No code — just fix the reasoning, because this is the part that transfers:

- A **`record` (class)** — the default for your API contracts and most things. Value equality
  when you want it, shared reference semantics, no copying cost, mutate-in-a-collection works.
- A **`record struct`** — a small, immutable value that you'd rather copy than share: a
  coordinate, a money amount, a measurement. Cheap, and it never surprises you with shared
  state — *as long as you keep it small and don't try to mutate it in place.*

`ShowSummary` and `ShowDetails` are records-as-classes, and that's right: they're handed
around, they might grow, and nobody wants a copy-on-read surprise in the middle of the API.

## One question

Where in code you've already seen — this API, or anything from school — would choosing the
wrong one (a big mutable struct, or a shared reference you meant to copy) have caused a bug
that's hard to spot? What would the symptom have looked like?

If you want the full space rather than this one axis, ask your AI partner — and make it carry
the axis you now have:

> *I understand the real difference between a C# `record` (class) and a `record struct` is
> copy-vs-share semantics, not equality. Beyond that axis, what else should drive the choice
> between class, struct, record, and record struct — performance, memory, `readonly`, `ref`
> returns? Give me the cases where each is clearly right.*
