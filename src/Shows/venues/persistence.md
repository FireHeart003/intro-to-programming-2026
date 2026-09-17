# Persistence

Shows are stored in Postgres through Marten, which keeps them as documents rather than as
rows in a hand-designed table.

## The stored shape is not the published shape

What we store is `ShowEntity`. What the API hands back is `ShowSummary` (in the list) and
`ShowDetails` (for one show). They are deliberately different types.

Keeping them separate means the database can change without changing what callers see, and
what callers see can change without a database migration. The translation happens in
`ShowsData`.

### Why we go with this approach
We are making a promise to a caller to perform a certain request. Any change to `ShowContracts.cs` will force callers to update their own code to comply with the changes made. This is not a good practice, as we are changing the promise on the caller. Instead, we have `ShowEntity` which is how we store the shows in the database. We can make any necessary changes here without having to change our promise in `ShowContracts.cs`. By isolating the API from how we store shows in the database, we are able to keep our promises without interfering with the callers.


## Only one file knows it's Postgres

Everything talks to `IProvideShowsData`. `ShowsData` is the only place that mentions Marten
or the database at all. That is why there is an interface here for something there is
currently only one of.
