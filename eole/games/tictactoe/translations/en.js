/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.tictactoe').config(function ($translateProvider) {
        $translateProvider.translations('en', {
            tictactoe: 'Tic Tac Toe'
        });
    });
})(angular);
