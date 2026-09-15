Write it the way those notes are written: not "here's how HTTP works," but "here's a thing about this codebase someone new would want to know and wouldn't have guessed."

This codebase uses an interface called IProvideShowsData in order to provide abstraction and allow reusability in the sense that the API can change its impelmentation without changing the endpoints.

You found at least one choice in this code that could've gone another way. Pick the one you feel least sure about. What would you need to see — a requirement, a number, a conversation — to know whether it was the right call?

The choice to create an interface could have gone another way. I would need to see a change in implementation to see if it was the right call. For example, let's say I wanted to change the implementation of get show to include the information for the episodes. I can keep the endpoint the same, while just changing the implementation to return the episodes. This makes the use of an interface very useful.

That request that didn't do what you expected — the one about a show that isn't there. You know what it does. Do you think that's a bug, or a choice? What would settle it?

