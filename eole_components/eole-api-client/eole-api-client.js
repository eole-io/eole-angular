'use strict';

function EoleApiClient($http, $q, eoleApiUrl, wsseTokenGenerator, $httpParamSerializer) {
    var that = this;

    /**
     * @param {String} method 'get', 'post', ...
     * @param {String} path example: 'api/players' (no starting slash).
     * @param {Object} logged player with username, password and password_salt attributes.
     * @param {Object} postData
     *
     * @returns {Promise}
     */
    this.call = function (method, path, loggedPlayer, postData) {
        var headers = {};
        var data = {};

        if (loggedPlayer) {
            headers['x-wsse'] = wsseTokenGenerator.createWsseToken(loggedPlayer.username, loggedPlayer.password, loggedPlayer.password_salt);
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

    this.getPlayers = function () {
        return that.call('get', 'api/players');
    };

    this.getPlayer = function (username) {
        return that.call('get', 'api/players/'+username);
    };

    this.createPlayer = function (username, password) {
        return that.call('post', 'api/players', false, {
            username: username,
            password: password
        });
    };

    this.createGuest = function (password) {
        return that.call('post', 'api/players/guest', false, {
            password: password
        });
    };

    this.authMe = function (username, password) {
        return $q(function (resolve, reject) {
            that.getPlayer(username).then(function (player) {
                that.call('get', 'api/auth/me', {
                    username: player.username,
                    password: password,
                    password_salt: player.password_salt
                }).then(function (r) {
                    resolve(r);
                }).catch(function (r) {
                    reject(r);
                });
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getGames = function () {
        return that.call('get', 'api/games');
    };

    this.getGameByName = function (name) {
        return that.call('get', 'api/games/'+name);
    };

    this.createParty = function (gameName, host) {
        return that.call('post', 'api/games/'+gameName+'/parties', host);
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

    this.joinParty = function (player, gameName, partyId) {
        return that.call('patch', 'api/games/'+gameName+'/parties/'+partyId+'/join', player);
    };
}
