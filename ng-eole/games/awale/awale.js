'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/games/awale/parties/:partyId', {
        controller: 'AwaleController',
        templateUrl: 'ng-eole/games/awale/awale.html'
    });
}]);

ngEole.controller('AwaleController', ['$scope', '$routeParams', 'eoleApi', 'eoleWs', '$timeout', 'partyManager', 'eoleSession', '$translate', function ($scope, $routeParams, eoleApi, eoleWs, $timeout, partyManager, eoleSession, $translate) {
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
    $scope.flashed = [
        {
            seeds: [false, false, false, false, false, false],
            attic: false
        },
        {
            seeds: [false, false, false, false, false, false],
            attic: false
        }
    ];
    $scope.displayMove = null;
    var animationThreads = [];
    initDisplayMove();

    $scope.join = function () {
        eoleApi.joinParty(eoleSession.player, 'awale', partyId);
    };

    $scope.move = function (move) {
        var lastGrid = cloneGrid($scope.grid);

        eoleApi.callGame('awale', 'post', 'play', eoleSession.player, {
            move: move,
            party_id: partyId
        }).then(function (r) {
            $scope.currentPlayer = r.currentPlayer;
        }).catch(function (r) {
            stopAnimation();
            $scope.grid = lastGrid;
            $scope.currentPlayer = 1 - $scope.currentPlayer;
            updateSeedsCoords();
            initDisplayMove();
        });

        initDisplayMove();
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

    eoleWs.sessionPromise.then(function (ws) {
        ws.subscribe('eole/games/awale/parties/'+partyId, function (topic, event) {
            console.log(event);

            switch (event.type) {
                case 'join':
                    $scope.party = event.party;
                    updateBoardVariables();
                    break;

                case 'played':
                    if (playerPosition !== event.move.player) {
                        initDisplayMove();
                    }
                    animate(event.move.player, event.move.move);
                    $scope.currentPlayer = event.current_player;
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
        var simulationGrid = cloneGrid($scope.grid);
        var hand = simulationGrid[player]['seeds'][move];

        animationSteps.push([player, move, - simulationGrid[player]['seeds'][move]]);
        simulationGrid[player]['seeds'][move] = 0;

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
            simulationGrid[_player]['seeds'][_move]++;
            animationSteps.push([_player, _move, 1]);
        }

        while (
            (_player !== player) &&
            (-1 !== [0, 1, 2, 3, 4, 5].indexOf(_move)) &&
            (-1 !== [2, 3].indexOf(simulationGrid[_player]['seeds'][_move]))
        ) {
            animationSteps.push([_player, _move, 'store']);
            _move += _player ? -1 : 1;
        }

        angular.forEach(animationSteps, function (step, i) {
            $scope.displayMove[animationSteps[0][0]][animationSteps[0][1]].push('start');

            var thread = $timeout(function () {
                if ('store' === step[2]) {
                    $scope.grid[1 - step[0]]['attic'] += $scope.grid[step[0]]['seeds'][step[1]];
                    $scope.grid[step[0]]['seeds'][step[1]] = 0;
                    $scope.displayMove[step[0]][step[1]].push('eat');
                    flashAttic(1 - step[0]);
                } else {
                    $scope.grid[step[0]]['seeds'][step[1]] += step[2];

                    if ($scope.grid[step[0]]['seeds'][step[1]] < 0) {
                        $scope.grid[step[0]]['seeds'][step[1]] = 0;
                    }
                }

                $scope.displayMove[step[0]][step[1]].push('feed');
                flashBox(step[0], step[1]);

                updateSeedsCoords();
            }, i * ANIMATION_DELAY);

            animationThreads.push(thread);
        });
    }

    function stopAnimation() {
        while (animationThreads.length > 0) {
            clearTimeout(animationThreads.pop());
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
        } else {
            $translate('party.drawn').then(function (message) {
                $scope.bottomText = message;
            });
        }
    }

    function flashBox(player, box) {
        $scope.flashed[player]['seeds'][box] = true;

        $timeout(function () {
            $scope.flashed[player]['seeds'][box] = false;
        }, 50);
    }

    function flashAttic(player) {
        $scope.flashed[player]['attic'] = true;

        $timeout(function () {
            $scope.flashed[player]['attic'] = false;
        }, 50);
    }

    function initDisplayMove() {
        $scope.displayMove = [
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

    function cloneGrid(grid) {
        return JSON.parse(JSON.stringify(grid));
    }
}]);
