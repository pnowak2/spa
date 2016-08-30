define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    ResultStatsComponent = require('app/ce/components/landing-page/results/result-stats/main.component'),
    SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component');

  describe('CE Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(LandingPageView.prototype, 'render');
        spyOn(SearchComponent.prototype, 'initialize');
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
            targetSelector: '<todo>',
            selected: false
          }]
        });
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableResultsListComponent.prototype, 'onSearchRequest');

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
          expect($('.ce-tabs-container')).toContainHtml(markup);
        });

        it('should render searchable results list component in appropriate container', function() {
          var markup = this.view.searchableResultsList.render().view.el;
          expect($('.ce-results-container')).toContainHtml(markup);
        });
      });
    });
  });
});