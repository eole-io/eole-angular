(function (angular) {
    'use strict';

    angular.module('eole.core.translations').config(['$translateProvider', function ($translateProvider) {
        $translateProvider
            .registerAvailableLanguageKeys(['en', 'fr'], {
                'en_*': 'en',
                'fr_*': 'fr'
            })
            .determinePreferredLanguage()
            .fallbackLanguage('en')
            .useSanitizeValueStrategy()
        ;
    }]);

    angular.module('eole.core.translations').run(['$translate', '$rootScope', function ($translate, $rootScope) {
        $rootScope.lang = $translate.use();
    }]);
})(angular);
