'use strict';

ngEole.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/chat', {
        controller: 'ChatController',
        templateUrl: 'ng-eole/chat/chat.html'
    });
}]);

ngEole.controller('ChatController', ['$scope', '$translate', 'eoleWs', function ($scope, $translate, eoleWs) {
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
                    $translate('{player}.has.join.chat', { player: event.player.username }).then(function (message) {
                        $scope.messages.push({
                            content: message
                        });
                    });
                    break;

                case 'message':
                    $scope.messages.push({
                        content: event.player.username+' > '+event.message
                    });
                    break;

                case 'leave':
                    $translate('{player}.has.left.chat', { player: event.player.username }).then(function (message) {
                        $scope.messages.push({
                            content: message
                        });
                    });
                    break;
            }

            $scope.$apply();
        });
    });
}]);
