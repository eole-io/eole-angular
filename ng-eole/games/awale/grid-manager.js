'use strict';

ngEole.factory('gridManager', [function () {
    var GridManager = function () {
        var that = this;

        this.createInitGrid = function (seedsPerContainer) {
            var n = seedsPerContainer;

            if (!seedsPerContainer) {
                n = 0;
            }

            return [
                {
                    seeds: [n, n, n, n, n, n],
                    attic: 0
                },
                {
                    seeds: [n, n, n, n, n, n],
                    attic: 0
                }
            ];
        };

        this.storeSeeds = function (grid, player, box) {
            grid[1 - player]['attic'] += grid[player]['seeds'][box];
            grid[player]['seeds'][box] = 0;
        };

        this.addSeeds = function (grid, player, box, number) {
            grid[player]['seeds'][box] += number;

            if (grid[player]['seeds'][box] < 0) {
                that.clearSeedsNumber(grid, player, box);
            }
        };

        this.getSeedsNumber = function (grid, player, box) {
            return grid[player]['seeds'][box];
        };

        this.setSeedsNumber = function (grid, player, box, number) {
            grid[player]['seeds'][box] = number;

            return that;
        };

        this.clearSeedsNumber = function (grid, player, box) {
            return that.setSeedsNumber(grid, player, box, 0);
        };

        this.cloneGrid = function (grid) {
            return JSON.parse(JSON.stringify(grid));
        };

        this.has2Or3Seeds = function (grid, row, box) {
            return -1 !== [2, 3].indexOf(grid[row]['seeds'][box]);
        };
    };

    return new GridManager();
}]);
