# Persistence

Shows are stored in Postgres through Marten, which keeps them as documents rather than as
rows in a hand-designed table.

## The stored shape is not the published shape

What we store is `ShowEntity`. What the API hands back is `ShowSummary` (in the list) and
`ShowDetails` (for one show). They are deliberately different types.

Keeping them separate means the database can change without changing what callers see, and
what callers see can change without a database migration. The translation happens in
`ShowsData`.

## Only one file knows it's Postgres

Everything talks to `IProvideShowsData`. `ShowsData` is the only place that mentions Marten
or the database at all. That is why there is an interface here for something there is
currently only one of.
