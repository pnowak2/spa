define(function(require) {
  var Backbone = require('backbone'),
    PagedResultsListView = require('./pagedResultsList.view'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    searchService = require('app/efc/services/search/search.service');

  describe('Paged Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagedResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.view = new PagedResultsListView;
      });

      it('should have results list component defined', function() {
        expect(this.view.resultsListComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component defined', function() {
        expect(this.view.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PagedResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PagedResultsListView.prototype.className).toEqual('efc-paged-results-list');
        });
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          var fakeThenable = {
            then: function() {},
            catch: function() {}
          }
          spyOn(fakeThenable, 'then').and.returnValue(fakeThenable);
          spyOn(fakeThenable, 'catch').and.returnValue(fakeThenable);

          spyOn(searchService, 'search').and.returnValue(fakeThenable);
          spyOn(PagedResultsListView.prototype, 'didSearchSucceed');

          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without args', function() {
          var self = this;
          expect(function() {
            self.view.onSearchRequest();
          }).not.toThrow();
        });

        it('should call search service with search criteria', function() {
          var fakeSearchCriteria = {
            keyword: 'foo'
          };

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(searchService.search).toHaveBeenCalledWith(jasmine.objectContaining({
            keyword: 'foo'
          }));
        });

        it('should call search with minimum paging data from pager component', function() {
          this.view.onSearchRequest();

          var searchArg = searchService.search.calls.mostRecent().args[0];

          expect(searchArg).toEqual(jasmine.objectContaining({
            startFromItem: this.view.pagerComponent.getState().startFromItem,
            pageSize: this.view.pagerComponent.getState().pageSize,
          }));
        });

        it('should reset pager component to first page before search', function() {
          this.view.pagerComponent.update({
            totalItems: 100,
            currentPage: 3
          });

          this.view.onSearchRequest();

          expect(this.view.pagerComponent.getState()).toEqual(jasmine.objectContaining({
            startFromItem: 0,
            currentPage: 1
          }));
        });

        it('should callback after search done', function() {
          this.view.onSearchRequest();
          expect(searchService.search().then).toHaveBeenCalledWith(PagedResultsListView.prototype.didSearchSucceed);
        });

        it('should callback after search failed', function() {
          this.view.onSearchRequest();
          expect(searchService.search().catch).toHaveBeenCalledWith(PagedResultsListView.prototype.didSearchFail);
        });
      });

      describe('.didSearchSucceed()', function() {
        it('should be defined', function() {
          expect(PagedResultsListView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
        });
      });

      describe('.didSearchFail()', function() {
        it('should be defined', function() {
          expect(PagedResultsListView.prototype.didSearchFail).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PagedResultsListView;
        });

        it('should append results list component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.resultsListComponent.render().view.$el);
        });

        it('should append pager component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.pagerComponent.render().view.$el);
        });
      });
    });
  });
});