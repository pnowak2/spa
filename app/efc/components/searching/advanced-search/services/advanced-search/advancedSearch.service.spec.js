define(function(require) {
  var _ = require('underscore'),
    advancedSearchService = require('./advancedSearch.service'),
    countriesDataSource = require('app/efc/data/countries.datasource'),
    activitiesDataSource = require('app/efc/data/activities.datasource'),
    subactivitiesDataSource = require('app/efc/data/subactivities.datasource'),
    organisationTypesDataSource = require('app/efc/data/organisationTypes.datasource');

  describe('api', function() {

    beforeEach(function() {
      spyOn(countriesDataSource, 'getItems').and.returnValue([{
        id: '1'
      }, {
        id: '2'
      }]);

      spyOn(activitiesDataSource, 'getItems').and.returnValue([{
        id: '1'
      }, {
        id: '2'
      }]);

      spyOn(subactivitiesDataSource, 'getItems').and.returnValue([{
        id: '1',
        activityId: '10'
      }, {
        id: '2',
        activityId: '10'
      }, {
        id: '3',
        activityId: '20'
      }, {
        id: '4',
        activityId: '20'
      }, {
        id: '5',
        activityId: '10'
      }]);

      spyOn(organisationTypesDataSource, 'getItems').and.returnValue([{
        id: '1'
      }, {
        id: '2'
      }]);
    });

    describe('.allCountries()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allCountries).toEqual(jasmine.any(Function));
      });

      it('should retrieve all countries', function() {
        expect(advancedSearchService.allCountries()).toEqual(countriesDataSource.getItems());
      });
    });

    describe('.allActivities()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allActivities).toEqual(jasmine.any(Function));
      });

      it('should retrieve all activities', function() {
        expect(advancedSearchService.allActivities()).toEqual(activitiesDataSource.getItems());
      });
    });

    describe('.subactivitiesByActivityId()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.subactivitiesByActivityId).toEqual(jasmine.any(Function));
      });

      it('should return empty array if activityId is not defined', function() {
        var result = advancedSearchService.subactivitiesByActivityId();
        expect(result).toEqual([]);
      });

      it('should return subactivities for given activity id', function() {
        var result1 = advancedSearchService.subactivitiesByActivityId('10');
        expect(result1).toEqual([{
          id: '1',
          activityId: '10'
        }, {
          id: '2',
          activityId: '10'
        }, {
          id: '5',
          activityId: '10'
        }]);

        var result2 = advancedSearchService.subactivitiesByActivityId('20');
        expect(result2).toEqual([{
          id: '3',
          activityId: '20'
        }, {
          id: '4',
          activityId: '20'
        }]);
      });
    });

    describe('.allOrganisationTypes()', function() {
      it('should be defined', function() {
        expect(advancedSearchService.allOrganisationTypes).toEqual(jasmine.any(Function));
      });

      it('should retrieve all organisation types', function() {
        expect(advancedSearchService.allOrganisationTypes()).toEqual(organisationTypesDataSource.getItems());
      });
    });
  });
});