ngEole.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('fr', {
        games: 'Jeux',
        pseudo: 'Pseudo',
        password: 'Mot de passe',
        'password.repeat': 'Répétition du mot de passe',
        register: 'Se créer un compte',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        'my.page': 'Ma page',
        'your.pseudo': 'Votre pseudo',
        'your.password': 'Votre mot de passe',
        'your.password.repeat': 'Votre mot de passe, encore',
        'please.enter.pseudo': 'Veuillez entrer votre pseudo',
        'please.enter.password': 'Veuillez entrer votre mot de passe',
        'please.enter.password.repeat': 'Veuillez répéter votre mot de passe',
        'party.hosted.by.{username}': 'Partie de {{username}}',
        'passwords.not.equals': 'Le mot de passe répété est différent'
    });
}]);
