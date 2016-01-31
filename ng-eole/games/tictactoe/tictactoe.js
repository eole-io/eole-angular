'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/tictactoe/parties/:partyId', {
        controller: 'TicTacToeController',
        templateUrl: 'ng-eole/games/tictactoe/tictactoe.html'
    });
}]);

ngEole.controller('TicTacToeController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession) {
    var partyId = $routeParams.partyId;
    var myColor = null;

    $scope.Math = Math;
    $scope.party = null;
    $scope.game = null;
    $scope.finished = false;
    $scope.myTurn = false;
    $scope.displayJoinButton = false;
    $scope.tictactoe = {
        grid: '-'.repeat(9),
        last_move: null
    };
    $scope.animate = ' '.repeat(9).split('').map(function () {
        return false;
    });

    $scope.join = function () {
        eoleSession.oauthTokenPromise.then(function (token) {
            eoleApi.joinParty(token, 'tictactoe', $scope.party.id);
        });
    };

    $scope.play = function (col, row) {
        eoleWs.sessionPromise.then(function (ws) {
            ws.publish('eole/games/tictactoe/parties/'+partyId, {
                type: 'move',
                col: col,
                row: row
            });
        });
    };

    function init(event) {
        $scope.party = event.party;
        $scope.game = event.party.game;
        $scope.tictactoe = event.tictactoe;
        myColor = ['X', 'O'][partyManager.getPlayerPosition(event.party)];
        $scope.myTurn = myColor === event.tictactoe.current_player;
        $scope.displayJoinButton = (event.party.state === 0) && !partyManager.inParty(event.party);
    }

    eoleWs.sessionPromise.then(function (ws) {
        ws.subscribe('eole/games/tictactoe/parties/'+partyId, function (topic, event) {
            console.log('ttt event', topic, event);

            switch (event.type) {
                case 'restart':
                    $timeout(function () {
                        init(event);
                        $scope.finished = false;
                    }, 2800);
                    break;

                case 'init':
                    init(event);
                    break;

                case 'move':
                    $scope.tictactoe.grid = replaceAt(
                        $scope.tictactoe.grid,
                        event.move.col,
                        event.move.row,
                        event.move.symbol
                    );
                    $scope.tictactoe.last_move = event.move.symbol;
                    $scope.myTurn = myColor === event.current_player;
                    break;

                case 'join':
                    $scope.party.slots[event.position].player = event.player;
                    $scope.displayJoinButton = false;
                    myColor = ['X', 'O'][partyManager.getPlayerPosition($scope.party)];
                    $scope.myTurn = myColor === $scope.tictactoe.current_player;
                    break;

                case 'end':
                    $scope.finished = true;
                    $scope.myTurn = false;

                    if ('-' === event.winner) {
                        break;
                    }

                    for (var i = 0; i < 3; i++) {
                        $timeout(function () {
                            animate(event.brochette[0]);
                        }, 300 + 600 * i);
                        $timeout(function () {
                            animate(event.brochette[1]);
                        }, 380 + 600 * i);
                        $timeout(function () {
                            animate(event.brochette[2]);
                        }, 460 + 600 * i);
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
