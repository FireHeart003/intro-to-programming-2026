# HTTP

The API is resource-oriented: shows are a collection at `/shows`, and a single show is a
subordinate resource at `/shows/{id}`. `GET` reads, `POST` to the collection adds one.

## Adding a show is best-effort about the watch desk

The watch desk is another team's service. When a show is added, we tell them — but if that
call fails, **the show is still added and the request still succeeds.** Adding a show does
not depend on the watch desk being up.

That is a decision, not an accident. It could have gone the other way (refuse to add a show
unless the desk confirms). Here, the show is what matters and the notification is a
courtesy. The consequence: the desk can be briefly out of sync, and nothing here fixes that.
