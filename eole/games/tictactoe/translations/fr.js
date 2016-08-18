/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.tictactoe').config(function ($translateProvider) {
        $translateProvider.translations('fr', {
            tictactoe: 'Morpion'
        });
    });
})(angular);
