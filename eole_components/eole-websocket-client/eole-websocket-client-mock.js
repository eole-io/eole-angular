/* global window */

(function (window) {
    'use strict';

    window.EoleWebsocketClientMock = function ($q) {
        /**
         * @param {String} accessToken
         *
         * @returns {Promise} A mocked socket session promise.
         */
        this.openSocket = function (accessToken) {
            return $q(function (resolve, reject) {
                var topics = {};

                topics['eole/core/chat'] = {
                    subscribe: function (topic, callback) {
                        topics[topic].receiveEvent(topic, {
                            type: 'join',
                            player: { username: 'Me' }
                        });

                        topics[topic].receiveEvent(topic, {
                            type: 'message',
                            message: 'Hello Me !',
                            player: { username: 'Bot' }
                        });
                    },

                    publish: function (topic, message) {
                        topics[topic].receiveEvent(topic, {
                            type: 'message',
                            message: message,
                            player: { username: 'Me' }
                        });

                        topics[topic].receiveEvent(topic, {
                            type: 'message',
                            message: message+' toi même !',
                            player: { username: 'Bot' }
                        });
                    }
                };

                topics['eole/games/tictactoe/parties/2'] = {
                    symbol: 0,

                    publish: function (topic, event) {
                        switch (event.type) {
                            case 'need-refresh':
                                topics[topic].receiveEvent(topic, {
                                    type: 'init',
                                    tictactoe: {
                                        current_player: 'X',
                                        grid: '---------',
                                        last_move: 'O'
                                    },
                                    party: {
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

                            case 'move':
                                topics[topic].receiveEvent(topic, {
                                    type: 'move',
                                    move: {
                                        col: event.col,
                                        row: event.row,
                                        symbol: ['X', 'O'][(topics[topic].symbol++) % 2]
                                    }
                                });
                        }
                    }
                };

                var mockedSocket = {
                    subscribe: function (topic, callback) {
                        console.log('subscribe', topic, callback);

                        setTimeout(function () {
                            if (topics[topic]) {
                                topics[topic].receiveEvent = callback;

                                if (topics[topic].subscribe) {
                                    topics[topic].subscribe(topic, callback);
                                }
                            }
                        });
                    },

                    publish: function (topic, message) {
                        console.log('publish', topic, message);

                        setTimeout(function () {
                            if (topics[topic] && topics[topic].publish) {
                                topics[topic].publish(topic, message);
                            }
                        });
                    },

                    unsubscribe: function (topic) {
                        console.log('unsubscribe', topic);

                        setTimeout(function () {
                            if (topics[topic] && topics[topic].unsubscribe) {
                                topics[topic].unsubscribe(topic);
                            }
                        });
                    }
                };

                resolve(mockedSocket);
            });
        };
    };
})(window);
