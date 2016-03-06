(function (angular) {
    'use strict';

    angular.module('eole.core.home').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'ng-eole/home/views/home.html'
        });
    }]);

})(angular);

