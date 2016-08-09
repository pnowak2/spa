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
          expect(this.view.options.initialize).toHaveBeenCalledWith([{id: 1, title: 'Ongoing', selected: true}, {id: 2, title: 'Completed', selected: true}, {id: 3, title: 'Success Stories only'}, {id: 4, title: 'with Results only'}], {
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
          expect(this.view.programmes.initialize).toHaveBeenCalledWith([{id: ''}, {id: 1, title: 'Creative Europe'}, {id: 2, title: 'Culture (2007-2013)'}], {
            placeholder: 'All Programmes',
            multiple: false,
            allowClear: true
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

          spyOn(view.programmes, 'hasSelection').and.returnValue(true);
          spyOn(view.options, 'hasSelection').and.returnValue(false);

          expect(view.hasSelections()).toBe(true);
        });

        it('should return false if none of criteria components has selection', function() {
          var view = new AdvancedSearchView;

          spyOn(view.programmes, 'hasSelection').and.returnValue(false);
          spyOn(view.options, 'hasSelection').and.returnValue(false);

          expect(view.hasSelections()).toBe(false);
        });
      });

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
          spyOn(this.view.programmes, 'unselectAll');
          spyOn(this.view.options, 'unselectAll');

          this.fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);
          this.view.didClickClearFilters(this.fakeEvent);
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
        });

        it('should prevent default action', function() {
          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should clear programmes component', function() {
          expect(this.view.programmes.unselectAll).toHaveBeenCalled();
        });

        it('should clear options component', function() {
          expect(this.view.options.unselectAll).toHaveBeenCalled();
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

        it('should render header text', function() {
          expect(this.$el.find('h1')).toContainText('Project Criteria');
        });

        it('should render clear filters link', function() {
          expect(this.$el.find('.vlr-advanced-search__header')).toContainElement('a[href="#"].vlr-advanced-search__clear');
          expect(this.$el.find('.vlr-advanced-search__header > a.vlr-advanced-search__clear')).toContainText('Clear filters');
        });

        it('should render options section', function() {
          expect(this.$el).toContainElement('.vlr-advanced-search__section-options.vlr-advanced-search__section');
        });

        it('should render options', function() {
          var $subview = this.view.options.render().view.$el;
          expect(this.$el.find('.vlr-advanced-search__section-options')).toContainHtml($subview);
        });

        it('should render programmes section', function() {
          expect(this.$el).toContainElement('.vlr-advanced-search__section-programme.vlr-advanced-search__section');
        });

        it('should render programmes', function() {
          var $subview = this.view.programmes.render().view.$el;
          expect(this.$el.find('.vlr-advanced-search__section-programme')).toContainHtml($subview);
        });
      });
    });
  });
});