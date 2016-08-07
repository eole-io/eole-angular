(function (angular) {
    'use strict';

    angular.module('eole.core.default-game').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/:gameName/parties/:partyId', {
            controller: 'PartyController',
            templateUrl: 'eole/default-game/views/party.html'
        });
    }]);
})(angular);

