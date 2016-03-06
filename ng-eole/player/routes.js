(function (angular) {
    'use strict';

    angular.module('eole.core.player').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/player/login', {
            controller: 'LoginController',
            templateUrl: 'ng-eole/player/views/login.html'
        });
    }]);
    angular.module('eole.core.player').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/player/profile', {
            controller: 'ProfileController',
            templateUrl: 'ng-eole/player/views/profile.html'
        });
    }]);
    angular.module('eole.core.player').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/player/register', {
            controller: 'RegisterController',
            templateUrl: 'ng-eole/player/views/register.html'
        });
    }]);

})(angular);
