ngEole.config(['$translateProvider', function ($translateProvider) {
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
