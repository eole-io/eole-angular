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
        eoleWs.socketPromise.then(function (socket) {
            socket.publish('eole/core/chat', $scope.message);
            $scope.message = '';
        });
    };

    eoleWs.socketPromise.then(function (socket) {
        socket.subscribe('eole/core/chat', function (topic, event) {
            var willScrollBottom = isBottom();

            switch (event.type) {
                case 'join':
                    $translate('{player}.has.join.chat', { player: event.player.username }).then(function (message) {
                        $scope.messages.push({
                            meta: true,
                            date: new Date(),
                            player: event.player,
                            content: message
                        });

                        if (willScrollBottom) {
                            scrollBottom();
                        }
                    });
                    break;

                case 'message':
                    $scope.$apply(function () {
                        $scope.messages.push({
                            meta: false,
                            date: new Date(),
                            player: event.player,
                            content: event.message
                        });

                        if (willScrollBottom) {
                            scrollBottom();
                        }
                    });
                    break;

                case 'leave':
                    $translate('{player}.has.left.chat', { player: event.player.username }).then(function (message) {
                        $scope.messages.push({
                            meta: true,
                            date: new Date(),
                            player: event.player,
                            content: message
                        });

                        if (willScrollBottom) {
                            scrollBottom();
                        }
                    });
                    break;
            }
        });
    });

    var avatarUrlCache = {};

    $scope.avatarUrl = function (player) {
        if (!avatarUrlCache[player.id]) {
            var color = CryptoJS.SHA1(player.id+''+player.date_created).toString().substr(0, 6);
            var initials = player.username.substr(0, 2).toUpperCase();

            avatarUrlCache[player.id] = 'http://placehold.it/50/'+color+'/fff&text='+initials;
        }

        return avatarUrlCache[player.id];
    };

    var isBottom = function () {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20;
    };

    var scrollBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
}]);
