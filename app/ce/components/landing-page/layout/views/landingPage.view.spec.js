define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    ResultStatsComponent = require('app/ce/components/landing-page/results/result-stats/main.component'),
    SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    ResultsMapComponent = require('app/ce/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component'),
    router = require('app/shared/routers/search.router');

  describe('CE Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(LandingPageView.prototype, 'handleInitialResultsDisplay');
        spyOn(LandingPageView.prototype, 'render');
        spyOn(SearchComponent.prototype, 'initialize');
        spyOn(ResultsMapComponent.prototype, 'initMap');
        spyOn(TabSwitcherComponent.prototype, 'initialize');

        this.view = new LandingPageView();
      });

      it('should have search component defined ', function() {
        expect(this.view.search).toEqual(jasmine.any(SearchComponent));
      });

      it('should initialize search component with correct advanced search component in options', function() {
        var passedOptions = SearchComponent.prototype.initialize.calls.mostRecent().args[0];
        expect(passedOptions.advancedSearchComponent).toEqual(jasmine.any(AdvancedSearchComponent));
      });

      it('should have result stats component defined', function() {
        expect(this.view.resultStats).toEqual(jasmine.any(ResultStatsComponent));
      });

      it('should have searchable results list component defined ', function() {
        expect(this.view.searchableResultsList).toEqual(jasmine.any(SearchableResultsListComponent));
      });

      it('should have map component defined', function() {
        expect(this.view.resultsMap).toEqual(jasmine.any(ResultsMapComponent));
      });

      it('should have tab switcher component defined', function() {
        expect(this.view.tabSwitcher).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should initialize tab switcher with proper data', function() {
        expect(this.view.tabSwitcher.initialize).toHaveBeenCalledWith({
          tabDescriptors: [{
            title: 'List view',
            identifier: 'list',
            targetSelector: '.' + this.view.searchableResultsList.view.className,
            selected: true
          }, {
            title: 'Map',
            identifier: 'map',
            targetSelector: '.' + this.view.resultsMap.view.className,
            selected: false
          }]
        });
      });

      it('should handle initial results', function() {
        expect(this.view.handleInitialResultsDisplay).toHaveBeenCalled();
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the results map', function() {
        expect(this.view.resultsMap.initMap).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableResultsListComponent.prototype, 'onSearchRequest');
          spyOn(ResultsMapComponent.prototype, 'onSearchRequest');
          spyOn(router, 'updateUrl');

          this.view = new LandingPageView();
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableResultsList.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should delegate to results map component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.resultsMap.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should update url with router', function() {
          var fakeSearchCriteria = { foo: 'bar' };

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(router.updateUrl).toHaveBeenCalledWith(fakeSearchCriteria);
        });
      });

      describe('.didListSearchSucceed()', function() {
        beforeEach(function() {
          spyOn(LandingPageView.prototype, 'handleUpdatedResultsDisplay');
          spyOn(ResultStatsComponent.prototype, 'update');

          this.fakeDto = {
            data: {
              total: 1242,
            },
            searchCriteria: {
              keyword: 'FooBar'
            }
          };

          this.view = new LandingPageView();
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.didListSearchSucceed).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without data', function() {
          var self = this;
          expect(function() {
            self.view.didListSearchSucceed();
          }).not.toThrow();
        });

        it('should update result stats component with items count', function() {
          this.view.didListSearchSucceed(this.fakeDto);

          expect(this.view.resultStats.update).toHaveBeenCalledWith(jasmine.objectContaining({
            itemsCount: 1242
          }));
        });

        it('should update result stats component with search criteria', function() {
          this.view.didListSearchSucceed(this.fakeDto);
          expect(this.view.resultStats.update).toHaveBeenCalledWith(jasmine.objectContaining({
            criteria: this.fakeDto.searchCriteria
          }));
        });

        it('should handle updated results', function() {
          this.view.didListSearchSucceed(this.fakeDto);

          expect(this.view.handleUpdatedResultsDisplay).toHaveBeenCalled();
        });
      });

      describe('.didRoute()', function() {
        beforeEach(function () {
          spyOn(SearchComponent.prototype, 'update');
          spyOn(SearchComponent.prototype, 'requestSearch');

          this.fakeCriteria = {foo: 'bar'};
          this.view = new LandingPageView();
          this.view.didRoute(this.fakeCriteria);
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.didRoute).toEqual(jasmine.any(Function));
        });

        it('should update search component', function() {
          expect(this.view.search.update).toHaveBeenCalledWith(this.fakeCriteria);
        });

        it('should request new search', function() {
          expect(this.view.search.requestSearch).toHaveBeenCalled();
        });
      });

      describe('.onExportToXlsRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableResultsListComponent.prototype, 'onExportToXlsRequest');

          this.view = new LandingPageView();
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.onExportToXlsRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          this.view.onExportToXlsRequest();

          expect(this.view.searchableResultsList.onExportToXlsRequest).toHaveBeenCalled();
        });
      });

      describe('.handleUpdatedResultsDisplay()', function() {
        it('should be defined', function() {
          expect(LandingPageView.prototype.handleUpdatedResultsDisplay).toEqual(jasmine.any(Function));
        });

        describe('total count greater than zero', function() {
          beforeEach(function() {
            this.view = new LandingPageView();
            spyOn(this.view, 'getResultStatsContainer').and.returnValue({
              show: jasmine.createSpy()
            });
            spyOn(this.view, 'getTabbedResultsContainer').and.returnValue({
              toggle: jasmine.createSpy()
            });

            this.view.handleUpdatedResultsDisplay(2);
          });

          it('should show result stats container', function() {
            expect(this.view.getResultStatsContainer().show).toHaveBeenCalled();
          });

          it('should show tabbed results container', function() {
            expect(this.view.getTabbedResultsContainer().toggle).toHaveBeenCalledWith(true);
          });
        });

        describe('total count zero or less than zero', function() {
          beforeEach(function() {
            this.view = new LandingPageView();
            spyOn(this.view, 'getResultStatsContainer').and.returnValue({
              show: jasmine.createSpy()
            });
            spyOn(this.view, 'getTabbedResultsContainer').and.returnValue({
              toggle: jasmine.createSpy()
            });

            this.view.handleUpdatedResultsDisplay(0);
          });

          it('should show result stats container', function() {
            expect(this.view.getResultStatsContainer().show).toHaveBeenCalled();
          });

          it('should not show tabbed results container', function() {
            expect(this.view.getTabbedResultsContainer().toggle).toHaveBeenCalledWith(false);
          });
        });
      });

      describe('.handleInitialResultsDisplay()', function() {
        beforeEach(function() {
          this.view = new LandingPageView();

          spyOn(this.view, 'getResultStatsContainer').and.returnValue({
            hide: jasmine.createSpy()
          });
          spyOn(this.view, 'getTabbedResultsContainer').and.returnValue({
            hide: jasmine.createSpy()
          });

          this.view.handleInitialResultsDisplay();
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.handleInitialResultsDisplay).toEqual(jasmine.any(Function));
        });

        it('should hide result stats container', function() {
          expect(this.view.getResultStatsContainer().hide).toHaveBeenCalled();
        });

        it('should hide tabbed results container', function() {
          expect(this.view.getTabbedResultsContainer().hide).toHaveBeenCalled();
        });
      });

      describe('.getSearchContainer()', function() {
        it('should be defined', function() {
          expect(LandingPageView.prototype.getSearchContainer).toEqual(jasmine.any(Function));
        });

        it('should select correct element', function() {
          var fakeContainer = {},
            view = new LandingPageView();

          spyOn(Backbone, '$').and.callFake(function(id) {
            if (id === '.ce-search-container') {
              return fakeContainer;
            }
          });
          expect(view.getSearchContainer()).toBe(fakeContainer);
        });
      });

      describe('.getResultStatsContainer()', function() {
        it('should be defined', function() {
          expect(LandingPageView.prototype.getResultStatsContainer).toEqual(jasmine.any(Function));
        });

        it('should select correct element', function() {
          var fakeContainer = {},
            view = new LandingPageView();

          spyOn(Backbone, '$').and.callFake(function(id) {
            if (id === '.ce-result-stats-container') {
              return fakeContainer;
            }
          });
          expect(view.getResultStatsContainer()).toBe(fakeContainer);
        });
      });

      describe('.getTabbedResultsContainer()', function() {
        it('should be defined', function() {
          expect(LandingPageView.prototype.getResultStatsContainer).toEqual(jasmine.any(Function));
        });

        it('should select correct element', function() {
          var fakeContainer = {},
            view = new LandingPageView();

          spyOn(Backbone, '$').and.callFake(function(id) {
            if (id === '.ce-tabbed-results-container') {
              return fakeContainer;
            }
          });
          expect(view.getTabbedResultsContainer()).toBe(fakeContainer);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to search component "search" event', function() {
          spyOn(LandingPageView.prototype, 'onSearchRequest');

          var view = new LandingPageView(),
            fakeSearchCriteria = {};

          view.search.trigger('search:search', fakeSearchCriteria);

          expect(view.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should listen to searchable results list component "search completed" event', function() {
          spyOn(LandingPageView.prototype, 'didListSearchSucceed');

          var view = new LandingPageView(),
            fakeData = {};

          view.searchableResultsList.trigger('search:completed', fakeData);

          expect(view.didListSearchSucceed).toHaveBeenCalledWith(fakeData);
        });

        it('should listen to result stats component "export xls" event', function() {
          spyOn(LandingPageView.prototype, 'onExportToXlsRequest');

          var view = new LandingPageView();

          view.resultStats.trigger('export:xls');

          expect(view.onExportToXlsRequest).toHaveBeenCalled();
        });

        it('should listen to router route event', function() {
          spyOn(LandingPageView.prototype, 'didRoute');
          spyOn(SearchComponent.prototype, 'update');
          spyOn(SearchComponent.prototype, 'requestSearch');

          var view = new LandingPageView(),
            fakeCriteria = { foo: 'bar' };

          router.trigger('router:search', fakeCriteria);

          expect(view.didRoute).toHaveBeenCalledWith(fakeCriteria);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('ce.landing-page.fixture.html');

          this.view = new LandingPageView();
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render search component in appropriate container', function() {
          var markup = this.view.search.render().view.el;
          expect($('.ce-search-container')).toContainHtml(markup);
        });

        it('should render result stats component to appropriate container', function() {
          var markup = this.view.resultStats.render().view.el;
          expect($('.ce-result-stats-container')).toContainHtml(markup);
        });

        it('should render tab switcher component to appropriate container', function() {
          var markup = this.view.tabSwitcher.render().view.el;
          expect($('.ce-tabbed-results-container')).toContainHtml(markup);
        });

        it('should render searchable results list component in appropriate container', function() {
          var markup = this.view.searchableResultsList.render().view.el;
          expect($('.ce-tabbed-results-container')).toContainHtml(markup);
        });

        it('should render results map component to appropriate container', function() {
          var markup = this.view.resultsMap.render().view.el;
          expect($('.ce-tabbed-results-container')).toContainHtml(markup);
        });
      });
    });
  });
});