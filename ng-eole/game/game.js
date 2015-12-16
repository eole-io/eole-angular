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

ngEole.controller('GameController', ['$scope', 'eoleApi', '$routeParams', 'eoleWs', 'eoleSession', '$location', function ($scope, eoleApi, $routeParams, eoleWs, eoleSession, $location) {
    $scope.game = null;
    $scope.parties = [];

    var gameName = $routeParams.gameName;

    $scope.createParty = function () {
        eoleApi.createParty(gameName, eoleSession.player).then(function (party) {
            $location.path('/games/'+gameName+'/parties/'+party.id);
        });
    };

    $scope.join = function (party) {
        eoleApi.joinParty(eoleSession.player, gameName, party.id);
    };

    eoleApi.getGameByName(gameName).then(function (game) {
        $scope.game = game;
    });

    eoleApi.getPartiesForGame(gameName).then(function (parties) {
        $scope.parties = parties;
    });

    eoleWs.sessionPromise.then(function (ws) {
        ws.subscribe('eole/core/game/'+gameName+'/parties', function (topic, event) {
            switch (event.type) {
                case 'created':
                    $scope.parties.push(event.party);
                    break;

                case 'gone':
                    $scope.parties = $scope.parties.filter(function (party) {
                        return party.id !== event.party.id;
                    });
                    break;
            }

            $scope.$apply();
        });
    });
}]);
