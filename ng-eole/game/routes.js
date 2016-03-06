(function (angular) {
    'use strict';

    angular.module('eole.core.game').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games', {
            controller: 'GamesController',
            templateUrl: 'ng-eole/game/views/games.html'
        });
        $routeProvider.when('/games/:gameName', {
            controller: 'GameController',
            templateUrl: 'ng-eole/game/views/game.html'
        });
    }]);

})(angular);
