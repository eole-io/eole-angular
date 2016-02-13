(function (angular) {
    'use strict';

    var eoleWsModule = angular.module('eoleWs', ['eoleWebsocket']);

    eoleWsModule.factory('eoleWs', ['$q', 'eoleSession', 'eoleWebsocketClient', function ($q, eoleSession, eoleWebsocketClient) {
        var deferedSocket = $q.defer();

        eoleSession.oauthTokenPromise.then(function (token) {
            eoleWebsocketClient.openSocket(token.access_token).then(function (socket) {
                deferedSocket.resolve(socket);
            });
        });

        return {
            socketPromise: deferedSocket.promise
        };
    }]);
})(angular);
