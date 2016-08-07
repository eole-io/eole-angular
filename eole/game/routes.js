(function (angular) {
    'use strict';

    angular.module('eole.core.game').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games', {
            controller: 'GamesController',
            templateUrl: 'eole/game/views/games.html'
        });
        $routeProvider.when('/games/:gameName', {
            controller: 'GameController',
            templateUrl: 'eole/game/views/game.html'
        });
    }]);
})(angular);
