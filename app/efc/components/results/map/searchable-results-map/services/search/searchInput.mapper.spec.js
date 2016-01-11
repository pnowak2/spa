define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper');

  describe('Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        it('should be defined', function() {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});