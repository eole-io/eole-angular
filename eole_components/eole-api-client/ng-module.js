angular.module('eoleApi', [])
    .factory('eoleApi', ['$http', '$q', 'eoleApiUrl', 'wsseTokenGenerator', '$httpParamSerializer', function ($http, $q, eoleApiUrl, wsseTokenGenerator, $httpParamSerializer) {
        return new EoleApiClient($http, $q, eoleApiUrl, wsseTokenGenerator, $httpParamSerializer);
    }])
;
