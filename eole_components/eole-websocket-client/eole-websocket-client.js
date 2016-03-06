'use strict';

function EoleWebsocketClient(autobahn, webSocketUri, $q) {

    if (!webSocketUri.match(/wss?:\/\//)) {
        throw 'Websocket URI must start with "ws://" or "wss://", got "'+webSocketUri+'".';
    }

    /**
     * @param {String} accessToken
     *
     * @returns {Promise} A socket session promise.
     */
    this.openSocket = function (accessToken) {
        return $q(function (resolve, reject) {
            var successCallback = function (session) {
                resolve(session);
            };

            var failCallback = function (code, reason, detail) {
                reject([code, reason, detail]);
            };

            var options = {
                maxRetries: 0,
                retryDelay: 2000
            };

            var authenticatedUri = webSocketUri+'?access_token='+accessToken;

            autobahn.connect(authenticatedUri, successCallback, failCallback, options);
        });
    };
}
