(function (angular) {
    'use strict';

    angular.module('eole.games.awale').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/awale/parties/:partyId', {
            controller: 'AwaleController',
            templateUrl: 'eole/games/awale/views/awale.html'
        });
    }]);

})(angular);
