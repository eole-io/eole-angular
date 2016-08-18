/* global angular */
/* global ab */
/* global window */

(function (angular, autobahn, EoleWebsocketClient, EoleWebsocketClientMock) {
    'use strict';

    angular.module('eoleWebsocket', [])
        .factory('eoleWebsocketClient', [
            'webSocketUri',
            '$q',
            function (webSocketUri, $q) {
                if ('mock' === webSocketUri) {
                    return new EoleWebsocketClientMock($q);
                }

                return new EoleWebsocketClient(autobahn, webSocketUri, $q);
            }
        ])
    ;
})(angular, ab, window.EoleWebsocketClient, window.EoleWebsocketClientMock);
