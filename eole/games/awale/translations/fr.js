'use strict';

ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('fr', {
        awale: 'Awalé',
        '{username}.won': '{{username}} a remporté la partie !',
        'party.drawn': 'Partie nulle.'
    });
}]);
