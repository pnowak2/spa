define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsMapComponent = require('app/efc/components/results/map/searchable-results-map/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  describe('EFC App View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(LandingPageView.prototype, 'render');
        spyOn(LandingPageView.prototype, 'requestInitialSearch');
        spyOn(SearchableResultsMapComponent.prototype, 'initMap');
        spyOn(TabSwitcherComponent.prototype, 'initialize');

        this.view = new LandingPageView;
      });

      it('should have search component defined ', function() {
        expect(this.view.search).toEqual(jasmine.any(SearchComponent));
      });

      it('should have searchable list component defined', function() {
        expect(this.view.searchableResultsList).toEqual(jasmine.any(SearchableResultsListComponent));
      });

      it('should have searchable map component defined', function() {
        expect(this.view.searchableResultsMap).toEqual(jasmine.any(SearchableResultsMapComponent));
      });

      it('should have tab switcher component defined', function() {
        expect(this.view.tabSwitcher).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should initialize tab switcher with proper data', function() {
        expect(this.view.tabSwitcher.initialize).toHaveBeenCalledWith({
          tabDescriptors: [{
            title: 'Map',
            identifier: 'map',
            targetSelector: '.' + this.view.searchableResultsMap.view.className,
            selected: true
          }, {
            title: 'List',
            identifier: 'list',
            targetSelector: '.' + this.view.searchableResultsList.view.className,
            selected: false
          }]
        })
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the searchable map', function() {
        expect(this.view.searchableResultsMap.initMap).toHaveBeenCalled();
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
          spyOn(SearchableResultsListComponent.prototype, 'onSearchRequest');
          spyOn(SearchableResultsMapComponent.prototype, 'onSearchRequest');

          this.view = new LandingPageView;
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableResultsList.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should delegate to searchable map component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableResultsMap.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
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

        it('should render searchable list component to appropriate container', function() {
          var markup = this.view.searchableResultsList.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });

        it('should render searchable map component to appropriate container', function() {
          var markup = this.view.searchableResultsMap.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });
      });
    });
  });
});