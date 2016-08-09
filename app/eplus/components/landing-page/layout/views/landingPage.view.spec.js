define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    ResultsMapComponent = require('app/eplus/components/landing-page/results/map/results-map/main.component'),
    searchCriteriaBuilder = require('../util/searchCriteriaBuilder'),
    router = require('app/eplus/routers/landing-page.router');

  describe('Eplus Landing Page View', function() {
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
        spyOn(ResultsMapComponent.prototype, 'initMap');

        this.view = new LandingPageView;
      });

      it('should bind callback methods with view object', function() {
        expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didClickSearchButton');
      });

      it('should have tab switcher component defined', function() {
        expect(this.view.tabSwitcher).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should have results map component defined', function() {
        expect(this.view.resultsMap).toEqual(jasmine.any(ResultsMapComponent));
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
            targetSelector: '.map-container',
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

      it('should setup dom events', function() {
        expect(this.view.setupDomEvents).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.setupDomEvents()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('eplus.landing-page.fixture.html');

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
          this.fakeCriteria = {
            KEYWORD: 'bar'
          };

          this.view = new LandingPageView;

          spyOn(router, 'navigate');
          spyOn(ResultsMapComponent.prototype, 'onSearchRequest');
          spyOn(searchCriteriaBuilder, 'getCriteria').and.returnValue(this.fakeCriteria);
        })

        it('should be defined', function() {
          expect(LandingPageView.prototype.didClickSearchButton).toEqual(jasmine.any(Function));
        });

        it('should build search criteria', function() {
          this.view.didClickSearchButton();
          expect(searchCriteriaBuilder.getCriteria).toHaveBeenCalled();
        });

        it('should call map component with search criteria', function() {
          this.view.didClickSearchButton();
          expect(this.view.resultsMap.onSearchRequest).toHaveBeenCalledWith(this.fakeCriteria);
        });

        it('should include keyword in URL', function() {
          this.view.didClickSearchButton();
          expect(router.navigate).toHaveBeenCalledWith('keyword/bar');
        });
      });

      describe('.didRouteSearchByKeyword', function() {
        beforeEach(function() {
          setFixtures('<input id="filterSimpleSearch"><input id="btnSearch" type="button">');
          spyOnEvent('#btnSearch', 'click')

          spyOn(window, 'decodeURIComponent').and.returnValue('uri decoded keyword');

          this.view = new LandingPageView;
          this.view.didRouteSearchByKeyword('my keyword');
        });

        it('should be defined', function() {
          expect(LandingPageView.prototype.didRouteSearchByKeyword).toEqual(jasmine.any(Function));
        });

        it('should decode keyword for URI', function() {
          expect(window.decodeURIComponent).toHaveBeenCalledWith('my keyword');
        });

        it('should place decoded keyword to input box of search', function() {
          expect('#filterSimpleSearch').toHaveValue('uri decoded keyword')
        });

        it('should force button search click event', function() {
          expect('click').toHaveBeenTriggeredOn('#btnSearch')
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

      it('should listen to router search by keyword event', function() {
        spyOn(LandingPageView.prototype, 'didRouteSearchByKeyword');

        var view = new LandingPageView;

        router.trigger('route:search:keyword');

        expect(view.didRouteSearchByKeyword).toHaveBeenCalled();
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('eplus.landing-page.fixture.html');

          this.view = new LandingPageView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render tab switcher component to appropriate container', function() {
          var markup = this.view.tabSwitcher.render().el;
          expect($('.tab-switcher-container')).not.toBeEmpty();
          expect($('.tab-switcher-container')).toContainHtml(markup);
        });

        it('should render results map component to appropriate container', function() {
          var markup = this.view.resultsMap.render().el;
          expect($('.map-container')).not.toBeEmpty();
          expect($('.map-container')).toContainHtml(markup);
        });
      });
    });
  });
});