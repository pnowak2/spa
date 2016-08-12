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
        spyOn(AdvancedSearchView.prototype, 'initCriteriaStatus');
        spyOn(MultiselectComponent.prototype, 'initialize');
        this.view = new AdvancedSearchView();
      });

      it('should not throw if created without arguments', function() {
        expect(function() {
          new AdvancedSearchView;
        }).not.toThrow();
      });

      it('should init criteria visibility', function() {
        expect(this.view.initCriteriaStatus).toHaveBeenCalled();
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
            multiple: false,
            allowClear: true
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
            multiple: false,
            allowClear: true
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
            multiple: false,
            allowClear: true
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
      describe('.initCriteriaStatus()', function() {
        beforeEach(function () {
          this.view = new AdvancedSearchView();
          spyOn(AdvancedSearchView.prototype, 'clearMatchAllCountries');
          spyOn(this.view.subprogrammes, 'hide');
          spyOn(this.view.actions, 'hide');
          spyOn(this.view.activities, 'hide');
          spyOn(this.view.fundingYears, 'hide');
          spyOn(this.view.regions, 'hide');

          this.view.initCriteriaStatus();
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.initCriteriaStatus).toEqual(jasmine.any(Function));
        });

        it('should clear match all countries checkbox', function() {
          expect(this.view.clearMatchAllCountries).toHaveBeenCalled();
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

        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getCriteria).toEqual(jasmine.any(Function));
        });
      });

      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.isDirty).toEqual(jasmine.any(Function));
        });

        it('should return true if any criteria components has changed', function() {
          var view = new AdvancedSearchView;

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

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          spyOn(AdvancedSearchView.prototype, 'initCriteriaStatus');

          this.view = new AdvancedSearchView;
          this.view.initCriteriaStatus.calls.reset();

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
          expect(this.view.initCriteriaStatus).toHaveBeenCalled();
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

      describe('.didProgrammeChange', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didProgrammeChange).toEqual(jasmine.any(Function));
        });
      });

      describe('.didSubprogrammeChange', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didSubprogrammeChange).toEqual(jasmine.any(Function));
        });
      });

      describe('.didCountryChange', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didCountryChange).toEqual(jasmine.any(Function));
        });
      });

      describe('.getMatchAllCountriesElement()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getMatchAllCountriesElement).toEqual(jasmine.any(Function));
        });

        it('should return match all countries element', function() {
          var view = new AdvancedSearchView,
            fakeMapContainer = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-advanced-search__match-all-countries-input') {
              return fakeMapContainer;
            }
          });

          expect(view.getMatchAllCountriesElement()).toBe(fakeMapContainer);
        });
      });

      describe('.clearMatchAllCountries()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.clearMatchAllCountries).toEqual(jasmine.any(Function));
        });

        it('should clear selection of checkbox', function() {
          spyOn(AdvancedSearchView.prototype, 'getMatchAllCountriesElement').and.returnValue(jasmine.createSpyObj('chk', ['removeAttr']));
          var view = new AdvancedSearchView;

          view.clearMatchAllCountries();

          expect(view.getMatchAllCountriesElement().removeAttr).toHaveBeenCalledWith('checked');
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
        beforeEach(function () {
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
        this.view = new AdvancedSearchView;
        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
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
            expect(this.$el.find('.vlr-advanced-search__header-toolbar > .vlr-advanced-search__match-all-countries-label')).toContainText('Match All Countries');
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