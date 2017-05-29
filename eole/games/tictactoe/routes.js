/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.tictactoe').config(function ($routeProvider, gamePath) {
        $routeProvider.when('/games/tictactoe/parties/:partyId', {
            controller: 'TicTacToeController',
            templateUrl: gamePath+'/views/tictactoe.html'
        });
    });
})(angular);
