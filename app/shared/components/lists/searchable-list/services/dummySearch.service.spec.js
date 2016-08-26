define(function(require) {
  var dummySearchService = require('./dummySearch.service'),
    RSVP = require('rsvp');

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

        it('should return promise', function() {
          expect(dummySearchService.search()).toEqual(jasmine.any(RSVP.Promise));
        });

        it('should resolve successful response', function(done) {
          var testRequest = function() {
            expect(true).toBe(true);
          };

          dummySearchService.search()
            .then(testRequest)
            .catch(fail)
            .finally(done);
        });
      });
    });
  });
});