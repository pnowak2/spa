define(function(require) {
  var Backbone = require('backbone'),
    PagedResultsListView = require('./pagedResultsList.view'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    searchService = require('app/efc/services/search/search.service'),
    RSVP = require('rsvp'),
    _ = require('underscore');

  describe('Paged Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagedResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(_, 'bindAll').and.callThrough();
        this.view = new PagedResultsListView;
      });

      it('should have results list component defined', function() {
        expect(this.view.resultsListComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component defined', function() {
        expect(this.view.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });

      it('should bind callback methods with view object', function() {
        expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didSearchSucceed');
      });

      it('should have empty cached criteria defined', function() {
        expect(this.view.cachedCriteria).toEqual({});
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
      describe('.startListeningPager()', function() {
        beforeEach(function() {
          spyOn(PagedResultsListView.prototype, 'listenTo');
          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.startListeningPager).toEqual(jasmine.any(Function));
        });

        it('should start listening for page changes', function() {
          this.view.listenTo.calls.reset();
          this.view.startListeningPager();
          expect(this.view.listenTo.calls.count()).toBe(1);
          expect(this.view.listenTo).toHaveBeenCalledWith(this.view.pagerComponent, 'pager:page:selected', this.view.onPageRequest);
        });
      });

      describe('.stopListeningPager()', function() {
        beforeEach(function() {
          spyOn(PagedResultsListView.prototype, 'stopListening');
          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.stopListeningPager).toEqual(jasmine.any(Function));
        });

        it('should stop listening for page changes', function() {
          this.view.stopListening.calls.reset();
          this.view.stopListeningPager();
          expect(this.view.stopListening.calls.count()).toBe(1);
          expect(this.view.stopListening).toHaveBeenCalledWith(this.view.pagerComponent, 'pager:page:selected');
        });
      });

      describe('.resetPager()', function() {
        beforeEach(function() {
          spyOn(PagedResultsListView.prototype, 'onPageRequest');
          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.resetPager).toEqual(jasmine.any(Function));
        });

        it('should reset pager component to first page', function() {
          this.view.pagerComponent.update({
            totalItems: 100,
            currentPage: 3
          });

          this.view.resetPager();

          expect(this.view.pagerComponent.getState()).toEqual(jasmine.objectContaining({
            startFromItem: 0,
            currentPage: 1
          }));
        });

        it('should reset silently without notifying the view', function() {
          this.view.pagerComponent.update({
            totalItems: 100,
            currentPage: 3
          });

          this.view.onPageRequest.calls.reset();

          expect(this.view.onPageRequest).not.toHaveBeenCalled();
          expect(this.view.pagerComponent.getState().currentPage).toBe(3);

          this.view.resetPager();

          expect(this.view.onPageRequest).not.toHaveBeenCalled();
          expect(this.view.pagerComponent.getState().currentPage).toBe(1);

          this.view.pagerComponent.update({
            totalItems: 100,
            currentPage: 3
          });

          expect(this.view.onPageRequest).toHaveBeenCalled();
          expect(this.view.pagerComponent.getState().currentPage).toBe(3);
        });
      });

      describe('.prepareSearchCriteria()', function() {
        beforeEach(function() {
          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.prepareSearchCriteria).toEqual(jasmine.any(Function));
        });

        it('should extend search criteria with pager state', function() {
          var fakeSearchCriteria = {
              keyword: 'foo'
            },
            fakePagerState = {
              totalItems: 1000,
              currentPage: 15
            };

          var preparedCriteria = this.view.prepareSearchCriteria(fakeSearchCriteria, fakePagerState);

          expect(preparedCriteria).toEqual(jasmine.objectContaining({
            keyword: 'foo',
            totalItems: 1000,
            currentPage: 15
          }));
        });
      });

      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(PagedResultsListView.prototype, 'performSearch');
          spyOn(PagedResultsListView.prototype, 'didSearchSucceed');
          spyOn(PagedResultsListView.prototype, 'didSearchFail');
          spyOn(PagedResultsListView.prototype, 'resetPager');

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

        it('should reset pager component', function() {
          this.view.onSearchRequest();
          expect(this.view.resetPager).toHaveBeenCalled();
        });

        it('should prepare search criteria with criteria argument and pager state', function() {
          var fakeSearchCriteria = {
              keyword: 'foo'
            },
            fakePagerStatus = {
              currentPage: 5
            };

          spyOn(PagedResultsListView.prototype, 'prepareSearchCriteria');
          spyOn(PagerComponent.prototype, 'getState').and.returnValue(fakePagerStatus);

          this.view.onSearchRequest(fakeSearchCriteria, fakePagerStatus);

          expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeSearchCriteria, fakePagerStatus);
        });

        it('should call perform search with prepared criteria', function() {
          var fakePreparedCriteria = {
            currentPage: 2
          };
          spyOn(PagedResultsListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          this.view.onSearchRequest({});

          expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
        });

        it('should update cached criteria for later use', function() {
          var fakePreparedCriteria = {};

          spyOn(PagedResultsListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          expect(this.view.cachedCriteria).toEqual({});
          this.view.onSearchRequest({});
          expect(this.view.cachedCriteria).toBe(fakePreparedCriteria);
        });
      });

      describe('.onPageRequest()', function() {
        beforeEach(function() {
          spyOn(PagedResultsListView.prototype, 'performSearch');
          this.view = new PagedResultsListView;
        });

        it('it should be defined', function() {
          expect(PagedResultsListView.prototype.onPageRequest).toEqual(jasmine.any(Function));
        });

        it('should prepare search criteria with cached criteria and pager state argument', function() {
          var fakeCachedCriteria = {
              keyword: 'bar'
            },
            fakePagerState = {
              currentPage: 1
            };

          spyOn(PagedResultsListView.prototype, 'prepareSearchCriteria');

          this.view.cachedCriteria = fakeCachedCriteria;
          this.view.onPageRequest(fakePagerState);

          expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCachedCriteria, fakePagerState);
        });

        it('should call perform search with prepared search criteria', function() {
          var fakePreparedCriteria = {
            keyword: 'foo'
          };

          spyOn(PagedResultsListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          this.view.onPageRequest({});

          expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
        });
      });

      describe('.performSearch()', function() {
        beforeEach(function() {
          this.view = new PagedResultsListView;
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.performSearch).toEqual(jasmine.any(Function));
        });

        it('should call search service with argument provided', function() {
          spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve());

          var fakeSearchCriteria = {
            keyword: 'bar'
          };

          this.view.performSearch(fakeSearchCriteria);

          expect(searchService.search).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should call success method after search done', function(done) {
          spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve('success'));

          this.view.didSearchSucceed = function(data) {
            expect(data).toEqual('success');
            done();
          }

          this.view.performSearch({});
        });

        it('should call failure method after search failed', function(done) {
          spyOn(searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

          this.view.didSearchFail = function(error) {
            expect(error).toEqual('error');
            done();
          }

          this.view.performSearch({});
        });
      });

      describe('.didSearchSucceed()', function() {
        beforeEach(function() {
          spyOn(ResultsListComponent.prototype, 'update');
          spyOn(PagerComponent.prototype, 'update');

          this.view = new PagedResultsListView;
          this.fakeData = {
            total: 1000,
            items: []
          };
        });

        it('should be defined', function() {
          expect(PagedResultsListView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
        });

        it('should not throw if invoked without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didSearchSucceed();
          }).not.toThrow();
        });

        it('should update results list component with data items', function() {
          this.view.didSearchSucceed(this.fakeData);
          var updateSpy = this.view.resultsListComponent.update.calls.mostRecent();
          expect(updateSpy.args[0]).toBe(this.fakeData.items);
        });

        it('should update pager component with data total items', function() {
          this.view.didSearchSucceed(this.fakeData);
          expect(this.view.pagerComponent.update).toHaveBeenCalledWith(jasmine.objectContaining({
            totalItems: 1000
          }));
        });
      });

      describe('.didSearchFail()', function() {
        it('should be defined', function() {
          expect(PagedResultsListView.prototype.didSearchFail).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to pager changes after view creation', function() {
          spyOn(PagedResultsListView.prototype, 'onPageRequest');
          var view = new PagedResultsListView;
          view.pagerComponent.trigger('pager:page:selected');

          expect(view.onPageRequest).toHaveBeenCalled();
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