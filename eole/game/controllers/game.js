/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.game').controller('GameController', ['$scope', 'eoleApi', '$routeParams', 'eoleWs', 'eoleSession', '$location', function ($scope, eoleApi, $routeParams, eoleWs, eoleSession, $location) {
        $scope.game = null;
        $scope.parties = [];

        var gameName = $routeParams.gameName;

        $scope.createParty = function () {
            eoleSession.oauthTokenPromise.then(function (token) {
                eoleApi.createParty(gameName, token).then(function (party) {
                    $location.path('/games/' + gameName + '/parties/' + party.id);
                });
            });
        };

        $scope.join = function (party) {
            eoleSession.oauthTokenPromise.then(function (token) {
                eoleApi.joinParty(token, gameName, party.id);
            });
        };

        eoleApi.getGameByName(gameName).then(function (game) {
            $scope.game = game;
        });

        eoleApi.getPartiesForGame(gameName).then(function (parties) {
            $scope.parties = parties;
        });

        eoleWs.socketPromise.then(function (socket) {
            socket.subscribe('eole/core/game/' + gameName + '/parties', function (topic, event) {
                switch (event.type) {
                    case 'created':
                        $scope.parties.push(event.party);
                        break;

                    case 'gone':
                        $scope.parties = $scope.parties.filter(function (party) {
                            return party.id !== event.party.id;
                        });
                        break;
                }

                $scope.$apply();
            });
        });
    }]);
})(angular);
