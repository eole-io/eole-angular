(function (angular) {
    'use strict';

    var awaleModule = angular.module('eole.games.awale', []);

    awaleModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/games/awale/parties/:partyId', {
            controller: 'AwaleController',
            templateUrl: 'eole/games/awale/awale.html'
        });
    }]);

    awaleModule.controller('AwaleController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', '$translate', 'gridManager', 'animHighlight', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession, $translate, gridManager, animHighlight) {
        var ANIMATION_DELAY = 250;
        var partyId = $routeParams.partyId;
        var seedsCoords = new AwaleSeeds({x: 19, y: 19});
        var playerPosition = null;
        $scope.currentPlayer = null;
        $scope.reverseBoard = false;
        $scope.winner = null;
        $scope.screenPlayer0 = 0;
        $scope.screenPlayer1 = 1;
        $scope.displayJoinButton = false;
        $scope.party = {};
        $scope.seedsCoords = seedsCoords.toStyle();
        $scope.bottomText = '';
        $scope.grid = gridManager.createInitGrid();
        $scope.flashed = animHighlight.initFlashGrid();
        $scope.lastMove = null;
        var animationThreads = [];
        initLastMove();

        $scope.join = function () {
            eoleSession.oauthTokenPromise.then(function (token) {
                eoleApi.joinParty(token, 'awale', partyId);
            });
        };

        $scope.move = function (move) {
            var lastGrid = gridManager.cloneGrid($scope.grid);

            eoleSession.oauthTokenPromise.then(function (token) {
                eoleApi.callGame('awale', 'post', 'play', token, {
                    move: move,
                    party_id: partyId
                }).then(function (r) {
                    $scope.currentPlayer = r.currentPlayer;
                }).catch(function (r) {
                    stopAnimation();
                    $scope.grid = lastGrid;
                    $scope.currentPlayer = 1 - $scope.currentPlayer;
                    updateSeedsCoords();
                    initLastMove();
                });
            });

            initLastMove();
            animate(playerPosition, move);
            $scope.currentPlayer = 1 - $scope.currentPlayer;
        };

        eoleApi.callGame('awale', 'get', 'find-by-id/'+partyId).then(function (awaleParty) {
            $scope.party = awaleParty.party;
            $scope.grid = awaleParty.grid;
            $scope.currentPlayer = awaleParty.current_player;
            $scope.winner = awaleParty.winner;
            updateBoardVariables();
            updateSeedsCoords();
            updateWinner();
        });

        eoleWs.socketPromise.then(function (socket) {
            socket.subscribe('eole/games/awale/parties/'+partyId, function (topic, event) {
                switch (event.type) {
                    case 'join':
                        $scope.party = event.party;
                        updateBoardVariables();
                        break;

                    case 'played':
                        if (playerPosition !== event.move.player) {
                            initLastMove();
                            animate(event.move.player, event.move.move);
                            $scope.currentPlayer = event.current_player;
                        }
                        break;

                    case 'party_end':
                        $scope.party.state = 2;
                        $scope.winner = event.winner;
                        updateWinner();
                        break;
                }

                $scope.$apply();
            });
        });

        function animate(player, move) {
            var animationSteps = [];

            var _player = player;
            var _move = move;
            var simulationGrid = gridManager.cloneGrid($scope.grid);
            var hand = gridManager.getSeedsNumber(simulationGrid, player, move);

            animationSteps.push([player, move, - gridManager.getSeedsNumber(simulationGrid, player, move)]);
            gridManager.clearSeedsNumber(simulationGrid, player, move);

            while (hand > 0) {
                if (0 === _player) {
                    _move--;

                    if (_move < 0) {
                        _move = 0;
                        _player = 1;
                    }
                } else {
                    _move++;

                    if (_move > 5) {
                        _move = 5;
                        _player = 0;
                    }
                }

                if (_move === move && _player === player) {
                    continue;
                }

                hand--;
                gridManager.addSeeds(simulationGrid, _player, _move, 1);
                animationSteps.push([_player, _move, 1]);
            }

            if (!gridManager.willStarveOpponent(simulationGrid, player, _player, _move)) {
                while (
                    (_player !== player) &&
                    (-1 !== [0, 1, 2, 3, 4, 5].indexOf(_move)) &&
                    (gridManager.has2Or3Seeds(simulationGrid, _player, _move))
                ) {
                    animationSteps.push([_player, _move, 'store']);
                    _move += _player ? -1 : 1;
                }
            }

            angular.forEach(animationSteps, function (step, i) {
                $scope.lastMove[animationSteps[0][0]][animationSteps[0][1]].push('start');

                var thread = $timeout(function () {
                    if ('store' === step[2]) {
                        gridManager.storeSeeds($scope.grid, step[0], step[1])
                        $scope.lastMove[step[0]][step[1]].push('eat');
                        animHighlight.flashAttic($scope.flashed, 1 - step[0]);
                    } else {
                        gridManager.addSeeds($scope.grid, step[0], step[1], step[2]);
                    }

                    $scope.lastMove[step[0]][step[1]].push('feed');
                    animHighlight.flashBox($scope.flashed, step[0], step[1]);

                    updateSeedsCoords();
                }, i * ANIMATION_DELAY);

                animationThreads.push(thread);
            });
        }

        function stopAnimation() {
            while (animationThreads.length > 0) {
                $timeout.cancel(animationThreads.pop());
            }
        }

        function updateBoardVariables() {
            $scope.displayJoinButton = ($scope.party.state === 0) && !partyManager.inParty($scope.party);
            playerPosition = partyManager.getPlayerPosition($scope.party);
            $scope.reverseBoard = 0 === playerPosition;
            if ($scope.reverseBoard) {
                $scope.screenPlayer0 = 1;
                $scope.screenPlayer1 = 0;
            }
        }

        function updateSeedsCoords() {
            seedsCoords.setGrid($scope.grid);
            $scope.seedsCoords = seedsCoords.toStyle();
        }

        function updateWinner() {
            if (-1 !== [0, 1].indexOf($scope.winner)) {
                $translate('{username}.won', $scope.party.slots[$scope.winner].player).then(function (message) {
                    $scope.bottomText = message;
                });
            } else if (-1 === $scope.winner) {
                $translate('party.drawn').then(function (message) {
                    $scope.bottomText = message;
                });
            } else {
                $scope.bottomText = '';
            }
        }

        function initLastMove() {
            $scope.lastMove = [
                [[], [], [], [], [], []],
                [[], [], [], [], [], []]
            ];
        }

        $scope.isMyTurn = function () {
            return (null !== playerPosition) && ($scope.currentPlayer === playerPosition);
        };

        $scope.canMove = function () {
            return $scope.isPartyActive() && $scope.isMyTurn();
        };

        $scope.canMoveContainer = function (seedNumber) {
            return $scope.canMove() && seedNumber;
        };

        $scope.isPartyActive = function () {
            if (!$scope.party) {
                return false;
            }

            return 1 === $scope.party.state;
        };
    }]);
})(angular);
