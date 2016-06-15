define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    SearchableResultsMapComponent = require('app/eplus-ce/components/landing-page/results/map/searchable-results-map/main.component'),
    searchCriteriaBuilder = require('../util/searchCriteriaBuilder');

  describe('Eplus/CE Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(_, 'bindAll').and.callThrough();
        spyOn(TabSwitcherComponent.prototype, 'initialize');
        spyOn(LandingPageView.prototype, 'render');
        spyOn(LandingPageView.prototype, 'setupDomEvents');
        spyOn(SearchableResultsMapComponent.prototype, 'initMap');

        this.view = new LandingPageView;
      });

     it('should bind callback methods with view object', function() {
       expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didClickSearchButton');
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

      it('should setup dom events', function() {
        expect(this.view.setupDomEvents).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.setupDomEvents()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('eplus-ce.landing-page.fixture.html');

          this.view = new LandingPageView;
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.setupDomEvents).toEqual(jasmine.any(Function));
        });

        it('should bind to search button click event', function() {
          expect('#btnSearch').toHandle('click', this.view.didClickSearchButton);
        });
      });

      describe('.didClickSearchButton()', function() {
        beforeEach(function() {
          this.view = new LandingPageView;
        })

        it('should be defined', function() {
          expect(LandingPageView.prototype.didClickSearchButton).toEqual(jasmine.any(Function));
        });

        it('should build search criteria', function() {
          spyOn(searchCriteriaBuilder, 'getCriteria');

          this.view.didClickSearchButton();

          expect(searchCriteriaBuilder.getCriteria).toHaveBeenCalled();
        });

        it('should call map component with search criteria', function() {
          spyOn(this.view.searchableResultsMap, 'onSearchRequest');
          spyOn(searchCriteriaBuilder, 'getCriteria').and.returnValue('fakeCriteria');

          this.view.didClickSearchButton();

          expect(this.view.searchableResultsMap.onSearchRequest).toHaveBeenCalledWith('fakeCriteria');
        });
      });

      describe('.didSelectTab()', function() {
        beforeEach(function() {
          this.view = new LandingPageView;
        })

        it('should be defined', function() {
          expect(LandingPageView.prototype.didSelectTab).toEqual(jasmine.any(Function));
        });

        it('should trigger resize event', function(done) {
          $(window).resize(function() {
            expect(true).toBe(true);
            done();
          });

          this.view.didSelectTab();
        });
      });
    });

    describe('events', function() {
      it('should listen to tab switcher tab selection events', function() {
        spyOn(LandingPageView.prototype, 'didSelectTab');

        var view = new LandingPageView;

        view.tabSwitcher.trigger('tab-switcher:tab:selected');

        expect(view.didSelectTab).toHaveBeenCalled();
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