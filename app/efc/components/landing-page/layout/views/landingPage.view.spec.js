define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    AdvancedSearchComponent = require('app/efc/components/landing-page/searching/advanced-search/main.component'),
    PageableResultsListComponent = require('app/efc/components/landing-page/results/list/pageable-results-list/main.component'),
    ResultsMapComponent = require('app/efc/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  describe('EFC Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(LandingPageView.prototype, 'render');
        spyOn(LandingPageView.prototype, 'requestInitialSearch');
        spyOn(ResultsMapComponent.prototype, 'initMap');
        spyOn(TabSwitcherComponent.prototype, 'initialize');
        spyOn(SearchComponent.prototype, 'initialize');

        this.view = new LandingPageView;
      });

      it('should have search component defined ', function() {
        expect(this.view.search).toEqual(jasmine.any(SearchComponent));
      });

      it('should initialize search component with correct advanced search component in options', function() {
        var passedOptions = SearchComponent.prototype.initialize.calls.mostRecent().args[0];
        expect(passedOptions.advancedSearchComponent).toEqual(jasmine.any(AdvancedSearchComponent));
      });

      it('should have pageable list component defined', function() {
        expect(this.view.pageableResultsList).toEqual(jasmine.any(PageableResultsListComponent));
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
            title: 'Map',
            identifier: 'map',
            targetSelector: '.' + this.view.resultsMap.view.className,
            selected: true
          }, {
            title: 'List',
            identifier: 'list',
            targetSelector: '.' + this.view.pageableResultsList.view.className,
            selected: false
          }]
        })
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the results map', function() {
        expect(this.view.resultsMap.initMap).toHaveBeenCalled();
      });

      it('should request initial search', function() {
        expect(this.view.requestInitialSearch).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.requestInitialSearch()', function() {
        beforeEach(function() {
          spyOn(LandingPageView.prototype, 'onSearchRequest');

          this.view = new LandingPageView;
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.requestInitialSearch).toEqual(jasmine.any(Function));
        });

        it('should call on search request handler', function() {
          this.view.requestInitialSearch();

          expect(this.view.onSearchRequest).toHaveBeenCalledWith({});
        });
      });

      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(PageableResultsListComponent.prototype, 'onSearchRequest');
          spyOn(ResultsMapComponent.prototype, 'onSearchRequest');

          this.view = new LandingPageView;
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to pageable list component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.pageableResultsList.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should delegate to results map component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.resultsMap.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to search component "search" event', function() {
          spyOn(LandingPageView.prototype, 'requestInitialSearch');
          spyOn(LandingPageView.prototype, 'onSearchRequest');

          var view = new LandingPageView,
            fakeSearchCriteria = {};

          view.search.trigger('search:search', fakeSearchCriteria);

          expect(view.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('efc.landing-page.fixture.html');

          this.view = new LandingPageView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render search component in appropriate container', function() {
          var markup = this.view.search.render().el;
          expect($('.efc-search-container')).toContainHtml(markup);
        });

        it('should render tab switcher component to appropriate container', function() {
          var markup = this.view.tabSwitcher.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });

        it('should render pageable list component to appropriate container', function() {
          var markup = this.view.pageableResultsList.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });

        it('should render results map component to appropriate container', function() {
          var markup = this.view.resultsMap.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });
      });
    });
  });
});