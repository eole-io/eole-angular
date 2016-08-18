/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.game').controller('GamesController', function ($scope, eoleApi, $location) {
        $scope.games = [];

        $scope.go = function (path) {
            $location.path(path);
        };

        eoleApi.getGames().then(function (games) {
            $scope.games = games;
        });
    });
})(angular);
