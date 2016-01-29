'use strict';

ngEole.factory('eoleSession', ['$q', 'locker', 'eoleApi', '$rootScope', function ($q, locker, eoleApi, $rootScope) {
    var eoleSession = {

        /**
         * {Object}
         */
        player: null,

        /**
         * A token object with keys "access_token", "token_type" and "expires_in".
         *
         * {Object}
         */
        oauthToken: null,

        /**
         * @param {Object} player
         *
         * @returns {eoleSession}
         */
        setAndSavePlayer: function (player) {
            eoleSession.player = player;
            eoleSession.save();
        },

        /**
         * Dispatch logged event to rootScope.
         */
        dispatchLoggedEvent: function ()
        {
            $rootScope.$emit('eole.session.logged', eoleSession);
        },

        /**
         * @returns {Promise} Created guest.
         */
        loginAsGuest: function () {
            var password = eoleSession.generateRandomPassword();
            var promise = $q(function (resolve, reject) {
                eoleApi.createGuest(password).then(function (player) {
                    eoleApi.createOAuth2Token(player.username, password).then(function (token) {
                        eoleSession.oauthToken = token;
                        eoleSession.setAndSavePlayer(player);
                        eoleSession.dispatchLoggedEvent();
                        resolve(player);
                    });
                });
            });

            return promise;
        },

        /**
         * @returns {String}
         */
        generateRandomPassword: function () {
            return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
        },

        /**
         * @returns {Promise} Logged in player or false on invalid credentials.
         */
        login: function (username, password) {
            var promise = $q(function (resolve, reject) {
                eoleApi.createOAuth2Token(username, password).then(function (token) {
                    eoleApi.authMe(token).then(function (player) {
                        eoleSession.oauthToken = token;
                        eoleSession.setAndSavePlayer(player);
                        eoleSession.dispatchLoggedEvent();
                        resolve(player);
                    });
                }).catch(reject);
            });


            return promise;
        },

        /**
         * Logout current user and login as guest.
         *
         * @returns {Promise} Created guest.
         */
        logout: function () {
            return eoleSession.loginAsGuest();
        },

        /**
         * @params {string} username
         * @params {string} password
         *
         * @returns {Promise} Created player.
         */
        register: function (username, password) {
            var promise = eoleApi.createPlayer(username, password);

            promise.then(function (player) {
                eoleSession.login(username, password);
            });

            return promise;
        },

        /**
         * Save eoleSession into locker.
         */
        save: function () {
            locker.put('eoleSession', eoleSession);
        }
    };

    if (locker.has('eoleSession')) {
        eoleSession = angular.extend(eoleSession, locker.get('eoleSession'));
    }

    if (!eoleSession.player || !eoleSession.player.id) {
        eoleSession.loginAsGuest();
    }

    return eoleSession;
}]);
