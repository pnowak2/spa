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
        this.view = new AdvancedSearchView();
      });

      it('should not throw if created without arguments', function() {
        expect(function() {
          new AdvancedSearchView;
        }).not.toThrow();
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(AdvancedSearchView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(AdvancedSearchView.prototype.className).toEqual('ce-advanced-search');
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
      });

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
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
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });
      });
    });
  });
});