(function (angular) {
    'use strict';

    angular.module('eole').config(['lockerProvider', function (lockerProvider) {
        lockerProvider.defaults({
            driver: 'local',
            namespace: 'eole',
            separator: '.',
            eventsEnabled: true,
            extend: {}
        });
    }]);

})(angular);
