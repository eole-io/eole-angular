/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.my-game').controller('my-game.PartyController', function ($scope, $routeParams, eoleApi, eoleWs) {
        var gameName = 'my-game';
        var partyId = $routeParams.partyId;

        $scope.hello = 'world';
        $scope.party = null;

        eoleWs.socketPromise.then(function (socket) {
            socket.subscribe('eole/core/game/my-game/parties', function (topic, event) {
                if (!event.event || (event.event.party.id !== partyId)) {
                    return;
                }

                switch (event.type) {
                    case 'slot_join':
                        $scope.party = event.event.party;
                        break;
                }
            });
        });

        eoleApi.getParty(gameName, partyId).then(function (party) {
            $scope.party = party;
        });
    });
})(angular);
