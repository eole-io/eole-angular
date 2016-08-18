/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.awale').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'awale': 'Awele',
            '{username}.won': '{{username}} won the game !',
            'party.drawn': 'The game ended in a draw.'
        });
    }]);
})(angular);
