define(function(require) {
  var _ = require('underscore'),
    advancedSearchService = require('./advancedSearch.service'),
    optionsDatasource = require('app/ce/data/options.datasource'),
    programmesDatasource = require('app/ce/data/programmes.datasource'),
    activityYearsDataSource = require('app/ce/data/activityYears.datasource'),
    countriesDataSource = require('app/ce/data/countries.datasource'),
    orgTypesDataSource = require('app/ce/data/organisation-types.datasource');

  describe('CE Advanced Search Service', function() {
    beforeEach(function() {

    });

    describe('.allOptions()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allOptions).toEqual(jasmine.any(Function));
      });

      it('should retrieve all countries', function() {
        var items = optionsDatasource.getItems();
        expect(advancedSearchService.allOptions()).toEqual(items);
      });
    });

    describe('.allProgrammes()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allProgrammes).toEqual(jasmine.any(Function));
      });

      it('should retrieve all items form datasource', function() {
        var items = programmesDatasource.getItems();
        expect(advancedSearchService.allProgrammes()).toEqual(items);
      });
    });

    describe('.allActivityYears()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allActivityYears).toEqual(jasmine.any(Function));
      });

      it('should retrieve all items form datasource', function() {
        var items = activityYearsDataSource.getItems();
        expect(advancedSearchService.allActivityYears()).toEqual(items);
      });
    });

    describe('.allFundingYears()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allFundingYears).toEqual(jasmine.any(Function));
      });

      it('should return array with correct size', function() {
        var years = advancedSearchService.allFundingYears(),
          startYear = 2014,
          currentYear = new Date().getFullYear();

        expect(years.length).toEqual(_.range(startYear, currentYear + 1).length);
      });

      it('should have correct first item', function() {
        var years = advancedSearchService.allFundingYears();

        expect(_.first(years)).toEqual({
          id: 2014,
          title: 2014
        });
      });

      it('have have correct last item', function() {
        var years = advancedSearchService.allFundingYears(),
          currentYear = new Date().getFullYear();

        expect(_.last(years)).toEqual({
          id: currentYear,
          title: currentYear
        });
      });
    });

    describe('.allCountries()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allCountries).toEqual(jasmine.any(Function));
      });

      it('should retrieve all items form datasource', function() {
        var items = countriesDataSource.getItems();
        expect(advancedSearchService.allCountries()).toEqual(items);
      });
    });

    describe('.allOrganisationTypes()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allOrganisationTypes).toEqual(jasmine.any(Function));
      });

      it('should retrieve all items form datasource', function() {
        var items = orgTypesDataSource.getItems();
        expect(advancedSearchService.allOrganisationTypes()).toEqual(items);
      });
    });
  });
});