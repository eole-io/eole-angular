# Initiate a game module

This documentation assumes a local installation of Eole.

## Creating an Angular module

To interact with AngularJS application, you have to create an Angular module,
named as you want, for example:

**eole/games/my-game/module.js**
``` js
(function (angular) {
    'use strict';

    angular.module('eole.games.my_game', ['ngRoute']);

})(angular);
```

> Note that your module depends of `ngRoute` module,
> you will need soon to register new routes.

Include this script in `index.html`:

``` html
        <script type="text/javascript" src="eole/games/my-game/module.js"></script>
```

Register your game in Eole environment, in `eole/config.js`:

``` js
    angular.module('eole.games', [
        '...',
        'eole.games.my_game'
    ]);
```


## Implementing the main game page

By default, Eole has a default controller for the route `/games/:gameName/parties/:partyId`.
This is a simple page with the list of players who joined the party.

You can override it by creating a controller and a view:

**eole/games/my-game/controllers/party.js**:
``` js
(function (angular) {
    'use strict';

    angular.module('eole.games.my_game').controller('my_game.PartyController', ['$scope', '$routeParams', 'eoleApi', function ($scope, $routeParams, eoleApi) {
        var partyId = $routeParams.partyId;

        $scope.party = null;

        // Using the Eole Api to retrieve core game data
        eoleApi.getParty('my_game', partyId).then(function (party) {
            $scope.party = party;
        });

        // Do what you want...
    }]);

})(angular);
```

> Note that you must prefix your controllers and services name with the game name
> to avoid collision with others games services,
> AngularJs don't handle same services name in differents modules...
>
> See this [StackOverflow question](http://stackoverflow.com/questions/17862209/how-to-use-two-angularjs-services-with-same-name-from-different-modules),
> or [this other one](http://stackoverflow.com/questions/13406791/modules-and-namespace-name-collision-in-angularjs).

And creating the view, for exemple: **eole/games/my-game/views/party.html**.

Now, just register a new route through [AngularJs UI-Router](http://angular-ui.github.io/ui-router):

**eole/games/my-game/routes.js**:
``` js
(function (angular) {
    'use strict';

    angular.module('eole.games.my_game').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/my-game/parties/:partyId', {
            controller: 'my_game.PartyController',
            templateUrl: 'eole/games/my-game/views/party.html'
        });
    }]);

})(angular);
```

Just append your scripts to `index.html`:

``` html
        <script type="text/javascript" src="eole/games/my-game/routes.js"></script>
        <script type="text/javascript" src="eole/games/my-game/controllers/party.js"></script>
```

