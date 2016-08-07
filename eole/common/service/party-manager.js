(function (angular) {
    'use strict';

    angular.module('eole').factory('partyManager', ['eoleSession', function (eoleSession) {
        var PartyManager = function (eoleSession) {
            var that = this;

            /**
             * @param {Object} party
             * @param {Object} player defaults to current logged player.
             *
             * @returns {Number|null}
             */
            this.getPlayerPosition = function (party, player) {
                if (!player) {
                    player = eoleSession.player;
                }

                var slotsCount = party.slots.length;

                for (var i = 0; i < slotsCount; i++) {
                    if (party.slots[i].player && party.slots[i].player.id === player.id) {
                        return i;
                    }
                }

                return null;
            };

            /**
             * @param {Object} party
             * @param {Object} player defaults to current logged player.
             *
             * @returns {Boolean}
             */
            this.inParty = function (party, player) {
                if (!player) {
                    player = eoleSession.player;
                }

                return null !== that.getPlayerPosition(party, player);
            };
        };

        return new PartyManager(eoleSession);
    }]);
})(angular);
