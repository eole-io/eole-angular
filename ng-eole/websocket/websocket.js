'use strict';

angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', '$rootScope', 'webSocketUri', function ($q, eoleSession, $rootScope, webSocketUri) {

    function EoleWs() {
        var that = this;

        that.sessionPromise = null;

        var openSocket = function () {
            that.sessionPromise = $q(function (resolve, reject) {
                ab.connect(
                    webSocketUri+'?access_token='+eoleSession.oauthToken.access_token,
                    function (session) {
                        resolve(session);
                    },
                    function (code, reason, detail) {
                        reject([code, reason, detail]);
                    },
                    {
                        maxRetries: 0,
                        retryDelay: 2000
                    }
                );
            });
        };

        this.closeSocket = function () {
            that.sessionPromise.then(function (session) {
                session.close();
            });

            that.sessionPromise = createClosedSocketPromise();
        };

        this.reopenSocket = function () {
            that.closeSocket();
            openSocket();
        };

        var createClosedSocketPromise = function () {
            return $q(function (resolve, reject) {
                reject('socket closed');
            });
        };

        openSocket();
    };

    var eoleWs = new EoleWs();

    $rootScope.$on('eole.session.logged', function () {
        eoleWs.reopenSocket();
    });

    return eoleWs;
}]);
