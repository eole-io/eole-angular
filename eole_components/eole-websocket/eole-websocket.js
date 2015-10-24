angular.module('eoleWs', []).factory('eoleWs', ['$q', function ($q) {
    return $q(function (resolve, reject) {
        ab.connect(
            'ws://127.0.0.1:8080',
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
