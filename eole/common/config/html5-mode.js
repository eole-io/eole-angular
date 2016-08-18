/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole').config(function ($locationProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!')
        ;
    });
})(angular);
