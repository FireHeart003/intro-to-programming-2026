# Two ways to fake a dependency

**What this is for:** the Shows tests stand in for the watch desk with NSubstitute —
`Substitute.For<INotifyInventoryControl>()`. That's one way to make a stand-in. There's
another: write the stand-in yourself, as an ordinary class. This short lab does the same job
both ways so you can see what each buys, and stop treating "use a mocking library" as the only
option. Do it if a mocking library still feels like magic, or if you've ever fought one to
assert something simple.

Before you start: **builds on** the Shows API and its tests. You'll add a class and a test.

## What a "double" actually is

Open `Shows.Tests/ShowsApiFixture.cs`. The relevant line:

```csharp
public readonly INotifyInventoryControl Notifier = Substitute.For<INotifyInventoryControl>();
```

`Substitute.For<INotifyInventoryControl>()` hands you an object that implements the interface
without you writing a class. It records every call, and lets you assert on them later
(`Notifier.Received().NotifyNewShowAsync(...)`).

Here's the thing to internalize: there is nothing magic about that object. It's just *a class
that implements the interface*, generated for you at runtime. You can write the same thing by
hand — and it's worth doing once so the magic turns into "oh, that's all it is."

## Write the stand-in yourself

Add `Shows.Tests/RecordingNotifier.cs`:

<details>
<summary>Reveal the hand-written fake</summary>

```csharp
using Shows.Api.Shows;

namespace Shows.Tests;

// A stand-in for the watch desk, written by hand. It doesn't call anyone — it just
// remembers what it was told, so a test can check afterward.
public class RecordingNotifier : INotifyInventoryControl
{
    public List<ShowSummary> Notified { get; } = [];

    public Task NotifyNewShowAsync(ShowSummary show)
    {
        Notified.Add(show);
        return Task.CompletedTask;
    }
}
```

That's the whole thing. It's a class that implements the interface and keeps a list. This kind
of fake — one that records what happened so you can inspect it — is often called a *spy*.

</details>

## Use it, and assert the hand-written way

Swap it in where the substitute goes. In the fixture's `ConfigureTestServices`, the substitute
is registered like this:

```csharp
services.AddScoped<INotifyInventoryControl>(_ => Notifier);
```

The hand-written fake goes in exactly the same spot — expose a `RecordingNotifier` from the
fixture instead of the substitute, register it the same way, and then your assertion changes
from NSubstitute's `.Received(...)` to a plain check on the list:

```csharp
Assert.Contains(fixture.Notifier.Notified, s => s.Title == "The Leftovers");
```

Same test, same coverage, no library — just a class you can read and a list you can inspect.

## What each one buys

Fix the reasoning — this is the transferable part:

| | Mocking library (NSubstitute) | Hand-written fake |
|---|---|---|
| Writing it | Nothing to write | A small class per interface |
| Reading it | Have to know the library's API | It's just C# |
| Simple "was this called?" | Fast: `Received()` | Fine: check a list |
| The stand-in needs *behavior* | Awkward — you're scripting a mock | Natural — it's real code |
| Reused across many tests | Re-set-up each time | Write once, reuse |

Neither is "correct." The library wins when you want a throwaway stand-in and a quick "was
this called with that?" The hand fake wins when the stand-in needs real behavior (return
canned data, count things, simulate a sequence), when you'll reuse it, or when you just want a
teammate to be able to read the test without knowing the library.

## One question

The watch-desk fake here does nothing but record. Imagine a stand-in that had to *behave* —
say, a fake data store that actually holds shows and hands them back (you may have written one
in another lab). Which approach would you reach for then, and why? What does that tell you
about when a mocking library starts working against you?

## What this generalizes to

A test double is not a library feature — it's any stand-in that satisfies the interface the
real thing satisfies. A mocking library generates one for you; a hand-written fake is one you
author. Knowing they're the same idea means you pick by fit instead of habit: reach for the
library for quick, behavior-free stand-ins and call-checks, and write the class when the
stand-in has to *do* something or earn its keep across many tests.

And note what neither of these changes: a stand-in *inside the test* — library or hand-rolled —
is still a double in the test, which is what keeps this suite a notch below a true system test.
Swapping NSubstitute for a hand fake changes the ergonomics, not the grade. Closing that gap is
a different move — see the lab on making it a real system test.
