ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.determinePreferredLanguage();
    $translateProvider.useSanitizeValueStrategy();
}]);
