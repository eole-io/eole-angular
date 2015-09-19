'use strict';

function EoleApiClient($http, $q, eoleApiUrl, $httpParamSerializer) {
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

    this.createGuest = function () {
        return $q(function (resolve, reject) {
            $http({
                method: 'post',
                url: eoleApiUrl+'api/players/guest'
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
                        'x-wsse': that.createWsseToken(player.username, password, player.salt)
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

    this.createWsseToken = function (username, password, salt) {
        var token = 'UsernameToken Username="_username_", PasswordDigest="_digest_", Nonce="_nonce_", Created="_created_"';

        var nonce = Math.random().toString(36).substr(2);
        var created = new Date().toISOString();
        var secret = that.encodePassword(password, salt);
        var digest = CryptoJS.SHA1(nonce+created+secret).toString(CryptoJS.enc.Base64);

        token = token.replace('_username_', username);
        token = token.replace('_nonce_', btoa(nonce));
        token = token.replace('_created_', created);
        token = token.replace('_digest_', digest);

        return token;
    };

    this.encodePassword = function (password, salt)
    {
        if (!salt) {
            throw new Error('Salt must be defined.');
        }

        var encoder = new CryptoJsPasswordEncoder('sha512', true, 5000);
        return encoder.encodePassword(password, salt);
    };
}
