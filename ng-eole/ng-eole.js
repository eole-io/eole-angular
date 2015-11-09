'use strict';

var ngEole = angular.module('ng-eole', [
    'eoleApi',
    'eoleSecurity',
    'eoleWs',
    'ngRoute',
    'schemaForm',
    'ui.bootstrap',
    'pascalprecht.translate',
    'angular-locker'
]);

ngEole.constant('eoleApiUrl', 'http://localhost/eole-api/www/api.php/');

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
