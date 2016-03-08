(function (angular) {
    'use strict';

    angular.module('eole.games.tictactoe').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/tictactoe/parties/:partyId', {
            controller: 'TicTacToeController',
            templateUrl: 'eole/games/tictactoe/views/tictactoe.html'
        });
    }]);

})(angular);
