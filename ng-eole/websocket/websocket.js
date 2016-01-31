'use strict';

angular.module('eoleWs', []).factory('eoleWs', ['$q', 'eoleSession', '$rootScope', 'webSocketUri', function ($q, eoleSession, $rootScope, webSocketUri) {

    function EoleWs() {
        var that = this;

        that.sessionPromise = null;

        var openSocket = function () {
            that.sessionPromise = $q(function (resolve, reject) {
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

                eoleSession.oauthTokenPromise.then(function (token) {
                    var authenticatedUri = webSocketUri+'?access_token='+token.access_token;

                    ab.connect(authenticatedUri, successCallback, failCallback, options);
                });
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
