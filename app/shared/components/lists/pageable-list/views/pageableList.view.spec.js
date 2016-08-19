define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    PageableListView = require('./pageableList.view'),
    PageStatsComponent = require('app/shared/components/paging/page-stats/main.component'),
    PagerComponent = require('app/shared/components/paging/pager/main.component'),
    BaseListComponent = require('../components/baseListComponent/main.component'),
    dummySearchService = require('../services/dummySearch.service'),
    RSVP = require('rsvp'),
    _ = require('underscore');

  describe('Pageable List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageableListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      describe('Default', function() {
        beforeEach(function() {
          spyOn(_, 'bindAll').and.callThrough();
          this.view = new PageableListView;
        });

        it('should have default list component defined', function() {
          expect(this.view.listComponent).toEqual(jasmine.any(BaseListComponent));
        });

        it('should have default search service defined', function() {
          expect(this.view.searchService).toEqual(dummySearchService);
        });

        it('should have pager component defined', function() {
          expect(this.view.pagerComponent).toEqual(jasmine.any(PagerComponent));
        });

        it('should have page stats component defined', function() {
          expect(this.view.pageStatsComponent).toEqual(jasmine.any(PageStatsComponent));
        });

        it('should bind callback methods with view object', function() {
          expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didSearchSucceed', 'didSearchFail');
        });

        it('should have empty cached criteria defined', function() {
          expect(this.view.cachedCriteria).toEqual({});
        });
      });

      describe('With custom options', function() {
        it('should throw error if list component has wrong type', function() {
          expect(function() {
            new PageableListView({
              listComponent: 'test'
            });
          }).toThrow('list component should be type of BaseListComponent')
        });

        it('should should not throw error if list component is of correct type', function() {
          expect(function() {
            new PageableListView({
              listComponent: new BaseListComponent
            });
          }).not.toThrow()
        });
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PageableListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PageableListView.prototype.className).toEqual('vlr-pageable-list');
        });
      });
    });

    describe('api', function() {
      describe('.startListeningPager()', function() {
        beforeEach(function() {
          spyOn(PageableListView.prototype, 'listenTo');
          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.startListeningPager).toEqual(jasmine.any(Function));
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
          spyOn(PageableListView.prototype, 'stopListening');
          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.stopListeningPager).toEqual(jasmine.any(Function));
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
          spyOn(PageableListView.prototype, 'onPageRequest');
          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.resetPager).toEqual(jasmine.any(Function));
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
          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.prepareSearchCriteria).toEqual(jasmine.any(Function));
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
          spyOn(PageableListView.prototype, 'performSearch');
          spyOn(PageableListView.prototype, 'didSearchSucceed');
          spyOn(PageableListView.prototype, 'didSearchFail');
          spyOn(PageableListView.prototype, 'resetPager');

          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
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

          spyOn(PageableListView.prototype, 'prepareSearchCriteria');
          spyOn(PagerComponent.prototype, 'getState').and.returnValue(fakePagerStatus);

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeSearchCriteria, fakePagerStatus);
        });

        it('should call perform search with prepared criteria', function() {
          var fakePreparedCriteria = {
            currentPage: 2
          };
          spyOn(PageableListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          this.view.onSearchRequest({});

          expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
        });

        it('should update cached criteria for later use', function() {
          var fakePreparedCriteria = {};

          spyOn(PageableListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          expect(this.view.cachedCriteria).toEqual({});
          this.view.onSearchRequest({});
          expect(this.view.cachedCriteria).toBe(fakePreparedCriteria);
        });
      });

      describe('.onPageRequest()', function() {
        beforeEach(function() {
          spyOn(PageableListView.prototype, 'performSearch');
          this.view = new PageableListView;
        });

        it('it should be defined', function() {
          expect(PageableListView.prototype.onPageRequest).toEqual(jasmine.any(Function));
        });

        it('should prepare search criteria with cached criteria and pager state argument', function() {
          var fakeCachedCriteria = {
              keyword: 'bar'
            },
            fakePagerState = {
              currentPage: 1
            };

          spyOn(PageableListView.prototype, 'prepareSearchCriteria');

          this.view.cachedCriteria = fakeCachedCriteria;
          this.view.onPageRequest(fakePagerState);

          expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCachedCriteria, fakePagerState);
        });

        it('should call perform search with prepared search criteria', function() {
          var fakePreparedCriteria = {
            keyword: 'foo'
          };

          spyOn(PageableListView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

          this.view.onPageRequest({});

          expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
        });
      });

      describe('.performSearch()', function() {
        beforeEach(function() {
          this.view = new PageableListView;
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.performSearch).toEqual(jasmine.any(Function));
        });

        it('should call search service with argument provided', function() {
          spyOn(this.view.searchService, 'search').and.returnValue(RSVP.Promise.resolve());

          var fakeSearchCriteria = {
            keyword: 'bar'
          };

          this.view.performSearch(fakeSearchCriteria);

          expect(this.view.searchService.search).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should call success method after search done', function(done) {
          spyOn(this.view.searchService, 'search').and.returnValue(RSVP.Promise.resolve('success'));

          this.view.didSearchSucceed = function(data) {
            expect(data).toEqual('success');
            done();
          }

          this.view.performSearch({});
        });

        it('should call failure method after search failed', function(done) {
          spyOn(this.view.searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

          this.view.didSearchFail = function(error) {
            expect(error).toEqual('error');
            done();
          }

          this.view.performSearch({});
        });
      });

      describe('.didSearchSucceed()', function() {
        beforeEach(function() {
          spyOn(BaseListComponent.prototype, 'update');
          spyOn(PagerComponent.prototype, 'update');
          spyOn(PageStatsComponent.prototype, 'update');

          this.view = new PageableListView;
          this.fakeData = {
            total: 1000,
            items: []
          };
        });

        it('should be defined', function() {
          expect(PageableListView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
        });

        it('should not throw if invoked without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didSearchSucceed();
          }).not.toThrow();
        });

        it('should update list component with data items', function() {
          this.view.didSearchSucceed(this.fakeData);
          var updateSpy = this.view.listComponent.update.calls.mostRecent();
          expect(updateSpy.args[0]).toBe(this.fakeData.items);
        });

        it('should update pager component with data total items', function() {
          this.view.didSearchSucceed(this.fakeData);
          expect(this.view.pagerComponent.update).toHaveBeenCalledWith(jasmine.objectContaining({
            totalItems: 1000
          }));
        });

        it('should update page stats component with data from pager', function() {
          var fakePagerState = {};
          spyOn(PagerComponent.prototype, 'getState').and.returnValue(fakePagerState);
          this.view.didSearchSucceed(this.fakeData);
          expect(this.view.pageStatsComponent.update).toHaveBeenCalledWith(fakePagerState);
        });
      });

      describe('.didSearchFail()', function() {
        it('should be defined', function() {
          expect(PageableListView.prototype.didSearchFail).toEqual(jasmine.any(Function));
        });

        it('should show error message', function() {
          spyOn(app, 'showError');

          var view = new PageableListView,
            fakeError = {};

          view.didSearchFail(fakeError);

          expect(app.showError).toHaveBeenCalledWith(fakeError);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to pager changes after view creation', function() {
          spyOn(PageableListView.prototype, 'onPageRequest');
          var view = new PageableListView;
          view.pagerComponent.trigger('pager:page:selected');

          expect(view.onPageRequest).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PageableListView;
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should append list component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.listComponent.render().view.$el);
        });

        it('should append pager component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.pagerComponent.render().view.$el);
        });

        it('should append page stats component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.pageStatsComponent.render().view.$el);
        });
      });
    });
  });
});