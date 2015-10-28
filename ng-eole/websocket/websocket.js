angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', 'wsseTokenGenerator', function ($q, eoleSession, wsseTokenGenerator) {
    return $q(function (resolve, reject) {
        var wsseTokenValues = wsseTokenGenerator.createWsseTokenValues(
            eoleSession.player.username,
            eoleSession.player.password,
            eoleSession.player.salt
        );

        ab.connect(
            'ws://127.0.0.1:8080/?wsse_token=juju',
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
