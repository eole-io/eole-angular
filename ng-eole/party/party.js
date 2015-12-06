'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/:gameName/parties/:partyId', {
        controller: 'PartyController',
        templateUrl: 'ng-eole/party/party.html'
    });
}]);

ngEole.controller('PartyController', ['$scope', '$routeParams', 'eoleApi', function ($scope, $routeParams, eoleApi) {
    var gameName = $routeParams.gameName;
    var partyId = $routeParams.partyId;

    $scope.party = null;
    $scope.game = null;

    eoleApi.getParty(gameName, partyId).then(function (party) {
        console.log(party);

        $scope.party = party;
        $scope.game = party.game;
    });
}]);
