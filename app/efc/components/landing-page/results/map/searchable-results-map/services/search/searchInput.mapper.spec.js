define(function(require) {
  var _ = require('underscore'),
    mapInputMapper = require('./searchInput.mapper'),
    listInputMapper = require('app/efc/components/landing-page/results/list/searchable-results-list/services/search/searchInput.mapper');


  describe('Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(mapInputMapper).toEqual(jasmine.any(Object));
      });

      it('should be the list search input mapper', function() {
        expect(mapInputMapper).toBe(listInputMapper)
      });
    });
  });
});