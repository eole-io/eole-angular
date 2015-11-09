angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', 'wsseTokenGenerator', '$rootScope', function ($q, eoleSession, wsseTokenGenerator, $rootScope) {
    var generateWsseToken = function () {
        var wsseTokenValues = wsseTokenGenerator.createWsseTokenValues(
            eoleSession.player.username,
            eoleSession.player.password,
            eoleSession.player.salt
        );

        return btoa(JSON.stringify(wsseTokenValues));
    };

    // Override autobahn _connect method to add a new wsse token on connect
    ab._connect_old = ab._connect;

    ab._connect = function (wsuri, onconnect, onhangup, options) {
        var lastPosition = wsuri.wsuri.indexOf('/?wsse_token=');
        if (-1 !== lastPosition) {
            wsuri.wsuri = wsuri.wsuri.substr(0, lastPosition);
        }

        wsuri.wsuri += '/?wsse_token='+generateWsseToken();

        console.log('connect', wsuri);
        return ab._connect_old(wsuri, onconnect, onhangup, options);
    };

    function EoleWs() {
        var that = this;

        this.sessionPromise = null;

        var lastSession = null;

        var openSocket = function () {
            that.sessionPromise = $q(function (resolve, reject) {
                ab.connect(
                    'ws://127.0.0.1:8080',
                    function (session) {
                        console.log('websocket open');

                        if (null !== lastSession) {
                            angular.forEach(lastSession._subscriptions, function (callbacks, topic) {
                                session.subscribe(topic, callbacks[0]);
                            });
                        }

                        lastSession = session;
                        resolve(session);
                        window['eoleWsSession'] = session;
                    },
                    function (code, reason, detail) {
                        console.log('socket closed', code, reason, detail);
                        reject([code, reason, detail]);
                        if (0 !== code) {
                            setTimeout(that.reopenSocket, 2000);
                        }
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
            console.log('reopening socket...');
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

    window['eoleWs'] = eoleWs;

    $rootScope.$on('eole.session.logged', function () {
        eoleWs.reopenSocket();
    });

    return eoleWs;
}]);
