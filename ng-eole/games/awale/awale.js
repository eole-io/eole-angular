'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/awale/parties/:partyId', {
        controller: 'AwaleController',
        templateUrl: 'games/awale/awale.html'
    });
}]);

ngEole.controller('AwaleController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession) {

}]);
