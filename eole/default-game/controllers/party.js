/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.default-game').controller('PartyController', function ($scope, $routeParams, eoleApi) {
        var gameName = $routeParams.gameName;
        var partyId = $routeParams.partyId;

        $scope.party = null;
        $scope.game = null;

        eoleApi.getParty(gameName, partyId).then(function (party) {
            $scope.party = party;
            $scope.game = party.game;
        });
    });
})(angular);
