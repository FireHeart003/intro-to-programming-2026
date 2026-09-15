# Requests

The same requests as `Shows.Api.http`, with room to say what to expect before you send
each one. Runnable from VS Code (REST Client extension), Rider, or Visual Studio.

Start the app first: `dotnet run --project AppHost`.

```
@host = https://localhost:1337
```

## List all shows

Before you send it: what comes back when the list is empty — an error, or something else?

```http
GET {{host}}/shows
Accept: application/json
```

## Add a show

Predict the status code before you send it. Then look at the response headers — one of
them tells you where the new show lives.

```http
POST {{host}}/shows
Content-Type: application/json

{
  "title": "Twin Peaks: The Return",
  "genre": "Drama"
}
```

## Add a show that shouldn't be allowed

A one-character title. Predict what happens before you send it — who decides two
characters is the minimum, and where is that written down?

```http
POST {{host}}/shows
Content-Type: application/json

{
  "title": "X"
}
```

## Get one show

Paste an `id` from the list. Then try it again with an id that doesn't exist — a made-up
GUID. Predict each one first. The second may not do what you expect.

```http
GET {{host}}/shows/00000000-0000-0000-0000-000000000000
Accept: application/json
```
