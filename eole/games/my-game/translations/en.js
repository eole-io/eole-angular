/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.my-game').config(function ($translateProvider) {
        $translateProvider.translations('en', {
            'my-game': 'Create my game'
        });
    });
})(angular);
