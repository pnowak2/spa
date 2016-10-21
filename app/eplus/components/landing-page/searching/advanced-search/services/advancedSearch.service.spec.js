define(function (require) {
  var advancedSearchService = require('./advancedSearch.service'),
    optionsDatasource = require('app/eplus/data/options.datasource'),
    countriesDatasource = require('app/eplus/data/countries.datasource'),
    activityYearsDatasource = require('app/eplus/data/activityYears.datasource'),
    fundingYearsDatasource = require('app/eplus/data/fundingYears.datasource'),
    programmesDatasource = require('app/eplus/data/programmes.datasource'),
    organisationTypesDatasource = require('app/eplus/data/organisation-types.datasource'),
    organisationRolesDatasource = require('app/eplus/data/organisation-roles.datasource'),
    regionsDatasource = require('app/eplus/data/regions.datasource'),
    actionsByProgrammeDatasource = require('app/eplus/data/actions.datasource'),
    actionsTypeByActionDatasource = require('app/eplus/data/actionsType.datasource');

  describe('EPLUS advancedSearch Service', function () {
    beforeEach(function () {
      var fakeData = [{
        id: "",
        title: "fake 1"
      }, {
        id: "1",
        title: "fake 2"
      }];

      var fakeDependentCountryRegionData = {
        "PL": [{
          id: "1",
          title: "Region 1"
        }, {
          id: "2",
          title: "Region 2"
        }]
      };

      var fakeDependentActionData = {
        "31046216": [{
          id: "1",
          title: "act 1"
        }, {
          id: "2",
          title: "act 2"
        }]
      };

      spyOn(regionsDatasource, 'getItems').and.returnValue(fakeDependentCountryRegionData);
      spyOn(actionsByProgrammeDatasource, 'getItems').and.returnValue(fakeDependentActionData);
      spyOn(actionsTypeByActionDatasource, 'getItems').and.returnValue(fakeDependentActionData);
    });

    describe('.allOptions()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allOptions).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = optionsDatasource.getItems();
        expect(advancedSearchService.allOptions()).toEqual(items);
      });
    });

    describe('.allProgrammes()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allProgrammes).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = programmesDatasource.getItems();
        expect(advancedSearchService.allProgrammes()).toEqual(items);
      });
    });

    describe('.allCountries()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allCountries).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = countriesDatasource.getItems();
        expect(advancedSearchService.allCountries()).toEqual(items);
      });
    });

    describe('.allActivityYears()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allActivityYears).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = activityYearsDatasource.getItems();
        expect(advancedSearchService.allActivityYears()).toEqual(items);
      });
    });

    describe('.allFundingYears()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allFundingYears).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = fundingYearsDatasource.getItems();
        expect(advancedSearchService.allFundingYears()).toEqual(items);
      });
    });

    describe('.allOrganisationTypes()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allOrganisationTypes).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = organisationTypesDatasource.getItems();
        expect(advancedSearchService.allOrganisationTypes()).toEqual(items);
      });
    });

    describe('.allOrganisationRoles()', function () {

      it('should be defined', function () {
        expect(advancedSearchService.allOrganisationRoles).toEqual(jasmine.any(Function));
      });

      it('should retrieve data from getItems datasource', function () {
        var items = organisationRolesDatasource.getItems();
        expect(advancedSearchService.allOrganisationRoles()).toEqual(items);
      });
    });

    describe('.getRegionsByCountry', function () {

      it('should be defined', function () {
        expect(advancedSearchService.getRegionsByCountry).toEqual(jasmine.any(Function));
      });

      it('should pass parameter to retrieve data', function () {
        expect(advancedSearchService.getRegionsByCountry('PL')).toEqual([{
          id: "1",
          title: "Region 1"
        }, {
          id: "2",
          title: "Region 2"
        }]);
      });
    });

    describe('.getActionsByProgramme()', function () {
      it('should be defined', function () {
        expect(advancedSearchService.getActionsByProgramme).toEqual(jasmine.any(Function));
      });

      it('should retrieve actions by Programme code', function () {
        expect(advancedSearchService.getActionsByProgramme('31046216')).toEqual([{
          id: "1",
          title: "act 1"
        }, {
          id: "2",
          title: "act 2"
        }]);
      });
    });

    describe('.getActionsTypeByAction()', function () {
      it('should be defined', function () {
        expect(advancedSearchService.getActionsTypeByAction).toEqual(jasmine.any(Function));
      });

      it('should retrieve actions types by Action code', function () {
        expect(advancedSearchService.getActionsTypeByAction('31046216')).toEqual([{
          id: "1",
          title: "act 1"
        }, {
          id: "2",
          title: "act 2"
        }]);
      });
    });
  });
});