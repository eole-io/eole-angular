describe('Test Karma', function () {
    // Load the module with MainController
    beforeEach(module('ngEole'));

    it('should assert true is true', function () {
        expect(true).toEqual(true);
    });
});

describe('Test Karma fail', function () {
    it('should assert false is true', function () {
        expect(false).toEqual(true);
    });
});
