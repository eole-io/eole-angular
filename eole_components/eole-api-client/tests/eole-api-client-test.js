describe('Test Eole Api client', function () {
    describe('When I call getPlayer with an existing username', function () {
        it('returns a promise of player object', function () {
            var $injector = angular.injector(['eoleApi']);
            var $http = $injector.get('$http');
        });
    });
});
