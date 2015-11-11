'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games', {
        controller: 'GamesController',
        templateUrl: 'ng-eole/game/games.html'
    });
    $routeProvider.when('/games/:gameName', {
        controller: 'GameController',
        templateUrl: 'ng-eole/game/game.html'
    });
}]);

ngEole.controller('GamesController', ['$scope', 'eoleApi', function ($scope, eoleApi) {
    $scope.games = [];

    eoleApi.getGames().then(function (games) {
        $scope.games = games;
    });
}]);

ngEole.controller('GameController', ['$scope', 'eoleApi', '$routeParams', function ($scope, eoleApi, $routeParams) {
    $scope.game = null;

    eoleApi.getGameByName($routeParams.gameName).then(function (game) {
        $scope.game = game;
    });
}]);
