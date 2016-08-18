define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchView = require('./advancedSearch.view'),
    advancedSearchService = require('../services/advanced-search/advancedSearch.service'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    constants = require('app/ce/util/constants');

  describe('CE Advanced Search View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(AdvancedSearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(MultiselectComponent.prototype, 'initialize');
        this.view = new AdvancedSearchView();
      });

      it('should not throw if created without arguments', function() {
        expect(function() {
          new AdvancedSearchView;
        }).not.toThrow();
      });

      describe('Options Section', function() {
        it('should have property defined', function() {
          expect(this.view.options).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.options.initialize).toHaveBeenCalledWith(advancedSearchService.allOptions(), {
            placeholder: 'All Options',
            multiple: true
          });
        });
      });

      describe('Programmes Section', function() {
        it('should have property defined', function() {
          expect(this.view.programmes).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.programmes.initialize).toHaveBeenCalledWith(advancedSearchService.allProgrammes(), {
            placeholder: 'All Programmes',
            multiple: true,
            maximumSelectionLength: 1
          });
        });
      });

      describe('Subprogrammes Section', function() {
        it('should have property defined', function() {
          expect(this.view.subprogrammes).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.subprogrammes.initialize).toHaveBeenCalledWith([], {
            placeholder: 'All Subprogrammes / All Funding Schemes',
            multiple: true,
            maximumSelectionLength: 1
          });
        });
      });

      describe('Actions Section', function() {
        it('should have property defined', function() {
          expect(this.view.actions).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.actions.initialize).toHaveBeenCalledWith([], {
            placeholder: 'All Actions',
            multiple: true,
            maximumSelectionLength: 1
          });
        });
      });

      describe('Activities Section', function() {
        it('should have property defined', function() {
          expect(this.view.activities).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.activities.initialize).toHaveBeenCalledWith([], {
            placeholder: 'All Activities',
            multiple: true
          });
        });
      });

      describe('Activity Years', function() {
        it('should have property defined', function() {
          expect(this.view.activityYears).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.activityYears.initialize).toHaveBeenCalledWith(advancedSearchService.allActivityYears(), {
            placeholder: 'All Activity Years',
            multiple: true
          });
        });
      });

      describe('Funding Years', function() {
        it('should have property defined', function() {
          expect(this.view.fundingYears).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.fundingYears.initialize).toHaveBeenCalledWith(advancedSearchService.allFundingYears(), {
            placeholder: 'All Funding Years',
            multiple: true
          });
        });
      });

      describe('Countries', function() {
        it('should have property defined', function() {
          expect(this.view.countries).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.countries.initialize).toHaveBeenCalledWith(advancedSearchService.allCountries(), {
            placeholder: 'All Countries',
            multiple: true
          });
        });
      });

      describe('Regions', function() {
        it('should have property defined', function() {
          expect(this.view.regions).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.regions.initialize).toHaveBeenCalledWith([], {
            placeholder: 'All Regions',
            multiple: true
          });
        });
      });

      describe('Organisation Types', function() {
        it('should have property defined', function() {
          expect(this.view.organisationTypes).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize property with correct data', function() {
          expect(this.view.organisationTypes.initialize).toHaveBeenCalledWith(advancedSearchService.allOrganisationTypes(), {
            placeholder: 'All Organisation Types',
            multiple: true
          });
        });
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(AdvancedSearchView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(AdvancedSearchView.prototype.className).toEqual('vlr-advanced-search');
      });
    });

    describe('api', function() {
      describe('.initCriteriaVisibility()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView();
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesSelection');
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesVisibility');
          spyOn(this.view.subprogrammes, 'hide');
          spyOn(this.view.actions, 'hide');
          spyOn(this.view.activities, 'hide');
          spyOn(this.view.fundingYears, 'hide');
          spyOn(this.view.regions, 'hide');

          this.view.initCriteriaVisibility();
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.initCriteriaVisibility).toEqual(jasmine.any(Function));
        });

        it('should clear match all countries checkbox', function() {
          expect(this.view.toggleMatchAllCountriesSelection).toHaveBeenCalledWith(false);
        });

        it('should hide match all countries section', function() {
          expect(this.view.toggleMatchAllCountriesVisibility).toHaveBeenCalledWith(false);
        });

        it('should hide subprogrammes', function() {
          expect(this.view.subprogrammes.hide).toHaveBeenCalled();
        });

        it('should hide actions', function() {
          expect(this.view.actions.hide).toHaveBeenCalled();
        });

        it('should hide activities', function() {
          expect(this.view.activities.hide).toHaveBeenCalled();
        });

        it('should hide funding years', function() {
          expect(this.view.fundingYears.hide).toHaveBeenCalled();
        });

        it('should hide funding regions', function() {
          expect(this.view.regions.hide).toHaveBeenCalled();
        });
      });

      describe('.getCriteria()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getCriteria).toEqual(jasmine.any(Function));
        });

        describe('All Fields Hidden With Selected Items', function() {
          beforeEach(function() {
            this.view = new AdvancedSearchView;
            spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesVisible').and.returnValue(false);
            spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesSelected').and.returnValue(true);
            spyOn(MultiselectComponent.prototype, 'isVisible').and.returnValue(false);

            spyOn(this.view.options, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.programmes, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.subprogrammes, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.actions, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);;
            spyOn(this.view.activities, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);;
            spyOn(this.view.activityYears, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.fundingYears, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.countries, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.regions, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
            spyOn(this.view.organisationTypes, 'selectedItems').and.returnValue([{id: 1}, {id: 2}]);
          });

          it('should contain empty options criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              options: []
            }));
          });

          it('should contain empty programmes criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              programmes: []
            }));
          });

          it('should contain empty subprogrammes criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              subprogrammes: []
            }));
          });

          it('should contain empty actions criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              actions: []
            }));
          });

          it('should contain empty activities criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              activities: []
            }));
          });

          it('should contain empty activityYears criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              activityYears: []
            }));
          });

          it('should contain empty fundingYears criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              fundingYears: []
            }));
          });

          it('should contain empty countries criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              countries: []
            }));
          });

          it('should contain empty regions criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              regions: []
            }));
          });

          it('should contain empty organisationTypes criteria', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              organisationTypes: []
            }));
          });

          it('should contain match all countries set to false', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              matchAllCountries: false
            }));
          });
        })
      });

      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isDirty).toEqual(jasmine.any(Function));
        });

        it('should return true if any criteria components has changed', function() {
          var view = new AdvancedSearchView;

          spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesSelected').and.returnValue(true);
          spyOn(view.options, 'isDirty').and.returnValue(false);
          spyOn(view.programmes, 'isDirty').and.returnValue(true);
          spyOn(view.subprogrammes, 'isDirty').and.returnValue(false);
          spyOn(view.actions, 'isDirty').and.returnValue(false);
          spyOn(view.activities, 'isDirty').and.returnValue(false);
          spyOn(view.activityYears, 'isDirty').and.returnValue(false);
          spyOn(view.fundingYears, 'isDirty').and.returnValue(false);
          spyOn(view.countries, 'isDirty').and.returnValue(false);
          spyOn(view.regions, 'isDirty').and.returnValue(false);
          spyOn(view.organisationTypes, 'isDirty').and.returnValue(false);

          expect(view.isDirty()).toBe(true);
        });

        it('should return false if none of criteria components has changed', function() {
          var view = new AdvancedSearchView;

          spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesSelected').and.returnValue(false);
          spyOn(view.options, 'isDirty').and.returnValue(false);
          spyOn(view.programmes, 'isDirty').and.returnValue(false);
          spyOn(view.subprogrammes, 'isDirty').and.returnValue(false);
          spyOn(view.actions, 'isDirty').and.returnValue(false);
          spyOn(view.activities, 'isDirty').and.returnValue(false);
          spyOn(view.activityYears, 'isDirty').and.returnValue(false);
          spyOn(view.fundingYears, 'isDirty').and.returnValue(false);
          spyOn(view.countries, 'isDirty').and.returnValue(false);
          spyOn(view.regions, 'isDirty').and.returnValue(false);
          spyOn(view.organisationTypes, 'isDirty').and.returnValue(false);

          expect(view.isDirty()).toBe(false);
        });
      });

      describe('.isCeProgrammeSelected()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isCeProgrammeSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if CE programme is selected', function() {
          var view = new AdvancedSearchView;
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: constants.ccm.CE
          });

          expect(view.isCeProgrammeSelected()).toBe(true);
        });

        it('should return false if CE programme is NOT selected', function() {
          var view = new AdvancedSearchView;
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: 'OTHER'
          });

          expect(view.isCeProgrammeSelected()).toBe(false);
        });

        it('should return false if more than one selection of programmes is done', function() {
          var view = new AdvancedSearchView;
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);

          expect(view.isCeProgrammeSelected()).toBe(false);
        });
      });

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          spyOn(AdvancedSearchView.prototype, 'initCriteriaVisibility');

          this.view = new AdvancedSearchView;
          this.view.initCriteriaVisibility.calls.reset();

          spyOn(this.view.options, 'update');
          spyOn(this.view.programmes, 'update');
          spyOn(this.view.subprogrammes, 'update');
          spyOn(this.view.actions, 'update');
          spyOn(this.view.activities, 'update');
          spyOn(this.view.activityYears, 'update');
          spyOn(this.view.fundingYears, 'update');
          spyOn(this.view.countries, 'update');
          spyOn(this.view.regions, 'update');
          spyOn(this.view.organisationTypes, 'update');

          this.fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);
          this.view.didClickClearFilters(this.fakeEvent);
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
        });

        it('should init criteria visibility', function() {
          expect(this.view.initCriteriaVisibility).toHaveBeenCalled();
        });

        it('should prevent default action', function() {
          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should clear options component', function() {
          expect(this.view.options.update).toHaveBeenCalledWith(advancedSearchService.allOptions());
        });

        it('should clear programmes component', function() {
          expect(this.view.programmes.update).toHaveBeenCalledWith(advancedSearchService.allProgrammes());
        });

        it('should clear subprogrammes component', function() {
          expect(this.view.subprogrammes.update).toHaveBeenCalledWith([]);
        });

        it('should clear actions component', function() {
          expect(this.view.actions.update).toHaveBeenCalledWith([]);
        });

        it('should clear activities component', function() {
          expect(this.view.activities.update).toHaveBeenCalledWith([]);
        });

        it('should clear activity years component', function() {
          expect(this.view.activityYears.update).toHaveBeenCalledWith(advancedSearchService.allActivityYears());
        });

        it('should clear funding years component', function() {
          expect(this.view.fundingYears.update).toHaveBeenCalledWith(advancedSearchService.allFundingYears());
        });

        it('should clear countries component', function() {
          expect(this.view.countries.update).toHaveBeenCalledWith(advancedSearchService.allCountries());
        });

        it('should clear regions component', function() {
          expect(this.view.regions.update).toHaveBeenCalledWith([]);
        });

        it('should clear organisation types component', function() {
          expect(this.view.organisationTypes.update).toHaveBeenCalledWith(advancedSearchService.allOrganisationTypes());
        });
      });

      describe('.didProgrammeChange()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didProgrammeChange).toEqual(jasmine.any(Function));
        });

        describe('Handling Criteria Visibility', function() {
          beforeEach(function() {
            spyOn(AdvancedSearchView.prototype, 'calculateCriteriaVisibility');

            this.view = new AdvancedSearchView;

            this.view.didProgrammeChange();
          })

          it('should calculate criteria visibility', function() {
            expect(this.view.calculateCriteriaVisibility).toHaveBeenCalled();
          });
        });

        describe('Handling Subprogrammes', function() {
          beforeEach(function() {
            var self = this;
            this.fakeSubprogrammes = [{}, {}];
            this.view = new AdvancedSearchView;

            spyOn(this.view.subprogrammes, 'update');
            spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(true);
            spyOn(this.view.programmes, 'firstSelectedItem').and.returnValue({
              id: 'CE'
            });

            spyOn(advancedSearchService, 'subprogrammesByProgramme').and.callFake(function(programmeCode) {
              if (programmeCode === 'CE') {
                return self.fakeSubprogrammes;
              }
            });

            this.view.didProgrammeChange();
          });

          it('should call advancedSearchService to get subprogrammes according to programme selection', function() {
            expect(advancedSearchService.subprogrammesByProgramme).toHaveBeenCalledWith('CE')
          });

          it('should update subprogrammes dropdown according to programme selection', function() {
            expect(this.view.subprogrammes.update).toHaveBeenCalledWith(this.fakeSubprogrammes);
          });
        });

        describe('Handling Activities', function() {
          beforeEach(function() {
            var self = this;
            this.fakeActivities = [{}, {}];
            this.view = new AdvancedSearchView;

            spyOn(this.view.activities, 'update');
            spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(true);
            spyOn(this.view.programmes, 'firstSelectedItem').and.returnValue({
              id: 'CE'
            });

            spyOn(advancedSearchService, 'activitiesByProgramme').and.callFake(function(programmeCode) {
              if (programmeCode === 'CE') {
                return self.fakeActivities;
              }
            });

            this.view.didProgrammeChange();
          });

          it('should call advancedSearchService to get activities according to programme selection', function() {
            expect(advancedSearchService.activitiesByProgramme).toHaveBeenCalledWith('CE')
          });

          it('should update activities dropdown according to programme selection', function() {
            expect(this.view.activities.update).toHaveBeenCalledWith(this.fakeActivities);
          });
        });
      });

      describe('.didSubprogrammeChange()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didSubprogrammeChange).toEqual(jasmine.any(Function));
        });

        describe('Handling Criteria Visibility', function() {
          beforeEach(function() {
            spyOn(AdvancedSearchView.prototype, 'calculateCriteriaVisibility');

            this.view = new AdvancedSearchView;

            this.view.didSubprogrammeChange();
          })

          it('should calculate criteria visibility', function() {
            expect(this.view.calculateCriteriaVisibility).toHaveBeenCalled();
          });
        });

        describe('Handling Actions', function() {
          beforeEach(function() {
            var self = this;
            this.fakeActions = [{}, {}];
            this.view = new AdvancedSearchView;

            spyOn(this.view.actions, 'update');
            spyOn(this.view.subprogrammes, 'hasOneSelection').and.returnValue(true);
            spyOn(this.view.subprogrammes, 'firstSelectedItem').and.returnValue({
              id: 'MEDIA'
            });

            spyOn(advancedSearchService, 'actionsBySubprogramme').and.callFake(function(subprogrammeCode) {
              if (subprogrammeCode === 'MEDIA') {
                return self.fakeActions;
              }
            });

            this.view.didSubprogrammeChange();
          });

          it('should call advancedSearchService to get actions by subprogramme', function() {
            expect(advancedSearchService.actionsBySubprogramme).toHaveBeenCalledWith('MEDIA');
          });

          it('should update actions dropdown according to subprogramme selection', function() {
            expect(this.view.actions.update).toHaveBeenCalledWith(this.fakeActions);
          });
        });
      });

      describe('.didCountryChange()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didCountryChange).toEqual(jasmine.any(Function));
        });

        describe('Handling Criteria Visibility', function() {
          beforeEach(function() {
            spyOn(AdvancedSearchView.prototype, 'calculateCriteriaVisibility');

            this.view = new AdvancedSearchView;

            this.view.didCountryChange();
          })

          it('should calculate criteria visibility', function() {
            expect(this.view.calculateCriteriaVisibility).toHaveBeenCalled();
          });
        });

        describe('Handling Regions', function() {
          beforeEach(function() {
            var self = this;
            this.fakeRegions = [{}, {}];
            this.view = new AdvancedSearchView;

            spyOn(this.view.regions, 'update');
            spyOn(this.view.countries, 'hasOneSelection').and.returnValue(true);
            spyOn(this.view.countries, 'firstSelectedItem').and.returnValue({
              id: 'PL'
            });

            spyOn(advancedSearchService, 'regionsByCountry').and.callFake(function(countryCode) {
              if (countryCode === 'PL') {
                return self.fakeRegions;
              }
            });

            this.view.didCountryChange();
          });

          it('should call advancedSearchService to get regions according to country selection', function() {
            expect(advancedSearchService.regionsByCountry).toHaveBeenCalledWith('PL')
          });

          it('should update regions dropdown according to country selection', function() {
            expect(this.view.regions.update).toHaveBeenCalledWith(this.fakeRegions);
          });
        });
      });

      describe('.calculateCriteriaVisibility()', function() {
        beforeEach(function() {
          spyOn(AdvancedSearchView.prototype, 'shouldDisplaySubprogrammes').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'shouldDisplayActions').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'shouldDisplayActivities').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'shouldDisplayFundingYears').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'shouldDisplayRegions').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'shouldDisplayMatchAllCountries').and.returnValue(true);

          this.view = new AdvancedSearchView;
          spyOn(this.view.subprogrammes, 'toggle');
          spyOn(this.view.actions, 'toggle');
          spyOn(this.view.activities, 'toggle');
          spyOn(this.view.fundingYears, 'toggle');
          spyOn(this.view.regions, 'toggle');
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesVisibility');

          this.view.calculateCriteriaVisibility();
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.calculateCriteriaVisibility).toEqual(jasmine.any(Function));
        });

        it('should toggle subprogrammes', function() {
          expect(this.view.subprogrammes.toggle).toHaveBeenCalledWith(true);
        });

        it('should toggle actions', function() {
          expect(this.view.actions.toggle).toHaveBeenCalledWith(true);
        });

        it('should toggle activities', function() {
          expect(this.view.activities.toggle).toHaveBeenCalledWith(true);
        });

        it('should toggle funding years', function() {
          expect(this.view.fundingYears.toggle).toHaveBeenCalledWith(true);
        });

        it('should toggle regions', function() {
          expect(this.view.regions.toggle).toHaveBeenCalledWith(true);
        });

        it('should toggle actions', function() {
          expect(this.view.toggleMatchAllCountriesVisibility).toHaveBeenCalledWith(true);
        });
      });

      describe('.shouldDisplaySubprogrammes()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplaySubprogrammes).toEqual(jasmine.any(Function));
        });

        it('should return true if programme has one selection', function() {
          spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(true);

          expect(this.view.shouldDisplaySubprogrammes()).toBe(true);
        });

        it('should return false if programme has not one selection', function() {
          spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(false);

          expect(this.view.shouldDisplaySubprogrammes()).toBe(false);
        });
      });

      describe('.shouldDisplayActions()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplayActions).toEqual(jasmine.any(Function));
        });

        it('should return true if subprogramme has one selection and CE programme is selected', function() {
          spyOn(this.view.subprogrammes, 'hasOneSelection').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(true);

          expect(this.view.shouldDisplayActions()).toBe(true);
        });

        it('should return false if subprogramme has not one selection and CE programme is selected', function() {
          spyOn(this.view.subprogrammes, 'hasOneSelection').and.returnValue(false);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(true);

          expect(this.view.shouldDisplayActions()).toBe(false);
        });

        it('should return false if subprogramme has one selection and CE programme is not selected', function() {
          spyOn(this.view.subprogrammes, 'hasOneSelection').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(false);

          expect(this.view.shouldDisplayActions()).toBe(false);
        });
      });

      describe('.shouldDisplayActivities()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplayActivities).toEqual(jasmine.any(Function));
        });

        it('should return true if programme has one selection', function() {
          spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(true);

          expect(this.view.shouldDisplayActivities()).toBe(true);
        });

        it('should return false if programme has not one selection', function() {
          spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(false);

          expect(this.view.shouldDisplayActivities()).toBe(false);
        });
      });

      describe('.shouldDisplayFundingYears()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplayFundingYears).toEqual(jasmine.any(Function));
        });

        it('should return true if CE programme is selected', function() {
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(true);

          expect(this.view.shouldDisplayFundingYears()).toBe(true);
        });

        it('should return false if CE programme is not selected', function() {
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(false);

          expect(this.view.shouldDisplayFundingYears()).toBe(false);
        });
      });

      describe('.shouldDisplayRegions()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplayRegions).toEqual(jasmine.any(Function));
        });

        it('should return true if countries has one selection and CE programme is selected', function() {
          spyOn(this.view.countries, 'hasOneSelection').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(true);

          expect(this.view.shouldDisplayRegions()).toBe(true);
        });

        it('should return false if countries has not one selection and CE programme is selected', function() {
          spyOn(this.view.countries, 'hasOneSelection').and.returnValue(false);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(true);

          expect(this.view.shouldDisplayRegions()).toBe(false);
        });

        it('should return false if countries has one selection and CE programme is not selected', function() {
          spyOn(this.view.countries, 'hasOneSelection').and.returnValue(true);
          spyOn(AdvancedSearchView.prototype, 'isCeProgrammeSelected').and.returnValue(false);

          expect(this.view.shouldDisplayRegions()).toBe(false);
        });
      });

      describe('.shouldDisplayMatchAllCountries()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.shouldDisplayMatchAllCountries).toEqual(jasmine.any(Function));
        });

        it('should return true if selected countries number is bigger than one', function() {
          spyOn(this.view.countries, 'selectedItems').and.returnValue([{
            id: '1'
          }, {
            id: '2'
          }]);

          expect(this.view.shouldDisplayMatchAllCountries()).toBe(true);
        });

        it('should return false if selected countries number is less than two', function() {
          spyOn(this.view.countries, 'selectedItems').and.returnValue([{
            id: '1'
          }]);

          expect(this.view.shouldDisplayMatchAllCountries()).toBe(false);
        });
      });

      describe('.update()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;

          spyOn(this.view.options, 'selectItems');
          spyOn(this.view.programmes, 'selectItems');
          spyOn(this.view.subprogrammes, 'selectItems');
          spyOn(this.view.actions, 'selectItems');
          spyOn(this.view.activities, 'selectItems');
          spyOn(this.view.activityYears, 'selectItems');
          spyOn(this.view.fundingYears, 'selectItems');
          spyOn(this.view.countries, 'selectItems');
          spyOn(this.view.regions, 'selectItems');
          spyOn(this.view.organisationTypes, 'selectItems');
          spyOn(this.view, 'toggleMatchAllCountriesSelection');
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should update options', function() {
          this.view.update({
            options: ['a', 'b']
          });

          expect(this.view.options.selectItems).toHaveBeenCalledWith(['a', 'b']);
        });

        it('should update programmes', function() {
          this.view.update({
            programmes: ['CE']
          });

          expect(this.view.programmes.selectItems).toHaveBeenCalledWith(['CE']);
        });

        it('should update subprogrammes', function() {
          this.view.update({
            subprogrammes: ['CULTURE']
          });

          expect(this.view.subprogrammes.selectItems).toHaveBeenCalledWith(['CULTURE']);
        });

        it('should update actions', function() {
          this.view.update({
            actions: ['Market Access Support']
          });

          expect(this.view.actions.selectItems).toHaveBeenCalledWith(['Market Access Support']);
        });

        it('should update activities', function() {
          this.view.update({
            activities: ['act1', 'act2']
          });

          expect(this.view.activities.selectItems).toHaveBeenCalledWith(['act1', 'act2']);
        });

        it('should update activity years', function() {
          this.view.update({
            activityYears: ['2012', '2022']
          });

          expect(this.view.activityYears.selectItems).toHaveBeenCalledWith(['2012', '2022']);
        });

        it('should update funding years', function() {
          this.view.update({
            fundingYears: ['2014', '2024']
          });

          expect(this.view.fundingYears.selectItems).toHaveBeenCalledWith(['2014', '2024']);
        });

        it('should update match all countries', function() {
          this.view.update({
            matchAllCountries: true
          });

          expect(this.view.toggleMatchAllCountriesSelection).toHaveBeenCalledWith(true);
        });

        it('should update countries', function() {
          this.view.update({
            countries: ['PL', 'BE']
          });

          expect(this.view.countries.selectItems).toHaveBeenCalledWith(['PL', 'BE']);
        });

        it('should update regions', function() {
          this.view.update({
            regions: ['reg1', 'reg2']
          });

          expect(this.view.regions.selectItems).toHaveBeenCalledWith(['reg1', 'reg2']);
        });

        it('should update organisation types', function() {
          this.view.update({
            organisationTypes: ['org1', 'org2']
          });

          expect(this.view.organisationTypes.selectItems).toHaveBeenCalledWith(['org1', 'org2']);
        });
      });

      describe('.isMatchAllCountriesVisible()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isMatchAllCountriesVisible).toEqual(jasmine.any(Function));
        });

        it('should return false if is hidden', function() {
          this.view.render();
          this.view.getMatchAllCountriesContainerElement().hide();

          expect(this.view.isMatchAllCountriesVisible()).toBe(false);
        });

        it('should return true if is visible', function() {
          this.view.render();
          this.view.getMatchAllCountriesContainerElement().show();

          expect(this.view.isMatchAllCountriesVisible()).toBe(true);
        });
      });

      describe('.isMatchAllCountriesSelected()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isMatchAllCountriesSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if match all countries checkbox is checked', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue({
            is: jasmine.createSpy('is').and.callFake(function(selector) {
              if (selector === ':checked') {
                return true
              }
            })
          });

          expect(this.view.isMatchAllCountriesSelected()).toBe(true);
        });

        it('should return false if match all countries checkbox is not checked', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue({
            is: jasmine.createSpy('is').and.callFake(function(selector) {
              if (selector === ':checked') {
                return false
              }
            })
          });

          expect(this.view.isMatchAllCountriesSelected()).toBe(false);
        });
      });

      describe('.getMatchAllCountriesContainerElement()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getMatchAllCountriesContainerElement).toEqual(jasmine.any(Function));
        });

        it('should return match all countries element', function() {
          var view = new AdvancedSearchView,
            fakeElement = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-advanced-search__match-all-countries-container') {
              return fakeElement;
            }
          });

          expect(view.getMatchAllCountriesContainerElement()).toBe(fakeElement);
        });
      });

      describe('.getMatchAllCountriesElement()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getMatchAllCountriesElement).toEqual(jasmine.any(Function));
        });

        it('should return match all countries element', function() {
          var view = new AdvancedSearchView,
            fakeElement = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-advanced-search__match-all-countries-input') {
              return fakeElement;
            }
          });

          expect(view.getMatchAllCountriesElement()).toBe(fakeElement);
        });
      });

      describe('.toggleMatchAllCountriesSelection()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.toggleMatchAllCountriesSelection).toEqual(jasmine.any(Function));
        });

        it('should toggle selection of checkbox', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue(jasmine.createSpyObj('chk', ['prop']));
          var view = new AdvancedSearchView;

          view.toggleMatchAllCountriesSelection(true);
          expect(view.getMatchAllCountriesElement().prop).toHaveBeenCalledWith('checked', true);

          view.toggleMatchAllCountriesSelection(false);
          expect(view.getMatchAllCountriesElement().prop).toHaveBeenCalledWith('checked', false);
        });
      });

      describe('.toggleMatchAllCountriesVisibility()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.toggleMatchAllCountriesVisibility).toEqual(jasmine.any(Function));
        });

        it('should toggle selection of checkbox', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesContainerElement').and.returnValue(jasmine.createSpyObj('chk', ['toggle']));
          var view = new AdvancedSearchView;

          view.toggleMatchAllCountriesVisibility(true);
          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(true);

          view.toggleMatchAllCountriesVisibility(false);
          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(false);
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should have be properly defined', function() {
          expect(AdvancedSearchView.prototype.events).toEqual({
            'click a.vlr-advanced-search__clear': 'didClickClearFilters'
          });
        });
      });

      describe('custom', function() {
        beforeEach(function() {
          spyOn(AdvancedSearchView.prototype, 'didProgrammeChange');
          spyOn(AdvancedSearchView.prototype, 'didSubprogrammeChange');
          spyOn(AdvancedSearchView.prototype, 'didCountryChange');

          this.view = new AdvancedSearchView;

        });

        it('should listen to programmes multiselect change event', function() {
          this.view.programmes.trigger('multiselect:change');
          expect(this.view.didProgrammeChange).toHaveBeenCalled();
        });

        it('should listen to subprogrammes multiselect change event', function() {
          this.view.subprogrammes.trigger('multiselect:change');
          expect(this.view.didSubprogrammeChange).toHaveBeenCalled();
        });

        it('should listen to countries multiselect change event', function() {
          this.view.countries.trigger('multiselect:change');
          expect(this.view.didCountryChange).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      beforeEach(function() {
        spyOn(AdvancedSearchView.prototype, 'initCriteriaVisibility');

        this.view = new AdvancedSearchView;
        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should init criteria visibility', function() {
          expect(this.view.initCriteriaVisibility).toHaveBeenCalled();
        });

        describe('Project Criterias Section', function() {
          it('should render header text', function() {
            expect(this.$el.find('.vlr-advanced-search__header-title')).toContainText('Project Criteria');
          });

          it('should render clear filters link', function() {
            expect(this.$el.find('.vlr-advanced-search__header-toolbar')).toContainElement('a[href="#"].vlr-advanced-search__clear');
            expect(this.$el.find('.vlr-advanced-search__header-toolbar > a.vlr-advanced-search__clear')).toContainText('Clear filters');
          });

          it('should render options section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-options.vlr-advanced-search__section');
          });

          it('should render options', function() {
            var $subview = this.view.options.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-options')).toContainHtml($subview);
          });

          it('should render programmes section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-programmes.vlr-advanced-search__section');
          });

          it('should render programmes', function() {
            var $subview = this.view.programmes.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-programmes')).toContainHtml($subview);
          });

          it('should render subprogrammes section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-subprogrammes.vlr-advanced-search__section');
          });

          it('should render subprogrammes', function() {
            var $subview = this.view.subprogrammes.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-subprogrammes')).toContainHtml($subview);
          });

          it('should render actions section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-actions.vlr-advanced-search__section');
          });

          it('should render actions', function() {
            var $subview = this.view.actions.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-actions')).toContainHtml($subview);
          });

          it('should render activities section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-activities.vlr-advanced-search__section');
          });

          it('should render activities', function() {
            var $subview = this.view.activities.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-activities')).toContainHtml($subview);
          });

          it('should render activity years section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-activity-years.vlr-advanced-search__section');
          });

          it('should render activity years', function() {
            var $subview = this.view.activityYears.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-activity-years')).toContainHtml($subview);
          });

          it('should render funding years section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-funding-years.vlr-advanced-search__section');
          });

          it('should render funding years', function() {
            var $subview = this.view.fundingYears.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-funding-years')).toContainHtml($subview);
          });
        });

        describe('Organisation Criterias Section', function() {
          it('should render header text', function() {
            expect(this.$el.find('.vlr-advanced-search__header-title')).toContainText('Organisation Criteria');
          });

          it('should render match all countries checkbox', function() {
            expect(this.$el.find('.vlr-advanced-search__header-toolbar')).toContainElement('input[type="checkbox"].vlr-advanced-search__match-all-countries-input');
            expect(this.$el.find('.vlr-advanced-search__header-toolbar .vlr-advanced-search__match-all-countries-label')).toContainText('Match All Selected Countries');
          });

          it('should render countries section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-countries.vlr-advanced-search__section');
          });

          it('should render countries', function() {
            var $subview = this.view.countries.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-countries')).toContainHtml($subview);
          });

          it('should render regions section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-regions.vlr-advanced-search__section');
          });

          it('should render regions', function() {
            var $subview = this.view.regions.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-regions')).toContainHtml($subview);
          });

          it('should render organisation types section', function() {
            expect(this.$el).toContainElement('.vlr-advanced-search__section-organisation-types.vlr-advanced-search__section');
          });

          it('should render organisation types', function() {
            var $subview = this.view.organisationTypes.render().view.$el;
            expect(this.$el.find('.vlr-advanced-search__section-organisation-types')).toContainHtml($subview);
          });
        });
      });
    });
  });
});