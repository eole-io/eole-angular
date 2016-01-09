'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/awale/parties/:partyId', {
        controller: 'AwaleController',
        templateUrl: 'ng-eole/games/awale/awale.html'
    });
}]);

ngEole.controller('AwaleController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession) {
    var partyId = $routeParams.partyId;
    var awaleParty = null;
    $scope.grid = [
        {
            seeds: [0, 0, 0, 0, 0, 0],
            attic: 0
        },
        {
            seeds: [0, 0, 0, 0, 0, 0],
            attic: 0
        }
    ];
    $scope.party = {};

    $scope.move = function (move) {
        eoleApi.call('post', 'api/games/awale/play', eoleSession.player, {
            move: move,
            party_id: partyId
        });
    };

    eoleApi.call('get', 'api/games/awale/find-by-id/'+partyId).then(function (data) {
        awaleParty = data;
        $scope.grid = awaleParty.grid;
        $scope.party = awaleParty.party;
    });
}]);
