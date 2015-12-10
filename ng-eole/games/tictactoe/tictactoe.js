'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/tictactoe/parties/:partyId', {
        controller: 'TicTacToeController',
        templateUrl: 'ng-eole/games/tictactoe/tictactoe.html'
    });
}]);

ngEole.controller('TicTacToeController', ['$scope', '$routeParams', 'eoleApi', function ($scope, $routeParams, eoleApi) {
    var partyId = $routeParams.partyId;

    $scope.party = null;
    $scope.game = null;

    eoleApi.getParty('tictactoe', partyId).then(function (party) {
        console.log(party);

        $scope.party = party;
        $scope.game = party.game;
    });
}]);
