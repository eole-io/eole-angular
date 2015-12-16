'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/tictactoe/parties/:partyId', {
        controller: 'TicTacToeController',
        templateUrl: 'ng-eole/games/tictactoe/tictactoe.html'
    });
}]);

ngEole.controller('TicTacToeController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', function ($scope, $routeParams, eoleApi, eoleWs) {
    var partyId = $routeParams.partyId;

    $scope.Math = Math;
    $scope.party = null;
    $scope.game = null;
    $scope.tictactoe = {
        grid: '-'.repeat(9),
        last_move: null
    };

    $scope.click = function (col, row) {
        eoleWs.sessionPromise.then(function (ws) {
            ws.publish('eole/games/tictactoe/parties/'+partyId, {
                col: col,
                row: row
            });
        });
    };

    eoleWs.sessionPromise.then(function (ws) {
        ws.subscribe('eole/games/tictactoe/parties/'+partyId, function (topic, event) {
            console.log('ttt event', topic, event);

            switch (event.type) {
                case 'init':
                    $scope.party = event.party;
                    $scope.game = event.party.game;
                    $scope.tictactoe = event.tictactoe;
                    break;

                case 'move':
                    $scope.tictactoe.grid = replaceAt(
                        $scope.tictactoe.grid,
                        event.move.col,
                        event.move.row,
                        event.move.symbol
                    );
                    $scope.tictactoe.last_move = event.move.symbol;
                    break;

                case 'join':
                    $scope.party.slots[event.position].player = event.player;
                    break;
            }

            $scope.$apply();
        });
    });

    var replaceAt = function(string, col, row, character) {
        var index = row * 3 + col;

        return string.substr(0, index) + character + string.substr(index + character.length);
    };
}]);
