(function (angular) {
    'use strict';

    angular.module('eole.core.default-game').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/:gameName/parties/:partyId', {
            controller: 'PartyController',
            templateUrl: 'ng-eole/default-game/views/party.html'
        });
    }]);

})(angular);

