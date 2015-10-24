'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/chat', {
        controller: 'ChatController',
        templateUrl: 'ng-eole/chat/chat.html'
    });
}]);

ngEole.controller('ChatController', ['$scope', 'eoleWs', function ($scope, eoleWs) {
    $scope.messages = [];

    $scope.sendMessage = function () {
        eoleWs.then(function (ws) {
            ws.publish('eole/core/chat', $scope.message);
            $scope.message = '';
        });
    };

    eoleWs.then(function (ws) {
        ws.subscribe('eole/core/chat', function (topic, event) {
            $scope.messages.push({content: event});
            $scope.$apply();
        });
    });
}]);
