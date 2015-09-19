'use strict';

var ngEole = angular.module('ng-eole', [
    'eoleApi',
    'vxWamp',
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

ngEole.config(['$wampProvider', function ($wampProvider) {
    $wampProvider.init({
       url: 'ws://localhost:8080/pubsub',
       realm: 'realm1'
    });
}]);

ngEole.config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
        driver: 'session',
        namespace: 'eole',
        separator: '.',
        eventsEnabled: true,
        extend: {}
    });
}]);

ngEole.run(['eoleSession', '$rootScope', function (eoleSession, $rootScope) {
    $rootScope.eoleSession = eoleSession;
}]);

/*
ngEole.run(['$wamp', function($wamp){
    $wamp.open();
}]);
*/
