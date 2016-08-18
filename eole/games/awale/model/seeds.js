/* global angular */

(function (angular, Math) {
    'use strict';

    angular.module('eole.games.awale').factory('Seeds', [function () {
        return Seeds;
    }]);

    /**
     * @param {Object} containerOrigin coords of container center.
     * @param {Array} grid
     *
     * @returns {Seeds}
     */
    function Seeds(containerOrigin, grid) {
        var SEEDS_PICTURES_COUNT = 10;
        var SEEDS_PICTURES_SIZE = 24;
        var CONTAINER_SIZE = 62;
        var that = this;

        this.containers = [
            {
                seeds: [[], [], [], [], [], []],
                attic: []
            },
            {
                seeds: [[], [], [], [], [], []],
                attic: []
            }
        ];

        /**
         * @param {Array} grid
         *
         * @returns {Seeds}
         */
        this.setGrid = function (grid) {
            for (var player = 0; player < 2; player++) {
                for (var container = 0; container < 6; container++) {
                    that.setContainerSeedsNumber(that.containers[player].seeds[container], grid[player].seeds[container]);
                }

                that.setContainerSeedsNumber(that.containers[player].attic, grid[player].attic);
            }

            return that;
        };

        if (grid) {
            this.setGrid(grid);
        }

        /**
         * Take a random seed picture.
         *
         * @returns {Number}
         */
        this.randomSeed = function () {
            return Math.floor(Math.random() * SEEDS_PICTURES_COUNT);
        };

        /**
         * Create random coords for the n-th seed.
         *
         * @returns {Array} with x;y
         */
        this.createCoords = function () {
            var alpha = Math.random() * Math.PI * 2;
            var dist = Math.random() * (CONTAINER_SIZE - SEEDS_PICTURES_SIZE) / 2;

            var coords = {
                x: dist * Math.cos(alpha),
                y: dist * Math.sin(alpha),
                seed: that.randomSeed()
            };

            if (containerOrigin) {
                coords = that.translate(containerOrigin, coords);
            }

            return coords;
        };

        /**
         * @param {Object} origin
         * @param {Object} coords
         *
         * @returns {Object}
         */
        this.translate = function (origin, coords) {
            return {
                x: origin.x + coords.x,
                y: origin.y + coords.y,
                seed: coords.seed
            };
        };

        /**
         * @param {Array} container
         *
         * @returns {Seeds}
         */
        this.addSeed = function (container) {
            container.push(that.createCoords(container.length));

            return that;
        };

        /**
         * @param {Array} container
         *
         * @returns {Seeds}
         */
        this.removeSeed = function (container) {
            container.pop();

            return that;
        };

        /**
         * @param {Array} container
         * @param {Integer} seedsNumber
         *
         * @returns {Seeds}
         */
        this.setContainerSeedsNumber = function (container, seedsNumber) {
            while (container.length > seedsNumber) {
                that.removeSeed(container);
            }

            while (container.length < seedsNumber) {
                that.addSeed(container);
            }

            return that;
        };

        /**
         * Convert a coords object with x;y to style with left;top in pixels.
         *
         * @param {Object} coords
         *
         * @returns {Object}
         */
        this.coordsToStyle = function (coords) {
            return {
                'left': coords.x + 'px',
                'top': coords.y + 'px',
                'background-position': (coords.seed * SEEDS_PICTURES_SIZE) + 'px 0'
            };
        };

        /**
         * Return containers coords as styles.
         *
         * @returns {Array}
         */
        this.toStyle = function () {
            var styles = [
                {
                    seeds: [[], [], [], [], [], []],
                    attic: []
                },
                {
                    seeds: [[], [], [], [], [], []],
                    attic: []
                }
            ];

            for (var player = 0; player < 2; player++) {
                for (var container = 0; container < 6; container++) {
                    angular.forEach(that.containers[player].seeds[container], function (seedCoords) {
                        styles[player].seeds[container].push(that.coordsToStyle(seedCoords));
                    });
                }

                angular.forEach(that.containers[player].attic, function (seedCoords) {
                    styles[player].attic.push(that.coordsToStyle(seedCoords));
                });
            }

            return styles;
        };
    }
})(angular, Math);
