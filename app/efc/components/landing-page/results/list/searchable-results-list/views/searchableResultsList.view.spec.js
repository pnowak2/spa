define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    ActionsToolbarComponent = require('app/shared/components/other/actions-toolbar/main.component'),
    SearchableResultsListView = require('./searchableResultsList.view'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service'),
    exportService = require('../services/export/export.service');

  describe('EfC Searchable Results List View', function() {
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

      it('should have actions toolbar component defined', function() {
        expect(this.view.actionsToolbarComponent).toEqual(jasmine.any(ActionsToolbarComponent));
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

      it('should have empty cached criteria defined', function() {
        expect(this.view.cachedCriteria).toEqual({});
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
          expect(SearchableResultsListView.prototype.className).toEqual('efc-searchable-results-list');
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

        it('should update cached criteria for later use', function() {
          var fakePreparedCriteria = {
            foo: 'bar'
          };

          expect(this.view.cachedCriteria).toEqual({});
          this.view.onSearchRequest(fakePreparedCriteria);
          expect(this.view.cachedCriteria).toBe(fakePreparedCriteria);
        });
      });

      describe('.onExportResultsRequest()', function() {
        beforeEach(function() {
          spyOn(exportService, 'export');

          this.view = new SearchableResultsListView();
          this.cachedCriteria = {
            foo: 'bar'
          };

          this.view.cachedCriteria = this.cachedCriteria;
          this.view.onExportResultsRequest();
        });

        it('it should be defined', function() {
          expect(SearchableResultsListView.prototype.onExportResultsRequest).toEqual(jasmine.any(Function));
        });

        it('should call export service with cached criteria', function() {
          expect(exportService.export).toHaveBeenCalledWith(this.cachedCriteria);
        });
      });

      describe('.didSearchComplete()', function() {
        beforeEach(function() {
          spyOn(ActionsToolbarComponent.prototype, 'toggle');

          this.view = new SearchableResultsListView();
        });

        it('should be defined', function() {
          expect(SearchableResultsListView.prototype.didSearchComplete).toEqual(jasmine.any(Function));
        });

        it('should not throw if invoked without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didSearchComplete();
          }).not.toThrow();
        });

        it('should hide actions toolbar component if no items found', function() {
          this.view.didSearchComplete({
            data: {
              total: 0
            }
          });

          expect(this.view.actionsToolbarComponent.toggle).toHaveBeenCalledWith(false);
        });

        it('should show actions toolbar component if items were found', function() {
          this.view.didSearchComplete({
            data: {
              total: 1
            }
          });
          
          expect(this.view.actionsToolbarComponent.toggle).toHaveBeenCalledWith(true);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to actions toolbar component export link click event', function() {
          spyOn(SearchableResultsListView.prototype, 'onExportResultsRequest');
          var view = new SearchableResultsListView();
          view.actionsToolbarComponent.trigger('actionsToolbar:export:click');

          expect(view.onExportResultsRequest).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new SearchableResultsListView();
        });

        it('should append actions toolbar component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.actionsToolbarComponent.render().view.$el);
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