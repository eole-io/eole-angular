ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        games: 'Games',
        'party.hosted.by.{username}': '{{username}}\'s game'
    });
}]);
