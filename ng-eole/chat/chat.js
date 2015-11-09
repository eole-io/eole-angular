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
        eoleWs.sessionPromise.then(function (ws) {
            ws.publish('eole/core/chat', $scope.message);
            $scope.message = '';
        });
    };

    eoleWs.sessionPromise.then(function (ws) {
        ws.subscribe('eole/core/chat', function (topic, event) {
            switch (event.type) {
                case 'join':
                    $scope.messages.push({content: event.player.username+' has join.'});
                    break;

                case 'message':
                    $scope.messages.push({content: event.player.username+' > '+event.message});
                    break;

                case 'leave':
                    $scope.messages.push({content: event.player.username+' has left.'});
                    break;
            }

            $scope.$apply();
        });
    });
}]);
