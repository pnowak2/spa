define(function(require) {
  var searchResultMapper = require('./searchResult.mapper');

  describe('CE Search Result Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchResultMapper.map();
          }).not.toThrow();
        });

        it('should return null', function() {
          expect(searchResultMapper.map()).toEqual(null);
        });
      });
    });
  });
});