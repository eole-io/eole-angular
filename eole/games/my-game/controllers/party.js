/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.awale').controller('my-game.PartyController', function ($scope, $routeParams, eoleApi, eoleWs) {
        var gameName = $routeParams.gameName;
        var partyId = $routeParams.partyId;

        $scope.hello = 'world';

        eoleWs.socketPromise.then(function (socket) {
            socket.subscribe('eole/core/game/my-game/parties', function (topic, event) {
                console.log('my-game core event', event.type, event);

                if (!event.event || (event.event.party.id !== partyId)) {
                    return;
                }
            });
        });
    });
})(angular);
