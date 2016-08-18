/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.home').config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'eole/home/views/home.html'
        });
    });
})(angular);

