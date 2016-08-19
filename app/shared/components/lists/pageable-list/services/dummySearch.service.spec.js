define(function(require) {
  var dummySearchService = require('./dummySearch.service');

  describe('Dummy Search Service', function() {
    describe('type', function() {
      it('should be of any object', function() {
        expect(dummySearchService).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.search()', function() {
        it('should be defined', function() {
          expect(dummySearchService.search).toEqual(jasmine.any(Function));
        });

        it('should return object with then() method', function() {
          expect(dummySearchService.search().then).toEqual(jasmine.any(Function));
        });

        it('should return object with catch() method', function() {
          expect(dummySearchService.search().catch).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});