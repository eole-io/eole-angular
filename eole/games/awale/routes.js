/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.awale').config(function ($routeProvider, gamePath) {
        $routeProvider.when('/games/awale/parties/:partyId', {
            controller: 'AwaleController',
            templateUrl: gamePath+'/views/awale.html'
        });
    });
})(angular);
