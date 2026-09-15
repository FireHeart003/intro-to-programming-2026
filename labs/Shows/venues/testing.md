# Testing

The tests boot the real API in-process (with Alba) against a real Postgres running in a
container (with Testcontainers). They exercise the API the way a caller would: send a
request, check the response.

## A real database is fine. A stand-in inside the test is what changes the kind.

Postgres in a container is a real dependency, running for real, thrown away after. Using it
does not lower the grade of the test — the goal is exactly this: the system, end to end,
through its published surface.

What *does* change the kind is a stand-in **in the test itself**. These tests replace the
watch desk (`INotifyInventoryControl`) with a substitute, because we will not reach another
team's service from a test. The moment a test does that, it is no longer a system test in
the strict sense — there is a double in it.

That is a known gap here, not an oversight. Standing up a real stand-in for the watch desk
(so the test has no doubles in it) is the kind of thing a later lab picks up.
