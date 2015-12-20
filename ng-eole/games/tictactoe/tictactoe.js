'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/tictactoe/parties/:partyId', {
        controller: 'TicTacToeController',
        templateUrl: 'ng-eole/games/tictactoe/tictactoe.html'
    });
}]);

ngEole.controller('TicTacToeController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', function ($scope, $routeParams, eoleApi, eoleWs, $timeout) {
    var partyId = $routeParams.partyId;

    $scope.Math = Math;
    $scope.party = null;
    $scope.game = null;
    $scope.finished = false;
    $scope.tictactoe = {
        grid: '-'.repeat(9),
        last_move: null
    };
    $scope.animate = ' '.repeat(9).split('').map(function () {
        return false;
    });

    $scope.play = function (col, row) {
        eoleWs.sessionPromise.then(function (ws) {
            ws.publish('eole/games/tictactoe/parties/'+partyId, {
                type: 'move',
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

                case 'end':
                    $scope.finished = true;

                    for (var i = 0; i < 3; i++) {
                        $timeout(function () {
                            animate(event.brochette[0]);
                        }, 500 + 1000 * i);
                        $timeout(function () {
                            animate(event.brochette[1]);
                        }, 580 + 1000 * i);
                        $timeout(function () {
                            animate(event.brochette[2]);
                        }, 660 + 1000 * i);
                    }

                    break;
            }

            $scope.$apply();
        });

        ws.publish('eole/games/tictactoe/parties/'+partyId, {
            type: 'need-refresh'
        });
    });

    var getIndex = function (col, row) {
        return row * 3 + col;
    };

    var replaceAt = function (string, col, row, character) {
        var index = getIndex(col, row);

        return string.substr(0, index) + character + string.substr(index + character.length);
    };

    var animate = function (index) {
        $scope.animate[index] = true;

        $timeout(function () {
            $scope.animate[index] = false;
        }, 20);
    };
}]);
