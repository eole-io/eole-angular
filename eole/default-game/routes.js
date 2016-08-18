/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.default-game').config(function ($routeProvider) {
        $routeProvider.when('/games/:gameName/parties/:partyId', {
            controller: 'PartyController',
            templateUrl: 'eole/default-game/views/party.html'
        });
    });
})(angular);

