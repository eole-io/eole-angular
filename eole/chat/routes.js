/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.chat').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat', {
            controller: 'ChatController',
            templateUrl: 'eole/chat/views/chat.html'
        });
    }]);
})(angular);
