'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'ng-eole/home/home.html'
    });
}]);

ngEole.controller('HomeController', ['$scope', function ($scope) {
    
}]);
