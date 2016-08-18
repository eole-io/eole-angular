/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.translations').config(function ($translateProvider) {
        $translateProvider.translations('en', {
            'home.play': 'Play !',
            'play': 'Play',
            'games': 'Games',
            'pseudo': 'Pseudo',
            'password': 'Password',
            'password.repeat': 'Password repeat',
            'register': 'Sign up',
            'login': 'Login',
            'logout': 'Logout',
            'chat': 'Chatroom',
            'parties': 'Games',
            'create.party': 'Create a new game',
            'join': 'Join',
            'watch': 'Watch',
            'send': 'Send',
            '{player}.has.join.chat': '{{ player }} has join.',
            '{player}.has.left.chat': '{{ player }} has left.',
            'my.page': 'My page',
            'your.pseudo': 'Your pseudo',
            'your.password': 'Your password',
            'your.password.repeat': 'Your password repeat',
            'waiting.for.join': 'Waiting for join...',
            'please.enter.pseudo': 'Please enter your pseudo',
            'please.enter.password': 'Please enter your password',
            'please.enter.password.repeat': 'Please repeat your password',
            'party.hosted.by.{username}': 'Game hosted by {{username}}',
            'passwords.not.equals': 'Password repeat is invalid'
        });
    });
})(angular);
