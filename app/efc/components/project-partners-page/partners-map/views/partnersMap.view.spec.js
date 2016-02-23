define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view'),
    MapComponent = require('app/shared/components/mapping/map/main.component');

  describe('EFC Project Partners View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PartnersMapView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PartnersMapView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PartnersMapView.prototype.className).toEqual('efc-partners-map');
        });
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(PartnersMapView.prototype, 'render');
        spyOn(PartnersMapView.prototype, 'requestInitialSearch');
        spyOn(MapComponent.prototype, 'initMap');

        this.fakeCriteria = {
          id: '6'
        };

        this.view = new PartnersMapView(this.fakeCriteria);
      });

      it('should have map component defined', function() {
        expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the map', function() {
        expect(this.view.mapComponent.initMap).toHaveBeenCalled();
      });

      it('should perform initial request', function() {
        expect(this.view.requestInitialSearch).toHaveBeenCalledWith(this.fakeCriteria);
      });
    });

    describe('api', function() {
      describe('.requestInitialSearch()', function() {
        beforeEach(function() {
          spyOn(PartnersMapView.prototype, 'onSearchRequest');
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.requestInitialSearch).toEqual(jasmine.any(Function));
        });

        it('should perform search request with proper criteria', function() {
          var fakeCriteria = {};

          this.view.requestInitialSearch(fakeCriteria)

          expect(this.view.onSearchRequest).toHaveBeenCalledWith(fakeCriteria);
        });
      });

      describe('.onSearchRequest()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('efc.project-partners-page.fixture.html');

          this.view = new PartnersMapView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render partners map component to appropriate container', function() {
          var markup = this.view.mapComponent.render().view.el;
          expect($('.efc-project-partners-container')).toContainHtml(markup);
        });
      });
    });
  });
});