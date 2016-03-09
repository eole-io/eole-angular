# Creating a game

A game in Eole AngularJS application is an Angular module
which provides controllers for game pages, routes, views, translations, services, css, js...

By default, when you have not yet created the game, when a player create a party,
the application redirect him to the main page, at `/#!/games/your-game/parties/42`,
with `your-game` your game name (`_` are replaced with `-`),
and `42` the party id.

There is a default (or fallback) controller and view if you have not yet implemented
your game, but this is the first page that this documentation will address.

Next step:

- [Initiate a game module](init-game.md)
