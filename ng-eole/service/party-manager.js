'use strict';

ngEole.factory('partyManager', ['eoleSession', function (eoleSession) {
    var PartyManager = function (eoleSession) {
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
    };

    return new PartyManager(eoleSession);
}]);
