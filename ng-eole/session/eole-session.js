ngEole.factory('eoleSession', ['locker', 'eoleApi', function (locker, eoleApi) {
    var eoleSession = {

        /**
         * {Object}
         */
        player: null,

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
         * @returns {Promise} Created guest.
         */
        loginAsGuest: function () {
            var promise = eoleApi.createGuest();

            promise.then(eoleSession.setAndSavePlayer);

            return promise;
        },

        /**
         * @returns {Promise} Logged in player or false on invalid credentials.
         */
        login: function (username, password) {
            var promise = eoleApi.authMe(username, password);

            promise.then(eoleSession.setAndSavePlayer);

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

            promise.then(eoleSession.setAndSavePlayer);

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
