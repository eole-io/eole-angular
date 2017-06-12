/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.my-game').config(function ($routeProvider, gamePath) {
        $routeProvider.when('/games/my-game/parties/:partyId', {
            controller: 'my-game.PartyController',
            templateUrl: gamePath+'/views/index.html'
        });
    });
})(angular);
