# Shows API

A small HTTP API for a shared watchlist: add a show, get one back, list them all.
You did not write this. Someone else did, and now it is yours.

## What's here

| Project | What it is |
|---|---|
| `AppHost` | The Aspire host. Run **this** — it starts Postgres in a container and then the API. |
| `ServiceDefaults` | Shared setup every service gets: health checks, OpenTelemetry, resilience. |
| `Shows.Api` | The API itself. The interesting code is in `Shows/`. |
| `Shows.Tests` | The tests. Real Postgres in a container; the watch desk is stood in for. |

## Running it

```
dotnet run --project AppHost
```

The Aspire dashboard opens. The API resource has a link to its endpoints, and the
dashboard is where you watch logs, traces, and metrics.

## Running the tests

```
dotnet test
```

Docker must be running — the tests start their own Postgres.

## venues/

`venues/` describes how *this* codebase does things, and where it differs from what a
newcomer would assume. Read it. You will add to it.
