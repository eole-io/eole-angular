angular.module('eoleApi', [])
    .factory('eoleApi', [
        '$http',
        '$q',
        'eoleApiUrl',
        '$httpParamSerializer',
        'oauthConfig',
        function ($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig) {
            if ('mock' === eoleApiUrl) {
                return new EoleApiClientMock($q);
            } else {
                return new EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig);
            }
        }
    ])
;
