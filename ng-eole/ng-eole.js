'use strict';

var ngEole = angular.module('ng-eole', [
    'ng-eole-config',
    'eoleApi',
    'eoleSecurity',
    'eoleWs',
    'ngRoute',
    'schemaForm',
    'ui.bootstrap',
    'pascalprecht.translate',
    'angular-locker'
]);

ngEole.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
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

ngEole.run(['baseHref', '$browser', '$rootScope', function (baseHref, $browser, $rootScope) {
    $rootScope.baseHref = baseHref;

    $browser.baseHref = function() {
        return baseHref;
    };
}]);
