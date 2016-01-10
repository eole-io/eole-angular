'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/awale/parties/:partyId', {
        controller: 'AwaleController',
        templateUrl: 'ng-eole/games/awale/awale.html'
    });
}]);

ngEole.controller('AwaleController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession) {
    var partyId = $routeParams.partyId;
    var seedsCoords = new AwaleSeeds({x: 19, y: 19});
    $scope.reverseBoard = false;
    $scope.screenPlayer0 = 0;
    $scope.screenPlayer1 = 1;
    $scope.displayJoinButton = false;
    $scope.party = {};
    $scope.seedsCoords = seedsCoords.toStyle();
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

    $scope.join = function () {
        eoleApi.joinParty(eoleSession.player, 'awale', partyId);
    };

    $scope.move = function (move) {
        eoleApi.callGame('awale', 'post', 'play', eoleSession.player, {
            move: move,
            party_id: partyId
        });
    };

    eoleApi.callGame('awale', 'get', 'find-by-id/'+partyId).then(function (awaleParty) {
        $scope.grid = awaleParty.grid;
        seedsCoords.setGrid(awaleParty.grid);
        console.log(seedsCoords, seedsCoords.toStyle());
        $scope.seedsCoords = seedsCoords.toStyle();
        $scope.party = awaleParty.party;
        $scope.displayJoinButton = (awaleParty.party.state === 0) && !partyManager.inParty(awaleParty.party);
        $scope.reverseBoard = 0 === partyManager.getPlayerPosition(awaleParty.party);
        if ($scope.reverseBoard) {
            $scope.screenPlayer0 = 1;
            $scope.screenPlayer1 = 0;
        }
    });
}]);
