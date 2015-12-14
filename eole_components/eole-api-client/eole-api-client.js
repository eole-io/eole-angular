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
                        'x-wsse': wsseTokenGenerator.createWsseToken(player.username, password, player.password_salt)
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

    this.createParty = function (gameName, host) {
        return $q(function (resolve, reject) {
            $http({
                method: 'post',
                url: eoleApiUrl+'api/games/'+gameName+'/parties',
                headers: {
                    'x-wsse': wsseTokenGenerator.createWsseToken(host.username, host.password, host.password_salt)
                }
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getParties = function () {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/parties'
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getPartiesForGame = function (gameName) {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/games/'+gameName+'/parties'
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.getParty = function (gameName, partyId) {
        return $q(function (resolve, reject) {
            $http({
                method: 'get',
                url: eoleApiUrl+'api/games/'+gameName+'/parties/'+partyId
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };

    this.joinParty = function (player, gameName, partyId) {
        return $q(function (resolve, reject) {
            $http({
                method: 'patch',
                url: eoleApiUrl+'api/games/'+gameName+'/parties/'+partyId+'/join',
                headers: {
                    'x-wsse': wsseTokenGenerator.createWsseToken(player.username, player.password, player.password_salt)
                }
            }).then(function (r) {
                resolve(r.data);
            }).catch(function (r) {
                reject(r);
            });
        });
    };
}
