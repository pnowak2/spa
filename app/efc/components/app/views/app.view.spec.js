define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    EFCAppView = require('./app.view'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    SearchableResultsMapComponent = require('app/efc/components/results/map/searchable-results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    tabsDataSource = require('../data/tabs');

  describe('EFC App View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(EFCAppView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(EFCAppView.prototype, 'render');
        spyOn(EFCAppView.prototype, 'requestInitialSearch');
        spyOn(SearchableResultsMapComponent.prototype, 'initMap');
        spyOn(TabSwitcherComponent.prototype, 'initialize');

        this.view = new EFCAppView;
      });

      it('should have search component defined ', function() {
        expect(this.view.search).toEqual(jasmine.any(SearchComponent));
      });

      it('should have searchable list component defined', function() {
        expect(this.view.searchableList).toEqual(jasmine.any(SearchableResultsListComponent));
      });

      it('should have searchable map component defined', function() {
        expect(this.view.searchableMap).toEqual(jasmine.any(SearchableResultsMapComponent));
      });

      it('should have tab switcher component defined', function() {
        expect(this.view.tabSwitcher).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should initialize tab switcher with proper data', function() {
        expect(this.view.tabSwitcher.initialize).toHaveBeenCalledWith({
          tabDescriptors: tabsDataSource
        })
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the searchable map', function() {
        expect(this.view.searchableMap.initMap).toHaveBeenCalled();
      });

      it('should request initial search', function() {
        expect(this.view.requestInitialSearch).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.requestInitialSearch()', function() {
        beforeEach(function() {
          spyOn(EFCAppView.prototype, 'onSearchRequest');

          this.view = new EFCAppView;
        });

        it('should be defined', function() {
          expect(EFCAppView.prototype.requestInitialSearch).toEqual(jasmine.any(Function));
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

          this.view = new EFCAppView;
        });

        it('should be defined', function() {
          expect(EFCAppView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable list component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableList.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });

        it('should delegate to searchable map component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableMap.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should listen to search component "search" event', function() {
          spyOn(EFCAppView.prototype, 'requestInitialSearch');
          spyOn(EFCAppView.prototype, 'onSearchRequest');

          var view = new EFCAppView,
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
          loadFixtures('efc-app.fixture.html');

          this.view = new EFCAppView;
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
          var markup = this.view.searchableList.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });

        it('should render searchable map component to appropriate container', function() {
          var markup = this.view.searchableMap.render().el;
          expect($('.efc-results-container')).toContainHtml(markup);
        });
      });
    });
  });
});