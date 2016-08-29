define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    SearchableResultsListView = require('./searchableResultsList.view'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/ce/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service');

  describe('CE Searchable Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(SearchableResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(SearchableListComponent.prototype, 'initialize');
        this.view = new SearchableResultsListView();
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

      it('should initialize searchable list component with pager config', function() {
        expect(SearchableListComponent.prototype.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
          pagerConfig: {
            pageWindowSize: 3
          }
        }));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(SearchableResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(SearchableResultsListView.prototype.className).toEqual('ce-searchable-results-list');
        });
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableListComponent.prototype, 'onSearchRequest');
          this.view = new SearchableResultsListView();
        });

        it('should be defined', function() {
          expect(SearchableResultsListView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          var fakeCriteria = {};

          this.view.onSearchRequest(fakeCriteria);

          expect(this.view.searchableListComponent.onSearchRequest).toHaveBeenCalledWith(fakeCriteria);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new SearchableResultsListView();
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