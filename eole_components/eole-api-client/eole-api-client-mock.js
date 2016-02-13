'use strict';

function EoleApiClientMock($q) {
    var that = this;

    var deferedResponse = function (response) {
        return $q(function (resolve) {
            resolve(response);
        });
    };

    var deferedFail = function () {
        return $q(function (resolve, reject) {
            reject('fail');
        });
    };

    /**
     * @param {String} method 'get', 'post', ...
     * @param {String} path example: 'api/players' (no starting slash).
     * @param {String} OAuth2 token.
     * @param {Object} postData
     *
     * @returns {Promise}
     */
    this.call = function (method, path, oauthToken, postData) {
        switch (path) {
            case 'api/games/awale/find-by-id/2':
                return deferedResponse({
                    winner: null,
                    grid: [
                        {
                            seeds: [4, 4, 4, 4, 4, 4],
                            attic: 0
                        },
                        {
                            seeds: [4, 4, 4, 4, 4, 4],
                            attic: 0
                        }
                    ],
                    seeds_per_container: 4,
                    current_player: 1,
                    last_move: [ ],
                    party:
                    {
                        id: 3,
                        game: {
                            id: 3,
                            name: 'awale'
                        },
                        host:
                        {
                            id: 3,
                            player: {
                                id: 42,
                                username: 'Tyler Durden',
                                date_created: "2016-02-03T02:50:44+0100",
                                guest: false,
                                roles: ['ROLE_PLAYER']
                            },
                            party: null,
                            score: 0
                        },
                        state: 1,
                        slots: [
                            {
                                id: 3,
                                player: {
                                    id: 42,
                                    username: 'Tyler Durden',
                                    date_created: "2016-02-03T02:50:44+0100",
                                    guest: false,
                                    roles: ['ROLE_PLAYER']
                                },
                                party: null,
                                score: 0
                            },
                            {
                                id: 4,
                                player: {
                                    id: 1,
                                    username: 'Me',
                                    date_created: "2016-02-03T02:50:44+0100",
                                    guest: false,
                                    roles: ['ROLE_PLAYER']
                                },
                                party: null,
                                score: 0
                            }
                        ]
                    }
                });
                break;

            case 'api/games/awale/play':
                return deferedResponse({
                    currentPlayer: 1
                });

            default:
                console.warn('No mock for '+method+' '+path);
                return deferedFail();
        }
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
        return deferedResponse({
            access_token: "mockedAccessToken",
            token_type: "Bearer",
            expires_in: 3600,
            refresh_token: "mockedRefreshToken"
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
        return deferedResponse({
            access_token: "mockedAccessToken",
            token_type: "Bearer",
            expires_in: 3600,
            refresh_token: "mockedRefreshToken"
        });
    };

    /**
     * @returns {Promise} A Player[] promise.
     */
    this.getPlayers = function () {
        return deferedResponse([]);
    };

    /**
     * @param {String} username
     *
     * @returns {Promise} A Player promise.
     */
    this.getPlayer = function (username) {
        return deferedResponse({
            id: 1,
            username: username,
            date_created: "2016-02-03T02:50:44+0100",
            guest: -1 === username.indexOf('Guest'),
            roles: ['ROLE_PLAYER']
        });
    };

    /**
     * @param {String} username
     * @param {String} password
     *
     * @returns {Promise} A Player promise.
     */
    this.createPlayer = function (username, password) {
        console.warn('eoleApi.registerGuest should be used instead of eoleApi.createPlayer when a guest is logged in.');

        return deferedResponse({
            id: 2,
            username: username,
            date_created: "2016-02-03T02:50:44+0100",
            guest: false,
            roles: ['ROLE_PLAYER']
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
        return deferedResponse({
            id: 2,
            username: username,
            date_created: "2016-02-03T02:50:44+0100",
            guest: false,
            roles: ['ROLE_PLAYER']
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
        return deferedResponse({
            id: 3,
            username: 'Guest '+Math.floor(Math.random() * 1000),
            date_created: "2016-02-03T02:50:44+0100",
            guest: true,
            roles: ['ROLE_PLAYER']
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
        return deferedResponse({
            id: 1,
            username: 'Me',
            date_created: "2016-02-03T02:50:44+0100",
            guest: false,
            roles: ['ROLE_PLAYER']
        });
    };

    this.getGames = function () {
        return deferedResponse([
            {
                id: 1,
                name: 'tictactoe'
            },
            {
                id: 2,
                name: 'awale'
            }
        ]);
    };

    this.getGameByName = function (name) {
        var games = {
            tictactoe: {
                id: 1,
                name: 'tictactoe'
            },
            awale: {
                id: 2,
                name: 'awale'
            }
        };

        return deferedResponse(games[name]);
    };

    this.createParty = function (gameName, oauthToken) {
        return deferedResponse({
            id: 2,
            game: {
                id: 1,
                name: gameName
            },
            host: {
                id: 1,
                username: 'Me',
                date_created: "2016-02-03T02:50:44+0100",
                guest: false,
                roles: ['ROLE_PLAYER']
            },
            state: 0,
            slots: [
                {
                    id: 3,
                    player: {
                        id: 1,
                        username: 'Me',
                        date_created: "2016-02-03T02:50:44+0100",
                        guest: false,
                        roles: ['ROLE_PLAYER']
                    },
                    party: null,
                    score: 0
                },
                {
                    id: 4,
                    player: null,
                    party: null,
                    score: 0
                }
            ]
        });
    };

    this.getParties = function () {
        return deferedResponse([
            {
                id: 2,
                game: {
                    id: 1,
                    name: 'tictactoe'
                },
                host: {
                    id: 42,
                    username: 'Tyler Durden',
                    date_created: "2016-02-03T02:50:44+0100",
                    guest: false,
                    roles: ['ROLE_PLAYER']
                },
                state: 0,
                slots: [
                    {
                        id: 3,
                        player: {
                            id: 42,
                            username: 'Tyler Durden',
                            date_created: "2016-02-03T02:50:44+0100",
                            guest: false,
                            roles: ['ROLE_PLAYER']
                        },
                        party: null,
                        score: 0
                    },
                    {
                        id: 4,
                        player: null,
                        party: null,
                        score: 0
                    }
                ]
            }
        ]);
    };

    this.getPartiesForGame = function (gameName) {
        return deferedResponse([
            {
                id: 2,
                game: {
                    id: 1,
                    name: gameName
                },
                host: {
                    id: 42,
                    username: 'Tyler Durden',
                    date_created: "2016-02-03T02:50:44+0100",
                    guest: false,
                    roles: ['ROLE_PLAYER']
                },
                state: 0,
                slots: [
                    {
                        id: 3,
                        player: {
                            id: 42,
                            username: 'Tyler Durden',
                            date_created: "2016-02-03T02:50:44+0100",
                            guest: false,
                            roles: ['ROLE_PLAYER']
                        },
                        party: null,
                        score: 0
                    },
                    {
                        id: 4,
                        player: null,
                        party: null,
                        score: 0
                    }
                ]
            }
        ]);
    };

    this.getParty = function (gameName, partyId) {
        return deferedResponse([
            {
                id: partyId,
                game: {
                    id: 1,
                    name: gameName
                },
                host: {
                    id: 1,
                    username: 'Me',
                    date_created: "2016-02-03T02:50:44+0100",
                    guest: false,
                    roles: ['ROLE_PLAYER']
                },
                state: 0,
                slots: [
                    {
                        id: 3,
                        player: {
                            id: 1,
                            username: 'Me',
                            date_created: "2016-02-03T02:50:44+0100",
                            guest: false,
                            roles: ['ROLE_PLAYER']
                        },
                        party: null,
                        score: 0
                    },
                    {
                        id: 4,
                        player: null,
                        party: null,
                        score: 0
                    }
                ]
            }
        ]);
    };

    this.joinParty = function (oauthToken, gameName, partyId) {
        return deferedResponse(1);
    };
}
