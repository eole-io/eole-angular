/* global window */

(function (window) {
    'use strict';

    window.EoleApiClient = function ($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig) {
        var that = this;

        /**
         * @param {String} method 'get', 'post', ...
         * @param {String} path example: 'api/players' (no starting slash).
         * @param {String} OAuth2 token.
         * @param {Object} postData
         *
         * @returns {Promise}
         */
        this.call = function (method, path, oauthToken, postData) {
            var headers = {};
            var data = {};

            if (oauthToken) {
                headers.Authorization = [oauthToken.token_type, oauthToken.access_token].join(' ');
            }

            if (postData) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                data = $httpParamSerializer(postData);
            }

            return $q(function (resolve, reject) {
                $http({
                    method: method,
                    url: eoleApiUrl + path,
                    headers: headers,
                    data: data
                }).then(function (r) {
                    resolve(r.data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        };

        /**
         * Api call for a game.
         *
         * @param {String} gameName
         * @param {String} method 'get', 'post', ...
         * @param {String} path example: 'play/a2' (no starting slash).
         * @param {String} OAuth2 token.
         * @param {Object} postData
         *
         * @returns {Promise}
         */
        this.callGame = function (gameName, method, path, oauthToken, postData) {
            return that.call(method, 'api/games/' + gameName + '/' + path, oauthToken, postData);
        };

        /**
         * Request an access token from Authorization server.
         *
         * @param {String} username
         * @param {String} password
         *
         * @returns {Promise} An access token promise.
         */
        this.createOAuth2Token = function (username, password) {
            return that.call('post', 'oauth/access-token', false, {
                grant_type: 'password',
                client_id: oauthConfig.clientId,
                client_secret: oauthConfig.clientSecret,
                username: username,
                password: password
            });
        };

        /**
         * Refresh access token from Authorization server.
         *
         * @param {Object} oauthToken
         *
         * @returns {Promise} An access token promise.
         */
        this.refreshOAuth2Token = function (oauthToken) {
            return that.call('post', 'oauth/access-token', false, {
                grant_type: 'refresh_token',
                client_id: oauthConfig.clientId,
                client_secret: oauthConfig.clientSecret,
                refresh_token: oauthToken.refresh_token
            });
        };

        /**
         * @returns {Promise} A Player[] promise.
         */
        this.getPlayers = function () {
            return that.call('get', 'api/players');
        };

        /**
         * @param {String} username
         *
         * @returns {Promise} A Player promise.
         */
        this.getPlayer = function (username) {
            return that.call('get', 'api/players/' + username);
        };

        /**
         * @param {String} username
         * @param {String} password
         *
         * @returns {Promise} A Player promise.
         */
        this.createPlayer = function (username, password) {
            console.warn('eoleApi.registerGuest should be used instead of eoleApi.createPlayer when a guest is creating a new account.');

            return that.call('post', 'api/players', false, {
                username: username,
                password: password
            });
        };

        /**
         * Upgrades a guest account into a regular account.
         *
         * @param {String} username
         * @param {String} password
         * @param {String} oauthToken
         *
         * @returns {Promise} A Player promise.
         */
        this.registerGuest = function (username, password, oauthToken) {
            return that.call('post', 'api/players/register', oauthToken, {
                username: username,
                password: password
            });
        };

        /**
         * Create a guest player that could be upgraded to a player later.
         *
         * @param {String} password
         *
         * @returns {Promise} A Player promise.
         */
        this.createGuest = function (password) {
            return that.call('post', 'api/players/guest', false, {
                password: password
            });
        };

        /**
         * Test authentication.
         *
         * @param {Object} oauthToken
         *
         * @returns {Promise} A Player promise.
         */
        this.authMe = function (oauthToken) {
            return that.call('get', 'api/auth/me', oauthToken);
        };

        /**
         * @returns {Promise} Promise of the array of all games.
         */
        this.getGames = function () {
            return that.call('get', 'api/games');
        };

        /**
         * @param {String} name
         *
         * @returns {Promise} Promise of a game object.
         */
        this.getGameByName = function (name) {
            return that.call('get', 'api/games/' + name);
        };

        /**
         * Player logged with provided oauthToken creates and hosts a new party on a game.
         *
         * @param {String} gameName
         * @param {Object} oauthToken
         *
         * @returns {Promise}
         */
        this.createParty = function (gameName, oauthToken) {
            return that.call('post', 'api/games/' + gameName + '/parties', oauthToken);
        };

        /**
         * @returns {Promise} Promise of an array of all parties of all games.
         */
        this.getParties = function () {
            return that.call('get', 'api/parties/');
        };

        /**
         * @param {String} gameName
         *
         * @returns {Promise} Promise of an array of all parties of a defined game.
         */
        this.getPartiesForGame = function (gameName) {
            return that.call('get', 'api/games/' + gameName + '/parties');
        };

        /**
         * Get a party by id on a defined game.
         *
         * @param {String} gameName
         * @param {Integer} partyId
         *
         * @returns {Promise} Promise of a party object.
         */
        this.getParty = function (gameName, partyId) {
            return that.call('get', 'api/games/' + gameName + '/parties/' + partyId);
        };

        /**
         * Player logged with provided oauthToken joins party with id partyId on gameName.
         *
         * @param {Object} oauthToken
         * @param {String} gameName
         * @param {Integer} partyId
         *
         * @returns {Promise} with position in slots of the player who joined.
         */
        this.joinParty = function (oauthToken, gameName, partyId) {
            return that.call('patch', 'api/games/' + gameName + '/parties/' + partyId + '/join', oauthToken);
        };
    };
})(window);
