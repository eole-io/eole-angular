angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', 'wsseTokenGenerator', '$rootScope', function ($q, eoleSession, wsseTokenGenerator, $rootScope) {
    function EoleWs() {
        var that = this;

        this.sessionPromise = null;

        var openSocket = function () {
            that.sessionPromise = $q(function (resolve, reject) {
                ab.connect(
                    that.generateWebSocketUrlWithWsse(),
                    function (session) {
                        console.log('websocket open');
                        resolve(session);
                    },
                    function (code, reason, detail) {
                        console.log('socket closed', code, reason, detail);
                        reject([code, reason, detail]);
                    },
                    {
                        maxRetries: 60,
                        retryDelay: 2000
                    }
                );
            });
        };

        this.closeSocket = function () {
            that.sessionPromise.then(function (session) {
                session.close();
            });

            that.sessionPromise = that.createClosedSocketPromise();
        };

        this.reopenSocket = function () {
            that.closeSocket();
            openSocket();
        };

        this.createClosedSocketPromise = function () {
            return $q(function (resolve, reject) {
                reject('socket closed');
            });
        };

        this.generateWebSocketUrlWithWsse = function () {
            var wsseTokenValues = wsseTokenGenerator.createWsseTokenValues(
                eoleSession.player.username,
                eoleSession.player.password,
                eoleSession.player.salt
            );

            return 'ws://127.0.0.1:8080/?wsse_token='+btoa(JSON.stringify(wsseTokenValues));
        };

        openSocket();
    };

    var eoleWs = new EoleWs();

    window['eoleWs'] = eoleWs;

    $rootScope.$on('eole.session.logged', function () {
        eoleWs.reopenSocket();
    });

    return eoleWs;
}]);
