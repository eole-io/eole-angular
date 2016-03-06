(function (angular) {
    'use strict';

    angular.module('eole.core.chat').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat', {
            controller: 'ChatController',
            templateUrl: 'ng-eole/chat/views/chat.html'
        });
    }]);

})(angular);
