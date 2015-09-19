'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/player/perso', {
        controller: 'PersoController',
        templateUrl: 'ng-eole/player/perso.html'
    });
}]);

ngEole.controller('PersoController', ['$scope', function ($scope) {
}]);
