/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole').factory('eoleWs', function ($q, eoleSession, eoleWebsocketClient, $rootScope) {
        var createSocketPromise = function () {
            var deferedSocket = $q.defer();

            eoleSession.oauthTokenPromise.then(function (token) {
                eoleWebsocketClient.openSocket(token.access_token).then(function (socket) {
                    deferedSocket.resolve(socket);
                });
            });

            return deferedSocket.promise;
        };

        var eoleWs = {
            socketPromise: createSocketPromise()
        };

        $rootScope.$on('eole.session.logged', function () {
            eoleWs.socketPromise = createSocketPromise();
        });

        return eoleWs;
    });
})(angular);
