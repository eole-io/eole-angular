'use strict';

function EoleApiClient($http, $q, eoleApiUrl, wsseTokenGenerator, $httpParamSerializer) {
    var that = this;

    this.getPlayers = function () {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/players'
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getPlayer = function (username) {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/players/'+username
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.createPlayer = function (username, password) {
        return $q(function (resolve, reject) {
            $http({
                method: 'post',
                url: eoleApiUrl+'api/players',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    username: username,
                    password: password
                })
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.createGuest = function (password) {
        return $q(function (resolve, reject) {
            $http({
                method: 'post',
                url: eoleApiUrl+'api/players/guest',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    password: password
                })
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.authMe = function (username, password) {
        return $q(function (resolve, reject) {
            that.getPlayer(username).then(function (player) {
                $http({
                    method: 'get',
                    url: eoleApiUrl+'api/auth/me',
                    headers: {
                        'x-wsse': wsseTokenGenerator.createWsseToken(player.username, password, player.salt)
                    }
                }).then(function (r) {
                    resolve(r.data);
                }).catch(function (r) {
                    reject(r);
                });
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getGames = function () {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/games'
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getGameByName = function (name) {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/games/'+name
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };
}
