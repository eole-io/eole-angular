(function (angular, autobahn) {
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
})(angular, ab);
