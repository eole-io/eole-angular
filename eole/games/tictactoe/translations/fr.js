(function (angular) {
    'use strict';

    angular.module('eole.games.tictactoe').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('fr', {
            tictactoe: 'Morpion'
        });
    }]);

})(angular);
