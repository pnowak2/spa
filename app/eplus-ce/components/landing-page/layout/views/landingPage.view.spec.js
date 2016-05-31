define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    SearchableResultsMapComponent = require('app/eplus-ce/components/landing-page/results/map/searchable-results-map/main.component');

  describe('Eplus/CE Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(TabSwitcherComponent.prototype, 'initialize');
        spyOn(LandingPageView.prototype, 'render');
        spyOn(SearchableResultsMapComponent.prototype, 'initMap');

        this.view = new LandingPageView;
      });

      it('should have tab switcher component defined', function() {
        expect(this.view.tabSwitcher).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should have searchable map component defined', function() {
        expect(this.view.searchableResultsMap).toEqual(jasmine.any(SearchableResultsMapComponent));
      });

      it('should initialize tab switcher with proper data', function() {
        expect(this.view.tabSwitcher.initialize).toHaveBeenCalledWith({
          tabDescriptors: [{
            title: 'List',
            identifier: 'list',
            targetSelector: '#troggleTextOrSearch',
            selected: true
          }, {
            title: 'Map',
            identifier: 'map',
            targetSelector: '.eplus-ce-map-container',
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

    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          spyOn(SearchableResultsMapComponent.prototype, 'onSearchRequest');

          this.view = new LandingPageView;
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate to searchable map component', function() {
          var fakeSearchCriteria = {};

          this.view.onSearchRequest(fakeSearchCriteria);

          expect(this.view.searchableResultsMap.onSearchRequest).toHaveBeenCalledWith(fakeSearchCriteria);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('eplus-ce.landing-page.fixture.html');

          this.view = new LandingPageView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render tab switcher component to appropriate container', function() {
          var markup = this.view.tabSwitcher.render().el;
          expect($('.eplus-ce-tab-switcher-container')).not.toBeEmpty();
          expect($('.eplus-ce-tab-switcher-container')).toContainHtml(markup);
        });

        it('should render searchable map component to appropriate container', function() {
          var markup = this.view.searchableResultsMap.render().el;
          expect($('.eplus-ce-map-container')).not.toBeEmpty();
          expect($('.eplus-ce-map-container')).toContainHtml(markup);
        });
      });
    });
  });
});