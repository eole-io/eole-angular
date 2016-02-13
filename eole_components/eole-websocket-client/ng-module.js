(function (angular, autobahn) {
    'use strict';

    angular.module('eoleWebsocket', [])
        .factory('eoleWebsocketClient', [
            'webSocketUri',
            '$q',
            function (webSocketUri, $q) {
                return new EoleWebsocketClient(autobahn, webSocketUri, $q);
            }
        ])
    ;
})(angular, ab);
