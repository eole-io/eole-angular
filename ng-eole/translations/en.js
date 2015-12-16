ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        games: 'Games',
        'waiting.for.join': 'Waiting...',
        'party.hosted.by.{username}': '{{username}}\'s game'
    });
}]);
