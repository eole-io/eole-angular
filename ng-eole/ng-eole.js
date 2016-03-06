'use strict';

var ngEole = angular.module('eole', [
    'ngRoute',
    'schemaForm',
    'ui.bootstrap',
    'pascalprecht.translate',
    'angular-locker',
    'eoleApi',
    'eoleWs',
    'eole.config',
    'eole.core.home',
    'eole.core.menu',
    'eole.core.player',
    'eole.core.game',
    'eole.core.chat',
    'eole.games',
    'eole.core.default-game'
]);

ngEole.config(['$locationProvider', function ($locationProvider) {
    $locationProvider
        .html5Mode(false)
        .hashPrefix('!')
    ;
}]);

ngEole.config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
        driver: 'local',
        namespace: 'eole',
        separator: '.',
        eventsEnabled: true,
        extend: {}
    });
}]);

ngEole.run(['eoleSession', '$rootScope', function (eoleSession, $rootScope) {
    $rootScope.eoleSession = eoleSession;
}]);
