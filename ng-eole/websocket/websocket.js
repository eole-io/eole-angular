// Override autobahn connect method to allow to pass a callback as url
// to generate a new url each time it is called.
ab.connect_old = ab.connect;

ab.connect = function (wsuri, onconnect, onhangup, options) {
    if ('function' === (typeof wsuri)) {
        wsuri = wsuri();
    }

    if (!('string' === (typeof wsuri))) {
        throw 'wsuri must be a string or a callback returning a string.';
    }

    return ab.connect_old(wsuri, onconnect, onhangup, options);
};

angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', 'wsseTokenGenerator', function ($q, eoleSession, wsseTokenGenerator) {
    return $q(function (resolve, reject) {
        ab.connect(
            function () {
                var wsseTokenValues = wsseTokenGenerator.createWsseTokenValues(
                    eoleSession.player.username,
                    eoleSession.player.password,
                    eoleSession.player.salt
                );

                return 'ws://127.0.0.1:8080/?wsse_token='+btoa(JSON.stringify(wsseTokenValues));
            },
            function (session) {
                console.log('websocket open');
                window['ws'] = session;
                resolve(session);
            },
            function (code, reason, detail) {
                console.log('websocket closed', code, reason, detail);
                reject([code, reason, detail]);
            },
            {
                maxRetries: 60,
                retryDelay: 2000
            }
        );
    });
}]);
