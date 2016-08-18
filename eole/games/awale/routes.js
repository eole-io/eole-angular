/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.awale').config(function ($routeProvider) {
        $routeProvider.when('/games/awale/parties/:partyId', {
            controller: 'AwaleController',
            templateUrl: 'eole/games/awale/views/awale.html'
        });
    });
})(angular);
