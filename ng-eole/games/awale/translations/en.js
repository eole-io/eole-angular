'use strict';

ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        awale: 'Awele',
        '{username}.won': '{{username}} won the game !',
        'party.drawn': 'The game ended in a draw.'
    });
}]);
