/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole').factory('eoleSession', ['$q', 'locker', 'eoleApi', '$rootScope', function ($q, locker, eoleApi, $rootScope) {
        var eoleSession = {

            /**
             * {Object}
             */
            player: null,

            /**
             * A token object with keys "access_token", "token_type" and "expires_in".
             *
             * {Promise} Promise of an oauth token.
             */
            oauthTokenPromise: null,

            /**
             * Last created access token.
             *
             * {Object} Promise of an oauth token.
             */
            oauthToken: null,

            /**
             * Dispatch logged event to rootScope.
             */
            dispatchLoggedEvent: function () {
                $rootScope.$emit('eole.session.logged', eoleSession);
            },

            /**
             * @returns {Promise} Created guest.
             */
            loginAsGuest: function () {
                var password = eoleSession.generateRandomPassword();
                var deferredToken = $q.defer();

                var promise = $q(function (resolve) {
                    eoleApi.createGuest(password).then(function (player) {
                        var tokenPromise = eoleApi.createOAuth2Token(player.username, password);

                        tokenPromise.then(function (token) {
                            deferredToken.resolve(token);
                        });
                        eoleSession.planRefreshToken();
                        eoleSession.player = player;
                        eoleSession.save();
                        eoleSession.dispatchLoggedEvent();
                        resolve(player);

                        tokenPromise.then(eoleSession.saveReceivedOAuthToken);
                    });
                });

                eoleSession.oauthTokenPromise = deferredToken.promise;

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
                    var tokenPromise = eoleApi.createOAuth2Token(username, password);

                    eoleSession.oauthTokenPromise = tokenPromise;
                    eoleSession.planRefreshToken();

                    tokenPromise.then(function (token) {
                        eoleApi.authMe(token).then(function (player) {
                            eoleSession.player = player;
                            eoleSession.save();
                            eoleSession.dispatchLoggedEvent();
                            resolve(player);
                        });
                    }).catch(reject);

                    tokenPromise.then(eoleSession.saveReceivedOAuthToken);
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
             * Refresh access token.
             */
            refreshAccessToken: function () {
                var tokenPromise = eoleApi.refreshOAuth2Token(eoleSession.oauthToken);

                eoleSession.oauthTokenPromise = tokenPromise;
                eoleSession.planRefreshToken();
                eoleSession.save();

                tokenPromise
                    .catch(function () {
                        eoleSession.logout();
                    })
                ;

                tokenPromise.then(eoleSession.saveReceivedOAuthToken);
            },

            saveReceivedOAuthToken: function (token) {
                eoleSession.oauthToken = token;
                eoleSession.save();
            },

            /**
             * Refresh access token 2 minutes before its expiration.
             */
            planRefreshToken: function () {
                eoleSession.oauthTokenPromise.then(function (token) {
                    var refreshIn = token.expires_in - 120;

                    setTimeout(eoleSession.refreshAccessToken, refreshIn * 1000);
                });
            },

            /**
             * @param {String} username
             * @param {String} password
             *
             * @returns {Promise} Created player.
             */
            register: function (username, password) {
                var promise = eoleApi.createPlayer(username, password);

                promise.then(function () {
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
        } else if (eoleSession.oauthToken) {
            eoleSession.refreshAccessToken();
        } else {
            eoleSession.loginAsGuest();
        }

        return eoleSession;
    }]);
})(angular);
