define(function (require) {
  var $ = require('jquery'),
    AdvancedSearchView = require('./advancedSearch.view'),
    MultiselectComponent = require('app/shared/components/other/multiselect/main.component'),
    advancedSearchService = require('../services/advancedSearch.service'),
    constants = require('app/eplus/util/constants'),
    Backbone = require('backbone');

  describe('EPLUS Advanced Search View', function () {
    describe('type', function () {
      it('Should be a view', function () {
        expect(AdvancedSearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('Events', function () {

      describe('dom', function () {
        it('should have be properly defined', function () {
          expect(AdvancedSearchView.prototype.events).toEqual({
            'click a.vlr-advanced-search__clear': 'didClickClearFilters'
          });
        });
      });

      describe('custom', function () {
        beforeEach(function () {
          spyOn(AdvancedSearchView.prototype, 'didCountriesChange');
          spyOn(AdvancedSearchView.prototype, 'didProgrammesChange');
          spyOn(AdvancedSearchView.prototype, 'didActionsChange');

          this.view = new AdvancedSearchView();
        });

        it('should listen to country multiselect change event', function () {
          this.view.countries.trigger('multiselect:change');
          expect(this.view.didCountriesChange).toHaveBeenCalled();
        });

        it('should listen to programmes multiselect change event', function () {
          this.view.programmes.trigger('multiselect:change');
          expect(this.view.didProgrammesChange).toHaveBeenCalled();
        });

        it('should listen to actions multiselect change event', function () {
          this.view.actions.trigger('multiselect:change');
          expect(this.view.didActionsChange).toHaveBeenCalled();
        });
      });
    });

    describe('.render()', function () {
      beforeEach(function () {

        spyOn(AdvancedSearchView.prototype, 'initCriteriaVisibility');

        this.view = new AdvancedSearchView();
        this.$el = this.view.render().$el;
      });

      it('should return view', function () {
        var view = new AdvancedSearchView();
        expect(view.render()).toBe(view);
      });

      it('should init criteria visibility', function () {
        expect(this.view.initCriteriaVisibility).toHaveBeenCalled();
      });

      describe('Project Criterias Section', function () {
        it('should render Options section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-options');
        });

        it('should render Programmes section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-programmes');
        });

        it('should render Actions section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-actions');
        });

        it('should render ActionsTypes section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-actions-types');
        });

        it('should render Topics section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-topics');
        });

        it('should render ActivityYears section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-activity-years');
        });

        it('should render FundingYears section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-funding-years');
        });
      });

      describe('Prganisation Criterias Section', function () {
        it('should render Countries section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-countries');
        });

        it('should render Regions section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-regions');
        });

        it('should render OrganisationTypes section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-organisation-types');
        });

        it('should render OrganisationRoles section', function () {
          expect(this.$el).toContainElement('.vlr-advanced-search__section.vlr-advanced-search__section-organisation-roles');
        });
      });
    });

    describe('API', function () {
      describe('.initialize()', function () {
        it('should been defined', function () {
          var view = new AdvancedSearchView();
          expect(view.initialize).toEqual(jasmine.any(Function));
        });

        it('should create options', function () {
          var fakeOptions = {};
          spyOn(AdvancedSearchView.prototype, 'createOptionMultiselect').and.returnValue(fakeOptions);

          var view = new AdvancedSearchView();

          expect(view.options).toBe(fakeOptions);
        });

        it('should create programmes', function () {
          var fakeProgrammes = {};
          spyOn(AdvancedSearchView.prototype, 'createProgrammesMultiselect').and.returnValue(fakeProgrammes);

          var view = new AdvancedSearchView();
          expect(view.programmes).toBe(fakeProgrammes);
        });

        it('should create actions', function () {
          var fakeActions = {};
          spyOn(AdvancedSearchView.prototype, 'createActionsMultiselect').and.returnValue(fakeActions);

          var view = new AdvancedSearchView();
          expect(view.actions).toBe(fakeActions);
        });

        it('should create actionsTypes', function () {
          var fakeActionsTypes = {};
          spyOn(AdvancedSearchView.prototype, 'createActionsTypesMultiselect').and.returnValue(fakeActionsTypes);

          var view = new AdvancedSearchView();
          expect(view.actionsTypes).toBe(fakeActionsTypes);
        });

        it('should create topics', function () {
          var fakeTopics = {};
          spyOn(AdvancedSearchView.prototype, 'createTopicsMultiselect').and.returnValue(fakeTopics);

          var view = new AdvancedSearchView();
          expect(view.topics).toBe(fakeTopics);
        });

        it('should create activityYears', function () {
          var fakeActivityYears = {};
          spyOn(AdvancedSearchView.prototype, 'createActivityYearsMultiselect').and.returnValue(fakeActivityYears);

          var view = new AdvancedSearchView();
          expect(view.activityYears).toBe(fakeActivityYears);
        });

        it('should create fundingYears', function () {
          var fakeFundingYears = {};
          spyOn(AdvancedSearchView.prototype, 'createFundingYearsMultiselect').and.returnValue(fakeFundingYears);

          var view = new AdvancedSearchView();
          expect(view.fundingYears).toBe(fakeFundingYears);
        });

        it('should create country', function () {
          var fakeCountry = {};
          spyOn(AdvancedSearchView.prototype, 'createCountryMultiselect').and.returnValue(fakeCountry);

          var view = new AdvancedSearchView();
          expect(view.countries).toBe(fakeCountry);
        });

        it('should clear match all countries checkbox', function() {
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesSelection');
          var view = new AdvancedSearchView();
          expect(view.toggleMatchAllCountriesSelection).toHaveBeenCalledWith(false);
        });

        it('should hide match all countries section', function() {
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesVisibility');
          var view = new AdvancedSearchView();
          expect(view.toggleMatchAllCountriesVisibility).toHaveBeenCalledWith(false);
        });

        it('should create regions', function () {
          var fakeRegions = {};
          spyOn(AdvancedSearchView.prototype, 'createRegionsMultiselect').and.returnValue(fakeRegions);

          var view = new AdvancedSearchView();
          expect(view.regions).toBe(fakeRegions);
        });

        it('should create organisationsTypes', function () {
          var fakeOrganisationsTypes = {};
          spyOn(AdvancedSearchView.prototype, 'createOrganisationTypesMultiselect').and.returnValue(fakeOrganisationsTypes);

          var view = new AdvancedSearchView();
          expect(view.organisationTypes).toBe(fakeOrganisationsTypes);
        });

        it('should create organisationsRoles', function () {
          var fakeOrganisationsRoles = {};
          spyOn(AdvancedSearchView.prototype, 'createOrganisationRolesMultiselect').and.returnValue(fakeOrganisationsRoles);

          var view = new AdvancedSearchView();
          expect(view.organisationRoles).toBe(fakeOrganisationsRoles);
        });
      });

      describe('.getCriteria()', function () {
        it('should been defined', function () {
          var view = new AdvancedSearchView();
          expect(view.getCriteria).toEqual(jasmine.any(Function));
        });

        describe('should return values if the multiselect is visible and values are set', function () {
          beforeEach(function () {
            spyOn(MultiselectComponent.prototype, 'isVisible').and.returnValue(true);
            spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesVisible').and.returnValue(true);

            this.view = new AdvancedSearchView();

            spyOn(this.view.options, 'selectedItems').and.returnValue([{
              id: 'opt1'
            }, {
              id: 'opt2'
            }]);

            spyOn(this.view.programmes, 'selectedItems').and.returnValue([{
              id: 'prog1'
            }, {
              id: 'prog2'
            }]);

            spyOn(this.view.actions, 'selectedItems').and.returnValue([{
              id: 'act1'
            }, {
              id: 'act2'
            }]);

            spyOn(this.view.actionsTypes, 'selectedItems').and.returnValue([{
              id: 'actType1'
            }, {
              id: 'actType2'
            }]);

            spyOn(this.view.topics, 'selectedItems').and.returnValue([{
              id: 'topic1'
            }, {
              id: 'topic2'
            }]);

            spyOn(this.view.activityYears, 'selectedItems').and.returnValue([{
              id: 'actYear1'
            }, {
              id: 'actYear2'
            }]);

            spyOn(this.view.fundingYears, 'selectedItems').and.returnValue([{
              id: 'funYear1'
            }, {
              id: 'funYear2'
            }]);

            spyOn(this.view.countries, 'selectedItems').and.returnValue([{
              id: 'country1'
            }, {
              id: 'country2'
            }]);

            spyOn(this.view, 'isMatchAllCountriesSelected').and.returnValue(true);

            spyOn(this.view.regions, 'selectedItems').and.returnValue([{
              id: 'region1'
            }, {
              id: 'region2'
            }]);

            spyOn(this.view.organisationTypes, 'selectedItems').and.returnValue([{
              id: 'ot1'
            }, {
              id: 'ot2'
            }]);

            spyOn(this.view.organisationRoles, 'selectedItems').and.returnValue([{
              id: 'or1'
            }, {
              id: 'or2'
            }]);
          });

          it('should return options', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              options: ['opt1', 'opt2']
            }));
          });

          it('should return programmes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              programmes: ['prog1', 'prog2']
            }));
          });

          it('should return actions', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              actions: ['act1', 'act2']
            }));
          });

          it('should return actionsTypes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              actionsTypes: ['actType1', 'actType2']
            }));
          });

          it('should return topics', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              topics: ['topic1', 'topic2']
            }));
          });

          it('should return activityYears', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              activityYears: ['actYear1', 'actYear2']
            }));
          });

          it('should return fundingYears', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              fundingYears: ['funYear1', 'funYear2']
            }));
          });

          it('should return countries', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              countries: ['country1', 'country2']
            }));
          });

          it('should contain match all countries set to true', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              matchAllCountries: true
            }));
          });

          it('should return regions', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              regions: ['region1', 'region2']
            }));
          });

          it('should return organisationTypes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              organisationTypes: ['ot1', 'ot2']
            }));
          });

          it('should return organisationRoles', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              organisationRoles: ['or1', 'or2']
            }));
          });
        });

        describe('should return empty values if the multiselect is not visible', function () {
          beforeEach(function () {
            spyOn(MultiselectComponent.prototype, 'isVisible').and.returnValue(false);
            spyOn(AdvancedSearchView.prototype, 'isMatchAllCountriesVisible').and.returnValue(false);
            this.view = new AdvancedSearchView();

            spyOn(this.view, 'isMatchAllCountriesSelected').and.returnValue(true);
          });

          it('should return empty options', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              options: []
            }));
          });

          it('should return empty programmes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              programmes: []
            }));
          });

          it('should return empty actions', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              actions: []
            }));
          });

          it('should return empty actionsTypes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              actionsTypes: []
            }));
          });

          it('should return empty topics', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              topics: []
            }));
          });

          it('should return empty activityYears', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              activityYears: []
            }));
          });

          it('should return empty fundingYears', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              fundingYears: []
            }));
          });

          it('should return empty countries', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              countries: []
            }));
          });

          it('should contain match all countries set to false', function() {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              matchAllCountries: false
            }));
          });

          it('should return empty regions', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              regions: []
            }));
          });

          it('should return empty organisationTypes', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              organisationTypes: []
            }));
          });

          it('should return empty organisationRoles', function () {
            expect(this.view.getCriteria()).toEqual(jasmine.objectContaining({
              organisationRoles: []
            }));
          });
        });

      });

      describe('.createOptionMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.options = this.view.createOptionMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createOptionMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createOptionMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all options', function () {
          expect(this.options.initialize).toHaveBeenCalledWith(advancedSearchService.allOptions(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.options.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Options'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.options.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createProgrammesMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.programmes = this.view.createProgrammesMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createProgrammesMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createProgrammesMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all programmes', function () {
          expect(this.programmes.initialize).toHaveBeenCalledWith(advancedSearchService.allProgrammes(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.programmes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Programmes'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.programmes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createActionsMultiselect()', function () {
        beforeEach(function () {

          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.actions = this.view.createActionsMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createActionsMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createActionsMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with empty array', function () {
          expect(this.actions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.actions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Actions'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.actions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });

        it('should initialize multiple select with correct maximumSelectionLength property', function () {
          expect(this.actions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            maximumSelectionLength: 1
          }));
        });
      });

      describe('.createActionsTypesMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.actionsTypes = this.view.createActionsTypesMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createActionsTypesMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createActionsTypesMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with empty array', function () {
          expect(this.actionsTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.actionsTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Actions Types'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.actionsTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });

        it('should initialize multiple select with correct maximumSelectionLength property', function () {
          expect(this.actionsTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            maximumSelectionLength: 1
          }));
        });
      });

      describe('.createTopicsMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.topics = this.view.createTopicsMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createTopicsMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createTopicsMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with empty array', function () {
          expect(this.topics.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.topics.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Topics'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.topics.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createActivityYearsMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.activityYears = this.view.createActivityYearsMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createActivityYearsMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createActivityYearsMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all activityYears', function () {
          expect(this.activityYears.initialize).toHaveBeenCalledWith(advancedSearchService.allActivityYears(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.activityYears.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Activity Years'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.activityYears.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createFundingYearsMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.fundingYears = this.view.createFundingYearsMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createFundingYearsMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createFundingYearsMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all fundingYears', function () {
          expect(this.fundingYears.initialize).toHaveBeenCalledWith(advancedSearchService.allFundingYears(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.fundingYears.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Funding Years'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.fundingYears.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createCountryMultiselect()', function () {
        beforeEach(function () {

          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.country = this.view.createCountryMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createCountryMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createCountryMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all country', function () {
          expect(this.country.initialize).toHaveBeenCalledWith(advancedSearchService.allCountries(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.country.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Countries'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.country.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createRegionsMultiselect()', function () {
        beforeEach(function () {

          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.regions = this.view.createRegionsMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createRegionsMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createRegionsMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with empty array', function () {
          expect(this.regions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.regions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Regions'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.regions.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createOrganisationTypesMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.organisationTypes = this.view.createOrganisationTypesMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createOrganisationTypesMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createOrganisationTypesMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all organisationTypes', function () {
          expect(this.organisationTypes.initialize).toHaveBeenCalledWith(advancedSearchService.allOrganisationTypes(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.organisationTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Organisation Types'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.organisationTypes.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.createOrganisationRolesMultiselect()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(MultiselectComponent.prototype, 'initialize');

          this.organisationRoles = this.view.createOrganisationRolesMultiselect();
        });

        it('should been defined', function () {
          expect(this.view.createOrganisationRolesMultiselect).toEqual(jasmine.any(Function));
        });

        it('should return a MultiselectComponent', function () {
          expect(this.view.createOrganisationRolesMultiselect()).toEqual(jasmine.any(MultiselectComponent));
        });

        it('should initialize multiple select with all organisationRoles', function () {
          expect(this.organisationRoles.initialize).toHaveBeenCalledWith(advancedSearchService.allOrganisationRoles(), jasmine.any(Object));
        });

        it('should initialize multiple select with correct placeholder', function () {
          expect(this.organisationRoles.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            placeholder: 'All Organisation Roles'
          }));
        });

        it('should initialize multiple select with correct multiple property', function () {
          expect(this.organisationRoles.initialize).toHaveBeenCalledWith(jasmine.any(Array), jasmine.objectContaining({
            multiple: true
          }));
        });
      });

      describe('.calculateCriteriaVisibility()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.calculateCriteriaVisibility).toEqual(jasmine.any(Function));
        });

        it('should show actions when only programme ERASMUS_PLUS is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'isOnlyErasmusPlusProgrammeSelected').and.returnValue(true);
          spyOn(view.actions, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.actions.toggle).toHaveBeenCalledWith(true);
        });

        it('should hide actions when programme ERASMUS_PLUS is not selected, or is selected together with other programmes', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'isOnlyErasmusPlusProgrammeSelected').and.returnValue(false);
          spyOn(view.actions, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.actions.toggle).toHaveBeenCalledWith(false);
        });

        it('should show actions types if actions has one selection', function () {
          var view = new AdvancedSearchView();
          spyOn(view.actions, 'hasOneSelection').and.returnValue(true);
          spyOn(view.actionsTypes, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.actionsTypes.toggle).toHaveBeenCalledWith(true);
        });

        it('should hide actions types if actions has one selection', function () {
          var view = new AdvancedSearchView();
          spyOn(view.actions, 'hasOneSelection').and.returnValue(false);
          spyOn(view.actionsTypes, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.actionsTypes.toggle).toHaveBeenCalledWith(false);
        });

        it('should show topics when at least one programme is selected but it is not ERASMUS_PLUS', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasSelection').and.returnValue(true);
          spyOn(view, 'isErasmusPlusProgrammeSelected').and.returnValue(false);
          spyOn(view.topics, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.topics.toggle).toHaveBeenCalledWith(true);
        });

        it('should hide topics when no programme is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasSelection').and.returnValue(false);
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);
          spyOn(view.programmes, 'selectedItems').and.returnValue([]);
          spyOn(view.topics, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.topics.toggle).toHaveBeenCalledWith(false);
        });

        it('should hide topics when programme ERASMUS_PLUS is selected (either alone, or together with other programmes)', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'isErasmusPlusProgrammeSelected').and.returnValue(true);
          spyOn(view.topics, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.topics.toggle).toHaveBeenCalledWith(false);
        });

        it('should show organisationTypes when only programme ERASMUS_PLUS is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'isOnlyErasmusPlusProgrammeSelected').and.returnValue(true);
          spyOn(view.organisationTypes, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.organisationTypes.toggle).toHaveBeenCalledWith(true);
        });

        it('should hide organisationTypes when programme ERASMUS_PLUS is not selected, or is selected together with other programmes', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'isOnlyErasmusPlusProgrammeSelected').and.returnValue(false);
          spyOn(view.organisationTypes, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.organisationTypes.toggle).toHaveBeenCalledWith(false);

        });

        it('should show regions if countries has one selection', function () {
          var view = new AdvancedSearchView();
          spyOn(view.countries, 'hasOneSelection').and.returnValue(true);
          spyOn(view.regions, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.regions.toggle).toHaveBeenCalledWith(true);
        });

        it('should hide regions if no countries has been selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.countries, 'hasSelection').and.returnValue(false);
          spyOn(view.regions, 'toggle');
          view.calculateCriteriaVisibility();

          expect(view.regions.toggle).toHaveBeenCalledWith(false);
        });

        it('should show match all countries if more than one country is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.countries, 'hasMultipleSelections').and.returnValue(true);

          spyOn(view, 'getMatchAllCountriesContainerElement').and.returnValue({
            toggle: jasmine.createSpy('toggle')
          });
          view.calculateCriteriaVisibility();

          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(true);
        });

        it('should hide match all countries if one country is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.countries, 'hasMultipleSelections').and.returnValue(false);

          spyOn(view, 'getMatchAllCountriesContainerElement').and.returnValue({
            toggle: jasmine.createSpy('toggle')
          });
          view.calculateCriteriaVisibility();

          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(false);
        });

        it('should hide match all countries if no country is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.countries, 'hasMultipleSelections').and.returnValue(false);

          spyOn(view, 'getMatchAllCountriesContainerElement').and.returnValue({
            toggle: jasmine.createSpy('toggle')
          });
          view.calculateCriteriaVisibility();

          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(false);
        });
      });

      describe('.isOnlyErasmusPlusProgrammeSelected()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.isOnlyErasmusPlusProgrammeSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if ERASMUS_PLUS programme is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: constants.ccm.ERASMUS_PLUS
          });

          expect(view.isOnlyErasmusPlusProgrammeSelected()).toBe(true);
        });

        it('should return false if ERASMUS_PLUS programme is NOT selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: 'OTHER'
          });

          expect(view.isOnlyErasmusPlusProgrammeSelected()).toBe(false);
        });

        it('should return false if more than one selection of programmes is done', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);

          expect(view.isOnlyErasmusPlusProgrammeSelected()).toBe(false);
        });
      });

      describe('.isErasmusPlusProgrammeSelected()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.isErasmusPlusProgrammeSelected).toEqual(jasmine.any(Function));
        });

        it('should return false if no programme is selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasSelection').and.returnValue(false);
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);
          spyOn(view.programmes, 'selectedItems').and.returnValue([]);

          expect(view.isErasmusPlusProgrammeSelected()).toBe(false);
        });

        it('should return true if only one programme is selected, and that is ERASMUS_PLUS', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: constants.ccm.ERASMUS_PLUS
          });
          spyOn(view.programmes, 'selectedItems').and.returnValue([{
            id: constants.ccm.ERASMUS_PLUS
          }]);

          expect(view.isErasmusPlusProgrammeSelected()).toBe(true);
        });

        it('should return false if ERASMUS_PLUS programme is NOT selected', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(true);
          spyOn(view.programmes, 'firstSelectedItem').and.returnValue({
            id: 'OTHER'
          });
          spyOn(view.programmes, 'selectedItems').and.returnValue([{
            id: 'OTHER'
          }]);

          expect(view.isErasmusPlusProgrammeSelected()).toBe(false);
        });

        it('should return false if more than one selection of programmes is done and none of them is ERASMUS_PLUS', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);
          spyOn(view.programmes, 'selectedItems').and.returnValue([{
            id: 'OTHER1'
          }, {
            id: 'OTHER2'
          }]);

          expect(view.isErasmusPlusProgrammeSelected()).toBe(false);
        });

        it('should return true if more than one selection of programmes is done and one of them is ERASMUS_PLUS', function () {
          var view = new AdvancedSearchView();
          spyOn(view.programmes, 'hasOneSelection').and.returnValue(false);
          spyOn(view.programmes, 'selectedItems').and.returnValue([{
            id: 'OTHER1'
          }, {
            id: constants.ccm.ERASMUS_PLUS
          }, {
            id: 'OTHER2'
          }]);

          expect(view.isErasmusPlusProgrammeSelected()).toBe(true);
        });
      });

      describe('.didClickClearFilters()', function () {
        beforeEach(function () {
          spyOn(AdvancedSearchView.prototype, 'initCriteriaVisibility');

          this.view = new AdvancedSearchView();
          this.view.initCriteriaVisibility.calls.reset();

          spyOn(this.view.options, 'update');
          spyOn(this.view.programmes, 'update');
          spyOn(this.view.actions, 'update');
          spyOn(this.view.actionsTypes, 'update');
          spyOn(this.view.topics, 'update');
          spyOn(this.view.activityYears, 'update');
          spyOn(this.view.fundingYears, 'update');
          spyOn(this.view.countries, 'update');
          spyOn(this.view.regions, 'update');
          spyOn(this.view.organisationTypes, 'update');
          spyOn(this.view.organisationRoles, 'update');
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesSelection');
          spyOn(AdvancedSearchView.prototype, 'toggleMatchAllCountriesVisibility');

          this.fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);
          this.view.didClickClearFilters(this.fakeEvent);
        });

        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
        });

        it('should init criteria visibility', function () {
          expect(this.view.initCriteriaVisibility).toHaveBeenCalled();
        });

        it('should prevent default action', function () {
          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should clear options component', function () {
          expect(this.view.options.update).toHaveBeenCalledWith(advancedSearchService.allOptions());
        });

        it('should clear programmes component', function () {
          expect(this.view.programmes.update).toHaveBeenCalledWith(advancedSearchService.allProgrammes());
        });

        it('should clear actions component', function () {
          expect(this.view.actions.update).toHaveBeenCalledWith([]);
        });

        it('should clear actionsTypes component', function () {
          expect(this.view.actionsTypes.update).toHaveBeenCalledWith([]);
        });

        it('should clear topics component', function () {
          expect(this.view.topics.update).toHaveBeenCalledWith(advancedSearchService.getTopicsForFormerProgrammes());
        });

        it('should clear activity years component', function () {
          expect(this.view.activityYears.update).toHaveBeenCalledWith(advancedSearchService.allActivityYears());
        });

        it('should clear funding years component', function () {
          expect(this.view.fundingYears.update).toHaveBeenCalledWith(advancedSearchService.allFundingYears());
        });

        it('should clear countries component', function () {
          expect(this.view.countries.update).toHaveBeenCalledWith(advancedSearchService.allCountries());
        });

        it('should clear matchAllCountries checkbox', function() {
          expect(this.view.toggleMatchAllCountriesSelection).toHaveBeenCalledWith(false);
        });

        it('should hide matchAllCountries section', function() {
          expect(this.view.toggleMatchAllCountriesVisibility).toHaveBeenCalledWith(false);
        });

        it('should clear regions component', function () {
          expect(this.view.regions.update).toHaveBeenCalledWith([]);
        });

        it('should clear organisation types component', function () {
          expect(this.view.organisationTypes.update).toHaveBeenCalledWith(advancedSearchService.allOrganisationTypes());
        });

        it('should clear organisation roles component', function () {
          expect(this.view.organisationRoles.update).toHaveBeenCalledWith(advancedSearchService.allOrganisationRoles());
        });
      });

      describe('.initCriteriaVisibility()', function () {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(this.view.actions, 'hide');
          spyOn(this.view.actionsTypes, 'hide');
          spyOn(this.view.topics, 'hide');
          spyOn(this.view.organisationTypes, 'hide');
          spyOn(this.view.regions, 'hide');

          spyOn(this.view, 'getMatchAllCountriesContainerElement').and.returnValue({
            hide: jasmine.createSpy()
          });

          this.view.initCriteriaVisibility();
        });

        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.initCriteriaVisibility).toEqual(jasmine.any(Function));
        });

        it('should hide actions', function () {
          expect(this.view.actions.hide).toHaveBeenCalled();
        });

        it('should hide actionsTypes', function () {
          expect(this.view.actionsTypes.hide).toHaveBeenCalled();
        });

        it('should hide topics', function () {
          expect(this.view.topics.hide).toHaveBeenCalled();
        });

        it('should hide organisationTypes', function () {
          expect(this.view.organisationTypes.hide).toHaveBeenCalled();
        });

        it('should hide regions', function () {
          expect(this.view.regions.hide).toHaveBeenCalled();
        });

        it('should hide matchAllCountries', function () {
          expect(this.view.getMatchAllCountriesContainerElement().hide).toHaveBeenCalled();
        });
      });

      describe('.isMatchAllCountriesVisible()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView();
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
          this.view = new AdvancedSearchView();
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isMatchAllCountriesSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if match all countries checkbox is checked', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue({
            is: jasmine.createSpy('is').and.callFake(function(selector) {
              if (selector === ':checked') {
                return true;
              }
            })
          });

          expect(this.view.isMatchAllCountriesSelected()).toBe(true);
        });

        it('should return false if match all countries checkbox is not checked', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue({
            is: jasmine.createSpy('is').and.callFake(function(selector) {
              if (selector === ':checked') {
                return false;
              }
            })
          });

          expect(this.view.isMatchAllCountriesSelected()).toBe(false);
        });
      });

      describe('.getMatchAllCountriesContainerElement', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.getMatchAllCountriesContainerElement).toEqual(jasmine.any(Function));
        });

        it('should return match all countries container element', function () {
          var view = new AdvancedSearchView(),
            fakeElement = {};

          spyOn($.prototype, 'find').and.callFake(function (selector) {
            if (selector === '.vlr-advanced-search__match-all-countries-container') {
              return fakeElement;
            }
          });

          expect(view.getMatchAllCountriesContainerElement()).toBe(fakeElement);
        });
      });

      describe('.getMatchAllCountriesElement', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.getMatchAllCountriesElement).toEqual(jasmine.any(Function));
        });

        it('should return match all countries element', function () {
          var view = new AdvancedSearchView(),
            fakeElement = {};

          spyOn($.prototype, 'find').and.callFake(function (selector) {
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
          var view = new AdvancedSearchView();

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
          var view = new AdvancedSearchView();

          view.toggleMatchAllCountriesVisibility(true);
          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(true);

          view.toggleMatchAllCountriesVisibility(false);
          expect(view.getMatchAllCountriesContainerElement().toggle).toHaveBeenCalledWith(false);
        });
      });

      describe('.didCountryChange()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.didCountriesChange).toEqual(jasmine.any(Function));
        });

        describe('Handling Regions', function () {
          describe('having only one country selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeRegions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.regions, 'update');

              spyOn(this.view.countries, 'hasOneSelection').and.returnValue(true);
              spyOn(this.view.countries, 'firstSelectedItem').and.returnValue({
                id: 'PL'
              });

              spyOn(advancedSearchService, 'getRegionsByCountry').and.callFake(function (countryCode) {
                if (countryCode === 'PL') {
                  return self.fakeRegions;
                }
              });

              spyOn(this.view, 'calculateCriteriaVisibility');

              this.view.didCountriesChange();
            });

            it('should call advancedSearchService to get regions according to country selection', function () {
              expect(advancedSearchService.getRegionsByCountry).toHaveBeenCalledWith('PL');
            });

            it('should update regions dropdown according to country selection', function () {
              expect(this.view.regions.update).toHaveBeenCalledWith(this.fakeRegions);
            });

            it('should calculate criteria visibility', function () {

              expect(this.view.calculateCriteriaVisibility).toHaveBeenCalled();
            });
          });

          describe('having more than one country selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeRegions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.regions, 'update');
              spyOn(this.view.countries, 'hasOneSelection').and.returnValue(false);
              spyOn(this.view.countries, 'firstSelectedItem').and.returnValue({
                id: 'PL'
              });

              spyOn(advancedSearchService, 'getRegionsByCountry').and.callFake(function (countryCode) {
                if (countryCode === 'PL') {
                  return self.fakeRegions;
                }
              });

              spyOn(this.view.regions, 'clear');

              this.view.didCountriesChange();
            });
            it('should clear regions if more than one country is selected', function () {
              expect(this.view.regions.clear).toHaveBeenCalled();
            });
          });
        });

      });

      describe('.didProgrammesChange()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.didProgrammesChange).toEqual(jasmine.any(Function));
        });

        it('should calculate criteria visibility', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'calculateCriteriaVisibility');

          view.didProgrammesChange();

          expect(view.calculateCriteriaVisibility).toHaveBeenCalled();
        });

        describe('Handling Actions', function () {
          describe('having only one programme selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeActions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.actions, 'update');
              spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(true);
              spyOn(this.view.programmes, 'firstSelectedItem').and.returnValue({
                id: 'programme1'
              });

              spyOn(advancedSearchService, 'getActionsByProgramme').and.callFake(function (programmeCode) {
                if (programmeCode === 'programme1') {
                  return self.fakeActions;
                }
              });

              spyOn(this.view.actions, 'clear');

              this.view.didProgrammesChange();
            });

            it('should call advancedSearchService to get actions according to programme selection', function () {
              expect(advancedSearchService.getActionsByProgramme).toHaveBeenCalledWith('programme1');
            });

            it('should update actions dropdown according to programme selection', function () {
              expect(this.view.actions.update).toHaveBeenCalledWith(this.fakeActions);
            });
          });

          describe('having more than one programme selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeActions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.actions, 'update');
              spyOn(this.view.programmes, 'hasOneSelection').and.returnValue(false);

              spyOn(this.view.actions, 'clear');
              spyOn(this.view.actionsTypes, 'clear');

              this.view.didProgrammesChange();
            });

            it('should clear actions if more than one programme is selected', function () {
              expect(this.view.actions.clear).toHaveBeenCalled();
            });

            it('should clear actionsTypes if more than one programme is selected', function () {
              expect(this.view.actionsTypes.clear).toHaveBeenCalled();
            });
          });
        });
      });

      describe('.didActionsChange()', function () {
        it('should be defined', function () {
          expect(AdvancedSearchView.prototype.didActionsChange).toEqual(jasmine.any(Function));
        });

        it('should calculate criteria visibility', function () {
          var view = new AdvancedSearchView();
          spyOn(view, 'calculateCriteriaVisibility');

          view.didActionsChange();

          expect(view.calculateCriteriaVisibility).toHaveBeenCalled();
        });

        describe('Handling ActionsTypes', function () {
          describe('having only one action selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeActions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.actionsTypes, 'update');
              spyOn(this.view.actions, 'hasOneSelection').and.returnValue(true);
              spyOn(this.view.actions, 'firstSelectedItem').and.returnValue({
                id: 'PL'
              });

              spyOn(advancedSearchService, 'getActionsTypeByAction').and.callFake(function (actionCode) {
                if (actionCode === 'PL') {
                  return self.fakeActions;
                }
              });

              spyOn(this.view.actionsTypes, 'clear');

              this.view.didActionsChange();
            });

            it('should call advancedSearchService to get actionsTypes according to action selection', function () {
              expect(advancedSearchService.getActionsTypeByAction).toHaveBeenCalledWith('PL');
            });

            it('should update actionsTypes dropdown according to actions selection', function () {
              expect(this.view.actionsTypes.update).toHaveBeenCalledWith(this.fakeActions);
            });
          });

          describe('having more than one action selected', function () {
            beforeEach(function () {
              var self = this;
              this.fakeActions = [{}, {}];
              this.view = new AdvancedSearchView();

              spyOn(this.view.actionsTypes, 'update');
              spyOn(this.view.actions, 'hasOneSelection').and.returnValue(false);
              spyOn(this.view.actions, 'firstSelectedItem').and.returnValue({
                id: 'PL'
              });

              spyOn(advancedSearchService, 'getActionsTypeByAction').and.callFake(function (actionCode) {
                if (actionCode === 'PL') {
                  return self.fakeActions;
                }
              });

              spyOn(this.view.actionsTypes, 'clear');

              this.view.didActionsChange();
            });

            it('should clear actionsTypes if more than one action is selected', function () {
              expect(this.view.actionsTypes.clear).toHaveBeenCalled();
            });
          });

        });
      });
    });
  });
});