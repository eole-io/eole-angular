/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.games.my-game').config(function ($translateProvider) {
        $translateProvider.translations('fr', {
            'my-game': 'Créer mon jeu'
        });
    });
})(angular);
