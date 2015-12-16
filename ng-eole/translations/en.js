ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'home.play': 'Play !',
        games: 'Games',
        chat: 'Chatroom',
        'waiting.for.join': 'Waiting...',
        'party.hosted.by.{username}': '{{username}}\'s game'
    });
}]);
