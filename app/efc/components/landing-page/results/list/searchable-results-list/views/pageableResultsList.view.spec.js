define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    PageableResultsListView = require('./pageableResultsList.view'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service');

  describe('EfC Pageable Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageableResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(SearchableListComponent.prototype, 'initialize');
        this.view = new PageableResultsListView;
      });

      it('should create searchable list component', function() {
        expect(this.view.searchableListComponent).toEqual(jasmine.any(SearchableListComponent));
      });

      it('should initialize searchable list component with results list component', function() {
        expect(SearchableListComponent.prototype.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
          listComponent: jasmine.any(ResultsListComponent)
        }));
      });

      it('should initialize searchable list component with search service', function() {
        expect(SearchableListComponent.prototype.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
          searchService: searchService
        }));
      });

    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PageableResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PageableResultsListView.prototype.className).toEqual('efc-searchable-results-list');
        });
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableListComponent.prototype, 'onSearchRequest');
          this.view = new PageableResultsListView;
        });

        it('should be defined', function() {
          expect(PageableResultsListView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          var fakeCriteria = {};

          this.view.onSearchRequest(fakeCriteria)

          expect(this.view.searchableListComponent.onSearchRequest).toHaveBeenCalledWith(fakeCriteria);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PageableResultsListView;
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render searchable list component', function() {
          expect(this.view.render().$el).toContainHtml(
            this.view.searchableListComponent.render().view.el
          );
        });
      });
    });
  });
});