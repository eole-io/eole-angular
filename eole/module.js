/* global angular */

(function (angular) {
    'use strict';

    try {
        angular.module('eole.templates');
    } catch (err) {
        angular.module('eole.templates', []);
    }

    angular.module('eole', [
        'ngRoute',
        'schemaForm',
        'ui.bootstrap',
        'pascalprecht.translate',
        'angular-locker',
        'eoleApi',
        'eoleWebsocket',
        'eole.templates',
        'eole.config',
        'eole.core.translations',
        'eole.core.home',
        'eole.core.menu',
        'eole.core.player',
        'eole.core.game',
        'eole.core.chat',
        'eole.games',
        'eole.core.default-game'
    ]);

    angular.module('eole').run(function (eoleSession, $rootScope) {
        $rootScope.eoleSession = eoleSession;
    });
})(angular);
