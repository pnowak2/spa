define(function(require) {
  var _ = require('underscore'),
    advancedSearchService = require('./advancedSearch.service'),
    countriesDataSource = require('app/ce/data/countries.datasource');

  describe('CE Advanced Search Service', function() {
    beforeEach(function() {
      spyOn(countriesDataSource, 'getItems').and.returnValue([{
        id: 'pl'
      }, {
        id: 'de'
      }]);
    });

    describe('.allCountries()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allCountries).toEqual(jasmine.any(Function));
      });

      it('should retrieve all countries', function() {
        var countries = countriesDataSource.getItems();
        expect(advancedSearchService.allCountries()).toEqual(countries);
      });
    });
  });
});