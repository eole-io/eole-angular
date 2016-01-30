'use strict';

function EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer, oauthConfig) {
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
                url: eoleApiUrl+path,
                headers: headers,
                data: data
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
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
        return that.call(method, 'api/games/'+gameName+'/'+path, oauthToken, postData);
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
        return that.call('get', 'api/players/'+username);
    };

    /**
     * @param {String} username
     * @param {String} password
     *
     * @returns {Promise} A Player promise.
     */
    this.createPlayer = function (username, password) {
        console.warn('eoleApi.registerGuest should be used instead of eoleApi.createPlayer when a guest is logged in.');

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

    this.getGames = function () {
        return that.call('get', 'api/games');
    };

    this.getGameByName = function (name) {
        return that.call('get', 'api/games/'+name);
    };

    this.createParty = function (gameName, oauthToken) {
        return that.call('post', 'api/games/'+gameName+'/parties', oauthToken);
    };

    this.getParties = function () {
        return that.call('get', 'api/parties/');
    };

    this.getPartiesForGame = function (gameName) {
        return that.call('get', 'api/games/'+gameName+'/parties');
    };

    this.getParty = function (gameName, partyId) {
        return that.call('get', 'api/games/'+gameName+'/parties/'+partyId);
    };

    this.joinParty = function (oauthToken, gameName, partyId) {
        return that.call('patch', 'api/games/'+gameName+'/parties/'+partyId+'/join', oauthToken);
    };
}
