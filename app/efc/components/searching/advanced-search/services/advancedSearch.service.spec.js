define(function(require) {
  var advancedSearchService = require('./advancedSearch.service'),
    countriesDataSource = require('./data/countries'),
    activitiesDataSource = require('./data/activities'),
    organisationTypesDataSource = require('./data/organisationTypes'),
    RSVP = require('rsvp');

  describe('api', function() {
    describe('.allCountries()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allCountries).toEqual(jasmine.any(Function));
      });

      it('should return promise', function() {
        expect(advancedSearchService.allCountries()).toEqual(jasmine.any(RSVP.Promise));
      });

      it('should retrieve all countries', function(done) {
        var testRequest = function(countries) {
          expect(countriesDataSource).toBe(countries);
        };

        advancedSearchService.allCountries()
          .then(testRequest)
          .catch(fail)
          .finally(done);
      });
    });

    describe('.allActivities()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allActivities).toEqual(jasmine.any(Function));
      });

      it('should return promise', function() {
        expect(advancedSearchService.allActivities()).toEqual(jasmine.any(RSVP.Promise));
      });

      it('should retrieve all activities', function(done) {
        var testRequest = function(activities) {
          expect(activitiesDataSource).toBe(activities);
        };

        advancedSearchService.allActivities()
          .then(testRequest)
          .catch(fail)
          .finally(done);
      });
    });

    describe('.allOrganisationTypes()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allOrganisationTypes).toEqual(jasmine.any(Function));
      });

      it('should return promise', function() {
        expect(advancedSearchService.allOrganisationTypes()).toEqual(jasmine.any(RSVP.Promise));
      });

      it('should retrieve all organisation types', function(done) {
        var testRequest = function(organisationTypes) {
          expect(organisationTypesDataSource).toBe(organisationTypes);
        };

        advancedSearchService.allOrganisationTypes()
          .then(testRequest)
          .catch(fail)
          .finally(done);
      });
    });
  });
});