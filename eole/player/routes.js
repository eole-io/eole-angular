/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.player').config(function ($routeProvider) {
        $routeProvider.when('/player/login', {
            controller: 'LoginController',
            templateUrl: 'eole/player/views/login.html'
        });
    });
    angular.module('eole.core.player').config(function ($routeProvider) {
        $routeProvider.when('/player/profile', {
            controller: 'ProfileController',
            templateUrl: 'eole/player/views/profile.html'
        });
    });
    angular.module('eole.core.player').config(function ($routeProvider) {
        $routeProvider.when('/player/register', {
            controller: 'RegisterController',
            templateUrl: 'eole/player/views/register.html'
        });
    });
})(angular);
