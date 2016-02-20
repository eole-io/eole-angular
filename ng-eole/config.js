'use strict';

angular.module('eole.config', [])
    .constant('eoleApiUrl', 'http://eole.herokuapp.com/www/api.php/')
    .constant('webSocketUri', 'mock')
    .constant('oauthConfig', {
        clientId: 'eole-angular',
        clientSecret: 'eole-angular-secret'
    })
;

var gameModules = [
    'eole.games.tictactoe',
    'eole.games.awale'
];
