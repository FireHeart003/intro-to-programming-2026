# Requests

The same requests as `Shows.Api.http`, with room to say what to expect before you send
each one. Runnable from VS Code (REST Client extension), Rider, or Visual Studio.

Start the app first: `dotnet run --project AppHost`.

```
@host = https://localhost:1337
```

## List all shows

Before you send it: what comes back when the list is empty — an error, or something else?

Prediction: If the list is empty, it will just return an empty list. The status should be 200 ok

```http
GET {{host}}/shows
Accept: application/json
```

## Add a show

Predict the status code before you send it. Then look at the response headers — one of
them tells you where the new show lives.

Prediction: The status code should be OK since the action will be completed

What actually happened: The status code was 201 for created, meaning that the show was successfully created. The new show lives in the "Location" path attribute shown in the response header with an unique ID

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

Prediction: You will get a status code in the 400 for a bad request as a one-character title is not allowed. This is written down in the ShowCreateRequest method.

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

The valid id should give a response of 200 status ok since it exists while a show that does not exist should have a 404 not found status code for bad request.

Actually, what happened was a 500 interneral server error, which was different from my expected 404 not found status.

```http
GET {{host}}/shows/c46dcb1e-a51c-46fb-a514-2bcce9892337
Accept: application/json
```
