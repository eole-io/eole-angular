angular.module('eoleApi', [])
    .factory('eoleApi', [
        '$http',
        '$q',
        'eoleApiUrl',
        '$httpParamSerializer',
        'oauthConfig',
        function ($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig) {
            return new EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig);
        }
    ])
;
