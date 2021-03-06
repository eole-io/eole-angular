/* global angular */
/* global window */

(function (angular, EoleApiClient, EoleApiClientMock) {
    'use strict';

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
                }

                return new EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig);
            }
        ])
    ;
})(angular, window.EoleApiClient, window.EoleApiClientMock);
