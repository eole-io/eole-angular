angular.module('eoleApi', [])
    .factory('eoleApi', ['$http', '$q', 'eoleApiUrl', '$httpParamSerializer', function ($http, $q, eoleApiUrl, $httpParamSerializer) {
        return new EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer);
    }])
;
