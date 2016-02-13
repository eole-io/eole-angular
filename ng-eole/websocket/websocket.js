(function (angular) {
    'use strict';

    var eoleWsModule = angular.module('eoleWs', ['eoleWebsocket']);

    eoleWsModule.factory('eoleWs', ['$q', 'eoleSession', 'eoleWebsocketClient', '$rootScope', function ($q, eoleSession, eoleWebsocketClient, $rootScope) {
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
    }]);
})(angular);
