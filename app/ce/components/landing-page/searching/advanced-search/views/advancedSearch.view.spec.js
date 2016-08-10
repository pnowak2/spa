define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchView = require('./advancedSearch.view'),
    advancedSearchService = require('../services/advanced-search/advancedSearch.service'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component');

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
          expect(this.view.options.initialize).toHaveBeenCalledWith([{
            id: 1,
            title: 'Ongoing',
            selected: true
          }, {
            id: 2,
            title: 'Completed',
            selected: true
          }, {
            id: 3,
            title: 'Success Stories only'
          }, {
            id: 4,
            title: 'with Results only'
          }], {
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
          expect(this.view.programmes.initialize).toHaveBeenCalledWith([{
            id: ''
          }, {
            id: 1,
            title: 'Creative Europe'
          }, {
            id: 2,
            title: 'Culture (2007-2013)'
          }], {
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
          expect(this.view.activityYears.initialize).toHaveBeenCalledWith([], {
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
          expect(this.view.fundingYears.initialize).toHaveBeenCalledWith([], {
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
          expect(this.view.countries.initialize).toHaveBeenCalledWith([], {
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
          expect(this.view.organisationTypes.initialize).toHaveBeenCalledWith([], {
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
      describe('.getCriteria()', function() {

        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getCriteria).toEqual(jasmine.any(Function));
        });
      });

      describe('.hasSelections()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.hasSelections).toEqual(jasmine.any(Function));
        });

        it('should return true if any criteria components has selection', function() {
          var view = new AdvancedSearchView;

          spyOn(view.options, 'hasSelection').and.returnValue(false);
          spyOn(view.programmes, 'hasSelection').and.returnValue(true);
          spyOn(view.subprogrammes, 'hasSelection').and.returnValue(false);
          spyOn(view.actions, 'hasSelection').and.returnValue(false);
          spyOn(view.activities, 'hasSelection').and.returnValue(false);
          spyOn(view.activityYears, 'hasSelection').and.returnValue(false);
          spyOn(view.fundingYears, 'hasSelection').and.returnValue(false);
          spyOn(view.countries, 'hasSelection').and.returnValue(false);
          spyOn(view.regions, 'hasSelection').and.returnValue(false);
          spyOn(view.organisationTypes, 'hasSelection').and.returnValue(false);

          expect(view.hasSelections()).toBe(true);
        });

        it('should return false if none of criteria components has selection', function() {
          var view = new AdvancedSearchView;

          spyOn(view.options, 'hasSelection').and.returnValue(false);
          spyOn(view.programmes, 'hasSelection').and.returnValue(false);
          spyOn(view.subprogrammes, 'hasSelection').and.returnValue(false);
          spyOn(view.actions, 'hasSelection').and.returnValue(false);
          spyOn(view.activities, 'hasSelection').and.returnValue(false);
          spyOn(view.activityYears, 'hasSelection').and.returnValue(false);
          spyOn(view.fundingYears, 'hasSelection').and.returnValue(false);
          spyOn(view.countries, 'hasSelection').and.returnValue(false);
          spyOn(view.regions, 'hasSelection').and.returnValue(false);
          spyOn(view.organisationTypes, 'hasSelection').and.returnValue(false);

          expect(view.hasSelections()).toBe(false);
        });
      });

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
          spyOn(this.view.options, 'unselectAll');
          spyOn(this.view.programmes, 'unselectAll');
          spyOn(this.view.subprogrammes, 'unselectAll');
          spyOn(this.view.actions, 'unselectAll');
          spyOn(this.view.activities, 'unselectAll');
          spyOn(this.view.activityYears, 'unselectAll');
          spyOn(this.view.fundingYears, 'unselectAll');
          spyOn(this.view.countries, 'unselectAll');
          spyOn(this.view.regions, 'unselectAll');
          spyOn(this.view.organisationTypes, 'unselectAll');

          this.fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);
          this.view.didClickClearFilters(this.fakeEvent);
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
        });

        it('should prevent default action', function() {
          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should clear options component', function() {
          expect(this.view.options.unselectAll).toHaveBeenCalled();
        });

        it('should clear programmes component', function() {
          expect(this.view.programmes.unselectAll).toHaveBeenCalled();
        });

        it('should clear subprogrammes component', function() {
          expect(this.view.subprogrammes.unselectAll).toHaveBeenCalled();
        });

        it('should clear actions component', function() {
          expect(this.view.actions.unselectAll).toHaveBeenCalled();
        });

        it('should clear activities component', function() {
          expect(this.view.activities.unselectAll).toHaveBeenCalled();
        });

        it('should clear activity years component', function() {
          expect(this.view.activityYears.unselectAll).toHaveBeenCalled();
        });

        it('should clear funding years component', function() {
          expect(this.view.fundingYears.unselectAll).toHaveBeenCalled();
        });

        it('should clear countries component', function() {
          expect(this.view.countries.unselectAll).toHaveBeenCalled();
        });

        it('should clear regions component', function() {
          expect(this.view.regions.unselectAll).toHaveBeenCalled();
        });

        it('should clear organisation types component', function() {
          expect(this.view.organisationTypes.unselectAll).toHaveBeenCalled();
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