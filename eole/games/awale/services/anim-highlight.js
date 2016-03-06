(function (angular) {
    'use strict';

    angular.module('eole.games.awale').factory('animHighlight', ['$timeout', function ($timeout) {
        var AnimHighlight = function ($timeout) {
            this.initFlashGrid = function () {
                return [
                    {
                        seeds: [false, false, false, false, false, false],
                        attic: false
                    },
                    {
                        seeds: [false, false, false, false, false, false],
                        attic: false
                    }
                ];
            };

            this.flashBox = function (flashed, player, box) {
                flashed[player]['seeds'][box] = true;

                $timeout(function () {
                    flashed[player]['seeds'][box] = false;
                }, 50);
            };

            this.flashAttic = function (flashed, player) {
                flashed[player]['attic'] = true;

                $timeout(function () {
                    flashed[player]['attic'] = false;
                }, 50);
            };
        };

        return new AnimHighlight($timeout);
    }]);

})(angular);
