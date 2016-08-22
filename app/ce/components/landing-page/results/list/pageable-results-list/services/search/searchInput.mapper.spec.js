define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper');

  describe('CE Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchInputMapper.map();
          }).not.toThrow();
        });

        it('should return null', function() {
          expect(searchInputMapper.map()).toEqual(null);
        });
      });
    });
  });
});